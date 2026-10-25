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

            {/* Hero Section Terkunci (Height Fixed 400px - Gambar di Kiri) */}
            <section className="h-[400px] w-full overflow-hidden bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-500 text-white">
                <div className="mr-auto flex h-full max-w-6xl items-end pl-8 pr-8 md:pl-10">

                    {/* Kiri - Gambar Hero */}
                    <div className="flex h-full w-1/2 items-end justify-end pr-6">
                        <div className="relative flex h-full w-full items-end justify-end">

                            {/* Ripple */}
                            <div className="absolute bottom-10 right-6 h-48 w-48 rounded-full bg-white/10 animate-ping"></div>

                            {/* Gambar - Dibatasi tinggi maks agar section tidak membesar */}
                            <img
                                src="/images/little-me.png"
                                alt="Dear Little Me"
                                className="relative z-10 max-h-[360px] w-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Kanan - Konten Teks */}
                    <div className="flex h-full w-1/2 flex-col justify-center pb-8 pt-6 pl-4">
                        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                            Tulis Pesan untuk Dirimu Saat Kecil
                        </h1>

                        <p className="mt-4 text-base text-green-100">
                            Temukan ruang aman untuk bercerita, menyapa kenangan, dan belajar tentang <em className="not-italic font-semibold text-white">self-love</em>.
                        </p>

                        <div className="mt-6">
                            <Link
                                href={route("letter.create")}
                                className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                            >
                                Mulai Menulis
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Section Surat Saya */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-6 md:px-8">

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800">
                                Suratku
                            </h2>
                            <p className="mt-3 text-gray-500">
                                Kenangan indah yang kamu tulis untuk dirimu yang lebih muda.
                            </p>
                        </div>

                        <Link
                            href={route("letter.create")}
                            className="inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-emerald-700"
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
                    <div className="mt-10">
                        {letters.length === 0 ? (
                            <div className="rounded-3xl bg-white px-8 py-16 text-center shadow-lg">
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
                                    className="mt-8 inline-flex rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-700"
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
                    <div className="mt-12 rounded-3xl bg-emerald-100/60 p-10 border border-emerald-200/80 md:p-12">
                        <p className="text-center text-xl italic leading-relaxed text-emerald-950 md:text-2xl">
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