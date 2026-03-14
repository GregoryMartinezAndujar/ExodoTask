import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
dayjs.extend(relativeTime);

const VerGrupos = ({ grupo }) => {
    return (
        <div className="bg-gray-50 hover:bg-gray-100 transition rounded-xl p-6 shadow-sm border mb-4">
            <small className="text-gray-500 sm:text-xl">
                {dayjs(grupo.created_at).fromNow()}
            </small>
            {/* Título */}
            <p className="text-lg sm:text-xl lg:text-2xl mt-3 ">
                {grupo.a_nombre}
            </p>

            {/* BOTONES RESPONSIVE */}
            <div className="flex flex-col sm:flex-row sm:space-x-3 gap-2 mt-4">
                <PrimaryButton className="w-full sm:w-auto">
                    Completada
                </PrimaryButton>

                <PrimaryButton className="w-full sm:w-auto">
                    Editar
                </PrimaryButton>

                <DangerButton className="w-full sm:w-auto bg-[#A90000] hover:bg-red-700">
                    Eliminar
                </DangerButton>
            </div>
        </div>
    );
};

export default VerGrupos;
