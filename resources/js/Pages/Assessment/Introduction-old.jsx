import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    HeartIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function Introduction() {
    return (
        <AuthenticatedLayout>
            <Head title="Evaluasi Mandiri" />

            <section className="min-h-screen bg-gradient-to-b from-emerald-100 via-white to-white py-20">
                <div className="mx-auto max-w-5xl px-6">

                    {/* Heading */}
                    <div className="text-center">

                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Evaluasi Mandiri
                        </span>

                        <h1 className="mt-6 text-5xl font-bold text-gray-900">
                            Self-Compassion Assessment
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">
                            Luangkan waktu beberapa menit untuk lebih memahami bagaimana Anda
                            merespons tantangan dan momen-momen sulit dalam hidup.
                        </p>

                    </div>

                    {/* Card */}
                    <div className="mt-14 rounded-3xl bg-white p-10 shadow-xl">

                        <div className="grid gap-8 md:grid-cols-2">

                            <div className="flex gap-4">
                                <ClipboardDocumentListIcon className="h-8 w-8 text-emerald-600"/>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        12 Pertanyaan
                                    </h3>

                                    <p className="text-gray-500">
                                        Berdasarkan Skala Self-Compassion – Versi Singkat (Short Form).
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <ClockIcon className="h-8 w-8 text-emerald-600"/>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Sekitar 3–5 Menit
                                    </h3>

                                    <p className="text-gray-500">
                                        Isi dengan santai sesuai dengan kecepatan Anda sendiri.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <HeartIcon className="h-8 w-8 text-emerald-600"/>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Tidak Ada Jawaban Benar atau Salah
                                    </h3>

                                    <p className="text-gray-500">
                                        Jawablah secara jujur berdasarkan apa yang benar-benar Anda alami.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <AcademicCapIcon className="h-8 w-8 text-emerald-600"/>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Pembelajaran yang Dipersonalisasi
                                    </h3>

                                    <p className="text-gray-500">
                                        Dapatkan rekomendasi materi belajar yang disesuaikan dengan hasil Anda.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Before Begin */}
                    <div className="mt-12 rounded-3xl border border-emerald-100 bg-emerald-50 p-8">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Sebelum Anda Memulai
                        </h2>

                        <div className="mt-5 space-y-4 text-gray-600 leading-8">

                            <p>
                                Jawablah setiap pertanyaan dengan jujur berdasarkan bagaimana Anda
                                umumnya merespons situasi-situasi yang sulit.
                            </p>

                            <p>
                                Jawaban Anda akan digunakan untuk membuat
                                <span className="font-semibold">
                                    {" "}Profil Self-Compassion{" "}
                                </span>
                                Anda dan merekomendasikan bahan pembelajaran yang relevan.
                            </p>

                            <p>
                                Evaluasi ini dirancang untuk refleksi diri dan pembelajaran. Ini
                                <span className="font-semibold">
                                    {" "}bukan sebuah diagnosis psikologis.
                                </span>
                            </p>

                        </div>

                    </div>
                    <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
       Tentang Assessment Instrument
    </p>

    <p className="mt-2 text-gray-700">
        Assessment ini menggunakan{" "}
        <span className="font-semibold">
            Self-Compassion Scale – Short Form (SCS-SF)
        </span>
        , yaitu instrumen psikologi yang telah tervalidasi dan terdiri dari{" "}
        <span className="font-semibold">12 questions</span>.
    </p>

    <p className="mt-3 text-sm text-gray-500">
        Dikembangkan oleh Raes, F., Pommier, E., Neff, K. D., &amp; Van Gucht, D. (2011).
    </p>
</div>

                    {/* Button */}
                    <div className="mt-14 flex items-center justify-between">

                        <Link
                            href="/dashboard"
                            className="font-medium text-gray-500 transition hover:text-gray-800"
                        >
                            ← Kembali ke Dashboard
                        </Link>

                        <Link
                            href="/assessment/questions"
                            className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                        >
                            Mulai Evaluasi →
                        </Link>

                    </div>
                    

                </div>
            </section>

        </AuthenticatedLayout>
    );
}