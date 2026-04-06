import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function VerSesionesDeEstudio({ sesiones }) {
    console.log(sesiones);
    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-white shadow rounded-lg">
                <h2 className="text-2xl mb-4">Sesiones de Estudio</h2>

                {sesiones.length === 0 && (
                    <p className="text-gray-500">
                        No hay sesiones registradas.
                    </p>
                )}

                <div className="space-y-4">
                    {sesiones.map((sesion) => (
                        <div
                            key={sesion.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow transition"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl text-gray-800">
                                    {sesion.a_nombre}
                                </h3>

                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        sesion.a_finalizada
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {sesion.a_finalizada
                                        ? "Finalizada"
                                        : "En progreso"}
                                </span>
                            </div>

                            <p className="text-xl">
                                Fecha:{" "}
                                <span className="font-medium">
                                    {new Date(sesion.a_fecha).toLocaleString()}
                                </span>
                            </p>

                            <p className="text-xl">
                                Tiempo invertido:{" "}
                                <span>{sesion.a_tiempo_invertido} min</span>
                            </p>

                            {/* <div className="mt-3">
                            <p className="font-medium text-gray-700">Tareas:</p>
                            <ul className="list-disc ml-6 text-gray-600">
                                {sesion.tareas.map((tarea) => (
                                    <li key={tarea.id}>{tarea.nombre}</li>
                                ))}
                            </ul>
                        </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
