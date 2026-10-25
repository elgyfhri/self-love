import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({ question }) {
    return (
        <AdminLayout>
            <Head title="Question Detail" />

            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Question Detail
                        </h1>

                        <p className="mt-2 text-gray-500">
                            View assessment question information.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={route("admin.assessment-questions.index")}
                            className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Back
                        </Link>

                        <Link
                            href={route(
                                "admin.assessment-questions.edit",
                                question.id
                            )}
                            className="rounded-lg bg-emerald-600 px-5 py-2 font-medium text-white hover:bg-emerald-700"
                        >
                            Edit
                        </Link>
                        <Link
href={route(
    "admin.assessment-questions.options.index",
    question.id
)}
className="
px-4 py-2
rounded-lg
bg-emerald-600
text-white
"
>
Manage Options
</Link>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="mb-8 rounded-xl bg-white p-8 shadow">
                    <h2 className="mb-6 text-xl font-semibold">
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <p className="mb-1 text-sm text-gray-500">
                                Question Code
                            </p>

                            <p className="font-semibold">
                                {question.question_code}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-sm text-gray-500">
                                Assessment Type
                            </p>

                            <p className="font-semibold">
                                {question.assessment_type?.name}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-sm text-gray-500">
                                Category
                            </p>

                            <p className="font-semibold">
                                {question.category?.name}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-sm text-gray-500">
                                Question Order
                            </p>

                            <p className="font-semibold">
                                {question.question_order}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-sm text-gray-500">
                                Answer Type
                            </p>

                            <p className="font-semibold capitalize">
                                {question.answer_type.replace("_", " ")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Question */}
                <div className="mb-8 rounded-xl bg-white p-8 shadow">
                    <h2 className="mb-6 text-xl font-semibold">
                        Question
                    </h2>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 leading-7 text-gray-700">
                        {question.question}
                    </div>
                </div>

                {/* Configuration */}
                <div className="mb-8 rounded-xl bg-white p-8 shadow">
                    <h2 className="mb-6 text-xl font-semibold">
                        Configuration
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                            <p className="mb-2 text-sm text-gray-500">
                                Reverse Scored
                            </p>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-medium ${
                                    question.is_reverse
                                        ? "bg-red-100 text-red-700"
                                        : "bg-emerald-100 text-emerald-700"
                                }`}
                            >
                                {question.is_reverse ? "Yes" : "No"}
                            </span>
                        </div>

                        <div>
                            <p className="mb-2 text-sm text-gray-500">
                                Required
                            </p>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-medium ${
                                    question.is_required
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {question.is_required ? "Yes" : "No"}
                            </span>
                        </div>

                        <div>
                            <p className="mb-2 text-sm text-gray-500">
                                Status
                            </p>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-medium ${
                                    question.is_active
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {question.is_active
                                    ? "Active"
                                    : "Inactive"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="rounded-xl bg-white p-8 shadow">
                    <h2 className="mb-6 text-xl font-semibold">
                        Answer Options
                    </h2>

                    {question.options &&
                    question.options.length > 0 ? (
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            #
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Option
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Value
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {question.options.map(
                                        (option, index) => (
                                            <tr key={option.id}>
                                                <td className="px-6 py-4">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {option.option_text}
                                                </td>

                                                <td className="px-6 py-4">
                                                     {question.is_reverse ? (
        <span>
            {option.option_value}{" "}
            <span className="text-gray-400">→</span>{" "}
            <span className="font-semibold text-amber-600">
                {6 - option.option_value}
            </span>
        </span>
    ) : (
        option.option_value
    )}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-gray-500">
                            No answer options available.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}