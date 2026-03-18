import React from "react";
import VerGrupos from "@/components/VerGruposDisponibles";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useForm, Head } from "@inertiajs/react";

export default function GruposDisponibles({ grupos, auth }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center space-x-3">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl  text-gray-800">
                        Grupos
                    </h2>
                </div>
            }
        >
            <Head title="Grupos" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grupos.map((grupo) => (
                    <VerGrupos key={grupo.id} grupo={grupo} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
