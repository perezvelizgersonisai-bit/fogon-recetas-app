import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecetaBySlug, getRecetas } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const recetas = await getRecetas();
  return recetas.map((receta) => ({ slug: receta.slug }));
}

export default async function RecetaPage({ params }: Props) {
  const { slug } = await params;
  const receta = await getRecetaBySlug(slug);

  if (!receta) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-[var(--color-terracotta)] hover:underline"
        >
          ← Volver a todas las recetas
        </Link>

        <div className="mb-8 flex h-48 items-center justify-center rounded-2xl bg-[var(--color-cream-deep)] text-7xl">
          {receta.imagen_emoji}
        </div>

        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-terracotta)]">
          {receta.dificultad} · {receta.tiempo_preparacion} · {receta.porciones}{" "}
          porciones
        </span>
        <h1 className="font-display mt-2 text-4xl text-[var(--color-ink)]">
          {receta.titulo}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-ink)]/70">
          {receta.descripcion}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display mb-4 text-xl text-[var(--color-ink)]">
              Ingredientes
            </h2>
            <ul className="space-y-2">
              {receta.ingredientes.map((ingrediente, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[var(--color-ink)]/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-sage)]" />
                  {ingrediente}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display mb-4 text-xl text-[var(--color-ink)]">
              Preparación
            </h2>
            <ol className="space-y-4">
              {receta.pasos.map((paso, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display shrink-0 text-lg text-[var(--color-terracotta)]">
                    {i + 1}
                  </span>
                  <p className="text-[var(--color-ink)]/80">{paso}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16">
          <Link
            href={`/categorias/${receta.categoria_slug}`}
            className="inline-block rounded-full border border-[var(--color-terracotta)] px-5 py-2 text-sm text-[var(--color-terracotta)] transition-colors hover:bg-[var(--color-terracotta)] hover:text-white"
          >
            Ver más recetas de esta categoría
          </Link>
        </div>
      </div>
    </main>
  );
}
