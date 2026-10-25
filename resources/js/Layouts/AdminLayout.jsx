import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    const [isAssessmentOpen, setIsAssessmentOpen] = useState(
        route().current("admin.assessment-types.*") ||
        route().current("admin.assessment-types.*") ||
        route().current("admin.assessment-types.*")
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed bottom-4 left-4 z-50 rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
            >
                Menu
            </button>

            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? "block" : "hidden"} fixed inset-y-0 left-0 z-40 w-64 bg-emerald-700 text-white md:static md:block md:shrink-0`}>

                <div className="border-b border-emerald-500 p-6">
                    <h1 className="text-2xl font-bold">Self Love</h1>
                    <p className="text-sm text-emerald-200">Admin Panel</p>
                </div>

                <nav className="space-y-2 p-4">
                    {/* Dashboard */}
                    <Link
                        href={route("admin.dashboard")}
                        className={`block rounded-lg px-4 py-3 transition hover:bg-emerald-600 ${
                            route().current("admin.dashboard") ? "bg-emerald-800 font-semibold" : ""
                        }`}
                    >
                        Dashboard
                    </Link>

                    {/* Users */}
                    <Link
                        href={route("admin.users.index")}
                        className={`block rounded-lg px-4 py-3 transition hover:bg-emerald-600 ${
                            route().current("admin.users.*") ? "bg-emerald-800 font-semibold" : ""
                        }`}
                    >
                        Users
                    </Link>
                    <Link
                        href={route("admin.contents.index")}
                        className={`block rounded-lg px-4 py-3 transition hover:bg-emerald-600 ${
                            route().current("admin.contents.*") ? "bg-emerald-800 font-semibold" : ""
                        }`}
                    >
                        Contents
                    </Link>

                    {/* Dropdown Assessment */}
                    <div>
                        <button
                            onClick={() => setIsAssessmentOpen(!isAssessmentOpen)}
                            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition hover:bg-emerald-600"
                        >
                            <span>Assessment</span>
                            <svg
                                className={`h-4 w-4 transform transition-transform duration-200 ${
                                    isAssessmentOpen ? "rotate-180" : ""
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

                        {/* Sub Menu List */}
                        {isAssessmentOpen && (
                            <div className="mt-1 space-y-1 pl-4">
                                <Link
                                    href={route("admin.assessment-types.index")}
                                    className={`block rounded-lg px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-600 hover:text-white ${
                                        route().current("admin.assessment-types.*")
                                            ? "bg-emerald-800 font-semibold text-white"
                                            : ""
                                    }`}
                                >
                                    Assessment Types
                                </Link>

                                <Link
                                    href={route("admin.assessment-categories.index")}
                                    className={`block rounded-lg px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-600 hover:text-white ${
                                        route().current("admin.assessment-categories.*")
                                            ? "bg-emerald-800 font-semibold text-white"
                                            : ""
                                    }`}
                                >
                                    Assessment Categories
                                </Link>

                                <Link
                                    href={route("admin.assessment-questions.index")}
                                    className={`block rounded-lg px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-600 hover:text-white ${
                                        route().current("admin.questions.*")
                                            ? "bg-emerald-800 font-semibold text-white"
                                            : ""
                                    }`}
                                >
                                    Questions
                                </Link>
                                
                            </div>
                        )}
                    </div>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1">
                {/* Navbar */}
                <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-4 sm:px-8 sm:py-5">
                    <div>
                        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="font-medium">{auth.user.name}</p>
                            <p className="text-sm text-gray-500">Administrator</p>
                        </div>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                            Logout
                        </Link>
                    </div>
                </header>

                <div className="p-4 sm:p-8">{children}</div>
            </main>
        </div>
    );
}