import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoriaBySlug,
  getCategorias,
  getRecetasByCategoria,
} from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((categoria) => ({ slug: categoria.slug }));
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const categoria = await getCategoriaBySlug(slug);

  if (!categoria) {
    notFound();
  }

  const recetas = await getRecetasByCategoria(slug);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-[var(--color-terracotta)] hover:underline"
        >
          ← Volver al inicio
        </Link>

        <div className="mb-12 flex items-center gap-4">
          <span className="text-5xl">{categoria.icono}</span>
          <div>
            <h1 className="font-display text-4xl text-[var(--color-ink)]">
              {categoria.nombre}
            </h1>
            <p className="mt-1 text-[var(--color-ink)]/70">
              {categoria.descripcion}
            </p>
          </div>
        </div>

        {recetas.length === 0 ? (
          <p className="text-[var(--color-ink)]/60">
            Todavía no hay recetas en esta categoría.
          </p>
        ) : (
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
        )}
      </div>
    </main>
  );
}
