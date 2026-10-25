import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ letter }) {
    return (
        <AdminLayout>
            <Head title="Detail Surat" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Detail Surat
                        </h1>
                        <p className="text-gray-500">
                            Surat dari pengguna ke dirinya yang lebih muda
                        </p>
                    </div>

                    <Link
                        href={route("admin.letters.index")}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                    >
                        ← Back
                    </Link>
                </div>

                {/* Card */}
                <div className="rounded-xl bg-[#fffdf8] p-10 shadow">
                    <div className="text-right">
                        <p className="text-sm italic text-gray-500">
                            {new Date(letter.created_at).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    <h1 className="mt-8 text-center text-3xl font-bold text-gray-900">
                        {letter.title}
                    </h1>

                    <p className="mt-10 text-2xl font-handwriting text-gray-800">
                        Dear Little Me,
                    </p>

                    <div className="mt-6 whitespace-pre-wrap text-xl leading-9 text-gray-700">
                        {letter.letter}
                    </div>

                    <div className="mt-12 text-right">
                        <p className="text-lg italic text-gray-600">
                            Dengan penuh kasih,
                        </p>
                    </div>

                    {letter.user && (
                        <div className="mt-10 border-t border-stone-200 pt-6">
                            <p className="text-sm text-gray-500">
                                Ditulis oleh{" "}
                                <span className="font-semibold text-gray-800">
                                    {letter.user.name}
                                </span>{" "}
                                ({letter.user.email})
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}