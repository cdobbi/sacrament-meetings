export function MeetingListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="animate-pulse rounded-lg bg-surface p-6 shadow-sm">
          <div className="h-6 w-2/3 rounded bg-accent/20" />
          <div className="mt-3 h-4 w-1/3 rounded bg-accent/10" />
          <div className="mt-3 h-4 w-1/2 rounded bg-accent/10" />
        </div>
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
      <p className="sr-only" role="status">Loading meetings...</p>
      <div className="mb-6 h-9 w-72 animate-pulse rounded bg-accent/20" aria-hidden="true" />
      <div className="mb-6 h-[50px] w-full rounded-lg bg-surface" aria-hidden="true" />
      <MeetingListSkeleton />
    </main>
  );
}
