import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Tareas from "@/components/Tareas";

export default function Dashboard({ tareas, currentRoute }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-3">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl  text-gray-800">
                        Tareas
                    </h2>
                </div>
            }
        >
            <Head title="Página Principal" />

            <div>
                {tareas.map((tarea) => (
                    <Tareas key={tarea.id} tarea={tarea} ruta={currentRoute} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
