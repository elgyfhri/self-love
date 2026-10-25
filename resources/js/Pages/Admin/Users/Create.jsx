import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    function submit(e) {
        e.preventDefault();

        post(route("admin.users.store"));
    }

    return (
        <AdminLayout>
            <Head title="Create User" />

            <div className="mx-auto max-w-3xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Create User
                        </h1>
                        <p className="text-gray-500">
                            Tambahkan pengguna baru ke sistem.
                        </p>
                    </div>

                    <Link
                        href={route("admin.users.index")}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                    >
                        Back
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="rounded-2xl bg-white p-8 shadow"
                >
                    <div className="grid gap-6">
                        {/* Name */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full rounded-lg border p-3 focus:border-violet-500 focus:outline-none"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full rounded-lg border p-3 focus:border-violet-500 focus:outline-none"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full rounded-lg border p-3 focus:border-violet-500 focus:outline-none"
                            />

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Role
                            </label>

                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                className="w-full rounded-lg border p-3 focus:border-violet-500 focus:outline-none"
                            >
                                {roles.map((role) => (
                                    <option
                                        key={role.id}
                                        value={role.name}
                                    >
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            {errors.role && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.role}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <Link
                            href={route("admin.users.index")}
                            className="rounded-lg border px-5 py-3 hover:bg-gray-100"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save User"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}