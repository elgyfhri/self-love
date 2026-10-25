import { Link } from "@inertiajs/react";

export default function AssessmentCard({ assessment }) {
    // Menangani path gambar baik dari storage maupun public
    const getThumbnailUrl = (path) => {
        if (!path) return null;
        // Jika sudah berupa URL penuh atau diawali slash, pakai langsung
        if (path.startsWith("http") || path.startsWith("/")) {
            return path;
        }
        // Jika hasil upload Laravel Storage
        return `/storage/${path}`;
    };

    const thumbnailUrl = getThumbnailUrl(assessment.thumbnail);

    const firstCategory =
        assessment.categories && assessment.categories.length > 0
            ? assessment.categories[0]
            : null;

    return (
        <Link
            href={route("assessments.introduction", assessment.code)}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl"
        >
            <div className="flex flex-1 flex-col p-5">
                <span className="mb-3 w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    {assessment.code}
                </span>
                {firstCategory && (
                    <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        {firstCategory.name}
                    </span>
                )}
                <h2 className="line-clamp-2 text-xl font-bold text-gray-900 transition group-hover:text-emerald-600">
                    {assessment.name}
                </h2>
                {assessment.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
                        {assessment.description}
                    </p>
                )}
                <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs text-gray-400">
                    <span>{assessment.estimated_time} menit</span>
                    {assessment.categories.length > 0 && <span>{assessment.categories.length} aspek</span>}
                    <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
                        Mulai
                    </span>
                </div>
            </div>
        </Link>
    );
}