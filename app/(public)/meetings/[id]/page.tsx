import { Suspense } from "react";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

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

    if (!/^\d+$/.test(id)) {
        notFound();
    }

    const meeting = await getMeetingById(Number(id));

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}
