import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import { useForm, Head } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";
import Tarea from "@/components/Tareas";

export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        a_nombre: "",
        a_descripcion: "",
        a_horas: "",
        a_fecha_limite: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("tareas.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-3xl sm:text-4xl pl-4 tracking-tight">
                    Creación de Tareas
                </h2>
            }
            className="font-exodo"
        >
            <Head title="Tareas" />

            {/* CONTENEDOR PRINCIPAL */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* FORMULARIO */}
                <form
                    onSubmit={submit}
                    className="
                        bg-white/80 backdrop-blur-md
                        p-5 sm:p-7 
                        rounded-2xl 
                        shadow-md 
                        border border-gray-200
                        space-y-6
                        transition-all duration-300
                    "
                >
                    {/* TÍTULO DEL FORMULARIO */}
                    <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl tracking-tight text-gray-900">
                            Nueva tarea
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Añade una nueva tarea a tu lista.
                        </p>
                    </div>

                    {/* Nombre */}
                    <div className="space-y-1">
                        <label className="text-base text-gray-700 font-medium">
                            Nombre
                        </label>
                        <input
                            value={data.a_nombre}
                            onChange={(e) =>
                                setData("a_nombre", e.target.value)
                            }
                            type="text"
                            placeholder="Ej: Implementar login"
                            className="
                                w-full 
                                text-sm sm:text-base
                                border-gray-300 
                                rounded-xl 
                                shadow-sm 
                                px-3 py-2
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
                    <div className="space-y-1">
                        <label className="text-base text-gray-700 font-medium">
                            Descripción
                        </label>
                        <textarea
                            value={data.a_descripcion}
                            onChange={(e) =>
                                setData("a_descripcion", e.target.value)
                            }
                            placeholder="Describe brevemente la tarea"
                            rows="3"
                            className="
                                w-full 
                                text-sm sm:text-base
                                border-gray-300 
                                rounded-xl 
                                shadow-sm 
                                px-3 py-2
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
                    <div className="space-y-1">
                        <label className="text-base text-gray-700 font-medium">
                            Horas estimadas
                        </label>
                        <input
                            value={data.a_horas}
                            onChange={(e) => {
                                let tiempo = e.target.value;
                                setData("a_horas", tiempo);
                            }}
                            type="number"
                            placeholder="Ej: 3"
                            className="
                                w-full 
                                text-sm sm:text-base
                                border-gray-300 
                                rounded-xl 
                                shadow-sm 
                                px-3 py-2
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
                    <div className="space-y-1">
                        <label className="text-base text-gray-700 font-medium">
                            Horas estimadas
                        </label>
                        <input
                            value={data.a_fecha_limite}
                            onChange={(e) =>
                                setData("a_fecha_limite", e.target.value)
                            }
                            type="date"
                            className="
                                w-full 
                                text-sm sm:text-base
                                border-gray-300 
                                rounded-xl 
                                shadow-sm 
                                px-3 py-2
                                focus:border-[#A90000] 
                                focus:ring focus:ring-[#A90000]/40
                                transition-all
                            "
                        />
                        <InputError
                            message={errors.a_fecha_limite}
                            className="text-red-600"
                        />
                    </div>

                    {/* Botón */}
                    <div className="pt-2">
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
                            Crear tarea
                        </DangerButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
