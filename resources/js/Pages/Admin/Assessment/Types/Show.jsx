import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({
    assessmentType,
    workflow,
}) {
    return (
        <AdminLayout>
            <Head title={assessmentType.name} />

            <div className="mx-auto max-w-6xl space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            {assessmentType.name}
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Assessment Detail
                        </p>
                    </div>

                    <div className="flex gap-3">

                        <Link
                            href={route("admin.assessment-types.edit", assessmentType.id)}
                            className="rounded-lg bg-amber-500 px-5 py-2 text-white hover:bg-amber-600"
                        >
                            Edit
                        </Link>

                        <Link
                            href={route("admin.assessment-types.index")}
                            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
                        >
                            Back
                        </Link>

                    </div>

                </div>

                {/* Information */}
                <div className="rounded-xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-xl font-semibold">
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-gray-500">
                                Name
                            </p>

                            <p className="font-semibold">
                                {assessmentType.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Code
                            </p>

                            <p className="font-semibold">
                                {assessmentType.code}
                            </p>
                        </div>

                        <div className="col-span-2">
                            <p className="text-sm text-gray-500">
                                Description
                            </p>

                            <p>
                                {assessmentType.description || "-"}
                            </p>
                        </div>

                        <div className="col-span-2">
                            <p className="text-sm text-gray-500">
                                Instructions
                            </p>

                            <p className="whitespace-pre-line">
                                {assessmentType.instructions || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Estimated Time
                            </p>

                            <p>
                                {assessmentType.estimated_time} Minutes
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Status
                            </p>

                            <span
    className={`rounded-full px-3 py-1 text-sm font-medium ${
        assessmentType.status === "published"
            ? "bg-emerald-100 text-emerald-700"
            : assessmentType.status === "draft"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
    }`}
>
    {assessmentType.status}
</span>
                        </div>

                    </div>

                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-6">

                    <div className="rounded-xl bg-white p-6 shadow">

                        <p className="text-sm text-gray-500">
                            Categories
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {assessmentType.categories_count}
                        </h2>

                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">

                        <p className="text-sm text-gray-500">
                            Questions
                        </p>

                       <h2 className="mt-2 text-3xl font-bold">
    {workflow.question_count}
</h2>

                    </div>

                </div>

                {/* Workflow */}
                {/* Workflow */}
<div className="rounded-xl bg-white p-8 shadow">
    <h2 className="mb-6 text-xl font-semibold">
        Assessment Workflow
    </h2>

    <div className="space-y-4">

        <div className="flex items-center justify-between">
            <span>Basic Information</span>

            <span className="font-medium text-emerald-600">
                ✓ Completed
            </span>
        </div>

        <div className="flex items-center justify-between">
            <span>Category</span>

            <span
                className={
                    workflow.category
                        ? "font-medium text-emerald-600"
                        : "font-medium text-red-600"
                }
            >
                {workflow.category
                    ? "✓ Completed"
                    : "✕ Not Created"}
            </span>
        </div>

        <div className="flex items-center justify-between">
            <span>Question</span>

            <span
                className={
                    workflow.question
                        ? "font-medium text-emerald-600"
                        : "font-medium text-red-600"
                }
            >
                {workflow.question
                    ? "✓ Completed"
                    : "✕ Not Created"}
            </span>
        </div>

        <div className="flex items-center justify-between">
            <span>Question Options</span>

            <span
                className={
                    workflow.question_option
                        ? "font-medium text-emerald-600"
                        : "font-medium text-red-600"
                }
            >
                {workflow.question_option
                    ? "✓ Completed"
                    : "✕ Not Created"}
            </span>
        </div>

        <div className="flex items-center justify-between">
            <span>Learning Contents</span>

            <span
                className={
                    workflow.content
                        ? "font-medium text-emerald-600"
                        : "font-medium text-red-600"
                }
            >
                {workflow.content
                    ? "✓ Completed"
                    : "✕ Not Created"}
            </span>
        </div>

    </div>

    <div className="mt-8 border-t pt-6">

        {workflow.can_publish ? (
            <div className="flex items-center justify-between">

                <div>
                    <h3 className="font-semibold text-emerald-700">
                        Assessment Ready
                    </h3>

                    <p className="text-sm text-gray-500">
                        This assessment has met all requirements and is ready to be published.
                    </p>
                </div>

                {assessmentType.status !== "published" ? (
                   <button
    onClick={() =>
        router.patch(
            route(
                "admin.assessment-types.publish",
                assessmentType.id
            )
        )
    }
    disabled={!workflow.can_publish}
    className={`rounded-lg px-5 py-2 font-medium text-white ${
        workflow.can_publish
            ? "bg-emerald-600 hover:bg-emerald-700"
            : "cursor-not-allowed bg-gray-400"
    }`}
>
    Publish Assessment
</button>
                ) : (
                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                        Published
                    </span>
                )}

            </div>
        ) : (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="font-medium text-yellow-700">
                    Assessment belum dapat dipublish.
                </p>

                <p className="mt-1 text-sm text-yellow-600">
                    Lengkapi seluruh workflow terlebih dahulu sebelum assessment dapat dipublikasikan.
                </p>
            </div>
        )}

    </div>
</div>

            </div>
        </AdminLayout>
    );
}