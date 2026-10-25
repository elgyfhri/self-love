<?php


namespace Database\Seeders;

use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use App\Models\Content;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $assessmentTypes = AssessmentType::pluck('id', 'code');
        $categories = AssessmentCategory::pluck('id', 'name');

        $scsContent = require database_path('seeders/data/scs_learning_content.php');
        $scsSources = $scsContent['sources'];

        $articlesByTitle = collect($scsContent['articles'])->keyBy('title');

        $contents = [

            /*
            |--------------------------------------------------------------------------
            | GENERAL CONTENT
            |--------------------------------------------------------------------------
            */

            [
                'assessment' => null,
                'category' => null,
                'title' => 'Apa Itu Self Love?',
                'excerpt' => 'Mengenal konsep self love.',
                'type' => 'article',
                'estimated_time' => 5,
                'difficulty' => 'beginner',
                'featured' => true,
            ],

            [
                'assessment' => null,
                'category' => null,
                'title' => 'Cara Mengelola Emosi',
                'excerpt' => 'Belajar mengenali dan mengelola emosi.',
                'type' => 'article',
                'estimated_time' => 7,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            /*
            |--------------------------------------------------------------------------
            | SCS GENERAL
            |--------------------------------------------------------------------------
            */

            [
                'assessment' => 'SCS',
                'category' => null,
                'title' => 'Apa Itu Self Compassion?',
                'excerpt' => 'Pengenalan Self Compassion.',
                'type' => 'article',
                'estimated_time' => 5,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            /*
            |--------------------------------------------------------------------------
            | SELF KINDNESS
            |--------------------------------------------------------------------------
            */

            [
                'assessment' => 'SCS',
                'category' => 'Self Kindness',
                'title' => 'Belajar Berdamai Dengan Diri Sendiri',
                'excerpt' => 'Latihan Self Kindness.',
                'type' => 'article',
                'estimated_time' => 5,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            [
                'assessment' => 'SCS',
                'category' => 'Self Kindness',
                'title' => 'Self Care Tanpa Rasa Bersalah',
                'excerpt' => 'Belajar merawat diri.',
                'type' => 'article',
                'estimated_time' => 7,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            /*
            |--------------------------------------------------------------------------
            | SELF JUDGMENT
            |--------------------------------------------------------------------------
            */

            [
                'assessment' => 'SCS',
                'category' => 'Self Judgment',
                'title' => 'Mengurangi Kritik Pada Diri Sendiri',
                'excerpt' => 'Cara melunakkan self-criticism.',
                'type' => 'article',
                'estimated_time' => 5,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            [
                'assessment' => 'SCS',
                'category' => 'Self Judgment',
                'title' => 'Belajar Memaafkan Diri Sendiri',
                'excerpt' => 'Latihan self-forgiveness.',
                'type' => 'article',
                'estimated_time' => 7,
                'difficulty' => 'intermediate',
                'featured' => false,
            ],

            /*
            |--------------------------------------------------------------------------
            | COMMON HUMANITY
            |--------------------------------------------------------------------------
            */

            [
                'assessment' => 'SCS',
                'category' => 'Common Humanity',
                'title' => 'Kesalahan Adalah Bagian Dari Manusia',
                'excerpt' => 'Menyadari bahwa kita tidak sendirian.',
                'type' => 'article',
                'estimated_time' => 5,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            /*
            |--------------------------------------------------------------------------
            | ISOLATION
            |--------------------------------------------------------------------------
            */

            [
                'assessment' => 'SCS',
                'category' => 'Isolation',
                'title' => 'Keluar Dari Rasa Terisolasi',
                'excerpt' => 'Membangun koneksi saat merasa sendiri.',
                'type' => 'article',
                'estimated_time' => 6,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            /*
            |--------------------------------------------------------------------------
            | MINDFULNESS
            |--------------------------------------------------------------------------
            */

            [
                'assessment' => 'SCS',
                'category' => 'Mindfulness',
                'title' => 'Mengelola Emosi Dengan Mindful',
                'excerpt' => 'Latihan kesadaran penuh pada emosi.',
                'type' => 'article',
                'estimated_time' => 7,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            /*
            |--------------------------------------------------------------------------
            | OVER IDENTIFICATION
            |--------------------------------------------------------------------------
            */

            [
                'assessment' => 'SCS',
                'category' => 'Over Identification',
                'title' => 'Lepas Dari Perasaan Larut Dalam Masalah',
                'excerpt' => 'Mengurangi over-identification.',
                'type' => 'article',
                'estimated_time' => 5,
                'difficulty' => 'beginner',
                'featured' => false,
            ],

            // lanjutkan category lainnya...
        ];

        foreach ($contents as $content) {

            $article = $articlesByTitle->get($content['title']);

            $body = $article
                ? json_encode(
                    [
                        'time' => now()->timestamp,
                        'blocks' => $article['blocks'],
                        'version' => '2.30.0',
                    ],
                    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
                )
                : 'Lorem ipsum...';

            $source = $article
                ? collect($article['source'])
                    ->map(fn (string $key): string => $scsSources[$key] ?? '')
                    ->filter()
                    ->implode("\n\n")
                : null;

            Content::updateOrCreate(
                [
                    'title' => $content['title'],
                ],
                [
                    'assessment_type_id' => $content['assessment']
                        ? $assessmentTypes[$content['assessment']]
                        : null,

                    'category_id' => $content['category']
                        ? $categories[$content['category']]
                        : null,

                    'slug' => Str::slug($content['title']),
                    'excerpt' => $article['excerpt'] ?? $content['excerpt'],
                    'type' => $content['type'],
                    'thumbnail' => null,
                    'content' => $body,
                    'source' => $source,
                    'media_url' => null,
                    'estimated_time' => $article['estimated_time'] ?? $content['estimated_time'],
                    'difficulty' => $article['difficulty'] ?? $content['difficulty'],
                    'is_featured' => $content['featured'],
                    'status' => 'published',
                ]
            );
        }
    }
}
