import { Link } from "@inertiajs/react";

export default function PageHeader({
    title,
    description,
    buttonText,
    buttonHref,
}) {
    return (
        <div className="mb-8 flex items-center justify-between">

            <div>
                <h1 className="text-3xl font-bold">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 text-gray-500">
                        {description}
                    </p>
                )}
            </div>

            {buttonHref && (
                <Link
                    href={buttonHref}
                    className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
                >
                    {buttonText}
                </Link>
            )}

        </div>
    );
}