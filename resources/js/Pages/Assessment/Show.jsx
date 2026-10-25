import AssessmentLayout from "@/Layouts/AssessmentLayout";
import { router } from "@inertiajs/react";
import {
    AcademicCapIcon,
    ClockIcon,
    LockClosedIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

const URL_SPLIT_PATTERN = /(https?:\/\/[^\s,)]+)/g;

function ReferenceText({ text }) {
    if (!text) {
        return null;
    }

    const parts = String(text).split(URL_SPLIT_PATTERN);

    return (
        <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-600">
            {parts.map((part, index) =>
                part.startsWith("http") ? (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-emerald-700 underline underline-offset-2 transition hover:text-emerald-800"
                    >
                        {part}
                    </a>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </p>
    );
}

function InfoCard({ icon: Icon, label, value, tone }) {
    return (
        <div className={`rounded-2xl p-5 text-center ${tone}`}>
            <Icon className="mx-auto h-6 w-6 opacity-70" />

            <p className="mt-2 text-sm text-gray-500">{label}</p>

            <p className="mt-1 text-lg font-bold text-gray-800">{value}</p>
        </div>
    );
}

export default function Show({ assessment }) {
    return (
        <AssessmentLayout>

            <div className="mx-auto max-w-3xl space-y-6">

                {/* =====================================================
                    TITLE
                ===================================================== */}
                <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                        {assessment.code}
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-gray-800">
                        {assessment.name}
                    </h1>

                    {assessment.description && (
                        <p className="mt-4 text-gray-500">
                            {assessment.description}
                        </p>
                    )}

                </div>


                {/* =====================================================
                    SOURCE & PURPOSE
                ===================================================== */}
                <div className="space-y-4">

                    {assessment.source && (
                        <div className="rounded-3xl bg-white p-7 shadow-sm">

                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <AcademicCapIcon className="h-5 w-5" />
                                </span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    Dari Mana?
                                </h2>
                            </div>

                            <ReferenceText text={assessment.source} />

                        </div>
                    )}

                    {assessment.purpose && (
                        <div className="rounded-3xl bg-white p-7 shadow-sm">

                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <SparklesIcon className="h-5 w-5" />
                                </span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    Untuk Apa?
                                </h2>
                            </div>

                            <ReferenceText text={assessment.purpose} />

                        </div>
                    )}

                </div>


                {/* =====================================================
                    INFO
                ===================================================== */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <InfoCard
                        icon={ClockIcon}
                        label="Durasi"
                        value={`${assessment.estimated_time} menit`}
                        tone="bg-violet-50"
                    />

                    <InfoCard
                        icon={AcademicCapIcon}
                        label="Jumlah Soal"
                        value={assessment.questions_count}
                        tone="bg-sky-50"
                    />

                    <InfoCard
                        icon={SparklesIcon}
                        label="Hasil"
                        value="Dipersonalisasi"
                        tone="bg-emerald-50"
                    />

                    <InfoCard
                        icon={LockClosedIcon}
                        label="Privasi"
                        value="Pribadi"
                        tone="bg-pink-50"
                    />

                </div>


                {/* =====================================================
                    INSTRUCTIONS
                ===================================================== */}
                {assessment.instructions && (
                    <div className="rounded-3xl bg-white p-7 shadow-sm">

                        <h2 className="text-xl font-bold text-gray-800">
                            Petunjuk Pengerjaan
                        </h2>

                        <div className="mt-4 whitespace-pre-line leading-relaxed text-gray-600">
                            {assessment.instructions}
                        </div>

                    </div>
                )}


                {/* =====================================================
                    BUTTON
                ===================================================== */}
                <div className="pb-8 text-center">

                    <button
                        onClick={() =>
                            router.visit(
                                route(
                                    "assessments.start",
                                    assessment.code
                                )
                            )
                        }
                        className="rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.98]"
                    >
                        Mulai Assessment
                    </button>

                </div>

            </div>

        </AssessmentLayout>
    );
}
