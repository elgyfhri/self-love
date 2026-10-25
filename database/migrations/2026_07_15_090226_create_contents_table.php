<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contents', function (Blueprint $table) {

            $table->id();

            $table->foreignId('category_id')
                ->nullable()
                ->constrained('assessment_categories')
                ->nullOnDelete();

            $table->foreignId('assessment_type_id')
                ->nullable()
                ->constrained('assessment_types')
                ->nullOnDelete();

            $table->text('excerpt')->nullable();

            $table->string('title');

            $table->string('slug')->unique();

            $table->enum('type',[
                'article',
                'video',
                'audio',
                'worksheet',
                'challenge'
            ])->default('article');

            $table->string('thumbnail')->nullable();

            $table->longText('content')->nullable();

            $table->string('media_url')->nullable();

            $table->unsignedTinyInteger('estimated_time')->default(5);
            $table->string('tag')->nullable();
            $table->enum('difficulty',[
                'beginner',
                'intermediate',
                'advanced'
            ])->default('beginner');

            $table->enum('status', [
                'draft',
                'published',
                'archived'
            ])->default('draft');
            $table->boolean('is_featured')->default(false);

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};