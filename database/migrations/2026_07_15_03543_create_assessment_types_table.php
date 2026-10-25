<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_types', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('code')->unique();

            $table->text('description')->nullable();
            $table->longText('instructions')->nullable();

            $table->string('thumbnail')->nullable();

            $table->unsignedTinyInteger('estimated_time')->default(5);

            $table->enum('status', [
                'draft',
                'published',
                'archived'
            ])->default('draft');
            $table->enum('scoring_type', [
                'score_range',
                'dominant_tag',
            ])->default('score_range');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_types');
    }
};