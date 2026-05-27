export function formatearAHorasMinutos(segundos) {
    const h = String(Math.floor(segundos / 3600)).padStart(2, "0");
    const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
    const s = String(segundos % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

export default function TiempoFormateado({ segundos }) {
    function formatearTiempo(segundos) {
        if (segundos >= 3600) {
            return (segundos / 3600).toFixed(1) + " h";
        }
        if (segundos >= 60) {
            return Math.trunc(segundos / 60) + " min";
        }
        return segundos + " s";
    }

    return <span>{formatearTiempo(segundos)}</span>;
}
