import { Suspense } from "react";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../components/MeetingDetail";
import { getApiUrl } from "../../../lib/api-url";
import type { SacramentMeeting } from "../../../lib/types";

type MeetingPageProps = {
    params: Promise<{ id: string }>;
};

export default function MeetingPage({ params }: MeetingPageProps) {
    return (
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
            <Suspense fallback={<p>Loading meeting...</p>}>
                <MeetingAgenda params={params} />
            </Suspense>
        </main>
    );
}

async function MeetingAgenda({ params }: MeetingPageProps) {
    const { id } = await params;

    const response = await fetch(
        getApiUrl(`/api/meetings/${encodeURIComponent(id)}`),
        { cache: "no-store" },
    );

    if (response.status === 400 || response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error(`Could not load meeting: ${response.status}`);
    }

    const meeting: SacramentMeeting = await response.json();

    return <MeetingDetail meeting={meeting} />;
}