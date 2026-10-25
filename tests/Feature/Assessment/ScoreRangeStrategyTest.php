<?php

namespace Tests\Feature\Assessment;

use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\User;
use App\Models\UserAssessment;
use App\Services\Assessment\Strategies\ScoreRangeStrategy;
use App\Support\ScoreLevel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScoreRangeStrategyTest extends TestCase
{
    use RefreshDatabase;

    private AssessmentType $type;

    private ScoreRangeStrategy $strategy;

    protected function setUp(): void
    {
        parent::setUp();

        $this->type = AssessmentType::create([
            'name' => 'Self Compassion Scale',
            'code' => 'SCS',
            'status' => 'published',
            'scoring_type' => 'score_range',
        ]);

        $this->strategy = new ScoreRangeStrategy;
    }

    /*
    |--------------------------------------------------------------------------
    | Rata-rata total mengikuti kunci skor resmi
    |--------------------------------------------------------------------------
    |
     | Kunci skor self-compassion.org menyebut "the average of the six
    | subscale means". Jadi tiap kategori berbobot sama, berapa pun
    | jumlah butirnya. Ini berbeda dari Neff (2003) yang menjumlahkan
    | butir, dan perbedaan itu memang disengaja.
    |
    | Susunan: 5 butir bernilai 4, lalu 4 butir bernilai 5.
    |   mean dari kategori = (4 + 5) / 2          = 4.50
    |   mean dari butir    = (5 x 4 + 4 x 5) / 9 = 40 / 9 = 4.44
    |
    | Tes ini mengunci pilihan ke kunci skor resmi.
    |
    */

    public function test_total_score_is_the_mean_of_subscale_means(): void
    {
        $kindness = $this->category('Self Kindness');
        $isolation = $this->category('Isolation');

        $picks = [];

        for ($i = 1; $i <= 5; $i++) {
            $picks[] = [$this->question($kindness, "SK-{$i}", false, [1, 2, 3, 4, 5]), 4];
        }

        for ($i = 1; $i <= 4; $i++) {
            $picks[] = [$this->question($isolation, "IS-{$i}", true, [1, 2, 3, 4, 5]), 1];
        }

        $result = $this->strategy->calculate($this->assess($picks));

        $this->assertSame(4.0, $this->scoreOf($result['results'], $kindness));
        $this->assertSame(5.0, $this->scoreOf($result['results'], $isolation));

        $this->assertSame(4.5, $result['total_score']);
        $this->assertNotSame(4.44, $result['total_score']);
    }

    /*
    |--------------------------------------------------------------------------
    | Reverse mengikuti rentang option milik soal
    |--------------------------------------------------------------------------
    |
    | Konstanta pembalik tidak boleh ditulis manual sebagai 6, karena
    | assessment dengan skala selain 1-5 akan salah. Di sini skalanya
    | 0 sampai 3, jadi jawaban 0 dibalik menjadi 3.
    |
    */

    public function test_reverse_scoring_uses_the_option_range_of_that_question(): void
    {
        $category = $this->category('Self Judgment');

        $question = $this->question($category, 'SJ-01', true, [0, 1, 2, 3]);

        $result = $this->strategy->calculate($this->assess([[$question, 0]]));

        $this->assertSame(3.0, $result['total_score']);
        $this->assertSame(3.0, $this->scoreOf($result['results'], $category));
    }

    public function test_forward_items_are_not_reversed(): void
    {
        $category = $this->category('Self Kindness');

        $question = $this->question($category, 'SK-01', false, [0, 1, 2, 3]);

        $result = $this->strategy->calculate($this->assess([[$question, 0]]));

        $this->assertSame(0.0, $result['total_score']);
    }

    /*
    |--------------------------------------------------------------------------
    | Option tanpa nilai dilewati
    |--------------------------------------------------------------------------
    |
    | option_value boleh null di skema. Option seperti itu tidak punya
    | skor, jadi harus dilewati, bukan dihitung 0 yang berada di luar
    | rentang skala.
    |
    */

    public function test_option_without_value_is_skipped_instead_of_counted_as_zero(): void
    {
        $category = $this->category('Mindfulness');

        $nulled = $this->question($category, 'MI-01', false, [1, 2, null, 3, 4]);
        $normal = $this->question($category, 'MI-02', false, [1, 2, 3, 4, 5]);

        $result = $this->strategy->calculate(
            $this->assess([[$nulled, null], [$normal, 4]])
        );

        $this->assertSame(4.0, $this->scoreOf($result['results'], $category));
        $this->assertSame(4.0, $result['total_score']);
    }

    public function test_assessment_without_any_scoreable_answer_produces_empty_result(): void
    {
        $category = $this->category('Common Humanity');

        $nulled = $this->question($category, 'CH-01', false, [1, null, 3]);

        $result = $this->strategy->calculate($this->assess([[$nulled, null]]));

        $this->assertSame([], $result['results']);
        $this->assertSame(0, $result['total_score']);
        $this->assertNull($result['final_result']);
    }

    /*
    |--------------------------------------------------------------------------
    | Level
    |--------------------------------------------------------------------------
    |
    | Level harus dibaca dari skor yang sama dengan yang disimpan, supaya
    | kolom level dan label yang ditampilkan ke user tidak berbeda.
    |
    */

    public function test_stored_level_always_matches_the_level_derived_from_the_same_score(): void
    {
        $category = $this->category('Self Kindness');

        $question = $this->question($category, 'SK-01', false, [1, 2, 3, 4, 5]);

        $result = $this->strategy->calculate($this->assess([[$question, 3]]));

        $this->assertSame(
            ScoreLevel::label((float) $result['results'][0]['score']),
            $result['results'][0]['level']
        );

        $this->assertSame(
            ScoreLevel::label((float) $result['total_score']),
            $result['final_result']
        );
    }

    public function test_total_score_maps_to_the_expected_level_band(): void
    {
        $category = $this->category('Self Kindness');

        $low = $this->question($category, 'SK-01', false, [1, 2, 3, 4, 5]);
        $high = $this->question($category, 'SK-02', false, [1, 2, 3, 4, 5]);
        $mid = $this->question($category, 'SK-03', false, [1, 2, 3, 4, 5]);

        $lowResult = $this->strategy->calculate($this->assess([[$low, 1]]));
        $this->assertSame('Perlu Perhatian', $lowResult['final_result']);

        $midResult = $this->strategy->calculate($this->assess([[$mid, 3]]));
        $this->assertSame('Cukup Baik', $midResult['final_result']);

        $highResult = $this->strategy->calculate($this->assess([[$high, 4]]));
        $this->assertSame('Baik', $highResult['final_result']);
    }

    /*
    |--------------------------------------------------------------------------
    | Fixture
    |--------------------------------------------------------------------------
    */

    private function category(string $name): AssessmentCategory
    {
        return AssessmentCategory::create([
            'name' => $name,
            'indonesian_name' => $name,
        ]);
    }

    /**
     * @param  array<int, int|string|null>  $optionValues
     */
    private function question(
        AssessmentCategory $category,
        string $code,
        bool $isReverse,
        array $optionValues
    ): Question {
        $question = Question::create([
            'assessment_type_id' => $this->type->id,
            'category_id' => $category->id,
            'question' => 'Butir '.$code,
            'question_code' => $code,
            'question_order' => 1,
            'answer_type' => 'likert_5',
            'is_reverse' => $isReverse,
        ]);

        foreach ($optionValues as $index => $value) {
            QuestionOption::create([
                'question_id' => $question->id,
                'option_text' => 'Opsi '.($index + 1),
                'option_value' => $value,
                'option_order' => $index + 1,
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
            $option = QuestionOption::where('question_id', $question->id)
                ->where('option_value', $optionValue)
                ->firstOrFail();

            $assessment->answers()->create([
                'question_id' => $question->id,
                'question_option_id' => $option->id,
                'answer_text' => $option->option_text,
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
}
