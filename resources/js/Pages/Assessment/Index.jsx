import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AssessmentCard from "@/Components/Assessment/AssessmentCard";

export default function Index({ assessments }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Assessments
                </h2>
            }
        >
            <Head title="Assessments" />

            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto flex max-w-7xl items-stretch gap-8 px-4 py-8 sm:px-6 lg:px-8">
                    <aside className="hidden w-80 shrink-0 self-stretch lg:block">
                        <div className="sticky top-24 flex flex-col gap-6">
                            <div>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">Assessment</p>
                                <h1 className="text-3xl font-bold text-gray-900">Kenali dirimu lebih dalam</h1>
                                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                    Pahami kondisi dirimu dan temukan langkah yang sesuai untuk perjalanan self-love-mu.
                                </p>
                            </div>
                            <Link
                                href={route("assessments.history")}
                                className="inline-flex w-fit rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
                            >
                                Lihat Riwayat Hasil
                            </Link>
                        </div>
                    </aside>
                    <main className="min-w-0 flex-1">
                        <div className="mb-6 lg:hidden">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">Assessment</p>
                            <h1 className="text-3xl font-bold text-gray-900">Kenali dirimu lebih dalam</h1>
                            <p className="mt-3 text-sm leading-relaxed text-gray-500">Pahami kondisi dirimu dan temukan langkah yang sesuai untuk perjalanan self-love-mu.</p>
                            <Link href={route("assessments.history")} className="mt-4 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">Lihat Riwayat Hasil</Link>
                        </div>
                    {assessments.length === 0 ? (
                        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Belum ada assessment
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Assessment belum tersedia saat ini.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {assessments.map((assessment) => (
                                <AssessmentCard
                                    key={assessment.id}
                                    assessment={assessment}
                                />
                            ))}
                        </div>
                    )}
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}