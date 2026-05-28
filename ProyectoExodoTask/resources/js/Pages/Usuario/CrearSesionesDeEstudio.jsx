import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import DangerButton from "@/components/DangerButton";
import VolverAtras from "@/components/VolverAtras";
import InputError from "@/components/InputError";
import { CalendarPlus } from "lucide-react";
import TiempoFormateado, { formatearAHorasMinutos } from "@/components/Formateartiempo";

export default function CrearSesionEstudio({ auth, tareas, grupos }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        a_tareas_ids: [],
        a_grupos_ids: [],
        a_nombre: "",
        a_fecha: "",
        a_tiempo_invertido: "",
    });

    const tareasIdsDeGrupos = tareas
        .filter((tarea) =>
            data.a_grupos_ids.some(
                (grupoId) => String(tarea.a_grupo_id) === String(grupoId),
            ),
        )
        .map((tarea) => tarea.id);

    const tareasSeleccionadas = [
        ...new Set([...data.a_tareas_ids, ...tareasIdsDeGrupos]),
    ];

    const tiempoTotal = tareas
        .filter((tarea) => tareasSeleccionadas.includes(tarea.id))
        .reduce((total, tarea) => total + Number(tarea.a_horas ?? 0), 0);

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
                            <label htmlFor="sesion-grupos" className="text-xs text-gray-700 uppercase tracking-wide">
                                Grupos
                            </label>
                            <select
                                id="sesion-grupos"
                                multiple
                                className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                                value={data.a_grupos_ids}
                                onChange={(e) =>
                                    setData(
                                        "a_grupos_ids",
                                        Array.from(
                                            e.target.selectedOptions,
                                            (option) => option.value,
                                        ),
                                    )
                                }
                            >
                                {grupos.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.a_nombre}
                                    </option>
                                ))}
                            </select>
                            <p className="text-[11px] text-gray-500">
                                Las tareas de los grupos seleccionados se suman
                                automáticamente.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="sesion-fecha" className="text-xs text-gray-700 uppercase tracking-wide">
                                Fecha
                            </label>
                            <input
                                id="sesion-fecha"
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
                        <label htmlFor="sesion-tareas" className="text-xs text-gray-700 uppercase tracking-wide">
                            Tareas sueltas
                        </label>

                        <select
                            id="sesion-tareas"
                            multiple
                            className="w-full border-gray-300 rounded-lg h-24 sm:h-20 shadow-sm px-2 py-1.5 text-sm sm:text-base focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                            value={data.a_tareas_ids}
                            onChange={(e) =>
                                setData(
                                    "a_tareas_ids",
                                    Array.from(
                                        e.target.selectedOptions,
                                        (opt) => Number(opt.value),
                                    ),
                                )
                            }
                        >
                            {tareas.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.a_nombre}
                                </option>
                            ))}
                            {tareas.length === 0 && (
                                <option disabled>
                                    No hay tareas disponibles
                                </option>
                            )}
                        </select>

                        <InputError
                            message={errors.a_tareas_ids}
                            className="text-red-600"
                        />
                    </div>

                    <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-gray-700">
                        <div className="flex items-center justify-between gap-2">
                            <span>Tiempo total estimado</span>
                            <span className="font-medium text-gray-900">
                                {formatearAHorasMinutos(tiempoTotal)}
                            </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                            {tareasSeleccionadas.length} tarea(s)
                            seleccionada(s), evitando duplicados.
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label htmlFor="sesion-nombre" className="text-xs text-gray-700 uppercase tracking-wide">
                                Nombre
                            </label>
                            <input
                                id="sesion-nombre"
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
                            <label htmlFor="sesion-duracion" className="text-xs text-gray-700 uppercase tracking-wide">
                                Duración calculada
                            </label>
                            <input
                                id="sesion-duracion"
                                type="text"
                                className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                                value={formatearAHorasMinutos(tiempoTotal)}
                                readOnly
                            />
                            <InputError message={errors.a_tiempo_invertido} />
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>

                        <DangerButton
                            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#c62828] hover:bg-[#b71c1c]"
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
