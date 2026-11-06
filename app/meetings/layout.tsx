import Link from "next/link";
import type { ReactNode } from "react";

export default function MeetingsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex flex-1 flex-col">
            <nav
                aria-label="Meetings navigation"
                className="mx-auto w-full max-w-5xl px-6 pt-6"
            >
                <Link
                    href="/meetings"
                    className="font-semibold text-accent hover:underline"
                >
                    All Meetings
                </Link>
                <Link
                    href="/meetings/current"
                    className="ml-4 font-semibold text-accent hover:underline"
                >
                    Current Meeting
                </Link>
            </nav>

            {children}
        </div>
    );
}