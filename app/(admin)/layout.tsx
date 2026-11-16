import Link from "next/link";
import type { ReactNode } from "react";

// Authentication will be added here in Week 05.
export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="bg-accent text-background print:hidden">
                <nav
                    aria-label="Admin navigation"
                    className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-4 px-4 py-2.5 text-sm sm:px-6"
                >
                    <span className="font-bold">Leader Tools</span>
                    <Link href="/meetings/new" className="font-semibold underline-offset-4 hover:underline">
                        New Meeting
                    </Link>
                    <Link href="/meetings" className="font-semibold underline-offset-4 hover:underline">
                        Back to Meetings
                    </Link>
                </nav>
            </div>

            <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
                {children}
            </main>
        </div>
    );
}
