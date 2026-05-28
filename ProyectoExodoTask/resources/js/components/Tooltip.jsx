export default function Tooltip({ text, children }) {
    return (
        <div className="relative group">
            {children}
            <div
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs text-white bg-gray-900 border border-[#A90000] rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50"
            >
                {text}
            </div>
        </div>
    );
}
