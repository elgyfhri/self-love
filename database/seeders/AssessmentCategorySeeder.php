<?php

namespace Database\Seeders;

use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use Illuminate\Database\Seeder;

class AssessmentCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $categories = [

            // ==========================
            // Self Compassion Scale
            // ==========================

            [
                'assessment_type_code' => 'SCS',
                'name' => 'Self Kindness',
                'indonesian_name' => 'Kebaikan pada Diri Sendiri',
                'abbreviation' => 'SK',
                'description' => 'Being kind and understanding toward yourself.',
            ],

            [
                'assessment_type_code' => 'SCS',
                'name' => 'Self Judgment',
                'indonesian_name' => 'Kritik terhadap Diri Sendiri',
                'abbreviation' => 'SJ',
                'description' => 'Harsh self-criticism toward yourself.',

            ],

            [
                'assessment_type_code' => 'SCS',
                'name' => 'Common Humanity',
                'indonesian_name' => 'Kemasyarakatan Manusia',
                'abbreviation' => 'CH',
                'description' => 'Seeing your experiences as part of the human experience.',
            ],

            [
                'assessment_type_code' => 'SCS',
                'name' => 'Isolation',
                'indonesian_name' => 'Perasaan Terisolasi',
                'abbreviation' => 'IS',
                'description' => 'Feeling isolated when facing difficulties.',
            ],

            [
                'assessment_type_code' => 'SCS',
                'name' => 'Mindfulness',
                'indonesian_name' => 'Kesadaran Penuh',
                'abbreviation' => 'MI',
                'description' => 'Maintaining balanced awareness of emotions.',
            ],

            [
                'assessment_type_code' => 'SCS',
                'name' => 'Over Identification',
                'indonesian_name' => 'Identifikasi Berlebihan',
                'abbreviation' => 'OI',
                'description' => 'Over-identifying with negative emotions.',
            ],

            // ==========================
            // Asesmen Kesehatan Mental
            // ==========================

            [
                'assessment_type_code' => 'KMJ',
                'name' => 'Perception of Self',
                'indonesian_name' => 'Perasaan tentang Diri Sendiri',
                'abbreviation' => 'B1',
                'description' => 'Identity diffusion, depersonalization, dan kecemasan terkait masa depan.',

            ],

            [
                'assessment_type_code' => 'KMJ',
                'name' => 'Relationships with Others',
                'indonesian_name' => 'Hubungan dengan Orang Lain',
                'abbreviation' => 'B2',
                'description' => 'Attachment insecurity, perfectionism, relationship instability.',

            ],

            [
                'assessment_type_code' => 'KMJ',
                'name' => 'Pressure and Performance',
                'indonesian_name' => 'Tekanan dan Kinerja',
                'abbreviation' => 'B3',
                'description' => 'Performance anxiety, catastrophic thinking, self-criticism.',

            ],

            [
                'assessment_type_code' => 'KMJ',
                'name' => 'Self Comparison and Validation',
                'indonesian_name' => 'Perbandingan Diri dan Penguatan',
                'abbreviation' => 'B4',
                'description' => 'Impostor syndrome, social comparison, contingent self-worth.',

            ],

            [
                'assessment_type_code' => 'KMJ',
                'name' => 'Withdrawal and Forgetting',
                'indonesian_name' => 'Melarikan Diri dan Pelupaan',
                'abbreviation' => 'B5',
                'description' => 'Dissociation, maladaptive daydreaming, emotional numbing.',

            ],

            [
                'assessment_type_code' => 'KMJ',
                'name' => 'Meaning and Values',
                'indonesian_name' => 'Pencarian Makna dan Nilai',
                'abbreviation' => 'B6',
                'description' => 'Existential depression, values conflict, purpose in life.',

            ],

            // ==========================
            // Brain Dominance Test
            // ==========================

            [
                'assessment_type_code' => 'BDT',
                'name' => 'Left Brain',
                'indonesian_name' => 'Otak Kiri',
                'abbreviation' => 'LB',
                'description' => 'Logical and analytical thinking.',
            ],

            [
                'assessment_type_code' => 'BDT',
                'name' => 'Right Brain',
                'indonesian_name' => 'Otak Kanan',
                'abbreviation' => 'RB',
                'description' => 'Creative and intuitive thinking.',
            ],

            // ==========================
            // Personality Test
            // ==========================

            [
                'assessment_type_code' => 'PT',
                'name' => 'Melancholic',
                'indonesian_name' => 'Melankolik',
                'abbreviation' => 'ME',
                'description' => 'Thoughtful and detail-oriented.',
            ],

            [
                'assessment_type_code' => 'PT',
                'name' => 'Sanguine',
                'indonesian_name' => 'Sanguin',
                'abbreviation' => 'SA',
                'description' => 'Cheerful and sociable.',
            ],

            [
                'assessment_type_code' => 'PT',
                'name' => 'Choleric',
                'indonesian_name' => 'Kolerik',
                'abbreviation' => 'CHO',
                'description' => 'Confident and decisive.',
            ],

            [
                'assessment_type_code' => 'PT',
                'name' => 'Phlegmatic',
                'indonesian_name' => 'Flegetik',
                'abbreviation' => 'PH',
                'description' => 'Calm and patient.',
            ],

        ];

       foreach ($categories as $item) {

    $assessment = AssessmentType::where(
        'code',
        $item['assessment_type_code']
    )->firstOrFail();

    $category = AssessmentCategory::updateOrCreate(
        [
            'name' => $item['name'],
        ],
        [
            'indonesian_name' => $item['indonesian_name'],
            'abbreviation' => $item['abbreviation'],
            'description' => $item['description'],
        ]
    );

    $assessment->categories()->syncWithoutDetaching($category->id);
}
    }
}
