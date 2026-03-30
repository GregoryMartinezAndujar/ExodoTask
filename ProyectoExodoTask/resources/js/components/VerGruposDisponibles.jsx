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
import TiempoFormateado from "./Formateartiempo";
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
        w-full bg-white border border-gray-200 rounded-xl p-4 
        flex flex-col sm:flex-row 
        sm:items-center sm:justify-between
        shadow-sm hover:shadow-md 
        transition-all duration-300
        gap-4
    "
        >
            {/* Columna izquierda */}
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2 text-xl">
                    <p className="text-3xl text-gray-900">{grupo.a_nombre}</p>
                    <Minus className="w-3 h-3 rotate-90" />

                    <p>Horas totales:</p>
                    <TiempoFormateado segundos={tiempoTotalGrupo} />

                    <Minus className="w-3 h-3 rotate-90" />

                    <p>Horas realizadas:</p>
                    <TiempoFormateado segundos={tiempoTotalRealizadoGrupo} />
                </div>

                <small className="text-gray-500 text-sm">
                    Fue creado hace: {dayjs(grupo.created_at).fromNow()} —
                    Actualizado hace: {dayjs(grupo.updated_at).fromNow()}
                </small>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 sm:justify-center">
                <div className="px-4 h-12 flex items-center justify-center rounded-full bg-blue-100 text-black text-xl">
                    {tareasDelGrupo.length} tareas
                </div>

                <div className="px-4 h-12 flex items-center justify-center rounded-full bg-green-100 text-black text-xl">
                    {tareasCompeltadasGrupo.length} Completadas
                </div>

                <div className="px-4 h-12 flex items-center justify-center rounded-full bg-red-100 text-black text-xl">
                    {tareasPendientesGrupo.length} Pendientes
                </div>
            </div>

            {/* Columna derecha — AQUÍ ESTÁ LA CLAVE */}
            <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
                <PrimaryButton
                    className="text-white"
                    onClick={() => router.get(route("grupos.tareas", grupo.id))}
                >
                    Ver Tareas
                </PrimaryButton>

                <PrimaryButton
                    className="text-white"
                    onClick={() => router.get(route("editar.grupo", grupo.id))}
                >
                    Editar
                </PrimaryButton>

                <DangerButton
                    className="text-white"
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
