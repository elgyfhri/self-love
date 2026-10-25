<?php

namespace App\Services\Assessment\Strategies;

use App\Models\AssessmentCategory;
use App\Models\Question;
use App\Models\UserAssessment;
use App\Services\Assessment\Contracts\AssessmentStrategy;
use App\Support\ScoreLevel;

class ScreeningRangeStrategy implements AssessmentStrategy
{
    /*
    |--------------------------------------------------------------------------
    | Screening Range
    |--------------------------------------------------------------------------
    |
    | Dipakai untuk instrumen screening yang redaksi soal condong ke
    | gejala, misalnya "Saya merasa cemas" atau "Saya sulit tidur".
    |
    | Berbeda dari ScoreRangeStrategy dalam tiga hal:
    |
    | 1. Semua butir di instrumen ini is_reverse, jadi skor yang
    |    dihitung setelah pembalikan sudah berarah "lebih tinggi
    |    lebih baik". Level dan ambang pola dibaca dari arah itu.
    |    reversal tetap memakai min + max - score dari option milik
    |    soal, sama seperti ScoreRangeStrategy.
    |
    | 2. Skor total memakai mean dari mean tiap bagian, bukan mean
    |    dari seluruh butir. Jumlah butir tiap bagian di instrumen
    |    ini sama semua, jadi hasilnya sama dengan mean 30 butir,
    |    tapi perhitungannya mengikuti struktur bagian.
    |
    | 3. Ada lapisan kedua yang tidak ada di ScoreRangeStrategy:
    |    aturan pola antar-bagian dari config('assessment.
    |    screening_patterns'). Kalau beberapa bagian sama-sama
    |    rendah, hasilnya bukan cuma angka, tapi catatan pola yang
    |    ditulis ke kolom recommendation.
    |
    | Catatan penting: instrumen screening di aplikasi ini tidak
    | punya validasi psikometrik dan tidak bisa dipakai sebagai
    | diagnosis. Karena itu isi catatan sengaja ditulis sebagai
    | "pola yang perlu dieksplorasi".
    |
    */

    public function calculate(UserAssessment $assessment): array
    {
        $assessment->loadMissing([
            'assessmentType',
            'results.category',
        ]);

        $code = $assessment->assessmentType?->code;

        $answers = $assessment->answers()
            ->with([
                'question.category',
                'question.options',
                'questionOption',
            ])
            ->get();

        $groupedScores = [];

        $categoryMeans = [];

        foreach ($answers as $answer) {

            $question = $answer->question;

            $raw = $answer->questionOption?->option_value;

            /*
             * Option tanpa option_value tidak punya skor. Melewatinya
             * lebih aman daripada menghitung 0, karena 0 berada di luar
             * rentang skala dan akan menarik level ke band paling bawah.
             */

            if ($raw === null) {
                continue;
            }

            $score = (float) $raw;

            if ($question->is_reverse) {
                $score = $this->reverse($question, $score);
            }

            $categoryId = $question->category_id;

            if ($categoryId === null) {
                continue;
            }

            if (! isset($groupedScores[$categoryId])) {

                $groupedScores[$categoryId] = [
                    'category' => $question->category,
                    'scores' => [],
                ];
            }

            $groupedScores[$categoryId]['scores'][] = $score;
        }

        $hasAnswers = $groupedScores !== [];

        /*
        |--------------------------------------------------------------------------
        | Skor per bagian
        |--------------------------------------------------------------------------
        */

        $results = [];

        $scoresByCategoryName = [];

        $categoryIdByName = [];

        foreach ($groupedScores as $group) {

            if (empty($group['scores'])) {
                continue;
            }

            $rawMean = array_sum($group['scores']) / count($group['scores']);

            $average = round($rawMean, 2);

            $category = $group['category'];

            if ($category instanceof AssessmentCategory) {
                $scoresByCategoryName[$category->name] = $average;
                $categoryIdByName[$category->name] = $category->id;
            }

            $categoryMeans[] = $rawMean;

            $results[] = [
                'category_id' => $category instanceof AssessmentCategory
                    ? $category->id
                    : null,

                'score' => $average,

                'level' => ScoreLevel::label($average, $code),

                'recommendation' => null,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Catatan pola antar-bagian
        |--------------------------------------------------------------------------
        */

        $this->attachPatternNotes($results, $scoresByCategoryName, $categoryIdByName);

        /*
        |--------------------------------------------------------------------------
        | Skor total
        |--------------------------------------------------------------------------
        |
        | Mean dari mean tiap bagian. Mean bagian yang dipakai di sini
        | masih mentah supaya pembulatan tidak menumpuk di tengah
        | perhitungan.
        |
        */

        $totalScore = $hasAnswers
            ? round(array_sum($categoryMeans) / count($categoryMeans), 2)
            : 0;

        return [
            'total_score' => $totalScore,

            'final_result' => $hasAnswers
                ? ScoreLevel::label($totalScore, $code)
                : null,

            'results' => $results,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Aturan Pola
    |--------------------------------------------------------------------------
    |
    | Setiap aturan di config menyebut beberapa nama bagian dan satu
    | batas atas. Pola dianggap muncul kalau SEMUA bagian yang disebut
    | punya skor di bawah batas itu.
    |
    | Catatan ditambahkan ke baris bagian dengan skor terendah di
    | antara bagian yang disebut, karena di situlah pengguna akan
    | mencari penjelasan paling relevan.
    |
    | Kalau nama kategori di config tidak cocok dengan database,
    | aturannya dilewati diam-diam. Config yang salah tidak boleh
    | membuat seluruh submit gagal.
    |
    */

    protected function attachPatternNotes(
        array &$results,
        array $scoresByCategoryName,
        array $categoryIdByName
    ): void {
        $patterns = config('assessment.screening_patterns', []);

        if (! is_array($patterns) || $patterns === []) {
            return;
        }

        $indexByCategoryId = [];

        foreach ($results as $index => $result) {
            $indexByCategoryId[$result['category_id']] = $index;
        }

        $fallbackLimit = ScoreLevel::bands()[0]['max'];

        foreach ($patterns as $pattern) {

            $sections = $pattern['sections'] ?? [];

            $note = $pattern['note'] ?? null;

            if (! is_array($sections) || $sections === [] || ! is_string($note)) {
                continue;
            }

            $limit = $pattern['max'] ?? $fallbackLimit;

            $matchedCategoryIds = [];

            $lowestScore = null;

            $lowestCategoryId = null;

            foreach ($sections as $section) {

                /*
                 * Nama kategori di config yang tidak ada di database
                 * membuat aturan ini dilewati diam-diam. Config yang
                 * salah tidak boleh membuat seluruh submit gagal.
                 */

                if (! array_key_exists($section, $scoresByCategoryName)) {
                    $matchedCategoryIds = [];

                    break;
                }

                $score = $scoresByCategoryName[$section];

                if ($score >= $limit) {
                    $matchedCategoryIds = [];

                    break;
                }

                $categoryId = $categoryIdByName[$section];

                $matchedCategoryIds[] = $categoryId;

                if ($lowestScore === null || $score < $lowestScore) {
                    $lowestScore = $score;
                    $lowestCategoryId = $categoryId;
                }
            }

            if ($matchedCategoryIds === [] || $lowestCategoryId === null) {
                continue;
            }

            $targetIndex = $indexByCategoryId[$lowestCategoryId] ?? null;

            if ($targetIndex === null) {
                continue;
            }

            $existing = $results[$targetIndex]['recommendation'];

            $results[$targetIndex]['recommendation'] = $existing
                ? $existing."\n\n".$note
                : $note;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Reverse Scoring
    |--------------------------------------------------------------------------
    |
    | Butir dibalik dengan min + max - score. Pada skala 1-5 ini
    | setara dengan 6 - score, jadi 1 jadi 5 dan 3 tetap 3.
    |
    | Angka min dan max diambil dari option milik soal itu sendiri,
    | bukan konstanta yang ditulis manual, supaya tetap benar kalau
    | suatu assessment memakai jumlah titik selain lima.
    |
    | Option yang sedang non-aktif tetap ikut dihitung. Kalau rentang
    | ikut berubah saat option dinonaktifkan, jawaban lama yang
    | sudah terekam akan terhitung dengan aturan yang berbeda.
    |
    */

    protected function reverse(Question $question, float $score): float
    {
        $values = $question->options
            ->pluck('option_value')
            ->filter(fn ($value) => $value !== null)
            ->map(fn ($value) => (float) $value);

        if ($values->isEmpty()) {
            return $score;
        }

        return $values->min() + $values->max() - $score;
    }
}
