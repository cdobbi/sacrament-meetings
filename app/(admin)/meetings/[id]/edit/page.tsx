import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { getMeetingById } from "@/lib/meetings-db";

export const instant = false;

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!/^\d+$/.test(id)) notFound();
    const meeting = await getMeetingById(Number(id));
    if (!meeting) notFound();

    return (
        <>
            <h1 className="mb-4 text-2xl font-bold text-accent">Edit Meeting</h1>
            <MeetingForm meeting={meeting} />
        </>
    );
}
