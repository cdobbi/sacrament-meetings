"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (term.trim()) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="mb-6">
            <input
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get("query") ?? ""}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings"
                className="w-full rounded-lg border border-accent/40 bg-surface px-4 py-3 text-foreground placeholder:text-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent"
            />
        </div>
    );
}

export function MeetingSearchFallback() {
    return (
        <div className="mb-6">
            <div className="h-[50px] w-full rounded-lg border border-accent/40 bg-surface" />
        </div>
    );
}
