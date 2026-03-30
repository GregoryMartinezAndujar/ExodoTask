import { ArrowBigLeftDashIcon } from "lucide-react";

export default function VolverAtras({ className = "" }) {
    const volver = () => window.history.back();

    return (
        <ArrowBigLeftDashIcon
            size={32}
            onClick={volver}
            className={`
                cursor-pointer text-slate-600
                transition-all duration-200 ease-out
                hover:text-slate-900
                hover:-translate-x-1 hover:scale-110
                active:scale-95
                ${className}
            `}
        />
    );
}
