import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ user }) {
    const role =
        user.roles && user.roles.length > 0
            ? user.roles[0].name
            : "-";

    return (
        <AdminLayout>
            <Head title="User Detail" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            User Detail
                        </h1>

                        <p className="text-gray-500">
                            Detail informasi pengguna
                        </p>
                    </div>

                    <Link
                        href={route("admin.users.index")}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                    >
                        ← Back
                    </Link>
                </div>

                {/* Card */}
                <div className="rounded-xl bg-white p-8 shadow">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                        <div>
                            <p className="text-sm text-gray-500">
                                Name
                            </p>

                            <p className="mt-2 text-lg font-semibold">
                                {user.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="mt-2 text-lg font-semibold">
                                {user.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Role
                            </p>

                            <span
                                className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                                    role === "superadmin"
                                        ? "bg-red-100 text-red-700"
                                        : role === "admin"
                                        ? "bg-violet-100 text-violet-700"
                                        : "bg-green-100 text-green-700"
                                }`}
                            >
                                {role}
                            </span>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Joined At
                            </p>

                            <p className="mt-2">
                                {new Date(
                                    user.created_at
                                ).toLocaleString("id-ID")}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Last Assessment
                            </p>

                            <p className="mt-2">
                                {user.last_assessment_at
                                    ? new Date(
                                          user.last_assessment_at
                                      ).toLocaleString("id-ID")
                                    : "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Assessment
                            </p>

                            <p className="mt-2 text-lg font-semibold">
                                {user.assessments
                                    ? user.assessments.length
                                    : 0}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-3">
                        <Link
                            href={route(
                                "admin.users.edit",
                                user.id
                            )}
                            className="rounded-lg bg-yellow-500 px-5 py-3 text-white hover:bg-yellow-600"
                        >
                            Edit User
                        </Link>

                        <Link
                            href={route("admin.users.index")}
                            className="rounded-lg border px-5 py-3 hover:bg-gray-100"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}