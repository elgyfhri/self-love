import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-emerald-50 pt-12 pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3">
                            <ApplicationLogo className="h-10 w-10" />
                            <span className="text-lg font-bold text-gray-900">
                                Self Love
                            </span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                            Sebuah ruang aman digital untuk merawat
                            kesejahteraan emosional dan menumbuhkan cinta pada
                            diri sendiri.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Navigasi</h4>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link
                                    href={route('dashboard')}
                                    className="text-sm text-gray-500 transition hover:text-emerald-600"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('letter.index')}
                                    className="text-sm text-gray-500 transition hover:text-emerald-600"
                                >
                                    Dear Little Me
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('learning.index')}
                                    className="text-sm text-gray-500 transition hover:text-emerald-600"
                                >
                                    Modul Learning
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('assessments.index')}
                                    className="text-sm text-gray-500 transition hover:text-emerald-600"
                                >
                                    Assessment
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Akun</h4>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link
                                    href={route('profile.edit')}
                                    className="text-sm text-gray-500 transition hover:text-emerald-600"
                                >
                                    Profil Saya
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-500 transition hover:text-red-600"
                                >
                                    Keluar
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-emerald-50 pt-8 md:flex-row">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Self Love. Nurturing your inner light.
                    </p>
                </div>
            </div>
        </footer>
    );
}