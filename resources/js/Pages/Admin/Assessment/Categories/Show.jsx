import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({ category }) {
    return (
        <AdminLayout>
            <Head title="Assessment Category Detail" />

            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Assessment Category Detail
                        </h1>

                        <p className="mt-2 text-gray-500">
                            View category information.
                        </p>
                    </div>

                    <Link
                        href={route("admin.assessment-categories.index")}
                        className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
                    >
                        Back
                    </Link>
                </div>

                <div className="rounded-xl bg-white p-8 shadow">

                    <div className="grid gap-6">

                        {/* Assessment Types */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-500">
                                Assessment Types
                            </label>

                            <div className="flex flex-wrap gap-2">
                                {category.assessment_types.length > 0 ? (
                                    category.assessment_types.map((type) => (
                                        <span
                                            key={type.id}
                                            className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                                        >
                                            {type.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400">
                                        No assessment type
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Category Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-500">
                                Category Name
                            </label>

                            <div className="rounded-lg border bg-gray-50 px-4 py-3">
                                {category.name}
                            </div>
                        </div>

                        {/* Abbreviation */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-500">
                                Abbreviation
                            </label>

                            <div className="rounded-lg border bg-gray-50 px-4 py-3">
                                {category.abbreviation || "-"}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-500">
                                Description
                            </label>

                            <div className="min-h-24 rounded-lg border bg-gray-50 px-4 py-3">
                                {category.description || "-"}
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-xl border bg-emerald-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Total Questions
                                </p>

                                <p className="mt-2 text-3xl font-bold text-emerald-600">
                                    {category.questions_count}
                                </p>
                            </div>

                            <div className="rounded-xl border bg-blue-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Total Contents
                                </p>

                                <p className="mt-2 text-3xl font-bold text-blue-600">
                                    {category.contents_count}
                                </p>
                            </div>

                        </div>

                      
                        

                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}