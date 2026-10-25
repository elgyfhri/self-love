import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useMemo, useState, useEffect, useRef } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import Delimiter from "@editorjs/delimiter";

export default function Edit({
    content,
    assessmentTypes,
    categories,
    tags: initialTags,
}) {
    // =========================================================
    // INITIAL SCOPE
    // =========================================================

    const initialScope = content.category_id
        ? "category"
        : content.assessment_type_id
        ? "assessment"
        : "global";

    // =========================================================
    // EDITOR JS
    // =========================================================

    const editorRef = useRef(null);
    const editorInstance = useRef(null);

    const [articleMode, setArticleMode] = useState(
        content.type === "article" && content.media_url
            ? "pdf"
            : "write"
    );

    // =========================================================
    // TAG
    // =========================================================

    const [tags, setTags] = useState(initialTags ?? []);

    const [showAddTag, setShowAddTag] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [addingTag, setAddingTag] = useState(false);
    const [tagError, setTagError] = useState("");

    // =========================================================
    // FORM
    // =========================================================

    const {
    data,
    setData,
    post,
    processing,
    transform,
    errors,
    progress,
} = useForm({
    scope: initialScope,

    assessment_type_id:
        content.assessment_type_id ?? "",

    category_id:
        content.category_id ?? "",

    title:
        content.title ?? "",

    excerpt:
        content.excerpt ?? "",

    source:
        content.source ?? "",

    type:
        content.type ?? "article",

    content:
        content.content ?? "",

    media_url:
        content.media_url ?? "",

    pdf: null,

    thumbnail: null,

    estimated_time:
        content.estimated_time ?? 5,

    difficulty:
        content.difficulty ?? "beginner",

    status:
        content.status ?? "draft",

    is_featured:
        Boolean(content.is_featured),

    tags:
        content.tags
            ? content.tags.map((tag) => tag.id)
            : [],
});

    // =========================================================
    // FILTER CATEGORY
    // =========================================================

    const filteredCategories = useMemo(() => {
        if (!data.assessment_type_id) {
            return [];
        }

        return categories.filter((category) =>
            category.assessment_types?.some(
                (assessment) =>
                    assessment.id == data.assessment_type_id
            )
        );
    }, [
        categories,
        data.assessment_type_id,
    ]);

    // =========================================================
    // PARSE EDITOR CONTENT
    // =========================================================

    const getEditorData = () => {
    if (!content.content) {
        return undefined;
    }

    // Jika sudah object
    if (typeof content.content === "object") {
        if (
            Array.isArray(content.content.blocks)
        ) {
            return content.content;
        }

        return undefined;
    }

    // Jika string
    if (typeof content.content !== "string") {
        return undefined;
    }

    const value = content.content.trim();

    if (!value) {
        return undefined;
    }

    // ============================================
    // COBA PARSE SEBAGAI JSON EDITORJS
    // ============================================

    try {
        const parsed = JSON.parse(value);

        if (
            parsed &&
            Array.isArray(parsed.blocks)
        ) {
            return parsed;
        }
    } catch (error) {
        // Bukan JSON EditorJS
        // Kita anggap sebagai plain text
    }

    // ============================================
    // FALLBACK PLAIN TEXT
    // ============================================

    return {
        blocks: [
            {
                type: "paragraph",
                data: {
                    text: value,
                },
            },
        ],
    };
};

    // =========================================================
    // INITIALIZE EDITOR JS
    // =========================================================

    useEffect(() => {
        if (
            data.type !== "article" ||
            articleMode !== "write" ||
            !editorRef.current
        ) {
            return;
        }

        let destroyed = false;

        const editor = new EditorJS({
            holder: editorRef.current,

            placeholder:
                "Mulai tulis materi pembelajaran...",

            data: getEditorData(),

            tools: {
                header: {
                    class: Header,

                    config: {
                        levels: [2, 3, 4],
                        defaultLevel: 2,
                    },
                },

                list: {
                    class: List,
                    inlineToolbar: true,
                },

                quote: {
                    class: Quote,
                    inlineToolbar: true,
                },

                delimiter: Delimiter,

                image: {
                    class: ImageTool,

                    config: {
                        uploader: {
                            async uploadByFile(file) {
                                const formData =
                                    new FormData();

                                formData.append(
                                    "image",
                                    file
                                );

                                const csrfToken =
                                    document
                                        .querySelector(
                                            'meta[name="csrf-token"]'
                                        )
                                        ?.getAttribute(
                                            "content"
                                        );

                                const response =
                                    await fetch(
                                        "/admin/contents/upload-image",
                                        {
                                            method: "POST",

                                            headers: {
                                                "X-CSRF-TOKEN":
                                                    csrfToken,

                                                Accept:
                                                    "application/json",
                                            },

                                            credentials:
                                                "same-origin",

                                            body: formData,
                                        }
                                    );

                                if (!response.ok) {
                                    const errorText =
                                        await response.text();

                                    console.error(
                                        "UPLOAD IMAGE ERROR:",
                                        errorText
                                    );

                                    throw new Error(
                                        `Upload gagal (${response.status})`
                                    );
                                }

                                return await response.json();
                            },
                        },
                    },
                },
            },

            onReady: () => {
                if (destroyed) {
                    editor.destroy();
                    return;
                }

                editorInstance.current = editor;
            },
        });

        return () => {
            destroyed = true;

            if (editorInstance.current) {
                editorInstance.current.destroy();

                editorInstance.current = null;
            }
        };
    }, [
        data.type,
        articleMode,
    ]);

    // =========================================================
    // ADD TAG
    // =========================================================

    const addTag = async () => {
        if (!newTagName.trim()) {
            setTagError(
                "Nama tag wajib diisi."
            );

            return;
        }

        setAddingTag(true);
        setTagError("");

        try {
            const csrfToken =
                document
                    .querySelector(
                        'meta[name="csrf-token"]'
                    )
                    ?.getAttribute(
                        "content"
                    );

            const response =
                await fetch(
                    route(
                        "admin.contents.tags.store"
                    ),
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Accept:
                                "application/json",

                            "X-CSRF-TOKEN":
                                csrfToken,
                        },

                        credentials:
                            "same-origin",

                        body: JSON.stringify({
                            name:
                                newTagName.trim(),
                        }),
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {
                setTagError(
                    result.message ||
                        "Gagal membuat tag."
                );

                return;
            }

            const newTag =
                result.tag;

            setTags((current) => [
                ...current,
                newTag,
            ]);

            setData("tags", [
                ...data.tags,
                newTag.id,
            ]);

            setNewTagName("");
            setShowAddTag(false);
        } catch (error) {
            console.error(error);

            setTagError(
                "Terjadi kesalahan saat membuat tag."
            );
        } finally {
            setAddingTag(false);
        }
    };

    // =========================================================
    // CHANGE TYPE
    // =========================================================

    const changeType = (type) => {
        setData((current) => ({
            ...current,

            type,

            content:
                type === "article"
                    ? current.content
                    : "",

            media_url:
                type === "article"
                    ? current.media_url
                    : "",

            pdf: null,
        }));

        if (type !== "article") {
            setArticleMode("write");
        }
    };

    // =========================================================
    // SUBMIT
    // =========================================================

const submit = async (e) => {
    e.preventDefault();

    // =====================================================
    // PDF
    // =====================================================

    if (
        data.type === "article" &&
        articleMode === "pdf"
    ) {
        post(
            route(
                "admin.contents.update-pdf",
                content.id
            ),
            {
                forceFormData: true,

                onError: (errors) => {
                    console.log(
                        "UPDATE PDF ERROR:",
                        errors
                    );
                },

                onSuccess: () => {
                    console.log(
                        "UPDATE PDF SUCCESS"
                    );
                },
            }
        );

        return;
    }

    // =====================================================
    // EDITORJS
    // =====================================================

    let contentValue = data.content;

    if (
        data.type === "article" &&
        articleMode === "write" &&
        editorInstance.current
    ) {
        const outputData =
            await editorInstance.current.save();

        contentValue =
            JSON.stringify(outputData);
    }

    // =====================================================
    // NORMAL UPDATE
    // =====================================================

    transform((current) => ({
        ...current,

        _method: "PUT",

        content:
            contentValue,

        assessment_type_id:
            current.assessment_type_id || null,

        category_id:
            current.category_id || null,

        excerpt:
            current.excerpt || null,

        source:
            current.source || null,

        media_url:
            data.type === "article"
                ? null
                : current.media_url || null,

        estimated_time:
            current.estimated_time,

        difficulty:
            current.difficulty,

        status:
            current.status,

        is_featured:
            current.is_featured,

        tags:
            current.tags,
    }));

    post(
        route(
            "admin.contents.update",
            content.id
        ),
        {
            forceFormData: true,

            onError: (errors) => {
                console.log(
                    "UPDATE ERROR:",
                    errors
                );
            },

            onSuccess: () => {
                console.log(
                    "UPDATE SUCCESS"
                );
            },
        }
    );
};
    // =========================================================
    // RENDER
    // =========================================================

    return (
        <AdminLayout>
            <Head title="Edit Content" />

            <div className="mx-auto max-w-4xl p-6">

                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    Edit Learning Content
                </h1>

                <form
                    onSubmit={submit}
                    className="space-y-6"
                >

                    {/* ================================================= */}
                    {/* SCOPE */}
                    {/* ================================================= */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Content Scope
                        </label>

                        <select
                            value={data.scope}
                            onChange={(e) => {
                                const scope =
                                    e.target.value;

                                setData(
                                    (current) => ({
                                        ...current,

                                        scope,

                                        assessment_type_id:
                                            "",

                                        category_id:
                                            "",
                                    })
                                );
                            }}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        >
                            <option value="global">
                                Global
                            </option>

                            <option value="assessment">
                                Assessment
                            </option>

                            <option value="category">
                                Category
                            </option>
                        </select>
                    </div>

                    {/* ================================================= */}
                    {/* ASSESSMENT */}
                    {/* ================================================= */}

                    {data.scope !==
                        "global" && (
                        <div>
                            <label className="mb-2 block font-medium">
                                Assessment
                            </label>

                            <select
                                value={
                                    data.assessment_type_id
                                }
                                onChange={(e) =>
                                    setData(
                                        "assessment_type_id",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            >
                                <option value="">
                                    Select Assessment
                                </option>

                                {assessmentTypes.map(
                                    (assessment) => (
                                        <option
                                            key={
                                                assessment.id
                                            }
                                            value={
                                                assessment.id
                                            }
                                        >
                                            {
                                                assessment.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.assessment_type_id && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.assessment_type_id
                                    }
                                </p>
                            )}
                        </div>
                    )}

                    {/* ================================================= */}
                    {/* CATEGORY */}
                    {/* ================================================= */}

                    {data.scope ===
                        "category" && (
                        <div>
                            <label className="mb-2 block font-medium">
                                Category
                            </label>

                            <select
                                value={
                                    data.category_id
                                }
                                onChange={(e) =>
                                    setData(
                                        "category_id",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            >
                                <option value="">
                                    Select Category
                                </option>

                                {filteredCategories.map(
                                    (category) => (
                                        <option
                                            key={
                                                category.id
                                            }
                                            value={
                                                category.id
                                            }
                                        >
                                            {
                                                category.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.category_id
                                    }
                                </p>
                            )}
                        </div>
                    )}

                    {/* ================================================= */}
                    {/* TITLE */}
                    {/* ================================================= */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) =>
                                setData(
                                    "title",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            placeholder="Content title"
                        />

                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* EXCERPT */}
                    {/* ================================================= */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Excerpt
                        </label>

                        <textarea
                            rows="3"
                            value={data.excerpt}
                            onChange={(e) =>
                                setData(
                                    "excerpt",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            placeholder="Short description..."
                        />

                        {errors.excerpt && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.excerpt}
                            </p>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* SOURCE */}
                    {/* ================================================= */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Sumber / Referensi
                        </label>

                        <p className="mb-3 text-sm text-gray-500">
                            Tulis sitasi sumber materi ini agar
                            pembaca bisa memverifikasinya. Satu
                            baris per sumber.
                        </p>

                        <textarea
                            rows="4"
                            value={data.source}
                            onChange={(e) =>
                                setData(
                                    "source",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm"
                            placeholder="Neff, K. D. (2003). Self and Identity, 2(3), 223-250."
                        />

                        {errors.source && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.source}
                            </p>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* THUMBNAIL */}
                    {/* ================================================= */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Thumbnail
                        </label>

                        <p className="mb-3 text-sm text-gray-500">
                            Gambar yang digunakan sebagai cover materi.
                        </p>

                        {content.thumbnail && (
                            <div className="mb-4">
                                <p className="mb-2 text-sm font-medium text-gray-600">
                                    Thumbnail saat ini
                                </p>

                                <img
                                    src={`/storage/${content.thumbnail}`}
                                    alt="Current Thumbnail"
                                    className="h-40 w-64 rounded-xl object-cover shadow"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) =>
                                setData(
                                    "thumbnail",
                                    e.target.files?.[0] ||
                                        null
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                        />

                        {data.thumbnail && (
                            <div className="mt-4">
                                <p className="mb-2 text-sm font-medium text-emerald-600">
                                    📷{" "}
                                    {
                                        data.thumbnail.name
                                    }
                                </p>

                                <img
                                    src={URL.createObjectURL(
                                        data.thumbnail
                                    )}
                                    alt="New Thumbnail Preview"
                                    className="h-40 w-64 rounded-xl object-cover shadow"
                                />
                            </div>
                        )}

                        {errors.thumbnail && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.thumbnail}
                            </p>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* TAGS */}
                    {/* ================================================= */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Content Tags
                        </label>

                        <p className="mb-3 text-sm text-gray-500">
                            Pilih tag yang sesuai dengan content.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => {
                                const selected =
                                    data.tags.includes(
                                        tag.id
                                    );

                                return (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => {
                                            if (
                                                selected
                                            ) {
                                                setData(
                                                    "tags",
                                                    data.tags.filter(
                                                        (id) =>
                                                            id !==
                                                            tag.id
                                                    )
                                                );
                                            } else {
                                                setData(
                                                    "tags",
                                                    [
                                                        ...data.tags,
                                                        tag.id,
                                                    ]
                                                );
                                            }
                                        }}
                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                            selected
                                                ? "border-emerald-500 bg-emerald-100 text-emerald-700"
                                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        {tag.name}
                                    </button>
                                );
                            })}

                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddTag(true);
                                    setTagError("");
                                }}
                                className="rounded-full border border-dashed border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
                            >
                                + Add Tag
                            </button>
                        </div>

                        {errors.tags && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.tags}
                            </p>
                        )}

                        {showAddTag && (
                            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">

                                <label className="mb-2 block text-sm font-medium">
                                    Nama Tag
                                </label>

                                <input
                                    type="text"
                                    value={newTagName}
                                    onChange={(e) =>
                                        setNewTagName(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={(e) => {
                                        if (
                                            e.key ===
                                            "Enter"
                                        ) {
                                            e.preventDefault();
                                            addTag();
                                        }
                                    }}
                                    placeholder="Contoh: Visual"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                                    autoFocus
                                />

                                {tagError && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {tagError}
                                    </p>
                                )}

                                <div className="mt-3 flex gap-2">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddTag(
                                                false
                                            );

                                            setNewTagName(
                                                ""
                                            );

                                            setTagError(
                                                ""
                                            );
                                        }}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-white"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={addTag}
                                        disabled={
                                            addingTag
                                        }
                                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        {addingTag
                                            ? "Adding..."
                                            : "Add Tag"}
                                    </button>

                                </div>
                            </div>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* TYPE */}
                    {/* ================================================= */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Content Type
                        </label>

                        <select
                            value={data.type}
                            onChange={(e) =>
                                changeType(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        >
                            <option value="article">
                                Article
                            </option>

                            <option value="video">
                                Video
                            </option>

                            <option value="audio">
                                Audio
                            </option>

                            <option value="worksheet">
                                Worksheet
                            </option>

                            <option value="challenge">
                                Challenge
                            </option>
                        </select>

                        {errors.type && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.type}
                            </p>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* ARTICLE */}
                    {/* ================================================= */}

                    {data.type === "article" && (
                        <div>

                            <label className="mb-3 block font-medium">
                                Article Content
                            </label>

                            <div className="mb-4 grid grid-cols-2 gap-4">

                                {/* WRITE */}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setArticleMode(
                                            "write"
                                        );

                                        setData(
                                            "pdf",
                                            null
                                        );
                                    }}
                                    className={`rounded-xl border p-4 text-left transition ${
                                        articleMode ===
                                        "write"
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-gray-300 bg-white hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="text-2xl">
                                        ✍️
                                    </div>

                                    <div className="mt-2 font-semibold text-gray-900">
                                        Tulis Artikel
                                    </div>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Tulis materi langsung di website.
                                    </p>
                                </button>

                                {/* PDF */}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setArticleMode(
                                            "pdf"
                                        );

                                        setData(
                                            "content",
                                            ""
                                        );
                                    }}
                                    className={`rounded-xl border p-4 text-left transition ${
                                        articleMode ===
                                        "pdf"
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-gray-300 bg-white hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="text-2xl">
                                        📄
                                    </div>

                                    <div className="mt-2 font-semibold text-gray-900">
                                        Upload PDF
                                    </div>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Upload materi dalam bentuk PDF.
                                    </p>
                                </button>

                            </div>

                            {/* WRITE MODE */}

                            {articleMode === "write" && (
                                <div>

                                    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
                                        <div
                                            ref={
                                                editorRef
                                            }
                                            className="min-h-[450px] px-5 py-4"
                                        />
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Tulis materi menggunakan blok seperti heading, paragraph, list, quote, dan lainnya.
                                    </p>

                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors.content
                                            }
                                        </p>
                                    )}

                                </div>
                            )}

                            {/* PDF MODE */}

                            {articleMode === "pdf" && (
                                <div>

                                    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">

                                        <div className="text-4xl">
                                            📄
                                        </div>

                                        <p className="mt-3 font-medium text-gray-800">
                                            Upload PDF Article
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            PDF maksimal 10 MB
                                        </p>

                                        {content.media_url && (
                                            <p className="mt-3 text-sm font-medium text-emerald-600">
                                                📎 PDF saat ini sudah tersimpan
                                            </p>
                                        )}

                                        <input
                                            type="file"
                                            accept=".pdf,application/pdf"
                                            onChange={(e) =>
                                                setData(
                                                    "pdf",
                                                    e.target.files?.[0] ||
                                                        null
                                                )
                                            }
                                            className="mx-auto mt-5 block w-full max-w-md rounded-lg border border-gray-300 bg-white p-2 text-sm"
                                        />

                                        {data.pdf && (
                                            <p className="mt-3 text-sm font-medium text-emerald-600">
                                                📎{" "}
                                                {
                                                    data.pdf
                                                        .name
                                                }
                                            </p>
                                        )}

                                    </div>

                                    {errors.pdf && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.pdf}
                                        </p>
                                    )}

                                </div>
                            )}

                        </div>
                    )}

                    {/* ================================================= */}
                    {/* MEDIA URL */}
                    {/* ================================================= */}

                    {data.type !== "article" && (
                        <div>

                            <label className="mb-2 block font-medium">
                                Media URL
                            </label>

                            <input
                                type="text"
                                value={
                                    data.media_url
                                }
                                onChange={(e) =>
                                    setData(
                                        "media_url",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                placeholder="https://..."
                            />

                            {errors.media_url && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.media_url
                                    }
                                </p>
                            )}

                        </div>
                    )}

                    {/* ================================================= */}
                    {/* ESTIMATED TIME + DIFFICULTY */}
                    {/* ================================================= */}

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <label className="mb-2 block font-medium">
                                Estimated Time (Minutes)
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={
                                    data.estimated_time
                                }
                                onChange={(e) =>
                                    setData(
                                        "estimated_time",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />

                            {errors.estimated_time && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.estimated_time
                                    }
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Difficulty
                            </label>

                            <select
                                value={
                                    data.difficulty
                                }
                                onChange={(e) =>
                                    setData(
                                        "difficulty",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            >
                                <option value="beginner">
                                    Beginner
                                </option>

                                <option value="intermediate">
                                    Intermediate
                                </option>

                                <option value="advanced">
                                    Advanced
                                </option>
                            </select>

                            {errors.difficulty && (
                                <p className="mt-1 text-sm text-red-500">
                                    {
                                        errors.difficulty
                                    }
                                </p>
                            )}
                        </div>

                    </div>

                    {/* ================================================= */}
                    {/* STATUS + FEATURED */}
                    {/* ================================================= */}

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <label className="mb-2 block font-medium">
                                Status
                            </label>

                            <select
                                value={
                                    data.status
                                }
                                onChange={(e) =>
                                    setData(
                                        "status",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            >
                                <option value="draft">
                                    Draft
                                </option>

                                <option value="published">
                                    Published
                                </option>

                                <option value="archived">
                                    Archived
                                </option>
                            </select>

                            {errors.status && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pt-8">

                            <input
                                type="checkbox"
                                checked={
                                    data.is_featured
                                }
                                onChange={(e) =>
                                    setData(
                                        "is_featured",
                                        e.target.checked
                                    )
                                }
                            />

                            <label className="font-medium">
                                Featured Content
                            </label>

                        </div>

                    </div>

                    {/* ================================================= */}
                    {/* PROGRESS */}
                    {/* ================================================= */}

                    {progress && (
                        <div>

                            <div className="mb-1 flex justify-between text-sm">

                                <span>
                                    Uploading...
                                </span>

                                <span>
                                    {
                                        progress.percentage
                                    }
                                    %
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                                <div
                                    className="h-full bg-emerald-600"
                                    style={{
                                        width: `${progress.percentage}%`,
                                    }}
                                />

                            </div>

                        </div>
                    )}

                    {/* ================================================= */}
                    {/* ACTION */}
                    {/* ================================================= */}

                    <div className="flex items-center justify-end gap-3 border-t pt-6">

                        <Link
                            href={route(
                                "admin.contents.index"
                            )}
                            className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-emerald-600 px-5 py-2 font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            {processing
                                ? "Saving..."
                                : "Save Content"}
                        </button>

                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}