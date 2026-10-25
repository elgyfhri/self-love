<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Pemilihan Strategi
    |--------------------------------------------------------------------------
    |
    | Strategi dipilih dari kolom assessment_types.scoring_type lewat
    | App\Services\Assessment\Factory\AssessmentStrategyFactory, bukan
    | dari daftar di file ini.
    |
    | score_range    -> ScoreRangeStrategy, untuk skala berangka
    | dominant_tag   -> DominantTagStrategy, untuk assessment yang
    |                   tidak punya kategori dan dinilai dari tag
    | screening_range-> ScreeningRangeStrategy, untuk instrumen screening
    |                   yang arah skornya dibalik (skor tinggi = lebih
    |                   baik) dan punya aturan pola antar-bagian
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Rekomendasi
    |--------------------------------------------------------------------------
    |
    | Rekomendasi tidak memakai ambang skor. App\Services\RecommendationService
    | selalu mengambil kategori dengan skor terendah; kalau seluruh kategori
    | sudah berada di band atas, kategori terendah itu yang tetap dipilih.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Level
    |--------------------------------------------------------------------------
    |
    | Hasil assessment ditampilkan dalam bentuk kata-kata, bukan angka.
    | "max" adalah batas atas (tidak termasuk). null berarti jenjang
    | paling atas, jadi skor berapa pun akan stopping di sini.
    |
    | Setiap instrumen boleh punya band sendiri lewat 'level_sets', karena
    | arti skor tiap instrumen tidak sama. Level global di bawah hanya
    | dipakai sebagai cadangan kalau kode instrumen tidak terdaftar.
    |
    | SCS memakai band tak resmi dari FAQ self-compassion.org: 1-2.49
    | rendah, 2.5-3.49 sedang, 3.5-5.0 tinggi. Neff menegaskan tidak ada
    | norma formal untuk skala itu, jadi ketiga band ini patokan kasar,
    | bukan norma klinis.
    |
    | Karena 30 butir KMJ semuanya is_reverse, arah skornya sudah
    | dibalik: skor tinggi berarti kondisi yang lebih baik. Band-nya
    | ditulis dalam arah itu, jadi sama sekali tidak boleh dipakai
    | sebagai ambang(raw) sebelum pembalikan.
    |
    */

    'level_sets' => [

        'KMJ' => [
            [
                'max' => 2.5,
                'label' => 'Perlu Dukungan Profesional',
            ],

            [
                'max' => 3.5,
                'label' => 'Perlu Perhatian',
            ],

            [
                'max' => null,
                'label' => 'Relatif Stabil',
            ],
        ],

    ],

    'levels' => [

        [
            'max' => 2.5,
            'label' => 'Perlu Perhatian',
        ],

        [
            'max' => 3.5,
            'label' => 'Cukup Baik',
        ],

        [
            'max' => null,
            'label' => 'Baik',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Aturan Pola Screening
    |--------------------------------------------------------------------------
    |
    | Instrumen screening tidak berhenti di skor per bagian. Ada pola
    | yang baru bermakna kalau beberapa bagian tinggi bersamaan, dan
    | pola itu tidak bisa dibaca dari satu angka total.
    |
    | 'sections' ditulis memakai nama kategori persis seperti di
    | AssessmentCategorySeeder. 'max' adalah batas atas TIDAK
    | termasuk, dipakai terhadap skor yang sudah dibalik, jadi pola
    | ini aktif justru ketikaskornya rendah.
    |
    | Catatan yang ditampilkan sengaja ditulis sebagai "pola yang
    | perlu dieksplorasi", bukan sebagai diagnosis. Instrumen ini
    | tidak punya validasi psikometrik dan tidak boleh dibaca sebagai
    | alat diagnosis.
    |
    */

    'screening_patterns' => [

        [
            'sections' => ['Perception of Self', 'Withdrawal and Forgetting'],
            'max' => 2.5,
            'note' => 'Pola pada Bagian 1 dan Bagian 5 muncul bersamaan. Pola ini sering berkaitan dengan pengalaman yang membuat orang perlahan merasa keluar dari dirinya sendiri saat stres. Pendekatan yang umum dipakai untuk merespons pola seperti ini adalah terapi yang sensitif terhadap trauma, Terapi Perilaku Dialektik (DBT), dan latihan grounding (menjangkarkan perhatian ke indra).',
        ],

        [
            'sections' => ['Relationships with Others', 'Self Comparison and Validation'],
            'max' => 2.5,
            'note' => 'Pola pada Bagian 2 dan Bagian 4 muncul bersamaan. Pola ini berkaitan dengan cara kamu menempatkan diri di mata orang lain, dan dengan seberapa besar harga diri bergantung pada pengakuan dari luar. Pendekatan yang umum dipakai adalah terapi skema dan terapi yang berfokus pada keterikatan (attachment-focused therapy).',
        ],

        [
            'sections' => ['Pressure and Performance', 'Meaning and Values'],
            'max' => 2.5,
            'note' => 'Pola pada Bagian 3 dan Bagian 6 muncul bersamaan. Pola ini berkaitan dengan tekanan yang kamu rasakan di depan penilaian, sekaligus pertanyaan soal arah hidup. Pendekatan yang umum dipakai adalah Cognitive Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT), dan terapi yang berfokus pada makna.',
        ],

    ],

];
