import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import { useForm, Head } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";
import { Plus } from "lucide-react";

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

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <form
                    onSubmit={submit}
                    className="bg-white border border-gray-300 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                            <Plus className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-2xl tracking-tight text-gray-900">
                                Nueva tarea
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Añade una nueva tarea a tu lista
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <div className="space-y-1.5">
                        <label className="text-sm text-gray-700 uppercase tracking-wide">
                            Nombre
                        </label>
                        <input
                            value={data.a_nombre}
                            onChange={(e) =>
                                setData("a_nombre", e.target.value)
                            }
                            type="text"
                            placeholder="Ej: Implementar login"
                            className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2.5 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                        />
                        <InputError
                            message={errors.a_nombre}
                            className="text-red-600"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm text-gray-700 uppercase tracking-wide">
                            Descripción
                        </label>
                        <textarea
                            value={data.a_descripcion}
                            onChange={(e) =>
                                setData("a_descripcion", e.target.value)
                            }
                            placeholder="Describe brevemente la tarea"
                            rows="4"
                            className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2.5 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                        ></textarea>
                        <InputError
                            message={errors.a_descripcion}
                            className="text-red-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-sm text-gray-700 uppercase tracking-wide">
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
                                className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2.5 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                            />
                            <InputError
                                message={errors.a_horas}
                                className="text-red-600"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm text-gray-700 uppercase tracking-wide">
                                Fecha límite
                            </label>
                            <input
                                value={data.a_fecha_limite}
                                onChange={(e) =>
                                    setData("a_fecha_limite", e.target.value)
                                }
                                type="date"
                                className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2.5 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                            />
                            <InputError
                                message={errors.a_fecha_limite}
                                className="text-red-600"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>

                        <DangerButton
                            className="px-6 py-2.5 rounded-lg bg-[#c62828] hover:bg-[#b71c1c]"
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
