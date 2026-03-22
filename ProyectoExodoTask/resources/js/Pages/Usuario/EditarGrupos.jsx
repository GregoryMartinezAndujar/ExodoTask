import React, { use, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import { useForm, Head } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";
import Tareas from "@/components/Tareas";
export default function Index({ auth, tareas, currentRoute, grupo }) {
    const { data, setData, patch, processing, reset, errors } = useForm({
        a_nombre: grupo.a_nombre,
        tareasIds: [],
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("gruposdetareas.update", grupo.id), {
            onSuccess: () => reset(),
        });
    };

    function handleAgregarTarea(tareaId) {
        console.log("Tarea agregada al grupo:", tareaId);
        if (!data.tareasIds.includes(tareaId)) {
            data.tareasIds.push(tareaId);
        }

        console.log("Tareas seleccionadas para el grupo:", data.tareasIds);
    }

    function handleEliminarTarea(tareaId) {
        console.log("Tarea eliminada del grupo:", tareaId);
        data.tareasIds = data.tareasIds.filter((id) => id !== tareaId);
        console.log("Tareas seleccionadas para el grupo:", data.tareasIds);
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-4xl sm:text-5xl lg:text-6xl  text-gray-800">
                    Creación de Grupos
                </h2>
            }
            className="font-exodo"
        >
            <Head title="Tareas" />

            {/* CONTENEDOR RESPONSIVE */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* FORMULARIO RESPONSIVE */}
                <form
                    onSubmit={submit}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4"
                >
                    {/* Nombre */}
                    <div>
                        <input
                            value={data.a_nombre}
                            onChange={(e) =>
                                setData("a_nombre", e.target.value)
                            }
                            type="text"
                            placeholder="Nombre del Grupo"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A90000] focus:ring-opacity-50"
                        />
                        <InputError
                            message={errors.a_nombre}
                            className="mt-1"
                        />
                    </div>

                    {/* Botón */}
                    <DangerButton
                        className="
                                w-full sm:w-auto 
                                text-base 
                                px-5 py-2
                                rounded-xl
                                transition-all 
                                hover:scale-[1.02]
                                bg-[#A90000]
                            "
                        disabled={processing}
                    >
                        Actualizar
                    </DangerButton>
                </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tareas.map((tarea) => (
                    <Tareas
                        key={tarea.id}
                        tarea={tarea}
                        ruta={currentRoute}
                        onAddTarea={handleAgregarTarea}
                        onRemoveTarea={handleEliminarTarea}
                        // grupos={grupos}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
