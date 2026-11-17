export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
      <p className="sr-only" role="status">Loading meeting...</p>
      <div className="animate-pulse space-y-4 rounded-2xl bg-surface p-6 ring-1 ring-accent/10" aria-hidden="true">
        <div className="mx-auto h-7 w-1/2 rounded bg-accent/15" />
        <div className="mx-auto h-4 w-1/3 rounded bg-accent/10" />
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-4 w-full rounded bg-accent/10" />
        ))}
      </div>
    </main>
  );
}
