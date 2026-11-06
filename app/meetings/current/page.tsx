import { io } from "next/cache";
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

    return redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}