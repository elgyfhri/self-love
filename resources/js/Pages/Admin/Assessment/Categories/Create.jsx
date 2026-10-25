import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState, useRef, useEffect } from "react";

export default function Create({ assessmentTypes }) {
    const dropdownRef = useRef(null);

const [open, setOpen] = useState(false);
const [showSelected, setShowSelected] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
    assessment_type_ids: [],
    name: "",
    indonesian_name: "",
    abbreviation: "",
    description: "",
});


useEffect(() => {
    function handleClickOutside(event) {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );
    };
}, []);
   
    function submit(e) {
        e.preventDefault();

        post(route("admin.assessment-categories.store"));
    }

    return (
        <AdminLayout>
            <Head title="Create Assessment Category" />

            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create Assessment Category
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Create a category for an assessment.
                        </p>
                    </div>

                    <Link
                        href={route("admin.assessment-categories.index")}
                        className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
                    >
                        Back
                    </Link>

                </div>

                <form
                    onSubmit={submit}
                    className="space-y-8"
                >

                    <div className="rounded-xl bg-white p-8 shadow">

                        <h2 className="mb-6 text-xl font-semibold">
                            Category Information
                        </h2>

                        {/* Assessment */}
<div className="mb-6">
    <label className="mb-2 block font-medium">
        Assessment Type
    </label>

    <div
        ref={dropdownRef}
        className="relative"
    >
        {/* Input */}
        <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 hover:border-emerald-500"
        >
            <span
                className={
                    data.assessment_type_ids.length === 0
                        ? "text-gray-400"
                        : "text-gray-700"
                }
            >
                {data.assessment_type_ids.length === 0
                    ? "Select Assessment Type"
                    : `${data.assessment_type_ids.length} Selected`}
            </span>

            <svg
                className={`h-5 w-5 transition-transform ${
                    open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>

        {open && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border bg-white shadow-lg">

                {/* List Assessment */}
                <div className="max-h-64 overflow-y-auto">

                    {assessmentTypes.map((assessment) => {

                        const selected =
                            data.assessment_type_ids.includes(
                                assessment.id
                            );

                        return (
                            <div
                                key={assessment.id}
                                onClick={() => {

                                    if (selected) {
                                        setData(
                                            "assessment_type_ids",
                                            data.assessment_type_ids.filter(
                                                (id) =>
                                                    id !== assessment.id
                                            )
                                        );
                                    } else {
                                        setData(
                                            "assessment_type_ids",
                                            [
                                                ...data.assessment_type_ids,
                                                assessment.id,
                                            ]
                                        );
                                    }

                                }}
                                className={`flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-emerald-50 ${
                                    selected
                                        ? "bg-emerald-50"
                                        : ""
                                }`}
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                            selected
                                                ? "border-emerald-600"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {selected && (
                                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-600"></div>
                                        )}
                                    </div>

                                    <span>
                                        {assessment.name}
                                    </span>

                                </div>

                            </div>
                        );

                    })}
                    
                    

                </div>
                
                
                </div>
                
                
        )}
        
    </div>
    
    

    {errors.assessment_type_ids && (
        <p className="mt-2 text-sm text-red-500">
            {errors.assessment_type_ids}
        </p>
    )}
</div>



                        {/* Name */}
                        <div className="mb-6">

                            <label className="mb-2 block font-medium">
                                Category Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                placeholder="Self Kindness"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}

                        </div>

                        {/* Indonesian Name */}
                        <div className="mb-6">

                            <label className="mb-2 block font-medium">
                                Category Name (Indonesia)
                            </label>

                            <input
                                type="text"
                                value={data.indonesian_name}
                                onChange={(e) =>
                                    setData(
                                        "indonesian_name",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                placeholder="Kebaikan pada Diri Sendiri"
                            />

                            <p className="mt-1 text-sm text-gray-500">
                                Dipakai untuk menampilkan label dua bahasa,
                                contoh: "Self Kindness / Kebaikan pada Diri
                                Sendiri". Boleh dikosongkan.
                            </p>

                            {errors.indonesian_name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.indonesian_name}
                                </p>
                            )}

                        </div>

                        {/* Abbreviation */}
                        <div className="mb-6">

                            <label className="mb-2 block font-medium">
                                Abbreviation
                            </label>

                            <input
                                type="text"
                                maxLength="10"
                                value={data.abbreviation}
                                onChange={(e) =>
                                    setData(
                                        "abbreviation",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 uppercase"
                                placeholder="SK"
                            />

                            {errors.abbreviation && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.abbreviation}
                                </p>
                            )}

                        </div>

                        {/* Description */}
                        <div>

                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(e) =>
                                    setData(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                placeholder="Describe this category..."
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}

                        </div>

                    </div>

                    <div className="flex justify-end gap-3">

                        <Link
                            href={route("admin.assessment-categories.index")}
                            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing
                                ? "Saving..."
                                : "Save Category"}
                        </button>

                    </div>

                </form>

            </div>

        </AdminLayout>
    );
}