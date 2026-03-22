import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Tareas from "@/components/Tareas";
import { useState } from "react";
export default function Dashboard({
    tareas,
    currentRoute,
    prioridades,
    auth,
    grupos,
}) {
    let completadas = tareas.filter(
        (tarea) => tarea.a_completada === true,
    ).length;
    let pendientes = tareas.filter(
        (tarea) => tarea.a_completada === false,
    ).length;

    const [verSegunEstado, setVerSegunEstado] = useState(null);

    const tareasFiltradas =
        verSegunEstado === true
            ? tareas.filter((t) => t.a_completada === true)
            : verSegunEstado === false
              ? tareas.filter((t) => t.a_completada === false)
              : tareas; // si es null, mostrar todas
    const tareasTotales = tareas.length;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-800 pl-4">
                        Tareas
                    </h2>

                    {/* <ApplicationLogo className="h-14 w-auto" /> */}
                </div>
            }
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {/* Completadas */}
                <div
                    onClick={() => setVerSegunEstado(true)}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200 
                   active:scale-[0.98] transition sm:p-4"
                >
                    <div
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
                        rounded-full bg-green-100 text-green-600 text-lg sm:text-xl"
                    >
                        ✓
                    </div>

                    <div>
                        <p className="text-xl sm:text-2xl text-gray-900">
                            {completadas}
                        </p>
                        <p className="text-gray-700 text-sm sm:text-base font-medium">
                            Completadas
                        </p>
                    </div>
                </div>

                {/* Pendientes */}
                <div
                    onClick={() => setVerSegunEstado(false)}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200 
                   active:scale-[0.98] transition sm:p-4"
                >
                    <div
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
                        rounded-full bg-yellow-100 text-yellow-600 text-lg sm:text-xl"
                    >
                        !
                    </div>

                    <div>
                        <p className="text-xl sm:text-2xl text-gray-900">
                            {pendientes}
                        </p>
                        <p className="text-gray-700 text-sm sm:text-base font-medium">
                            Pendientes
                        </p>
                    </div>
                </div>

                {/* Totales */}
                <div
                    onClick={() => setVerSegunEstado(null)}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200 
                   active:scale-[0.98] transition sm:p-4"
                >
                    <div
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
                        rounded-full bg-blue-100 text-blue-600 text-lg sm:text-xl"
                    >
                        #
                    </div>

                    <div>
                        <p className="text-xl sm:text-2xl text-gray-900">
                            {tareasTotales}
                        </p>
                        <p className="text-gray-700 text-sm sm:text-base font-medium">
                            Tareas Totales
                        </p>
                    </div>
                </div>
            </div>

            <Head title="Página Principal" />

            <div className="space-y-4">
                {tareasFiltradas.map((tarea) => (
                    <Tareas
                        key={tarea.id}
                        tarea={tarea}
                        ruta={currentRoute}
                        prioridades={prioridades}
                        grupos={grupos}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
