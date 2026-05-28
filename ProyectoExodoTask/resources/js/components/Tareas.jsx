import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import "dayjs/locale/es";
import CheckButton from "./CheckButton";
import TiempoFormateado from "./Formateartiempo";
import Tooltip from "./Tooltip";
import {
    Trash2,
    Play,
    Pencil,
    Check,
    ChevronDown,
    X,
    CheckCircle,
    Eye,
    ListMinus,
    UserMinus,
} from "lucide-react";

import {
    eliminarTarea,
    completarTarea,
    descompletarTarea,
    eliminarTareaDelGrupo,
} from "./Alerts";

dayjs.extend(relativeTime);
dayjs.locale("es");

const Tarea = ({
    tarea,
    ruta = "dashboard",
    onAddTarea = () => {},
    onRemoveTarea = () => {},
    grupos = [],
    prioridades = [],
}) => {
    const [tareasConBorde, setTareasConBorde] = useState(false);
    const {
        data,
        patch,
        delete: destroy,
    } = useForm({
        a_completada: tarea.a_completada,
        a_prioridad_id: tarea.a_prioridad_id,
    });
    let dias = dayjs(tarea.a_fecha_limite).diff(dayjs(), "day");
    return (
        <div
            className={`
                w-full rounded-xl px-4 py-3
                flex flex-col gap-3
                transition-all duration-200 ease-out
                shadow-sm hover:shadow
                bg-white
                ${
                    dias <= 1 &&
                    tarea.a_completada === false &&
                    tareasConBorde === false
                        ? "border border-[#b91c1c]"
                        : tareasConBorde
                          ? "border border-[#0e7490]"
                          : "border border-gray-200"
                }
            `}
        >
            {/* FILA 1: Nombre + Estado + Botones (solo escritorio) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                {/* Nombre + Estado */}
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                    <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            data.a_completada
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {data.a_completada ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <X className="w-4 h-4" />
                        )}
                    </span>

                    <p className="text-2xl text-gray-900 tracking-tight truncate">
                        {tarea.a_nombre}
                    </p>

                    <span
                        className={`
                            px-2.5 py-0.5 rounded-full text-base
                            ${
                                data.a_completada
                                    ? "bg-green-100 text-green-700"
                                    : "bg-[#FCA5A5] text-red-700"
                            }
                        `}
                    >
                        {data.a_completada ? "Completada" : "Pendiente"}
                    </span>
                    {ruta === "dashboard" && Array.isArray(prioridades) && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="bg-white border border-gray-300 rounded px-2.5 py-1 shadow-sm hover:bg-gray-50 transition text-base flex items-center gap-1">
                                    {prioridades.find(
                                        (p) => p.id === tarea.a_prioridad_id,
                                    )?.a_nombre ?? "Sin prioridad"}
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content
                                contentClasses="bg-white py-1 rounded-md shadow-lg border border-gray-200"
                                align="left"
                                width="48"
                            >
                                {prioridades.map((prioridad) => (
                                    <div
                                        key={prioridad.id}
                                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-gray-700 text-base"
                                        onClick={() => {
                                            patch(
                                                route(
                                                    "tareas.update",
                                                    tarea.id,
                                                ),
                                                {
                                                    onBefore: () => {
                                                        data.a_prioridad_id =
                                                            prioridad.id;
                                                    },
                                                },
                                            );
                                        }}
                                    >
                                        {prioridad.a_nombre}
                                    </div>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>

                {/* BOTONES ESCRITORIO */}
                <div className="hidden sm:flex gap-1 w-fit">
                    {(ruta === "dashboard" || ruta === "grupos.tareas") && (
                        <>
                            <Tooltip text={data.a_completada ? "Desmarcar como completada" : "Marcar como completada"}>
                            <CheckButton
                                aria-label={data.a_completada ? "Desmarcar como completada" : "Marcar como completada"}
                                className={`text-sm py-1.5 flex items-center gap-1  ${
                                    data.a_completada
                                        ? "  bg-[#FCA5A5] text-red-600 hover:bg-red-700"
                                        : " bg-green-400 hover:bg-green-700"
                                } `}
                                onClick={async () => {
                                    if (!data.a_completada) {
                                        if (await completarTarea()) {
                                            patch(
                                                route(
                                                    "tareas.update",
                                                    tarea.id,
                                                ),
                                                {
                                                    onBefore: () => {
                                                        data.a_completada = true;
                                                    },
                                                },
                                            );
                                        }
                                    } else {
                                        if (await descompletarTarea()) {
                                            patch(
                                                route(
                                                    "tareas.update",
                                                    tarea.id,
                                                ),
                                                {
                                                    onBefore: () => {
                                                        data.a_completada = false;
                                                    },
                                                },
                                            );
                                        }
                                    }
                                }}
                            >
                                {data.a_completada ? (
                                    <X className="w-4 h-4" />
                                ) : (
                                    <CheckCircle className="w-4 h-4" />
                                )}
                            </CheckButton>
                            </Tooltip>

                            <Tooltip text="Editar tarea">
                            <PrimaryButton
                                aria-label="Editar tarea"
                                className="text-sm py-1.5"
                                onClick={() =>
                                    router.get(route("tareas.edit", tarea.id))
                                }
                            >
                                <Pencil className="w-4 h-4" />
                            </PrimaryButton>
                            </Tooltip>

                            {!tarea.a_completada && (
                                <Tooltip text="Iniciar cronómetro">
                                <PrimaryButton
                                    aria-label="Iniciar cronómetro"
                                    className="text-sm py-1.5 flex items-center gap-1"
                                    onClick={() =>
                                        router.get(
                                            route(
                                                "tareas.cronometro",
                                                tarea.id,
                                            ),
                                        )
                                    }
                                >
                                    <Play className="w-4 h-4" />
                                </PrimaryButton>
                                </Tooltip>
                            )}
                            <Tooltip text="Ver detalle">
                            <PrimaryButton
                                aria-label="Ver detalle"
                                onClick={() =>
                                    router.get(
                                        route("tareas.verTarea", tarea.id),
                                    )
                                }
                            >
                                <Eye className="w-4 h-4" />
                            </PrimaryButton>
                            </Tooltip>
                            {grupos.length == 0 && ruta === "grupos.tareas" && (
                                <Tooltip text="Eliminar del grupo">
                                <DangerButton
                                    aria-label="Eliminar del grupo"
                                    className="text-sm py-1.5"
                                    onClick={async () => {
                                        if (await eliminarTareaDelGrupo()) {
                                            router.get(
                                                route(
                                                    "tareas.eliminarDelGrupo",
                                                    tarea.id,
                                                ),
                                            );
                                        }
                                    }}
                                >
                                    <ListMinus className="w-4 h-4" />
                                </DangerButton>
                                </Tooltip>
                            )}

                            <Tooltip text="Eliminar tarea">
                            <DangerButton
                                aria-label="Eliminar tarea"
                                className="text-sm py-1.5 bg-[#A90000] hover:bg-red-700 flex items-center gap-1"
                                onClick={async () => {
                                    if (await eliminarTarea()) {
                                        destroy(
                                            route("tareas.destroy", tarea.id),
                                        );
                                    }
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </DangerButton>
                            </Tooltip>
                        </>
                    )}
                </div>
            </div>

            {/* FILA 2: Datos resumidos */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-base border-t border-gray-200 pt-2 text-gray-700">
                <span>
                    {tarea.a_grupo_id
                        ? grupos.find((g) => g.id === tarea.a_grupo_id)
                              ?.a_nombre
                        : "Sin grupo"}
                </span>

                <span>
                    Est:{" "}
                    <span className="text-gray-900">
                        <TiempoFormateado segundos={tarea.a_horas} />
                    </span>
                </span>

                <span>
                    Real:{" "}
                    <span className="text-gray-900">
                        <TiempoFormateado segundos={tarea.a_horas_realizadas} />
                    </span>
                </span>

                <span>
                    Limite:{" "}
                    <span className="text-red-700">
                        {dayjs(tarea.a_fecha_limite).format("DD/MM/YYYY")}
                    </span>
                </span>

                <span className="sm:ml-auto text-gray-700">
                    Creada: {dayjs(tarea.created_at).fromNow()} | Actualizada:{" "}
                    {dayjs(tarea.updated_at).fromNow()}
                </span>
            </div>

            {/* FILA 3: Descripción */}

            {(ruta === "gruposdetareas.create" || ruta === "editar.grupo") && (
                <>
                    <PrimaryButton
                        className="w-full text-sm py-1 hover:bg-[#A90000]"
                        onClick={() => {
                            onAddTarea(tarea.id);
                            setTareasConBorde(true);
                        }}
                    >
                        Añadir al Grupo
                    </PrimaryButton>

                    <DangerButton
                        className="w-full text-sm py-1 hover:bg-[#A90000]"
                        onClick={() => {
                            onRemoveTarea(tarea.id);
                            setTareasConBorde(false);
                        }}
                    >
                        Eliminar del Grupo
                    </DangerButton>
                </>
            )}

            {/* BOTONES MÓVIL (ABAJO DEL TODO) */}
            <div className="flex sm:hidden flex-wrap  gap-2">
                    {(ruta === "grupos.tareas" || ruta === "dashboard") && (
                    <>
                        <Tooltip text={data.a_completada ? "Desmarcar como completada" : "Marcar como completada"}>
                        <PrimaryButton
                            aria-label={data.a_completada ? "Desmarcar como completada" : "Marcar como completada"}
                            className="text-sm p-1.5 flex items-center justify-center"
                            onClick={async () => {
                                if (!data.a_completada) {
                                    if (await completarTarea()) {
                                        patch(
                                            route("tareas.update", tarea.id),
                                            {
                                                onBefore: () => {
                                                    data.a_completada = true;
                                                },
                                            },
                                        );
                                    }
                                } else {
                                    if (await descompletarTarea()) {
                                        patch(
                                            route("tareas.update", tarea.id),
                                            {
                                                onBefore: () => {
                                                    data.a_completada = false;
                                                },
                                            },
                                        );
                                    }
                                }
                            }}
                        >
                            {data.a_completada ? (
                                <X className="w-4 h-4" />
                            ) : (
                                <Check className="w-4 h-4" />
                            )}
                        </PrimaryButton>
                        </Tooltip>

                        <Tooltip text="Editar tarea">
                        <PrimaryButton
                            aria-label="Editar tarea"
                            className="text-sm p-1.5 flex items-center justify-center"
                            onClick={() =>
                                router.get(route("tareas.edit", tarea.id))
                            }
                        >
                            <Pencil className="w-4 h-4" />
                        </PrimaryButton>
                        </Tooltip>

                        <Tooltip text="Iniciar cronómetro">
                        <PrimaryButton
                            aria-label="Iniciar cronómetro"
                            className="text-sm p-1.5 flex items-center justify-center"
                            onClick={() =>
                                router.get(route("tareas.edit", tarea.id))
                            }
                        >
                            <Play className="w-4 h-4" />
                        </PrimaryButton>
                        </Tooltip>

                        {ruta === "grupos.tareas" && (
                            <Tooltip text="Eliminar del grupo">
                            <DangerButton
                                aria-label="Eliminar del grupo"
                                className="text-sm p-1.5 flex items-center justify-center"
                                onClick={async () => {
                                    if (await eliminarTareaDelGrupo()) {
                                        router.get(
                                            route(
                                                "tareas.eliminarDelGrupo",
                                                tarea.id,
                                            ),
                                        );
                                    }
                                }}
                            >
                                <UserMinus className="w-4 h-4" />
                            </DangerButton>
                            </Tooltip>
                        )}

                        <Tooltip text="Ver detalle">
                        <PrimaryButton
                            aria-label="Ver detalle"
                            onClick={() =>
                                router.get(route("tareas.verTarea", tarea.id))
                            }
                        >
                            <Eye className="w-4 h-4" />
                        </PrimaryButton>
                        </Tooltip>

                        {grupos.length === 0 && ruta === "grupos.tareas" && (
                            <Tooltip text="Eliminar del grupo">
                            <DangerButton
                                aria-label="Eliminar del grupo"
                                className="text-sm py-1.5"
                                onClick={async () => {
                                    if (await eliminarTareaDelGrupo()) {
                                        router.get(
                                            route(
                                                "tareas.eliminarDelGrupo",
                                                tarea.id,
                                            ),
                                        );
                                    }
                                }}
                            >
                                <ListMinus className="w-4 h-4" />
                            </DangerButton>
                            </Tooltip>
                        )}

                        <Tooltip text="Eliminar tarea">
                        <DangerButton
                            aria-label="Eliminar tarea"
                            className="text-sm p-1.5 bg-[#A90000] hover:bg-red-700 flex items-center justify-center"
                            onClick={async () => {
                                if (await eliminarTarea()) {
                                    destroy(route("tareas.destroy", tarea.id));
                                }
                            }}
                        >
                            <Trash2 className="w-4 h-4" />
                        </DangerButton>
                        </Tooltip>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tarea;
