import React from "react";
import VerGrupos from "@/components/VerGruposDisponibles";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useForm, Head } from "@inertiajs/react";

export default function GruposDisponibles({
    grupos,
    auth,
    tareas,
    currentRoute,
}) {
    console.log(currentRoute);
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center space-x-3">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl pl-4 text-gray-800">
                        Grupos
                    </h2>
                </div>
            }
        >
            <Head title="Grupos" />

            <div className="space-y-4">
                {grupos.map((grupo) => (
                    <VerGrupos key={grupo.id} grupo={grupo} tareas={tareas} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
