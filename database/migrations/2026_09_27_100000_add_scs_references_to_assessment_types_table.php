<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const PREVIOUS_SOURCE = 'Self Compassion Scale disusun oleh Kristin D. Neff (2003) '
        . 'berdasarkan teori self-compassion. Assessment ini memakai '
        . 'versi pendek (Self Compassion Scale - Short Form) '
        . 'sebanyak 12 pernyataan yang terbagi ke dalam 6 subskala.';

    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Referensi & Dokumen Resmi
        |--------------------------------------------------------------------------
        |
        | Menambahkan sitasi dan tautan resmi self-compassion.org pada
        | AssessmentType SCS-SF. Teks disimpan sebagai data agar tetap
        | bisa diedit dari panel admin.
        |
        */

        DB::table('assessment_types')
            ->where('code', 'SCS-SF')
            ->update([
                'source' => implode("\n", [
                    'Self Compassion Scale disusun oleh Kristin D. Neff (2003) berdasarkan teori self-compassion. Assessment ini memakai versi pendek (Self Compassion Scale - Short Form) sebanyak 12 pernyataan yang terbagi ke dalam 6 subskala.',
                    '',
                    'Skala ini boleh digunakan secara gratis untuk berbagai tujuan, termasuk penelitian, kerja klinis, dan pembelajaran, selama sumber aslinya tetap dicantumkan.',
                    '',
                    'Referensi:',
                    'Neff, K. D. (2003). Self and Identity, 2(3), 223-250.',
                    'Raes, L., Holz, E. M., & Van der Linden, B. D. P. (2011). Clinical Psychology & Psychotherapy, 18, 250-255.',
                    '',
                    'Dokumen resmi:',
                    'https://self-compassion.org/self-compassion-scales-for-researchers/',
                    'https://self-compassion.org/wp-content/uploads/2021/03/SCS-SF-information.pdf',
                    '',
                    'Dokumen terjemahan resmi bahasa Indonesia:',
                    'https://self-compassion.org/wp-content/uploads/2020/08/Indonesian-Translation-of-SCS.pdf',
                ]),
            ]);
    }

    public function down(): void
    {
        DB::table('assessment_types')
            ->where('code', 'SCS-SF')
            ->update(['source' => self::PREVIOUS_SOURCE]);
    }
};
