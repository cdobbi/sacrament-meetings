"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
};

const linkClass =
    "rounded-full px-4 py-1.5 text-sm font-medium text-accent ring-1 ring-accent/30 transition-colors hover:bg-accent hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 0 || currentPage > totalPages) {
        return null;
    }

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        return `${pathname}?${params.toString()}`;
    }

    return (
        <nav
            aria-label="Pagination"
            className="mt-6 flex items-center justify-between gap-4 print:hidden"
        >
            {currentPage > 1 ? (
                <Link href={createPageURL(currentPage - 1)} className={linkClass}>
                    <span aria-hidden="true">←</span> Previous
                </Link>
            ) : (
                <span className="w-24" />
            )}

            <span className="text-sm text-foreground/80">
                Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
                <span className="font-semibold text-foreground">{totalPages}</span>
            </span>

            {currentPage < totalPages ? (
                <Link href={createPageURL(currentPage + 1)} className={linkClass}>
                    Next <span aria-hidden="true">→</span>
                </Link>
            ) : (
                <span className="w-24" />
            )}
        </nav>
    );
}
