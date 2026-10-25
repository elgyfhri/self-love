import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Self-Love - Temukan Ruang Aman untuk Mencintai Dirimu Sendiri">
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    body { font-family: 'Plus Jakarta Sans', sans-serif; }
                    
                    .shape-blob {
                        background: #128c5e;
                        border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
                        animation: morph 8s ease-in-out infinite;
                    }
                    
                    .shape-blob-light {
                        background: #64d89c;
                        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                        animation: morph-reverse 10s ease-in-out infinite;
                    }

                    @keyframes morph {
                        0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
                        34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
                        67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
                    }
                    
                    @keyframes morph-reverse {
                        0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                        34% { border-radius: 40% 60% 70% 30% / 50% 60% 30% 60%; }
                        67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
                    }

                    .glass-card {
                        background: rgba(255, 255, 255, 0.08);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.14);
                        border-radius: 2rem 1rem 3rem 1.5rem;
                        box-shadow: 0 24px 48px -28px rgba(0, 0, 0, 0.7);
                        transition: background 0.3s ease, border-color 0.3s ease;
                    }

                    .glass-card:hover {
                        background: rgba(255, 255, 255, 0.13);
                        border-color: rgba(110, 231, 183, 0.35);
                    }
                    
                    .custom-path {
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: drawPath 3s forwards;
                    }

                    @keyframes drawPath {
                        to { stroke-dashoffset: 0; }
                    }
                    
                    .cta-glow {
                        box-shadow: 0 0 30px rgba(18, 140, 94, 0.4);
                    }
                `}</style>
            </Head>

            <div className="bg-brand-surface text-slate-800 min-h-screen antialiased overflow-x-hidden">
                {/* Header */}
                <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
                    <div className="flex justify-between items-center w-full px-6 md:px-12 py-5 max-w-7xl mx-auto">
                        <Link className="flex items-center gap-3 group" href="#">
                           
                                <Link href="/">
                                                                   <ApplicationLogo className="block  h-20 w-20 fill-current text-gray-800" />
                                                               </Link>
                               
                            <span className="font-display text-2xl font-extrabold tracking-tight text-brand">
                                Self-Love
                            </span>
                        </Link>
                        <nav className="hidden md:flex gap-10 items-center">
                            <a
                                className="text-brand font-semibold relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-brand after:-bottom-2 after:left-0 after:rounded-full"
                                href="#"
                            >
                                Beranda
                            </a>
                            <a
                                className="text-slate-500 hover:text-brand font-medium transition-colors"
                                href="#features"
                            >
                                Fitur
                            </a>
                            <a
                                className="text-slate-500 hover:text-brand font-medium transition-colors"
                                href="#about"
                            >
                                Tentang
                            </a>
                        </nav>
                        <div className="flex items-center gap-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-brand text-white font-semibold px-7 py-3 rounded-2xl hover:bg-brand-dark transition-all cta-glow transform hover:-translate-y-0.5"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="hidden md:inline-block font-medium text-slate-500 hover:text-brand transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-brand text-white font-semibold px-7 py-3 rounded-2xl hover:bg-brand-dark transition-all cta-glow transform hover:-translate-y-0.5"
                                    >
                                        Mulai
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 lg:px-12 overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-organic-1 bg-contain bg-no-repeat opacity-50 -z-10"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] shape-blob-light opacity-60 -z-10"></div>
                    <div className="max-w-7xl mx-auto">
                        {/*
                            Mobile : judul -> gambar -> deskripsi -> tombol
                            Desktop: judul + deskripsi + tombol di kiri, gambar di kanan
                        */}
                        <div className="grid grid-cols-1 gap-y-14 relative z-10 lg:grid-cols-12 lg:items-center lg:gap-x-24 lg:gap-y-0">
                            {/* Heading */}
                            <div className="relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
                                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-brand/20 rounded-tl-3xl"></div>
                                <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                                    Mari Belajar <br />
                                    <span className="text-brand relative inline-block">
                                        Mencintai
                                        <svg
                                            className="absolute -bottom-2 left-0 w-full"
                                            fill="none"
                                            viewBox="0 0 200 12"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2 10C50 2 150 2 198 10"
                                                stroke="#34d399"
                                                strokeLinecap="round"
                                                strokeWidth="4"
                                            ></path>
                                        </svg>
                                    </span>
                                    <br />
                                    Diri Sendiri
                                </h1>
                            </div>

                            {/* Illustration */}
                            <div className="w-full relative lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:self-center">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110%] w-[112%] shape-blob opacity-20 -z-10 lg:aspect-square lg:h-auto lg:w-[120%]"></div>
                                <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-100 rounded-full mix-blend-multiply blur-xl animate-pulse"></div>
                                <div className="absolute -bottom-12 -left-4 w-32 h-32 bg-brand-light/30 rounded-full mix-blend-multiply blur-2xl"></div>
                                <div className="relative z-10 mx-auto w-full max-w-md bg-white p-3 sm:p-4 rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 lg:max-w-none">
                                    <img
                                        className="w-full h-auto object-cover rounded-[2rem]"
                                        alt="A minimal illustration of a person gently hugging themselves with a soft smile"
                                        src="images/LANDING_PAGE1.png"
                                    />
                                    {/* Floating element */}
                                    <div
                                        className="absolute -left-4 top-16 sm:-left-12 sm:top-20 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 animate-bounce"
                                        style={{ animationDuration: '3s' }}
                                    >
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-brand">
                                            <span className="material-symbols-outlined">
                                                psychology
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">Asesmen</p>
                                            <p className="text-sm font-bold text-slate-800">Kenali Dirimu</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="font-sans text-xl md:text-2xl text-slate-600 font-light max-w-lg leading-relaxed lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:mt-8">
                                Perjalanan mencintai diri sendiri dimulai dari sini. Sebuah tempat mempelajari diri sendiri, tempat untuk merefleksikan dan merayakan keberadaanmu.
                            </p>

                            {/* Call to Action */}
                            <div className="flex flex-col sm:flex-row gap-6 items-start lg:col-span-7 lg:col-start-1 lg:row-start-3 lg:mt-8">
                                <Link
                                    href={route('register')}
                                    className="bg-brand text-white font-semibold text-lg px-10 py-4 rounded-2xl hover:bg-brand-dark transition-all shadow-[0_10px_40px_-10px_rgba(18,140,94,0.7)] inline-flex items-center justify-center gap-3 whitespace-nowrap group"
                                >
                                    Mulai Perjalanan
                                    <svg
                                        className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M4 12h16" />
                                        <path d="M14 6l6 6-6 6" />
                                    </svg>
                                </Link>
                                <a
                                    className="flex items-center gap-3 text-slate-700 font-medium px-6 py-4 rounded-2xl hover:bg-emerald-50 transition-colors whitespace-nowrap"
                                    href="#about"
                                >
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center text-brand">
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    Lihat Panduan
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Decorative connecting line */}
                    <div className="hidden lg:block absolute bottom-0 right-1/4 w-32 h-32 opacity-30 z-0">
                        <svg
                            fill="none"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                className="custom-path"
                                d="M10,10 C40,50 60,10 90,90"
                                stroke="#128c5e"
                                strokeDasharray="8 8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </div>
                </section>

                {/* About Section */}
                <section className="relative scroll-mt-32 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24" id="about">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center gap-10 sm:gap-16">
                            <div className="w-full max-w-4xl space-y-6 text-center sm:space-y-8">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 shadow-sm sm:px-5 sm:py-2.5">
                                    <span className="material-symbols-outlined text-brand text-lg">
                                        spa
                                    </span>
                                    <span className="font-semibold text-sm tracking-wide text-brand uppercase">
                                        Filosofi Kami
                                    </span>
                                </div>
                                <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                                    Lebih dari sekadar aplikasi, ini adalah{' '}
                                    <span className="italic text-brand font-light">
                                        Rumah untuk hatimu
                                    </span>
                                </h2>
                                <div className="space-y-6 text-base font-light leading-relaxed text-slate-600 sm:text-lg">
                                    <p>
                                        Menyayangi diri sendiri adalah sebuah perjalanan panjang, dan setiap langkahmu layak untuk dirayakan. Di ruang berlindung ini, kamu diundang untuk mengenali dirimu lebih dalam tanpa rasa takut dihakimi, menemukan ketenangan di tengah riuhnya pikiran, serta merawat ingatan dengan lembut. Sapa kembali dirimu yang dulu melalui sebuah surat, biarkan setiap kata memulihkan rasa sakit yang tersisa, dan mulailah berdamai dengan masa lalu untuk melangkah lebih ringan hari ini.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <a
                                        className="inline-flex items-center gap-2 text-brand font-bold text-lg group"
                                        href="#"
                                    >
                                        Pelajari visi kami
                                        <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                                            <span className="material-symbols-outlined text-sm">
                                                arrow_forward
                                            </span>
                                        </span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section
                    className="py-16 px-6 sm:py-24 md:py-32 lg:px-12 relative scroll-mt-32 bg-emerald-950 text-white overflow-hidden rounded-[3rem] lg:rounded-[5rem] mx-4 lg:mx-8"
                    id="features"
                >
                    <div
                        className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 80% 20%, #128c5e 0%, transparent 40%), radial-gradient(circle at 20% 80%, #064e3b 0%, transparent 40%)',
                        }}
                    ></div>
                    <div className="absolute -top-40 -right-40 w-96 h-96 shape-blob bg-brand opacity-20 blur-3xl"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 sm:mb-16 sm:space-y-6 md:mb-20">
                            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
                                Dirancang untuk <br />
                                <span className="text-emerald-300">
                                    Ketenangan Batin
                                </span>
                            </h2>
                            <p className="font-sans text-base text-emerald-100 font-light sm:text-lg md:text-xl">
                                Alat-alat sederhana namun mendalam yang diukir dengan prinsip psikologis untuk membantumu terhubung kembali.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 lg:gap-12">
                            {/* Feature 1 */}
                            <div className="glass-card relative group p-6 transition-transform duration-300 hover:-translate-y-2 sm:p-8 md:p-10">
                                <div className="mb-5 flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-brand shadow-lg transition-transform group-hover:rotate-0 md:absolute md:-top-8 md:left-8 md:mb-0 md:h-16 md:w-16 lg:left-10">
                                    <span className="material-symbols-outlined text-white text-2xl md:text-3xl">
                                        edit_note
                                    </span>
                                </div>
                                <div className="md:mt-8">
                                    <h3 className="font-display text-xl font-bold text-white mb-3 sm:text-2xl sm:mb-4">
                                        Dear Little Me
                                    </h3>
                                    <p className="font-sans text-emerald-50 text-opacity-90 leading-relaxed font-light">
                                        Tulis pesan untuk dirimu di masa kecil. Sebuah ruang refleksi tertutup untuk memproses kenangan dan berdamai dengan masa lalu.
                                    </p>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="glass-card relative group p-6 transition-transform duration-300 hover:-translate-y-2 sm:p-8 md:translate-y-8 md:p-10 lg:translate-y-16">
                                <div className="mb-5 flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-brand shadow-lg transition-transform group-hover:rotate-0 md:absolute md:-top-8 md:left-8 md:mb-0 md:h-16 md:w-16 lg:left-10">
                                    <span className="material-symbols-outlined text-white text-2xl md:text-3xl">
                                        menu_book
                                    </span>
                                </div>
                                <div className="md:mt-8">
                                    <h3 className="font-display text-xl font-bold text-white mb-3 sm:text-2xl sm:mb-4">
                                        Materi Self-Love
                                    </h3>
                                    <p className="font-sans text-emerald-50 text-opacity-90 leading-relaxed font-light">
                                        Pelajari konsep dasar seperti Self-Kindness dan Mindfulness melalui modul interaktif yang menenangkan hati.
                                    </p>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="glass-card relative group p-6 transition-transform duration-300 hover:-translate-y-2 sm:p-8 md:p-10">
                                <div className="mb-5 flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-brand shadow-lg transition-transform group-hover:rotate-0 md:absolute md:-top-8 md:left-8 md:mb-0 md:h-16 md:w-16 lg:left-10">
                                    <span className="material-symbols-outlined text-white text-2xl md:text-3xl">
                                        psychology
                                    </span>
                                </div>
                                <div className="md:mt-8">
                                    <h3 className="font-display text-xl font-bold text-white mb-3 sm:text-2xl sm:mb-4">
                                        Asesmen Mandiri
                                    </h3>
                                    <p className="font-sans text-emerald-50 text-opacity-90 leading-relaxed font-light">
                                        Pahami kondisi emosionalmu melalui tes singkat yang divalidasi, memberikan wawasan lembut tentang area pertumbuhanmu.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section className="py-32 px-6 lg:px-12 relative">
                    <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-50 -z-10"></div>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="max-w-2xl space-y-4">
                                <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                    Eksplorasi Modul
                                </h2>
                                <p className="font-sans text-xl text-slate-500 font-light">
                                    Langkah demi langkah memahami dan mempraktikkan welas asih.
                                </p>
                            </div>
                            <a
                                className="text-brand font-semibold hover:underline hidden md:block"
                                href="#"
                            >
                                Lihat Semua Modul
                            </a>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                            {[
                                ['belajar-berdamai-dengan-diri-sendiri', 'Belajar Berdamai Dengan Diri Sendiri', 'Memperhatikan diri sendiri dengan kelembutan yang sama seperti kamu memperhatikan seorang teman baik.', '01'],
                                ['mengurangi-kritik-pada-diri-sendiri', 'Mengurangi Kritik Pada Diri Sendiri', 'Cara melunakkan kritik pada diri sendiri dengan lebih lembut.', '02'],
                                ['belajar-memaafkan-diri-sendiri', 'Belajar Memaafkan Diri Sendiri', 'Latihan memaafkan diri sendiri dan berdamai dengan kesalahan masa lalu.', '03'],
                            ].map(([slug, title, excerpt, number]) => (
                                <div key={slug} className="group relative flex min-h-48 overflow-hidden rounded-3xl bg-emerald-600 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-7xl text-emerald-300/40">auto_stories</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
                                    <div className="relative z-10 flex w-full flex-col justify-between p-6">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">Modul {number}</span>
                                                <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-100">article</span>
                                            </div>
                                            <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
                                            <p className="mt-1 line-clamp-2 text-sm text-white/75">{excerpt}</p>
                                        </div>
                                        <div className="mt-4 flex items-center justify-end">
                                            <Link href={auth?.user ? route('learning.show', slug) : route('login')} className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100">Explore</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-32 px-6 lg:px-12 relative flex justify-center">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-8 h-40 hidden md:block">
                        <svg
                            fill="none"
                            viewBox="0 0 20 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                className="custom-path"
                                d="M10,0 C10,30 20,50 10,100"
                                stroke="#128c5e"
                                strokeDasharray="4 4"
                                strokeLinecap="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </div>
                    <div className="w-full max-w-6xl relative">
                        <div className="relative bg-brand rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 text-center overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light rounded-full mix-blend-screen opacity-30 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900 rounded-full mix-blend-multiply opacity-50 blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                                <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight">
                                    Siap untuk{' '}
                                    <span className="italic font-light">
                                        Berdamai
                                    </span>{' '}
                                    dengan Dirimu?
                                </h2>
                                <p className="font-sans text-xl text-emerald-50 font-light">
                                    Perjalanan mencintai diri sendiri tidak perlu dilakukan sendirian. Bergabunglah dengan ribuan orang lainnya yang telah menemukan ruang aman mereka.
                                </p>
                                <div className="pt-8">
                                    <Link
                                        href={route('register')}
                                        className="relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold text-brand bg-white rounded-full group"
                                    >
                                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-emerald-100 rounded-full group-hover:w-full group-hover:h-56"></span>
                                        <span className="relative text-lg">
                                            Mulai Sekarang - Gratis
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white border-t border-emerald-50 pt-20 pb-10">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                            <div className="col-span-1 md:col-span-2 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-brand rounded-lg rotate-3 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-sm">
                                            favorite
                                        </span>
                                    </div>
                                    <span className="font-display text-xl font-bold text-slate-900">
                                        Self-Love
                                    </span>
                                </div>
                                <p className="text-slate-500 font-light max-w-sm">
                                    Sebuah ruang aman digital untuk merawat kesejahteraan emosional dan menumbuhkan cinta pada diri sendiri.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-6">
                                    Navigasi
                                </h4>
                                <ul className="space-y-4">
                                    <li>
                                        <a
                                            className="text-slate-500 hover:text-brand font-light transition-colors"
                                            href="#about"
                                        >
                                            Tentang Kami
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-slate-500 hover:text-brand font-light transition-colors"
                                            href="#features"
                                        >
                                            Fitur Aplikasi
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-slate-500 hover:text-brand font-light transition-colors"
                                            href="#"
                                        >
                                            Modul Edukasi
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-6">
                                    Legal
                                </h4>
                                <ul className="space-y-4">
                                    <li>
                                        <a
                                            className="text-slate-500 hover:text-brand font-light transition-colors"
                                            href="#"
                                        >
                                            Kebijakan Privasi
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-slate-500 hover:text-brand font-light transition-colors"
                                            href="#"
                                        >
                                            Syarat &amp; Ketentuan
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-slate-500 hover:text-brand font-light transition-colors"
                                            href="#"
                                        >
                                            Hubungi Kami
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="font-sans text-sm text-slate-400">
                                © {new Date().getFullYear()} Self-Love. Nurturing your inner light.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand hover:bg-emerald-50 cursor-pointer transition-colors"></div>
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand hover:bg-emerald-50 cursor-pointer transition-colors"></div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}