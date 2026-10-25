import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ stats }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div>
                <h1 className="text-3xl font-bold mb-8">
                    Dashboard
                </h1>

                <div className="grid grid-cols-4 gap-6">

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <p className="text-gray-500">Users</p>
                        <h2 className="mt-3 text-4xl font-bold">
                            {stats.users}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <p className="text-gray-500">Assessment</p>
                        <h2 className="mt-3 text-4xl font-bold">
                            {stats.assessments}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <p className="text-gray-500">Learning Content</p>
                        <h2 className="mt-3 text-4xl font-bold">
                            {stats.contents}
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow">
                        <p className="text-gray-500">Letters</p>
                        <h2 className="mt-3 text-4xl font-bold">
                            {stats.letters}
                        </h2>
                    </div>
                    

                </div>
            </div>
        </AdminLayout>
    );
}