<?php

/*
|--------------------------------------------------------------------------
| Materi Pembelajaran Self-Compassion (SCS)
|--------------------------------------------------------------------------
|
| Enam materi, satu untuk setiap kategori Self Compassion Scale:
| Self Kindness, Self Judgment, Common Humanity, Isolation, Mindfulness,
| dan Over Identification. Setiap kategori punya tepat satu materi supaya
| rekomendasi di halaman hasil assessment selalu punya isi.
|
| Seluruh materi ditulis ulang dalam bahasa Indonesia sebagai parafrasa
| dari sumber resmi di bawah. Tidak ada paragraf yang disalin langsung.
| Kutipan singkat yang dipakai disertai atribusi.
|
| Struktur blok mengikuti format Editor.js karena Learning/Show.jsx
| merender content melalui renderEditorBlocks().
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

$quote = fn (string $text, ?string $caption = null): array => [
    'type' => 'quote',
    'data' => array_filter([
        'text' => $text,
        'caption' => $caption,
    ]),
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

        'neff2003' => 'Neff, K. D. (2003). Development and validation of a scale to measure self-compassion. Self and Identity, 2(3), 223-250. https://doi.org/10.1207/S15327957SI0203_3',

        'neff2023' => 'Neff, K. D. (2023). Self-compassion: Theory, method, research, and intervention. Annual Review of Psychology, 74, 193-218. https://doi.org/10.1146/annurev-psych-032420-031047',

        'sugianto2020' => 'Sugianto, D., Suwartono, C., & Sutanto, S. H. (2020). Reliabilitas dan validitas Self-Compassion Scale versi Bahasa Indonesia. Jurnal Psikologi Ulayat. https://doi.org/10.24854/jpu02020-337',

        'elements' => 'Neff, K. D. (n.d.). What is self-compassion? The elements of self-compassion. https://self-compassion.org/what-is-self-compassion/#the-elements-of-self-compassion',

        'practices' => 'Neff, K. D. (n.d.). Self-compassion practices. https://self-compassion.org/self-compassion-practices/',

        'exercises' => 'Neff, K. D. (n.d.). Self-compassion exercises: guided practices. https://self-compassion.org/guided-practices/#self-compassion-exercises',

    ],

    /*
    |----------------------------------------------------------------------
    | Artikel
    |----------------------------------------------------------------------
    */

    'articles' => [

        /*
        |------------------------------------------------------------------
        | SELF KINDNESS
        |------------------------------------------------------------------
        */

        [
            'title' => 'Belajar Berdamai Dengan Diri Sendiri',
            'category' => 'Self Kindness',
            'excerpt' => 'Memahami self kindness sebagai lawan self judgment, lalu mempraktikkannya sampai menjadi kebiasaan.',
            'estimated_time' => 7,
            'difficulty' => 'beginner',
            'source' => [
                'neff2023',
                'elements',
                'practices',
            ],
            'blocks' => [
                $p('Ada suara-suara di dalam kepala yang berbeda sifatnya. Sebagian menyuruh kita berubah, sebagian menghakimi kita saat kita gagal. Yang kedua inilah yang disebut <em>self judgment</em>, dan sebagian besar orang mengira suara itu kabar baik karena terdengar tegas.'),

                $h('Dua Kutub yang Saling Melawan'),
                $p('Neff (2023) menempatkan <strong>self kindness</strong> dan <strong>self judgment</strong> di kutub yang berlawanan dari satu skala yang sama. Keduanya memang sama-sama mendorong kita untuk tidak tinggal diam, tapi jalannya berbeda jauh.'),
                $p('<strong>Self judgment</strong> bekerja lewat tekanan. Ia membandingkanmu dengan orang lain, menyalahkanmu atas kesalahan, lalu merendahkanmu sendiri supaya kamu justru terdorong untuk berubah. Balasan yang biasanya kita terima bukan perbaikan, melainkan rasa bersalah yang berulang-ulang.'),
                $p('<strong>Self kindness</strong> bekerja lewat pemahaman. Saat kamu sedang menderita, suara di dalammu yang menjelaskan apa yang terjadi, tanpa menyalahkan siapa pun. Hasilnya lebih tahan lama, karena sumber motivasinya tidak perlu dihapus agar kamu berhenti.'),
                $quote(
                    'Self kindness tidak berarti menoleransi perilaku yang merusak. Yang ditoleransi adalah dorongan untuk berubah, dilihat dari sudut pandang yang lebih memahami.',
                    'Disusun dari kerangka Neff (2023)'
                ),

                $h('Kenapa Orang Cenderung Menghakimi Diri Sendiri'),
                $p('Self judgment terasa seperti motivasi karena nadanya tegas dan sasarannya jelas. Setelah seharian bekerja, suara yang mengkritik membuat perhatianmu kembali fokus dalam hitungan detik. Masalahnya, ketegasan itu tidak bertahan lama, dan setelahnya yang tertinggal adalah rasa lelah yang lebih dalam.'),
                $p('Self kindness mengambil jalur yang lebih pelan, tapi efeknya menumpuk. Setiap kali kamu menjelaskan kesalahan kepada diri sendiri tanpa menghakimi, toleransi terhadap kesalahanmu naik sedikit. Lama-lama kamu jadi lebih berani mencoba lagi.'),

                $hr(),

                $h('Tiga Langkah Praktis'),
                $ol([
                    '<strong>Kasih tahu dirimu apa yang terjadi.</strong> Bukan "kamu memang payah", tapi "aku sedang kelelahan".',
                    '<strong>Ubah nada suara, bukan isi kritiknya.</strong> Kritik yang sama dengan nada lebih lembut dampaknya jauh berbeda.',
                    '<strong>Tentukan tindakan kecil yang konkret.</strong> Tidur cukup, minta bantuan, atau menunda keputusan satu hari.',
                ]),
                $p('Langkah ketiga sering dilewati, padahal justru itu yang membuat self kindness terasa nyata. Self kindness tanpa tindakan hanya akan menjadi percakapan sendiri yang tidak mengubah apa pun.'),

                $h('Contoh Kalimat yang Bisa Dipakai'),
                $ul([
                    'Self judgment: "Aku merasa payah."',
                    'Self kindness: "Aku sedang kesulitan, dan itu wajar terjadi pada siapa pun."',
                    'Self judgment: "Harusnya aku bisa menghadapi ini."',
                    'Self kindness: "Ini memang sulit. Aku boleh butuh bantuan."',
                    'Self judgment: "Aku selalu begini."',
                    'Self kindness: "Aku sedang belajar, dan belum jago."',
                ]),
                $p('Perhatikan polanya: self judgment memakai kata <em>selalu</em> dan <em>memang</em> yang bersifat mutlak, sedangkan self kindness memakai kata <em>sedang</em> yang membiarkan perubahan tetap terjadi.'),

                $h('Kalau Belum Sanggup'),
                $p('Tidak semua orang bisa langsung menerapkan ini. Kalau self kindness terasa tidak wajar, mulailah dari langkah paling kecil: berhenti membandingkan diri dengan orang lain. Hanya itu.'),
                $p('Neff (2023) konsisten menunjukkan bahwa self kindness berkaitan dengan ketahanan yang lebih baik terhadap tekanan, sedangkan self judgment berkaitan dengan depresi dan kecemasan. Ini menunjukkan bahwa mengubah cara bicara ke diri sendiri bukan sekali jadi, tapi latihan yang hasilnya baru terlihat setelah berbulan-bulan.'),

                $h('Ingat'),
                $p('Self kindness bukan kemalasan tanpa target. Ini tentang memperlakukan diri sendiri dengan penghormatan, bahkan ketika kamu sedang belajar. Kalau satu-satunya kritik yang kamu dengar selama bertahun-tahun datang dari dirimu sendiri, wajar kalau nada baru terasa janggal di awal.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | SELF JUDGMENT
        |------------------------------------------------------------------
        */

        [
            'title' => 'Mengurangi Kritik Pada Diri Sendiri',
            'category' => 'Self Judgment',
            'excerpt' => 'Mengenali pola self judgment, lalu menanggahnya dengan langkah yang bisa langsung dipraktikkan.',
            'estimated_time' => 7,
            'difficulty' => 'beginner',
            'source' => [
                'neff2023',
                'elements',
                'practices',
                'exercises',
            ],
            'blocks' => [
                $p('Hampir semua orang pernah menyalahkan dirinya sendiri. Yang jarang disadari adalah bahwa suara itu punya polanya sendiri, dan polanya itu bisa dikenali.'),

                $h('Ciri Suara Self Judgment'),
                $ul([
                    '<strong>Memakai kata yang menghakimi.</strong> Kata-kata seperti "dasar", "pemalas", atau "gagal" menilai orang, bukan peristiwa yang terjadi.',
                    '<strong>Generalisasi yang terlalu luas.</strong> Satu kesalahan berubah jadi identitas: "aku selalu begitu".',
                    '<strong>Fokus pada ketidakmampuan.</strong> Cerita tentang kekuranganmu, hampir tidak pernah tentang keadaan yang sedang kamu hadapi.',
                    '<strong>Tidak ada jeda.</strong> Putusan turun langsung, tanpa ruang untuk memeriksa faktanya.',
                ]),
                $p('Neff (2023) menjelaskan bahwa kritik terhadap diri sendiri bisa sangat keras, terutama pada orang yang berstandar tinggi. Justru pada titik itu pengurangan kritik dimulai.'),

                $hr(),

                $h('Tiga Cara Menguranginya'),
                $p('<strong>Pertama, ubah generalisasi.</strong> Kalimat "aku selalu gagal" bisa menjadi "aku gagal kali ini". Perubahan dari kata <em>selalu</em> ke <em>kali ini</em> mengubah pernyataan identitas menjadi catatan peristiwa.'),
                $p('<strong>Kedua, ganti kata yang menghakimi.</strong> "Aku ini payah" lebih ringan bila diganti "aku sedang kesulitan". Perhatikan bahwa isi informasinya sama persis, hanya nada bicaranya yang berbeda.'),
                $p('<strong>Ketiga, tunggu sebentar sebelum merespons.</strong> Beri jeda beberapa detik sebelum membalas suara yang biasanya muncul setelah kesalahan. Jeda ini yang paling sering terlewat, padahal justru paling menentukan.'),

                $h('Latihan Menulis Ulang'),
                $p('Ambil satu kalimat self judgment terakhir yang kamu ingat, lalu tulis ulang dalam tiga versi.'),
                $ol([
                    '<strong>Versi apa adanya.</strong> Tulis kalimatnya persis seperti yang muncul di kepalamu.',
                    '<strong>Versi netral.</strong> Ubah menjadi deskripsi peristiwa tanpa penilaian.',
                    '<strong>Versi yang lebih baik.</strong> Tambahkan satu kalimat yang menjelaskan apa yang sebenarnya terjadi pada dirimu.',
                ]),
                $p('Contohnya:'),
                $ul([
                    'Apa adanya: "aku memalukan diri sendiri di depan semua orang".',
                    'Netral: "presentasi tadi berjalan tidak sesuai rencana".',
                    'Versi yang lebih baik: "aku gugup dan sedikit kehilangan fokus, dan itu manusiawi. Besok masih bisa diulang".',
                ]),
                $p('Ketiga versi sama-sama benar. Yang berbeda cuma sudut pandang, dan sudut pandang itulah yang menentukan apakah kamu bisa berhenti mengulang adegan itu di kepala atau tidak.'),

                $h('Kenapa Self Judgment Terasa Wajar'),
                $p('Salah satu alasan self judgment bertahan adalah ia sering dianggap sebagai bentuk akuntabilitas. "Kalau aku tidak menghakimi diri sendiri, aku akan malas", begitu argumen yang sangat sering terdengar.'),
                $p('Tapi Neff (2023) menunjukkan bahwa self judgment berkaitan dengan kondisi yang lebih buruk, sedangkan self kindness berkaitan dengan ketahanan yang lebih tinggi. Artinya kritik yang keras tidak membuat kita lebih disiplin, hanya membuat kita lebih takut untuk mencoba.'),
                $p('Akuntabilitas yang sehat tidak datang dari hukuman, tapi dari komitmen terhadap tindakan. Kalau rasa bersalahmu ingin berhenti, jangan dihapus, arahkan.'),

                $h('Kalau Kritiknya Berasal dari Orang Lain'),
                $p('Tidak semua self judgment muncul dari dalam. Kalau kritik itu terasa seperti suara orang lain yang kamu adopsi, perlakukan tidak berbeda: dengarkan apa isinya, lalu putuskan terpisah apakah itu benar.'),
                $p('Orang lain boleh punya pendapat tentang kinerjamu. Mereka tidak punya akses ke nilai diri kamu sebagai manusia.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | COMMON HUMANITY
        |------------------------------------------------------------------
        */

        [
            'title' => 'Kesalahan Adalah Bagian Dari Manusia',
            'category' => 'Common Humanity',
            'excerpt' => 'Melihat penderitaan sebagai pengalaman manusia, bukan bukti bahwa kamu pengecualian yang buruk.',
            'estimated_time' => 6,
            'difficulty' => 'beginner',
            'source' => [
                'neff2023',
                'elements',
                'exercises',
            ],
            'blocks' => [
                $p('Saat gagal, banyak orang langsung masuk ke kesimpulan yang paling menyakitkan: aku ini berbeda dari orang lain.'),

                $h('Apa Itu Common Humanity'),
                $p('<em>Common humanity</em> berarti melihat penderitaan sebagai bagian dari hidup manusia, bukan sebagai pengecualian yang hanya menimpamu. Elemen ini bekerja berlawanan dengan <em>isolation</em>: saat kamu merasa sendirian, yang sebenarnya bekerja adalah pertanyaan "kenapa cuma aku" yang membuatmu merasa beda.'),
                $p('Kesalahan bukan tanda bahwa kamu orang buruk. Orang lain juga pernah ditolak, salah paham, dan kecewa. Pengakuan ini saja tidak mengubah keadaan, tapi mengurangi beban yang kamu bawa sendiri.'),
                $quote(
                    'Penderitaan adalah kondisi manusia, bukan tanda bahwa ada yang rusak padamu.',
                    'Disusun dari kerangka Neff (2023)'
                ),

                $h('Kenapa Ini Penting Secara Praktis'),
                $p('Saat kamu yakin bahwa kamu satu-satunya yang pernah gagal, reaksimu hampir otomatis adalah menyembunyikan kesalahan. Itu sebabnya kesalahan yang disembunyikan justru yang paling lama tidak selesai.'),
                $p('Common humanity menutup kebocoran ini. Kalau kesalahan dilihat sebagai hal yang biasa terjadi pada manusia, peluang untuk membicarakannya naik, dan pembicaraan itu sendiri yang biasanya membuat masalahnya lebih ringan.'),

                $hr(),

                $h('Latihan Menyamakan Cerita'),
                $p('Ini latihan paling sederhana, dan sering kali paling efektif. Saat kamu merasa sendirian oleh kesalahanmu, lakukan tiga hal berurutan.'),
                $ol([
                    '<strong>Ingat orang lain.</strong> Siapa yang pernah ditolak, gagal ujian, atau kehilangan pekerjaan? Kamu pasti punya beberapa nama dalam pikiran.',
                    '<strong>Lihat selisihnya.</strong> Biasanya orang lebih mudah memaafkan orang lain daripada diri sendiri, padahal pengalamannya tidak jauh berbeda.',
                    '<strong>Terapkan ke diri.</strong> Kalau pengalaman ini terjadi pada salah satu orang itu, apa yang akan kamu katakan kepadanya? Ulangi kalimat itu untuk dirimu sendiri.',
                ]),
                $p('Pertanyaannya sederhana: <em>kalau ini terjadi pada temanku, apa yang akan kulakukan?</em> Hampir selalu jawabannya lebih lembut daripada yang pernah kamu ucapkan ke diri sendiri.'),

                $h('Batas dari Latihan Ini'),
                $p('Common humanity bukan berarti menganggap "kebetulan semua orang melakukan hal yang sama". Itu bukan inti dari latihan ini. Yang dimaksud adalah pengakuan bahwa penderitaan itu <em>mungkin</em> bukan unik, dan bahkan kalau memang unik, kamu tetap tidak sendirian di dalamnya.'),
                $p('Kalau kamu sedang dalam situasi yang memang jarang, akui itu dengan jujur. Common humanity tidak memaksa kamu berpura-pura tidak.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | ISOLATION
        |------------------------------------------------------------------
        */

        [
            'title' => 'Keluar Dari Rasa Terisolasi',
            'category' => 'Isolation',
            'excerpt' => 'Mengurangi perasaan sendirian di tengah orang yang ada, dan langkah kecil untuk membuka koneksi.',
            'estimated_time' => 7,
            'difficulty' => 'beginner',
            'source' => [
                'neff2023',
                'elements',
                'practices',
            ],
            'blocks' => [
                $p('Perasaan sendirian bisa muncul tanpa kamu benar-benar sendirian. Kamu bisa berada di ruang penuh orang, dan tetap merasa tidak ada yang melihatmu.'),

                $h('Kenapa Kita Merasa Terisolasi'),
                $p('Neff (2023) menyebut <em>isolation</em> sebagai perasaan sendirian meskipun ada orang di sekitar. Bedanya dengan kesepian biasa: yang terisolasi merasa <em>terpisah</em>, bukan sekadar belum punya teman.'),
                $p('Ini biasanya muncul ketika kamu merasa tidak dimengerti. Hasilnya, kita justru menjauh dari orang-orang yang bisa membantu, karena merasa dimengerti oleh mereka terasa lebih menakutkan daripada menerima bantuan.'),
                $p('Self judgment juga mempercepat isolation. Ketika kamu membuat kesalahan, rangkaiannya berjalan seperti ini.'),
                $ol([
                    'Kamu membuat kesalahan.',
                    'Kamu menyalahkan diri sendiri (self judgment).',
                    'Kamu merasa tidak pantas dan tidak dimengerti (isolation).',
                    'Kamu menutup diri, sehingga orang tidak ikut mendekat.',
                    'Perasaan terisolasi makin kuat.',
                ]),
                $p('Ini adalah lingkaran, dan di sinilah self compassion bisa masuk: lewat self kindness, langkah kedua diputus, dan diputusnya lingkaran di langkah kedua.'),

                $hr(),

                $h('Tiga Langkah Praktis'),
                $ol([
                    '<strong>Kenali polanya.</strong> Kapan perasaan ini paling muncul? Setelahnya yang memalukan sedang tinggi, atau setelah kamu lama menunda membalas pesan?',
                    '<strong>Kurangi penyekat yang kamu kontrol.</strong> Menunda membalas pesan, mengunci grup, atau menghindari tempat tertentu adalah keputusan kecil yang langsung menambah jarak.',
                    '<strong>Buka satu pintu saja.</strong> Kirim pesan singkat ke satu orang yang terasa aman. Tidak perlu panjang, cukup satu kalimat yang jujur.',
                ]),
                $p('Langkah ketiga yang paling sering dilewati karena terasa terlalu sepele, padahal justru itu yang paling berdampak. Koneksi tidak perlu dalam atau dramatis. Yang dibutuhkan hanya satu orang yang tahu sedang ada yang terjadi padamu.'),

                $h('Mulai dari Yang Lebih Kecil'),
                $p('Kalau saat ini kamu belum siap menghubungi siapa pun, ada langkah yang lebih kecil lagi. Mulailah dengan tidak menghapus percakapan, atau membalas satu emoji. Targetnya bukan kedekatan, tapi menghapus halangan kecil yang selalu ada di antara kamu dan orang lain.'),

                $h('Ingat'),
                $p('Tidak perlu menjauh dari semua orang sekaligus. Satu koneksi yang benar-benar aman sudah cukup untuk mengurangi rasa terisolasi, dan dari situ kamu bisa menarik sisanya secara bertahap.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | MINDFULNESS
        |------------------------------------------------------------------
        */

        [
            'title' => 'Mengelola Emosi Dengan Mindful',
            'category' => 'Mindfulness',
            'excerpt' => 'Menyadari emosi tanpa menindas atau membesar-besarannya, dengan latihan yang singkat.',
            'estimated_time' => 7,
            'difficulty' => 'beginner',
            'source' => [
                'neff2023',
                'elements',
                'practices',
                'exercises',
            ],
            'blocks' => [
                $p('Saat emosi muncul, kita cenderung memilih salah satu dari dua jalan yang sama-sama berlebihan.'),

                $h('Dua Jalan yang Terlalu Ekstrem'),
                $ul([
                    '<strong>Menekan.</strong> Menyangka emosi itu tidak ada, atau seharusnya tidak ada. Kalau ia muncul, itu tandanya kamu lemah.',
                    '<strong>Melekat.</strong> Menyangka emosi itu adalah seluruh dirimu. "Aku sedih", lalu seluruh identitasmu ikut menjadi sedih.',
                ]),
                $p('Mindfulness menawarkan jalan tengah: menyadari tanpa menindas, dan tanpa melekat. Neff (2023) menjelaskan bahwa kesadaran penuh adalah kunci untuk keduanya, karena kamu hanya bisa menenangkan sesuatu yang kamu sadari ada.'),
                $quote(
                    'Perhatikan dan sadari apa yang ada di depan wajah, di dalam tubuh, dan di dalam pikiran.',
                    'Neff (n.d.), The elements of self-compassion'
                ),

                $hr(),

                $h('Kenapa Menyebut Namanya Membantu'),
                $p('Menyebut emosi dengan nama yang tepat sudah menurunkan reaksinya, sebelum kamu melakukan hal lain. Psikologi menunjukkan bahwa menamai pengalaman emosi menurunkan reaktivitasnya, bukan karena kamu berpura-pura, tapi karena jarak yang terbentuk dari kata itu.'),
                $p('Kamu tidak perlu mengubah emosinya, cukup menyadarinya. "Aku cemas" lebih ringan daripada "kenapa aku ini cemas terus", karena yang kedua mengandung pertanyaan yang jawabannya tidak ada.'),

                $h('Latihan Sadar Tiga Menit'),
                $p('Coba tiga langkah singkat saat emosi mulai naik, kapanpun kamu bisa.'),
                $ol([
                    '<strong>Berhenti sebentar.</strong> Tarik napas pelan beberapa kali. Ini memberi tanda pada tubuh bahwa tidak ada bahaya yang segera.',
                    '<strong>Namai.</strong> Sebutkan emosi itu dalam satu kata. "Kesal", "cemas", "kecewa", "lelah".',
                    '<strong>Amati di tubuh.</strong> Perhatikan di mana terasa: dada terasa berat, bahu naik, atau tenggorokan panas.',
                ]),
                $p('Langkah ketiga sering dilewati, padahal justru langkah itu yang memisahkan dirimu dari emosi. Kamu tidak sedang berusaha menenangkan dirimu, kamu sedang memperhatikan dirimu. Perbedaan kecil inilah yang membuat kamu tetap bisa mengambil keputusan.'),

                $h('Kalau Emosinya Terlalu Besar'),
                $p('Tidak semua momen pantas ditangani dengan latihan mindfulness. Saat emosi sangat kuat, tujuannya bukan mengalahkannya, tapi bertahan. Minum air, keluar ruangan sebentar, atau menunda membalas pesan adalah keputusan yang wajar.'),
                $p('Mindfulness tidak menuntut kamu selalu hadir dengan tenang. Yang diminta hanya sadar bahwa kamu sedang dalam kondisi apa, sehingga pilihanmu tidak sepenuhnya diambil oleh reaksi.'),
            ],
        ],

        /*
        |------------------------------------------------------------------
        | OVER IDENTIFICATION
        |------------------------------------------------------------------
        */

        [
            'title' => 'Lepas Dari Perasaan Larut Dalam Masalah',
            'category' => 'Over Identification',
            'excerpt' => 'Memisahkan masalah dari identitas diri, supaya tidak terbawa ke mana-mana.',
            'estimated_time' => 6,
            'difficulty' => 'beginner',
            'source' => [
                'neff2023',
                'elements',
                'practices',
                'exercises',
            ],
            'blocks' => [
                $p('Saat punya masalah, seseorang bisa terbawa ke dalamnya. Bukan membawa masalahnya, tapi membawa seluruh dirinya.'),

                $h('Apa Itu Over Identification'),
                $p('Ini kondisi ketika emosi atau masalah terasa seperti seluruh identitas kita. Masalah pekerjaan bisa terasa seperti bukti bahwa kita tidak mampu. Perasaan sedih bisa terasa seperti bukti bahwa kita memang tidak berharga.'),
                $p('Masalahnya, hubungan ini tidak satu arah. Over identification membuat masalah terasa besar, dan masalah yang terasa besar membuat kita makin terikat padanya. Keduanya saling menguatkan.'),
                $p('Neff (2023) menempatkan ini sebagai salah satu dari tiga perilaku negatif yang paling kuat berkaitan dengan kesejahteraan yang rendah, berdampingan dengan self judgment dan isolation.'),

                $hr(),

                $h('Cara Melepaskan Diri'),
                $ol([
                    '<strong>Pisahkan masalah dari identitas.</strong> "Saya sedang kesulitan dengan proyek ini" berbeda dari "saya ini orang yang gagal". Yang pertama tentang peristiwa, yang kedua tentang siapa kamu.',
                    '<strong>Kembalikan perspektif.</strong> Tanya: seperti apa lima tahun lagi? Kalau kamu tidak ingat jawabannya, itu bukti bahwa masalah ini tidak akan selamanya sebesar rasanya sekarang.',
                    '<strong>Kurangi waktu merenung.</strong> Beralih ke tindakan kecil yang konkret. Menulis daftar tiga langkah lebih berguna daripada mengulang situasinya semalaman.',
                ]),

                $h('Latihan Kalimat Pemisah'),
                $p('Saat kamu merasa terbawa, tulis tiga kalimat ini secara terpisah. Jarak di antara ketiganya adalah yang ingin kamu kerjakan.'),
                $ol([
                    '<strong>Peristiwa:</strong> apa yang sebenarnya terjadi, tanpa menghakimi.',
                    '<strong>Reaksi:</strong> apa yang kamu rasakan dan lakukan akibatnya.',
                    '<strong>Identitas:</strong> apa yang kamu simpulkan tentang dirimu sendiri.',
                ]),
                $p('Contohnya:'),
                $ul([
                    'Peristiwa: presentasi tadi terputus di tengah dan ada yang tidak selesai.',
                    'Reaksi: dada terasa panas, tangan bergetar, dan saya menyalahkan diri sendiri semalaman.',
                    'Identitas: saya kira saya orang yang tidak siap.',
                ]),
                $p('Sekarang periksa kalimat ketiga. Apakah itu benar, atau lebih tepat diturunkan menjadi kalimat tentang keadaan saat itu?'),
            ],
        ],

    ],

];
