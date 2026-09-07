import { supabase } from "./supabase";
import type { Categoria, Receta } from "./types";

export async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("id");

  if (error) {
    console.error("Error al obtener categorías:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getCategoriaBySlug(
  slug: string
): Promise<Categoria | null> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error al obtener categoría:", error.message);
    return null;
  }
  return data;
}

export async function getRecetas(): Promise<Receta[]> {
  const { data, error } = await supabase
    .from("recetas")
    .select("*")
    .order("id");

  if (error) {
    console.error("Error al obtener recetas:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getRecetaBySlug(slug: string): Promise<Receta | null> {
  const { data, error } = await supabase
    .from("recetas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error al obtener receta:", error.message);
    return null;
  }
  return data;
}

export async function getRecetasByCategoria(
  categoriaSlug: string
): Promise<Receta[]> {
  const { data, error } = await supabase
    .from("recetas")
    .select("*")
    .eq("categoria_slug", categoriaSlug)
    .order("id");

  if (error) {
    console.error("Error al obtener recetas por categoría:", error.message);
    return [];
  }
  return data ?? [];
}
