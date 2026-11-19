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
        <div className="relative mb-4">
            <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/70"
            >
                <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.45 4.39l3.08 3.08a.75.75 0 1 1-1.06 1.06l-3.08-3.08A7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                />
            </svg>
            <input
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get("query") ?? ""}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings"
                className="w-full rounded-full bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground shadow-sm ring-1 ring-accent/20 placeholder:text-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent"
            />
        </div>
    );
}

export function MeetingSearchFallback() {
    return <div className="mb-4 h-[42px] w-full rounded-full bg-surface ring-1 ring-accent/20" />;
}
