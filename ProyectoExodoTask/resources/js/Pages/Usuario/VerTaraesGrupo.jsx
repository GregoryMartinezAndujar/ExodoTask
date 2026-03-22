import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import Tareas from "@/components/Tareas";
const VerTareasGrupo = ({ auth, grupo, tareas, prioridades }) => {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-4xl sm:text-5xl lg:text-5xl  text-gray-800">
                    Tareas del Grupo : {grupo.a_nombre}
                </h2>
            }
            className="font-exodo"
        >
            <Head title="Tareas del Grupo" />

            <div className="space-y-2">
                {tareas.map((tarea) => (
                    <Tareas
                        key={tarea.id}
                        tarea={tarea}
                        prioridades={prioridades}
                        // grupos={grupo}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default VerTareasGrupo;
