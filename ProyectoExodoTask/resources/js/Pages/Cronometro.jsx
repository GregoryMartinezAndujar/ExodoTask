import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function TimerFull() {
    const durationInSeconds = 2 * 3600 + 15 * 60 + 30;
    // Ejemplo: 2 horas, 15 minutos, 30 segundos

    return (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <CountdownCircleTimer
                isPlaying
                duration={durationInSeconds}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[
                    durationInSeconds,
                    durationInSeconds * 0.5,
                    durationInSeconds * 0.25,
                    0,
                ]}
                size={200}
                strokeWidth={12}
            >
                {({ remainingTime }) => {
                    const hours = Math.floor(remainingTime / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);
                    const seconds = remainingTime % 60;

                    return (
                        <h1>
                            {String(hours).padStart(2, "0")}:
                            {String(minutes).padStart(2, "0")}:
                            {String(seconds).padStart(2, "0")}
                        </h1>
                    );
                }}
            </CountdownCircleTimer>
        </div>
    );
}
