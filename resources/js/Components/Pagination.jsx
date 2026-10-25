import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="mt-8 flex items-center justify-center gap-2">

            {links.map((link, index) => (

                <Link
                    key={index}
                    href={link.url || "#"}
                    dangerouslySetInnerHTML={{
                        __html: link.label,
                    }}
                    className={`rounded-lg border px-4 py-2 text-sm transition
                    ${
                        link.active
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-gray-300 bg-white hover:bg-gray-100"
                    }
                    ${
                        !link.url
                            ? "pointer-events-none opacity-50"
                            : ""
                    }`}
                />

            ))}

        </div>
    );
}