import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5] text-neutral-800 antialiased selection:bg-[#64d89c] selection:text-[#064e3b]">
            <Head title="Masuk" />
            <main className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16">
                <section className="space-y-8 lg:col-span-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#e3e7de]/60 bg-[#f3f5ee] px-3.5 py-1.5">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#64d89c]" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-700">Ruang aman untuk dirimu</span>
                    </div>
                    <div className="max-w-xl space-y-4">
                        <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">Pikiran yang lebih tenang <span className="text-[#163319]">dimulai dari dirimu.</span></h1>
                        <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">Terhubung kembali dengan dirimu melalui refleksi pribadi, latihan kesadaran, dan ruang yang mendukung pertumbuhan emosionalmu.</p>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-md lg:col-span-5">
                    <div className="rounded-[2.25rem] border border-neutral-200/90 bg-white p-7 shadow-[0_20px_45px_-15px_rgba(22,51,25,0.08)] sm:p-9">
                        <div className="mb-6 text-center"><h2 className="text-2xl font-bold tracking-tight text-neutral-900">Selamat datang kembali</h2><p className="mt-1 text-xs text-neutral-500">Lanjutkan perjalanan menyayangi dirimu</p></div>
                        {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1.5"><label htmlFor="email" className="block text-xs font-semibold text-neutral-600">Email</label><TextInput id="email" type="email" name="email" value={data.email} placeholder="name@example.com" className="w-full rounded-xl border-neutral-200 bg-neutral-50/50 py-3 text-sm focus:border-[#163319] focus:ring-[#163319]" autoComplete="username" isFocused onChange={(e) => setData('email', e.target.value)} /><InputError message={errors.email} className="mt-2" /></div>
                            <div className="space-y-1.5"><div className="flex items-center justify-between"><label htmlFor="password" className="block text-xs font-semibold text-neutral-600">Kata sandi</label>{canResetPassword && <Link href={route('password.request')} className="text-xs font-semibold text-neutral-500 hover:text-neutral-900">Lupa kata sandi?</Link>}</div><TextInput id="password" type="password" name="password" value={data.password} placeholder="••••••••" className="w-full rounded-xl border-neutral-200 bg-neutral-50/50 py-3 text-sm focus:border-[#163319] focus:ring-[#163319]" autoComplete="current-password" onChange={(e) => setData('password', e.target.value)} /><InputError message={errors.password} className="mt-2" /></div>
                            <label className="flex items-center gap-2 pt-1 text-xs text-neutral-500"><input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} className="rounded border-neutral-300 text-[#163319] focus:ring-[#64d89c]" /> Ingat saya</label>
                            <button disabled={processing} type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#163319] px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition hover:bg-[#0f2411] disabled:opacity-60">{processing ? 'Sedang masuk...' : 'Masuk'} <span>→</span></button>
                        </form>
                        <div className="relative my-6"><div className="border-t border-neutral-200" /><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-neutral-400">atau</span></div>
                        <div className="text-center text-sm text-neutral-600">Belum punya akun? <Link href={route('register')} className="font-bold text-[#128c5e] hover:underline">Daftar sekarang</Link></div>
                    </div>
                </section>
            </main>
        </div>
    );
}
