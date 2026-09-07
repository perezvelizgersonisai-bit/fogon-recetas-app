import Link from "next/link";
import { getCategorias, getRecetas } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [categorias, recetas] = await Promise.all([
    getCategorias(),
    getRecetas(),
  ]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[var(--color-cream-deep)] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm tracking-wide text-[var(--color-terracotta)]">
            Un recetario para cocinar con calma
          </p>
          <h1 className="font-display text-5xl leading-tight text-[var(--color-ink)] md:text-7xl">
            Fogón
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-ink)]/70">
            Recetas sencillas, probadas en casa, para desayunos, comidas
            fuertes, postres, bebidas y días en que quieres comer bien y
            ligero.
          </p>
        </div>
      </section>

      {/* Categorías */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-8 text-2xl text-[var(--color-ink)]">
            Explora por categoría
          </h2>
          {categorias.length === 0 ? (
            <p className="text-[var(--color-ink)]/60">
              No hay categorías todavía. Conecta Supabase y ejecuta{" "}
              <code className="rounded bg-[var(--color-cream-deep)] px-1.5 py-0.5">
                supabase/schema.sql
              </code>
              .
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.slug}
                  href={`/categorias/${categoria.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-cream-deep)] bg-white/50 px-4 py-6 text-center transition-colors hover:border-[var(--color-terracotta)] hover:bg-white"
                >
                  <span className="text-3xl">{categoria.icono}</span>
                  <span className="font-display text-sm text-[var(--color-ink)]">
                    {categoria.nombre}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recetas destacadas */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-8 text-2xl text-[var(--color-ink)]">
            Todas las recetas
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {recetas.map((receta) => (
              <Link
                key={receta.slug}
                href={`/recetas/${receta.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-cream-deep)] bg-white/60 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-36 items-center justify-center bg-[var(--color-cream-deep)] text-5xl">
                  {receta.imagen_emoji}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-terracotta)]">
                    {receta.dificultad} · {receta.tiempo_preparacion}
                  </span>
                  <h3 className="font-display text-xl text-[var(--color-ink)]">
                    {receta.titulo}
                  </h3>
                  <p className="text-sm text-[var(--color-ink)]/70">
                    {receta.descripcion}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--color-cream-deep)] px-6 py-8 text-center text-sm text-[var(--color-ink)]/50">
        Hecho con Next.js App Router y Supabase.
      </footer>
    </main>
  );
}
