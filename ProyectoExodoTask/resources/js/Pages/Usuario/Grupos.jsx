import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import PrimaryButton from "@/components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";
export default function Index({ auth, tareas }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        a_nombre: "",
        a_descripcion: "",
        a_horas: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("tareas.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-4xl sm:text-5xl lg:text-6xl  text-gray-800">
                    Creación de Tareas
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
                            placeholder="Nombre de la tarea"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A90000] focus:ring-opacity-50"
                        />
                        <InputError
                            message={errors.a_nombre}
                            className="mt-1"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <textarea
                            value={data.a_descripcion}
                            onChange={(e) =>
                                setData("a_descripcion", e.target.value)
                            }
                            placeholder="Descripción de la tarea"
                            rows="4"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A90000]  focus:ring-opacity-50"
                        ></textarea>
                        <InputError
                            message={errors.a_descripcion}
                            className="mt-1"
                        />
                    </div>

                    {/* Horas */}
                    <div>
                        <input
                            value={data.a_horas}
                            onChange={(e) => setData("a_horas", e.target.value)}
                            type="number"
                            placeholder="Horas estimadas"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-[#A90000]  focus:ring-opacity-50"
                        />
                        <InputError message={errors.a_horas} className="mt-1" />
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
        </AuthenticatedLayout>
    );
}
