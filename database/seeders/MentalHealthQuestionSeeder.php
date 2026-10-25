<?php

namespace Database\Seeders;

use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use App\Models\Question;
use Illuminate\Database\Seeder;

class MentalHealthQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Butir mengikuti naskah "Asesmen Kesehatan Mental Dasar" versi 30
     * soal yang terbagi menjadi 6 bagian. Penomoran butir mengikuti
     * dokumen aslinya, jadi urutannya sama dengan naskah.
     *
     * SEMUA butir memakai is_reverse = true. Semua redaksi di naskah
     * ini memakai kalimat gejala ("Saya merasa cemas", "Saya sulit
     * tidur"), sehingga jawaban angka yang tinggi justru berarti
     * kondisi yang lebih buruk. Dengan is_reverse, angka 1 ("Tidak
     * pernah") dibalik menjadi 5, dan 5 ("Selalu") menjadi 1.
     *
     * Setelah pembalikan, arah skornya sama dengan Self Compassion
     * Scale: skor tinggi berarti kondisi yang lebih baik. Level dan
     * ambang pola di config/assessment.php ditulis dalam arah itu.
     *
     * disalin apa adanya dari naskah yang diberikan, termasuk nama
     * kondisi klinis di kolom "Indikator Klinis". Kolom indikator itu
     * tidak punya kolom di tabel questions, jadi tidak disimpan.
     * Nama kondisi tersebut hanya muncul sebagai catatan pola di
     * config, ditulis sebagai kemungkinan, bukan sebagai diagnosis.
     */
    public function run(): void
    {
        $questions = [

            // ==========================
            // Bagian 1: Perasaan tentang Diri Sendiri
            // ==========================

            [
                'category' => 'Perception of Self',
                'question' => 'Saya sering merasa bingung tentang "siapa saya sebenarnya"',
            ],

            [
                'category' => 'Perception of Self',
                'question' => 'Saya merasa seperti berpura-pura di depan orang lain',
            ],

            [
                'category' => 'Perception of Self',
                'question' => 'Keputusan tentang masa depan membuat saya sangat cemas',
            ],

            [
                'category' => 'Perception of Self',
                'question' => 'Saya tidak yakin apa yang benar-benar saya inginkan dalam hidup',
            ],

            [
                'category' => 'Perception of Self',
                'question' => 'Perasaan saya tentang diri sendiri bisa berubah cepat',
            ],

            // ==========================
            // Bagian 2: Hubungan dengan Orang Lain
            // ==========================

            [
                'category' => 'Relationships with Others',
                'question' => 'Saya takut ditinggalkan atau ditolak orang lain',
            ],

            [
                'category' => 'Relationships with Others',
                'question' => 'Saya sulit mempercayai orang, bahkan yang dekat',
            ],

            [
                'category' => 'Relationships with Others',
                'question' => 'Saya sering merasa harus sempurna agar diterima',
            ],

            [
                'category' => 'Relationships with Others',
                'question' => 'Hubungan saya kadang sangat intens, kadang sangat dingin',
            ],

            [
                'category' => 'Relationships with Others',
                'question' => 'Saya menyembunyikan kelemahan saya dari orang lain',
            ],

            // ==========================
            // Bagian 3: Tekanan dan Kinerja
            // ==========================

            [
                'category' => 'Pressure and Performance',
                'question' => 'Saya merasa mual atau pusing saat harus dinilai orang',
            ],

            [
                'category' => 'Pressure and Performance',
                'question' => 'Kesalahan kecil terasa seperti bencana besar bagi saya',
            ],

            [
                'category' => 'Pressure and Performance',
                'question' => 'Saya sering menunda-nunda karena takut tidak sempurna',
            ],

            [
                'category' => 'Pressure and Performance',
                'question' => 'Saya sangat keras mengkritik diri sendiri',
            ],

            [
                'category' => 'Pressure and Performance',
                'question' => 'Nilai diri saya sangat tergantung pada prestasi',
            ],

            // ==========================
            // Bagian 4: Perbandingan Diri dan Penguatan
            // ==========================

            [
                'category' => 'Self Comparison and Validation',
                'question' => 'Saya sering merasa seperti "penipu" yang akan ketahuan',
            ],

            [
                'category' => 'Self Comparison and Validation',
                'question' => 'Kritikan membuat saya sangat tersinggung atau marah',
            ],

            [
                'category' => 'Self Comparison and Validation',
                'question' => 'Saya terus membandingkan diri dengan orang lain',
            ],

            [
                'category' => 'Self Comparison and Validation',
                'question' => 'Saya butuh pujian untuk merasa baik tentang diri',
            ],

            [
                'category' => 'Self Comparison and Validation',
                'question' => 'Saya takut orang tahu bahwa saya tidak mampu',
            ],

            // ==========================
            // Bagian 5: Melarikan Diri dan Pelupaan
            // ==========================

            [
                'category' => 'Withdrawal and Forgetting',
                'question' => 'Saat stres, saya merasa seperti "keluar dari tubuh"',
            ],

            [
                'category' => 'Withdrawal and Forgetting',
                'question' => 'Saya sering melamun atau berfantasi untuk melarikan diri',
            ],

            [
                'category' => 'Withdrawal and Forgetting',
                'question' => 'Saya bicara tentang hal emosional tanpa merasa emosi',
            ],

            [
                'category' => 'Withdrawal and Forgetting',
                'question' => 'Saya lupa hal-hal penting dari masa lalu',
            ],

            [
                'category' => 'Withdrawal and Forgetting',
                'question' => 'Dunia terasa tidak nyata atau seperti mimpi',
            ],

            // ==========================
            // Bagian 6: Pencarian Makna dan Nilai
            // ==========================

            [
                'category' => 'Meaning and Values',
                'question' => 'Saya bertanya-tanya "apa arti hidup ini?"',
            ],

            [
                'category' => 'Meaning and Values',
                'question' => 'Saya merasa terasing dari keyakinan atau agama saya',
            ],

            [
                'category' => 'Meaning and Values',
                'question' => 'Nilai pribadi saya bentrok dengan tuntutan dunia kerja',
            ],

            [
                'category' => 'Meaning and Values',
                'question' => 'Saya ragu apakah hidup saya punya tujuan',
            ],

            [
                'category' => 'Meaning and Values',
                'question' => 'Saya merasa kosong meski secara lahiriah baik-baik saja',
            ],

        ];

        $assessment = AssessmentType::where('code', 'KMJ')->firstOrFail();

        /*
        * question_code itu UNIQUE secara global di tabel questions, jadi
        * prefix KMJ wajib dipakai. Awalan SCS tidak boleh dipakai
        * ulang, kalau tidak seeder ini akan menimpa butir SCS.
        */
        $questions = array_map(
            fn (array $item): array => $item + ['is_reverse' => true],
            $questions
        );

        foreach ($questions as $index => $item) {

            $category = AssessmentCategory::where('name', $item['category'])
                ->whereHas('assessmentTypes', function ($query) use ($assessment) {
                    $query->where('assessment_types.id', $assessment->id);
                })
                ->firstOrFail();

            $order = $index + 1;

            Question::updateOrCreate(
                [
                    'question_code' => 'KMJ-' . str_pad((string) $order, 2, '0', STR_PAD_LEFT),
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
