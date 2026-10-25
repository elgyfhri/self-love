<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('assessment_category_type', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_type_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('assessment_category_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->timestamps();
           $table->unique(
    ['assessment_type_id', 'assessment_category_id'],
    'assessment_type_category_unique'
);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_category_type');
    }
};
