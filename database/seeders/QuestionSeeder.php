<?php

namespace Database\Seeders;

use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Butir diambil dari "Skala Welas Diri (The Self-Compassion Scale)",
     * terjemahan Indonesia resmi. Penomoran butir mengikuti dokumen
     * terjemahan tersebut, bukan versi Inggris.
     *
     * @see https://self-compassion.org/wp-content/uploads/2020/08/Indonesian-Translation-of-SCS.pdf
     */
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Pengelompokan subskala
        |--------------------------------------------------------------------------
        |
        | Mengasihi Diri ....... 5, 12, 19, 23, 26
        | Menghakimi Diri ...... 1, 8, 11, 16, 21
        | Kemanusiaan Universal  3, 7, 10, 15
        | Isolasi .............. 4, 13, 18, 25
        | Kewawasan ............ 9, 14, 17, 22
        | Overidentifikasi ..... 2, 6, 20, 24
        |
        | Subskala negatif (Menghakimi Diri, Isolasi, Overidentifikasi)
        | dibalik skor: 1 -> 5, 2 -> 4, 3 -> 3, 4 -> 2, 5 -> 1.
        |
        */

        $questions = [

            [
                'category' => 'Self Judgment',
                'question' => 'Saya tidak menerima dan menghakimi kelemahan dan kekurangan saya',
                'is_reverse' => true,
            ],

            [
                'category' => 'Over Identification',
                'question' => 'Ketika saya sedang terpuruk, saya cenderung terobsesi dan terus terpaku pada segala hal yang salah',
                'is_reverse' => true,
            ],

            [
                'category' => 'Common Humanity',
                'question' => 'Ketika hal-hal buruk terjadi pada saya, saya melihat kesulitan hidup sebagai bagian hidup yang dilewati semua orang',
                'is_reverse' => false,
            ],

            [
                'category' => 'Isolation',
                'question' => 'Ketika saya memikirkan kekurangan saya, hal tersebut akan membuat diri saya terkucil dari seisi dunia',
                'is_reverse' => true,
            ],

            [
                'category' => 'Self Kindness',
                'question' => 'Saya mencoba untuk mencintai diri saya ketika saya merasakan sakit secara emosional',
                'is_reverse' => false,
            ],

            [
                'category' => 'Over Identification',
                'question' => 'Ketika saya gagal pada suatu hal yang penting bagi saya, saya larut dalam perasaan tidak mampu',
                'is_reverse' => true,
            ],

            [
                'category' => 'Common Humanity',
                'question' => 'Ketika saya merasa sedih, saya mengingatkan diri saya bahwa ada banyak orang di dunia ini yang mengalami hal yang sama dengan saya',
                'is_reverse' => false,
            ],

            [
                'category' => 'Self Judgment',
                'question' => 'Di waktu-waktu yang sangat sulit, saya cenderung bersikap keras pada diri saya',
                'is_reverse' => true,
            ],

            [
                'category' => 'Mindfulness',
                'question' => 'Ketika sesuatu membuat saya kesal, saya berusaha menjaga emosi saya tetap stabil',
                'is_reverse' => false,
            ],

            [
                'category' => 'Common Humanity',
                'question' => 'Ketika saya merasa tidak mampu pada beberapa hal, saya mengingatkan diri saya bahwa perasaan tidak mampu juga dirasakan oleh sebagian besar orang',
                'is_reverse' => false,
            ],

            [
                'category' => 'Self Judgment',
                'question' => 'Saya tidak toleran dan tidak sabar terhadap beberapa aspek kepribadian saya yang tidak saya sukai',
                'is_reverse' => true,
            ],

            [
                'category' => 'Self Kindness',
                'question' => 'Ketika saya mengalami waktu sulit, saya akan memberikan kepedulian dan kelembutan yang saya butuhkan',
                'is_reverse' => false,
            ],

            [
                'category' => 'Isolation',
                'question' => 'Ketika saya merasa sedih, saya cenderung merasa orang lain mungkin lebih bahagia dibandingkan saya',
                'is_reverse' => true,
            ],

            [
                'category' => 'Mindfulness',
                'question' => 'Ketika suatu hal menyakitkan terjadi, saya mencoba untuk melihat situasi secara berimbang',
                'is_reverse' => false,
            ],

            [
                'category' => 'Common Humanity',
                'question' => 'Saya mencoba untuk melihat kegagalan saya sebagai bagian dari kondisi yang dialami manusia pada umumnya',
                'is_reverse' => false,
            ],

            [
                'category' => 'Self Judgment',
                'question' => 'Ketika saya melihat aspek-aspek diri saya yang tidak saya sukai, saya merasa sedih pada diri saya',
                'is_reverse' => true,
            ],

            [
                'category' => 'Mindfulness',
                'question' => 'Ketika saya gagal pada suatu hal yang penting bagi saya, saya berusaha untuk melihatnya sebagai sesuatu yang wajar',
                'is_reverse' => false,
            ],

            [
                'category' => 'Isolation',
                'question' => 'Ketika saya sungguh menderita, saya cenderung merasa bahwa orang lain lebih mudah dalam menjalani hidup',
                'is_reverse' => true,
            ],

            [
                'category' => 'Self Kindness',
                'question' => 'Saya baik terhadap diri saya saat mengalami penderitaan',
                'is_reverse' => false,
            ],

            [
                'category' => 'Over Identification',
                'question' => 'Ketika suatu hal menjengkelkan terjadi, saya terbawa perasaan',
                'is_reverse' => true,
            ],

            [
                'category' => 'Self Judgment',
                'question' => 'Saya bisa bersikap tidak berperasaan pada diri saya saat mengalami penderitaan',
                'is_reverse' => true,
            ],

            [
                'category' => 'Mindfulness',
                'question' => 'Ketika saya sedang terpuruk, saya mencoba menanggapi perasaan saya dengan rasa ingin tahu dan keterbukaan',
                'is_reverse' => false,
            ],

            [
                'category' => 'Self Kindness',
                'question' => 'Saya bersikap toleran terhadap kelemahan dan kekurangan saya',
                'is_reverse' => false,
            ],

            [
                'category' => 'Over Identification',
                'question' => 'Ketika sesuatu yang menyakitkan terjadi, saya cenderung membesar-besarkan hal tersebut',
                'is_reverse' => true,
            ],

            [
                'category' => 'Isolation',
                'question' => 'Ketika saya gagal pada hal yang penting bagi saya, saya cenderung merasa sendiri di tengah-tengah kegagalan tersebut',
                'is_reverse' => true,
            ],

            [
                'category' => 'Self Kindness',
                'question' => 'Saya mencoba untuk memahami dan bersabar pada aspek-aspek kepribadian saya yang tidak saya sukai',
                'is_reverse' => false,
            ],

        ];

        $assessment = AssessmentType::where('code', 'SCS')->firstOrFail();

        foreach ($questions as $index => $item) {

            $category = AssessmentCategory::where('name', $item['category'])
                ->whereHas('assessmentTypes', function ($query) use ($assessment) {
                    $query->where('assessment_types.id', $assessment->id);
                })
                ->firstOrFail();

            $order = $index + 1;

            Question::updateOrCreate(
                [
                    'question_code' => 'SCS-' . str_pad((string) $order, 2, '0', STR_PAD_LEFT),
                ],
                [
                    'assessment_type_id' => $assessment->id,
                    'category_id'        => $category->id,
                    'question'           => $item['question'],
                    'question_order'     => $order,
                    'answer_type'        => 'likert_5',
                    'is_reverse'         => $item['is_reverse'],
                    'is_required'        => true,
                    'is_active'          => true,
                ]
            );
        }
    }
}
