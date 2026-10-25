<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_results', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_assessment_id')
                ->constrained()
                ->cascadeOnDelete();

           $table->foreignId('category_id')
                ->nullable()
                ->constrained('assessment_categories')
                ->nullOnDelete();

            $table->decimal('score',5,2);

            $table->string('level')->nullable();

            $table->text('recommendation')->nullable();
            $table->string('value')->nullable();

            $table->timestamps();

            $table->unique([
                'user_assessment_id',
                'category_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_results');
    }
};