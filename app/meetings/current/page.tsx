import { io } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getMeetings } from "../../../lib/meetings-db";
import { getCurrentSundayDate } from "../../../lib/ward-date";
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
    const meeting = getMeetings(date)[0];

    if (meeting) {
        redirect(`/meetings/${meeting.id}`);
    }

    return (
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
            <h1 className="text-3xl font-bold">Current Meeting</h1>
            <p className="mt-4">No meeting is available for this Sunday.</p>
            <Link href="/meetings" className="mt-4 inline-block text-accent underline">
                View all meetings
            </Link>
        </main>
    );
}