import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import VolverAtras from "@/components/VolverAtras";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import TiempoFormateado from "@/components/Formateartiempo";
export default function TimerFull({ tarea }) {
    const durationInSeconds = tarea.a_horas - tarea.a_horas_realizadas;

    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0);

    const { data, setData, patch, processing, reset, errors } = useForm({
        a_horas_realizadas: tarea.a_horas_realizadas,
    });

    let tiempoUsado = 0;
    function formatearTiempo(segundos) {
        if (segundos >= 3600) {
            return (segundos / 3600).toFixed(1) + " h";
        }
        if (segundos >= 60) {
            return Math.trunc(segundos / 60) + " min";
        }
        return segundos + " s";
    }

    return (
        <AuthenticatedLayout>
            <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                <VolverAtras />
            </div>

            <div className="flex flex-col items-center justify-center py-10 px-4 sm:py-14">
                <div
                    className="
                        w-full max-w-md
                        bg-white dark:bg-neutral-900
                        rounded-3xl
                        border border-neutral-200/80 dark:border-neutral-800
                        shadow-[0_18px_40px_rgba(0,0,0,0.08)]
                        px-7 py-8 sm:px-10 sm:py-10
                        transition-all
                    "
                >
                    <div className="mb-8 text-center">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                            Tarea
                        </p>
                        <h2 className="mt-2 text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50 tracking-tight">
                            Cronómetro
                        </h2>
                    </div>

                    <div className="flex justify-center mb-10">
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
                            size={230}
                            strokeWidth={10}
                        >
                            {({ remainingTime }) => {
                                const hours = Math.floor(remainingTime / 3600);
                                const minutes = Math.floor(
                                    (remainingTime % 3600) / 60,
                                );
                                const seconds = remainingTime % 60;
                                tiempoUsado = durationInSeconds - remainingTime;

                                return (
                                    <span
                                        className="
                                            text-4xl sm:text-5xl
                                            text-neutral-900 dark:text-neutral-50
                                            tracking-tight
                                        "
                                    >
                                        {String(hours).padStart(2, "0")}:
                                        {String(minutes).padStart(2, "0")}:
                                        {String(seconds).padStart(2, "0")}
                                    </span>
                                );
                            }}
                        </CountdownCircleTimer>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="
                                w-full sm:w-auto
                                px-6 py-2.5
                                rounded-full
                                bg-neutral-900 hover:bg-neutral-800
                                text-neutral-50
                                shadow-sm hover:shadow-md
                                transition-all
                                active:scale-95
                            "
                        >
                            Iniciar
                        </button>

                        <button
                            onClick={() => setIsPlaying(false)}
                            className="
                                w-full sm:w-auto
                                px-6 py-2.5
                                rounded-full
                                bg-neutral-100 hover:bg-neutral-200
                                text-neutral-900
                                shadow-sm hover:shadow-md
                                transition-all
                                active:scale-95
                            "
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
                            className="
                                w-full sm:w-auto
                                px-6 py-2.5
                                rounded-full
                                bg-red-500 hover:bg-red-600
                                text-white
                                shadow-sm hover:shadow-md
                                transition-all
                                active:scale-95
                            "
                        >
                            Finalizar
                        </button>
                    </div>
                </div>
                {/* Card inferior con datos de la tarea */}
                <div
                    className="mt-10 w-full bg-neutral-50 dark:bg-neutral-900/60 rounded-2xl border border-neutral-200 
                dark:border-neutral-800 shadow-smp-6 flex flex-col gap-4 transition-all p-4 text-2xl sm:text-3xl"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-neutral-500 dark:text-neutral-400 text-xl">
                            Nombre
                        </span>
                        <span className="text-xl">{tarea.a_nombre}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-neutral-500 dark:text-neutral-400 text-xl">
                            Horas totales
                        </span>
                        <TiempoFormateado segundos={tarea.a_horas} />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-neutral-500 dark:text-neutral-400 text-xl">
                            Horas realizadas
                        </span>
                        <span className="text-xl">
                            <TiempoFormateado
                                segundos={tarea.a_horas_realizadas}
                            />
                        </span>
                    </div>

                    {/* <div className="flex justify-between items-center">
                        <span className="text-neutral-500 dark:text-neutral-400 text-xl">
                            Horas restantes
                        </span>
                        <span className="text-xl">
                            {(
                                (tarea.a_horas - tarea.a_horas_realizadas) /
                                3600
                            ).toFixed(2)}{" "}
                            h
                        </span>
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
