import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useRef, useState } from "react";
import {
    MagnifyingGlassIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";

function getTypeEmoji(type) {
    switch (type) {
        case "article":
            return "📖";
        case "video":
            return "🎥";
        case "audio":
            return "🎧";
        case "worksheet":
            return "📝";
        case "challenge":
            return "🎯";
        default:
            return "📚";
    }
}

function getCategoryLabel(content) {
    return content.category?.label ?? "Global";
}

export default function Index({ contents, filters }) {
    const [query, setQuery] = useState(filters.search ?? "");

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            router.get(
                route("learning.index"),
                { search: query || undefined },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 350);

        return () => clearTimeout(timer);
    }, [query]);

    const searchInput = (
        <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </span>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari judul, topik, atau tag…"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Learning Center
                </h2>
            }
        >
            <Head title="Learning Center" />

            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto flex max-w-7xl items-stretch gap-8 px-4 py-8 sm:px-6 lg:px-8">

                    {/* Sidebar Kiri (Sticky) */}
                    <aside className="hidden w-80 shrink-0 self-stretch lg:block">
                        <div className="sticky top-24 flex flex-col gap-6">
                            <div>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                                    Learning Center
                                </p>

                                <h1 className="text-3xl font-bold text-gray-900">
                                    Belajar untuk berkembang
                                </h1>

                                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                    Temukan berbagai materi yang dapat membantu
                                    kamu memahami diri sendiri dan mengembangkan
                                    diri.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white p-5 shadow-sm">
                                <label className="mb-3 block text-sm font-semibold text-gray-700">
                                    Cari Materi
                                </label>

                                {searchInput}

                                <p className="mt-3 text-xs text-gray-400">
                                    Cari berdasarkan judul, isi materi, atau tag.
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Konten Kanan (Scroll) */}
                    <div className="min-w-0 flex-1">
                        {/* Search mobile */}
                        <div className="mb-6 lg:hidden">
                            {searchInput}
                        </div>

                        {/* Info hasil */}
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {filters.search
                                    ? `Hasil untuk "${filters.search}"`
                                    : "Semua Materi"}
                            </h2>

                            {filters.search && (
                                <button
                                    onClick={() => setQuery("")}
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {contents.data.length === 0 ? (
                            <div className="flex flex-col items-center rounded-2xl bg-white p-12 text-center shadow-sm">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                                    <BookOpenIcon className="h-8 w-8 text-emerald-500" />
                                </div>

                                <h2 className="mt-5 text-xl font-semibold text-gray-800">
                                    {filters.search
                                        ? "Tidak ada hasil ditemukan"
                                        : "Belum ada content"}
                                </h2>

                                <p className="mt-2 max-w-sm text-gray-500">
                                    {filters.search
                                        ? `Tidak ada materi yang cocok dengan "${filters.search}". Coba kata kunci lain.`
                                        : "Learning content belum tersedia."}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {contents.data.map((content) => (
                                        <div
                                            key={content.id}
                                            className="group relative flex h-48 overflow-hidden rounded-3xl bg-emerald-600 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                            {/* Thumbnail */}
                                            {content.thumbnail ? (
                                                <img
                                                    src={`/storage/${content.thumbnail}`}
                                                    alt={content.title}
                                                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center transition duration-500 group-hover:scale-110">
                                                    <span className="text-5xl drop-shadow-sm">
                                                        {getTypeEmoji(
                                                            content.type
                                                        )}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

                                            {/* Content */}
                                            <div className="relative z-10 flex w-full flex-col justify-between p-6">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                                            {getCategoryLabel(
                                                                content
                                                            )}
                                                        </span>

                                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-100">
                                                            {content.type}
                                                        </span>
                                                    </div>

                                                    <h3 className="mt-2 line-clamp-2 text-xl font-bold text-white">
                                                        {content.title}
                                                    </h3>

                                                    {content.excerpt && (
                                                        <p className="mt-1 line-clamp-1 text-sm text-white/75">
                                                            {content.excerpt}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="mt-3 flex items-center justify-between gap-2">
                                                    <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-[11px] text-white/70">
                                                        {content.difficulty && (
                                                            <span className="rounded-full bg-white/15 px-2 py-0.5 capitalize">
                                                                {
                                                                    content.difficulty
                                                                }
                                                            </span>
                                                        )}

                                                        {content.estimated_time && (
                                                            <span>
                                                                {
                                                                    content.estimated_time
                                                                }{" "}
                                                                menit
                                                            </span>
                                                        )}
                                                    </div>

                                                    <Link
                                                        href={route(
                                                            "learning.show",
                                                            content.slug
                                                        )}
                                                        className="shrink-0 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
                                                    >
                                                        Explore
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {contents.links && (
                                    <div className="mt-10 flex justify-center gap-2">
                                        {contents.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || "#"}
                                                preserveScroll
                                                preserveState
                                                className={`rounded-lg px-4 py-2 text-sm ${
                                                    link.active
                                                        ? "bg-emerald-600 text-white"
                                                        : "bg-white text-gray-600 shadow-sm hover:bg-gray-100"
                                                } ${
                                                    !link.url
                                                        ? "pointer-events-none opacity-40"
                                                        : ""
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}