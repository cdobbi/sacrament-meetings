"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
    totalPages: number;
};

const linkClass =
    "rounded-lg bg-accent px-4 py-2 font-semibold text-background transition-colors hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export default function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    if (totalPages <= 0) {
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
            className="mt-8 flex items-center justify-between gap-4 print:hidden"
        >
            {currentPage > 1 ? (
                <Link href={createPageURL(currentPage - 1)} className={linkClass}>
                    <span aria-hidden="true">←</span> Previous
                </Link>
            ) : (
                <span />
            )}

            <span className="font-semibold">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link href={createPageURL(currentPage + 1)} className={linkClass}>
                    Next <span aria-hidden="true">→</span>
                </Link>
            ) : (
                <span />
            )}
        </nav>
    );
}
