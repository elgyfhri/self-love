<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('assessment_types', function (Blueprint $table) {
            $table->text('source')->nullable()->after('description');
            $table->text('purpose')->nullable()->after('source');
        });

        /*
        |--------------------------------------------------------------------------
        | Backfill
        |--------------------------------------------------------------------------
        |
        | Diisi manual memakai rujukan publik, bukan diambil otomatis.
        | Hanya assessment yang benar-benar dipakai (SCS-SF, BDT, PT).
        |
        */

        $content = [
            'SCS-SF' => [
                'source' => 'Self Compassion Scale disusun oleh Kristin D. Neff (2003) '
                    . 'berdasarkan teori self-compassion. Assessment ini memakai '
                    . 'versi pendek (Self Compassion Scale - Short Form) '
                    . 'sebanyak 12 pernyataan yang terbagi ke dalam 6 subskala.',

                'purpose' => 'Mengukur sejauh mana kamu berpihak pada dirimu sendiri '
                    . 'ketika menghadapi kegagalan atau kesulitan. Assessment ini '
                    . 'mencakup 6 aspek: Self Kindness, Self Judgment, '
                    . 'Common Humanity, Isolation, Mindfulness, dan Over '
                    . 'Identification.',
            ],

            'BDT' => [
                'source' => 'Diadaptasi dari konsep dominasi otak kiri dan kanan '
                    . '(whole-brain thinking) yang dipopulerkan oleh Ned Herrmann. '
                    . 'Versi pada aplikasi ini adalah adaptasi sederhana, bukan '
                    . 'alat diagnostik klinis.',

                'purpose' => 'Mengenali kecenderungan cara berpikir kamu: lebih '
                    . 'condong ke arah yang logis dan analitis (Left Brain) atau '
                    . 'yang kreatif dan intuitif (Right Brain).',
            ],

            'PT' => [
                'source' => 'Mengikuti teori temperamen klasik (four temperaments) '
                    . 'yang berakar pada Hippocrates dan kemudian dikembangkan '
                    . 'dalam psikologi kepribadian modern.',

                'purpose' => 'Mengenali temperament dominan kamu di antara empat '
                    . 'kecenderungan: Melankolik, Sanguin, Kolerik, dan Flegetik, '
                    . 'agar kamu lebih paham cara sebaiknya berkomunikasi dan '
                    . 'mengelola diri.',
            ],
        ];

        foreach ($content as $code => $fields) {
            DB::table('assessment_types')
                ->where('code', $code)
                ->update($fields);
        }
    }

    public function down(): void
    {
        Schema::table('assessment_types', function (Blueprint $table) {
            $table->dropColumn(['source', 'purpose']);
        });
    }
};
