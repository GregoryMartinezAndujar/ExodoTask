import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import "dayjs/locale/es";

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

    return (
        console.log(ruta),
        (
            <div
                className={`
        w-full rounded-xl p-4
        shadow-sm hover:shadow-md 
        flex flex-col gap-4
        ${tareasConBorde ? "border-2 border-[#A90000] bg-white" : "border border-gray-200 bg-white"}
    `}
            >
                {/* FILA 1: Nombre + Estado + Botones (solo escritorio) */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Nombre + Estado */}
                    <div className="flex flex-wrap items-center gap-3">
                        <p className="text-xl text-gray-900 tracking-tight bg-[#111827] px-3 py-1 rounded-full w-fit text-white">
                            {tarea.a_nombre}
                        </p>

                        <span
                            className={`
                            px-2 py-0.5 rounded-full text-xs font-medium
                            ${
                                data.a_completada
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }
                        `}
                        >
                            {data.a_completada ? "Completada" : "Pendiente"}
                        </span>
                        {ruta === "dashboard" && Array.isArray(prioridades) && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="bg-white border border-gray-300 rounded px-2 py-1 shadow-sm hover:bg-gray-50 transition text-xs md:text-sm flex items-center gap-1">
                                        {prioridades.find(
                                            (p) =>
                                                p.id === tarea.a_prioridad_id,
                                        )?.a_nombre ?? "Sin prioridad"}
                                        <span className="text-gray-500">▼</span>
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
                                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-gray-700 text-xs md:text-sm"
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
                    <div className="hidden sm:flex gap-2">
                        {ruta === "dashboard" && (
                            <>
                                <PrimaryButton
                                    className="text-sm py-1.5"
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
                                    {data.a_completada
                                        ? "Descompletar"
                                        : "Completar"}
                                </PrimaryButton>

                                <PrimaryButton
                                    className="text-sm py-1.5"
                                    onClick={() =>
                                        router.get(
                                            route("tareas.edit", tarea.id),
                                        )
                                    }
                                >
                                    Editar
                                </PrimaryButton>
                                {grupos.length == 0 && (
                                    <DangerButton
                                        className="w-full text-sm py-1.5"
                                        onClick={async () => {
                                            {
                                                if (
                                                    await eliminarTareaDelGrupo()
                                                ) {
                                                    router.get(
                                                        route(
                                                            "tareas.eliminarDelGrupo",
                                                            tarea.id,
                                                        ),
                                                    );
                                                }
                                            }
                                        }}
                                    >
                                        eliminar del grupo
                                    </DangerButton>
                                )}
                                <DangerButton
                                    className="text-sm py-1.5 bg-[#A90000] hover:bg-red-700"
                                    onClick={async () => {
                                        if (await eliminarTarea()) {
                                            destroy(
                                                route(
                                                    "tareas.destroy",
                                                    tarea.id,
                                                ),
                                            );
                                        }
                                    }}
                                >
                                    Eliminar
                                </DangerButton>
                            </>
                        )}
                    </div>
                </div>

                {/* FILA 2: Grupo + Prioridad + Horas + Fechas */}
                <div className="flex flex-wrap items-center gap-2 text-base">
                    <span>
                        {tarea.a_grupo_id
                            ? grupos.find((g) => g.id === tarea.a_grupo_id)
                                  ?.a_nombre
                            : "Sin Grupo"}
                        <span
                            className={`${
                                grupos.length == 0 ? "opacity-0" : "opacity-40"
                            }`}
                        >
                            •
                        </span>
                    </span>

                    <span>{tarea.a_horas} h</span>

                    <span className="opacity-40">•</span>

                    <span>Creada: {dayjs(tarea.created_at).fromNow()}</span>

                    <span className="opacity-40">•</span>

                    <span>
                        Actualizada: {dayjs(tarea.updated_at).fromNow()}
                    </span>
                </div>

                {/* FILA 3: Descripción */}
                <p className="text-base leading-snug line-clamp-3">
                    {tarea.a_descripcion}
                </p>
                {(ruta === "gruposdetareas.create" ||
                    ruta === "editar.grupo") && (
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
                <div className="flex sm:hidden flex-col gap-2 w-full">
                    {ruta === "dashboard" && (
                        <>
                            <PrimaryButton
                                className="w-full text-sm py-1.5"
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
                                {data.a_completada
                                    ? "Descompletar"
                                    : "Completar"}
                            </PrimaryButton>

                            <PrimaryButton
                                className="w-full text-sm py-1.5"
                                onClick={() =>
                                    router.get(route("tareas.edit", tarea.id))
                                }
                            >
                                Editar
                            </PrimaryButton>
                            {grupos.length == 0 && (
                                <DangerButton
                                    className="w-full text-sm py-1.5"
                                    onClick={async () => {
                                        {
                                            if (await eliminarTareaDelGrupo()) {
                                                router.get(
                                                    route(
                                                        "tareas.eliminarDelGrupo",
                                                        tarea.id,
                                                    ),
                                                );
                                            }
                                        }
                                    }}
                                >
                                    eliminar del grupo
                                </DangerButton>
                            )}
                            <DangerButton
                                className="w-full text-sm py-1.5 bg-[#A90000] hover:bg-red-700"
                                onClick={async () => {
                                    if (await eliminarTarea()) {
                                        destroy(
                                            route("tareas.destroy", tarea.id),
                                        );
                                    }
                                }}
                            >
                                Eliminar
                            </DangerButton>
                        </>
                    )}
                </div>
            </div>
        )
    );
};

export default Tarea;
