import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function VerSesionesDeEstudio({ sesiones }) {
    const rippleEffect = (e) => {
        const target = e.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(target.clientWidth, target.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - target.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - target.offsetTop - radius}px`;
        circle.classList.add("ripple");

        const ripple = target.getElementsByClassName("ripple")[0];
        if (ripple) ripple.remove();

        target.appendChild(circle);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-white shadow-sm rounded-xl">
                <h2 className="text-3xl mb-6 text-gray-800 tracking-tight">
                    Sesiones de Estudio
                </h2>

                {sesiones.length === 0 && (
                    <p className="text-gray-500 text-lg">
                        No hay sesiones registradas.
                    </p>
                )}

                <div className="space-y-3">
                    {sesiones.map((sesion) => (
                        <div
                            key={sesion.id}
                            onClick={rippleEffect}
                            className="
                                relative overflow-hidden cursor-pointer
                                rounded-xl p-4 border border-gray-200
                                bg-white
                                shadow-sm
                                hover:shadow-lg
                                transition-all duration-300
                                hover:-translate-y-[2px]
                                active:scale-[0.98]
                                group
                            "
                        >
                            {/* Línea superior con degradado rojo intenso */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Contenido + botones alineados */}
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <h3 className="text-2xl text-gray-800">
                                        {sesion.a_nombre}
                                    </h3>

                                    <p className="text-lg text-gray-700">
                                        Fecha:{" "}
                                        <span className="text-gray-900">
                                            {new Date(
                                                sesion.a_fecha,
                                            ).toLocaleString()}
                                        </span>
                                    </p>

                                    <p className="text-lg text-gray-700">
                                        Tiempo invertido:{" "}
                                        <span className="text-gray-900">
                                            {sesion.a_tiempo_invertido} min
                                        </span>
                                    </p>

                                    <span
                                        className={`px-3 py-1 text-sm rounded-full inline-block ${
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

                                {/* Botones a la derecha */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 ml-4">
                                    <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-base">
                                        Ver detalles
                                    </button>

                                    <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-base">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
