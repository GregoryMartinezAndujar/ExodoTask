import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import PrimaryButton from "@/components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";
import Tareas from "@/components/Tareas";
export default function Index({ auth, tareas }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        a_nombre: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("gruposdetareas.store"), { onSuccess: () => reset() });
    };

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
                        className="w-full sm:w-auto mt-2 hover:bg-indigo-700 text-white"
                        disabled={processing}
                    >
                        Crear
                    </DangerButton>
                </form>
            </div>

            {tareas.map((tarea) => (
                <Tareas key={tarea.id} tarea={tarea} />
            ))}
        </AuthenticatedLayout>
    );
}
