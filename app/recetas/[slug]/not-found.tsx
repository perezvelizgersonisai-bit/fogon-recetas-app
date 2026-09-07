import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-5xl">🍽️</span>
      <h1 className="font-display text-3xl text-[var(--color-ink)]">
        No encontramos esa receta
      </h1>
      <p className="text-[var(--color-ink)]/70">
        Puede que el enlace esté mal escrito o la receta ya no exista.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-[var(--color-terracotta)] px-5 py-2 text-sm text-white hover:bg-[var(--color-terracotta-deep)]"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
