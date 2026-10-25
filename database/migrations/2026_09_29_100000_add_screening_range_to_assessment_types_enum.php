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
            $table->enum('scoring_type', [
                'score_range',
                'dominant_tag',
                'screening_range',
            ])->default('score_range')->change();
        });
    }

    public function down(): void
    {
        Schema::table('assessment_types', function (Blueprint $table) {
            /*
             * Baris yang memakai screening_range harus dikembalikan dulu
             * ke score_range, karena nilai enum tidak boleh dihapus
             * selama masih ada baris yang memakainya.
             */
            DB::table('assessment_types')
                ->where('scoring_type', 'screening_range')
                ->update(['scoring_type' => 'score_range']);

            $table->enum('scoring_type', [
                'score_range',
                'dominant_tag',
            ])->default('score_range')->change();
        });
    }
};
