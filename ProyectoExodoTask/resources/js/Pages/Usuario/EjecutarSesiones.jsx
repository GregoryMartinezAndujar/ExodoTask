import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import VolverAtras from "@/components/VolverAtras";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Play, Pause, CheckCircle2 } from "lucide-react";

export default function EjecutarSesiones({ sesion }) {
    const tiempoTotal = sesion.a_tiempo_invertido;
    const [tiempoRestante, setTiempoRestante] = useState(
        sesion.a_tiempo_restante_calculado ??
            sesion.a_tiempo_restante ??
            sesion.a_tiempo_invertido,
    );

    const estaEnCurso = sesion.a_estado === "en_progreso";
    const estaFinalizada = sesion.a_estado === "finalizada";
    const tiempoConsumido = Math.max(0, tiempoTotal - tiempoRestante);

    function formatearTiempo(segundos) {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segundosRestantes = segundos % 60;

        return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;
    }

    useEffect(() => {
        setTiempoRestante(
            sesion.a_tiempo_restante_calculado ??
                sesion.a_tiempo_restante ??
                sesion.a_tiempo_invertido,
        );
    }, [
        sesion.id,
        sesion.a_tiempo_restante_calculado,
        sesion.a_tiempo_restante,
        sesion.a_tiempo_invertido,
    ]);

    useEffect(() => {
        if (!estaEnCurso || estaFinalizada) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setTiempoRestante((actual) => Math.max(0, actual - 1));
        }, 1000);

        return () => window.clearInterval(interval);
    }, [estaEnCurso, estaFinalizada]);

    const pausar = () => {
        router.patch(route("sesionesdetareas.accion", sesion.id), {
            accion: "pausar",
            a_tiempo_restante: tiempoRestante,
        });
    };

    const reanudar = () => {
        router.patch(route("sesionesdetareas.accion", sesion.id), {
            accion: "reanudar",
            a_tiempo_restante: tiempoRestante,
        });
    };

    const finalizar = () => {
        router.patch(route("sesionesdetareas.accion", sesion.id), {
            accion: "finalizar",
            a_tiempo_restante: tiempoRestante,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full gap-3">
                    <div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-800 pl-4 tracking-tight">
                            {sesion.a_nombre}
                        </h2>
                        <p className="pl-4 text-sm text-gray-500 mt-1 font-normal">
                            {sesion.a_estado === "finalizada"
                                ? "Sesión finalizada"
                                : sesion.a_estado === "en_progreso"
                                  ? "Sesión en curso"
                                  : "Sesión pausada o pendiente"}
                        </p>
                    </div>
                </div>
            }
        >
            <div className="max-w-6xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
                <div className="mb-8">
                    <div className="text-slate-400 hover:text-slate-100 transition-colors text-sm font-normal inline-block">
                        <VolverAtras />
                    </div>
                </div>

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
                    <div className="md:col-span-5 flex flex-col items-center justify-center w-full">
                        <div className="w-full max-w-[300px] aspect-square bg-[#0b0b12] rounded-full flex items-center justify-center border border-[#27272f] shadow-inner p-6">
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-normal block mb-3">
                                    Sesión de estudio
                                </span>
                                <span className="text-4xl sm:text-5xl font-light text-slate-100 tracking-tighter tabular-nums leading-none">
                                    {formatearTiempo(tiempoRestante)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 w-full flex flex-col justify-between space-y-8 lg:space-y-12">
                        <div>
                            <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-normal block mb-2">
                                Módulo de Control Activo
                            </span>
                            <h3 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
                                {sesion.a_estado === "finalizada"
                                    ? "Sesión finalizada"
                                    : sesion.a_estado === "en_progreso"
                                      ? "Sesión en curso"
                                      : "Sesión pausada o pendiente"}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#0b0b12] border border-[#27272f] p-5 rounded-2xl">
                                <span className="text-xs font-normal text-slate-400 block mb-1">
                                    Tiempo total
                                </span>
                                <span className="text-xl font-normal text-slate-200">
                                    {formatearTiempo(tiempoTotal)}
                                </span>
                            </div>

                            <div className="bg-[#0b0b12] border border-[#27272f] p-5 rounded-2xl">
                                <span className="text-xs font-normal text-slate-400 block mb-1">
                                    Restante guardado
                                </span>
                                <span className="text-xl font-normal text-[#b91c1c]">
                                    {formatearTiempo(tiempoRestante)}
                                </span>
                            </div>

                            <div className="bg-[#0b0b12] border border-[#27272f] p-5 rounded-2xl">
                                <span className="text-xs font-normal text-slate-400 block mb-1">
                                    Tiempo consumido
                                </span>
                                <span className="text-xl font-normal text-slate-200">
                                    {formatearTiempo(tiempoConsumido)}
                                </span>
                            </div>

                            <div className="bg-[#0b0b12] border border-[#27272f] p-5 rounded-2xl">
                                <span className="text-xs font-normal text-slate-400 block mb-1">
                                    Estado
                                </span>
                                <span className="text-xl font-normal text-slate-200 capitalize">
                                    {sesion.a_estado}
                                </span>
                            </div>
                        </div>

                        <div className="bg-[#0b0b12] border border-[#27272f] p-5 rounded-2xl space-y-4">
                            <div>
                                <span className="text-xs font-normal text-slate-400 block mb-1">
                                    Tareas incluidas
                                </span>
                                <h4 className="text-lg font-normal text-white tracking-tight">
                                    {sesion.tareas?.length ?? 0} tarea(s)
                                </h4>
                            </div>

                            <div className="space-y-2 max-h-40 overflow-auto pr-1">
                                {sesion.tareas?.length ? (
                                    sesion.tareas.map((tarea) => (
                                        <div
                                            key={tarea.id}
                                            className="flex items-center justify-between gap-3 rounded-xl border border-[#27272f] bg-[#050509] px-4 py-3"
                                        >
                                            <span className="truncate text-slate-100 font-normal">
                                                {tarea.a_nombre}
                                            </span>
                                            <span className="text-slate-400 whitespace-nowrap">
                                                {formatearTiempo(tarea.a_horas)}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl border border-[#27272f] bg-[#050509] px-4 py-3 text-slate-400">
                                        No hay tareas asociadas.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#27272f]">
                            <button
                                onClick={reanudar}
                                disabled={estaEnCurso || estaFinalizada}
                                className="flex-1 px-6 py-3 rounded-xl text-sm bg-[#b91c1c] hover:bg-[#a11818] text-white font-normal shadow-lg shadow-[#b91c1c]/20 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <Play className="w-4 h-4 inline-block mr-2" />
                                Reanudar
                            </button>

                            <button
                                onClick={pausar}
                                disabled={!estaEnCurso || estaFinalizada}
                                className="flex-1 px-6 py-3 rounded-xl text-sm bg-[#27272f] hover:bg-[#32323c] text-slate-100 font-normal transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <Pause className="w-4 h-4 inline-block mr-2" />
                                Pausar
                            </button>

                            <button
                                onClick={finalizar}
                                disabled={estaFinalizada}
                                className="flex-1 px-6 py-3 rounded-xl text-sm border border-[#27272f] hover:bg-[#27272f]/30 text-slate-400 hover:text-slate-200 font-normal transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <CheckCircle2 className="w-4 h-4 inline-block mr-2" />
                                Finalizar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
