<?php

namespace App\Services;

use App\Models\Content;
use Illuminate\Support\Collection;

class RecommendationService
{
    /*
    |--------------------------------------------------------------------------
    | Jumlah Kategori
    |--------------------------------------------------------------------------
    |
    | Berapa banyak kategori terendah yang dipakai sebagai dasar
    | rekomendasi. Tiga sebagai titik awal yang wajar: cukup untuk
    | menutup tiga area terburuk tanpa membuat halaman hasil terlalu
    | panjang.
    |
    */

    protected const LOWEST_CATEGORY_COUNT = 3;

    /*
    |--------------------------------------------------------------------------
    | Urutan Kesulitan
    |--------------------------------------------------------------------------
    |
    | Kolom difficulty bertipe enum, jadi orderBy biasa mengurutkannya
    | sebagai teks: advanced, beginner, intermediate. Akibatnya materi
    | tersulit justru muncul paling depan. Diurutkan ulang lewat CASE
    | supaya urutan yang tampil adalah mudah, sedang, lalu sulit.
    |
    */

    protected const DIFFICULTY_ORDER = "CASE difficulty
        WHEN 'beginner' THEN 1
        WHEN 'intermediate' THEN 2
        WHEN 'advanced' THEN 3
        ELSE 4
    END";

    /**
     * Rekomendasi materi untuk sebuah hasil assessment.
     *
     * Arahkan ke kategori dengan skor terendah, karena di situlah
     * kebutuhan belajarnya paling tinggi. Tidak dipakai ambang nilai:
     * kalau semua kategori sudah bagus, kategori yang tetap terendah
     * yang dipilih, sehingga materi yang muncul adalah materi untuk
     * aspek yang memang paling lemah, sekecil apa pun selisihnya.
     */
    public function recommend(Collection $results): Collection
    {
        if ($results->isEmpty()) {
            return collect();
        }

        $categoryIds = $this->lowestCategoryIds($results);

        /*
         * Baris dominant_tag tidak punya kategori_id, hanya tag. Konten
         * untuknya lewat pencocokan kolom tag, bukan kategori.
         */
        $tags = $results
            ->pluck('value')
            ->filter()
            ->unique()
            ->values();

        if ($categoryIds->isEmpty() && $tags->isEmpty()) {
            return collect();
        }

        return Content::query()
            ->with('category')
            ->where('status', 'published')
            ->where(function ($query) use ($categoryIds, $tags) {
                if ($categoryIds->isNotEmpty()) {
                    $query->whereIn('category_id', $categoryIds);
                }

                if ($tags->isNotEmpty()) {
                    $query->orWhereIn('tag', $tags);
                }
            })
            ->when(
                $categoryIds->isNotEmpty(),
                fn ($query) => $query->orderByRaw(
                    $this->categoryOrder($categoryIds)
                )
            )
            ->orderByRaw(self::DIFFICULTY_ORDER)
            ->limit(6)
            ->get();
    }

    /**
     * Id kategori dengan skor terendah, dari yang paling rendah.
     *
     * @return Collection<int, int>
     */
    protected function lowestCategoryIds(Collection $results): Collection
    {
        return $results
            ->filter(fn ($row) => $row->category_id !== null)
            ->sortBy('score')
            ->take(self::LOWEST_CATEGORY_COUNT)
            ->pluck('category_id')
            ->unique()
            ->values();
    }

    /**
     * CASE yang mengurutkan konten mengikuti urutan kategori: konten dari
     * kategori paling lemah ditampilkan lebih dulu.
     *
     * @param  Collection<int, int>  $categoryIds
     */
    protected function categoryOrder(Collection $categoryIds): string
    {
        $branches = $categoryIds
            ->map(fn ($id, $position) => "WHEN {$id} THEN {$position}")
            ->implode(' ');

        return "CASE category_id {$branches} ELSE 99 END";
    }
}
