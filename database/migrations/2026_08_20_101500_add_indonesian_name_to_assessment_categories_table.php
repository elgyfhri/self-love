<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('assessment_categories', function (Blueprint $table) {
            $table->string('indonesian_name')->nullable()->after('name');
        });

        /*
        |--------------------------------------------------------------------------
        | Backfill
        |--------------------------------------------------------------------------
        |
        | Dicocokkan berdasarkan abbreviation karena sudah unik dan stabil,
        | sehingga data lama ikut terisi tanpa perlu seeding ulang.
        |
        */

        $names = [
            'SK' => 'Kebaikan pada Diri Sendiri',
            'SJ' => 'Kritik terhadap Diri Sendiri',
            'CH' => 'Kemasyarakatan Manusia',
            'IS' => 'Perasaan Terisolasi',
            'MI' => 'Kesadaran Penuh',
            'OI' => 'Identifikasi Berlebihan',
            'LB' => 'Otak Kiri',
            'RB' => 'Otak Kanan',
            'ME' => 'Melankolik',
            'SA' => 'Sanguin',
            'CHO' => 'Kolerik',
            'PH' => 'Flegetik',
        ];

        foreach ($names as $abbreviation => $indonesianName) {
            DB::table('assessment_categories')
                ->where('abbreviation', $abbreviation)
                ->update(['indonesian_name' => $indonesianName]);
        }
    }

    public function down(): void
    {
        Schema::table('assessment_categories', function (Blueprint $table) {
            $table->dropColumn('indonesian_name');
        });
    }
};
