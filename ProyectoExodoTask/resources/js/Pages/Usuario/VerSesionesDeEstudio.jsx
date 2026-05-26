import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TiempoFormateado from "@/components/Formateartiempo";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Eye, Trash2, PlayCircle, Timer } from "lucide-react";
import { confirmarEliminarSesion } from "@/components/Alerts";

export default function VerSesionesDeEstudio({ sesiones }) {
    const { delete: destroy } = useForm({});
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (
        <AuthenticatedLayout
            title="Sesiones de estudio"
            header={
                <div className="flex items-center space-x-3">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl pl-4 text-gray-800">
                        Sesiones de estudio
                    </h2>
                </div>
            }
        >
            <div className="w-full max-w-7xl mx-auto p-4">
                {sesiones.length === 0 ? (
                    <div className="p-6 bg-white shadow-sm rounded-xl border border-gray-200 text-center">
                        <p className="text-gray-500 text-base">
                            No hay sesiones registradas.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sesiones.map((sesion) => (
                            <div
                                key={sesion.id}
                                onClick={() => toggleExpand(sesion.id)}
                                className={`
                                    w-full rounded-xl px-4 py-3
                                    flex flex-col gap-3
                                    transition-all duration-200 ease-out
                                    shadow-sm hover:shadow
                                    bg-white border cursor-pointer
                                    ${
                                        !sesion.a_finalizada
                                            ? "border-[#b91c1c]"
                                            : "border-gray-200"
                                    }
                                `}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                                        <span
                                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                                sesion.a_finalizada
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            <span className="text-xs font-light">
                                                {sesion.a_finalizada
                                                    ? "✓"
                                                    : "✕"}
                                            </span>
                                        </span>

                                        <p className="text-2xl text-gray-900 tracking-tight truncate font-normal">
                                            {sesion.a_nombre}
                                        </p>

                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-base border-none ${
                                                sesion.a_estado === "finalizada"
                                                    ? "bg-green-100 text-green-700"
                                                    : sesion.a_estado ===
                                                        "en_progreso"
                                                      ? "bg-blue-100 text-blue-700"
                                                      : "bg-[#FCA5A5] text-red-700"
                                            }`}
                                        >
                                            {sesion.a_estado === "finalizada"
                                                ? "Finalizada"
                                                : sesion.a_estado ===
                                                    "en_progreso"
                                                  ? "En curso"
                                                  : sesion.a_estado ===
                                                      "pausada"
                                                    ? "Pausada"
                                                    : "Sin iniciar"}
                                        </span>
                                    </div>

                                    <div className="hidden sm:flex gap-1 w-fit">
                                        <button
                                            className="inline-flex items-center justify-center p-1.5 rounded bg-[#1e293b] hover:bg-slate-700 text-white transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.get(
                                                    route(
                                                        "sesionesdetareas.ejecutar",
                                                        sesion.id,
                                                    ),
                                                );
                                            }}
                                        >
                                            <Timer className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center p-1.5 rounded bg-[#b91c1c] hover:bg-red-700 text-white transition-colors"
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                if (
                                                    await confirmarEliminarSesion()
                                                ) {
                                                    destroy(
                                                        route(
                                                            "sesionesdetareas.destroy",
                                                            sesion.id,
                                                        ),
                                                    );
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-base border-t border-gray-200 pt-2 text-gray-700">
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-400">
                                            Fecha:
                                        </span>
                                        <span className="text-gray-900">
                                            {new Date(
                                                sesion.a_fecha,
                                            ).toLocaleString([], {
                                                dateStyle: "short",
                                                timeStyle: "short",
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-400">
                                            Tiempo total:
                                        </span>
                                        <span className="text-gray-900">
                                            <TiempoFormateado
                                                segundos={
                                                    sesion.a_tiempo_invertido
                                                }
                                            />
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-400">
                                            Restante:
                                        </span>
                                        <span className="text-gray-900">
                                            <TiempoFormateado
                                                segundos={
                                                    sesion.a_tiempo_restante_calculado ??
                                                    sesion.a_tiempo_restante ??
                                                    sesion.a_tiempo_invertido
                                                }
                                            />
                                        </span>
                                    </div>

                                    {sesion.created_at && (
                                        <div className="sm:ml-auto text-gray-400 text-sm">
                                            <span>
                                                Sesión de estudio de tu
                                                actividad
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex sm:hidden flex-wrap gap-2 border-t border-gray-100 pt-2 mt-1 justify-end">
                                    <button
                                        className="inline-flex items-center justify-center p-2 rounded bg-[#1e293b] text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.get(
                                                route(
                                                    "sesionesdetareas.ejecutar",
                                                    sesion.id,
                                                ),
                                            );
                                        }}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>

                                    <button
                                        className="inline-flex items-center justify-center p-2 rounded bg-[#1e293b] text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.get(
                                                route(
                                                    "sesionesdetareas.ejecutar",
                                                    sesion.id,
                                                ),
                                            );
                                        }}
                                    >
                                        <PlayCircle className="w-4 h-4" />
                                    </button>

                                    <button
                                        className="inline-flex items-center justify-center p-2 rounded bg-[#b91c1c] text-white"
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            if (
                                                await confirmarEliminarSesion()
                                            ) {
                                                destroy(
                                                    route(
                                                        "sesionesdetareas.destroy",
                                                        sesion.id,
                                                    ),
                                                );
                                            }
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                {expandedId === sesion.id && (
                                    <div className="mt-3 bg-gray-50 border border-gray-100 rounded-lg p-3">
                                        <h4 className="text-sm text-gray-500 mb-2">
                                            Tareas de la sesión
                                        </h4>
                                        {sesion.tareas &&
                                        sesion.tareas.length ? (
                                            <div className="space-y-2">
                                                {sesion.tareas.map((t) => (
                                                    <div
                                                        key={t.id}
                                                        className="flex items-center justify-between p-2 bg-white border rounded"
                                                    >
                                                        <span className="text-gray-800 truncate">
                                                            {t.a_nombre}
                                                        </span>
                                                        <span className="text-gray-600">
                                                            <TiempoFormateado
                                                                segundos={
                                                                    t.a_horas
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500">
                                                No hay tareas asociadas
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
