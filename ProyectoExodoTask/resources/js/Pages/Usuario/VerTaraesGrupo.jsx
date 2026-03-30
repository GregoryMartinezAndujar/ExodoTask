import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Tareas from "@/components/Tareas";
import VolverAtras from "@/components/VolverAtras";

const VerTareasGrupo = ({ auth, grupo, tareas, prioridades, currentRoute }) => {
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

                <div className="space-y-3 pb-10">
                    {tareas.map((tarea) => (
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
