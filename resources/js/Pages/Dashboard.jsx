import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ contents }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            {/* Hero Section Terkunci (Height Fixed 400px) */}
            <section className="w-full overflow-hidden bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-500 text-white">
                <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col items-center px-4 py-8 sm:px-6 md:min-h-[400px] md:flex-row md:items-end md:px-8 md:py-0">

                    {/* Kiri */}
                    <div className="flex w-full flex-col justify-center pb-4 pt-2 md:h-full md:w-1/2 md:pb-8 md:pt-6">
                        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                            Temukan ruang aman di sini untuk bercerita dan belajar tentang self-love
                        </h1>

                        <div className="hidden md:block">
                            <p className="mt-4 text-base text-green-100">
                                Mencintai diri sendiri bukanlah kemewahan, melainkan fondasi.
                            </p>

                            <div className="mt-6">
                                <Link
                                    href={route('assessments.index')}
                                    className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    Start Assessment
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Kanan */}
                    <div className="flex w-full items-end justify-center md:h-full md:w-1/2">
                        <div className="relative flex h-full w-full items-end justify-center">

                            {/* Ripple */}
                            <div className="absolute bottom-10 h-48 w-48 rounded-full bg-white/10 animate-ping"></div>

                            {/* Gambar - Dibatasi tinggi maks agar tidak merusak section */}
                            <img
                                src="/images/hero.png"
                                alt="Hero"
                                className="relative z-10 max-h-64 w-auto object-contain sm:max-h-80 md:max-h-[360px]"
                            />
                        </div>
                    </div>

                    <div className="w-full pb-2 md:hidden">
                        <p className="text-base text-green-100">
                            Mencintai diri sendiri bukanlah kemewahan, melainkan fondasi.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={route('assessments.index')}
                                className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                            >
                                Start Assessment
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Content Section */}
            <section className="bg-gray-50 py-12 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                        Apa Itu Self Love? Mari lihat beberapa materinya
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Jelajahi materi yang berhubungan dengan self love
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

    {contents.map((item) => (

       <div
    key={item.id}
    className="group relative flex min-h-56 overflow-hidden rounded-3xl bg-emerald-600 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
    {item.thumbnail && (
        <img
            src={`/storage/${item.thumbnail}`}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
    )}

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

    {/* Content */}
    <div className="relative z-10 flex w-full flex-col justify-between p-5 sm:p-8">

        <div>
            <span className="mb-2 inline-flex rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {item.category?.label ?? "Global"}
            </span>

            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-100">
                {item.type}
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
                {item.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-white/80">
                {item.excerpt}
            </p>
        </div>

        <Link
            href={route('learning.show', item.slug)}
            className="w-fit rounded-full bg-white px-5 py-2 font-semibold text-gray-800 transition hover:bg-gray-100"
        >
            Explore
        </Link>

    </div>
</div>
    ))}

</div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}