import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

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
        <div className="min-h-screen flex flex-col font-exodo">
            <Head title="Register" />

            <div className="flex flex-col md:flex-row flex-grow">
                {/* IZQUIERDA */}
                <div className="w-full md:w-2/3 bg-gray-100 flex flex-col items-center justify-center p-10 gap-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-800">
                        Crea tu cuenta en ExodoTask
                    </h1>

                    <div className="hidden md:flex">
                        <ApplicationLogo />
                    </div>
                </div>

                {/* DERECHA */}
                <div className="w-full md:w-1/3 flex items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-800 mb-6">
                            Registrarse
                        </h1>

                        <form onSubmit={submit}>
                            {/* NAME */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nombre"
                                    className="text-2xl sm:text-3xl"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full text-xl py-3"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-2xl sm:text-3xl"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full text-xl py-3"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Contraseña"
                                    className="text-2xl sm:text-3xl"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full text-xl py-3"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirmar contraseña"
                                    className="text-2xl sm:text-3xl"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full text-xl py-3"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            {/* BOTÓN REGISTER */}
                            <div className="mt-6">
                                <button
                                    className="w-full rounded-3xl px-3 py-3 text-white bg-[#A90000] hover:bg-[#A90000]/90 transition text-2xl border-[3px] border-black"
                                    disabled={processing}
                                >
                                    Registrarse
                                </button>
                            </div>
                        </form>

                        {/* LOGIN */}
                        <Link
                            href={route("login")}
                            className="mt-4 w-full inline-block rounded-3xl px-3 py-3 text-white bg-[#A90000] hover:bg-[#A90000]/90 transition text-center text-2xl border-[3px] border-black"
                        >
                            ¿Ya tienes cuenta?
                        </Link>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="h-[8.33vh] bg-[#A90000] text-white flex items-center justify-center text-sm">
                © {new Date().getFullYear()} ExodoTask — Todos los derechos
                reservados
            </footer>
        </div>
    );
}
