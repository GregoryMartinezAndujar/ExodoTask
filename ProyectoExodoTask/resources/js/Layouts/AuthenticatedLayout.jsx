import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white flex font-exodo">
            {/* SIDEBAR — Desktop */}
            <aside className="hidden md:flex w-64 bg-[#7C0303] p-6 flex-col shadow-xl">
                {/* Logo */}
                <div className="mb-10 flex justify-center">
                    <Link href="/" className="flex items-center">
                        {/* <ApplicationLogo className="h-14 w-auto" /> */}
                    </Link>
                </div>

                {/* Usuario */}
                <div className="mb-10">
                    <p className="text-white text-3xl  leading-tight">
                        {user.name}
                    </p>
                </div>

                {/* Navegación */}
                <nav className="flex flex-col space-y-4">
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Ver Tareas
                    </NavLink>
                    <NavLink
                        href={route("gruposdetareas.index")}
                        active={route().current("gruposdetareas.index")}
                    >
                        Ver Grupos
                    </NavLink>
                    <hr></hr>
                    <NavLink
                        href={route("tareas.create")}
                        active={route().current("tareas.create")}
                    >
                        Crear Tareas
                    </NavLink>

                    <NavLink
                        href={route("gruposdetareas.create")}
                        active={route().current("gruposdetareas.create")}
                    >
                        Crear Grupos
                    </NavLink>

                    <hr></hr>

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
                className={`fixed top-0 left-0 h-full w-64 bg-[#7C0303] p-6 z-50 transform transition-transform md:hidden shadow-xl ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header móvil */}
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-lg text-white ">Menú</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-white text-2xl"
                    >
                        ✕
                    </button>
                </div>
 
                {/* Usuario */}
                <div className="mb-8">
                    <p className="text-white text-2xl leading-tight">
                        {user.name}
                    </p>
                </div>

                {/* Navegación */}
                <nav className="flex flex-col space-y-4 ">
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Ver Tareas
                    </NavLink>
                    <NavLink
                        href={route("gruposdetareas.index")}
                        active={route().current("gruposdetareas.index")}
                    >
                        Ver Grupos
                    </NavLink>
                    <hr />
                    <NavLink
                        href={route("tareas.create")}
                        active={route().current("tareas.create")}
                    >
                        Crear Tareas
                    </NavLink>

                    <NavLink
                        href={route("gruposdetareas.create")}
                        active={route().current("gruposdetareas.create")}
                    >
                        Crear Grupos
                    </NavLink>

                    <hr />

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

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-1 flex flex-col">
                {/* Header móvil */}
                <div className="md:hidden p-4 bg-white border-b shadow flex items-center">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-gray-700 text-2xl mr-4"
                    >
                        ☰
                    </button>
                </div>

                {/* Header Desktop */}
                {header && (
                    <header className="bg-white border-b shadow-sm p-4">
                        <div className="flex items-center justify-between w-full">
                            {header}
                        </div>
                    </header>
                )}

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
