import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create({
    assessmentTypes,
    categories,
}) {
    const { data, setData, post, processing, errors } = useForm({
    assessment_type_id: "",
    category_id: "",
    question_code: "",
    question: "",
    question_order: "",
    answer_type: "likert_5",
    is_reverse: false,
    is_required: true,
    is_active: true,
});

const filteredCategories = categories.filter(category =>
    category.assessment_types.some(
        type => type.id == data.assessment_type_id
    )
);
const selectedAssessment = assessmentTypes.find(
    (type) => type.id == data.assessment_type_id
);
    function submit(e) {
        e.preventDefault();

        post(route("admin.assessment-questions.store"));
    }

    return (
        <AdminLayout>
            <Head title="Create Question" />

            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create Question
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Create a new assessment question.
                        </p>
                    </div>

                    <Link
                        href={route("admin.assessment-questions.index")}
                        className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Back
                    </Link>
                </div>
                {selectedAssessment && (
    <div className="mb-6 rounded-lg bg-emerald-50 p-4">
        <p className="text-sm text-gray-600">
            Scoring Type
        </p>

        <p className="mt-1 font-semibold text-emerald-700">
            {{
                score_range: "Score Range",
                screening_range: "Screening Range",
                dominant_tag: "Dominant Tag",
            }[selectedAssessment.scoring_type] ??
                selectedAssessment.scoring_type}
        </p>
    </div>
)}

                <form onSubmit={submit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="rounded-xl bg-white p-8 shadow">
                        <h2 className="mb-6 text-xl font-semibold">
                            Basic Information
                        </h2>
                        
                       <div className="mb-6">
    <label className="mb-2 block font-medium">
        Assessment
    </label>

    <select
        value={data.assessment_type_id}
        onChange={(e) => {
            setData("assessment_type_id", e.target.value);
            setData("category_id", "");
        }}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
    >
        <option value="">Select Assessment</option>

        {assessmentTypes.map((type) => (
            <option key={type.id} value={type.id}>
                {type.name}
            </option>
        ))}
    </select>

    {errors.assessment_type_id && (
        <p className="mt-1 text-sm text-red-500">
            {errors.assessment_type_id}
        </p>
    )}
</div>

                        {/* Category */}
                      <div className="mb-6">
    <label className="mb-2 block font-medium">
        Category
        <span className="ml-2 text-sm font-normal text-gray-400">
            (Optional)
        </span>
    </label>

    <select
        value={data.category_id}
        onChange={(e) =>
            setData("category_id", e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
    >
        <option value="">
            No Category
        </option>

        {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ))}
    </select>

    {errors.category_id && (
        <p className="mt-1 text-sm text-red-500">
            {errors.category_id}
        </p>
    )}
</div>


                        {/* Question Code */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Question Code
                            </label>

                            <input
                                type="text"
                                value={data.question_code}
                                onChange={(e) =>
                                    setData(
                                        "question_code",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 uppercase focus:border-emerald-500 focus:outline-none"
                                placeholder="SCS_SK_01"
                            />

                            {errors.question_code && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.question_code}
                                </p>
                            )}
                        </div>

                        {/* Question */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Question
                            </label>

                            <textarea
                                rows={5}
                                value={data.question}
                                onChange={(e) =>
                                    setData("question", e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                placeholder="Write the question..."
                            />

                            {errors.question && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.question}
                                </p>
                            )}
                        </div>

                        {/* Question Order */}
                        <div>
                            <label className="mb-2 block font-medium">
                                Question Order
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={data.question_order}
                                onChange={(e) =>
                                    setData(
                                        "question_order",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                            />

                            {errors.question_order && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.question_order}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Configuration */}
                    <div className="rounded-xl bg-white p-8 shadow">
                        <h2 className="mb-6 text-xl font-semibold">
                            Configuration
                        </h2>

                        {/* Answer Type */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium">
                                Answer Type
                            </label>

                            <select
                                value={data.answer_type}
                                onChange={(e) =>
                                    setData(
                                        "answer_type",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                            >
                                <option value="likert_5">
                                    Likert Scale (1-5)
                                </option>

                                <option value="multiple_choice">
                                    Multiple Choice
                                </option>

                                <option value="boolean">
                                    True / False
                                </option>
                            </select>

                            {errors.answer_type && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.answer_type}
                                </p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_reverse}
                                    onChange={(e) =>
                                        setData(
                                            "is_reverse",
                                            e.target.checked
                                        )
                                    }
                                />
                                <span>Reverse Scored</span>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_required}
                                    onChange={(e) =>
                                        setData(
                                            "is_required",
                                            e.target.checked
                                        )
                                    }
                                />
                                <span>Required Question</span>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData(
                                            "is_active",
                                            e.target.checked
                                        )
                                    }
                                />
                                <span>Active</span>
                            </label>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href={route("admin.assessment-questions.index")}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save Question"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}