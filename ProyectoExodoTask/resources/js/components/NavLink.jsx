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
                "inline-flex text-3xl sm:text-4xl lg:text-2xl items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-black text-white focus:border-black"
                    : "border-transparent text-white/80 hover:border-black/50 hover:text-white focus:border-white/50 focus:text-white") +
                className
            }
        >
            {children}
        </Link>
    );
}
