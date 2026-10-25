import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create({ question }) {
    const { data, setData, post, processing, errors } = useForm({
        option_text: "",
        option_value: "",
        option_order: "",
    });

    const submit = (e) => {
    e.preventDefault();

    console.log(data);

    post(
        route(
            "admin.assessment-questions.options.store",
            question.id
        )
    );
};

    const isBoolean = question.answer_type === "boolean";
    const isMultiple = question.answer_type === "multiple_choice";
    const isLikert = question.answer_type === "likert_5";

    return (
        <AdminLayout>
            <Head title="Create Option" />

            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-6 text-2xl font-bold">
                    Add Question Option
                </h1>

                <div className="mb-6 rounded-lg bg-gray-100 p-4">
                    <p className="font-semibold">Question</p>
                    <p>{question.question}</p>

                    <div className="mt-4 space-y-1 text-sm text-gray-600">
                        <p>
                            <b>Answer Type :</b>{" "}
                            {question.answer_type.replace("_", " ")}
                        </p>

                        <p>
                            <b>Reverse :</b>{" "}
                            {question.is_reverse ? "Yes" : "No"}
                        </p>
                    </div>
                </div>

                <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                    {isLikert && (
                        <p>
                            Likert Scale menggunakan nilai 1-5. Value akan otomatis mengikuti Option Order.
                        </p>
                    )}

                    {isBoolean && (
                        <p>
                            Boolean hanya memiliki dua pilihan: True dan False.
                        </p>
                    )}

                    {isMultiple && (
                        <p>
                            Multiple Choice bebas menentukan text, value, dan order.
                        </p>
                    )}
                </div>

                <form onSubmit={submit} className="space-y-5">

                    {/* BOOLEAN */}
                    {isBoolean ? (
                        <div>
                            <label className="mb-2 block font-medium">
                                Answer
                            </label>

                            <select
                                value={data.option_text}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setData({
                                        ...data,
                                        option_text: value,
                                        option_value:
                                            value === "True"
                                                ? 1
                                                : value === "False"
                                                ? 0
                                                : "",
                                    });
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            >
                                <option value="">
                                    Select Answer
                                </option>

                                <option value="True">
                                    True
                                </option>

                                <option value="False">
                                    False
                                </option>
                            </select>

                            {errors.option_text && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.option_text}
                                </p>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* OPTION TEXT */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Option Text
                                </label>

                                <input
                                    type="text"
                                    value={data.option_text}
                                    onChange={(e) =>
                                        setData(
                                            "option_text",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                    placeholder={
                                        isLikert
                                            ? "Strongly Disagree"
                                            : "Option A"
                                    }
                                />

                                {errors.option_text && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.option_text}
                                    </p>
                                )}
                            </div>

                            {/* OPTION VALUE hanya Multiple Choice */}
                            {isMultiple && (
    <div>
        <label className="mb-2 block font-medium">
            Option Value
        </label>

        <input
    type="text"
    value={data.option_value}
    onChange={(e) =>
        setData("option_value", e.target.value)
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-2"
    placeholder="Contoh: visual, left, E, atau 1"
/>

        {errors.option_value && (
            <p className="mt-1 text-sm text-red-500">
                {errors.option_value}
            </p>
        )}
    </div>
)}
                        </>
                    )}

                    {/* OPTION ORDER */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Option Order
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={data.option_order}
                            onChange={(e) => {
                                const order = e.target.value;

                                setData({
                                    ...data,
                                    option_order: order,
                                    option_value: isLikert
                                        ? order
                                        : data.option_value,
                                });
                            }}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            placeholder="1"
                        />

                        {errors.option_order && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.option_order}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>

                        <Link
                            href={route(
                                "admin.assessment-questions.options.index",
                                question.id
                            )}
                            className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}