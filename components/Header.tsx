import Link from "next/link";
import NavLinks from "./NavLinks";
import { WARD_TIME_ZONE } from "../lib/ward-date";

type HeaderProps = {
    wardName: string;
};

export default function Header({ wardName }: HeaderProps) {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: WARD_TIME_ZONE,
    });

    return (
        <header className="sticky top-0 z-10 border-b border-accent/15 bg-surface/95 backdrop-blur print:hidden">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
                <Link href="/" className="min-w-0 leading-tight">
                    <span className="block truncate text-sm font-bold text-accent sm:text-lg">{wardName}</span>
                    <span className="block text-xs text-foreground/80">{currentDate}</span>
                </Link>
                <NavLinks />
            </div>
        </header>
    );
}
