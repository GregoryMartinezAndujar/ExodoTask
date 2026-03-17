import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

const VerTareasGrupo = ({ auth, grupo, tareas }) => {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-4xl sm:text-5xl lg:text-6xl  text-gray-800">
                    Tareas del Grupo
                </h2>
            }
            className="font-exodo"
        >
            <Head title="Tareas del Grupo" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-800 mb-6">
                    Tareas del Grupo: {grupo.a_nombre}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tareas.map((tarea) => (
                        <div
                            key={tarea.id}
                            className="bg-white p-6 rounded-xl shadow-lg min-h-[220px] flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-4xl  mb-3">
                                    {tarea.a_nombre}
                                </h3>

                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {tarea.a_descripcion}
                                </p>
                            </div>
                            <p className=" mt-4 text-2xl text-[#000000] ">
                                Horas: {tarea.a_horas}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default VerTareasGrupo;
