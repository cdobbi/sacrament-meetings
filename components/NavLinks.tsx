"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "Meetings" },
    { href: "/meetings/new", label: "Planner" },
];

function isPlannerPath(pathname: string) {
    return pathname === "/meetings/new" || pathname.endsWith("/edit");
}

export function NavLinksList({ pathname }: { pathname?: string }) {
    return (
        <nav aria-label="Main navigation" className="flex shrink-0 gap-1 text-sm">
            {links.map((link) => {
                const isActive =
                    pathname !== undefined && (link.href === "/meetings/new"
                        ? isPlannerPath(pathname)
                        : pathname === link.href ||
                          (link.href !== "/" &&
                              pathname.startsWith(`${link.href}/`) &&
                              !isPlannerPath(pathname)));

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={`rounded-full px-2.5 py-1.5 font-medium transition-colors sm:px-3 ${
                            isActive
                                ? "bg-accent text-background"
                                : "text-foreground hover:bg-accent/10"
                        }`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}

export default function NavLinks() {
    const pathname = usePathname();
    return <NavLinksList pathname={pathname} />;
}
