import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out mt-3" +
                (active
                    ? " bg-[#a91818] text-white shadow-lg transition   shadow-[0_0_25px_rgba(185,28,28,0.6)]"
                    : " text-white/80 hover:bg-white/10 hover:text-white hover:bg-white/10 hover:outline hover:outline-2 hover:outline-white rounded-lg transition focus:outline-none focus:ring-2 focus:ring-white") +
                " " +
                className
            }
        >
            {children}
        </Link>
    );
}
