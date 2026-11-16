"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { href: "/meetings", label: "All meetings" },
    { href: "/meetings/current", label: "This Sunday" },
];

export function MeetingsTabsList({ activeHref }: { activeHref?: string }) {
    return (
        <nav aria-label="Meetings navigation" className="inline-flex gap-1 rounded-full bg-surface p-1 text-sm shadow-sm ring-1 ring-accent/10">
            {tabs.map((tab) => {
                const isActive = activeHref === tab.href;
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                            isActive ? "bg-accent text-background" : "text-foreground hover:bg-accent/10"
                        }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </nav>
    );
}

export default function MeetingsTabs() {
    const pathname = usePathname();
    return <MeetingsTabsList activeHref={pathname} />;
}
