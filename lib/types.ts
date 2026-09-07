export type Categoria = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  icono: string;
};

export type Receta = {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  categoria_slug: string;
  tiempo_preparacion: string;
  dificultad: "Fácil" | "Media" | "Difícil";
  porciones: number;
  ingredientes: string[];
  pasos: string[];
  imagen_emoji: string;
};
