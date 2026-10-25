<?php

namespace Tests\Feature\Assessment;

use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use App\Models\Content;
use App\Models\Question;
use Database\Seeders\AssessmentCategorySeeder;
use Database\Seeders\AssessmentTypeSeeder;
use Database\Seeders\MentalHealthContentSeeder;
use Database\Seeders\MentalHealthQuestionSeeder;
use Database\Seeders\QuestionOptionSeeder;
use Database\Seeders\QuestionSeeder;
use Database\Seeders\SCSContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Menjamin data assessment kesehatan mental tetap utuh dan materi
 * pembelajarannya selalu tersedia per kategori.
 *
 * Seeder materi dipilih karena AssessmentService/RecommendationService
 * butuh tepat satu content published per kategori. Kalau ada kategori
 * tanpa materi, halaman hasil assessment akan kehilangan bagian
 * rekomendasi tanpa error yang terlihat.
 */
class MentalHealthContentSeederTest extends TestCase
{
    use RefreshDatabase;

    private const KMJ_CATEGORIES = [
        'Perception of Self',
        'Relationships with Others',
        'Pressure and Performance',
        'Self Comparison and Validation',
        'Withdrawal and Forgetting',
        'Meaning and Values',
    ];

    private AssessmentType $kmj;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            AssessmentTypeSeeder::class,
            AssessmentCategorySeeder::class,
            QuestionSeeder::class,
            MentalHealthQuestionSeeder::class,
            QuestionOptionSeeder::class,
        ]);

        $this->kmj = AssessmentType::where('code', 'KMJ')->firstOrFail();
    }

    public function test_it_creates_one_published_content_per_category(): void
    {
        $this->seed(MentalHealthContentSeeder::class);

        $contents = Content::where('assessment_type_id', $this->kmj->id)
            ->where('status', 'published')
            ->get();

        $this->assertCount(6, $contents);

        foreach (self::KMJ_CATEGORIES as $name) {
            $this->assertSame(
                1,
                $contents->where('category.name', $name)->count(),
                "Kategori {$name} harus punya tepat satu materi published."
            );
        }
    }

    public function test_it_does_not_touch_other_assessment_content(): void
    {
        $this->seed(MentalHealthContentSeeder::class);
        $this->seed(SCSContentSeeder::class);

        $this->seed(MentalHealthContentSeeder::class);

        $scs = AssessmentType::where('code', 'SCS')->firstOrFail();

        $this->assertSame(
            6,
            Content::where('assessment_type_id', $scs->id)->count(),
            'Menjalankan seeder KMJ tidak boleh menghapus materi SCS.'
        );

        $this->assertSame(
            6,
            Content::where('assessment_type_id', $this->kmj->id)->count()
        );
    }

    public function test_seeder_is_repeatable_without_duplicating_content(): void
    {
        $this->seed(MentalHealthContentSeeder::class);
        $this->seed(MentalHealthContentSeeder::class);

        $contents = Content::where('assessment_type_id', $this->kmj->id)->get();

        $this->assertCount(6, $contents);
        $this->assertCount(6, $contents->pluck('slug')->unique());
    }

    public function test_it_stores_content_as_editablejs_blocks(): void
    {
        $this->seed(MentalHealthContentSeeder::class);

        $content = Content::where('assessment_type_id', $this->kmj->id)->firstOrFail();

        $decoded = json_decode($content->content, true);

        $this->assertIsArray($decoded, 'Content harus berupa JSON Editor.js.');
        $this->assertArrayHasKey('blocks', $decoded);
        $this->assertNotEmpty($decoded['blocks']);

        $types = array_column($decoded['blocks'], 'type');

        $this->assertContains('paragraph', $types);
        $this->assertContains('header', $types);
        $this->assertContains('list', $types);
    }

    public function test_it_records_sources_for_every_article(): void
    {
        $this->seed(MentalHealthContentSeeder::class);

        $contents = Content::where('assessment_type_id', $this->kmj->id)->get();

        foreach ($contents as $content) {
            $this->assertNotEmpty($content->source, "Materi {$content->title} belum punya sitasi.");
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Instrumen
    |--------------------------------------------------------------------------
    */

    public function test_it_seeds_thirty_reverse_scored_questions(): void
    {
        $questions = Question::where('assessment_type_id', $this->kmj->id)->get();

        $this->assertCount(30, $questions);
        $this->assertCount(30, $questions->where('is_reverse', true));

        foreach ($questions as $question) {
            $this->assertNotNull($question->category_id, "Soal {$question->question_code} tanpa kategori.");
            $this->assertCount(5, $question->options);
        }
    }

    public function test_it_keeps_scs_questions_untouched(): void
    {
        $scs = AssessmentType::where('code', 'SCS')->firstOrFail();

        $this->assertCount(26, Question::where('assessment_type_id', $scs->id)->get());
    }

    public function test_every_kmj_category_has_five_questions(): void
    {
        $categoryIds = AssessmentCategory::whereIn('name', self::KMJ_CATEGORIES)
            ->pluck('id', 'name');

        foreach (self::KMJ_CATEGORIES as $name) {
            $count = Question::where('category_id', $categoryIds[$name])->count();

            $this->assertSame(5, $count, "Kategori {$name} harus punya lima soal.");
        }
    }
}
