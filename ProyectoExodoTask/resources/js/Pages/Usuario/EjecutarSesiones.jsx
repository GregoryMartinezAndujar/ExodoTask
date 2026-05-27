import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import VolverAtras from "@/components/VolverAtras";
import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, CheckCircle2, Check, X, ChevronDown } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    confirmarFinalizarSesion,
    completarTarea,
    descompletarTarea,
} from "@/components/Alerts";

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

    const refTiempoRestante = useRef(tiempoRestante);
    const refEstaEnCurso = useRef(estaEnCurso);
    const refEstaFinalizada = useRef(estaFinalizada);
    refTiempoRestante.current = tiempoRestante;
    refEstaEnCurso.current = estaEnCurso;
    refEstaFinalizada.current = estaFinalizada;

    function displayEstado(estado) {
        if (!estado) return "";
        // Map known internal states to user-friendly labels
        switch (estado) {
            case "finalizada":
                return "Finalizada";
            case "en_progreso":
                return "En curso";
            case "pausada":
                return "Pausada";
            case "pendiente":
                return "Sin iniciar";
            default:
                // Fallback: replace underscores with spaces and capitalize first letter
                const s = estado.replace(/_/g, " ");
                return s.charAt(0).toUpperCase() + s.slice(1);
        }
    }

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

    const [tareasLocal, setTareasLocal] = useState(sesion.tareas ?? []);
    const [tareasOpen, setTareasOpen] = useState(false);

    useEffect(() => {
        setTareasLocal(sesion.tareas ?? []);
    }, [sesion.tareas, sesion.id]);

    const toggleCompletarTarea = async (e, tarea) => {
        e.stopPropagation();

        if (!tarea) return;

        // Si no está completada -> confirmar completar
        if (!tarea.a_completada) {
            const ok = await completarTarea();
            if (!ok) return;
        } else {
            const ok = await descompletarTarea();
            if (!ok) return;
        }

        // Optimistic update
        setTareasLocal((prev) =>
            prev.map((t) =>
                t.id === tarea.id ? { ...t, a_completada: !t.a_completada } : t,
            ),
        );

        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        try {
            await axios.post(
                route("tareas.update", tarea.id),
                { _method: "PATCH", a_completada: !tarea.a_completada },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        ...(csrf ? { "X-CSRF-TOKEN": csrf } : {}),
                    },
                },
            );
        } catch (err) {
            // Revert on error
            setTareasLocal((prev) =>
                prev.map((t) =>
                    t.id === tarea.id
                        ? { ...t, a_completada: tarea.a_completada }
                        : t,
                ),
            );

            const message =
                err?.response?.data?.message ||
                err.message ||
                "Error al actualizar la tarea";
            Swal.fire({ title: "Error", text: message, icon: "error" });
        }
    };

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
        // Prefer AJAX so backend can return JSON and avoid full redirects
        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        axios
            .post(
                route("sesionesdetareas.accion", sesion.id),
                {
                    _method: "PATCH",
                    accion: "pausar",
                    a_tiempo_restante: tiempoRestante,
                },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        ...(csrf ? { "X-CSRF-TOKEN": csrf } : {}),
                    },
                },
            )
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    text:
                        err?.response?.data?.message ||
                        err.message ||
                        "Error al pausar la sesión",
                    icon: "error",
                });
            });
    };

    const reanudar = () => {
        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        axios
            .post(
                route("sesionesdetareas.accion", sesion.id),
                {
                    _method: "PATCH",
                    accion: "reanudar",
                    a_tiempo_restante: tiempoRestante,
                },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        ...(csrf ? { "X-CSRF-TOKEN": csrf } : {}),
                    },
                },
            )
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    text:
                        err?.response?.data?.message ||
                        err.message ||
                        "Error al reanudar la sesión",
                    icon: "error",
                });
            });
    };

    const confirmarFinalizar = async () => {
        if (await confirmarFinalizarSesion()) {
            const csrf = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            axios
                .post(
                    route("sesionesdetareas.accion", sesion.id),
                    {
                        _method: "PATCH",
                        accion: "finalizar",
                        a_tiempo_restante: tiempoRestante,
                    },
                    {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            ...(csrf ? { "X-CSRF-TOKEN": csrf } : {}),
                        },
                    },
                )
                .catch((err) => {
                    Swal.fire({
                        title: "Error",
                        text:
                            err?.response?.data?.message ||
                            err.message ||
                            "Error al finalizar la sesión",
                        icon: "error",
                    });
                });
        }
    };

    // Pause session automatically when the component unmounts (e.g., user navigates away / back button)
    useEffect(() => {
        return () => {
            if (refEstaEnCurso.current && !refEstaFinalizada.current) {
                const csrf = document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content");

                try {
                    const url = route("sesionesdetareas.accion", sesion.id);
                    const payload = new URLSearchParams();
                    payload.append("_method", "PATCH");
                    payload.append("accion", "pausar");
                    payload.append("a_tiempo_restante", String(refTiempoRestante.current));
                    if (csrf) payload.append("_token", csrf);

                    if (navigator && navigator.sendBeacon) {
                        const blob = new Blob([payload.toString()], {
                            type: "application/x-www-form-urlencoded",
                        });
                        navigator.sendBeacon(url, blob);
                    } else {
                        const xhr = new XMLHttpRequest();
                        xhr.open("POST", url, false);
                        if (csrf) xhr.setRequestHeader("X-CSRF-TOKEN", csrf);
                        xhr.setRequestHeader(
                            "Content-Type",
                            "application/x-www-form-urlencoded",
                        );
                        xhr.setRequestHeader(
                            "X-Requested-With",
                            "XMLHttpRequest",
                        );
                        xhr.send(payload.toString());
                    }
                } catch (e) {
                    // swallow errors on unmount
                }
            }
        };
    }, [sesion.id]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full gap-3">
                    <div>
                        <h2 className="text-lg sm:text-3xl lg:text-5xl text-gray-800 pl-4 tracking-tight">
                            {sesion.a_nombre}
                        </h2>
                        <p className="hidden sm:block pl-4 text-sm text-gray-500 mt-1 font-normal">
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
            <div className="max-w-6xl mx-auto w-full px-2 py-1 sm:px-6 lg:px-8 h-full flex flex-col">
                <div className="mb-1 md:mb-2">
                    <div className="text-slate-400 hover:text-slate-100 transition-colors text-sm font-normal inline-block">
                        <VolverAtras />
                    </div>
                </div>

                <div
                    className="
                        w-full flex-1 min-h-0
                        bg-[#050509] text-slate-100
                        rounded-2xl md:rounded-3xl
                        border border-[#27272f]
                        shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                        p-2 md:p-6 lg:p-8
                        flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-8 lg:gap-12
                        transition-all duration-300
                    "
                >
                    <div className="md:col-span-5 flex flex-col items-center justify-center w-full self-center">
                        <div className="w-full max-w-[160px] md:max-w-[220px] lg:max-w-[300px] aspect-square bg-[#0b0b12] rounded-full flex items-center justify-center border border-[#27272f] shadow-inner p-2 md:p-4">
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className="hidden md:block text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-slate-400 font-normal mb-1 md:mb-2">
                                    Sesión de estudio
                                </span>
                                <span className="text-xl md:text-3xl lg:text-4xl font-light text-slate-100 tracking-tighter tabular-nums leading-none">
                                    {formatearTiempo(tiempoRestante)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 w-full flex flex-col min-h-0 space-y-1.5 md:space-y-4">
                        <div className="hidden md:block">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-normal block mb-1">
                                Módulo de Control Activo
                            </span>
                            <h3 className="text-lg sm:text-xl font-normal text-white tracking-tight">
                                {sesion.a_estado === "finalizada"
                                    ? "Sesión finalizada"
                                    : sesion.a_estado === "en_progreso"
                                      ? "Sesión en curso"
                                      : "Sesión pausada o pendiente"}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-1 md:gap-2">
                            <div className="bg-[#0b0b12] border border-[#27272f] p-2 md:p-3 rounded-xl md:rounded-2xl">
                                <span className="text-[10px] md:text-xs font-normal text-slate-400 block mb-0.5 md:mb-1">
                                    Tiempo total
                                </span>
                                <span className="text-xs md:text-lg font-normal text-slate-200">
                                    {formatearTiempo(tiempoTotal)}
                                </span>
                            </div>

                            <div className="bg-[#0b0b12] border border-[#27272f] p-2 md:p-3 rounded-xl md:rounded-2xl">
                                <span className="text-[10px] md:text-xs font-normal text-slate-400 block mb-0.5 md:mb-1">
                                    Restante
                                </span>
                                <span className="text-xs md:text-lg font-normal text-[#b91c1c]">
                                    {formatearTiempo(tiempoRestante)}
                                </span>
                            </div>

                            <div className="bg-[#0b0b12] border border-[#27272f] p-2 md:p-3 rounded-xl md:rounded-2xl">
                                <span className="text-[10px] md:text-xs font-normal text-slate-400 block mb-0.5 md:mb-1">
                                    Consumido
                                </span>
                                <span className="text-xs md:text-lg font-normal text-slate-200">
                                    {formatearTiempo(tiempoConsumido)}
                                </span>
                            </div>

                            <div className="bg-[#0b0b12] border border-[#27272f] p-2 md:p-3 rounded-xl md:rounded-2xl">
                                <span className="text-[10px] md:text-xs font-normal text-slate-400 block mb-0.5 md:mb-1">
                                    Estado
                                </span>
                                <span className="text-xs md:text-lg font-normal text-slate-200 capitalize">
                                    {displayEstado(sesion.a_estado)}
                                </span>
                            </div>
                        </div>

                        {/* Tasks - dropdown on mobile, always visible on desktop */}
                        <div className="bg-[#0b0b12] border border-[#27272f] p-2 md:p-4 rounded-xl md:rounded-2xl space-y-1 md:space-y-2 flex flex-col">
                            {/* Mobile toggle */}
                            <button
                                type="button"
                                onClick={() => setTareasOpen((prev) => !prev)}
                                className="md:hidden flex items-center justify-between w-full"
                            >
                                <div className="text-left">
                                    <span className="text-[10px] font-normal text-slate-400 block mb-0.5">
                                        Tareas incluidas
                                    </span>
                                    <h4 className="text-xs font-normal text-white tracking-tight">
                                        {sesion.tareas?.length ?? 0} tarea(s)
                                    </h4>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${tareasOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Desktop header */}
                        <div className="hidden md:block">
                                <span className="text-xs font-normal text-slate-400 block mb-1">
                                    Tareas incluidas
                                </span>
                                <h4 className="text-base font-normal text-white tracking-tight">
                                    {sesion.tareas?.length ?? 0} tarea(s)
                                </h4>
                            </div>

                            <div
                                className={`${tareasOpen ? "block" : "hidden"} md:block space-y-0.5 md:space-y-1 pr-1`}
                            >
                                {tareasLocal && tareasLocal.length ? (
                                    tareasLocal.map((tarea) => (
                                        <div
                                            key={tarea.id}
                                            className="flex items-center justify-between gap-1 md:gap-2 rounded-lg md:rounded-xl border border-[#27272f] bg-[#050509] px-2 py-1.5 md:px-3 md:py-2"
                                        >
                                            <div className="flex items-center gap-1 md:gap-2 min-w-0">
                                                <button
                                                    onClick={(e) =>
                                                        toggleCompletarTarea(
                                                            e,
                                                            tarea,
                                                        )
                                                    }
                                                    className={`flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded ${tarea.a_completada ? "bg-green-600 text-white" : "bg-gray-700 text-white"}`}
                                                >
                                                    {tarea.a_completada ? (
                                                        <Check className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                                    ) : (
                                                        <X className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                                    )}
                                                </button>

                                                <span className="truncate text-xs md:text-sm text-slate-100 font-normal">
                                                    {tarea.a_nombre}
                                                </span>
                                            </div>

                                            <span className="text-[10px] md:text-xs text-slate-400 whitespace-nowrap">
                                                {formatearTiempo(tarea.a_horas)}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-lg md:rounded-xl border border-[#27272f] bg-[#050509] px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-slate-400">
                                        No hay tareas asociadas.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`${tareasOpen ? "hidden" : "flex"} md:flex flex-col md:flex-row gap-1 md:gap-2 pt-1 md:pt-2 border-t border-[#27272f]`}>
                            <button
                                onClick={reanudar}
                                disabled={estaEnCurso || estaFinalizada}
                                className="flex-1 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs bg-[#b91c1c] hover:bg-[#a11818] text-white font-normal shadow-lg shadow-[#b91c1c]/20 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <Play className="w-2.5 h-2.5 md:w-3 md:h-3 inline-block mr-0.5 md:mr-1" />
                                Reanudar
                            </button>

                            <button
                                onClick={pausar}
                                disabled={!estaEnCurso || estaFinalizada}
                                className="flex-1 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs bg-[#27272f] hover:bg-[#32323c] text-slate-100 font-normal transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <Pause className="w-2.5 h-2.5 md:w-3 md:h-3 inline-block mr-0.5 md:mr-1" />
                                Pausar
                            </button>

                            <button
                                onClick={confirmarFinalizar}
                                disabled={estaFinalizada}
                                className="flex-1 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs border border-[#27272f] hover:bg-[#27272f]/30 text-slate-400 hover:text-slate-200 font-normal transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3 inline-block mr-0.5 md:mr-1" />
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
