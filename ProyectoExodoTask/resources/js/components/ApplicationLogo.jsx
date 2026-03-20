export default function ApplicationLogo(props) {
    return (
        <img
            src="/images/LogoSinFondo.png"
            alt="Logo"
            className="
        w-[520px] h-[520px]      /* tamaño grande real */
        object-cover             /* recorta para mantener círculo perfecto */
        rounded-full             /* círculo perfecto */
        shadow-[0_0_30px_rgba(169,0,0,0.45)]  /* sombra roja suave */
    "
        />
    );
}
