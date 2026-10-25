import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Question() {
    const questions = [
        {
            id: 1,
            text: "Ketika saya mengalami masa sulit, saya cenderung larut dalam perasaan negatif.",
        },
        {
            id: 2,
            text: "Saya berusaha bersikap baik kepada diri sendiri ketika menghadapi kesulitan.",
        },
        {
            id: 3,
            text: "Ketika sesuatu yang menyakitkan terjadi, saya berusaha melihatnya secara seimbang.",
        },
        {
            id: 4,
            text: "Saya merasa hanya saya yang mengalami kesulitan dalam hidup.",
        },
        {
            id: 5,
            text: "Saya menyadari bahwa setiap orang pernah mengalami kegagalan.",
        },
        {
            id: 6,
            text: "Saya memberikan dukungan kepada diri sendiri ketika sedang menghadapi masalah.",
        },
        {
            id: 7,
            text: "Saya mampu menerima emosi saya tanpa bereaksi secara berlebihan.",
        },
        {
            id: 8,
            text: "Ketika saya gagal, saya merasa terasing dari orang lain.",
        },
        {
            id: 9,
            text: "Saya terlalu memikirkan hal-hal yang membuat saya kecewa.",
        },
        {
            id: 10,
            text: "Saya melihat bahwa kesulitan adalah bagian dari pengalaman manusia.",
        },
        {
            id: 11,
            text: "Saya sangat keras mengkritik diri sendiri ketika melakukan kesalahan.",
        },
        {
            id: 12,
            text: "Saya tidak sabar terhadap kekurangan yang saya miliki.",
        },
    ];

    const options = [
        { value: 1, label: "Hampir Tidak Pernah" },
        { value: 2, label: "Jarang" },
        { value: 3, label: "Kadang-kadang" },
        { value: 4, label: "Sering" },
        { value: 5, label: "Hampir Selalu" },
    ];

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});

    const progress = ((current + 1) / questions.length) * 100;

    const selectAnswer = (value) => {
        setAnswers({
            ...answers,
            [questions[current].id]: value,
        });
    };

    const next = () => {
        if (current < questions.length - 1) {
            setCurrent(current + 1);
        }
    };

    const previous = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Assessment" />

            <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16">

                <div className="mx-auto max-w-3xl px-6">

                    {/* Header */}

                    <div className="text-center">

                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Self Assessment
                        </span>

                        <h1 className="mt-5 text-4xl font-bold text-gray-900">
                            Self-Compassion Assessment
                        </h1>

                    </div>

                    {/* Progress */}

                    <div className="mt-12">

                        <div className="mb-3 flex justify-between text-sm text-gray-500">

                            <span>
                                Pertanyaan {current + 1} dari {questions.length}
                            </span>

                            <span>
                                {Math.round(progress)}%
                            </span>

                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                            <div
                                className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>

                    </div>

                    {/* Question */}

                    <div className="mt-10 rounded-3xl bg-white p-10 shadow-xl">

                        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                            Pertanyaan {current + 1}
                        </h2>

                        <p className="mt-5 text-2xl font-semibold leading-10 text-gray-900">
                            {questions[current].text}
                        </p>

                        {/* Answers */}

                        <div className="mt-10 space-y-4">

                            {options.map((option) => (

                                <button
                                    key={option.value}
                                    onClick={() => selectAnswer(option.value)}
                                    className={`w-full rounded-2xl border p-5 text-left transition

                                    ${
                                        answers[questions[current].id] === option.value
                                            ? "border-emerald-600 bg-emerald-50"
                                            : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                                    }`}
                                >

                                    <div className="flex items-center justify-between">

                                        <span className="font-medium text-gray-800">
                                            {option.label}
                                        </span>

                                        {answers[questions[current].id] === option.value && (
                                            <div className="h-3 w-3 rounded-full bg-emerald-600"></div>
                                        )}

                                    </div>

                                </button>

                            ))}

                        </div>

                    </div>

                    {/* Navigation */}

                    <div className="mt-10 flex justify-between">

                        <button
                            onClick={previous}
                            disabled={current === 0}
                            className="rounded-xl border border-gray-300 px-6 py-3 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ← Sebelumnya
                        </button>

                        {current < questions.length - 1 ? (

                            <button
                                onClick={next}
                                disabled={!answers[questions[current].id]}
                                className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Selanjutnya →
                            </button>

                        ) : (

                            <Link
    href={route("assessment.result")}
    className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
>
    Selesai Assessment
</Link>

                        )}

                    </div>

                </div>

            </section>

        </AuthenticatedLayout>
    );
}