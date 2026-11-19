import { Suspense } from "react";
import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch, { MeetingSearchFallback } from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { MeetingListSkeleton } from "./loading";

type SearchParams = Promise<{ query?: string | string[]; page?: string | string[] }>;

export default function MeetingsPage(props: { searchParams: SearchParams }) {
    return (
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
            <h1 className="mb-4 text-2xl font-bold text-accent">Sacrament Meetings</h1>

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
    const requestedPage = Number(firstValue(params.page));
    const currentPage =
        Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <>
            {meetings.length === 0 && totalPages > 0 ? (
                <p role="status" className="rounded-xl bg-surface p-6 text-center">
                    Page {currentPage} doesn&apos;t exist.{" "}
                    <Link href="/meetings" className="font-medium text-accent underline">
                        Go to page 1
                    </Link>
                </p>
            ) : meetings.length === 0 ? (
                <p role="status" className="rounded-xl bg-surface p-6 text-center">
                    {query
                        ? `No meetings match "${query}".`
                        : "No meetings are available."}
                </p>
            ) : (
                <div className="space-y-3">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            )}

            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </>
    );
}
