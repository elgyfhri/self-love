import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";


export default function Index({ question, options }) {

    const deleteOption = (id) => {
        if (confirm("Delete this option?")) {

            router.delete(
                route(
                    "admin.assessment-questions.options.destroy",
                    [
                        question.id,
                        id
                    ]
                )
            );

        }
    };


    return (
        <AdminLayout>

            <Head title="Question Options" />


            <div className="p-6">


                {/* Header */}

                <div className="mb-6 flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-bold">
                            Question Options
                        </h1>

                        <p className="mt-2 text-gray-600">
                            {question.question}
                        </p>
                    </div>


                    <Link
                        href={route(
                            "admin.assessment-questions.options.create",
                            question.id
                        )}
                        className="
                            rounded-lg
                            bg-emerald-600
                            px-4
                            py-2
                            text-white
                        "
                    >
                        Add Option
                    </Link>

                </div>



                {/* Table */}

                <div className="overflow-hidden rounded-xl border">


                    <table className="w-full">


                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left">
                                    Order
                                </th>


                                <th className="p-3 text-left">
                                    Option
                                </th>


                                <th className="p-3 text-left">
                                    Value
                                </th>


                                <th className="p-3 text-left">
                                    Action
                                </th>


                            </tr>

                        </thead>



                        <tbody>


                        {options.map((option)=>(
                            
                            <tr
                                key={option.id}
                                className="border-t"
                            >

                                <td className="p-3">
                                    {option.option_order}
                                </td>


                                <td className="p-3">
                                    {option.option_text}
                                </td>


                                <td className="p-3">
                                    {option.option_value}
                                </td>


                                <td className="p-3">


                                    <button
                                        onClick={() =>
                                            deleteOption(option.id)
                                        }
                                        className="
                                            rounded
                                            bg-red-500
                                            px-3
                                            py-1
                                            text-white
                                        "
                                    >
                                        Delete
                                    </button>


                                </td>


                            </tr>

                        ))}


                        </tbody>


                    </table>


                </div>



                <div className="mt-6">

                    <Link
                        href={route(
                            "admin.assessment-questions.show",
                            question.id
                        )}
                        className="text-emerald-600"
                    >
                        ← Back to Question
                    </Link>

                </div>


            </div>


        </AdminLayout>
    );
}