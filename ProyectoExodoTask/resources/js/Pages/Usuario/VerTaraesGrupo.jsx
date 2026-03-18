import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";
import Alerts from "@/components/Alerts";
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
                <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
                    Tareas del Grupo: {grupo.a_nombre}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tareas.map((tarea) => (
                        <div
                            key={tarea.id}
                            className="bg-white p-6 rounded-xl shadow-lg min-h-[220px] flex flex-col justify-between border-[#A90000] border-4"
                        >
                            <div>
                                <h3 className="text-4xl  mb-3">
                                    {tarea.a_nombre}
                                </h3>

                                <p className=" text-2xl">
                                    {tarea.a_descripcion}
                                </p>
                            </div>
                            <p className=" mt-4 text-lg text-[#000000] ">
                                Horas: {tarea.a_horas}
                            </p>
                            <DangerButton
                                className="hover:bg-[#A90000] text-white mt-4"
                                onClick={() => {
                                    Alerts();
                                }}
                            >
                                Eliminar
                            </DangerButton>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default VerTareasGrupo;
