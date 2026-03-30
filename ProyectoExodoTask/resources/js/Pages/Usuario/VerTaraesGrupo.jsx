import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import Tareas from "@/components/Tareas";
import VolverAtras from "@/components/VolverAtras";
const VerTareasGrupo = ({ auth, grupo, tareas, prioridades, currentRoute }) => {
    console.log(currentRoute);
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
            <VolverAtras className="mb-4" />
            <div className="space-y-2">
                {tareas.map((tarea) => (
                    <Tareas
                        key={tarea.id}
                        tarea={tarea}
                        prioridades={prioridades}
                        ruta={currentRoute}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default VerTareasGrupo;
