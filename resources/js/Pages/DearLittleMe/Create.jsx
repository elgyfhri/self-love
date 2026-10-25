import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { LockClosedIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import EnvelopeOverlay from "@/Components/DearLittleMe/EnvelopeOverlay";

export default function Create() {
    const today = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        letter: "",
    });

    const [introState, setIntroState] = useState("show");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setIntroState("fade"), 1300);
        const t2 = setTimeout(() => setIntroState("hidden"), 1850);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        if (processing || saving) return;

        if (!data.title.trim() || !data.letter.trim()) {
            post(route("letter.store"));
            return;
        }

        setSaving(true);

        setTimeout(() => {
            post(route("letter.store"), {
                onError: () => setSaving(false),
            });
        }, 1700);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tulis Surat" />

            {introState !== "hidden" && (
                <EnvelopeOverlay
                    variant="opening"
                    caption="Membuka surat untuk dirimu…"
                    exiting={introState === "fade"}
                />
            )}

            {saving && (
                <EnvelopeOverlay
                    variant="closing"
                    caption="Menyimpan suratmu ke dalam amplop…"
                />
            )}

            <section
                className={
                    "min-h-screen bg-gradient-to-b from-violet-50 via-white to-indigo-50 py-16 transition-all duration-700 " +
                    (introState === "show"
                        ? "opacity-0 translate-y-6"
                        : "opacity-100 translate-y-0")
                }
            >

                <div className="mx-auto max-w-4xl px-6">

                    <div className="mb-8">
                        <Link
                            href={route("letter.index")}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-700"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Kembali ke Daftar Surat
                        </Link>
                    </div>

                    {/* Header */}

                    <div className="text-center">

                        <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                            Dear Little Me
                        </span>

                        <h1 className="mt-6 text-4xl font-bold text-gray-900">
                            Tulis Surat untuk Dirimu Saat Kecil
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-gray-600 leading-8">
                            Tidak ada format yang benar ataupun salah.
                            Tuliskan apa yang ingin kamu sampaikan kepada
                            dirimu saat kecil dengan jujur dan penuh kasih.
                        </p>

                    </div>

                    {/* Letter */}

                    <form onSubmit={handleSubmit}>
                       <div className="mx-auto mt-14 max-w-3xl rounded-md border border-stone-200 bg-[#fffdf8] px-16 py-14 shadow-2xl">

                    {/* Tanggal */}

                    <div className="text-right">
                        <p className="text-sm italic text-gray-500">
                            {today}
                        </p>
                    </div>

                    {/* Judul Surat */}

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        placeholder="Judul suratmu…"
                        className="mt-8 w-full border-0 border-b border-stone-300 bg-transparent pb-2 font-handwriting text-3xl text-gray-800 outline-none placeholder:text-gray-300 focus:border-violet-400 focus:ring-0"
                    />
                    {errors.title && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.title}
                        </p>
                    )}

                    {/* Kertas Bergaris */}

                    <div
                        className="mt-6"
                        style={{
                            backgroundImage: "url('/images/line.png')",
                            backgroundRepeat: "repeat-y",
                            backgroundSize: "100% 40px",
                            backgroundPosition: "0 55px", //
                        }}
                    >
                        <textarea
                            rows={12}
                            value={data.letter}
                            onChange={(e) => setData("letter", e.target.value)}
                            placeholder="Tulis pesanmu di sini…"
                            className="font-handwriting text-2xl leading-10 letter-textarea placeholder:text-gray-300"
                        />
                    </div>
                    {errors.letter && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.letter}
                        </p>
                    )}

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

                {/* Footer */}

                <div className="mx-auto mt-8 flex max-w-3xl items-center justify-between">

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <LockClosedIcon className="h-5 w-5"/>

                        <span>Surat ini hanya dapat dibaca olehmu.</span>

                    </div>

                    <button
                        type="submit"
                        disabled={processing || saving}
                        className="rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? "Menyimpan…" : "Simpan Surat"}
                    </button>

                </div>
                    </form>

                </div>

            </section>

        </AuthenticatedLayout>
    );
}