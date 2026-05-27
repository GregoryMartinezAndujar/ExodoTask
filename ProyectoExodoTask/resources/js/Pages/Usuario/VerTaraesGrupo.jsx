import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Tareas from "@/components/Tareas";
import VolverAtras from "@/components/VolverAtras";

const VerTareasGrupo = ({ auth, grupo, tareas, prioridades, currentRoute }) => {
    const [verSegunPrioridad, setVerSegunPrioridad] = useState(null);

    const tareasFiltradas = tareas.filter((t) =>
        verSegunPrioridad === null
            ? true
            : t.a_prioridad_id === verSegunPrioridad,
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 leading-tight">
                    Tareas del Grupo: {grupo.a_nombre}
                </h2>
            }
            className="font-exodo"
        >
            <Head title="Tareas del Grupo" />

            <div className="px-4 sm:px-6 lg:px-8 overflow-x-hidden">
                <VolverAtras className="mb-4" />

                {/* Filtro por prioridad */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={() => setVerSegunPrioridad(null)}
                        className={`px-3 py-1.5 rounded-lg text-base font-medium transition border ${
                            verSegunPrioridad === null
                                ? "bg-gray-900 text-white border-gray-900"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        Todas
                    </button>
                    {prioridades.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setVerSegunPrioridad(p.id)}
                            className={`px-3 py-1.5 rounded-lg text-base font-medium transition border ${
                                verSegunPrioridad === p.id
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            {p.a_nombre}
                        </button>
                    ))}
                </div>

                <div className="space-y-3 pb-10">
                    {tareasFiltradas.map((tarea) => (
                        <Tareas
                            key={tarea.id}
                            tarea={tarea}
                            prioridades={prioridades}
                            ruta={currentRoute}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default VerTareasGrupo;
