import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Show({ content }) {

    return (
        <AdminLayout>

            <Head title="Detail Content" />

            <div className="mx-auto max-w-5xl p-6">

                <div className="mb-6 flex items-center justify-between">

                    <h1 className="text-2xl font-bold">
                        Detail Learning Content
                    </h1>


                    <div className="flex gap-3">

                        <Link
                            href={route(
                                "admin.contents.edit",
                                content.id
                            )}
                            className="rounded-lg bg-amber-500 px-5 py-2 text-white hover:bg-amber-600"
                        >
                            Edit
                        </Link>


                        <Link
                            href={route(
                                "admin.contents.index"
                            )}
                            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
                        >
                            Back
                        </Link>

                    </div>

                </div>


                <div className="space-y-6 rounded-xl bg-white p-6 shadow">


                    {/* Title */}

                    <div>
                        <h2 className="text-xl font-bold">
                            {content.title}
                        </h2>

                        <p className="mt-2 text-gray-600">
                            {content.excerpt}
                        </p>
                    </div>



                    {/* Scope Information */}

                    <div className="grid grid-cols-3 gap-5">


                        <div>
                            <p className="text-sm text-gray-500">
                                Scope
                            </p>

                            <p className="font-medium">
                                {
                                    content.category
                                    ? "Category"
                                    : content.assessment_type
                                    ? "Assessment"
                                    : "Global"
                                }
                            </p>
                        </div>



                        <div>
                            <p className="text-sm text-gray-500">
                                Assessment
                            </p>

                            <p className="font-medium">
                                {
                                    content.assessment_type?.name
                                    ?? "-"
                                }
                            </p>
                        </div>



                        <div>
                            <p className="text-sm text-gray-500">
                                Category
                            </p>

                            <p className="font-medium">
                                {
                                    content.category?.name
                                    ?? "-"
                                }
                            </p>
                        </div>


                    </div>



                    {/* Content Type */}

                    <div className="grid grid-cols-4 gap-5">


                        <div>
                            <p className="text-sm text-gray-500">
                                Type
                            </p>

                            <p className="font-medium capitalize">
                                {content.type}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Difficulty
                            </p>

                            <p className="font-medium capitalize">
                                {content.difficulty}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Estimated Time
                            </p>

                            <p className="font-medium">
                                {content.estimated_time} minutes
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Status
                            </p>

                            <p className="font-medium capitalize">
                                {content.status}
                            </p>
                        </div>


                    </div>



                    {/* Media */}

                    {
                        content.media_url && (
                            <div>

                                <p className="text-sm text-gray-500">
                                    Media URL
                                </p>

                                <a
                                    href={content.media_url}
                                    target="_blank"
                                    className="text-emerald-600 hover:underline"
                                >
                                    {content.media_url}
                                </a>

                            </div>
                        )
                    }



                    {/* Main Content */}

                    <div>

                        <p className="mb-3 text-sm text-gray-500">
                            Content
                        </p>


                        <div className="rounded-lg bg-gray-50 p-5 whitespace-pre-line">
                            {content.content}
                        </div>

                    </div>



                    {/* Featured */}

                    <div>

                        <p className="text-sm text-gray-500">
                            Featured
                        </p>

                        <p className="font-medium">
                            {
                                content.is_featured
                                ? "Yes"
                                : "No"
                            }
                        </p>

                    </div>


                </div>

            </div>

        </AdminLayout>
    );
}