import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ assessmentType }) {
    // const { data, setData, put, processing, errors } = useForm({
    //     name: assessmentType.name ?? "",
    //     code: assessmentType.code ?? "",
    //     description: assessmentType.description ?? "",
    //     instructions: assessmentType.instructions ?? "",
    //     estimated_time: assessmentType.estimated_time ?? "",
    //     // thumbnail: null,
    //     thumbnail: assessmentType.thumbnail ?? null,

    // });

    // function submit(e) {
    //     e.preventDefault();
    //     console.log(e);
    //     console.log(data);

    //     put(route("admin.assessment-types.update", assessmentType.id));
    // }

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT", // Add Method Spoofing
        name: assessmentType.name ?? "",
        code: assessmentType.code ?? "",
        description: assessmentType.description ?? "",
        source: assessmentType.source ?? "",
        purpose: assessmentType.purpose ?? "",
        instructions: assessmentType.instructions ?? "",
        estimated_time: assessmentType.estimated_time ?? "",
         scoring_type: assessmentType.scoring_type ?? "score_range",
        thumbnail: null, // Biarkan null jika pengguna tidak mengganti gambar
    });

    function submit(e) {
        e.preventDefault();

        // Gunakan post, bukan put
        post(route("admin.assessment-types.update", assessmentType.id));
    }

    return (
        <AdminLayout>
            <Head title="Edit Assessment Type" />
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Edit Assessment Type
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Edit a assessment for your Emotional Learning
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

                    {/* Basic Information */}
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
                                    setData("description", e.target.value)
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
                                    setData("instructions", e.target.value)
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

                    {/* Configuration */}
                    <div className="rounded-xl bg-white p-8 shadow">

                        <h2 className="mb-6 text-xl font-semibold">
                            Configuration
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* Thumbnail */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Thumbnail
                                </label>
                                {assessmentType.thumbnail && (
                                    <img
                                        src={`/storage/${assessmentType.thumbnail}`}
                                        alt={assessmentType.name}
                                        className="mb-3 h-28 w-28 rounded-lg border object-cover"
                                    />
                                )}

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

                            <div>
    <label className="mb-2 block font-medium">
        Scoring Type
    </label>

    <select
        value={data.scoring_type}
        onChange={(e) =>
            setData("scoring_type", e.target.value)
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


                        <div className="mt-6">

                        </div>
                    </div>

                    {/* Button */}
                    <div className="flex justify-end gap-3">

                        <Link
                            href={route("admin.assessment-types.index")}
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
            {/* Tempelkan form Create di sini */}
        </AdminLayout>
    );
}