import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({ users }) {

    const { delete: destroy } = useForm();

    function handleDelete(id) {
        if (confirm("Yakin ingin menghapus user ini?")) {
            destroy(route("admin.users.destroy", id));
        }
    }

    return (
        <AdminLayout>
            <Head title="Users" />

            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        User Management
                    </h1>

                    <Link
                        href={route("admin.users.create")}
                        className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                    >
                        + Add User
                    </Link>
                </div>


                <div className="rounded-xl bg-white p-6 shadow">

                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3 text-left">
                                    Name
                                </th>

                                <th className="p-3 text-left">
                                    Email
                                </th>

                                <th className="p-3 text-left">
                                    Role
                                </th>

                                <th className="p-3 text-left">
                                    Created
                                </th>

                                <th className="p-3 text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>


                        <tbody>

                            {users.data.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-b"
                                >

                                    <td className="p-3">
                                        {user.name}
                                    </td>


                                    <td className="p-3">
                                        {user.email}
                                    </td>


                                    <td className="p-3">
                                        {user.roles.length
                                            ? user.roles[0].name
                                            : "-"
                                        }
                                    </td>


                                    <td className="p-3">
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </td>


                                    <td className="flex gap-2 p-3">

                                        <Link
                                            href={route(
                                                "admin.users.show",
                                                user.id
                                            )}
                                            className="rounded-lg bg-sky-500 px-3 py-2 text-white hover:bg-sky-600"
                                        >
                                            View
                                        </Link>


                                        <Link
                                            href={route(
                                                "admin.users.edit",
                                                user.id
                                            )}
                                            className="rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600"
                                        >
                                            Edit
                                        </Link>


                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
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

                </div>

            </div>

        </AdminLayout>
    );
}