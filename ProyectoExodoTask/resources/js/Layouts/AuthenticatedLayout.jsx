import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white-100 flex font-exodo">
            {/* SIDEBAR — Desktop */}
            <aside className="hidden md:flex w-64 bg-[#7C0303] p-6 flex-col">
                {/* Logo — SOLO DESKTOP */}
                <div className="mb-8 hidden md:flex">
                    <Link href="/" className="flex items-center">
                        {/* <ApplicationLogo className="h-14 w-auto" /> */}
                    </Link>
                </div>

                {/* Usuario */}
                <div className="mb-8 ">
                    <p className="text-white text-3xl sm:text-4xl lg:text-2xl">
                        {" "}
                        {user.name}
                    </p>
                </div>

                {/* Navegación */}
                <nav className="flex flex-col space-y-3">
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Ver Tareas
                    </NavLink>

                    <NavLink
                        href={route("tareas.index")}
                        active={route().current("tareas.index")}
                    >
                        Crear Tareas
                    </NavLink>
                    <NavLink
                        href={route("tareas.index")}
                        active={route().current("tareas.index")}
                    >
                        Crear Grupos
                    </NavLink>
                    <hr></hr>
                    <NavLink
                        href={route("tareas.index")}
                        active={route().current("tareas.index")}
                    >
                        Ver Grupos
                    </NavLink>
                    <NavLink
                        href={route("tareas.index")}
                        active={route().current("tareas.index")}
                    >
                        Sesiones De Estudio
                    </NavLink>
                    <NavLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                    >
                        Perfil
                    </NavLink>
                    <NavLink
                        href={route("logout")}
                        method="post"
                        active={route().current("logout")}
                    >
                        Cerrar sesión
                    </NavLink>
                </nav>
            </aside>

            {/* OVERLAY — Mobile */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setOpen(false)}
            />

            {/* SIDEBAR — Mobile */}
            <aside
                className={`fixed top-0 left-0 h-full w-64  border-r p-6 z-50 transform transition-transform md:hidden bg-[#7C0303]  ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header móvil (sin logo) */}
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-lg text-white">Menú</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-white-600 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Usuario */}
                <div className="mb-8">
                    <p className="text-white text-2xl sm:text-2xl lg:text-2xl">
                        {" "}
                        {user.name}
                    </p>
                </div>

                {/* Navegación */}
                <nav className="flex flex-col space-y-3">
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Ver Tareas
                    </NavLink>

                    <NavLink
                        href={route("tareas.index")}
                        active={route().current("tareas.index")}
                    >
                        Crear Tareas
                    </NavLink>
                    <NavLink
                        href={route("tareas.index")}
                        active={route().current("tareas.index")}
                    >
                        Crear Grupos
                    </NavLink>
                    <hr></hr>
                    <NavLink
                        href={route("tareas.index")}
                        active={route().current("tareas.index")}
                    >
                        Ver Grupos
                    </NavLink>
                    <NavLink
                        href={route("tareas.index")}
                        active={route().current("tareas.index")}
                    >
                        Ver Sesiones De Estudio
                    </NavLink>
                    <NavLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                    >
                        Perfil
                    </NavLink>
                    <NavLink
                        href={route("logout")}
                        active={route().current("logout")}
                    >
                        Cerrar sesión
                    </NavLink>
                </nav>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-1">
                {/* Header móvil con botón hamburguesa */}
                <div className="md:hidden p-4 bg-white border-b shadow flex items-center">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-gray-700 text-2xl mr-4"
                    >
                        ☰
                    </button>
                    {/* <h1 className="text-lg">{header}</h1> */}
                </div>

                {/* Header Desktop */}
                {header && (
                    <header>
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
