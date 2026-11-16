export function MeetingListSkeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-4 rounded-xl bg-surface p-4 ring-1 ring-accent/10"
        >
          <div className="h-12 w-14 rounded-lg bg-accent/20" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/2 rounded bg-accent/15" />
            <div className="h-3 w-2/3 rounded bg-accent/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
      <p className="sr-only" role="status">Loading meetings...</p>
      <div className="mb-4 h-8 w-56 animate-pulse rounded bg-accent/15" aria-hidden="true" />
      <div className="mb-4 h-[42px] w-full rounded-full bg-surface ring-1 ring-accent/20" aria-hidden="true" />
      <MeetingListSkeleton />
    </main>
  );
}
