export default function EnvelopeAnimation({
    variant = "closed",
    float = false,
    showDearLabel = false,
}) {
    const envelopeClass =
        variant === "opening"
            ? "envelope--opening"
            : variant === "closing"
              ? "envelope--closing"
              : variant === "open"
                ? "envelope--open"
                : "envelope--closed";

    return (
        <div className="envelope-scene">
            <div
                className={
                    "envelope " +
                    envelopeClass +
                    (float ? " envelope--float" : "")
                }
            >
                {/* Badan amplop */}
                <div className="envelope__body" />

                {/* Kertas surat */}
                <div className="envelope__letter">
                    {showDearLabel && (
                        <p className="font-handwriting text-[15px] leading-none text-gray-500">
                            Dear Little Me,
                        </p>
                    )}
                    <div className="envelope__letter-line envelope__letter-line--short" />
                    <div className="envelope__letter-line" />
                    <div className="envelope__letter-line envelope__letter-line--long" />
                    <div className="envelope__letter-line envelope__letter-line--long" />
                    <div className="envelope__letter-line envelope__letter-line--short" />
                </div>

                {/* Lipatan amplop */}
                <div className="envelope__flap envelope__flap--bottom" />
                <div className="envelope__flap envelope__flap--left" />
                <div className="envelope__flap envelope__flap--right" />
                <div className="envelope__flap envelope__flap--top" />
            </div>
        </div>
    );
}