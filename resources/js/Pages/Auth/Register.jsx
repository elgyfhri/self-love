import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', email: '', password: '', password_confirmation: '' });
    const submit = (e) => { e.preventDefault(); post(route('register'), { onFinish: () => reset('password', 'password_confirmation') }); };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5] text-neutral-800 antialiased selection:bg-[#64d89c] selection:text-[#064e3b]">
            <Head title="Daftar" />
            <main className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16">
                <section className="space-y-8 lg:col-span-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#e3e7de]/60 bg-[#f3f5ee] px-3.5 py-1.5"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#64d89c]" /><span className="text-xs font-semibold uppercase tracking-wide text-neutral-700">Ruang aman untuk dirimu</span></div>
                    <div className="max-w-xl space-y-4"><h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">Mulai perjalananmu <span className="text-[#128c5e]">bersama SelfLove.</span></h1><p className="text-base leading-relaxed text-neutral-600 sm:text-lg">Buat akunmu dan luangkan ruang untuk refleksi, pertumbuhan, serta hubungan yang lebih baik dengan dirimu.</p></div>
                </section>
                <section className="mx-auto w-full max-w-md lg:col-span-5"><div className="rounded-[2.25rem] border border-neutral-200/90 bg-white p-7 shadow-[0_20px_45px_-15px_rgba(6,78,59,0.12)] sm:p-9"><div className="mb-6 text-center"><h2 className="text-2xl font-bold tracking-tight text-neutral-900">Buat akunmu</h2><p className="mt-1 text-xs text-neutral-500">Mulai perjalanan menyayangi dirimu</p></div><form onSubmit={submit} className="space-y-4">
                    <Field id="name" label="Nama" value={data.name} placeholder="Your name" autoComplete="name" onChange={(e) => setData('name', e.target.value)} error={errors.name} />
                    <Field id="email" label="Surel" type="email" value={data.email} placeholder="name@example.com" autoComplete="username" onChange={(e) => setData('email', e.target.value)} error={errors.email} />
                    <Field id="password" label="Kata sandi" type="password" value={data.password} placeholder="••••••••" autoComplete="new-password" onChange={(e) => setData('password', e.target.value)} error={errors.password} />
                    <Field id="password_confirmation" label="Konfirmasi kata sandi" type="password" value={data.password_confirmation} placeholder="••••••••" autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation} />
                    <button disabled={processing} type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#128c5e] px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition hover:bg-[#064e3b] disabled:opacity-60">{processing ? 'Membuat akun...' : 'Buat akun'} <span>→</span></button>
                </form><div className="mt-6 text-center text-sm text-neutral-600">Sudah punya akun? <Link href={route('login')} className="font-bold text-[#128c5e] hover:underline">Masuk sekarang</Link></div></div></section>
            </main>
        </div>
    );
}

function Field({ id, label, type = 'text', value, placeholder, autoComplete, onChange, error }) {
    return <div className="space-y-1.5"><label htmlFor={id} className="block text-xs font-semibold text-neutral-600">{label}</label><TextInput id={id} type={type} name={id} value={value} placeholder={placeholder} className="w-full rounded-xl border-neutral-200 bg-neutral-50/50 py-3 text-sm focus:border-[#128c5e] focus:ring-[#128c5e]" autoComplete={autoComplete} isFocused={id === 'name'} onChange={onChange} required /><InputError message={error} className="mt-2" /></div>;
}
