import ApplicationLogo from "@/components/ApplicationLogo";
import Dropdown from "@/components/Dropdown";
import NavLink from "@/components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

import {
    CheckSquare,
    FolderKanban,
    PlusCircle,
    FolderPlus,
    User,
    LogOut,
    LayoutDashboard,
} from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen max-h-screen overflow-hidden bg-background flex font-exodo">
            {/* SIDEBAR — Desktop */}
            <aside className="hidden md:flex w-72 flex-col py-6 border-r border-[#27272f] bg-[#050509] text-slate-100">
                {/* Logo */}
                <div className="px-4 mb-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#b91c1c] flex items-center justify-center shadow-lg shadow-[#b91c1c]/40">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg tracking-tight text-slate-50">
                                ExodoTask
                            </h1>
                            <p className="text-xs text-slate-400">
                                Gestiona tus tareas
                            </p>
                        </div>
                    </Link>
                </div>

                {/* User Card */}
                <div className="px-4 mb-8">
                    <div className="rounded-2xl p-2 border border-[#27272f] bg-[#111827]">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b91c1c] to-[#7f1d1d] flex items-center justify-center text-white  text-lg shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="truncate text-slate-50">
                                    {user.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-2 ">
                    {/* Principal */}
                    <div>
                        <p className="px-4 mb-2 text-2xl  uppercase tracking-wider text-slate-200">
                            Principal
                        </p>

                        <NavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            <span className="flex w-full items-center gap-3 px-2 py-1 ">
                                <CheckSquare className="w-5 h-5" />
                                Ver Tareas
                            </span>
                        </NavLink>

                        <NavLink
                            href={route("gruposdetareas.index")}
                            active={route().current("gruposdetareas.index")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <FolderKanban className="w-5 h-5" />
                                Ver Grupos
                            </span>
                        </NavLink>
                        <NavLink
                            href={route("sesionesdetareas.index")}
                            active={route().current("sesionesdetareas.index")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <FolderPlus className="w-5 h-5" />
                                Ver Sesiones de Estudio
                            </span>
                        </NavLink>
                    </div>

                    {/* Crear */}
                    <div>
                        <p className="px-4 mb-2 text-2xl  uppercase tracking-wider text-slate-200">
                            Crear
                        </p>

                        <NavLink
                            href={route("tareas.create")}
                            active={route().current("tareas.create")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <PlusCircle className="w-5 h-5" />
                                Nueva Tarea
                            </span>
                        </NavLink>
                        <NavLink
                            href={route("gruposdetareas.create")}
                            active={route().current("gruposdetareas.create")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <FolderPlus className="w-5 h-5" />
                                Nuevo Grupo
                            </span>
                        </NavLink>
                        <NavLink
                            href={route("sesionesdetareas.create")}
                            active={route().current("sesionesdetareas.create")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <FolderPlus className="w-5 h-5" />
                                Crear Sesion de Estudio
                            </span>
                        </NavLink>
                    </div>

                    {/* Cuenta */}
                    <div>
                        <p className="px-4 mb-2 text-2xl  uppercase tracking-wider text-slate-200">
                            Cuenta
                        </p>

                        <NavLink
                            href={route("profile.edit")}
                            active={route().current("profile.edit")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <User className="w-5 h-5" />
                                Mi Perfil
                            </span>
                        </NavLink>

                        <NavLink href={route("logout")} method="post">
                            <span className="flex items-center gap-3 px-2 py-1">
                                <LogOut className="w-5 h-5" />
                                Cerrar Sesión
                            </span>
                        </NavLink>
                    </div>
                </nav>

                {/* Footer */}
                <div className="px-4 pt-4 mt-auto border-t border-[#27272f]">
                    <p className="text-xs text-slate-500 text-center">
                        &copy; {new Date().getFullYear()} ExodoTask. Todos los
                        derechos reservados.
                    </p>
                </div>
            </aside>

            {/* OVERLAY — Mobile */}
            <div
                aria-hidden="true"
                className={`
                    fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden 
                    transition-opacity
                    ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setOpen(false)}
            />
            <aside
                id="mobile-sidebar"
                className={`
        fixed top-0 left-0 h-full w-64 overflow-y-auto
        bg-[#050509] p-6 z-50 
        transform transition-transform md:hidden 
        shadow-xl border-r border-[#27272f]
        ${open ? "translate-x-0" : "-translate-x-full"}
    `}
            >
                {/* Header móvil */}
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-lg text-slate-100">Menú</h2>
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Cerrar menú"
                        className="text-slate-100 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Usuario */}
                <div className="mb-8 px-2">
                    <div className="bg-[#111827] rounded-xl p-2 border border-[#27272f]">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b91c1c] to-[#7f1d1d] flex items-center justify-center text-white text-lg shadow-md">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-slate-100">{user.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navegación */}
                <nav className="flex-1 px-3 space-y-2 ">
                    {/* Principal */}
                    <div>
                        <NavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            <span className="flex w-full items-center gap-3 px-2 py-1 ">
                                <CheckSquare className="w-5 h-5" />
                                Ver Tareas
                            </span>
                        </NavLink>

                        <NavLink
                            href={route("gruposdetareas.index")}
                            active={route().current("gruposdetareas.index")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <FolderKanban className="w-5 h-5" />
                                Ver Grupos
                            </span>
                        </NavLink>
                        <NavLink
                            href={route("sesionesdetareas.index")}
                            active={route().current("sesionesdetareas.index")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <FolderPlus className="w-5 h-5" />
                                Ver Sesiones de Estudio
                            </span>
                        </NavLink>
                    </div>

                    {/* Crear */}
                    <div>
                        <p className="px-4 mb-2 text-2xl  uppercase tracking-wider text-slate-200">
                            Crear
                        </p>

                        <NavLink
                            href={route("tareas.create")}
                            active={route().current("tareas.create")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <PlusCircle className="w-5 h-5" />
                                Nueva Tarea
                            </span>
                        </NavLink>
                        <NavLink
                            href={route("gruposdetareas.create")}
                            active={route().current("gruposdetareas.create")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <FolderPlus className="w-5 h-5" />
                                Nuevo Grupo
                            </span>
                        </NavLink>
                        <NavLink
                            href={route("sesionesdetareas.create")}
                            active={route().current("sesionesdetareas.create")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <FolderPlus className="w-5 h-5" />
                                Crear Sesion de Estudio
                            </span>
                        </NavLink>
                    </div>

                    {/* Cuenta */}
                    <div>
                        <p className="px-4 mb-2 text-2xl  uppercase tracking-wider text-slate-200">
                            Cuenta
                        </p>

                        <NavLink
                            href={route("profile.edit")}
                            active={route().current("profile.edit")}
                        >
                            <span className="flex items-center gap-3 px-2 py-1">
                                <User className="w-5 h-5" />
                                Mi Perfil
                            </span>
                        </NavLink>

                        <NavLink href={route("logout")} method="post">
                            <span className="flex items-center gap-3 px-2 py-1">
                                <LogOut className="w-5 h-5" />
                                Cerrar Sesión
                            </span>
                        </NavLink>
                    </div>
                </nav>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex-1 flex flex-col">
                {/* HEADER — Mobile */}
                <div className="md:hidden p-4 bg-[#050509] border-b border-[#27272f] flex items-center justify-between">
                    <button
                        onClick={() => setOpen(true)}
                        aria-label="Abrir menú"
                        aria-controls="mobile-sidebar"
                        aria-expanded={open}
                        className="text-3xl text-slate-100"
                    >
                        ☰
                    </button>
                    <h2 className="text-lg text-slate-100">ExodoTask</h2>
                </div>
                {/* Header Desktop */}
                {header && (
                    <header className="hidden md:block bg-white/90 backdrop-blur-sm border-b shadow-sm p-4">
                        <div className="flex items-center justify-between w-full">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
