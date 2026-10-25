import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import EnvelopeOverlay from "@/Components/DearLittleMe/EnvelopeOverlay";
import Swal from "sweetalert2";

export default function Show({ letter }) {
    const { delete: destroy } = useForm();

    const [introState, setIntroState] = useState("show");

    useEffect(() => {
        const t1 = setTimeout(() => setIntroState("fade"), 1300);
        const t2 = setTimeout(() => setIntroState("hidden"), 1850);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    async function handleDelete() {
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

    const date = new Date(letter.created_at).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <AuthenticatedLayout>
            <Head title={letter.title} />

            {introState !== "hidden" && (
                <EnvelopeOverlay
                    variant="opening"
                    caption="Membuka surat untuk dirimu…"
                    exiting={introState === "fade"}
                />
            )}

            <section
                className={
                    "min-h-screen bg-gradient-to-b from-violet-50 via-white to-indigo-50 py-10 transition-all duration-700 sm:py-14 lg:py-16 " +
                    (introState === "show"
                        ? "opacity-0 translate-y-6"
                        : "opacity-100 translate-y-0")
                }
            >

                <div className="mx-auto max-w-4xl px-4 sm:px-6">

                    <div className="mb-6 sm:mb-8">
                        <Link
                            href={route("letter.index")}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-700"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Kembali ke Daftar Surat
                        </Link>
                    </div>

                    <div className="mx-auto max-w-3xl rounded-md border border-stone-200 bg-[#fffdf8] px-5 py-8 shadow-2xl sm:px-10 sm:py-12 md:px-16 md:py-14">

                        {/* Tanggal */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm italic text-gray-500">
                                {date}
                            </p>
                        </div>

                        {/* Judul */}
                        <h1 className="mt-8 break-words text-center text-2xl font-handwriting text-gray-900 sm:text-3xl">
                            {letter.title}
                        </h1>

                        {/* Isi Surat */}
                        <div
                            className="mt-6"
                            style={{
                                backgroundImage: "url('/images/line.png')",
                                backgroundRepeat: "repeat-y",
                                backgroundSize: "100% 40px",
                                backgroundPosition: "0 55px",
                            }}
                        >
                            <div className="whitespace-pre-wrap break-words font-handwriting text-xl leading-10 text-gray-700 sm:text-2xl">
                                {letter.letter}
                            </div>
                        </div>

                        {/* Penutup */}
                        <div className="mt-12 text-right">
                            <p className="italic text-gray-600">
                                Dengan penuh kasih,
                            </p>
                            <p className="mt-3 text-2xl">
                                ❤️
                            </p>
                        </div>

                    </div>

                    {/* Aksi */}
                    <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-3 sm:mt-8">

                        <button
                            onClick={handleDelete}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 sm:w-auto"
                        >
                            <TrashIcon className="h-5 w-5" />
                            Hapus
                        </button>

                    </div>

                </div>

            </section>

        </AuthenticatedLayout>
    );
}