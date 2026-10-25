import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Result() {

    // Dummy data (nanti berasal dari backend)
    const result = {
        overall_score: 4.02,
        self_kindness: 4.5,
        self_judgment: 3.2,
        common_humanity: 4.0,
        isolation: 2.8,
        mindfulness: 4.6,
        over_identification: 3.0,
    };

    const dimensions = [
        {
            title: "Self Kindness",
            score: result.self_kindness,
            description:
                "Anda cukup mampu memperlakukan diri sendiri dengan baik ketika menghadapi kesulitan.",
        },
        {
            title: "Self Judgment",
            score: result.self_judgment,
            description:
                "Anda terkadang masih cukup keras dalam menilai diri sendiri saat melakukan kesalahan.",
        },
        {
            title: "Common Humanity",
            score: result.common_humanity,
            description:
                "Anda memahami bahwa setiap orang pernah mengalami tantangan dalam hidup.",
        },
        {
            title: "Isolation",
            score: result.isolation,
            description:
                "Anda terkadang merasa sendirian ketika menghadapi masalah.",
        },
        {
            title: "Mindfulness",
            score: result.mindfulness,
            description:
                "Anda mampu menerima emosi dengan cukup baik tanpa bereaksi secara berlebihan.",
        },
        {
            title: "Over Identification",
            score: result.over_identification,
            description:
                "Anda sesekali masih larut dalam pikiran atau emosi negatif.",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Assessment Result" />

            <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16">

                <div className="mx-auto max-w-5xl px-6">

                    {/* Heading */}

                    <div className="text-center">

                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Assessment Result
                        </span>

                        <h1 className="mt-5 text-5xl font-bold text-gray-900">
                            Self Compassion Profile
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                            Terima kasih telah menyelesaikan assessment.
                            Hasil ini memberikan gambaran mengenai beberapa aspek
                            self-compassion Anda saat ini. Assessment ini bukan
                            alat diagnosis, melainkan sarana refleksi diri.
                        </p>

                    </div>

                    {/* Summary */}

                    <div className="mt-14 grid gap-6 md:grid-cols-3">

                        <div className="rounded-3xl bg-white p-8 shadow-lg">
                            <p className="text-sm text-gray-500">
                                Overall Score
                            </p>

                            <h2 className="mt-3 text-5xl font-bold text-emerald-600">
                                {result.overall_score}
                            </h2>

                            <p className="mt-2 text-gray-500">
                                dari 5.0
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-lg">
                            <p className="text-sm text-gray-500">
                                Assessment Date
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold">
                                4 Juli 2026
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Assessment terbaru Anda
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-lg">
                            <p className="text-sm text-gray-500">
                                Assessment Berikutnya
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold">
                                3 Bulan Lagi
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Lakukan assessment kembali untuk melihat perkembangan Anda.
                            </p>
                        </div>

                    </div>

                    {/* Detail */}

                    <div className="mt-14 rounded-3xl bg-white p-10 shadow-lg">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Detail Self Compassion
                        </h2>

                        <div className="mt-10 space-y-10">

                            {dimensions.map((item) => (

                                <div key={item.title}>

                                    <div className="flex items-center justify-between">

                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.title}
                                        </h3>

                                        <span className="font-bold text-emerald-600">
                                            {item.score} / 5
                                        </span>

                                    </div>

                                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">

                                        <div
                                            className="h-full rounded-full bg-emerald-600"
                                            style={{
                                                width: `${item.score * 20}%`,
                                            }}
                                        />

                                    </div>

                                    <p className="mt-4 leading-7 text-gray-600">
                                        {item.description}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Recommendation */}

                    <div className="mt-14 rounded-3xl bg-emerald-50 p-10">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Rekomendasi Pembelajaran
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Berdasarkan hasil assessment Anda, kami
                            merekomendasikan beberapa materi berikut:
                        </p>

                        <ul className="mt-6 space-y-3 text-lg">

                            <li>🌿 Self Compassion</li>

                            <li>🌿 Self Acceptance</li>

                            <li>🌿 Positive Self Talk</li>

                        </ul>

                        <Link
                            href="/learning"
                            className="mt-8 inline-flex rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Mulai Belajar →
                        </Link>

                    </div>

                </div>

            </section>

        </AuthenticatedLayout>
    );
}