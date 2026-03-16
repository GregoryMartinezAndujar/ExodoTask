import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

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
        <div className="min-h-screen flex flex-col font-exodo">
            <Head title="Log in" />

            <div className="flex flex-col md:flex-row flex-grow">
                {/* IZQUIERDA */}
                <div className="w-full md:w-2/3 bg-gray-100 flex flex-col items-center justify-center p-10 gap-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-800">
                        Bienvenido a ExodoTask
                    </h1>

                    <div className="hidden md:flex">
                        <ApplicationLogo />
                    </div>
                </div>

                {/* DERECHA */}
                <div className="w-full md:w-1/3 flex items-center justify-center p-10">
                    <div className="w-full max-w-md">
                        {status && (
                            <div className="mb-4 text-xl font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-800 mb-6">
                            Iniciar sesión
                        </h1>

                        <form onSubmit={submit}>
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
                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-xl text-gray-600">
                                        Recordarme
                                    </span>
                                </label>
                            </div>

                            {/* BOTÓN LOGIN */}
                            <div className="mt-6">
                                <button
                                    className="w-full rounded-3xl px-3 py-3 text-white bg-[#A90000] hover:bg-[#A90000]/90 transition text-2xl border-[3px] border-black"
                                    disabled={processing}
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>

                        {/* REGISTER */}
                        <Link
                            href={route("register")}
                            className="mt-4 w-full inline-block rounded-3xl px-3 py-3 text-white bg-[#A90000] hover:bg-[#A90000]/90 transition text-center text-2xl border-[3px] border-black"
                        >
                            ¿No tienes cuenta?
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
