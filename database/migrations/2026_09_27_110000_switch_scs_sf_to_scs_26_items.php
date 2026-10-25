<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $scsId = DB::table('assessment_types')
            ->where('code', 'SCS-SF')
            ->value('id');

        if ($scsId === null) {
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | 1. Bersihkan riwayat versi 12 butir
        |--------------------------------------------------------------------------
        |
        | Skor hasil lama dihitung dari instrumen yang berbeda, jadi tidak
        | sebanding dengan versi 26 butir. Riwayat lama dihapus agar tidak
        | ditampilkan seolah-olah berasal dari instrumen sekarang.
        | Catatan: DOM_TAG tidak tersentuh.
        |
        */

        $assessmentIds = DB::table('user_assessments')
            ->where('assessment_type_id', $scsId)
            ->pluck('id');

        DB::table('assessment_results')
            ->whereIn('user_assessment_id', $assessmentIds)
            ->delete();

        DB::table('assessment_answers')
            ->whereIn('user_assessment_id', $assessmentIds)
            ->delete();

        DB::table('user_assessments')
            ->whereIn('id', $assessmentIds)
            ->delete();

        /*
        |--------------------------------------------------------------------------
        | 2. Hapus 12 butir Short Form
        |--------------------------------------------------------------------------
        |
        | Dihapus (bukan diubah) karena nomor butir versi Indonesia tidak
        | sama dengan versi Inggris. Kalau butir lama dipakai ulang, jawaban
        | lama akan menempel ke butir yang maknanya berbeda.
        |
        */

        $questionIds = DB::table('questions')
            ->where('assessment_type_id', $scsId)
            ->pluck('id');

        DB::table('assessment_answers')
            ->whereIn('question_id', $questionIds)
            ->delete();

        DB::table('questions')
            ->whereIn('id', $questionIds)
            ->delete();

        /*
        |--------------------------------------------------------------------------
        | 3. Ganti kode dan metadata
        |--------------------------------------------------------------------------
        |
        | "SF" (Short Form) tidak lagi tepat, jadi kode diganti menjadi SCS.
        |
        */

        DB::table('assessment_types')
            ->where('id', $scsId)
            ->update([
                'name' => 'Self Compassion Scale',
                'code' => 'SCS',
                'description' => 'Self Compassion Scale (26 butir, terjemahan Indonesia resmi)',
                'estimated_time' => 12,

                'source' => implode("\n", [
                    'Skala Welas Diri (Self-Compassion Scale) disusun oleh Kristin D. Neff (2003) berdasarkan teori self-compassion. Assessment ini memakai versi penuh 26 pernyataan yang terbagi ke dalam 6 subskala, memakai terjemahan bahasa Indonesia yang sudah divalidasi.',
                    '',
                    'Skala ini boleh digunakan secara gratis untuk berbagai tujuan, termasuk penelitian, kerja klinis, dan pembelajaran, selama sumber aslinya tetap dicantumkan.',
                    '',
                    'Referensi:',
                    'Neff, K. D. (2003). Self and Identity, 2(3), 223-250.',
                    'Sugianto, D., Suwartono, C., & Sutanto, S. H. (2020). Reliabilitas dan validitas Self-Compassion Scale versi bahasa Indonesia. Jurnal Psikologi Ulayat. doi: 10.24854/jpu02020-337',
                    '',
                    'Dokumen resmi:',
                    'https://self-compassion.org/self-compassion-scales-for-researchers/',
                    'https://self-compassion.org/wp-content/uploads/2021/03/SCS-information.pdf',
                    'https://self-compassion.org/wp-content/uploads/2020/08/Indonesian-Translation-of-SCS.pdf',
                ]),

                'purpose' => implode("\n", [
                    'Mengukur sejauh mana kamu berpihak pada dirimu sendiri ketika menghadapi kegagalan atau kesulitan. Assessment ini mencakup 6 subskala: Self Kindness, Self Judgment, Common Humanity, Isolation, Mindfulness, dan Over Identification.',
                    '',
                    'Skor setiap subskala dihitung dari rata-rata butirnya. Karena memakai versi penuh, skor per subskala ini sah untuk ditampilkan.',
                    '',
                    'Catatan: Neff menyatakan tidak ada norma formal untuk skala ini. Level hasil memakai pembagian tidak resmi dari FAQ self-compassion.org: 1-2.49 (Perlu Perhatian), 2.5-3.49 (Cukup Baik), dan 3.5-5.0 (Baik).',
                ]),
            ]);
    }

    public function down(): void
    {
        $scsId = DB::table('assessment_types')
            ->where('code', 'SCS')
            ->value('id');

        if ($scsId === null) {
            return;
        }

        DB::table('assessment_types')
            ->where('id', $scsId)
            ->update([
                'name' => 'Self Compassion Scale',
                'code' => 'SCS-SF',
                'description' => 'Self Compassion Scale Short Form',
                'estimated_time' => 5,
            ]);
    }
};
