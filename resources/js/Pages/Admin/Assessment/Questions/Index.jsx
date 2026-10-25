import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";

export default function Index({ questions, filters }) {
    const { delete: destroy } = useForm();

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus question ini?")) {
           destroy(route("admin.assessment-questions.destroy", id));
        }
    }

    return (
        <AdminLayout>
            <Head title="Questions" />

            <div>

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold">
                            Questions
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage assessment questions.
                        </p>
                    </div>

                    <Link
                        href={route("admin.assessment-questions.create")}
                        className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                    >
                        + Add Question
                    </Link>
                    

                </div>

                {/* Search */}
                <div className="mb-5">

                    <input
                        type="text"
                        defaultValue={filters.search}
                        placeholder="Search question..."
                        className="w-full rounded-lg border px-4 py-3"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                window.location = route(
                                    "admin.assessment-questions.index",
                                    {
                                        search: e.target.value,
                                    }
                                );
                            }
                        }}
                    />

                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">
                                    Assessment
                                </th>

                                <th className="p-4 text-left">
                                    Category
                                </th>

                                <th className="p-4 text-left">
                                    Code
                                </th>

                                <th className="p-4 text-center">
                                    Order
                                </th>

                                <th className="p-4 text-left">
                                    Question
                                </th>

                                <th className="p-4 text-center">
                                    Status
                                </th>

                                <th className="p-4 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {questions.data.map((question) => (

                                <tr
                                    key={question.id}
                                    className="border-t"
                                >

                                  <td className="p-4">
    {question.assessment_type.name}
</td>

                                    <td>
                                        {question.category?.name ?? "-"}
                                    </td>
                                    <td className="p-4 font-medium">
                                        {question.question_code}
                                    </td>

                                    <td className="p-4 text-center">
                                        {question.question_order}
                                    </td>

                                    <td className="max-w-md p-4">
                                        {question.question}
                                    </td>

                                    <td className="p-4 text-center">

                                        {question.is_active ? (

                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                                                Active
                                            </span>

                                        ) : (

                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                                                Inactive
                                            </span>

                                        )}

                                    </td>

                                    <td className="p-4">
    <div className="flex justify-center gap-2">

        <Link
            href={route(
                "admin.assessment-questions.show",
                question.id
            )}
            className="rounded bg-sky-500 px-3 py-2 text-white hover:bg-sky-600"
        >
            View
        </Link>

        <Link
            href={route(
                "admin.assessment-questions.edit",
                question.id
            )}
            className="rounded bg-amber-500 px-3 py-2 text-white hover:bg-amber-600"
        >
            Edit
        </Link>

        <button
            onClick={() => handleDelete(question.id)}
            className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
        >
            Delete
        </button>

        <Link
            href={route(
                "admin.assessment-questions.options.index",
                question.id
            )}
            className="rounded bg-violet-500 px-3 py-2 text-white hover:bg-violet-600"
        >
            Options
        </Link>

    </div>
</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <div className="p-5">
                        <Pagination
                            links={questions.links}
                        />
                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}