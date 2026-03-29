import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import Tarea from "./Tareas";
import { router } from "@inertiajs/react";
import { useForm, Head } from "@inertiajs/react";
import { eliminarGrupo } from "./Alerts";
import { Minus } from "lucide-react";
dayjs.extend(relativeTime);

const VerGrupos = ({ grupo, tareas }) => {
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        delete: destroy,
    } = useForm({
        // a_nombre: "",
        // tareasIds: [],
    });

    const [tareasDelGrupo, setTareasDelGrupo] = useState(
        tareas.filter((tarea) => tarea.a_grupo_id === grupo.id),
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
        <div
            className="
        w-full
        bg-white
        border border-gray-200
        rounded-xl
        p-4
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
    "
        >
            {/* Columna izquierda */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <p className="text-2xl text-gray-900">{grupo.a_nombre}</p>{" "}
                    <Minus className="w-3 h-3 rotate-90" />
                    <p>Horas totales: {tiempoTotalGrupo}</p>
                    <Minus className="w-3 h-3 rotate-90" />
                    <p>Horas realizadas: {tiempoTotalRealizadoGrupo}</p>
                </div>
                <small className="text-gray-500 text-sm">
                    Fue creado hace: {dayjs(grupo.created_at).fromNow()}
                    Actualizado hace: {dayjs(grupo.updated_at).fromNow()}
                </small>
            </div>
            <div className="w-24 h-12 flex items-center justify-center rounded-full bg-blue-100 text-black text-xl">
                <p>{tareasDelGrupo.length} tareas</p>
            </div>
            <div className="w-fit h-12 flex items-center justify-center rounded-full bg-green-100 text-black text-xl py-1 px-2">
                <p>{tareasCompeltadasGrupo.length} Completadas</p>
            </div>
            <div className="w-fit h-12 flex items-center justify-center rounded-full bg-red-100 text-black text-xl py-1 px-2">
                <p>{tareasPendientesGrupo.length} Pendientes</p>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                <PrimaryButton
                    className="
                text-white
                transition-all
            "
                    onClick={() => router.get(route("grupos.tareas", grupo.id))}
                >
                    Ver Tareas
                </PrimaryButton>

                <PrimaryButton
                    className="
                text-white
                transition-all
            "
                    onClick={() => router.get(route("editar.grupo", grupo.id))}
                >
                    Editar
                </PrimaryButton>
                <DangerButton
                    className="
                text-white
                transition-all
            "
                    onClick={async () => {
                        if (await eliminarGrupo()) {
                            destroy(route("gruposdetareas.destroy", grupo.id));
                        }
                    }}
                >
                    Eliminar
                </DangerButton>
            </div>
        </div>
    );
};

export default VerGrupos;
