
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({
    content,
    relatedContents = [],
}) {
    /*
    |--------------------------------------------------------------------------
    | Type Icon
    |--------------------------------------------------------------------------
    */

    const getTypeIcon = (type) => {
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
    };

    /*
    |--------------------------------------------------------------------------
    | Type Label
    |--------------------------------------------------------------------------
    */

    const getTypeLabel = (type) => {
        switch (type) {
            case "article":
                return "Article";

            case "video":
                return "Video";

            case "audio":
                return "Audio";

            case "worksheet":
                return "Worksheet";

            case "challenge":
                return "Challenge";

            default:
                return "Learning";
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Category Label
    |--------------------------------------------------------------------------
    |
    | Content tanpa category_id bersifat global, jadi labelnya
    | diturunkan di sini, bukan disimpan di database.
    |
    */

    const getCategoryLabel = (item) => {
        return item?.category?.label ?? "Global";
    };

    /*
    |--------------------------------------------------------------------------
    | Render Editor.js Blocks
    |--------------------------------------------------------------------------
    */

    const renderEditorBlocks = (contentData) => {
        if (!contentData) {
            return null;
        }

        let editorData;

        /*
        |--------------------------------------------------------------------------
        | Parse JSON
        |--------------------------------------------------------------------------
        */

        try {
            editorData =
                typeof contentData === "string"
                    ? JSON.parse(contentData)
                    : contentData;
        } catch (error) {
            /*
            |--------------------------------------------------------------------------
            | Content lama kemungkinan masih HTML
            |--------------------------------------------------------------------------
            */

            return (
                <div
                    className="
                        max-w-none
                        text-base
                        leading-8
                        text-gray-700

                        [&_h1]:mb-5
                        [&_h1]:mt-8
                        [&_h1]:text-3xl
                        [&_h1]:font-bold
                        [&_h1]:text-gray-900

                        [&_h2]:mb-4
                        [&_h2]:mt-8
                        [&_h2]:text-2xl
                        [&_h2]:font-bold
                        [&_h2]:text-gray-900

                        [&_h3]:mb-3
                        [&_h3]:mt-6
                        [&_h3]:text-xl
                        [&_h3]:font-semibold
                        [&_h3]:text-gray-900

                        [&_p]:mb-5

                        [&_ul]:mb-5
                        [&_ul]:list-disc
                        [&_ul]:pl-6

                        [&_ol]:mb-5
                        [&_ol]:list-decimal
                        [&_ol]:pl-6

                        [&_li]:mb-2

                        [&_strong]:font-semibold
                        [&_strong]:text-gray-900

                        [&_blockquote]:my-6
                        [&_blockquote]:border-l-4
                        [&_blockquote]:border-emerald-500
                        [&_blockquote]:bg-emerald-50
                        [&_blockquote]:px-5
                        [&_blockquote]:py-4
                        [&_blockquote]:italic
                    "
                    dangerouslySetInnerHTML={{
                        __html: contentData,
                    }}
                />
            );
        }

        if (!editorData?.blocks) {
            return null;
        }

        /*
        |--------------------------------------------------------------------------
        | Block Renderer
        |--------------------------------------------------------------------------
        */

        return (
            <div className="space-y-5">
                {editorData.blocks.map((block, index) => {
                    switch (block.type) {
                        /*
                        |--------------------------------------------------------------------------
                        | Paragraph
                        |--------------------------------------------------------------------------
                        */

                        case "paragraph":
                            return (
                                <p
                                    key={block.id || index}
                                    className="text-base leading-8 text-gray-700"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            block.data?.text || "",
                                    }}
                                />
                            );

                        /*
                        |--------------------------------------------------------------------------
                        | Header
                        |--------------------------------------------------------------------------
                        */

                        case "header": {
                            const level =
                                block.data?.level || 2;

                            const text =
                                block.data?.text || "";

                            if (level === 2) {
                                return (
                                    <h2
                                        key={
                                            block.id ||
                                            index
                                        }
                                        className="pt-6 text-2xl font-bold leading-tight text-gray-900"
                                        dangerouslySetInnerHTML={{
                                            __html: text,
                                        }}
                                    />
                                );
                            }

                            if (level === 3) {
                                return (
                                    <h3
                                        key={
                                            block.id ||
                                            index
                                        }
                                        className="pt-5 text-xl font-semibold leading-tight text-gray-900"
                                        dangerouslySetInnerHTML={{
                                            __html: text,
                                        }}
                                    />
                                );
                            }

                            return (
                                <h4
                                    key={
                                        block.id ||
                                        index
                                    }
                                    className="pt-4 text-lg font-semibold text-gray-900"
                                    dangerouslySetInnerHTML={{
                                        __html: text,
                                    }}
                                />
                            );
                        }

                        /*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

case "list": {
    const items = block.data?.items || [];
    const style = block.data?.style;

    /*
    |--------------------------------------------------------------------------
    | CHECKLIST
    |--------------------------------------------------------------------------
    */

    if (style === "checklist") {
        return (
            <div
                key={block.id || index}
                className="my-6 space-y-3"
            >
                {items.map((item, itemIndex) => {
                    const checked = Boolean(item?.meta?.checked);

                    return (
                        <div
                            key={itemIndex}
                            className="flex items-start gap-3"
                        >
                            {/* Checkbox */}

                            <div
                                className={`
                                    mt-1
                                    flex
                                    h-5
                                    w-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    ${
                                        checked
                                            ? "border-emerald-600 bg-emerald-600"
                                            : "border-gray-400 bg-white"
                                    }
                                `}
                            >
                                {checked && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4 text-white"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.415.005l-3.75-3.5a1 1 0 111.362-1.47l3.043 2.823 6.543-6.543a1 1 0 011.417.014z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>

                            {/* Text */}

                            <div
                                className={`
                                    flex-1
                                    text-base
                                    leading-7
                                    ${
                                        checked
                                            ? "text-gray-700"
                                            : "text-gray-700"
                                    }
                                `}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        item?.content ||
                                        item?.text ||
                                        "",
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | ORDERED / UNORDERED LIST
    |--------------------------------------------------------------------------
    */

    const ListTag =
        style === "ordered"
            ? "ol"
            : "ul";

    return (
        <ListTag
            key={block.id || index}
            className={
                style === "ordered"
                    ? "ml-6 list-decimal space-y-2 text-gray-700"
                    : "ml-6 list-disc space-y-2 text-gray-700"
            }
        >
            {items.map((item, itemIndex) => (
                <li
                    key={itemIndex}
                    dangerouslySetInnerHTML={{
                        __html:
                            typeof item === "string"
                                ? item
                                : item?.content || "",
                    }}
                />
            ))}
        </ListTag>
    );
}
                        

                        /*
                        |--------------------------------------------------------------------------
                        | Quote
                        |--------------------------------------------------------------------------
                        */

                        case "quote":
                            return (
                                <blockquote
                                    key={
                                        block.id ||
                                        index
                                    }
                                    className="my-6 rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50 px-6 py-5"
                                >
                                    <p
                                        className="text-lg italic leading-8 text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                block.data
                                                    ?.text ||
                                                "",
                                        }}
                                    />

                                    {block.data
                                        ?.caption && (
                                        <footer className="mt-3 text-sm font-medium text-gray-500">
                                            —{" "}
                                            {
                                                block
                                                    .data
                                                    .caption
                                            }
                                        </footer>
                                    )}
                                </blockquote>
                            );

                        /*
                        |--------------------------------------------------------------------------
                        | Delimiter
                        |--------------------------------------------------------------------------
                        */

                        case "delimiter":
                            return (
                                <div
                                    key={
                                        block.id ||
                                        index
                                    }
                                    className="flex items-center justify-center py-6"
                                >
                                    <div className="flex gap-2">
                                        <span className="h-1 w-1 rounded-full bg-gray-400" />
                                        <span className="h-1 w-1 rounded-full bg-gray-400" />
                                        <span className="h-1 w-1 rounded-full bg-gray-400" />
                                    </div>
                                </div>
                            );

                        /*
                        |--------------------------------------------------------------------------
                        | Image
                        |--------------------------------------------------------------------------
                        */

                        case "image":
                            return (
                                <figure
                                    key={
                                        block.id ||
                                        index
                                    }
                                    className="my-8"
                                >
                                    {block.data?.file
                                        ?.url && (
                                        <img
                                            src={
                                                block
                                                    .data
                                                    .file
                                                    .url
                                            }
                                            alt={
                                                block
                                                    .data
                                                    ?.caption ||
                                                content.title
                                            }
                                            className="mx-auto max-h-[600px] w-auto max-w-full rounded-2xl object-contain shadow-sm"
                                        />
                                    )}

                                    {block.data
                                        ?.caption && (
                                        <figcaption className="mt-3 text-center text-sm text-gray-500">
                                            {
                                                block
                                                    .data
                                                    .caption
                                            }
                                        </figcaption>
                                    )}
                                </figure>
                            );

                        /*
                        |--------------------------------------------------------------------------
                        | Unknown Block
                        |--------------------------------------------------------------------------
                        */

                        default:
                            return null;
                    }
                })}
            </div>
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Source / Citation
    |--------------------------------------------------------------------------
    */

    const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

    const renderSourceLine = (line, lineIndex) => {
        const parts = line.split(URL_PATTERN);

        return (
            <li
                key={lineIndex}
                className="leading-relaxed"
            >
                {parts.map((part, partIndex) => {
                    if (/^https?:\/\//.test(part)) {
                        return (
                            <a
                                key={partIndex}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 transition hover:text-emerald-900"
                            >
                                {part}
                            </a>
                        );
                    }

                    return part;
                })}
            </li>
        );
    };

    const sourceLines = (content.source || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    return (
        <AuthenticatedLayout>
            <Head title={content.title} />

            <div className="min-h-screen bg-gray-50">

                {/* ================================================== */}
                {/* HERO */}
                {/* ================================================== */}

                <section className="border-b bg-white">
                    <div className="mx-auto max-w-5xl px-6 py-10">

                        {/* Breadcrumb */}

                        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                            <Link
                                href={route(
                                    "learning.index"
                                )}
                                className="transition hover:text-emerald-600"
                            >
                                Learning Center
                            </Link>

                            <span>/</span>

                            <span className="truncate text-gray-700">
                                {content.title}
                            </span>
                        </div>

                        {/* Type */}

                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                                {getTypeIcon(
                                    content.type
                                )}
                            </span>

                            <div>
                                <p className="text-sm font-medium text-emerald-600">
                                    {getTypeLabel(
                                        content.type
                                    )}
                                </p>

                                <p className="text-sm text-gray-400">
                                    Learning Content
                                </p>
                            </div>
                        </div>

                        {/* Title */}

                        <p className="mb-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {getCategoryLabel(content)}
                        </p>

                        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                            {content.title}
                        </h1>

                        {/* Excerpt */}

                        {content.excerpt && (
                            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-600">
                                {content.excerpt}
                            </p>
                        )}

                        {/* Meta */}

                        <div className="mt-7 flex flex-wrap items-center gap-3">

                            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium capitalize text-emerald-700">
                                {getTypeLabel(
                                    content.type
                                )}
                            </span>

                            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium capitalize text-gray-600">
                                {content.difficulty}
                            </span>

                            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                                ⏱{" "}
                                {
                                    content.estimated_time
                                }{" "}
                                menit
                            </span>

                            {content.category && (
                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                                    {getCategoryLabel(content)}
                                </span>
                            )}

                        </div>
                    </div>
                </section>

                {/* ================================================== */}
                {/* MAIN */}
                {/* ================================================== */}

                <main className="mx-auto max-w-5xl px-6 py-10">

                    {/* ================================================== */}
{/* MEDIA */}
{/* ================================================== */}

{content.media_url && (
    <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm">

        {/* VIDEO */}
        {content.type === "video" && (
            <div className="aspect-video bg-black">
                <iframe
                    src={content.media_url}
                    title={content.title}
                    className="h-full w-full"
                    allowFullScreen
                />
            </div>
        )}

        {/* AUDIO */}
        {content.type === "audio" && (
            <div className="p-8">
                <div className="mb-5 text-center text-5xl">
                    🎧
                </div>

                <h3 className="mb-5 text-center text-lg font-semibold text-gray-900">
                    {content.title}
                </h3>

                <audio
                    controls
                    className="w-full"
                >
                    <source
                        src={content.media_url}
                        type="audio/mpeg"
                    />

                    Browser kamu tidak mendukung audio player.
                </audio>
            </div>
        )}

        {/* PDF */}
        {content.type === "article" &&
            content.media_url && (
                <div>

                    <div className="border-b bg-gray-50 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">
                                📄
                            </span>

                            <div>
                                <p className="font-semibold text-gray-900">
                                    {content.title}
                                </p>

                                <p className="text-sm text-gray-500">
                                    PDF Learning Material
                                </p>
                            </div>
                            <a
                                href={content.media_url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Buka PDF
                            </a>
                        </div>
                    </div>

                    <iframe
                        src={`${content.media_url}#toolbar=1&view=FitH`}
                        title={content.title}
                        className="h-[800px] w-full"
                    />

                </div>
            )}

    </div>
)}
                    {/* ================================================== */}
{/* CONTENT */}
{/* ================================================== */}

{content.type === "article" && !content.media_url && (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <div className="border-b px-6 py-6 md:px-10">
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm font-medium text-gray-400">
                        Learning Material
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-gray-900">
                        {content.title}
                    </h2>
                </div>

                <span className="hidden text-3xl sm:block">
                    📖
                </span>

            </div>
        </div>

        <div className="px-6 py-8 md:px-10 md:py-10">

            {content.content ? (
                renderEditorBlocks(content.content)
            ) : (
                <div className="py-12 text-center">

                    <div className="text-5xl">
                        📚
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-800">
                        Content belum tersedia
                    </h3>

                    <p className="mt-2 text-gray-500">
                        Materi untuk content ini belum ditambahkan.
                    </p>

                </div>
            )}

        </div>

    </article>
)}

                    {/* ================================================== */}
                    {/* SOURCE */}
                    {/* ================================================== */}

                    {sourceLines.length > 0 && (
                        <section className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 md:p-8">

                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-lg">
                                    📚
                                </span>

                                <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
                                    Sumber Referensi
                                </h2>
                            </div>

                            <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                Materi ini disusun dari
                                sumber berikut, sehingga
                                dapat diverifikasi pembaca
                                secara independen.
                            </p>

                            <ul className="space-y-2 text-sm text-gray-700">
                                {sourceLines.map(
                                    (line, index) =>
                                        renderSourceLine(
                                            line,
                                            index
                                        )
                                )}
                            </ul>

                        </section>
                    )}

                    {/* ================================================== */}
                    {/* RELATED */}
                    {/* ================================================== */}

                    {relatedContents.length >
                        0 && (
                        <section className="mt-12">

                            <div className="mb-6 flex items-end justify-between">

                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                                        Continue Learning
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                        Materi lainnya
                                    </h2>
                                </div>

                                <Link
                                    href={route(
                                        "learning.index"
                                    )}
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                                >
                                    Lihat semua →
                                </Link>

                            </div>

                            <div className="grid gap-6 md:grid-cols-3">

                                {relatedContents.map(
                                    (item) => (
                                        <Link
                                            key={
                                                item.id
                                            }
                                            href={route(
                                                "learning.show",
                                                item.slug
                                            )}
                                            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                        >

                                            <div className="flex h-32 items-center justify-center bg-emerald-50 text-4xl">
                                                {getTypeIcon(
                                                    item.type
                                                )}
                                            </div>

                                                <div className="p-5">

                                                    <span className="mb-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                                        {getCategoryLabel(
                                                            item
                                                        )}
                                                    </span>

                                                    <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition group-hover:text-emerald-600">
                                                        {
                                                            item.title
                                                        }
                                                    </h3>

                                                    <div className="mt-3 flex flex-wrap gap-2">

                                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium capitalize text-emerald-700">
                                                            {getTypeLabel(
                                                                item.type
                                                            )}
                                                        </span>

                                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs capitalize text-gray-600">
                                                            {
                                                                item.difficulty
                                                            }
                                                        </span>

                                                    </div>

                                                {item.excerpt && (
                                                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                                                        {
                                                            item.excerpt
                                                        }
                                                    </p>
                                                )}

                                                <div className="mt-4 text-sm text-gray-400">
                                                    ⏱{" "}
                                                    {
                                                        item.estimated_time
                                                    }{" "}
                                                    menit
                                                </div>

                                            </div>
                                        </Link>
                                    )
                                )}

                            </div>
                        </section>
                    )}

                    {/* Back */}

                    <div className="mt-10">

                        <Link
                            href={route(
                                "learning.index"
                            )}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-600"
                        >
                            ← Kembali ke Learning Center
                        </Link>

                    </div>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}