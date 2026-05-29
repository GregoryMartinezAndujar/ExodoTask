import { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import DangerButton from "@/components/DangerButton";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import CheckButton from "@/components/CheckButton";
import InputError from "@/components/InputError";
import TextInput from "@/components/TextInput";
import NavLink from "@/components/NavLink";
import Tooltip from "@/components/Tooltip";
import VolverAtras from "@/components/VolverAtras";
import {
    CheckSquare,
    FolderKanban,
    PlusCircle,
    FolderPlus,
    Trash2,
    Edit,
    Play,
    Pause,
    Timer,
    CheckCircle2,
    User,
    LogOut,
    LayoutDashboard,
    X,
    Menu,
} from "lucide-react";

const COLORS = [
    { name: "Blanco base", hex: "#FFFFFF", desc: "Fondo de la página, cards, formularios" },
    { name: "Negro texto", hex: "#000000", desc: "Textos principales sobre fondo claro" },
    { name: "Rojo principal", hex: "#A90000", desc: "Botones Danger, acentos, barra de progreso" },
    { name: "Rojo hover", hex: "#b91c1c", desc: "Hover de botones Danger, gradientes" },
    { name: "Rojo oscuro", hex: "#610000", desc: "Acentos alternativos" },
    { name: "Sidebar fondo", hex: "#050509", desc: "Fondo de la barra lateral" },
    { name: "Sidebar borde", hex: "#27272f", desc: "Bordes en sidebar y elementos oscuros" },
    { name: "Card sidebar", hex: "#111827", desc: "Tarjeta de usuario en la sidebar" },
    { name: "Verde completado", hex: "#16a34a", desc: "Estados finalizados y completados" },
    { name: "Rojo alerta", hex: "#FCA5A5", desc: "Fondo de alertas suaves" },
];

const TYPOGRAPHY = [
    { label: "Título grande (ultra)", size: "64px", line: "120%", class: "text-ultra font-exodo", desc: "Encabezados principales" },
    { label: "Título medio (mega)", size: "48px", line: "120%", class: "text-mega font-exodo", desc: "Secciones destacadas" },
    { label: "Título sección (4xl)", size: "36px", line: "120%", class: "text-4xl font-exodo", desc: "Títulos de página" },
    { label: "Subtítulo (2xl)", size: "24px", line: "120%", class: "text-2xl font-exodo", desc: "Subtítulos sidebar y secciones" },
    { label: "Opción / Botón", size: "14px", line: "140%", class: "text-xs uppercase tracking-widest", desc: "Botones y acciones" },
    { label: "Texto normal", size: "16px", line: "140%", class: "text-base", desc: "Cuerpo de contenido" },
    { label: "Texto pequeño", size: "14px", line: "140%", class: "text-sm", desc: "Labels, descripciones" },
    { label: "Meta / Ayuda", size: "12px", line: "140%", class: "text-xs", desc: "Textos secundarios" },
];

const ICONS = [
    { icon: CheckSquare, label: "CheckSquare", desc: "Representa el acceso a la lista de tareas, la pantalla principal del proyecto." },
    { icon: FolderKanban, label: "FolderKanban", desc: "Representa la sección de grupos, donde se organizan las tareas por categorías." },
    { icon: PlusCircle, label: "PlusCircle", desc: "Botón para crear una nueva tarea." },
    { icon: FolderPlus, label: "FolderPlus", desc: "Botón para crear un nuevo grupo o sesión de estudio." },
    { icon: Trash2, label: "Trash2", desc: "Representa la acción de eliminar una tarea o elemento." },
    { icon: Edit, label: "Edit", desc: "Representa la acción de editar una tarea existente." },
    { icon: Play, label: "Play", desc: "Inicia una sesión de estudio o el cronómetro." },
    { icon: Pause, label: "Pause", desc: "Pausa el cronómetro durante una sesión." },
    { icon: Timer, label: "Timer", desc: "Indica que el cronómetro está en ejecución." },
    { icon: CheckCircle2, label: "CheckCircle2", desc: "Marca una tarea como completada." },
    { icon: User, label: "User", desc: "Acceso a la página de perfil del usuario." },
    { icon: LogOut, label: "LogOut", desc: "Cerrar sesión." },
    { icon: LayoutDashboard, label: "LayoutDashboard", desc: "Utilizado como logo de la aplicación en la barra lateral." },
    { icon: Menu, label: "Menu", desc: "Representa el botón que el usuario pulsará para acceder al menú de categorías en la versión móvil." },
    { icon: X, label: "X", desc: "Botón con el que podrás cerrar o cancelar acciones en la página." },
];

function ColorCard({ color }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
            <div
                className="w-16 h-16 rounded-xl shadow-inner shrink-0 border border-gray-100"
                style={{ backgroundColor: color.hex }}
            />
            <div>
                <p className="font-semibold text-gray-900">{color.name}</p>
                <p className="text-sm text-gray-500 font-mono">{color.hex}</p>
                <p className="text-xs text-gray-400 mt-0.5">{color.desc}</p>
            </div>
        </div>
    );
}

function SectionTitle({ id, children }) {
    return (
        <h2 id={id} className="text-4xl font-exodo text-gray-900 border-b-2 border-[#A90000] pb-2 mb-8 pt-8">
            {children}
        </h2>
    );
}

function SubTitle({ children }) {
    return <h3 className="text-2xl font-exodo text-gray-700 mt-8 mb-4">{children}</h3>;
}

function PageSection({ children }) {
    return <section className="mb-16">{children}</section>;
}

export default function StyleGuide() {
    const contentRef = useRef(null);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap";
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    const downloadPDF = () => {
        setExporting(true);
        const element = contentRef.current;
        const opt = {
            margin: [10, 10, 10, 10],
            filename: "ExodoTask-GuiaDeEstilos.pdf",
            image: { type: "jpeg", quality: 0.95 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };
        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => setExporting(false))
            .catch(() => setExporting(false));
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <header className="bg-[#050509] text-white sticky top-0 z-50 shadow-lg">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#b91c1c] flex items-center justify-center shadow-lg shadow-[#b91c1c]/40">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-exodo">ExodoTask</h1>
                            <p className="text-xs text-gray-400">Guía de Estilo</p>
                        </div>
                    </div>
                    <DangerButton onClick={downloadPDF} disabled={exporting}>
                        {exporting ? "Generando PDF..." : "Descargar PDF"}
                    </DangerButton>
                </div>
            </header>

            <div className="bg-[#050509] text-white">
                <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#b91c1c] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#b91c1c]/50">
                        <LayoutDashboard className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-ultra font-exodo mb-2">ExodoTask</h1>
                    <p className="text-2xl font-exodo text-gray-400 mb-4">Guía de Estilo</p>
                    <p className="text-sm text-gray-500">Versión 1.0</p>
                </div>
            </div>

            <div ref={contentRef} className="max-w-5xl mx-auto px-6 py-8">

                {/* 1. FOTOS Y LOGOS */}
                <PageSection>
                    <SectionTitle id="logos">Fotos y Logos</SectionTitle>

                    <SubTitle>Logo de ExodoTask</SubTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
                        <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center border border-gray-200">
                            <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-[#b91c1c] to-[#610000] flex items-center justify-center shadow-2xl">
                                <LayoutDashboard className="w-16 h-16 text-white" />
                            </div>
                        </div>
                        <div className="text-gray-700 text-sm leading-relaxed space-y-4">
                            <p>
                                Para el diseño del logo de mi proyecto quise crear algo que representara de forma
                                sencilla pero clara la idea principal de ExodoTask. Elegí un icono de panel con forma
                                cuadrada, ya que transmite la idea de control, organización y gestión de tareas.
                            </p>
                            <p>
                                El color que utilicé para el logo es el mismo rojo que aparece en otros elementos
                                de la web. Así mantengo una coherencia visual en todo el proyecto y este color ayuda
                                a que el logo destaque sin necesidad de añadir demasiados detalles.
                            </p>
                            <p>
                                El nombre "ExodoTask" aparece en la fuente VT323 al lado del icono en la barra
                                lateral, dando la sensación de que todo gira alrededor de la organización del usuario.
                            </p>
                            <p className="text-xs text-gray-400">
                                Formato de imágenes: .png transparente para iconos y logo.
                            </p>
                        </div>
                    </div>
                </PageSection>

                {/* 2. COLORES */}
                <PageSection>
                    <SectionTitle id="colores">Colores</SectionTitle>
                    <p className="text-gray-600 text-sm mb-6">
                        Los colores del proyecto combinan un rojo corporativo como color principal con tonos
                        oscuros para la navegación y blanco para las zonas de contenido. La combinación de
                        colores usada es de estilo complementario con acentos cálidos.
                    </p>

                    <SubTitle>Paleta de colores</SubTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {COLORS.map((c) => (
                            <ColorCard key={c.hex} color={c} />
                        ))}
                    </div>

                    <SubTitle>Función de los colores</SubTitle>
                    <div className="space-y-4 text-sm text-gray-700">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-300 shrink-0" />
                            <div>
                                <p className="font-semibold">Blanco (#FFFFFF)</p>
                                <p className="text-gray-500">Color principal del diseño. Fondo de la página, tarjetas, formularios y la mayoría de los elementos. Busca dar una sensación limpia y ordenada.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-8 h-8 rounded-lg bg-black shrink-0" />
                            <div>
                                <p className="font-semibold">Negro (#000000)</p>
                                <p className="text-gray-500">Contraste con el blanco. Se usa en textos cuando están sobre fondo claro y en botones primarios.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="w-8 h-8 rounded-lg bg-[#A90000] shrink-0" />
                            <div>
                                <p className="font-semibold">Rojo principal (#A90000)</p>
                                <p className="text-gray-500">Color de acento principal. Resalta elementos importantes como botones de acción, la barra de progreso de navegación, bordes de tareas urgentes y el hover de inputs.</p>
                            </div>
                        </div>
                    </div>

                    <SubTitle>Combinación de colores: Triádico</SubTitle>
                    <p className="text-sm text-gray-600 mb-6">
                        La combinación de colores del proyecto es <strong>Triádico</strong>. Las tres
                        tonalidades principales — blanco, negro y rojo — forman un triángulo visual
                        que equilibra el diseño.
                    </p>
                    <div className="flex flex-col items-center py-8">
                        <div className="relative w-64 h-56">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-white border-2 border-gray-300 shadow-md flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-gray-800 text-center leading-tight">#FFFFFF<br />Blanco</span>
                                </div>
                            </div>
                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 256 224">
                                <line x1="128" y1="40" x2="72" y2="168" stroke="#A90000" strokeWidth="2" strokeDasharray="6 4" />
                                <line x1="128" y1="40" x2="184" y2="168" stroke="#A90000" strokeWidth="2" strokeDasharray="6 4" />
                                <line x1="72" y1="168" x2="184" y2="168" stroke="#A90000" strokeWidth="2" strokeDasharray="6 4" />
                            </svg>
                            <div className="absolute bottom-4 left-8 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-black border-2 border-gray-300 shadow-md flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white text-center leading-tight">#000000<br />Negro</span>
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-8 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-[#A90000] border-2 border-gray-300 shadow-md flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white text-center leading-tight">#A90000<br />Rojo</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 text-center max-w-md">
                            Esquema triádico: el blanco aporta limpieza, el negro da contraste y
                            el rojo pone el acento de atención donde el usuario debe enfocar su mirada.
                        </p>
                    </div>
                </PageSection>

                {/* 3. TIPOGRAFÍA */}
                <PageSection>
                    <SectionTitle id="tipografia">Tipografía</SectionTitle>

                    <SubTitle>Fuente principal: Comfortaa</SubTitle>
                    <div className="bg-[#050509] text-white rounded-xl p-8 mb-8">
                        <p className="text-ultra mb-2 leading-tight font-bold" style={{ fontFamily: "'Comfortaa', sans-serif" }}>ExodoTask</p>
                        <p className="text-mega mb-2 leading-tight font-bold" style={{ fontFamily: "'Comfortaa', sans-serif" }}>Guía de Estilo</p>
                        <p className="text-3xl leading-tight font-bold" style={{ fontFamily: "'Comfortaa', sans-serif" }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                        <p className="text-3xl leading-tight" style={{ fontFamily: "'Comfortaa', sans-serif" }}>abcdefghijklmnopqrstuvwxyz</p>
                        <p className="text-3xl leading-tight font-light" style={{ fontFamily: "'Comfortaa', sans-serif" }}>0123456789</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-8">
                        La fuente principal del proyecto es <strong>Comfortaa</strong>, una fuente sans-serif
                        redondeada y moderna. Se usa en títulos, la barra lateral, encabezados de página y
                        textos destacados. Su estilo elegante pero amigable encaja con el concepto visual del
                        proyecto.
                    </p>

                    <SubTitle>Fuente decorativa: VT323</SubTitle>
                    <p className="text-sm text-gray-600 mb-6">
                        La fuente <strong>VT323</strong> se usa como complemento decorativo en elementos
                        específicos como el cronómetro y algunos acentos visuales. Aporta un contraste
                        retro dentro del diseño moderno de Comfortaa.
                    </p>

                    <SubTitle>Tamaños y jerarquía</SubTitle>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left p-4 font-semibold text-gray-700">Estilo</th>
                                    <th className="text-left p-4 font-semibold text-gray-700">Tamaño</th>
                                    <th className="text-left p-4 font-semibold text-gray-700">Interlineado</th>
                                    <th className="text-left p-4 font-semibold text-gray-700">Uso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TYPOGRAPHY.map((t, i) => (
                                    <tr key={i} className="border-b border-gray-100 last:border-0">
                                        <td className="p-4">
                                            <span className={t.class}>{t.label}</span>
                                        </td>
                                        <td className="p-4 text-gray-600 font-mono">{t.size}</td>
                                        <td className="p-4 text-gray-600">{t.line}</td>
                                        <td className="p-4 text-gray-500">{t.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </PageSection>

                {/* 4. ICONOGRAFÍA */}
                <PageSection>
                    <SectionTitle id="iconografia">Iconografía</SectionTitle>
                    <p className="text-sm text-gray-600 mb-6">
                        Todos los iconos del proyecto provienen de la librería <strong>Lucide React</strong>. Son
                        iconos en formato SVG que se renderizan como componentes de React. Tamaño estándar:
                        <code className="font-mono bg-gray-100 px-1 rounded mx-1">w-5 h-5</code>
                        (20px) para navegación y
                        <code className="font-mono bg-gray-100 px-1 rounded mx-1">w-4 h-4</code>
                        (16px) para acciones en cards.
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                        Los iconos se usan siempre acompañados de texto o de un
                        <code className="font-mono bg-gray-100 px-1 rounded mx-1">aria-label</code>
                        descriptivo para accesibilidad.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ICONS.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 bg-white"
                                >
                                    <div className="w-28 h-28 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700 mb-4">
                                        <Icon className="w-14 h-14" />
                                    </div>
                                    <p className="text-sm text-gray-700">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </PageSection>

                {/* 5. MOCKUPS */}
                <PageSection>
                    <SectionTitle id="mockups">Mockups</SectionTitle>
                    <p className="text-sm text-gray-600 mb-6">
                        A continuación se muestran capturas representativas de las pantallas principales
                        del proyecto con sus elementos de diseño aplicados.
                    </p>

                    <SubTitle>Pantalla principal — Dashboard</SubTitle>
                    <div className="border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-8">
                        <div className="bg-[#050509] text-white px-4 py-2 text-xs font-exodo flex items-center justify-between">
                            <span>ExodoTask — Dashboard</span>
                            <span className="text-gray-500">1920 × 1080</span>
                        </div>
                        <div className="flex h-80 bg-gray-50">
                            <div className="w-56 bg-[#050509] p-4 border-r border-[#27272f] shrink-0">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b91c1c] to-[#610000] flex items-center justify-center">
                                        <LayoutDashboard className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-slate-100 font-exodo text-sm">ExodoTask</span>
                                </div>
                                <div className="rounded-xl p-2 border border-[#27272f] bg-[#111827] mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b91c1c] to-[#610000] flex items-center justify-center text-white text-xs font-bold">
                                            U
                                        </div>
                                        <span className="text-xs text-slate-100">Usuario</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {["Principal", "Crear", "Cuenta"].map((section) => (
                                        <div key={section}>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 px-2">
                                                {section}
                                            </p>
                                            <div className="h-6 bg-[#111827] rounded-lg mb-1" />
                                            <div className="h-6 bg-[#111827] rounded-lg mb-1 opacity-60" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 p-6 overflow-hidden">
                                <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
                                <div className="space-y-3">
                                    {[100, 85, 70].map((w, i) => (
                                        <div
                                            key={i}
                                            className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between"
                                        >
                                            <div className="space-y-2 flex-1">
                                                <div
                                                    className="h-3 bg-gray-200 rounded"
                                                    style={{ width: `${w}%` }}
                                                />
                                                <div className="h-2 bg-gray-100 rounded w-3/4" />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100" />
                                                <div className="w-8 h-8 rounded-lg bg-gray-100" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <SubTitle>Formulario de edición — EditarTareas</SubTitle>
                    <div className="border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-8">
                        <div className="bg-[#050509] text-white px-4 py-2 text-xs font-exodo flex items-center justify-between">
                            <span>ExodoTask — Editar Tarea</span>
                            <span className="text-gray-500">Responsive</span>
                        </div>
                        <div className="bg-gray-50 p-6">
                            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                                <div>
                                    <div className="h-2.5 w-16 bg-gray-200 rounded mb-1" />
                                    <div className="h-9 bg-gray-100 rounded-md w-full" />
                                </div>
                                <div>
                                    <div className="h-2.5 w-20 bg-gray-200 rounded mb-1" />
                                    <div className="h-20 bg-gray-100 rounded-md w-full" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="h-2.5 w-14 bg-gray-200 rounded mb-1" />
                                        <div className="h-9 bg-gray-100 rounded-md w-full" />
                                    </div>
                                    <div>
                                        <div className="h-2.5 w-16 bg-gray-200 rounded mb-1" />
                                        <div className="h-9 bg-gray-100 rounded-md w-full" />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-2">
                                    <div className="h-9 w-24 bg-gray-100 rounded-md" />
                                    <div className="h-9 w-24 bg-[#A90000] rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <SubTitle>Vista móvil — Sidebar desplegada</SubTitle>
                    <div className="flex justify-center mb-8">
                        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-lg w-72">
                            <div className="bg-[#050509] text-white px-4 py-2 text-xs font-exodo flex items-center justify-between">
                                <span>Móvil</span>
                                <span className="text-gray-500">375 × 667</span>
                            </div>
                            <div className="h-[500px] bg-gray-100 relative">
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute left-0 top-0 h-full w-56 bg-[#050509] p-4 border-r border-[#27272f]">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-white font-exodo text-sm">ExodoTask</span>
                                        <div className="w-6 h-6 flex items-center justify-center text-white">
                                            <X className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="rounded-xl p-2 border border-[#27272f] bg-[#111827] mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b91c1c] to-[#610000] flex items-center justify-center text-white text-xs font-bold">
                                                U
                                            </div>
                                            <span className="text-xs text-slate-100">Usuario</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        {["Ver Tareas", "Ver Grupos", "Nueva Tarea"].map((item) => (
                                            <div key={item} className="px-3 py-2 rounded-lg text-xs text-slate-300 bg-[#111827]">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SubTitle>Cronómetro — Sesión de estudio</SubTitle>
                    <div className="border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-8">
                        <div className="bg-[#050509] text-white px-4 py-2 text-xs font-exodo flex items-center justify-between">
                            <span>ExodoTask — Cronómetro</span>
                            <span className="text-gray-500">1920 × 1080</span>
                        </div>
                        <div className="bg-[#0b0b12] p-8 flex flex-col items-center justify-center min-h-[300px]">
                            <div className="w-48 h-48 rounded-full border-4 border-[#A90000] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(169,0,0,0.3)]">
                                <span className="text-white text-ultra font-exodo">00:00</span>
                            </div>
                            <div className="w-64 h-10 bg-[#A90000] rounded-lg" />
                        </div>
                    </div>
                </PageSection>

                {/* 6. WEBGRAFÍA */}
                <PageSection>
                    <SectionTitle id="webgrafia">Webgrafía</SectionTitle>
                    <p className="text-sm text-gray-600 mb-6">
                        Tecnologías, herramientas y referencias utilizadas en el desarrollo del proyecto.
                    </p>

                    <SubTitle>Herramientas de diseño</SubTitle>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        {[
                            { name: "Figma", desc: "Prototipado y diseño de interfaces" },
                            { name: "FluidUI", desc: "Wireframes iniciales" },
                            { name: "Google Fonts", desc: "Fuente VT323 y Comfortaa" },
                            { name: "Lucide", desc: "Librería de iconos SVG" },
                        ].map((t) => (
                            <div key={t.name} className="p-4 rounded-lg border border-gray-200 bg-white text-center">
                                <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                                <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
                            </div>
                        ))}
                    </div>

                    <SubTitle>Tecnologías de diseño</SubTitle>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { name: "Figma", desc: "Prototipado y diseño de interfaces" },
                            { name: "FluidUI", desc: "Wireframes iniciales" },
                            { name: "Tailwind CSS", desc: "Framework de estilos utilitarios" },
                            { name: "Google Fonts", desc: "Fuente VT323 y Comfortaa" },
                            { name: "Comfortaa", desc: "Fuente tipográfica principal" },
                            { name: "VT323", desc: "Fuente decorativa secundaria" },
                            { name: "Lucide", desc: "Librería de iconos SVG" },
                        ].map((t) => (
                            <div key={t.name} className="p-4 rounded-lg border border-gray-200 bg-white">
                                <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                                <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
                            </div>
                        ))}
                    </div>

                    <SubTitle>Inspiración y referencias</SubTitle>
                    <p className="text-sm text-gray-600">
                        Diseños e interfaces de referencia en Instagram, Behance y Dribbble para la
                        estructura visual del proyecto.
                    </p>
                </PageSection>

                <footer className="text-center text-xs text-gray-400 py-8 border-t border-gray-200 mt-8">
                    <p className="font-exodo text-lg text-gray-600 mb-1">ExodoTask</p>
                    <p>Guía de Estilo &mdash; {new Date().getFullYear()}</p>
                </footer>
            </div>
        </div>
    );
}
