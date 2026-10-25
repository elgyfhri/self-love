import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.roles.length ? user.roles[0].name : "user",
    });

    function submit(e) {
        e.preventDefault();

        put(route("admin.users.update", user.id));
    }

    return (
        <AdminLayout>
            <Head title="Edit User" />

            <form
                onSubmit={submit}
                className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow"
            >
                <h1 className="mb-8 text-3xl font-bold">
                    Edit User
                </h1>

                <div className="mb-5">
                    <label>Name</label>

                    <input
                        className="mt-2 w-full rounded-lg border p-3"
                        value={data.name}
                        onChange={(e) =>
                            setData("name", e.target.value)
                        }
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label>Email</label>

                    <input
                        type="email"
                        className="mt-2 w-full rounded-lg border p-3"
                        value={data.email}
                        onChange={(e) =>
                            setData("email", e.target.value)
                        }
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="mb-8">
                    <label>Role</label>

                    <select
                        className="mt-2 w-full rounded-lg border p-3"
                        value={data.role}
                        onChange={(e) =>
                            setData("role", e.target.value)
                        }
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
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

                <button
                    disabled={processing}
                    className="rounded-lg bg-violet-600 px-6 py-3 text-white"
                >
                    Update User
                </button>
            </form>
        </AdminLayout>
    );
}