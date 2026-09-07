"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-5xl">⚠️</span>
      <h1 className="font-display text-3xl text-[var(--color-ink)]">
        Algo salió mal
      </h1>
      <p className="max-w-md text-[var(--color-ink)]/70">
        No pudimos cargar el contenido. Intenta de nuevo en unos segundos.
      </p>
      <button
        onClick={() => reset()}
        className="mt-2 rounded-full bg-[var(--color-terracotta)] px-5 py-2 text-sm text-white hover:bg-[var(--color-terracotta-deep)]"
      >
        Reintentar
      </button>
    </main>
  );
}
