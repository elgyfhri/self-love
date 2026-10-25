<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')
                  ->nullable()
                ->constrained('assessment_categories')
                ->nullOnDelete();
            $table->foreignId('assessment_type_id')
                ->constrained('assessment_types')
                ->cascadeOnDelete();

            $table->text('question');

            $table->unsignedInteger('question_order');
            $table->string('question_code')->unique();

            $table->enum('answer_type', [
                'likert_5',
                'multiple_choice',
                'boolean',
            ])->default('likert_5');
            

            $table->boolean('is_reverse')->default(false);

            $table->boolean('is_required')->default(true);

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};