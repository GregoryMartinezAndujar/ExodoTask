import { use, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
export default function TimerFull({ tarea }) {
    const durationInSeconds =
        tarea.a_horas * 60 * 60 - tarea.a_horas_realizadas;

    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0);

    const { data, setData, patch, processing, reset, errors } = useForm({
        a_horas_realizadas: tarea.a_horas_realizadas,
    });
    let tiempoUsado = 0;
    return (
        <AuthenticatedLayout>
            <div className="flex flex-col items-center justify-center py-6 px-4 sm:py-10">
                {/* Card */}
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md text-center">
                    {/* Título */}
                    <h2 className="text-xl sm:text-2xl text-gray-800 dark:text-white mb-6">
                        Cronómetro
                    </h2>

                    {/* Timer */}
                    <div className="flex justify-center mb-6">
                        <CountdownCircleTimer
                            key={key}
                            isPlaying={isPlaying}
                            duration={durationInSeconds}
                            colors={[
                                "#2563EB",
                                "#F59E0B",
                                "#DC2626",
                                "#DC2626",
                            ]}
                            colorsTime={[
                                durationInSeconds,
                                durationInSeconds * 0.5,
                                durationInSeconds * 0.25,
                                0,
                            ]}
                            size={180} // móvil
                            strokeWidth={10} // móvil
                            // Ajustes para pantallas más grandes
                            responsive={{
                                sm: { size: 220, strokeWidth: 14 },
                            }}
                        >
                            {({ remainingTime }) => {
                                const hours = Math.floor(remainingTime / 3600);
                                const minutes = Math.floor(
                                    (remainingTime % 3600) / 60,
                                );
                                const seconds = remainingTime % 60;
                                tiempoUsado = durationInSeconds - remainingTime;
                                return (
                                    <span className="text-2xl sm:text-3xl  text-gray-900 dark:text-white">
                                        {String(hours).padStart(2, "0")}:
                                        {String(minutes).padStart(2, "0")}:
                                        {String(seconds).padStart(2, "0")}
                                    </span>
                                );
                            }}
                        </CountdownCircleTimer>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                        >
                            Iniciar
                        </button>

                        <button
                            onClick={() => setIsPlaying(false)}
                            className="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow transition"
                        >
                            Pausar
                        </button>

                        <button
                            onClick={() => {
                                setIsPlaying(false);
                                patch(route("tareas.update", tarea.id), {
                                    onBefore: () => {
                                        data.a_horas_realizadas =
                                            tiempoUsado +
                                            data.a_horas_realizadas;
                                    },
                                });
                            }}
                            className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
                        >
                            Finalizar
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
