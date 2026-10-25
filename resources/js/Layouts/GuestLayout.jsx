import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-serene-bg via-white to-serene-bg px-4 py-8">
            <div className="w-full max-w-md space-y-8 text-center">
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md px-6 py-8 sm:px-8 sm:py-10">
                {children}
            </div>
        </div>
    );
}
