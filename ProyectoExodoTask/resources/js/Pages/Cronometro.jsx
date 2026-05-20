import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import VolverAtras from "@/components/VolverAtras";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import TiempoFormateado from "@/components/Formateartiempo";

export default function TimerFull({ tarea }) {
    const durationInSeconds = tarea.a_horas - tarea.a_horas_realizadas;

    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0);

    const { data, setData, patch, processing, reset, errors } = useForm({
        a_horas_realizadas: tarea.a_horas_realizadas,
    });

    let tiempoUsado = 0;
    function formatearTiempo(segundos) {
        if (segundos >= 3600) {
            return (segundos / 3600).toFixed(1) + " h";
        }
        if (segundos >= 60) {
            return Math.trunc(segundos / 60) + " min";
        }
        return segundos + " s";
    }

    return (
        <AuthenticatedLayout>
            {/* Contenedor panorámico que aprovecha el ancho de la página */}
            <div className="max-w-6xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
                {/* Botón superior - Texto con peso normal */}
                <div className="mb-8">
                    <div className="text-slate-400 hover:text-slate-100 transition-colors text-sm font-normal inline-block">
                        <VolverAtras />
                    </div>
                </div>

                {/* PANEL DE TRABAJO PRINCIPAL */}
                <div
                    className="
                        w-full
                        bg-[#050509] text-slate-100
                        rounded-3xl
                        border border-[#27272f]
                        shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                        p-8 sm:p-12 lg:p-16
                        grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16
                        items-center
                        transition-all duration-300
                    "
                >
                    {/* COLUMNA IZQUIERDA: EL CRONÓMETRO */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center w-full">
                        <div className="w-full max-w-[300px] aspect-square bg-[#0b0b12] rounded-full flex items-center justify-center border border-[#27272f] shadow-inner p-6">
                            <CountdownCircleTimer
                                key={key}
                                isPlaying={isPlaying}
                                duration={durationInSeconds}
                                colors={[
                                    "#b91c1c",
                                    "#dc2626",
                                    "#991b1b",
                                    "#7f1d1d",
                                ]}
                                colorsTime={[
                                    durationInSeconds,
                                    durationInSeconds * 0.5,
                                    durationInSeconds * 0.25,
                                    0,
                                ]}
                                size={230}
                                strokeWidth={6}
                                trailColor="#27272f"
                            >
                                {({ remainingTime }) => {
                                    const hours = Math.floor(
                                        remainingTime / 3600,
                                    );
                                    const minutes = Math.floor(
                                        (remainingTime % 3600) / 60,
                                    );
                                    const seconds = remainingTime % 60;
                                    tiempoUsado =
                                        durationInSeconds - remainingTime;

                                    return (
                                        <span
                                            className="
                                                text-4xl sm:text-5xl
                                                font-light text-slate-100
                                                tracking-tighter tabular-nums
                                            "
                                        >
                                            {String(hours).padStart(2, "0")}:
                                            {String(minutes).padStart(2, "0")}:
                                            {String(seconds).padStart(2, "0")}
                                        </span>
                                    );
                                }}
                            </CountdownCircleTimer>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: DATOS DE LA TAREA Y ACCIONES */}
                    <div className="md:col-span-7 w-full flex flex-col justify-between space-y-8 lg:space-y-12">
                        <div>
                            <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-normal block mb-2">
                                Módulo de Control Activo
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
                                {tarea.a_nombre}
                            </h2>
                        </div>

                        {/* Módulo de métricas sin negritas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#0b0b12] border border-[#27272f] p-5 rounded-2xl">
                                <span className="text-xs font-normal text-slate-400 block mb-1">
                                    Horas Asignadas
                                </span>
                                <span className="text-xl font-normal text-slate-200">
                                    <TiempoFormateado
                                        segundos={tarea.a_horas}
                                    />
                                </span>
                            </div>

                            <div className="bg-[#0b0b12] border border-[#27272f] p-5 rounded-2xl">
                                <span className="text-xs font-normal text-slate-400 block mb-1">
                                    Progreso Consumido
                                </span>
                                <span className="text-xl font-normal text-[#b91c1c]">
                                    <TiempoFormateado
                                        segundos={tarea.a_horas_realizadas}
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Botonera integrada */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#27272f]">
                            <button
                                onClick={() => setIsPlaying(true)}
                                className="
                                    flex-1 px-6 py-3 rounded-xl text-sm
                                    bg-[#b91c1c] hover:bg-[#a11818] text-white
                                    font-normal shadow-lg shadow-[#b91c1c]/20
                                    transition-all active:scale-[0.98]
                                "
                            >
                                Iniciar Sesión
                            </button>

                            <button
                                onClick={() => setIsPlaying(false)}
                                className="
                                    flex-1 px-6 py-3 rounded-xl text-sm
                                    bg-[#27272f] hover:bg-[#32323c] text-slate-100
                                    font-normal transition-all active:scale-[0.98]
                                "
                            >
                                Pausar
                            </button>

                            <button
                                onClick={() => {
                                    setIsPlaying(false);
                                    patch(route("tareas.update", tarea.id), {
                                        onBefore: () => {
                                            data.a_horas_realizadas =
                                                tiempoUsado +
                                                data.a_horas_realizadas;
                                        },
                                    });
                                }}
                                className="
                                    flex-1 px-6 py-3 rounded-xl text-sm
                                    border border-[#27272f] hover:bg-[#27272f]/30
                                    text-slate-400 hover:text-slate-200 font-normal
                                    transition-all active:scale-[0.98]
                                "
                            >
                                Finalizar Sesion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
