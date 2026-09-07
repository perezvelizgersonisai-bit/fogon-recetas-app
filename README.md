# 🍲 Fogón — Recetario digital con Next.js y Supabase

Landing page funcional de un recetario de cocina casera, construida con **Next.js 16 (App Router)** y **Supabase** como base de datos y backend serverless. Proyecto desarrollado para la actividad evaluada *"Dominio del App Router y Gestión de Datos: Construcción de Rutas Dinámicas y Persistencia con servicio serverless"* (KODIGO).

## 📌 Descripción del proyecto

Fogón permite explorar recetas de cocina organizadas por categorías (Desayunos, Comidas Fuertes, Postres, Bebidas y Saludables). Cada receta y cada categoría cuentan con su propia página generada dinámicamente a partir de los datos almacenados en Supabase.

### Características principales

- ✅ Next.js 16+ con **App Router**
- ✅ **2 rutas dinámicas**: `/recetas/[slug]` y `/categorias/[slug]`
- ✅ Datos consumidos desde **Supabase** en **Server Components** (sin JavaScript de cliente para la lectura de datos)
- ✅ Operación de lectura (`SELECT`) sobre dos tablas relacionadas
- ✅ Diseño responsive, con paleta e identidad visual propias
- ✅ `loading.tsx` (loading states) y `not-found.tsx` por cada ruta dinámica
- ✅ `error.tsx` global para manejo de errores
- ✅ Row Level Security (RLS) configurado en Supabase

## 🛠️ Tecnologías

- [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- [Supabase](https://supabase.com/) (PostgreSQL + RLS como backend serverless)
- [Tailwind CSS 4](https://tailwindcss.com/)
- TypeScript

## 🚀 Instrucciones de instalación local

### 1. Clonar el repositorio

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd recetas-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com/).
2. Ve a **SQL Editor** dentro de tu proyecto de Supabase.
3. Copia y ejecuta todo el contenido del archivo [`supabase/schema.sql`](./supabase/schema.sql) de este repositorio. Esto creará:
   - La tabla `categorias` (5 registros de ejemplo)
   - La tabla `recetas` (6 registros de ejemplo)
   - Las políticas de **Row Level Security (RLS)** que permiten lectura pública

### 4. Variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.local.example .env.local
```

Completa `.env.local` con los datos de tu proyecto de Supabase (los encuentras en **Project Settings → API**):

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-publica
```

> ⚠️ Nunca subas tu archivo `.env.local` a GitHub. Ya está incluido en `.gitignore`.

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### 6. Compilar para producción

```bash
npm run build
npm start
```

## 🌐 Despliegue en Vercel

1. Sube este repositorio a GitHub.
2. Importa el repositorio en [vercel.com](https://vercel.com/).
3. En **Environment Variables**, agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Despliega. Vercel detecta Next.js automáticamente.

## 📂 Estructura del proyecto

```
recetas-app/
├── app/
│   ├── page.tsx                    # Página de inicio (lista categorías y recetas)
│   ├── layout.tsx                  # Layout raíz, tipografía y metadata
│   ├── globals.css                 # Paleta de colores y estilos base
│   ├── error.tsx                   # Manejo de errores global
│   ├── recetas/[slug]/
│   │   ├── page.tsx                # Ruta dinámica: detalle de una receta
│   │   ├── loading.tsx             # Loading state
│   │   └── not-found.tsx           # 404 personalizado
│   └── categorias/[slug]/
│       ├── page.tsx                # Ruta dinámica: recetas por categoría
│       ├── loading.tsx             # Loading state
│       └── not-found.tsx           # 404 personalizado
├── lib/
│   ├── supabase.ts                 # Cliente de Supabase
│   ├── data.ts                     # Funciones de acceso a datos (lectura)
│   └── types.ts                    # Tipos TypeScript de las tablas
├── supabase/
│   └── schema.sql                  # Script SQL: tablas, RLS y datos de ejemplo
└── .env.local.example              # Plantilla de variables de entorno
```

## 🗄️ Estructura de datos en Supabase

**Tabla `categorias`**: `id`, `nombre`, `slug`, `descripcion`, `icono`

**Tabla `recetas`**: `id`, `slug`, `titulo`, `descripcion`, `categoria_slug` (FK a `categorias.slug`), `tiempo_preparacion`, `dificultad`, `porciones`, `ingredientes` (array), `pasos` (array), `imagen_emoji`

Ambas tablas tienen **RLS habilitado** con una política de lectura pública (`select` con `using (true)`) y ninguna política de escritura para el rol anónimo, por lo que los datos solo pueden modificarse desde el panel de Supabase o con la service role key.

## 👤 Autor

Proyecto desarrollado como actividad evaluada del curso de KODIGO — Desarrollo Web Moderno con Next.js y Arquitecturas Serverless.
