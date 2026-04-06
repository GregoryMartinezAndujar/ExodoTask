import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/components/PrimaryButton";
import DangerButton from "@/components/DangerButton";
import VolverAtras from "@/components/VolverAtras";
import InputError from "@/components/InputError";

export default function CrearSesionEstudio({ auth, tareas, grupos }) {
    const { data, setData, post, processing, errors } = useForm({
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

            <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                <VolverAtras className="mb-4" />

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6"
                >
                    {/* Grupo */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium">
                            Grupo
                        </label>
                        <select
                            className="border-gray-300 rounded-lg"
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

                    {/* Tareas múltiples */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium">
                            Tareas
                        </label>

                        <select
                            multiple
                            className="border-gray-300 rounded-lg h-20"
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

                        {errors.a_tareas_ids && (
                            <p className="text-red-600 text-sm">
                                {errors.a_tareas_ids}
                            </p>
                        )}
                    </div>
                    {/*Nombre*/}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="border-gray-300 rounded-lg"
                            onChange={(e) =>
                                setData("a_nombre", e.target.value)
                            }
                        />
                        <InputError message={errors.a_nombre} />
                        {/* Duración */}
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 font-medium">
                                Duración (minutos)
                            </label>
                            <input
                                type="number"
                                className="border-gray-300 rounded-lg"
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
                    {/* Fecha */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium">
                            Fecha
                        </label>
                        <input
                            type="datetime-local"
                            className="border-gray-300 rounded-lg"
                            value={data.a_fecha ?? ""}
                            onChange={(e) => setData("a_fecha", e.target.value)}
                        />
                        <InputError message={errors.a_fecha} />
                    </div>

                    {/* Notas
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium">
                            Notas
                        </label>
                        <textarea
                            className="border-gray-300 rounded-lg"
                            rows="3"
                            value={data.notas}
                            onChange={(e) => setData("notas", e.target.value)}
                        ></textarea>
                    </div> */}

                    {/* Botones */}
                    <div className="flex justify-end gap-2">
                        <DangerButton
                            type="button"
                            onClick={() => history.back()}
                        >
                            Cancelar
                        </DangerButton>

                        <PrimaryButton disabled={processing}>
                            Crear Sesión
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
