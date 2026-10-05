export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-busy="true">
      <p className="sr-only" role="status">
        Loading page
      </p>
      <div className="h-3 w-24 animate-pulse rounded bg-gold/50" />
      <div className="mt-4 h-10 w-2/3 max-w-md animate-pulse rounded bg-ink/15" />
      <div className="mt-3 h-1 w-16 rounded bg-gold/40" />
      <div className="mt-6 h-5 w-full max-w-xl animate-pulse rounded bg-ink/10" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-lg border border-ink/10 bg-card" />
        ))}
      </div>
    </div>
  );
}
