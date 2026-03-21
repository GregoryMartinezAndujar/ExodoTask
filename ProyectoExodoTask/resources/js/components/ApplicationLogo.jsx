export default function ApplicationLogo(props) {
    return (
        <img
            src="/images/Logo_imgupscaler.ai_Mejorador_2K.jpg"
            alt="Logo"
            className="
        w-[600px] h-[600px]
        object-cover
        rounded-full
        shadow-[0_0_40px_rgba(0,0,0,0.25)]
        transition-transform duration-300
        hover:scale-105
    "
        />
    );
}
