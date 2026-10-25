import { Head, Link, router } from "@inertiajs/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import AssessmentLayout from "@/Layouts/AssessmentLayout";

function formatDate(value) {
    if (!value) return "-";

    return new Date(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function History({ userAssessments }) {
    const items = userAssessments?.data ?? [];
    const links = userAssessments?.links ?? [];

    return (
        <AssessmentLayout>
            <Head title="Riwayat Assessment" />

            <div className="space-y-8 pb-8">

                {/* =====================================================
                    HEADER
                ===================================================== */}
                <div className="rounded-3xl bg-white p-8 shadow">

                    <Link
                        href={route("assessments.index")}
                        className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                        &larr; Semua Assessment
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold text-gray-800">
                        Riwayat Assessment
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Semua hasil assessment yang pernah kamu kerjakan
                        tersimpan di sini. Buka salah satu untuk melihat
                        rinciannya lagi.
                    </p>

                </div>


                {/* =====================================================
                    LIST
                ===================================================== */}
                {items.length === 0 ? (
                    <div className="rounded-3xl bg-white p-12 text-center shadow">

                        <p className="text-5xl">📋</p>

                        <h2 className="mt-4 text-xl font-semibold text-gray-800">
                            Belum ada riwayat
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Kamu belum menyelesaikan assessment apa pun.
                        </p>

                        <Link
                            href={route("assessments.index")}
                            className="mt-6 inline-flex rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white shadow transition hover:bg-emerald-700"
                        >
                            Mulai Assessment
                        </Link>

                    </div>
                ) : (
                    <div className="space-y-4">

                        {items.map((item) => (
                            <Link
                                key={item.id}
                                href={route(
                                    "assessments.result",
                                    item.id
                                )}
                                className="block rounded-3xl bg-white p-6 shadow transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-6">

                                    <div className="min-w-0">

                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                {
                                                    item.assessment_type
                                                        ?.code
                                                }
                                            </span>

                                            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                                <ClockIcon className="h-4 w-4" />
                                                {formatDate(
                                                    item.completed_at
                                                )}
                                            </span>
                                        </div>

                                        <h3 className="mt-3 text-xl font-semibold text-gray-800">
                                            {
                                                item.assessment_type?.name
                                            }
                                        </h3>

                                        {item.results?.length > 0 && (
                                            <p className="mt-2 text-sm text-gray-500">
                                                {item.results.length}{" "}
                                                kategori dinilai
                                            </p>
                                        )}

                                    </div>


                                    <div className="shrink-0 text-right">

                                        <p className="text-xs uppercase tracking-widest text-gray-400">
                                            Hasil
                                        </p>

                                        <p className="mt-1 text-2xl font-extrabold text-emerald-600">
                                            {item.result_label ??
                                                "Belum Tersedia"}
                                        </p>

                                    </div>

                                </div>
                            </Link>
                        ))}

                    </div>
                )}


                {/* =====================================================
                    PAGINATION
                ===================================================== */}
                {links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    router.get(
                                        link.url,
                                        {},
                                        {
                                            preserveScroll: true,
                                            replace: true,
                                        }
                                    )
                                }
                                disabled={!link.url}
                                className={`rounded-lg px-4 py-2 text-sm transition ${
                                    link.active
                                        ? "bg-emerald-600 text-white"
                                        : "bg-white text-gray-600 shadow hover:bg-gray-50"
                                } ${
                                    !link.url
                                        ? "cursor-not-allowed opacity-40"
                                        : ""
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                )}

            </div>
        </AssessmentLayout>
    );
}
