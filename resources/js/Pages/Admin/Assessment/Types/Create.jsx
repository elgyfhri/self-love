import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        code: "",
        description: "",
        source: "",
        purpose: "",
        instructions: "",
        scoring_type: "score_range",
        estimated_time: 5,
        thumbnail: null,
    });

    function submit(e) {
        e.preventDefault();

        post(route("admin.assessment-types.store"));
    }

    return (
        <AdminLayout>
            <Head title="Create Assessment Type" />

            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create Assessment Type
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Create a new assessment for your Emotional Learning
                            platform.
                        </p>
                    </div>

                    <Link
                        href={route("admin.assessment-types.index")}
                        className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Back
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-8">

                    {/* ================================================== */}
                    {/* BASIC INFORMATION */}
                    {/* ================================================== */}

                    <div className="rounded-xl bg-white p-8 shadow">

                        <h2 className="mb-6 text-xl font-semibold">
                            Basic Information
                        </h2>

                        {/* Name */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Assessment Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                placeholder="Self Compassion Scale Short Form"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Code */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Assessment Code
                            </label>

                            <input
                                type="text"
                                value={data.code}
                                onChange={(e) =>
                                    setData(
                                        "code",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 uppercase focus:border-emerald-500 focus:outline-none"
                                placeholder="SCS_SF"
                            />

                            {errors.code && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.code}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(e) =>
                                    setData(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                placeholder="Brief description about this assessment..."
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Source */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Dari Mana (Source)
                            </label>

                            <textarea
                                rows={4}
                                value={data.source}
                                onChange={(e) =>
                                    setData("source", e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                placeholder="Asal-usul assessment ini, misalnya siapa yang menyusunnya..."
                            />

                            {errors.source && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.source}
                                </p>
                            )}
                        </div>

                        {/* Purpose */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Untuk Apa (Purpose)
                            </label>

                            <textarea
                                rows={4}
                                value={data.purpose}
                                onChange={(e) =>
                                    setData("purpose", e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                placeholder="Jelaskan apa yang diukur dan apa manfaatnya bagi user..."
                            />

                            {errors.purpose && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.purpose}
                                </p>
                            )}
                        </div>

                        {/* Instructions */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Instructions
                            </label>

                            <textarea
                                rows={6}
                                value={data.instructions}
                                onChange={(e) =>
                                    setData(
                                        "instructions",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                placeholder="Write instructions that will be displayed before users start the assessment..."
                            />

                            {errors.instructions && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.instructions}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* CONFIGURATION */}
                    {/* ================================================== */}

                    <div className="rounded-xl bg-white p-8 shadow">

                        <h2 className="mb-6 text-xl font-semibold">
                            Configuration
                        </h2>

                        {/* Scoring Type */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Scoring Type
                            </label>

                            <select
                                value={data.scoring_type}
                                onChange={(e) =>
                                    setData(
                                        "scoring_type",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                            >
                                <option value="score_range">
                                    Score Range
                                </option>

                                <option value="screening_range">
                                    Screening Range
                                </option>

                                <option value="dominant_tag">
                                    Dominant Tag
                                </option>
                            </select>

                            {errors.scoring_type && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.scoring_type}
                                </p>
                            )}

                            <div className="mt-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">

                                {data.scoring_type === "score_range" ? (
                                    <>
                                        <p className="font-medium text-gray-800">
                                            Score Range
                                        </p>

                                        <p className="mt-1">
                                            Digunakan untuk assessment yang
                                            menghasilkan nilai dan level,
                                            misalnya Low, Moderate, atau High.
                                        </p>

                                        <p className="mt-2 text-gray-500">
                                            Contoh: Self Compassion Scale,
                                            tingkat stres, atau assessment
                                            dengan skor 0–100.
                                        </p>
                                    </>
                                ) : data.scoring_type ===
                                "screening_range" ? (
                                    <>
                                        <p className="font-medium text-gray-800">
                                            Screening Range
                                        </p>

                                        <p className="mt-1">
                                            Untuk instrumen screening yang
                                            redaksi soalnya memakai kalimat
                                            gejala. Semua butirnya
                                            is_reverse, jadi skor tinggi
                                            berarti kondisi yang lebih baik.
                                        </p>

                                        <p className="mt-2 text-gray-500">
                                            Instrumen ini juga memeriksa
                                            pola antar-bagian dari
                                            config assessment
                                            .screening_patterns.
                                        </p>

                                        <p className="mt-2 text-gray-500">
                                            Contoh: Asesmen Kesehatan Mental
                                            Dasar (KMJ).
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-medium text-gray-800">
                                            Dominant Tag
                                        </p>

                                        <p className="mt-1">
                                            Digunakan untuk assessment yang
                                            menentukan tipe berdasarkan tag
                                            jawaban yang paling dominan.
                                        </p>

                                        <p className="mt-2 text-gray-500">
                                            Contoh: Visual, Auditory,
                                            Kinesthetic atau tipe dominan
                                            lainnya.
                                        </p>
                                    </>
                                )}

                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* Thumbnail */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Thumbnail
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            "thumbnail",
                                            e.target.files[0]
                                        )
                                    }
                                    className="block w-full rounded-lg border border-gray-300 p-3"
                                />

                                {errors.thumbnail && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.thumbnail}
                                    </p>
                                )}
                            </div>

                            {/* Estimated Time */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Estimated Time (minutes)
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    value={data.estimated_time}
                                    onChange={(e) =>
                                        setData(
                                            "estimated_time",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                />

                                {errors.estimated_time && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.estimated_time}
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* BUTTON */}
                    {/* ================================================== */}

                    <div className="flex justify-end gap-3">

                        <Link
                            href={route(
                                "admin.assessment-types.index"
                            )}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing
                                ? "Saving..."
                                : "Save Assessment"}
                        </button>

                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}   