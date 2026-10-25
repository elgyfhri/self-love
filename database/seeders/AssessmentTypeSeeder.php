<?php

namespace Database\Seeders;

use App\Models\AssessmentType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssessmentTypeSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'name' => 'Self Compassion Scale',
                'code' => 'SCS',
                'description' => 'Self Compassion Scale (26 butir, terjemahan Indonesia resmi)',
                'estimated_time' => 12,
                'status' => 'published',

                'source' => implode("\n", [
                    'Skala Welas Diri (Self-Compassion Scale) disusun oleh Kristin D. Neff (2003) berdasarkan teori self-compassion. Assessment ini memakai versi penuh 26 pernyataan yang terbagi ke dalam 6 subskala, memakai terjemahan bahasa Indonesia yang sudah divalidasi.',
                    '',
                    'Skala ini boleh digunakan secara gratis untuk berbagai tujuan, termasuk penelitian, kerja klinis, dan pembelajaran, selama sumber aslinya tetap dicantumkan.',
                    '',
                    'Referensi:',
                    'Neff, K. D. (2003). Self and Identity, 2(3), 223-250.',
                    'Sugianto, D., Suwartono, C., & Sutanto, S. H. (2020). Reliabilitas dan validitas Self-Compassion Scale versi bahasa Indonesia. Jurnal Psikologi Ulayat. doi: 10.24854/jpu02020-337',
                    '',
                    'Dokumen resmi:',
                    'https://self-compassion.org/self-compassion-scales-for-researchers/',
                    'https://self-compassion.org/wp-content/uploads/2021/03/SCS-information.pdf',
                    'https://self-compassion.org/wp-content/uploads/2020/08/Indonesian-Translation-of-SCS.pdf',
                ]),

                'purpose' => implode("\n", [
                    'Mengukur sejauh mana kamu berpihak pada dirimu sendiri ketika menghadapi kegagalan atau kesulitan. Assessment ini mencakup 6 subskala: Self Kindness, Self Judgment, Common Humanity, Isolation, Mindfulness, dan Over Identification.',
                    '',
                    'Skor setiap subskala dihitung dari rata-rata butirnya. Karena memakai versi penuh, skor per subskala ini sah untuk ditampilkan.',
                    '',
                    'Catatan: Neff menyatakan tidak ada norma formal untuk skala ini. Level hasil memakai pembagian tidak resmi dari FAQ self-compassion.org: 1-2.49 (Perlu Perhatian), 2.5-3.49 (Cukup Baik), dan 3.5-5.0 (Baik).',
                ]),
            ],
            [
                'name' => 'Asesmen Kesehatan Mental Dasar',
                'code' => 'KMJ',
                'description' => 'Screening kesehatan mental dasar, 30 butir dalam 6 bagian (usia 20-25 tahun)',
                'estimated_time' => 10,
                'status' => 'published',
                'scoring_type' => 'screening_range',

                'instructions' => implode("\n", [
                    'Jawablah pertanyaan berikut dengan memilih angka 1-5 berdasarkan pengalamanmu 3 bulan terakhir.',
                    '',
                    '1  = Tidak pernah / Tidak sesuai',
                    '2  = Jarang / Kurang sesuai',
                    '3  = Kadang-kadang / Netral',
                    '4  = Sering / Cukup sesuai',
                    '5  = Selalu / Sangat sesuai',
                    '',
                    'Tidak ada jawaban benar atau salah. Yang penting adalah jawaban yang paling menggambarkan dirimu.',
                ]),

                'source' => implode("\n", [
                    'Instrumen ini disusun untuk keperluan screening dan refleksi mandiri di dalam aplikasi. Pertanyaan dan pembagian bagian mengikuti kerangka hopelessness depression dan indikator klinis yang umum dipakai dalam literatur.',
                    '',
                    'PENTING: instrumen ini BUKAN instrumen klinis yang sudah divalidasi. Berbeda dengan PHQ-9, GAD-7, atau DASS-42, instrumen ini tidak punya reliabilitas, validitas, dan ambang cut-off yang terpublikasi. Hasilnya tidak boleh dipakai sebagai diagnosis, tidak boleh dipakai sebagai dasar keputusan klinis, dan tidak menggantikan pemeriksaan oleh tenaga profesional.',
                    '',
                    'Nama kondisi yang muncul di hasil hanya berfungsi sebagai catatan pola yang perlu dieksplorasi lebih lanjut, bukan sebagai diagnosis.',
                    '',
                    'Rujukan konteks:',
                    'Zajac, K. O. (2003). Hopelessness depression. In Depression and Psychopathology (pp. 1-30). Rowman & Littlefield.',
                    'American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.).',
                ]),

                'purpose' => implode("\n", [
                    'Membantu memetakan di mana gejala yang kamu rasakan dalam 3 bulan terakhir paling terasa. Instrumen ini terbagi menjadi 6 bagian: Perasaan tentang Diri Sendiri, Hubungan dengan Orang Lain, Tekanan dan Kinerja, Perbandingan Diri dan Penguatan, Melarikan Diri dan Pelupaan, serta Pencarian Makna dan Nilai.',
                    '',
                    'Skor setiap bagian dihitung dari rata-rata butirnya, lalu dibalik supaya skor tinggi berarti kondisi yang lebih baik. Level memakai band sendiri dari config assessment, bukan band milik Self Compassion Scale.',
                    '',
                    'Kalau dua bagian tertentu sama-sama rendah, aplikasi akan menampilkan catatan pola. Catatan itu disusun dari config assessment.screening_patterns dan ditulis sebagai kemungkinan, bukan sebagai vonis.',
                    '',
                    'Catatan: tidak ada norma klinis untuk instrumen ini. Ambang level di config ini adalah pembagian internal aplikasi, bukan angka yang berasal dari studi validasi.',
                ]),
            ],
            [
                'name' => 'Brain Dominance Test',
                'code' => 'BDT',
                'description' => 'Left Brain vs Right Brain',
                'estimated_time' => 10,
                'source' => 'Diadaptasi dari konsep dominasi otak kiri dan kanan (whole-brain thinking) yang dipopulerkan oleh Ned Herrmann. Versi pada aplikasi ini adalah adaptasi sederhana, bukan alat diagnostik klinis.',
                'purpose' => 'Mengenali kecenderungan cara berpikir kamu: lebih condong ke arah yang logis dan analitis (Left Brain) atau yang kreatif dan intuitif (Right Brain).',
            ],
            [
                'name' => 'Personality Test',
                'code' => 'PT',
                'description' => 'Personality Assessment',
                'estimated_time' => 10,
                'source' => 'Mengikuti teori temperamen klasik (four temperaments) yang berakar pada Hippocrates dan kemudian dikembangkan dalam psikologi kepribadian modern.',
                'purpose' => 'Mengenali temperament dominan kamu di antara empat kecenderungan: Melankolik, Sanguin, Kolerik, dan Flegetik, agar kamu lebih paham cara sebaiknya berkomunikasi dan mengelola diri.',
            ],
        ];

        foreach ($data as $item) {
            AssessmentType::updateOrCreate(
                ['code' => $item['code']],
                $item
            );
        }
    }
}
