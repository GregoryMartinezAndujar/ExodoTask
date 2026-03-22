import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Tareas from "@/components/Tareas";
import ApplicationLogo from "@/components/ApplicationLogo";
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

    const [verSegunEstado, setVerSegunEstado] = useState(false);

    const tareasFiltradas = verSegunEstado
        ? tareas.filter((tarea) => tarea.a_completada === true)
        : tareas.filter((tarea) => tarea.a_completada === false);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Completadas */}
                <div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
                    onClick={() => setVerSegunEstado(true)}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
                        ✓
                    </div>
                    <div>
                        <p className="text-2xl  text-gray-900">{completadas}</p>
                        <p className="text-gray-700 font-medium">Completadas</p>
                    </div>
                </div>
                {/* Pendientes */}
                <div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
                    onClick={() => setVerSegunEstado(false)}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-xl">
                        !
                    </div>
                    <div>
                        <p className="text-2xl  text-gray-900">{pendientes}</p>
                        <p className="text-gray-700 font-medium">Pendientes</p>
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
