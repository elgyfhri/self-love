import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Index({ letters, filters }) {
    const { delete: destroy, get } = useForm({});
    const [search, setSearch] = useState(filters.search ?? "");

    function handleDelete(letter) {
        if (confirm(`Yakin ingin menghapus surat "${letter.title}"?`)) {
            destroy(route("admin.letters.destroy", letter.id));
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        get(route("admin.letters.index", { search }));
    }

    return (
        <AdminLayout>
            <Head title="Dear Little Me" />

            <div>
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Dear Little Me
                        </h1>
                        <p className="text-gray-500">
                            Semua surat yang ditulis pengguna
                        </p>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-6 max-w-md">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul / isi / nama pengguna…"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                        <button
                            type="submit"
                            className="sr-only"
                        >
                            Cari
                        </button>
                    </form>

                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3 text-left">Judul</th>
                                <th className="p-3 text-left">Pengguna</th>
                                <th className="p-3 text-left">Favorit</th>
                                <th className="p-3 text-left">Tanggal</th>
                                <th className="p-3 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {letters.data.map((letter) => (
                                <tr key={letter.id} className="border-b">
                                    <td className="p-3 font-medium">
                                        {letter.title}
                                    </td>
                                    <td className="p-3">
                                        {letter.user ? letter.user.name : "-"}
                                    </td>
                                    <td className="p-3">
                                        {letter.is_favorite ? (
                                            <HeartIcon className="h-5 w-5 text-rose-500" />
                                        ) : (
                                            <span className="text-gray-300">-</span>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {new Date(
                                            letter.created_at
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="flex gap-2 p-3">
                                        <Link
                                            href={route(
                                                "admin.letters.show",
                                                letter.id
                                            )}
                                            className="rounded-lg bg-sky-500 px-3 py-2 text-white hover:bg-sky-600"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(letter)
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

                    {letters.data.length === 0 && (
                        <p className="py-8 text-center text-gray-500">
                            Tidak ada surat ditemukan.
                        </p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}