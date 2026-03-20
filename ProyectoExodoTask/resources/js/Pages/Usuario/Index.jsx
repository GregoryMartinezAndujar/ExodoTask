import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import PrimaryButton from "@/components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";

export default function Index({ auth }) {
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
                <h2 className="text-4xl sm:text-5xl lg:text-6xl pl-4 tracking-tight">
                    Creación de Tareas
                </h2>
            }
            className="font-exodo"
        >
            <Head title="Tareas" />

            {/* CONTENEDOR PRINCIPAL */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* FORMULARIO */}
                <form
                    onSubmit={submit}
                    className="
        bg-white/90 backdrop-blur-sm
        p-4 sm:p-8 
        rounded-2xl 
        shadow-lg 
        border border-gray-200
        space-y-6
        transition-all duration-300
    "
                >
                    {/* Nombre */}
                    <div className="space-y-2">
                        <label className="text-lg sm:text-xl text-gray-700">
                            Nombre
                        </label>
                        <input
                            value={data.a_nombre}
                            onChange={(e) =>
                                setData("a_nombre", e.target.value)
                            }
                            type="text"
                            placeholder="Nombre de la tarea"
                            className="
                w-full 
                text-base sm:text-lg
                border-gray-300 
                rounded-xl 
                shadow-sm 
                px-3 py-2 sm:px-4 sm:py-2
                focus:border-[#A90000] 
                focus:ring focus:ring-[#A90000]/40
                transition-all
            "
                        />
                        <InputError
                            message={errors.a_nombre}
                            className="text-red-600"
                        />
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                        <label className="text-lg sm:text-xl text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            value={data.a_descripcion}
                            onChange={(e) =>
                                setData("a_descripcion", e.target.value)
                            }
                            placeholder="Descripción de la tarea"
                            rows="4"
                            className="
                w-full 
                text-base sm:text-lg
                border-gray-300 
                rounded-xl 
                shadow-sm 
                px-1 py-1 sm:px-1 sm:py-1
                focus:border-[#A90000] 
                focus:ring focus:ring-[#A90000]/40
                transition-all
            "
                        ></textarea>
                        <InputError
                            message={errors.a_descripcion}
                            className="text-red-600"
                        />
                    </div>

                    {/* Horas */}
                    <div className="space-y-2">
                        <label className="text-lg sm:text-xl text-gray-700">
                            Horas estimadas
                        </label>
                        <input
                            value={data.a_horas}
                            onChange={(e) => setData("a_horas", e.target.value)}
                            type="number"
                            placeholder="Horas estimadas"
                            className="
                w-full 
                text-base sm:text-lg
                border-gray-300 
                rounded-xl 
                shadow-sm 
                px-3 py-2 sm:px-4 sm:py-2
                focus:border-[#A90000] 
                focus:ring focus:ring-[#A90000]/40
                transition-all
            "
                        />
                        <InputError
                            message={errors.a_horas}
                            className="text-red-600"
                        />
                    </div>

                    {/* Botón */}
                    <div>
                        <DangerButton
                            className="
                w-full sm:w-auto 
                text-base sm:text-xl 
                px-4 py-2 sm:px-6 sm:py-1
                rounded-xl
                transition-all 
                hover:scale-[1.03]
            "
                            disabled={processing}
                        >
                            Crear
                        </DangerButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
