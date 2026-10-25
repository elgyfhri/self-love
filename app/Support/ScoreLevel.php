<?php

namespace App\Support;

class ScoreLevel
{
    /**
     * Ambil kata level dari sebuah skor (skala 1-5).
     *
     * Setiap instrumen boleh punya band sendiri karena arti skor tidak
     * sama antar instrumen. Kalau $assessmentCode terdaftar di
     * config('assessment.level_sets'), band itu yang dipakai. Kalau
     * tidak, jatuh ke band global.
     */
    public static function label(float $score, ?string $assessmentCode = null): string
    {
        $levels = static::bands($assessmentCode);

        foreach ($levels as $level) {
            if ($level['max'] === null || $score < $level['max']) {
                return $level['label'];
            }
        }

        return $levels[0]['label'];
    }

    /**
     * Semua label level, dari yang terendah ke tertinggi.
     *
     * @return array<int, string>
     */
    public static function labels(?string $assessmentCode = null): array
    {
        return array_column(static::bands($assessmentCode), 'label');
    }

    /**
     * Band level milik satu instrumen, atau band global sebagai cadangan.
     *
     * @return array<int, array{max: float|null, label: string}>
     */
    public static function bands(?string $assessmentCode = null): array
    {
        if ($assessmentCode !== null) {
            $levels = config("assessment.level_sets.{$assessmentCode}");

            if (is_array($levels) && $levels !== []) {
                return $levels;
            }
        }

        return config('assessment.levels');
    }
}
