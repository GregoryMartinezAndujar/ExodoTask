import Checkbox from "@/components/Checkbox";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/components/ApplicationLogo";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex flex-col font-exodo bg-gradient-to-b from-white-100 to-red-800 md:bg-gray-50 shadow-inner">
            <Head title="Log in" />

            <div className="flex flex-col md:flex-row flex-grow">
                {/* IZQUIERDA (solo desktop) */}
                <div className="hidden md:flex w-2/3 bg-gray-100 flex-col items-center justify-center px-10 py-16 gap-8 shadow-inner">
                    <h1 className="text-5xl lg:text-6xl text-gray-800 text-center leading-tight">
                        Bienvenido a ExodoTask
                    </h1>

                    <div className="opacity-90">
                        <ApplicationLogo />
                    </div>
                </div>

                {/* DERECHA / MÓVIL */}
                <div className="w-full md:w-1/3 flex items-center justify-center px-6 py-12">
                    <div
                        className="
                    w-full max-w-md 
                    bg-white/70 backdrop-blur-xl 
                    p-8 rounded-3xl shadow-2xl border border-gray-200
                    animate-[fadeIn_0.4s_ease-out]
                "
                    >
                        {status && (
                            <div className="mb-4 text-xl font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <h1 className="text-4xl text-gray-800 text-center drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
                            Iniciar sesión
                        </h1>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-xl"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2 block w-full text-base py-2 rounded-lg border-gray-300 focus:ring-[#A90000]"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Contraseña"
                                    className="text-xl"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 block w-full text-base py-2 rounded-lg border-gray-300 focus:ring-[#A90000]"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* REMEMBER */}
                            <div className="flex items-center">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <label htmlFor="remember" className="ms-2 text-lg text-gray-600">
                                    Recordarme
                                </label>
                            </div>

                            {/* BOTÓN LOGIN */}
                            <button
                                className="
        w-full rounded-xl px-4 py-2
        text-white font-medium
        bg-gradient-to-br from-[#B30000] to-[#8A0000]
        shadow-[0_4px_12px_rgba(0,0,0,0.25)]
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)]
        hover:brightness-110
        active:scale-[0.97]
        transition-all duration-300
    "
                                disabled={processing}
                            >
                                Iniciar sesión
                            </button>
                        </form>

                        {/* REGISTER */}
                        <Link
                            href={route("register")}
                            className="
        w-full rounded-xl px-4 py-2
        text-white font-medium
        bg-gradient-to-br from-[#B30000] to-[#8A0000]
        shadow-[0_4px_12px_rgba(0,0,0,0.25)]
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)]
        hover:brightness-110
        active:scale-[0.97]
        transition-all duration-300
        block text-center mt-3
    "
                        >
                            ¿No tienes cuenta?
                        </Link>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="h-[8.33vh] bg-[#A90000] text-white flex items-center justify-center text-sm tracking-wide shadow-inner">
                © {new Date().getFullYear()} ExodoTask — Todos los derechos
                reservados
            </footer>
        </div>
    );
}
