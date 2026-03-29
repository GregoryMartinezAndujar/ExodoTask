import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import SecondaryButton from "./SecondaryButton";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import "dayjs/locale/es";
import CheckButton from "./CheckButton";
import {
    Trash2,
    Play,
    Pencil,
    Check,
    ChevronDown,
    X,
    Tag,
    CheckCircle,
    Minus,
    Eye,
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
    console.log(tarea.a_fecha_limite);
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
        console.log(ruta),
        (
            <div
                className={`w-full rounded-xl p-4 shadow-sm hover:shadow-md flex flex-col gap-4
                    ${
                        dias <= 1 && tarea.a_completada === false
                            ? "border-2 border-[#FCA5A5] bg-white"
                            : tareasConBorde
                              ? "border-2 border-[#A90000] bg-white"
                              : "border border-gray-200 bg-white"
                    }`}
            >
                {/* FILA 1: Nombre + Estado + Botones (solo escritorio) */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Nombre + Estado */}
                    <div className="flex flex-wrap items-center gap-1 ">
                        <p className="text-xl text-gray-900 tracking-tight px-3 py-1 rounded-full w-fit">
                            {tarea.a_nombre}
                        </p>

                        <span
                            className={`
                            px-2 py-0.5 rounded-full text-xs font-medium
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
                                    <button className="bg-white border border-gray-300 rounded px-2 py-1 shadow-sm hover:bg-gray-50 transition text-xs md:text-sm flex items-center gap-1">
                                        {prioridades.find(
                                            (p) =>
                                                p.id === tarea.a_prioridad_id,
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
                    {ruta === "dashboard" && (
                        <span className="text-lg sm:text-xl md:text-1xl px-3 py-1 rounded-full  w-fit  flex flex-wrap gap-1">
                            Fecha Límite:
                            {dayjs(tarea.a_fecha_limite).format("DD/MM/YYYY")}
                        </span>
                    )}

                    {/* BOTONES ESCRITORIO */}
                    <div className="hidden sm:flex gap-1 w-fit">
                        {(ruta === "dashboard" || ruta === "grupos.tareas") && (
                            <>
                                <CheckButton
                                    className={`text-sm py-1.5 flex items-center gap-1  ${
                                        data.a_completada
                                            ? " bg-[#A90000] hover:bg-red-700"
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

                                <PrimaryButton
                                    className="text-sm py-1.5"
                                    onClick={() =>
                                        router.get(
                                            route("tareas.edit", tarea.id),
                                        )
                                    }
                                >
                                    <Pencil className="w-4 h-4" />
                                </PrimaryButton>

                                {!tarea.a_completada && (
                                    <PrimaryButton
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
                                )}

                                {grupos.length == 0 &&
                                    ruta === "grupos.tareas" && (
                                        <DangerButton
                                            className="text-sm py-1.5"
                                            onClick={async () => {
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
                                            }}
                                        >
                                            Eliminar del Grupo
                                        </DangerButton>
                                    )}
                                <PrimaryButton
                                    onClick={() =>
                                        router.get(
                                            route("tareas.verTarea", tarea.id),
                                        )
                                    }
                                >
                                    <Eye className="w-4 h-4" />
                                </PrimaryButton>
                                <DangerButton
                                    className="text-sm py-1.5 bg-[#A90000] hover:bg-red-700 flex items-center gap-1"
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
                                    <Trash2 className="w-4 h-4" />
                                </DangerButton>
                            </>
                        )}
                    </div>
                </div>

                {/* FILA 2: Grupo + Prioridad + Horas + Fechas */}
                <div className="flex flex-wrap items-center gap-1 text-base">
                    <span>
                        {tarea.a_grupo_id
                            ? grupos.find((g) => g.id === tarea.a_grupo_id)
                                  ?.a_nombre
                            : "Sin Grupo"}
                    </span>
                    <Minus className={"w-3 h-3 rotate-90"} />
                    <span>Tiempo Estimado: {tarea.a_horas} h</span>
                    <Minus className="w-3 h-3 rotate-90 " />
                    <span>
                        Tiempo Realizado:{" "}
                        {Number(
                            (tarea.a_horas_realizadas / 60 / 60).toFixed(2),
                        )}{" "}
                        h
                    </span>
                    <Minus className="w-3 h-3 rotate-90 " />

                    <span>Creada: {dayjs(tarea.created_at).fromNow()}</span>

                    <Minus className="w-3 h-3 rotate-90 " />

                    <span>
                        Actualizada: {dayjs(tarea.updated_at).fromNow()}
                    </span>
                </div>

                {/* FILA 3: Descripción */}

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
                <div className="flex sm:hidden  gap-2">
                    {ruta === "dashboard" && (
                        <>
                            <PrimaryButton
                                className="text-sm p-1.5 flex items-center justify-center"
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
                                    <Check className="w-4 h-4" />
                                )}
                            </PrimaryButton>

                            <PrimaryButton
                                className="text-sm p-1.5 flex items-center justify-center"
                                onClick={() =>
                                    router.get(route("tareas.edit", tarea.id))
                                }
                            >
                                <Pencil className="w-4 h-4" />
                            </PrimaryButton>

                            <PrimaryButton
                                className="text-sm p-1.5 flex items-center justify-center"
                                onClick={() =>
                                    router.get(route("tareas.edit", tarea.id))
                                }
                            >
                                <Play className="w-4 h-4" />
                            </PrimaryButton>

                            {ruta == "grupo.tarea" && (
                                <DangerButton
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
                            )}

                            <DangerButton
                                className="text-sm p-1.5 bg-[#A90000] hover:bg-red-700 flex items-center justify-center"
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
                        </>
                    )}
                </div>
            </div>
        )
    );
};

export default Tarea;
