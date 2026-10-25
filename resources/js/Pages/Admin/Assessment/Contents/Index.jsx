import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";

export default function Index({ contents }) {
    const { delete: destroy } = useForm();
    

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus content ini?")) {
            destroy(route("admin.contents.destroy", id));
        }
    }

    return (
        <AdminLayout>
            <Head title="Contents" />

            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        Learning Contents
                    </h1>

                    <Link
                        href={route("admin.contents.create")}
                        className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                    >
                        + Add Content
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">
                    <table className="min-w-full border-collapse">
                       <thead>
                            <tr className="border-b">
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Scope</th>
                                <th className="p-3 text-left">Assessment</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Difficulty</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
{contents.data.map((content) => (
    <tr
        key={content.id}
        className="border-b"
    >

        {/* Title */}
        <td className="p-3 font-medium">
            {content.title}
        </td>


        {/* Scope */}
        <td className="p-3">
            {
                content.category
                    ? "Category"
                    : content.assessment_type
                    ? "Assessment"
                    : "Global"
            }
        </td>


        {/* Assessment */}
        <td className="p-3">
            {content.assessment_type?.name ?? "-"}
        </td>


        {/* Category */}
        <td className="p-3">
            {content.category?.name ?? "-"}
        </td>


        {/* Type */}
        <td className="p-3">
            {content.type}
        </td>

<td className="p-3 capitalize">
    {content.difficulty}
</td>

<td className="p-3">
    <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${
            content.status === "published"
                ? "bg-emerald-100 text-emerald-700"
                : content.status === "draft"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-200 text-gray-700"
        }`}
    >
        {content.status}
    </span>
</td>

                                    <td className="flex gap-2 p-3">
                                        <Link
                                            href={route(
                                                "admin.contents.show",
                                                content.id
                                            )}
                                            className="rounded-lg bg-sky-500 px-3 py-2 text-white hover:bg-sky-600"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            href={route(
                                                "admin.contents.edit",
                                                content.id
                                            )}
                                            className="rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(content.id)
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

                    <div className="mt-6">
                        <Pagination links={contents.links} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}