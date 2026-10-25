import {
    HomeIcon,
    ClipboardDocumentListIcon,
    BookOpenIcon,
    UsersIcon,
    EnvelopeIcon,
    ChartBarIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { Link, usePage } from "@inertiajs/react";

const menus = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: HomeIcon,
    },
    {
        name: "Assessment",
        href: "/admin/assessment-types",
        icon: ClipboardDocumentListIcon,
    },
    {
        name: "Learning Center",
        href: "/admin/contents",
        icon: BookOpenIcon,
    },
    {
        name: "Users",
        href: "/admin/user",
        icon: UsersIcon,
    },
    {
        name: "Dear Little Me",
        href: "/admin/letters",
        icon: EnvelopeIcon,
    },
    {
        name: "Analytics",
        href: "/admin/analytics",
        icon: ChartBarIcon,
    },
    {
        name: "Settings",
        href: "/admin/settings",
        icon: Cog6ToothIcon,
    },
];

export default function Sidebar() {
    const { url } = usePage();

    return (
        <aside className="flex h-screen w-72 flex-col border-r bg-white">

            <div className="border-b p-8">

                <h1 className="text-2xl font-bold text-emerald-600">
                    Self Love
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Admin Panel
                </p>

            </div>


            <nav className="flex-1 space-y-2 p-4">

                {menus.map((menu) => {

                    const Icon = menu.icon;

                    const active = url.startsWith(menu.href);

                    return (
                        <Link
                            key={menu.name}
                            href={menu.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                active
                                    ? "bg-emerald-600 text-white"
                                    : "text-gray-600 hover:bg-emerald-50"
                            }`}
                        >

                            <Icon className="h-6 w-6" />

                            <span>
                                {menu.name}
                            </span>

                        </Link>
                    );

                })}

            </nav>

        </aside>
    );
}