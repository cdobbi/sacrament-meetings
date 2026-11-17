import { Suspense } from "react";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { getMeetingById } from "@/lib/meetings-db";

type MeetingPageProps = {
    params: Promise<{ id: string }>;
};

export default function MeetingPage({ params }: MeetingPageProps) {
    return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
            <div className="mb-4 flex justify-end print:hidden">
                <PrintButton />
            </div>
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
