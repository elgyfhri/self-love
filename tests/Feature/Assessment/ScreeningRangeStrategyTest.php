<?php

namespace Tests\Feature\Assessment;

use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\User;
use App\Models\UserAssessment;
use App\Services\Assessment\Strategies\ScreeningRangeStrategy;
use App\Support\ScoreLevel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScreeningRangeStrategyTest extends TestCase
{
    use RefreshDatabase;

    private AssessmentType $type;

    private ScreeningRangeStrategy $strategy;

    protected function setUp(): void
    {
        parent::setUp();

        $this->type = AssessmentType::create([
            'name' => 'Asesmen Kesehatan Mental Dasar',
            'code' => 'KMJ',
            'status' => 'published',
            'scoring_type' => 'screening_range',
        ]);

        $this->strategy = new ScreeningRangeStrategy;
    }

    /*
    |--------------------------------------------------------------------------
    | Arah skor
    |--------------------------------------------------------------------------
    |
    | Semua butir KMJ is_reverse, karena redaksinya memakai kalimat
    | gejala. Setelah pembalikan, skor tinggi harus berarti kondisi
    | yang lebih baik. Orang yang menjawab 1 (tidak pernah) di semua
    | soal harus mendapat skor tertinggi.
    |
    */

    public function test_answering_never_produces_the_highest_score(): void
    {
        $perception = $this->category('Perception of Self');

        $picks = [];

        for ($i = 1; $i <= 5; $i++) {
            $picks[] = [$this->question($perception, "KMJ-{$i}"), 1];
        }

        $result = $this->strategy->calculate($this->assess($picks));

        $this->assertSame(5.0, $this->scoreOf($result['results'], $perception));
        $this->assertSame(5.0, $result['total_score']);
        $this->assertSame('Relatif Stabil', $result['final_result']);
    }

    public function test_answering_always_produces_the_lowest_score(): void
    {
        $perception = $this->category('Perception of Self');

        $picks = [];

        for ($i = 1; $i <= 5; $i++) {
            $picks[] = [$this->question($perception, "KMJ-{$i}"), 5];
        }

        $result = $this->strategy->calculate($this->assess($picks));

        $this->assertSame(1.0, $this->scoreOf($result['results'], $perception));
        $this->assertSame(1.0, $result['total_score']);
        $this->assertSame('Perlu Dukungan Profesional', $result['final_result']);
    }

    /*
    |--------------------------------------------------------------------------
    | Level memakai band instrumen sendiri
    |--------------------------------------------------------------------------
    |
    | Band KMJ tidak boleh sama dengan band global. Kalau tidak, label
    | "Perlu Perhatian" akan muncul untuk instrumen yang maknanya
    | berbeda.
    |
    */

    public function test_level_uses_the_band_registered_for_this_instrument(): void
    {
        $this->assertSame(
            'Perlu Dukungan Profesional',
            ScoreLevel::label(2.0, 'KMJ')
        );

        $this->assertSame(
            'Perlu Perhatian',
            ScoreLevel::label(3.0, 'KMJ')
        );

        $this->assertSame(
            'Relatif Stabil',
            ScoreLevel::label(4.0, 'KMJ')
        );
    }

    public function test_scs_keeps_its_own_band_after_a_new_instrument_is_registered(): void
    {
        $this->assertSame('Perlu Perhatian', ScoreLevel::label(2.0, 'SCS'));
        $this->assertSame('Cukup Baik', ScoreLevel::label(3.0, 'SCS'));
        $this->assertSame('Baik', ScoreLevel::label(4.0, 'SCS'));
    }

    /*
    |--------------------------------------------------------------------------
    | Total
    |--------------------------------------------------------------------------
    |
    | Jumlah butir tiap bagian sama semua, jadi mean dari mean bagian
    | harus sama dengan mean seluruh butir. Bandingkan juga dengan
    | kasus yang tidak seimbang supaya mean bagian terbaca dengan
    | benar.
    |
    */

    public function test_total_is_the_mean_of_the_section_means(): void
    {
        $first = $this->category('Perception of Self');
        $second = $this->category('Pressure and Performance');

        $picks = [];

        foreach ([5, 5, 5, 5, 5] as $offset => $value) {
            $picks[] = [$this->question($first, 'KMJ-A'.($offset + 1)), $value];
        }

        foreach ([2, 2, 2, 2, 2] as $offset => $value) {
            $picks[] = [$this->question($second, 'KMJ-B'.($offset + 1)), $value];
        }

        $result = $this->strategy->calculate($this->assess($picks));

        $this->assertSame(1.0, $this->scoreOf($result['results'], $first));
        $this->assertSame(4.0, $this->scoreOf($result['results'], $second));

        $this->assertSame(2.5, $result['total_score']);
        $this->assertSame('Perlu Perhatian', $result['final_result']);
    }

    /*
    |--------------------------------------------------------------------------
    | Aturan pola antar-bagian
    |--------------------------------------------------------------------------
    |
    | Config assessment.screening_patterns menyebut pasangan bagian.
    | Kalau keduanya sama-sama rendah, baris bagian dengan skor
    | terendah harus menerima catatan pola.
    |
    */

    public function test_pattern_note_is_attached_when_both_sections_are_low(): void
    {
        config()->set('assessment.screening_patterns', [
            [
                'sections' => ['Perception of Self', 'Withdrawal and Forgetting'],
                'max' => 2.5,
                'note' => 'Pola bagian 1 dan 5.',
            ],
        ]);

        $first = $this->category('Perception of Self');
        $second = $this->category('Withdrawal and Forgetting');

        $picks = [];

        foreach (['KMJ-C', 'KMJ-D', 'KMJ-E'] as $index => $code) {
            $picks[] = [$this->question($first, $code), 5];
        }

        foreach (['KMJ-F', 'KMJ-G', 'KMJ-H'] as $index => $code) {
            $picks[] = [$this->question($second, $code), 4];
        }

        $result = $this->strategy->calculate($this->assess($picks));

        /*
         * Catatan menempel di baris dengan skor terendah dari pasangan
         * itu. Di sini Perception of Self bernilai 1.0 dan Withdrawal
         * 2.0, jadi yang menerima catatan adalah Perception of Self.
         */
        $notes = $this->notesOf($result['results']);

        $this->assertSame('Pola bagian 1 dan 5.', $notes[$first->id] ?? null);
        $this->assertNull($notes[$second->id] ?? null);
    }

    public function test_pattern_note_is_not_attached_when_one_section_is_fine(): void
    {
        config()->set('assessment.screening_patterns', [
            [
                'sections' => ['Perception of Self', 'Withdrawal and Forgetting'],
                'max' => 2.5,
                'note' => 'Pola bagian 1 dan 5.',
            ],
        ]);

        $first = $this->category('Perception of Self');
        $second = $this->category('Withdrawal and Forgetting');

        $picks = [];

        foreach (['KMJ-I', 'KMJ-J'] as $code) {
            $picks[] = [$this->question($first, $code), 5];
        }

        foreach (['KMJ-K', 'KMJ-L'] as $code) {
            $picks[] = [$this->question($second, $code), 1];
        }

        $result = $this->strategy->calculate($this->assess($picks));

        $this->assertSame([], array_filter($this->notesOf($result['results'])));
    }

    public function test_unknown_section_name_in_config_is_ignored(): void
    {
        config()->set('assessment.screening_patterns', [
            [
                'sections' => ['Bagian Yang Tidak Ada', 'Withdrawal and Forgetting'],
                'max' => 2.5,
                'note' => 'Tidak boleh muncul.',
            ],
        ]);

        $first = $this->category('Perception of Self');
        $second = $this->category('Withdrawal and Forgetting');

        $picks = [
            [$this->question($first, 'KMJ-M'), 5],
            [$this->question($second, 'KMJ-N'), 5],
        ];

        $result = $this->strategy->calculate($this->assess($picks));

        $this->assertSame([], array_filter($this->notesOf($result['results'])));
    }

    /*
    |--------------------------------------------------------------------------
    | Kasus tanpa jawaban
    |--------------------------------------------------------------------------
    */

    public function test_assessment_without_scoreable_answers_produces_empty_result(): void
    {
        $category = $this->category('Perception of Self');

        $question = $this->question($category, 'KMJ-O');

        $result = $this->strategy->calculate($this->assess([[$question, null]]));

        $this->assertSame([], $result['results']);
        $this->assertSame(0, $result['total_score']);
        $this->assertNull($result['final_result']);
    }

    /*
    |--------------------------------------------------------------------------
    | Fixture
    |--------------------------------------------------------------------------
    */

    private function category(string $name): AssessmentCategory
    {
        $category = AssessmentCategory::create([
            'name' => $name,
            'indonesian_name' => $name,
        ]);

        $this->type->categories()->syncWithoutDetaching($category->id);

        return $category;
    }

    private function question(
        AssessmentCategory $category,
        string $code
    ): Question {
        $question = Question::create([
            'assessment_type_id' => $this->type->id,
            'category_id' => $category->id,
            'question' => 'Butir '.$code,
            'question_code' => $code,
            'question_order' => 1,
            'answer_type' => 'likert_5',
            'is_reverse' => true,
        ]);

        foreach (['Tidak pernah', 'Jarang', 'Kadang', 'Sering', 'Selalu'] as $offset => $text) {
            QuestionOption::create([
                'question_id' => $question->id,
                'option_text' => $text,
                'option_value' => (string) ($offset + 1),
                'option_order' => $offset + 1,
                'is_active' => true,
            ]);
        }

        return $question;
    }

    /**
     * @param  array<int, array{0: Question, 1: int|string|null}>  $picks
     */
    private function assess(array $picks): UserAssessment
    {
        $assessment = UserAssessment::create([
            'user_id' => User::factory()->create()->id,
            'assessment_type_id' => $this->type->id,
            'status' => 'completed',
            'started_at' => now(),
            'completed_at' => now(),
        ]);

        foreach ($picks as [$question, $optionValue]) {

            $option = $optionValue === null
                ? null
                : QuestionOption::where('question_id', $question->id)
                    ->where('option_value', $optionValue)
                    ->first();

            $assessment->answers()->create([
                'question_id' => $question->id,
                'question_option_id' => $option?->id,
                'answer_text' => $option?->option_text ?? '',
            ]);
        }

        return $assessment->fresh();
    }

    /**
     * @param  array<int, array<string, mixed>>  $results
     */
    private function scoreOf(array $results, AssessmentCategory $category): ?float
    {
        foreach ($results as $result) {
            if ($result['category_id'] === $category->id) {
                return (float) $result['score'];
            }
        }

        return null;
    }

    /**
     * @param  array<int, array<string, mixed>>  $results
     * @return array<int, string>
     */
    private function notesOf(array $results): array
    {
        $notes = [];

        foreach ($results as $result) {
            if (! empty($result['recommendation'])) {
                $notes[$result['category_id']] = $result['recommendation'];
            }
        }

        return $notes;
    }
}
