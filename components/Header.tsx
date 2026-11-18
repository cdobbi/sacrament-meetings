import Link from "next/link";
import { Suspense } from "react";
import NavLinks, { NavLinksList } from "./NavLinks";
import HeaderDate from "./HeaderDate";

type HeaderProps = {
    wardName: string;
};

export default function Header({ wardName }: HeaderProps) {
    return (
        <header className="sticky top-0 z-10 border-b border-accent/15 bg-surface/95 backdrop-blur print:hidden">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
                <Link href="/" className="min-w-0 leading-tight">
                    <span className="block truncate text-sm font-bold text-accent sm:text-lg">{wardName}</span>
                    <Suspense fallback={<span className="block text-xs text-foreground/80" />}>
                        <HeaderDate />
                    </Suspense>
                </Link>
                <Suspense fallback={<NavLinksList />}>
                    <NavLinks />
                </Suspense>
            </div>
        </header>
    );
}
