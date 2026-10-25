<?php

namespace Database\Seeders;

use App\Models\AssessmentType;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Seeder;

class QuestionOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Opsi Likert disimpan per soal, jadi tiap instrumen boleh punya
     * redaksi anchor sendiri. SCS memakai kata "Hampir" di ujung
     * skala, sedangkan KMJ memakai dua kata: sisi bawah menyebut
     * frekuensi, sisi atas menyebut tingkat kesesuaian.
     *
     * Skor option_value selalu 1 sampai 5 di kedua instrumen, jadi
     * logika pembalikan is_reverse di strategy tidak berubah.
     */
    public function run(): void
    {
        $scales = [

            'SCS' => [
                'Hampir Tidak Pernah',
                'Jarang',
                'Kadang-kadang',
                'Sering',
                'Hampir Selalu',
            ],

            'KMJ' => [
                'Tidak pernah / Tidak sesuai',
                'Jarang / Kurang sesuai',
                'Kadang-kadang / Netral',
                'Sering / Cukup sesuai',
                'Selalu / Sangat sesuai',
            ],

        ];

        foreach ($scales as $code => $labels) {

            $assessment = AssessmentType::where('code', $code)->first();

            if ($assessment === null) {
                continue;
            }

            $questions = Question::where('assessment_type_id', $assessment->id)
                ->where('answer_type', 'likert_5')
                ->get();

            foreach ($questions as $question) {

                foreach ($labels as $offset => $label) {

                    $value = $offset + 1;

                    QuestionOption::updateOrCreate(
                        [
                            'question_id' => $question->id,
                            'option_value' => $value,
                        ],
                        [
                            'option_text' => $label,
                            'option_order' => $value,
                            'is_active' => true,
                        ]
                    );
                }
            }
        }
    }
}
