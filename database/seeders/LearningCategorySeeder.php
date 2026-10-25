<?php

namespace Database\Seeders;

use App\Models\LearningCategory;
use Illuminate\Database\Seeder;

class LearningCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Self Acceptance',
            'Self Compassion',
            'Self Confidence',
            'Emotional Awareness',
            'Healthy Boundaries',
            'Gratitude'
        ];

        foreach ($categories as $category) {
            LearningCategory::create([
                'name' => $category,
                'description' => $category . ' Learning Materials'
            ]);
        }
    }
}