import AssessmentLayout from "@/Layouts/AssessmentLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

function StoryShare() {
    const shareStory = async () => {
        const storyUrl = window.location.href;
        const canvas = document.createElement("canvas");
        canvas.width = 1080;
        canvas.height = 1920;
        const context = canvas.getContext("2d");
        const gradient = context.createLinearGradient(0, 0, 1080, 1920);
        gradient.addColorStop(0, "#ecfdf5");
        gradient.addColorStop(1, "#a7f3d0");
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#064e3b";
        context.font = "700 42px Arial";
        context.fillText("SelfLove", 90, 130);
        context.fillStyle = "#128c5e";
        context.font = "600 28px Arial";
        context.fillText("HASIL REFLEKSI DIRIMU", 90, 255);
        context.fillStyle = "#123c2d";
        context.font = "700 76px Arial";
        context.fillText("Aku telah", 90, 440);
        context.fillText("menyelesaikan", 90, 535);
        context.fillText("assessment ini.", 90, 630);
        context.fillStyle = "#ffffff";
        context.roundRect(70, 760, 940, 500, 44);
        context.fill();
        context.fillStyle = "#128c5e";
        context.font = "600 30px Arial";
        context.fillText("SELESAI UNTUK HARI INI", 130, 870);
        context.fillStyle = "#064e3b";
        context.font = "700 58px Arial";
        context.fillText("Aku telah", 130, 1010);
        context.fillText("menyelesaikan", 130, 1090);
        context.fillText("assessment di SelfLove.", 130, 1170);
        context.fillStyle = "#376b57";
        context.font = "400 30px Arial";
        context.fillText("Kenali dirimu, rawat dirimu.", 130, 1280);
        context.fillStyle = "#128c5e";
        context.font = "600 26px Arial";
        context.fillText("Kunjungi SelfLove:", 90, 1680);
        context.fillStyle = "#064e3b";
        context.font = "400 25px Arial";
        context.fillText(storyUrl, 90, 1735);

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        const file = new File([blob], "hasil-assessment-selflove.png", { type: "image/png" });
        if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
            await navigator.share({ title: "Hasil assessment SelfLove", files: [file] });
            return;
        }
        const link = document.createElement("a");
        link.download = file.name;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    };

    return <button id="story-share-button" type="button" onClick={shareStory} className="rounded-xl bg-[#128c5e] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#064e3b]">Bagikan ke Instagram</button>;
}

const FREQUENCY_WORDS = [
    "Nol",
    "Sekali",
    "Dua Kali",
    "Tiga Kali",
    "Empat Kali",
    "Lima Kali",
    "Enam Kali",
    "Tujuh Kali",
    "Delapan Kali",
    "Sembilan Kali",
    "Sepuluh Kali",
    "Sebelas Kali",
    "Dua Belas Kali",
    "Tiga Belas Kali",
    "Empat Belas Kali",
    "Lima Belas Kali",
    "Enam Belas Kali",
    "Tujuh Belas Kali",
    "Delapan Belas Kali",
    "Sembilan Belas Kali",
    "Dua Puluh Kali",
];

const ONES = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
];

const TENS = [
    "",
    "Sepuluh",
    "Sebelas",
    "Dua Belas",
    "Tiga Belas",
    "Empat Belas",
    "Lima Belas",
    "Enam Belas",
    "Tujuh Belas",
    "Delapan Belas",
    "Sembilan Belas",
];

function toIndonesianNumber(value) {
    if (value < 20) {
        return FREQUENCY_WORDS[value].replace(" Kali", "");
    }

    if (value < 100) {
        const tens = Math.floor(value / 10);
        const ones = value % 10;

        return [TENS[tens], ONES[ones]].filter(Boolean).join(" ");
    }

    return String(value);
}

function frequencyWord(count) {
    const value = Number(count) || 0;

    if (value < 0) return "Tidak Ada";
    if (value === 0) return FREQUENCY_WORDS[0];

    return `${toIndonesianNumber(value)} Kali`;
}

function getCategoryLabel(item) {
    return item?.category?.label ?? "Global";
}

export default function Result({
    assessment,
    recommendations = [],
}) {
    const scoringType = assessment.assessment_type?.scoring_type;

    const isDominantTag = scoringType === "dominant_tag";

    /*
     * screening_range juga menampilkan skor per kategori, tapi arah
     * skornya sudah dibalik (skor tinggi = kondisi lebih baik) dan
     * baris kategorinya bisa membawa catatan pola.
     */
    const isScreeningRange = scoringType === "screening_range";

    const isScoreRange = scoringType === "score_range";

    const isRangeLike = isScoreRange || isScreeningRange;

    const dominantResult = isDominantTag
        ? assessment.results?.[0]
        : null;

    const overallResult =
        assessment.result_label ?? dominantResult?.value ?? null;

    useEffect(() => {
        if (sessionStorage.getItem(`assessment-share-${assessment.id}`)) return;
        sessionStorage.setItem(`assessment-share-${assessment.id}`, "1");
        Swal.fire({
            title: "Assessment selesai",
            text: "Mau membagikan pencapaianmu ke Instagram Story? Hasil assessment tidak akan ditampilkan.",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Bagikan ke Instagram",
            cancelButtonText: "Nanti saja",
            confirmButtonColor: "#128c5e",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) document.getElementById("story-share-button")?.click();
        });
    }, [assessment.id]);

    return (
        <AssessmentLayout>
            <Head title="Assessment Result" />

            <div className="mx-auto max-w-5xl space-y-8">

                {/* =====================================================
                    HEADER
                ===================================================== */}
                <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 p-10 text-white shadow-xl">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
                        Assessment Result
                    </p>

                    <h1 className="mt-3 text-4xl font-bold">
                        Assessment Completed 🎉
                    </h1>

                    <p className="mt-3 max-w-2xl text-emerald-50">
                        Thank you for completing this assessment.
                        Here is a summary of the result based on your answers.
                    </p>

                    {/* Overall Result */}
                    <div className="mt-8">

                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
                            {isDominantTag ? "Dominan Anda" : "Hasil Akhir"}
                        </p>

                        <h2 className="mt-2 text-5xl font-extrabold capitalize">
                            {overallResult ?? "Belum Tersedia"}
                        </h2>

                    </div>

                </div>


                {/* =====================================================
                    DOMINANT TAG RESULT
                ===================================================== */}
                {isDominantTag && dominantResult && (

                    <div className="overflow-hidden rounded-3xl bg-white shadow">

                        <div className="border-b border-gray-100 px-8 py-6">

                            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                                Your Dominant Result
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-800">
                                The result that appeared most frequently
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Based on your answers, the following trait or
                                category received the highest number of responses.
                            </p>

                        </div>

                        <div className="p-8">

                            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center">

                                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                                    Dominant Tag
                                </p>

                                <h3 className="mt-4 text-5xl font-extrabold capitalize text-gray-800">
                                    {dominantResult.value ?? dominantResult.level}
                                </h3>

                                <div className="mx-auto mt-6 h-px max-w-xs bg-emerald-200" />

                                <p className="mt-6 text-gray-600">
                                    Trait ini muncul
                                </p>

                                <p className="mt-1 text-3xl font-bold text-emerald-600">
                                    {frequencyWord(dominantResult.score)}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    dalam jawaban Anda.
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* =====================================================
                    DISCLAIMER SCREENING
                ===================================================== */}
                {isScreeningRange && (
                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow">
                        <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
                            Penting untuk Dibaca
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-amber-900">
                            Ini bukan diagnosis
                        </h2>

                        <p className="mt-3 leading-relaxed text-amber-900">
                            Hasil di atas berasal dari instrumen screening
                            yang disusun untuk aplikasi ini. Instrumen ini
                            tidak punya validasi psikometrik, tidak punya
                            ambang cut-off yang terpublikasi, dan tidak
                            bisa menggantikan pemeriksaan oleh tenaga
                            profesional kesehatan mental.
                        </p>

                        <p className="mt-3 leading-relaxed text-amber-900">
                            Nama kondisi yang muncul di catatan pola
                            adalah kemungkinan berdasarkan pola jawaban,
                            bukan diagnosis. Jangan gunakan hasil ini
                            sebagai dasar keputusan klinis.
                        </p>

                        <p className="mt-3 leading-relaxed text-amber-900">
                            Kalau hasil ini membuatmu bingung, atau kalau
                            kamu sedang merasa kosong, sulit berfungsi
                            sehari-hari, atau tergoda untuk menyakiti
                            diri sendiri, hubungi profesional kesehatan
                            mental atau layanan darurat di sekitarmu.
                            Kamu tidak perlu menghadapinya sendirian.
                        </p>
                    </div>
                )}


                {/* =====================================================
                    SCORE RANGE RESULT
                ===================================================== */}
                {isRangeLike && (

                    <div className="rounded-3xl bg-white p-8 shadow">

                        <div className="mb-8">

                            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                                Your Profile
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-800">
                                Your Result by Category
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Setiap kategori menunjukkan aspek berbeda
                                yang diukur oleh assessment ini.
                            </p>

                        </div>


                        <div className="space-y-5">

                            {assessment.results?.map((result) => (

                                <div
                                    key={result.id}
                                    className="rounded-2xl border border-gray-100 bg-slate-50/50 p-6 transition hover:border-emerald-200 hover:shadow-sm"
                                >

                                    <div className="flex items-center justify-between gap-6">

                                        <div className="min-w-0">

                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {result.category?.label ?? "Category"}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Tingkat kategori ini:
                                            </p>

                                            {result.recommendation && (
                                                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                                                        Catatan pola
                                                    </p>

                                                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-amber-900">
                                                        {result.recommendation}
                                                    </p>
                                                </div>
                                            )}

                                        </div>


                                        <div className="shrink-0 text-right">

                                            <p className="text-2xl font-extrabold text-emerald-600">
                                                {result.level_label ??
                                                    "Belum Tersedia"}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Hasil
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}


                {/* =====================================================
                    FALLBACK
                ===================================================== */}
                {!isDominantTag && !isRangeLike && (

                    <div className="rounded-3xl bg-white p-8 shadow">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Assessment Result
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Your assessment has been completed successfully.
                        </p>

                    </div>

                )}


                {/* =====================================================
                    RECOMMENDATION
                ===================================================== */}
                <div className="rounded-3xl bg-white p-8 shadow">

                    <div className="mb-8">

                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                            Learning Center
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-gray-800">
                            Recommended Learning
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Explore these learning materials to better
                            understand and develop yourself based on your
                            assessment results.
                        </p>

                    </div>


                    {recommendations.length === 0 ? (

                        <div className="rounded-2xl bg-slate-50 p-6 text-center">

                            <p className="text-gray-500">
                                No recommendation available yet.
                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-5 md:grid-cols-2">

                            {recommendations.map((item) => (

                                <Link
                                    key={item.id}
                                    href={route("learning.show", item.slug)}
                                    className="group flex flex-col rounded-2xl border border-gray-100 bg-slate-50/50 p-5 transition hover:border-emerald-200 hover:shadow-sm"
                                >

                                    <span className="mb-3 inline-flex self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        {getCategoryLabel(item)}
                                    </span>

                                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
                                        {item.type}
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold text-gray-800 transition group-hover:text-emerald-700">
                                        {item.title}
                                    </h3>

                                    {item.excerpt && (
                                        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">
                                            {item.excerpt}
                                        </p>
                                    )}

                                    <div className="mt-4 flex items-center justify-between gap-3">

                                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">

                                            {item.difficulty && (
                                                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">
                                                    {item.difficulty}
                                                </span>
                                            )}

                                            {item.estimated_time && (
                                                <span className="inline-flex items-center gap-1">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {item.estimated_time} menit
                                                </span>
                                            )}

                                        </div>

                                        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-600 opacity-0 transition group-hover:opacity-100">
                                            Baca
                                            &rarr;
                                        </span>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </div>


                {/* =====================================================
                    BACK BUTTONS
                ===================================================== */}
                <div className="flex flex-wrap justify-center gap-3 pb-8">

                    <StoryShare />

                    <Link
                        href={route("assessments.history")}
                        className="rounded-xl bg-white px-8 py-4 font-semibold text-gray-700 shadow transition hover:bg-gray-50"
                    >
                        Lihat Riwayat
                    </Link>

                    <Link
                        href="/dashboard"
                        className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30 active:scale-[0.98]"
                    >
                        Kembali ke Beranda
                    </Link>

                </div>

            </div>
        </AssessmentLayout>
    );
}