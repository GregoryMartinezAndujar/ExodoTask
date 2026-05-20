import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/components/ApplicationLogo';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido" />

            <div className="min-h-screen bg-[#050509]">
                <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
                    <span className="text-xl font-bold text-white">ExodoTask</span>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg bg-[#b91c1c] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#A90000]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-semibold text-gray-300 transition hover:text-white"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-[#b91c1c] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#A90000]"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                <section className="flex flex-col items-center px-6 py-20 text-center lg:py-32">
                    <ApplicationLogo className="mb-8 h-32 w-32 rounded-full shadow-[0_0_60px_rgba(185,28,28,0.35)] transition-transform duration-300 hover:scale-105" />

                    <h1 className="text-4xl font-bold text-white lg:text-6xl">
                        Gestiona tus tareas
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-gray-400">
                        Organiza tus tareas, agrúpalas por proyectos, cronometra tu tiempo de estudio
                        y alcanza tus metas con ExodoTask.
                    </p>

                    {!auth.user && (
                        <div className="mt-8 flex gap-4">
                            <Link
                                href={route('register')}
                                className="rounded-lg bg-[#b91c1c] px-8 py-3 font-semibold text-white transition hover:bg-[#A90000]"
                            >
                                Comenzar gratis
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-lg border border-gray-600 px-8 py-3 font-semibold text-gray-300 transition hover:border-gray-400 hover:text-white"
                            >
                                Iniciar sesión
                            </Link>
                        </div>
                    )}
                </section>

                <section className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="text-center text-3xl font-bold text-gray-900">
                            Todo lo que necesitas para organizar tu día
                        </h2>

                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-red-100">
                                    <svg className="size-6 text-[#b91c1c]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Gestión de Tareas</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Crea, edita y completa tareas con fechas límite, descripciones y niveles de prioridad.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-red-100">
                                    <svg className="size-6 text-[#b91c1c]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Grupos de Tareas</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Agrupa tus tareas por proyectos o categorías para mantener todo organizado.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-red-100">
                                    <svg className="size-6 text-[#b91c1c]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Cronómetro</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Cronometra tu tiempo de estudio o trabajo con un temporizador visual integrado.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-red-100">
                                    <svg className="size-6 text-[#b91c1c]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Sesiones de Estudio</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Registra y revisa tus sesiones de estudio con fechas y tiempo invertido.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-red-100">
                                    <svg className="size-6 text-[#b91c1c]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Prioridades</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Asigna niveles de prioridad a tus tareas para saber qué hacer primero.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-red-100">
                                    <svg className="size-6 text-[#b91c1c]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">Niveles</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Sube de nivel a medida que completas tareas y mantén tu productividad al máximo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
                    ExodoTask © {new Date().getFullYear()}
                </footer>
            </div>
        </>
    );
}
