import Link from "next/link";

export default function MeetingNotFound() {
    return (
        <div className="rounded-2xl bg-surface p-8 text-center shadow-sm ring-1 ring-accent/10">
            <h1 className="text-2xl font-bold text-accent">Meeting not found</h1>
            <p className="mt-3">The meeting you are looking for does not exist.</p>
            <Link href="/meetings" className="mt-4 inline-block font-semibold text-accent underline">
                Back to meetings
            </Link>
        </div>
    );
}
