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
 * Mengganti seluruh materi pembelajaran dengan enam materi Self Compassion,
 * satu untuk setiap kategori Self Compassion Scale.
 *
 * Seeder ini destruktif dan repeatable: setiap dijalankan, isi tabel `contents`
 * dibersihkan total lalu diisi ulang dari
 * database/seeders/data/scs_learning_content.php. Hasil akhirnya selalu sama,
 * yaitu enam artikel published tanpa materi global.
 *
 * Jalankan dengan:
 *   php artisan db:seed --class=SCSContentSeeder
 */
class SCSContentSeeder extends Seeder
{
    /**
     * Kategori yang wajib terisi, berurutan sesuai urutan materi.
     */
    private const EXPECTED_CATEGORIES = [
        'Self Kindness',
        'Self Judgment',
        'Common Humanity',
        'Isolation',
        'Mindfulness',
        'Over Identification',
    ];

    /**
     * Id assessment type SCS, dipakai untuk membatasi pembersihan.
     */
    private int $assessmentTypeId;

    public function run(): void
    {
        $this->assessmentTypeId = AssessmentType::where('code', 'SCS')->value('id');

        if (! $this->assessmentTypeId) {
            throw new RuntimeException(
                'Assessment type "SCS" tidak ditemukan. Jalankan AssessmentTypeSeeder dan AssessmentCategorySeeder terlebih dahulu.'
            );
        }

        $categoryIds = AssessmentCategory::pluck('id', 'name');

        $content = require database_path('seeders/data/scs_learning_content.php');

        $this->guard($content);

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
            'Content SCS dibersihkan (%d -> 0) lalu diisi ulang menjadi %d artikel published.',
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
            throw new RuntimeException('File data scs_learning_content.php tidak memuat artikel.');
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
     * Pembersihan ini hanya menyentuh materi milik SCS. Kalau tidak
     * dibatasi, menjalankan db:seed akan ikut menghapus materi
     * instrumen lain seperti KMJ, karena AssessmentService dibutuhkan
     * satu materi published per kategori.
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
