<?php

/*
|--------------------------------------------------------------------------
| Materi Pembelajaran Asesmen Kesehatan Mental (KMJ)
|--------------------------------------------------------------------------
|
| Enam materi, satu untuk setiap bagian instrumen. RecommendationService
| mengambil kategori dengan skor terendah, jadi setiap kategori harus
| punya tepat satu materi agar halaman hasil tidak pernah kosong.
|
| Materi ini edukatif umum, bukan diagnosis, dan tidak menggantikan
| pemeriksaan oleh tenaga profesional.
|
| Struktur blok mengikuti Editor.js karena Learning/Show.jsx merender
| content lewat renderEditorBlocks().
|
*/

$p = fn (string $text): array => [
    'type' => 'paragraph',
    'data' => ['text' => $text],
];

$h = fn (string $text, int $level = 2): array => [
    'type' => 'header',
    'data' => ['text' => $text, 'level' => $level],
];

$ul = fn (array $items): array => [
    'type' => 'list',
    'data' => [
        'style' => 'unordered',
        'items' => array_map(
            fn (string $item): array => ['content' => $item],
            $items
        ),
    ],
];

$ol = fn (array $items): array => [
    'type' => 'list',
    'data' => [
        'style' => 'ordered',
        'items' => array_map(
            fn (string $item): array => ['content' => $item],
            $items
        ),
    ],
];

$quote = fn (string $text): array => [
    'type' => 'quote',
    'data' => ['text' => $text],
];

$hr = fn (): array => [
    'type' => 'delimiter',
    'data' => [],
];

return [

    /*
    |----------------------------------------------------------------------
    | Sitasi
    |----------------------------------------------------------------------
    */

    'sources' => [

        'young2003' => 'Young, J. E. (2003). Cognitive Therapy for Schemas. Guilford Press.',

        'higgins1987' => 'Higgins, E. T. (1987). Self-discrepancy theory: A theoretical framework exploring motivational and self-regulatory constructs. Psychological Review, 94(3), 319-340.',

        'beck1976' => 'Beck, A. T. (1976). Cognitive Therapy and the Emotional Disorders. Appleton-Century-Crofts.',

        'linehan2015' => 'Linehan, M. S. (2015). Dialectical Behavior Therapy Skills Training Manual (2nd ed.). Guilford Press.',

        'hayes1999' => 'Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (1999). Acceptance and Commitment Therapy. Guilford Press.',

        'samhsa2014' => 'Substance Abuse and Mental Health Services Administration (2014). SAMHSA Concept of Trauma and Guidance for a Therapeutic Approach.',

        'herman1992' => 'Herman, J. L. (1992). Trauma and Recovery. Basic Books.',

        'kashdan2018' => 'Kashdan, E. T., & Joyce, A. (2018). Maladaptive Daydreaming Scale. George Mason University.',

        'frankl1946' => 'Frankl, V. E. (1946). Man\'s Search for Meaning. Beacon Press.',

        'zuckerman2009' => 'Zuckerman, S. E. (2009). Meaning in Life. Oxford University Press.',

    ],

    /*
    |----------------------------------------------------------------------
    | Artikel
    |----------------------------------------------------------------------
    */

    'articles' => [

        /*
        |------------------------------------------------------------------
        | BAGIAN 1
        |------------------------------------------------------------------
        */

        [
            'title' => 'Memberi Ruang pada Identitas yang Belum Stabil',
            'category' => 'Perception of Self',
            'excerpt' => 'Mengerti kenapa rasa "siapa saya sebenarnya" bisa terasa goyah, dan cara membangun gambaran diri yang lebih stabil.',
            'estimated_time' => 8,
            'difficulty' => 'beginner',
            'source' => ['young2003', 'higgins1987'],
            'blocks' => [
                $p('Banyak orang merasa identitas mereka berubah-ubah. Di kantor mereka orang yang satu, di rumah orang yang lain, di kepala orang yang ketiga. Rasanya tidak ada satu pun versi yang benar-benar menggambarkan kamu.'),

                $h('Tiga versi diri'),

                $p('Peneliti psikologi membedakan tiga sudut pandang tentang diri sendiri.'),
                $ul([
                    'Diri ideal, yaitu versi yang ingin kamu jadikan.',
                    'Diri yang seharusnya, yaitu versi yang kamu rasa harus kamu jadikan.',
                    'Diri aktual, yaitu versi yang sekarang sebenarnya kamu.',
                ]),

                $p('Jadi saat kamu bingung tentang siapa kamu sebenarnya, itu bukan tanda kamu gagal tumbuh dewasa. Itu tanda ada beberapa versi diri yang belum pernah kamu baca ulang dalam keadaan tenang.'),

                $h('Pola yang terbentuk sejak kecil'),

                $p('Dalam terapi skema, pola yang berulang seperti ini dikaitkan dengan pengalaman masa kecil. Contohnya merasa tidak cukup baik, atau merasa kebutuhan dasar seperti rasa aman tidak pernah dijawab.'),

                $p('Skema itu bukan karakter yang salah. Skema adalah cara yang dulu masuk akal untuk bertahan. Yang perlu diubah adalah cara ia bekerja sekarang, bukan menghapus jejaknya.'),

                $quote('Pola yang kamu kenali hari ini dulu bekerja untuk menjagamu. Yang perlu diubah adalah cara ia bekerja, bukan menghapus jejaknya.'),

                $h('Yang bisa dicoba'),

                $ol([
                    'Tulis tiga daftar: orang yang kamu dekati, orang yang kamu dinginkan, dan orang yang kamu hormati.',
                    'Petakan pola yang berulang, bukan kejadian tunggal. "Selalu merasa dihakimi saat dinilai" lebih berguna ditangani daripada satu pengalaman buruk yang berdiri sendiri.',
                    'Beri label pada kejadian, bukan pada diri. "Saya gagal presentasi" bisa diperbaiki. "Saya tidak cukup pintar" adalah vonis yang tidak bisa diuji.',
                ]),

                $hr(),

                $p('Kalau bagian ini rendah disertai suasana yang benar-benar berubah-ubah, itu layak dibahas dengan profesional. Penilaian psikologis punya cara yang lebih baik dalam memetakan hal ini daripada menilai sendiri.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | BAGIAN 2
        |------------------------------------------------------------------
        */

        [
            'title' => 'Mengenali Pola Hubungan yang Terulang',
            'category' => 'Relationships with Others',
            'excerpt' => 'Menghubungkan rasa takut ditinggalkan, sulit percaya, dan kebutuhan untuk sempurna ke dalam pola yang bisa diamati.',
            'estimated_time' => 8,
            'difficulty' => 'intermediate',
            'source' => ['young2003', 'linehan2015'],
            'blocks' => [
                $p('Bagian ini menanyakan rasa takut ditinggalkan, kesulitan mempercayai orang lain, kebutuhan untuk sempurna, dan intensitas hubungan yang berubah-ubah. Empat hal itu jarang berdiri sendiri.'),

                $h('Kebutuhan kedekatan yang punya dua wajah'),

                $p('Orang dengan kebutuhan keikatan yang kuat biasanya menunjukkan dua sisi yang tampak kontradiktif.'),
                $ul([
                    'Sisi mengejar: takut ditinggalkan, ingin selalu ada jaminan.',
                    'Sisi menjauh: sulit percaya, kadang memotong duluan kalau merasa kecewa.',
                ]),

                $p('Yang sebenarnya kontradiktif itu cuma satu, yaitu rasa takut ditolak. Dua sisi itu adalah dua cara berbeda untuk menghadapi rasa yang sama.'),

                $quote('Sisi yang mengejar dan sisi yang menjauh biasanya berasal dari rasa yang sama. Yang berbeda hanya arahnya.'),

                $h('Kesempurnaan sebagai sumber harga diri'),

                $p('Rasa "harus sempurna agar diterima" adalah bentuk harga diri yang bersumber dari performa, bukan dari karakter internal. Masalahnya, standar itu ikut naik setiap kali kamu mencapai target.'),

                $p('Terapi skema menyebutnya approval-seeking dan unrelenting standards. Keduanya sering berjalan bersama, dan keduanya bisa diperbaiki dengan mengubah sumbernya, bukan menambah usaha.'),

                $h('Yang bisa dicoba'),

                $ul([
                    'Tuliskan satu kalimat yang kamu akui dalam hati setiap selesai menyelesaikan sesuatu. Kumpulkan buktinya dari apa yang kamu lakukan, bukan dari penilaian orang.',
                    'Saat merasa ditinggalkan, coba tidak melakukan apa pun selama sepuluh menit sebelum mengirim pesan. Perhatikan apa yang terjadi setelah rasa paniknya mereda.',
                    'Sampaikan kebutuhannya secara langsung, bukan lewat sinyal. Menyatakan kebutuhan jauh lebih mudah ditangani daripada pesan yang kamu harap bisa dibaca.',
                ]),

                $hr(),

                $p('Pengalaman trauma membuat semua pola ini jauh lebih intens. Kalau kamu mudah tersakiti dan sulit menenangkan diri sendiri, diskusikan dengan profesional yang bekerja dengan pendekatan trauma-informed.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | BAGIAN 3
        |------------------------------------------------------------------
        */

        [
            'title' => 'Mengubah Ukuran Kesalahan di Kepala',
            'category' => 'Pressure and Performance',
            'excerpt' => 'Mengenal pola berpikir yang melebih-lebihkan rasa salah, lalu melatih cara berpikir yang lebih proporsional.',
            'estimated_time' => 7,
            'difficulty' => 'intermediate',
            'source' => ['beck1976', 'linehan2015'],
            'blocks' => [
                $p('Bagian ini menanyakan gejala fisik saat dinilai, kesalahan kecil yang terasa seperti bencana, menunda-nunda, dan mengkritik diri sendiri. Semuanya punya akar yang sama: cara otak memproses kesalahan.'),

                $h('Pola berpikir yang berlebihan'),

                $p('Terapi kognitif menyebutnya overestimation dan catastrophizing. Otak kamu tidak salah menghitung. Ia cuma melompat ke skenario terburuk tanpa meminta persetujuan dari realitas.'),

                $p('Contohnya begini. Presentasi berjalan sedikit tersendat. Otak langsung melompat ke "semua orang pasti berpikir negatif, aku belum layak, dan aku akan dibuang". Jarak dari kejadian pertama sampai vonis terakhir terlalu jauh untuk disebut masuk akal.'),

                $h('Tiga pertanyaan'),

                $ol([
                    'Bukti apa yang benar-benar mendokumentasikan vonis itu? Bukan perasaanmu, tapi dokumen, angka, atau kalimat yang benar-benar diucapkan orang.',
                    'Apa penjelasan lain yang mungkin, selain yang terparah? Tulis minimal tiga.',
                    'Kalau ini terjadi pada teman dekat, apa yang akan kamu katakan? Biasanya jawaban itu lebih realistis.',
                ]),

                $h('Menunda sebagai lari dari takut gagal'),

                $p('Procrastination sering disalahpahami sebagai malas. Biasanya tidak. Yang ditunda justru sering hal yang paling penting bagi harga diri kita, karena hasilnya bisa jadi bukti berhasil atau bukti gagal. Menunda berarti menunda vonis.'),

                $quote('Banyak menunda-nunda sebenarnya adalah rasa tidak sanggup menahan kemungkinan gagal.'),

                $p('Terapi Perilaku Dialektik punya cara yang cukup efektif untuk ini. Mengerjakan hal itu dengan sengaja dibuat sedikit lebih buruk dari biasanya, lalu memperbaikinya di kemudian hari.'),

                $hr(),

                $p('Kalau kamu sering merasa mual atau pusing, itu reaksi tubuh yang layak dijelaskan, bukan tanda kelemahan. Bawa catatan frekuensinya ke dokter untuk diperiksa lebih dulu.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | BAGIAN 4
        |------------------------------------------------------------------
        */

        [
            'title' => 'Berhenti Menilai Diri Lewat Orang Lain',
            'category' => 'Self Comparison and Validation',
            'excerpt' => 'Memahami kenapa perbandingan sosial dan kebutuhan pujian terasa tak terbatas, lalu menggeser sumber penilaian ke dalam.',
            'estimated_time' => 7,
            'difficulty' => 'beginner',
            'source' => ['young2003', 'hayes1999'],
            'blocks' => [
                $p('Bagian ini menanyakan perasaan seperti penipu, gampang tersinggung, membandingkan diri terus-menerus, dan membutuhkan pujian supaya merasa baik tentang diri. Kombinasi ini punya nama yang cukup dikenal: contingent self-worth.'),

                $h('Harga diri yang bergantung pada kondisi'),

                $p('Ada perbedaan besar antara dua orang. Yang pertama harga dirinya melekat pada karakter, misalnya "saya orang yang teliti" atau "saya orang yang bisa dipercaya". Yang kedua melekat pada kondisi, misalnya "saya berarti kalau saya berprestasi" atau "saya berarti kalau yang saya buat disukai".'),

                $p('Masalahnya, kondisi terus berubah. Yang kedua selalu berayun mengikuti suasana hati, hasil kerja, dan penilaian orang lain. Tidak ada akhirnya, karena setelah kamu mencapai satu target, target berikutnya akan muncul dengan sendirinya.'),

                $h('Kenapa perbandingan terasa adiktif'),

                $p('Manusia menilai diri sendiri dengan membandingkan diri dengan orang lain, dan itu tidak bisa dihapus. Yang bisa diubah adalah arah perbandingan itu.'),

                $quote('Yang tidak perlu dihindari adalah perbandingan. Yang perlu dihindari adalah membandingkan nilai diri dengan nilai yang dipatok orang lain.'),

                $h('Praktik: pisahkan fakta dan tafsiran'),

                $ol([
                    'Saat menerima kritik, tulis dua kolom: fakta dan tafsiran. Kebanyakan yang terasa menyakitkan berasal dari kolom kedua.',
                    'Ganti "saya butuh pujian" dengan "saya butuh umpan balik". Pujian bersifat relatif, sedangkan umpan balik bisa spesifik dan bisa ditindaklanjuti.',
                    'Buat daftar tiga hal yang kamu nikmati tanpa harus lebih dulu berhasil.',
                ]),

                $p('Terapi Penerimaan dan Komitmen punya latihan yang relevan di sini: pilih satu nilai, lalu periksa apakah tindakanmu minggu ini benar-benar bergerak ke arah nilai itu.'),

                $hr(),

                $p('Kalau bagian ini tinggi disertai kecemasan yang kronis, itu layak dievaluasi bersama profesional. Perasaan tidak cukup yang dipoleskan oleh kritik, suara yang keras, atau tekanan yang konstan.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | BAGIAN 5
        |------------------------------------------------------------------
        */

        [
            'title' => 'Kembali ke Tubuh Saat Terputus',
            'category' => 'Withdrawal and Forgetting',
            'excerpt' => 'Mengenal reaksi disosiasi, daydreaming yang jadi pelarian, dan mati rasa emosional, lalu belajar cara kembali ke tubuh.',
            'estimated_time' => 9,
            'difficulty' => 'advanced',
            'source' => ['samhsa2014', 'herman1992', 'kashdan2018'],
            'blocks' => [
                $p('Bagian ini menanyakan pengalaman keluar dari tubuh saat stres, melamun untuk melarikan diri, berbicara tentang emosi tanpa merasakannya, lupa hal penting, dan dunia yang terasa tidak nyata.'),

                $h('Disosiasi itu fokus yang bergeser'),

                $p('Istilah disosiasi sering terdengar seperti sesuatu yang mengerikan, padahal mekanismenya sederhana: perhatianmu berpindah dari peristiwa yang sedang terjadi ke tempat lain. Ke mana? Ke ingatan lama, ke detail fisik yang tidak ada di ruangan, ke kekosongan, atau ke rasa waktu yang melambat.'),

                $p('Untuk sebagian orang ini adalah kemampuan bertahan yang berguna. Pengalaman yang sangat intens bisa membuat orang kehilangan akses ke momen sekarang. Yang menjadi masalah bukan mekanismenya, tapi ketika kamu memakainya tanpa sadar dan tidak punya cara untuk kembali.'),

                $h('Grounding: cara paling dasar untuk kembali'),

                $p('Grounding adalah latihan menjangkarkan perhatian ke indra saat kamu merasa terlepas dari tubuh. Versi paling sederhana adalah sebutan: lima hal yang kamu lihat, empat yang bisa kamu sentuh, tiga yang bisa kamu dengar, dua yang bisa kamu cium, satu yang bisa kamu rasakan di kulit.'),

                $ol([
                    'Sebutkan secara lisan. Menyebutkan jauh lebih efektif daripada melakukannya diam-diam.',
                    'Lakukan dalam urutan yang sama setiap kali, supaya tubuhmu belajar bahwa pola ini selalu berakhir.',
                    'Kalau tidak berhasil, tambahkan sentuhan dingin di pergelangan tangan. Itu cara paling cepat menarik perhatian kembali ke tubuh.',
                ]),

                $h('Daydreaming yang jadi tempat tinggal'),

                $p('Ada perbedaan besar antara menghayati dan melarikan diri. Melamun yang produktif biasanya tidak berbahaya. Yang berbahaya adalah lamunan yang membuatmu berpindah dari pekerjaan yang seharusnya kamu kerjakan.'),

                $p('Kalau itu terjadi, biasanya ada sesuatu yang lebih dasar yang sedang dihindari. Carilah apa yang sebenarnya sedang kamu hindari, dan apa yang paling berat dari bagian itu.'),

                $h('Perasaan yang tidak sampai ke kepala'),

                $p('Emosi yang tidak terasa bukan berarti emosi itu tidak ada. Kadang ia sampai lewat jalur yang lebih panjang, lewat tubuh: dada sesak, kepala berat, atau rasa kosong. Melatih mengenali sensasi tubuh bisa sedikit mengurangi kebuntuan itu.'),

                $hr(),

                $p('Kalau bagian ini tinggi dan kamu punya riwayat trauma yang jelas, pendekatan yang sensitif terhadap trauma umumnya lebih efektif. Diskusikan dulu sebelum memulai.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | BAGIAN 6
        |------------------------------------------------------------------
        */

        [
            'title' => 'Menemukan Arah Saat Bertanya "Untuk Apa Ini?"',
            'category' => 'Meaning and Values',
            'excerpt' => 'Mengolah pertanyaan eksistensial dan bentrok nilai menjadi sesuatu yang bisa dikerjakan, bukan sekadar rasa kosong yang biasa.',
            'estimated_time' => 8,
            'difficulty' => 'beginner',
            'source' => ['frankl1946', 'zuckerman2009', 'hayes1999'],
            'blocks' => [
                $p('Bagian terakhir menanyakan arti hidup, rasa terasing dari keyakinan, bentrok antara nilai pribadi dan tuntutan kerja, keraguan soal tujuan, dan rasa kosong meski secara lahiriah baik-baik saja.'),

                $h('Rasa kosong yang kontradiktif'),

                $p('Ada rasa yang tidak muncul sebagai sedih. Ia muncul sebagai apathy dan rasa bosan yang menahun. Semua tampak normal dari luar, semua berjalan begitu saja, tapi ada kekosongan yang berulang. Ini yang dalam literatur sering dikaitkan dengan makna yang belum ditemukan, dan pada sebagian orang dengan depresi.'),

                $p('Yang perlu diingat: rasa ini nyata, bukan tanda kamu kurang matang. Tapi juga tidak otomatis berarti kamu butuh obat.'),

                $h('Frankl dan logoterapi'),

                $p('Viktor Frankl menyusun sebuah gagasan yang sering disalahpahami. Yang dia katakan bukan "bagaimana caranya menghilangkan suffering", tapi "bagaimana saya tetap berarti saat mengalami suffering". Perbedaannya besar. Yang pertama meminta untuk mengubah kondisi, yang kedua meminta untuk tetap berpijak pada hal yang masih penting.'),

                $quote('Frankl tidak mengatakan satu hal lebih baik dari yang lain. Ia mengatakan keduanya bisa terjadi, dan bahwa yang kedua masih punya makna.'),

                $h('Bentrok antara nilai dan tuntutan'),

                $p('Ketika nilai pribadimu bentrok dengan tuntutan dunia kerja, itu bukan tanda kamu salah memilih karier. Itu masalah yang bisa disebut konflik moral: dua hal sama-sama sah, tapi tidak bisa dipenuhi sekaligus pada waktu yang sama.'),

                $ul([
                    'Tulis dua daftar: hal yang benar-benar penting bagimu, dan hal yang memang dituntut lingkunganmu. Lihat mana yang benar-benar bertabrakan.',
                    'Untuk setiap tabrakan, tanyakan mana yang punya konsekuensi jangka panjang dan mana yang bisa ditunda.',
                    'Dalam Terapi Penerimaan dan Komitmen, latihan yang relevan adalah membiarkan rasa ini hadir tanpa perlu menyelesaikannya seketika.',
                ]),

                $h('Arah kecil lebih berguna daripada tujuan besar'),

                $p('Penelitian tentang makna menunjukkan bahwa arah hidup yang memuaskan sering muncul dari nilai yang dijaga setiap hari, bukan dari tujuannya. "Merawat orang yang kamu sayangi" lebih bisa dikerjakan daripada "menjadi sesuatu yang hebat" yang terlalu umum untuk jadi panduan.'),

                $hr(),

                $p('Kalau pertanyaan ini muncul bersama rasa kosong yang bertahan lebih dari dua minggu, itu layak dibicarakan dengan psikolog atau psikiater. Mereka bisa membantu memisahkan hal ini dari depresi yang mungkin membutuhkan penanganan khusus.'),
            ],
        ],

    ],

];
