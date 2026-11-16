import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch, { MeetingSearchFallback } from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { MeetingListSkeleton } from "./loading";

type SearchParams = Promise<{ query?: string | string[]; page?: string | string[] }>;

export default function MeetingsPage(props: { searchParams: SearchParams }) {
    return (
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
            <h1 className="mb-6 text-3xl font-bold">Sacrament Meetings</h1>

            <Suspense fallback={<MeetingSearchFallback />}>
                <MeetingSearch />
            </Suspense>

            <Suspense fallback={<MeetingListSkeleton />}>
                <MeetingsResults searchParams={props.searchParams} />
            </Suspense>
        </main>
    );
}

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

async function MeetingsResults({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;
    const query = firstValue(params.query) ?? "";
    const currentPage = Number(firstValue(params.page)) || 1;

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <>
            {meetings.length === 0 ? (
                <p role="status">
                    {query
                        ? `No meetings match "${query}".`
                        : "No meetings are available."}
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            )}

            <Pagination totalPages={totalPages} />
        </>
    );
}
