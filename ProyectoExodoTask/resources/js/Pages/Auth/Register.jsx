import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/components/ApplicationLogo";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="min-h-screen flex flex-col font-exodo bg-gradient-to-b from-white-100 to-red-800 md:bg-gray-50 shadow-inner">
            <Head title="Register" />

            <div className="flex flex-col md:flex-row flex-grow">
                {/* IZQUIERDA (solo desktop) */}
                <div className="hidden md:flex w-2/3 bg-gray-100 flex-col items-center justify-center px-10 py-16 gap-8 shadow-inner">
                    <h1 className="text-5xl lg:text-6xl text-gray-800 text-center leading-tight">
                        Crea tu cuenta en ExodoTask
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
                            p-8 rounded-3xl shadow-2xl border border-white-200
                            animate-[fadeIn_0.4s_ease-out]
                        "
                    >
                        <form onSubmit={submit} className="space-y-2">
                            {/* NAME */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nombre"
                                    className="text-xl"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-2 block w-full text-base py-2 rounded-lg border-gray-300 focus:ring-[#A90000]"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* EMAIL */}
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
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirmar contraseña"
                                    className="text-xl"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-2 block w-full text-base py-2 rounded-lg border-gray-300 focus:ring-[#A90000]"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            {/* BOTÓN REGISTER */}
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
                                Registrarse
                            </button>
                        </form>

                        {/* LOGIN */}
                        <Link
                            href={route("login")}
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
                            ¿Ya tienes cuenta?
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
