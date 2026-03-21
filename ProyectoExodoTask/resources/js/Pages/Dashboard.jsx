import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Tareas from "@/components/Tareas";
import ApplicationLogo from "@/components/ApplicationLogo";
export default function Dashboard({
    tareas,
    currentRoute,
    prioridades,
    auth,
    grupos,
}) {
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
            <Head title="Página Principal" />

            <div className="space-y-4">
                {tareas.map((tarea) => (
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
