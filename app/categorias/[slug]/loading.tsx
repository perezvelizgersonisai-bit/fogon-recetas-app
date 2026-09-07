export default function Loading() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-12 h-12 w-64 rounded bg-[var(--color-cream-deep)]" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-[var(--color-cream-deep)]" />
          ))}
        </div>
      </div>
    </main>
  );
}
