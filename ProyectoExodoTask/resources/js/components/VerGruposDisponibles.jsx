import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { eliminarGrupo } from "./Alerts";
import { FolderKanban, Clock3, Timer } from "lucide-react";
import TiempoFormateado from "./Formateartiempo";
dayjs.extend(relativeTime);

const VerGrupos = ({ grupo, tareas }) => {
    const { delete: destroy } = useForm({});

    const tareasDelGrupo = tareas.filter(
        (tarea) => tarea.a_grupo_id === grupo.id,
    );
    const tareasCompeltadasGrupo = tareasDelGrupo.filter(
        (tarea) => tarea.a_completada === true,
    );
    const tareasPendientesGrupo = tareasDelGrupo.filter(
        (tarea) => tarea.a_completada === false,
    );

    const tiempoTotalGrupo = tareasDelGrupo.reduce(
        (total, tarea) => total + tarea.a_horas,
        0,
    );
    const tiempoTotalRealizadoGrupo = tareasDelGrupo.reduce(
        (total, tarea) => total + tarea.a_horas_realizadas,
        0,
    );
    return (
        <div className="w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow transition-all duration-300">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                            <FolderKanban className="w-4 h-4" />
                        </div>

                        <p className="text-2xl text-gray-900 truncate">
                            {grupo.a_nombre}
                        </p>

                        <div className="flex items-center gap-1.5 text-gray-800">
                            <Clock3 className="w-4 h-4 text-gray-500" />
                            <span>
                                Horas totales:{" "}
                                <TiempoFormateado segundos={tiempoTotalGrupo} />
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-gray-800">
                            <Timer className="w-4 h-4 text-gray-500" />
                            <span>
                                Realizadas:{" "}
                                <TiempoFormateado
                                    segundos={tiempoTotalRealizadoGrupo}
                                />
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                            {tareasDelGrupo.length} tarea
                            {tareasDelGrupo.length === 1 ? "" : "s"}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                            {tareasCompeltadasGrupo.length} completada
                            {tareasCompeltadasGrupo.length === 1 ? "" : "s"}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                            {tareasPendientesGrupo.length} pendiente
                            {tareasPendientesGrupo.length === 1 ? "" : "s"}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-t border-gray-200 pt-3">
                    <small className="text-gray-500 text-sm">
                        Creado {dayjs(grupo.created_at).fromNow()} · Actualizado{" "}
                        {dayjs(grupo.updated_at).fromNow()}
                    </small>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                        <PrimaryButton
                            className="text-white"
                            onClick={() =>
                                router.get(route("grupos.tareas", grupo.id))
                            }
                        >
                            Ver tareas
                        </PrimaryButton>

                        <PrimaryButton
                            className="text-white"
                            onClick={() =>
                                router.get(route("editar.grupo", grupo.id))
                            }
                        >
                            Editar
                        </PrimaryButton>

                        <DangerButton
                            className="text-white"
                            onClick={async () => {
                                if (await eliminarGrupo()) {
                                    destroy(
                                        route(
                                            "gruposdetareas.destroy",
                                            grupo.id,
                                        ),
                                    );
                                }
                            }}
                        >
                            Eliminar
                        </DangerButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerGrupos;
