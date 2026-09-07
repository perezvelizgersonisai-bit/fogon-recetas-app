export default function Loading() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl animate-pulse">
        <div className="mb-8 h-48 rounded-2xl bg-[var(--color-cream-deep)]" />
        <div className="mb-4 h-4 w-40 rounded bg-[var(--color-cream-deep)]" />
        <div className="mb-2 h-10 w-2/3 rounded bg-[var(--color-cream-deep)]" />
        <div className="h-4 w-full rounded bg-[var(--color-cream-deep)]" />
      </div>
    </main>
  );
}
