import { usePage } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <header className="flex h-20 items-center justify-between border-b bg-white px-8">

            <div>

                <h2 className="text-2xl font-bold">
                    Dashboard
                </h2>

                <p className="text-sm text-gray-500">
                    Welcome back 👋
                </p>

            </div>

            <div className="flex items-center gap-4">

                <div className="text-right">

                    <p className="font-semibold">
                        {auth.user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        Administrator
                    </p>

                </div>

                <img
                    src={`https://ui-avatars.com/api/?name=${auth.user.name}`}
                    className="h-12 w-12 rounded-full"
                    alt="avatar"
                />

            </div>

        </header>
    );
}