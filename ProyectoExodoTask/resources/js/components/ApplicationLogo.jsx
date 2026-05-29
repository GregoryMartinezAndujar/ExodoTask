export default function ApplicationLogo({ className = "", ...props }) {
    return (
        <img
            src="/images/Logo_imgupscaler.ai_Mejorador_2K.jpg"
            alt="Logo"
            className={`object-cover shadow-[0_0_40px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105 ${className}`}
            {...props}
        />
    );
}
