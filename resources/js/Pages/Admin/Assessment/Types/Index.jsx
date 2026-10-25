import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";

export default function Index({ assessmentTypes }) {
    const { delete: destroy } = useForm();

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus assessment ini?")) {
            destroy(route("admin.assessment-types.destroy", id));
        }
    }

    return (
        <AdminLayout>
            <Head title="Assessment Types" />

            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        Assessment Types
                    </h1>

                    <Link
                        href={route("admin.assessment-types.create")}
                        className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                    >
                        + Add Assessment
                    </Link>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Code</th>
                                <th className="p-3 text-left">Time</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Created</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {assessmentTypes.data.map((assessment) => (
                                <tr
                                    key={assessment.id}
                                    className="border-b"
                                >
                                    <td className="p-3">
                                        {assessment.name}
                                    </td>

                                    <td className="p-3">
                                        {assessment.code}
                                    </td>

                                    <td className="p-3">
                                        {assessment.estimated_time} min
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                                                assessment.status === "published"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : assessment.status === "draft"
                                                    ? "bg-gray-100 text-gray-700"
                                                    : "bg-orange-100 text-orange-700"
                                            }`}
                                        >
                                            {assessment.status}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {new Date(
                                            assessment.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="flex gap-2 p-3">
                                        <Link
                                            href={route(
                                                "admin.assessment-types.show",
                                                assessment.id
                                            )}
                                            className="rounded-lg bg-sky-500 px-3 py-2 text-white hover:bg-sky-600"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            href={route(
                                                "admin.assessment-types.edit",
                                                assessment.id
                                            )}
                                            className="rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(assessment.id)
                                            }
                                            className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

<Pagination links={assessmentTypes.links} />
                </div>
            </div>
        </AdminLayout>
    );
}