-- =========================================================
-- Esquema de base de datos: Catálogo de Recetas
-- Ejecutar este script completo en el SQL Editor de Supabase
-- =========================================================

-- Tabla de categorías
create table if not exists categorias (
  id bigint generated always as identity primary key,
  nombre text not null,
  slug text not null unique,
  descripcion text not null,
  icono text not null default '🍽️',
  created_at timestamp with time zone default now()
);

-- Tabla de recetas
create table if not exists recetas (
  id bigint generated always as identity primary key,
  slug text not null unique,
  titulo text not null,
  descripcion text not null,
  categoria_slug text not null references categorias(slug) on delete cascade,
  tiempo_preparacion text not null,
  dificultad text not null default 'Fácil',
  porciones int not null default 4,
  ingredientes text[] not null default '{}',
  pasos text[] not null default '{}',
  imagen_emoji text not null default '🍲',
  created_at timestamp with time zone default now()
);

-- =========================================================
-- Row Level Security (RLS)
-- =========================================================
alter table categorias enable row level security;
alter table recetas enable row level security;

-- Política: cualquiera puede LEER (SELECT) — catálogo público
create policy "Lectura pública de categorías"
  on categorias for select
  using (true);

create policy "Lectura pública de recetas"
  on recetas for select
  using (true);

-- No se crean políticas de INSERT/UPDATE/DELETE para el rol anónimo,
-- por lo que la escritura queda bloqueada desde el cliente público.

-- =========================================================
-- Datos de ejemplo (mínimo 5 registros por tabla)
-- =========================================================

insert into categorias (nombre, slug, descripcion, icono) values
  ('Desayunos', 'desayunos', 'Empieza el día con energía', '🥞'),
  ('Comidas Fuertes', 'comidas-fuertes', 'Platos principales para cualquier ocasión', '🍛'),
  ('Postres', 'postres', 'Dulces para consentirte', '🍰'),
  ('Bebidas', 'bebidas', 'Refrescantes y reconfortantes', '🥤'),
  ('Saludables', 'saludables', 'Opciones ligeras y nutritivas', '🥗')
on conflict (slug) do nothing;

insert into recetas (slug, titulo, descripcion, categoria_slug, tiempo_preparacion, dificultad, porciones, ingredientes, pasos, imagen_emoji) values
  (
    'pancakes-clasicos',
    'Pancakes Clásicos',
    'Esponjosos pancakes perfectos para el desayuno, listos en minutos.',
    'desayunos',
    '20 min',
    'Fácil',
    4,
    array['2 tazas de harina', '2 huevos', '1 3/4 tazas de leche', '2 cdas de azúcar', '1 cda de polvo de hornear', 'Una pizca de sal', '2 cdas de mantequilla derretida'],
    array['Mezcla los ingredientes secos en un tazón.', 'Agrega los huevos, la leche y la mantequilla derretida.', 'Bate hasta obtener una mezcla homogénea sin grumos.', 'Cocina en un sartén caliente hasta que salgan burbujas y voltea.', 'Sirve con miel o fruta al gusto.'],
    '🥞'
  ),
  (
    'pollo-guisado',
    'Pollo Guisado',
    'Pollo tierno cocido a fuego lento con vegetales y especias.',
    'comidas-fuertes',
    '50 min',
    'Media',
    4,
    array['1 kg de pollo en piezas', '2 papas', '2 zanahorias', '1 cebolla', '2 dientes de ajo', '1 taza de salsa de tomate', 'Sal y pimienta al gusto'],
    array['Sofríe la cebolla y el ajo hasta dorar.', 'Agrega el pollo y sella por todos lados.', 'Incorpora las papas, zanahorias y la salsa de tomate.', 'Cubre con agua y cocina a fuego lento por 35 minutos.', 'Ajusta sal y pimienta antes de servir.'],
    '🍗'
  ),
  (
    'pastel-chocolate',
    'Pastel de Chocolate',
    'Un pastel húmedo y decadente para los amantes del chocolate.',
    'postres',
    '1 h 10 min',
    'Media',
    8,
    array['2 tazas de harina', '2 tazas de azúcar', '3/4 taza de cacao en polvo', '2 huevos', '1 taza de leche', '1/2 taza de aceite', '1 cdta de vainilla'],
    array['Precalienta el horno a 180°C.', 'Mezcla los ingredientes secos en un tazón grande.', 'Agrega los huevos, leche, aceite y vainilla, mezcla bien.', 'Vierte en un molde engrasado y hornea 35-40 minutos.', 'Deja enfriar antes de desmoldar y decorar.'],
    '🍰'
  ),
  (
    'limonada-menta',
    'Limonada con Menta',
    'Bebida refrescante ideal para el calor, con un toque herbal.',
    'bebidas',
    '10 min',
    'Fácil',
    4,
    array['6 limones', '1/2 taza de azúcar', '1 litro de agua fría', 'Un puñado de hojas de menta', 'Hielo al gusto'],
    array['Exprime los limones y reserva el jugo.', 'Disuelve el azúcar en un poco de agua tibia.', 'Mezcla el jugo de limón, el agua con azúcar y el resto del agua fría.', 'Añade las hojas de menta machacadas.', 'Sirve con hielo bien frío.'],
    '🍋'
  ),
  (
    'ensalada-quinoa',
    'Ensalada de Quinoa',
    'Ligera, nutritiva y llena de color, ideal para el mediodía.',
    'saludables',
    '25 min',
    'Fácil',
    2,
    array['1 taza de quinoa', 'Tomates cherry', 'Pepino', 'Aguacate', 'Jugo de limón', 'Aceite de oliva', 'Sal y pimienta'],
    array['Cocina la quinoa según las instrucciones del paquete y deja enfriar.', 'Corta los tomates, pepino y aguacate en cubos.', 'Mezcla la quinoa con los vegetales.', 'Aliña con jugo de limón, aceite de oliva, sal y pimienta.', 'Sirve fría o a temperatura ambiente.'],
    '🥗'
  ),
  (
    'tacos-pastor',
    'Tacos al Pastor',
    'Tacos jugosos con marinado tradicional y piña.',
    'comidas-fuertes',
    '40 min',
    'Media',
    4,
    array['500g de carne de cerdo en filetes', '2 chiles guajillo', '1 chile ancho', 'Piña en cubos', 'Cebolla y cilantro picados', 'Tortillas de maíz'],
    array['Remoja los chiles y lícualos con especias para el marinado.', 'Marina la carne por al menos 2 horas.', 'Cocina la carne en un sartén bien caliente hasta dorar.', 'Pica la carne finamente y sirve en tortillas calientes.', 'Corona con piña, cebolla y cilantro.'],
    '🌮'
  )
on conflict (slug) do nothing;
