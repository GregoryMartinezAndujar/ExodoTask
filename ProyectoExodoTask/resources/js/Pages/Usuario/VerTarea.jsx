import React from "react";
import {
    Clock,
    Calendar,
    Pencil,
    Play,
    CheckCircle,
    Trash2,
    Tag,
    ArrowBigDownDashIcon,
    ArrowBigDown,
    ArrowBigLeftDashIcon,
} from "lucide-react"; // Iconos sugeridos
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import VolverAtras from "@/components/VolverAtras";

export default function VerTarea({ tarea, auth, grupo }) {
    // Lógica de urgencia: Si la fecha es hoy, usamos el tono de alerta
    const esHoy = tarea.a_fecha_limite === "2026-03-30";
    const colorBorde = esHoy ? "border-[#FCA5A5]" : "border-gray-200";
    const volerAlDashboard = () => {
        router.get(route("dashboard"));
    };

    const { data, patch } = useForm({
        a_nombre: tarea.a_nombre,
        a_descripcion: tarea.a_descripcion,
        a_horas: tarea.a_horas,
        a_fecha_limite: tarea.a_fecha_limite,
        a_completada: tarea.a_completada,
    });
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-4xl sm:text-5xl lg:text-5xl  text-gray-800">
                    Ver Tarea
                </h2>
            }
            className="font-exodo"
        >
            <Head title="Ver Tarea" />
            {/* <ArrowBigLeftDashIcon
                size={32}
                className="text-slate-600 cursor-pointer transition duration-200 ease-out 
                hover:text-slate-900 hover:-translate-x-1 hover:scale-110 hover:drop-shadow-mdactive:scale-95
"
                onClick={volerAlDashboard}
            /> */}
            <VolverAtras />
            <div
                className={`max-w-4xl mx-auto my-6 p-6 bg-white rounded-xl border-2 shadow-sm transition-all ${colorBorde}`}
            >
                {/* Cabecera: Título */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl text-slate-800 tracking-tight">
                            {tarea.a_nombre || "Sin nombre"}
                        </h1>
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
                    </div>

                    {/* Fecha Límite */}
                    <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${esHoy ? "bg-[#A90000] text-white animate-pulse" : "bg-slate-100 text-slate-600"}`}
                    >
                        <Calendar size={18} />
                        <span>Límite: {tarea.a_fecha_limite}</span>
                    </div>
                </div>

                {/* Horas y Grupo */}
                <div className="flex flex-wrap gap-6 mb-6 text-sm text-slate-500 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-400" />
                        <span>
                            Tiempo:{" "}
                            <span className="text-slate-700">
                                {tarea.a_horas}h
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag size={16} className="text-slate-400" />
                        <span>
                            {tarea.a_grupo_id ? grupo.a_nombre : "Sin Grupo"}
                        </span>
                    </div>
                </div>

                {/* Descripción */}
                <div className="mb-8">
                    <h3 className="text-sm text-slate-400 uppercase tracking-widest mb-2">
                        Descripción
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        {tarea.a_descripcion ||
                            "No hay una descripción detallada para esta tarea."}
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
