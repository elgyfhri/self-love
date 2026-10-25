import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ assessmentCategory, assessmentTypes }) {

    const { data, setData, put, processing, errors } = useForm({
        assessment_type_id: assessmentCategory.assessment_type_id,
        name: assessmentCategory.name,
        abbreviation: assessmentCategory.abbreviation ?? "",
        description: assessmentCategory.description ?? "",
    });

    function submit(e) {
        e.preventDefault();

        put(
            route(
                "admin.assessment-categories.update",
                assessmentCategory.id
            )
        );
    }

    return (
        <AdminLayout>

            <Head title="Edit Assessment Category" />

            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Edit Assessment Category
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Update category information.
                        </p>
                    </div>

                    <Link
                        href={route("admin.assessment-categories.index")}
                        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
                    >
                        Back
                    </Link>

                </div>

                <form
                    onSubmit={submit}
                    className="space-y-8"
                >

                    <div className="rounded-xl bg-white p-8 shadow">

                        <h2 className="mb-6 text-xl font-semibold">
                            Category Information
                        </h2>

                        {/* Assessment */}
                        <div className="mb-6">

                            <label className="mb-2 block font-medium">
                                Assessment Type
                            </label>

                            <select
                                value={data.assessment_type_id}
                                onChange={(e) =>
                                    setData(
                                        "assessment_type_id",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border px-4 py-3"
                            >
                                {assessmentTypes.map((assessment) => (

                                    <option
                                        key={assessment.id}
                                        value={assessment.id}
                                    >
                                        {assessment.name}
                                    </option>

                                ))}

                            </select>

                            {errors.assessment_type_id && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.assessment_type_id}
                                </p>
                            )}

                        </div>

                        {/* Name */}
                        <div className="mb-6">

                            <label className="mb-2 block font-medium">
                                Category Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full rounded-lg border px-4 py-3"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}

                        </div>

                        {/* Abbreviation */}
                        <div className="mb-6">

                            <label className="mb-2 block font-medium">
                                Abbreviation
                            </label>

                            <input
                                type="text"
                                value={data.abbreviation}
                                onChange={(e) =>
                                    setData(
                                        "abbreviation",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                className="w-full rounded-lg border px-4 py-3 uppercase"
                            />

                            {errors.abbreviation && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.abbreviation}
                                </p>
                            )}

                        </div>

                        {/* Description */}
                        <div>

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
                                className="w-full rounded-lg border px-4 py-3"
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}

                        </div>

                    </div>

                    <div className="flex justify-end gap-3">

                        <Link
                            href={route("admin.assessment-categories.index")}
                            className="rounded-lg border px-6 py-3 hover:bg-gray-100"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </AdminLayout>
    );
}