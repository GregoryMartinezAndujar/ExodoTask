import { ArrowBigLeftDashIcon } from "lucide-react";

export default function VolverAtras({ className = "" }) {
    const volver = () => window.history.back();

    return (
        <button
            type="button"
            onClick={volver}
            aria-label="Volver atrás"
            className={`inline-flex items-center text-slate-600 hover:text-slate-900 transition-all duration-200 ease-out hover:-translate-x-1 hover:scale-110 active:scale-95 ${className}`}
        >
            <ArrowBigLeftDashIcon size={32} />
        </button>
    );
}
