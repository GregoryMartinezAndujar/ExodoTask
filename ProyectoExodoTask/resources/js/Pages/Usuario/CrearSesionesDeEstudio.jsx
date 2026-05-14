import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";
import VolverAtras from "@/components/VolverAtras";
import InputError from "@/components/InputError";
import { CalendarPlus } from "lucide-react";

export default function CrearSesionEstudio({ auth, tareas, grupos }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        a_tareas_ids: [],
        a_nombre: "",
        a_fecha: "",
        a_grupo_id: "",
        a_tiempo_invertido: "",
    });

    const tareasFiltradas = data.a_grupo_id
        ? tareas.filter((t) => t.a_grupo_id == data.a_grupo_id)
        : tareas.filter((t) => t.a_grupo_id === null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("sesionesdetareas.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-3xl sm:text-4xl text-gray-800">
                    Crear Sesión de Estudio
                </h2>
            }
        >
            <Head title="Nueva Sesión de Estudio" />

            <div className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
                <VolverAtras className="mb-2" />

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-300 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                            <CalendarPlus className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-xl tracking-tight text-gray-900">
                                Nueva sesión de estudio
                            </h3>
                            <p className="text-gray-500 text-xs">
                                Registra una sesión y relaciónala con tus tareas
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-700 uppercase tracking-wide">
                                Grupo
                            </label>
                            <select
                                className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                                value={data.a_grupo_id}
                                onChange={(e) =>
                                    setData("a_grupo_id", e.target.value)
                                }
                            >
                                <option value="">Sin grupo</option>
                                {grupos.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.a_nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-700 uppercase tracking-wide">
                                Fecha
                            </label>
                            <input
                                type="date"
                                className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                                value={data.a_fecha ?? ""}
                                onChange={(e) =>
                                    setData("a_fecha", e.target.value)
                                }
                            />
                            <InputError message={errors.a_fecha} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-700 uppercase tracking-wide">
                            Tareas
                        </label>

                        <select
                            multiple
                            className="w-full border-gray-300 rounded-lg h-20 shadow-sm px-2 py-1.5 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                            value={data.a_tareas_ids}
                            onChange={(e) =>
                                setData(
                                    "a_tareas_ids",
                                    Array.from(
                                        e.target.selectedOptions,
                                        (opt) => opt.value,
                                    ),
                                )
                            }
                        >
                            {tareasFiltradas.length === 0 && (
                                <option disabled>
                                    No hay tareas disponibles
                                </option>
                            )}

                            {tareasFiltradas.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.a_nombre}
                                </option>
                            ))}
                        </select>

                        <InputError
                            message={errors.a_tareas_ids}
                            className="text-red-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-700 uppercase tracking-wide">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                                value={data.a_nombre}
                                onChange={(e) =>
                                    setData("a_nombre", e.target.value)
                                }
                                placeholder="Ej: Sesión de repaso"
                            />
                            <InputError message={errors.a_nombre} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-700 uppercase tracking-wide">
                                Duración (minutos)
                            </label>
                            <input
                                type="number"
                                className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                                value={data.a_tiempo_invertido}
                                onChange={(e) =>
                                    setData(
                                        "a_tiempo_invertido",
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError message={errors.a_tiempo_invertido} />
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>

                        <DangerButton
                            className="px-5 py-2 rounded-lg bg-[#c62828] hover:bg-[#b71c1c]"
                            disabled={processing}
                        >
                            Crear sesión
                        </DangerButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
