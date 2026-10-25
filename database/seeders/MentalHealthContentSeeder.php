<?php

namespace Database\Seeders;

use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use App\Models\Content;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * Mengisi materi pembelajaran untuk assessment kesehatan mental (KMJ),
 * satu materi untuk setiap kategori, dari
 * database/seeders/data/kmj_learning_content.php.
 *
 * Seeder ini repeatable dan tidak merusak materi instrumen lain.
 * Pembersihan hanya menyentuh content milik KMJ.
 *
 * Jalankan dengan:
 *   php artisan db:seed --class=MentalHealthContentSeeder
 */
class MentalHealthContentSeeder extends Seeder
{
    /**
     * Kategori yang wajib terisi, berurutan sesuai urutan materi.
     */
    private const EXPECTED_CATEGORIES = [
        'Perception of Self',
        'Relationships with Others',
        'Pressure and Performance',
        'Self Comparison and Validation',
        'Withdrawal and Forgetting',
        'Meaning and Values',
    ];

    /**
     * Kode assessment type, dipakai untuk membatasi pembersihan.
     */
    private const ASSESSMENT_CODE = 'KMJ';

    /**
     * Id assessment type, diisi di run().
     */
    private int $assessmentTypeId;

    public function run(): void
    {
        $this->assessmentTypeId = AssessmentType::where('code', self::ASSESSMENT_CODE)->value('id');

        if (! $this->assessmentTypeId) {
            throw new RuntimeException(sprintf(
                'Assessment type "%s" tidak ditemukan. Jalankan AssessmentTypeSeeder dan AssessmentCategorySeeder terlebih dahulu.',
                self::ASSESSMENT_CODE
            ));
        }

        $content = require database_path('seeders/data/kmj_learning_content.php');

        $this->guard($content);

        $categoryIds = AssessmentCategory::pluck('id', 'name');

        $before = Content::where('assessment_type_id', $this->assessmentTypeId)->count();

        $this->clearExistingContent();

        foreach ($content['articles'] as $index => $article) {
            Content::create([
                'assessment_type_id' => $this->assessmentTypeId,
                'category_id' => $categoryIds[$article['category']],
                'title' => $article['title'],
                'slug' => Str::slug($article['title']),
                'excerpt' => $article['excerpt'],
                'source' => $this->resolveSource($article, $content['sources']),
                'type' => 'article',
                'thumbnail' => null,
                'content' => $this->resolveBody($article),
                'media_url' => null,
                'estimated_time' => $article['estimated_time'],
                'tag' => null,
                'difficulty' => $article['difficulty'],
                'status' => 'published',
                'is_featured' => false,
            ]);

            $this->command?->line(sprintf(
                '  %d. %s (%s)',
                $index + 1,
                $article['title'],
                $article['category']
            ));
        }

        $this->command?->info(sprintf(
            'Content %s dibersihkan (%d -> 0) lalu diisi ulang menjadi %d artikel published.',
            self::ASSESSMENT_CODE,
            $before,
            Content::where('assessment_type_id', $this->assessmentTypeId)->count()
        ));
    }

    /**
     * Pastikan file data benar-benar memuat enam kategori yang diharapkan,
     * supaya kondisi gagal muncul sebelum tabel dikosongkan.
     */
    private function guard(array $content): void
    {
        $articles = $content['articles'] ?? null;

        if (! is_array($articles) || $articles === []) {
            throw new RuntimeException('File data kmj_learning_content.php tidak memuat artikel.');
        }

        $categories = array_column($articles, 'category');

        $missing = array_diff(self::EXPECTED_CATEGORIES, $categories);
        $extra = array_diff($categories, self::EXPECTED_CATEGORIES);

        if ($missing !== [] || $extra !== [] || count($categories) !== count(self::EXPECTED_CATEGORIES)) {
            throw new RuntimeException(sprintf(
                'Kategori di file data tidak sesuai. Ada kategori tak terduga: %s. Kategori hilang: %s. Total artikel: %d.',
                implode(', ', $extra) ?: '-',
                implode(', ', $missing) ?: '-',
                count($categories)
            ));
        }

        $existing = AssessmentCategory::pluck('name')->all();
        $orphan = array_diff($categories, $existing);

        if ($orphan !== []) {
            throw new RuntimeException(
                'Kategori berikut belum ada di tabel assessment_categories: '.implode(', ', $orphan)
            );
        }

        foreach ($articles as $article) {
            $unknown = array_diff($article['source'] ?? [], array_keys($content['sources'] ?? []));

            if ($unknown !== []) {
                throw new RuntimeException(sprintf(
                    'Artikel "%s" merujuk sumber yang tidak dikenal: %s.',
                    $article['title'],
                    implode(', ', $unknown)
                ));
            }
        }
    }

    /**
     * Bersihkan progress user dan pivot tag lebih dulu supaya tidak bergantung
     * pada cascade, baru hapus baris contents.
     *
     * Hanya materi milik KMJ yang dihapus, sehingga materi SCS tetap utuh.
     */
    private function clearExistingContent(): void
    {
        DB::transaction(function (): void {
            $ids = Content::where('assessment_type_id', $this->assessmentTypeId)->pluck('id');

            DB::table('user_contents')->whereIn('content_id', $ids)->delete();
            DB::table('content_tag')->whereIn('content_id', $ids)->delete();

            Content::whereIn('id', $ids)->delete();
        });
    }

    /**
     * Bungkus blok Editor.js dengan selubung yang dibaca renderEditorBlocks().
     */
    private function resolveBody(array $article): string
    {
        return json_encode(
            [
                'time' => now()->timestamp,
                'blocks' => $article['blocks'],
                'version' => '2.30.0',
            ],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
    }

    /**
     * Rangkai daftar sitasi menjadi satu kolom source.
     */
    private function resolveSource(array $article, array $sources): string
    {
        return collect($article['source'] ?? [])
            ->map(fn (string $key): string => $sources[$key] ?? '')
            ->filter()
            ->implode("\n\n");
    }
}
