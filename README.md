# 🍲 Fogón — Recetario digital con Next.js y Supabase

[![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-Deployed-22c55e?logo=amazon-aws&logoColor=white)](https://main.d3r8u12v9bop7a.amplifyapp.com)
[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

Landing page funcional de un recetario de cocina casera, construida con **Next.js 16 (App Router)** y **Supabase** como base de datos y backend serverless. Proyecto desplegado en producción en **AWS Amplify**.

---

## 🌐 Enlaces Oficiales del Proyecto

- 🚀 **Aplicación Desplegada en AWS Amplify**: [https://main.d3r8u12v9bop7a.amplifyapp.com](https://main.d3r8u12v9bop7a.amplifyapp.com)
- 📦 **Repositorio Público en GitHub**: [https://github.com/perezvelizgersonisai-bit/fogon-recetas-app](https://github.com/perezvelizgersonisai-bit/fogon-recetas-app)
- ☁️ **Servicio de Hosting**: AWS Amplify (Next.js SSR / App Router)

---

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

## ☁️ Guía Paso a Paso de Despliegue en AWS Amplify

Para cumplir con el ciclo de vida de producción y hacer accesible la aplicación a través de Internet:

### 1. Preparar el Repositorio
- El proyecto Next.js está alojado en el repositorio público de GitHub: `perezvelizgersonisai-bit/fogon-recetas-app`.
- Se incluye el archivo `.env.example` documentando las variables requeridas (`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Se verificó que el proyecto compila correctamente de forma local con `npm run build`.

### 2. Conectar AWS Amplify con GitHub
1. Ingresar a la consola de [AWS Amplify](https://console.aws.amazon.com/amplify).
2. Seleccionar **Deploy an app** y elegir **GitHub** como proveedor de código fuente.
3. Autorizar a AWS Amplify para acceder a los repositorios y seleccionar `fogon-recetas-app` en la rama `main`.

### 3. Configuración del Build (`amplify.yml`)
Amplify detecta automáticamente el framework **Next.js - SSR (App Router)**. El archivo de construcción incluido en el repositorio es:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - env | grep -e NEXT_PUBLIC_ >> .env.production
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - .npm/**/*
```

### 4. Configurar Variables de Entorno en Producción
En la consola de AWS Amplify, en el apartado **App settings > Environment variables**, se agregan las variables de conexión a Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`: `https://olhrhxqhtszcmsmqcspe.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `sb_publishable_UrCXER1JynNz8NjAoe4jTA_E7JoPBRN`

> 🔒 *Nota de seguridad:* El archivo `.env.local` nunca se sube al repositorio; las credenciales se administran de forma segura y centralizada en la consola de AWS Amplify.

### 5. Despliegue y Verificación
- Al hacer clic en **Save and Deploy**, Amplify ejecuta el pipeline automático: **Provision** &rarr; **Build** &rarr; **Deploy** &rarr; **Verify**.
- Una vez finalizado el estado cambia a **Deployed (Compilación exitosa)**.
- La aplicación queda publicada y accesible globalmente en: **https://main.d3r8u12v9bop7a.amplifyapp.com**.

---

## 👤 Autor

- **Estudiante**: Herson Isai Perez Veliz
- **Programa**: Bootcamp Full Stack Junior — Kodigo
- **Módulo**: Despliegue de Aplicaciones en AWS
- **Repositorio**: [https://github.com/perezvelizgersonisai-bit/fogon-recetas-app](https://github.com/perezvelizgersonisai-bit/fogon-recetas-app)
