import EnvelopeAnimation from "./EnvelopeAnimation";

export default function EnvelopeOverlay({ variant, caption, exiting = false }) {
    return (
        <div
            className={
                "fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-violet-50 via-white to-indigo-50 transition-opacity duration-500 " +
                (exiting ? "opacity-0" : "opacity-100")
            }
        >
            <EnvelopeAnimation variant={variant} float />

            {caption && (
                <p className="mt-10 text-lg font-semibold text-violet-700">
                    {caption}
                </p>
            )}
        </div>
    );
}