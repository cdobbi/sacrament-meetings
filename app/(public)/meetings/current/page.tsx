import { io } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getMeetingByDate } from "@/lib/meetings-db";
import { getCurrentSundayDate } from "@/lib/ward-date";
import Loading from "../loading";

export default function CurrentMeetingPage() {
    return (
        <Suspense fallback={<Loading />}>
            <CurrentMeetingRedirect />
        </Suspense>
    );
}

async function CurrentMeetingRedirect() {
    await io();

    const date = getCurrentSundayDate(new Date());
    const meeting = await getMeetingByDate(date);

    if (meeting) {
        redirect(`/meetings/${meeting.id}`);
    }

    return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
            <div className="rounded-2xl bg-surface p-8 text-center ring-1 ring-accent/10">
                <h1 className="text-2xl font-bold text-accent">This Sunday</h1>
                <p className="mt-2">No meeting has been scheduled for this Sunday yet.</p>
                <Link href="/meetings" className="mt-4 inline-block font-medium text-accent underline">
                    View all meetings
                </Link>
            </div>
        </main>
    );
}
