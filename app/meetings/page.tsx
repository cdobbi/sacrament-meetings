import { Suspense } from "react";
import MeetingCard from "../../components/MeetingCard";
import { getApiUrl } from "../../lib/api-url";
import type { SacramentMeeting } from "../../lib/types";

export default function MeetingsPage() {
    return (
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
            <h1 className="mb-6 text-3xl font-bold">
                Sacrament Meetings
            </h1>

            <Suspense fallback={<p>Loading meetings...</p>}>
                <MeetingsList />
            </Suspense>
        </main>
    );
}

async function MeetingsList() {
    const response = await fetch(
        getApiUrl("/api/meetings"),
        { cache: "no-store" },
    );

    if (!response.ok) {
        throw new Error(`Could not load meetings: ${response.status}`);
    }

    const meetings: SacramentMeeting[] = await response.json();

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
        </div>
    );
}