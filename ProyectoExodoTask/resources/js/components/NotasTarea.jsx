import React, { useState } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Plus, Trash2, Check } from "lucide-react";
import Tooltip from "./Tooltip";

export default function NotasTarea({ notas, tareaId }) {
    const [nuevoTexto, setNuevoTexto] = useState("");

    const agregarNota = (e) => {
        e.preventDefault();
        if (!nuevoTexto.trim()) return;

        router.post(
            route("notas.store", tareaId),
            { a_text: nuevoTexto },
            { preserveScroll: true, onSuccess: () => setNuevoTexto("") },
        );
    };

    const toggleCompletada = (nota) => {
        router.patch(
            route("notas.update", [tareaId, nota.id]),
            { a_completada: !nota.a_completada },
            { preserveScroll: true },
        );
    };

    const eliminarNota = async (nota) => {
        const result = await Swal.fire({
            title: "¿Eliminar nota?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#A90000",
        });

        if (result.isConfirmed) {
            router.delete(route("notas.destroy", [tareaId, nota.id]), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div>
            <h3 className="text-sm text-slate-400 uppercase tracking-widest mb-3">
                Notas
            </h3>

            <form onSubmit={agregarNota} className="flex gap-2 mb-4">
                <label htmlFor="nota-input" className="sr-only">Nueva nota</label>
                <input
                    id="nota-input"
                    value={nuevoTexto}
                    onChange={(e) => setNuevoTexto(e.target.value)}
                    type="text"
                    placeholder="Añadir una nota..."
                    className="flex-1 border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm focus:border-[#A90000] focus:ring focus:ring-[#A90000]/30"
                />
                <Tooltip text="Añadir nota">
                <button
                    type="submit"
                    aria-label="Añadir nota"
                    className="px-3 py-2 bg-[#A90000] text-white rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" />
                </button>
                </Tooltip>
            </form>

            <div className="space-y-2">
                {notas.length === 0 && (
                    <p className="text-slate-400 text-sm">No hay notas aún</p>
                )}
                {notas.map((nota) => (
                    <div
                        key={nota.id}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 group"
                    >
                        <Tooltip text="Marcar/desmarcar nota">
                        <button
                            type="button"
                            aria-label={nota.a_completada ? "Desmarcar nota" : "Marcar nota como completada"}
                            onClick={() => toggleCompletada(nota)}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${
                                nota.a_completada
                                    ? "bg-green-500 border-green-500 text-white"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            {nota.a_completada && <Check className="w-3 h-3" />}
                        </button>
                        </Tooltip>

                        <span
                            className={`flex-1 text-sm ${
                                nota.a_completada
                                    ? "line-through text-slate-400"
                                    : "text-slate-700"
                            }`}
                        >
                            {nota.a_text}
                        </span>

                        <Tooltip text="Eliminar nota">
                        <button
                            type="button"
                            aria-label="Eliminar nota"
                            onClick={() => eliminarNota(nota)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 transition p-1"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        </Tooltip>
                    </div>
                ))}
            </div>
        </div>
    );
}
