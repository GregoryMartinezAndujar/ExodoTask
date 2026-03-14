import React from "react";
import VerGrupos from "@/components/VerGruposDisponibles";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useForm, Head } from "@inertiajs/react";

export default function GruposDisponibles({ grupos }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-3">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl  text-gray-800">
                        Grupos
                    </h2>
                </div>
            }
        >
            <Head title="Grupos" />

            <div>
                {grupos.map((grupo) => (
                    <VerGrupos key={grupo.id} grupo={grupo} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
