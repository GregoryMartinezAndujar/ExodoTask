import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import "dayjs/locale/es";

import { eliminarTarea, completarTarea, descompletarTarea } from "./Alerts";

dayjs.extend(relativeTime);
dayjs.locale("es");

const Tarea = ({
    tarea,
    ruta,
    onAddTarea,
    onRemoveTarea,
    prioridades,
    grupos,
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
        <div
            className={`
                rounded-md p-3 md:p-4 transition-all duration-200 bg-white
                shadow-sm hover:shadow-md border h-full flex flex-col gap-2
                ${
                    ruta === "gruposdetareas.create"
                        ? tareasConBorde
                            ? "border-[#A90000] border-2"
                            : "border-gray-200 border"
                        : "border-gray-200 border"
                }
            `}
        >
            {/* CABECERA */}
            <div className="flex items-center justify-between w-full">
                <span
                    className={`
                        px-2 py-0.5 rounded-full text-xs md:text-sm
                        ${
                            data.a_completada
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }
                    `}
                >
                    {data.a_completada ? "Completada" : "Pendiente"}
                </span>

                {ruta === "dashboard" && (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="bg-white border border-gray-300 rounded px-2 py-1 shadow-sm hover:bg-gray-50 transition text-xs md:text-sm flex items-center gap-1">
                                {
                                    prioridades.find(
                                        (p) => p.id === tarea.a_prioridad_id,
                                    )?.a_nombre
                                }
                                <span className="text-gray-500">▼</span>
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content contentClasses="bg-white py-1 rounded-md shadow-lg border border-gray-200">
                            {prioridades.map((prioridad) => (
                                <div
                                    key={prioridad.id}
                                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-gray-700 text-xs md:text-sm"
                                    onClick={() => {
                                        patch(
                                            route("tareas.update", tarea.id),
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

            {/* FECHAS */}
            <div className="flex flex-wrap items-center gap-2 text-gray-800 text-sm md:text-base">
                <span>Creada: {dayjs(tarea.created_at).fromNow()}</span>
                <span className="opacity-40">•</span>
                <span>Actualizada: {dayjs(tarea.updated_at).fromNow()}</span>
            </div>

            {/* TÍTULO + INFO */}
            <div className="mt-1">
                <p className="text-lg md:text-3xl text-gray-800 leading-tight">
                    {tarea.a_nombre}
                </p>

                <p className="text-gray-600 text-sm md:text-base mt-1">
                    {tarea.a_horas} h •{" "}
                    {tarea.a_grupo_id
                        ? grupos.find((g) => g.id === tarea.a_grupo_id)
                              ?.a_nombre
                        : "Sin Grupo"}
                </p>
            </div>

            {/* DESCRIPCIÓN */}
            <hr className="border-[1px] mt-1" />
            <p className="text-gray-700 mt-1 text-sm md:text-base leading-snug">
                {tarea.a_descripcion}
            </p>

            {/* BOTONES */}
            <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-3">
                {ruta === "dashboard" && (
                    <>
                        <PrimaryButton
                            className="w-full sm:w-auto text-sm py-1.5"
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
                            {data.a_completada ? "Descompletar" : "Completar"}
                        </PrimaryButton>

                        <PrimaryButton
                            className="w-full sm:w-auto text-sm py-1.5"
                            onClick={() =>
                                router.get(route("tareas.edit", tarea.id))
                            }
                        >
                            Editar
                        </PrimaryButton>

                        <DangerButton
                            className="w-full sm:w-auto text-sm py-1.5 bg-[#A90000] hover:bg-red-700"
                            onClick={async () => {
                                if (await eliminarTarea()) {
                                    destroy(route("tareas.destroy", tarea.id));
                                }
                            }}
                        >
                            Eliminar
                        </DangerButton>
                    </>
                )}

                {ruta === "gruposdetareas.create" && (
                    <>
                        <PrimaryButton
                            className="w-full sm:w-auto text-sm py-1.5 hover:bg-[#A90000]"
                            onClick={() => {
                                onAddTarea(tarea.id);
                                setTareasConBorde(true);
                            }}
                        >
                            Añadir al Grupo
                        </PrimaryButton>

                        <DangerButton
                            className="w-full sm:w-auto text-sm py-1.5 hover:bg-[#A90000]"
                            onClick={() => {
                                onRemoveTarea(tarea.id);
                                setTareasConBorde(false);
                            }}
                        >
                            Eliminar del Grupo
                        </DangerButton>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tarea;
