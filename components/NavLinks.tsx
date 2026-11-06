"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "Meetings" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation" className="flex gap-4">
            {links.map((link) => {
                const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={
                            isActive
                                ? "rounded px-3 py-2 bg-accent text-background font-semibold"
                                : "rounded px-3 py-2 hover:bg-background"
                        }
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}