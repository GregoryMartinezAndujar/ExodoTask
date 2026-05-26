import React from "react";
import VerGrupos from "@/components/VerGruposDisponibles";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

export default function GruposDisponibles({
    grupos,
    auth,
    tareas,
    currentRoute,
}) {
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

            <div className="w-full max-w-7xl mx-auto p-4">
                {grupos.length === 0 ? (
                    <div className="p-6 bg-white shadow-sm rounded-xl border border-gray-200 text-center">
                        <p className="text-gray-500 text-base">
                            No hay grupos disponibles.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {grupos.map((grupo) => (
                            <VerGrupos key={grupo.id} grupo={grupo} tareas={tareas} />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
