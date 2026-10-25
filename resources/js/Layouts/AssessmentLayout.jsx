import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AssessmentLayout({ children }) {
    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-slate-50 py-10">
                <div className="mx-auto max-w-5xl px-6">
                    {children}
                </div>
            </div>
        </AuthenticatedLayout>
    );    
}