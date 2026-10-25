<?php

namespace App\Services\Assessment\Strategies;

use App\Models\Question;
use App\Models\UserAssessment;
use App\Services\Assessment\Contracts\AssessmentStrategy;
use App\Support\ScoreLevel;

class ScoreRangeStrategy implements AssessmentStrategy
{
    /*
    |--------------------------------------------------------------------------
    | Kalkulasi
    |--------------------------------------------------------------------------
    |
    | Menghitung skor per kategori sekaligus skor total. Dipakai semua
    | assessment bertipe score_range, termasuk SCS.
    |
     | Dua aturan besarnya:
     |
     | 1. Skor total adalah rata-rata dari mean tiap kategori, sesuai
     |    kunci skor resmi self-compassion.org: "take the mean of each
     |    subscale, and compute a total mean (the average of the six
     |    subscale means)". Jumlah butir tiap kategori tidak sama, jadi
     |    cara ini memberi bobot yang sama pada keenam kategori.
     |    Perhatikan bahwa Neff (2003) sendiri menjumlahkan butir, dan
     |    itu menghasilkan rumus yang sedikit berbeda. Kode ini
     |    sengaja mengikuti kunci skor di self-compassion.org, bukan
     |    artikel 2003, karena aplikasi memakai terjemahan resmi dari
     |    situs tersebut.
     |
     | 2. Skor level dihitung dari skor yang sudah dibulatkan, supaya
     |    kolom level dan label yang ditampilkan selalu sama. Sebelumnya
     |    keduanya membaca angka yang berbeda.
     |
    */

    public function calculate(UserAssessment $assessment): array
    {
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
            | Option tanpa option_value tidak punya skor. Melewatinya
            | lebih aman daripada menghitung 0, karena 0 berada di luar
            | rentang skala dan akan menarik level ke band paling bawah.
            */

            if ($raw === null) {
                continue;
            }

            $score = (float) $raw;

            if ($question->is_reverse) {
                $score = $this->reverse($question, $score);
            }

            $categoryId = $question->category_id;

            if (! isset($groupedScores[$categoryId])) {

                $groupedScores[$categoryId] = [
                    'category' => $question->category,
                    'scores' => [],
                ];
            }

            $groupedScores[$categoryId]['scores'][] = $score;
        }

        /*
        |--------------------------------------------------------------------------
        | Skor per kategori
        |--------------------------------------------------------------------------
        */

        $results = [];

        foreach ($groupedScores as $group) {

            if (empty($group['scores'])) {
                continue;
            }

            $rawMean = array_sum($group['scores']) / count($group['scores']);

            $average = round($rawMean, 2);

            $categoryMeans[] = $rawMean;

            $results[] = [
                'category_id' => $group['category']
                    ? $group['category']->id
                    : null,

                'score' => $average,

                'level' => $this->getLevel($average),

                'recommendation' => null,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Skor total
        |--------------------------------------------------------------------------
        |
        | Rata-rata dari mean tiap kategori, sesuai kunci skor resmi
        | self-compassion.org. Mean kategori yang dipakai di sini masih
        | mentah, jadi pembulatan tidak menumpuk di tengah perhitungan.
        | Kategori tanpa jawaban yang punya skor tidak ikut dihitung,
        | supaya total tidak turun hanya karena satu kategori kosong.
        |
        */

        $hasAnswers = $categoryMeans !== [];

        $totalScore = $hasAnswers
            ? round(array_sum($categoryMeans) / count($categoryMeans), 2)
            : 0;

        return [
            'total_score' => $totalScore,

            'final_result' => $hasAnswers
                ? $this->getLevel($totalScore)
                : null,

            'results' => $results,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Reverse Scoring
    |--------------------------------------------------------------------------
    |
    | Butir negatif dibalik dengan min + max - score. Pada skala 1-5
    | ini setara dengan 6 - score, jadi 1 jadi 5 dan 3 tetap 3.
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

    /*
    |--------------------------------------------------------------------------
    | Level
    |--------------------------------------------------------------------------
    |
    | Hasil ditampilkan dalam bentuk kata-kata, bukan angka.
    | Rentangnya diambil dari config('assessment.levels').
    |
    */

    private function getLevel(float $score): string
    {
        return ScoreLevel::label($score);
    }
}
