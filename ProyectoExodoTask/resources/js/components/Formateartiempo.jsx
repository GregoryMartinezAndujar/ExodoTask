// resources/js/Components/TiempoFormateado.jsx

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
