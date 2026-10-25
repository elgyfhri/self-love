import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";
export default function Index({ categories }) {

    const { delete: destroy } = useForm();

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus category ini?")) {
            destroy(route("admin.assessment-categories.destroy", id));
        }
    }

    return (
        <AdminLayout>

            <Head title="Assessment Categories" />

            <div>

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">

                    <h1 className="text-2xl font-bold">
                        Assessment Categories
                    </h1>

                    <Link
                        href={route("admin.assessment-categories.create")}
                        className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                    >
                        + Add Category
                    </Link>

                </div>

                {/* Table */}
                <div className="rounded-xl bg-white p-6 shadow">

                    <table className="min-w-full border-collapse">

                        <thead>

                            <tr className="border-b">

                                <th className="p-3 text-left">
                                    Assessment
                                </th>

                                <th className="p-3 text-left">
                                    Category
                                </th>

                                <th className="p-3 text-left">
                                    Abbreviation
                                </th>

                                <th className="p-3 text-left">
                                    Questions
                                </th>

                                <th className="p-3 text-left">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.data.map((category) => (

                                <tr
                                    key={category.id}
                                    className="border-b"
                                >

                                    <td className="p-3">
    {category.assessment_types
        ?.map(type => type.name)
        .join(", ") || "-"}
</td>

                                    <td className="p-3">
                                        {category.name}
                                    </td>

                                    <td className="p-3">
                                        {category.abbreviation ?? "-"}
                                    </td>

                                    <td className="p-3">
                                        {category.questions_count}
                                    </td>

                                    <td className="flex gap-2 p-3">

                                        <Link
                                            href={route(
                                                "admin.assessment-categories.show",
                                                category.id
                                            )}
                                            className="rounded-lg bg-sky-500 px-3 py-2 text-white hover:bg-sky-600"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            href={route(
                                                "admin.assessment-categories.edit",
                                                category.id
                                            )}
                                            className="rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(category.id)
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
                    <Pagination
    links={categories.links}
/>

                </div>

            </div>
            

        </AdminLayout>
    );
}