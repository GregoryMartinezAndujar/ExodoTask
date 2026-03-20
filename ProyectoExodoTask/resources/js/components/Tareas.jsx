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
                rounded-xl p-6 transition-all duration-200 bg-white
                shadow-sm hover:shadow-md border h-full flex flex-col
                ${
                    ruta === "gruposdetareas.create"
                        ? tareasConBorde
                            ? "border-[#A90000] border-4"
                            : "border-gray-200 border-2"
                        : "border-gray-200 border-2"
                }
            `}
        >
            {/* CABECERA: COMPLETADA IZQUIERDA + PRIORIDAD DERECHA */}
            <div className="flex items-center justify-between w-full">
                {/* ESTADO ARRIBA IZQUIERDA */}
                <span
                    className={`
                        px-4 py-1 rounded-full text-xl
                        ${data.a_completada ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                    `}
                >
                    {data.a_completada ? "Completada" : "Pendiente"}
                </span>

                {/* PRIORIDAD ARRIBA DERECHA */}
                {ruta === "dashboard" && (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm hover:bg-gray-50 transition text-xl flex items-center gap-2">
                                {prioridades.find(
                                    (p) => p.id === tarea.a_prioridad_id,
                                )?.a_nombre || "Prioridad"}
                                <span className="text-gray-500">▼</span>
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content contentClasses="bg-white py-2 rounded-md shadow-lg border border-gray-200">
                            {prioridades.map((prioridad) => (
                                <div
                                    key={prioridad.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-xl"
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

            {/* FECHAS DEBAJO DE LA CABECERA */}
            <div className="flex flex-wrap items-center gap-3 text-gray-800 text-xl ">
                <span>Creada {dayjs(tarea.created_at).fromNow()}</span>
                <span className="opacity-40">•</span>
                <span>Actualizada {dayjs(tarea.updated_at).fromNow()}</span>
            </div>

            {/* TÍTULO + INFO */}
            <div className="mt-2">
                <p className="text-4xl text-gray-800 leading-tight">
                    {tarea.a_nombre}
                </p>

                <p className="text-gray-600 text-2xl mt-2">
                    {tarea.a_horas} horas •{" "}
                    {tarea.a_grupo_id
                        ? grupos.find((g) => g.id === tarea.a_grupo_id)
                              ?.a_nombre
                        : "Sin Grupo"}
                </p>
            </div>

            {/* DESCRIPCIÓN */}
            <hr className="border-[1px]"></hr>
            <p className="text-gray-700 mt-2 text-2xl leading-relaxed">
                {tarea.a_descripcion}
            </p>

            {/* BOTONES */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
                {ruta === "dashboard" && (
                    <>
                        <PrimaryButton
                            className="w-full sm:w-auto text-xl py-3"
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
                            className="w-full sm:w-auto text-xl py-3"
                            onClick={() =>
                                router.get(route("tareas.edit", tarea.id))
                            }
                        >
                            Editar
                        </PrimaryButton>

                        <DangerButton
                            className="w-full sm:w-auto text-xl py-3 bg-[#A90000] hover:bg-red-700"
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
                            className="w-full sm:w-auto text-xl py-3 hover:bg-[#A90000]"
                            onClick={() => {
                                onAddTarea(tarea.id);
                                setTareasConBorde(true);
                            }}
                        >
                            Añadir al Grupo
                        </PrimaryButton>

                        <DangerButton
                            className="w-full sm:w-auto text-xl py-3 hover:bg-[#A90000]"
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
