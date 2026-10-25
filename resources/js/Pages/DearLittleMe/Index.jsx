import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function Index({ letters, letterCount }) {
    const { delete: destroy } = useForm();

    async function handleDelete(letter) {
        const result = await Swal.fire({
            title: "Hapus surat?",
            text: `Surat "${letter.title}" akan dihapus permanen.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
        });

        if (result.isConfirmed) {
            destroy(route("letter.destroy", letter.id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dear Little Me
                </h2>
            }
        >
            <Head title="Dear Little Me" />

            {/* Hero Section */}
            <section className="w-full overflow-hidden bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-500 text-white">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 sm:px-8 md:h-[400px] md:flex-row md:items-end md:gap-0 md:py-0 md:pl-10 md:pr-8">

                    {/* Gambar Hero */}
                    <div className="order-2 flex w-full justify-center md:order-1 md:h-full md:w-1/2 md:items-end md:justify-end md:pr-6">
                        <div className="relative flex w-full items-end justify-center md:h-full md:justify-end">

                            {/* Ripple */}
                            <div className="absolute bottom-4 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-white/10 animate-ping sm:h-36 sm:w-36 md:bottom-10 md:left-auto md:right-6 md:h-48 md:w-48 md:translate-x-0"></div>

                            {/* Gambar - Dibatasi tinggi maks agar section tidak membesar */}
                            <img
                                src="/images/little-me.png"
                                alt="Dear Little Me"
                                className="relative z-10 max-h-48 w-auto object-contain sm:max-h-60 md:max-h-[360px]"
                            />
                        </div>
                    </div>

                    {/* Konten Teks */}
                    <div className="contents md:order-2 md:flex md:h-full md:w-1/2 md:flex-col md:justify-center md:pb-8 md:pt-6 md:pl-4">
                        <h1 className="order-1 text-center text-2xl font-bold leading-tight text-white sm:text-3xl md:text-left md:text-5xl">
                            Tulis Pesan untuk Dirimu Saat Kecil
                        </h1>

                        <p className="order-3 mt-3 text-center text-sm text-green-100 sm:text-base md:mt-4 md:text-left">
                            Temukan ruang aman untuk bercerita, menyapa kenangan, dan belajar tentang <em className="not-italic font-semibold text-white">self-love</em>.
                        </p>

                        <div className="order-4 mt-5 flex justify-center md:mt-6 md:justify-start">
                            <Link
                                href={route("letter.create")}
                                className="inline-flex w-full justify-center rounded-lg bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50 sm:w-auto"
                            >
                                Mulai Menulis
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Section Surat Saya */}
            <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">

                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                                Suratku
                            </h2>
                            <p className="mt-3 text-sm text-gray-500 sm:text-base">
                                Kenangan indah yang kamu tulis untuk dirimu yang lebih muda.
                            </p>
                        </div>

                        <Link
                            href={route("letter.create")}
                            className="inline-flex w-full justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-emerald-700 sm:w-auto"
                        >
                            + Surat Baru
                        </Link>
                    </div>

                    {/* Statistik */}
                    {letterCount > 0 && (
                        <div className="mt-8">
                            <div className="rounded-2xl bg-white p-6 shadow-sm">
                                <p className="text-sm text-gray-500">Total Surat</p>
                                <p className="mt-1 text-3xl font-bold text-emerald-600">
                                    {letterCount}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Daftar Surat */}
                    <div className="mt-8 sm:mt-10">
                        {letters.length === 0 ? (
                            <div className="rounded-3xl bg-white px-5 py-12 text-center shadow-lg sm:px-8 sm:py-16">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                                    <EnvelopeIcon className="h-10 w-10 text-emerald-500" />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-800">
                                    Belum Ada Surat
                                </h3>
                                <p className="mx-auto mt-3 max-w-md text-gray-500 leading-7">
                                    Kamu belum menulis surat apa pun. Mulailah dengan
                                    satu kalimat kecil untuk dirimu yang lebih muda —
                                    ia pasti senang mendengarnya.
                                </p>
                                <Link
                                    href={route("letter.create")}
                                    className="mt-8 inline-flex w-full justify-center rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-700 sm:w-auto"
                                >
                                    Tulis Surat Pertamaku
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {letters.map((letter) => (
                                    <div
                                        key={letter.id}
                                        className="group flex flex-col rounded-2xl bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="text-xs font-medium text-gray-400">
                                                {new Date(
                                                    letter.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="mt-4 text-lg font-semibold text-gray-800 line-clamp-2">
                                            {letter.title}
                                        </h3>

                                        <p className="mt-3 flex-1 text-sm text-gray-500 line-clamp-3 italic">
                                            {letter.letter}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2">
                                            <Link
                                                href={route("letter.show", letter.id)}
                                                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-emerald-700"
                                            >
                                                Baca
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(letter)}
                                                className="rounded-lg bg-red-100 p-2 text-red-500 transition hover:bg-red-200"
                                                title="Hapus"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quote Box */}
                    <div className="mt-10 rounded-3xl border border-emerald-200/80 bg-emerald-100/60 p-6 sm:p-10 md:mt-12 md:p-12">
                        <p className="text-center text-base italic leading-relaxed text-emerald-950 sm:text-xl md:text-2xl">
                            "Anak kecil di dalam dirimu mungkin masih menunggu seseorang berkata,{" "}
                            <span className="font-semibold text-emerald-800">
                                ‘Aku bangga padamu, terima kasih sudah bertahan.’
                            </span>"
                        </p>
                    </div>

                </div>
            </section>
        </AuthenticatedLayout>
    );
}