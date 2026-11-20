"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MeetingsError({ error, retry }: { error: unknown; retry: () => void }) {
    useEffect(() => {
        console.error("Meetings route error:", error);
    }, [error]);

    return (
        <div className="mx-auto my-8 w-full max-w-xl rounded-2xl bg-surface p-8 text-center shadow-sm ring-1 ring-accent/10">
            <h1 className="text-2xl font-bold text-accent">Something went wrong</h1>
            <p className="mt-3">Unable to load or save the meeting. Please try again.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
                <button type="button" onClick={retry}
                    className="rounded-md bg-accent px-4 py-2 font-semibold text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    Try Again
                </button>
                <Link href="/meetings" className="rounded-md px-4 py-2 font-semibold text-accent underline">
                    Back to meetings
                </Link>
            </div>
        </div>
    );
}
