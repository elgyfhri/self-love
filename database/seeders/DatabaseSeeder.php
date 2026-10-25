<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            AdminSeeder::class,
            AssessmentTypeSeeder::class,
            AssessmentCategorySeeder::class,
            QuestionSeeder::class,
            MentalHealthQuestionSeeder::class,
            QuestionOptionSeeder::class,
            SCSContentSeeder::class,
            MentalHealthContentSeeder::class,
        ]);
    }
}
