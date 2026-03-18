import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import { useForm, Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

dayjs.extend(relativeTime);

const Tarea = ({ tarea, ruta, onAddTarea, prioridades }) => {
    const {
        data,
        patch,
        delete: destroy,
    } = useForm({
        a_completada: tarea.a_completada,
        a_prioridad_id: tarea.a_prioridad_id,
    });
    console.log(ruta);
    return (
        <div className="transition rounded-xl p-6 shadow-sm border mb-4 bg-gray-50 hover:bg-gray-100">
            <small className="text-gray-500 sm:text-xl">
                Fue creada hace:{dayjs(tarea.created_at).fromNow()}
                &nbsp;|&nbsp; Última actualización:
                {dayjs(tarea.updated_at).fromNow()}
                &nbsp;|&nbsp;
            </small>
            {data.a_completada ? (
                <span className="text-green-600">Completada</span>
            ) : (
                <span className="text-red-600">Pendiente</span>
            )}
            &nbsp;|&nbsp;
            {ruta === "dashboard" && (
                <select
                    value={tarea.a_prioridad_id || ""}
                    className="bg-gray-200 text-gray-700 py-1 rounded w-fit"
                    disabled={data.a_completada}
                    onChange={(e) => {
                        patch(route("tareas.update", tarea.id), {
                            onBefore: () => {
                                data.a_prioridad_id = parseInt(e.target.value);
                            },
                        });
                    }}
                >
                    {prioridades.map((prioridad) => (
                        <option key={prioridad.id} value={prioridad.id}>
                            {prioridad.a_nombre}
                        </option>
                    ))}
                </select>
            )}
            {/* Título */}
            <p className="text-lg sm:text-xl lg:text-2xl mt-3 ">
                {tarea.a_nombre}
            </p>
            {/* Descripción */}
            <p className="text-gray-600 mt-1 text-lg sm:text-xl ">
                {tarea.a_descripcion}
            </p>
            {/* BOTONES RESPONSIVE */}
            {ruta === "dashboard" && (
                <div className="flex flex-col sm:flex-row sm:space-x-3 gap-2 mt-4">
                    <PrimaryButton
                        className="w-full sm:w-auto"
                        onClick={() => {
                            patch(route("tareas.update", tarea.id), {
                                onBefore: () => {
                                    data.a_completada = !data.a_completada;
                                },
                            });
                        }}
                    >
                        Completar
                    </PrimaryButton>

                    <PrimaryButton
                        className="w-full sm:w-auto"
                        onClick={() =>
                            router.get(route("tareas.edit", tarea.id))
                        }
                    >
                        Editar
                    </PrimaryButton>

                    <PrimaryButton
                        className="w-full sm:w-auto"
                        onClick={() =>
                            router.get(route("tareas.edit", tarea.id))
                        }
                    >
                        Añadir a un Grupo
                    </PrimaryButton>

                    <DangerButton
                        className="w-full sm:w-auto bg-[#A90000] hover:bg-red-700"
                        onClick={() =>
                            destroy(route("tareas.destroy", tarea.id))
                        }
                    >
                        Eliminar
                    </DangerButton>
                </div>
            )}
            {ruta === "gruposdetareas.create" && (
                <div className="flex flex-col sm:flex-row sm:space-x-3 gap-2 mt-4">
                    <PrimaryButton
                        className="w-full sm:w-auto hover:bg-[#A90000]"
                        onClick={() => {
                            onAddTarea(tarea.id);
                        }}
                    >
                        Añadir al Grupo
                    </PrimaryButton>
                </div>
            )}
        </div>
    );
};

export default Tarea;
