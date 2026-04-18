# Design: Convert HTML/CSS Project to Next.js TypeScript

**Date:** 2026-04-18

## Goal

Convert the existing static HTML/CSS memorial site ("החברים של עמית") into a Next.js 14+ TypeScript project using the App Router. The visual output and functionality must remain identical.

## Constraints

- Everything looks identical — no design or functionality changes
- App Router (Next.js 14+), TypeScript
- No Tailwind — only plain CSS files
- No shared layout wrapping pages (root layout is minimal shell only)
- Server components by default; only interactive bits use `'use client'`
- KISS — no unnecessary abstractions

---

## Architecture

### Root Layout (`app/layout.tsx`)

Minimal shell only — sets `<html lang="he" dir="rtl">` and renders `{children}`. Imports `styles/globals.css`. Loads all Google Fonts via `next/font/google` (see Fonts section). No navigation, no header, no global providers.

### Pages (all server components unless noted)

| HTML file          | Next.js route                 |
|--------------------|-------------------------------|
| `index.html`       | `app/page.tsx`                |
| `about.html`       | `app/about/page.tsx`          |
| `Bravery.html`     | `app/bravery/page.tsx`        |
| `coffee_main.html` | `app/coffee/page.tsx`         |
| `coffee.html`      | `app/coffee/recipe/page.tsx`  |
| `contact.html`     | `app/contact/page.tsx`        |
| `events.html`      | `app/events/page.tsx`         |
| `location.html`    | `app/location/page.tsx`       |
| `news.html`        | `app/news/page.tsx`           |
| `remember.html`    | `app/remember/page.tsx`       |

Each page:
- Exports a `metadata` object for `<title>` (replacing `<title>` in `<head>`). The `location` page also exports `description` in its metadata to replicate the `<meta name="description">` present in `location.html`.
- Imports its own CSS file directly (e.g. `import '@/styles/about.css'`)
- Renders the `<Navigation>` client component where `#navigation-root` was
- Contains the full page body JSX (converted from the original HTML body)

### Client Components

**`components/Navigation.tsx`** — `'use client'`
- Replaces `navigation.js`
- Props: `pageTitle: string`, `hideHamburger?: boolean`
- Renders top bar + side menu JSX (identical structure to original template)
- Contains `toggleMenu()` as a local state toggle using `useState`
- Uses `lucide-react` named components (`<Menu />`, `<X />`, `<Home />`, etc.) instead of `<i data-lucide="...">` attributes — all icon elements in the nav must be converted to `lucide-react` JSX components
- Uses `<Link>` from `next/link` for all internal navigation links (paths updated per link table below)

**`components/VideoBackground.tsx`** — `'use client'`
- Wraps the `<video autoPlay muted loop playsInline>` on the home page
- Required because video autoplay relies on browser APIs

**`components/GalleryModal.tsx`** — `'use client'`
- Shared component used by `events`, `remember`, and `coffee_main` pages
- Handles card/image click → modal open, prev/next navigation, keyboard events (`Escape`, arrow keys), `document.body.style.overflow` lock
- `coffee_main` also has a zoom-on-click variant; this component accepts an optional `zoomable` prop to enable the feature. When `zoomable` is true, the component still performs a per-image runtime check (`naturalWidth < modalContent.clientWidth * 0.85`) to decide whether clicking a specific image toggles the `.zoomed` class — the prop enables the feature, the runtime check controls per-image eligibility

**`components/CoffeeApp.tsx`** — `'use client'`
- Wraps the full recipe book app from `coffee.html`
- Handles view switching (list ↔ single recipe), search/filter, and pdf export
- Uses `html2pdf.js` loaded via dynamic import inside a handler (not at module level) to avoid SSR issues: `const html2pdf = (await import('html2pdf.js')).default`
- SortableJS CDN is present in the source but never instantiated (`new Sortable(...)` is never called) — do not add it as a dependency
- The source HTML also contains `#amit-view` and `#location-view` which are never activated by any JS — include them in the JSX as-is but do not add navigation to them
- All `<i data-lucide="...">` inside this component must be converted to `lucide-react` JSX components

**`components/NewsApp.tsx`** — `'use client'`
- `news.html` has no static HTML for cards — the entire list is rendered by a JS `renderNews()` function reading a `newsArticles` data array
- This component holds the `newsArticles` data array and renders the cards as JSX
- Handles card click → modal/link open behavior

**`components/ContactForm.tsx`** — `'use client'`
- The contact `<form>` has a JS `submit` handler that builds a `mailto:` URL
- This component wraps the form and implements the submit handler using `onSubmit`

### CSS Strategy

**`styles/globals.css`** — copy of `styles.css` with two changes:
1. Remove the `@import url('https://fonts.googleapis.com/css2?...')` line at the top (fonts are loaded via `next/font/google` instead)
2. No other changes

All other CSS files are copied as-is with no modifications.

| Original file     | Next.js location          | Imported in                    |
|-------------------|---------------------------|--------------------------------|
| `styles.css`      | `styles/globals.css`      | `app/layout.tsx`               |
| `about.css`       | `styles/about.css`        | `app/about/page.tsx`           |
| `bravery.css`     | `styles/bravery.css`      | `app/bravery/page.tsx`         |
| `coffee_main.css` | `styles/coffee_main.css`  | `app/coffee/page.tsx`          |
| `contact.css`     | `styles/contact.css`      | `app/contact/page.tsx`         |
| `events.css`      | `styles/events.css`       | `app/events/page.tsx`          |
| `location.css`    | `styles/location.css`     | `app/location/page.tsx`        |
| `remember.css`    | `styles/remember.css`     | `app/remember/page.tsx`        |

`news.html` has no separate CSS file — no addition needed.  
`coffee.html` (recipe page) uses only `styles.css` — no separate CSS file.

### `@/` Path Alias

The `tsconfig.json` must set `"@/*": ["./*"]` (project root), **not** `"./src/*"`, since there is no `src/` directory. The default `create-next-app` tsconfig uses `src/` — this must be corrected manually.

### Google Fonts

Remove all `<link>` Google Fonts tags from each page HTML. Remove the `@import` from `styles.css` (in `globals.css`).

Load all fonts in `app/layout.tsx` via `next/font/google`. The full set of fonts used across the site:
- `Fredoka` (weights: 300, 400, 600, 700)
- `Rubik` (weights: 400, 500, 700, 800)
- `Assistant` (weights: 300, 400, 700)
- `Varela_Round`
- `Amatic_SC` (weights: 400, 700)
- `Klee_One` (weights: 400, 600)
- `Frank_Ruhl_Libre` (weights: 400, 700)

Apply them as CSS variables on `<html>` so existing CSS `var(--font-main)` etc. continue to work.

### Static Assets

All files from `images/` and `bg.png` are copied to `public/`. References in HTML like `src="images/..."` become `src="/images/..."` in JSX.

Use plain `<img>` tags throughout — do not use `next/image`. Using `next/image` requires explicit `width`/`height` props on every image and changes the rendered DOM, which risks layout differences.

### External Scripts → npm Packages

All CDN `<script>` tags are removed. No `<Script>` component from `next/script` is needed.

| CDN script                 | Replacement                                             |
|----------------------------|---------------------------------------------------------|
| `unpkg.com/lucide@latest`  | `lucide-react` npm package (JSX components)            |
| `html2pdf.js` CDN          | `html2pdf.js` npm, dynamic import inside handler only  |
| `sortablejs` CDN           | Not needed — unused in source                          |

### Link Updates

All internal `.html` links updated to clean paths:

| Old                | New               |
|--------------------|-------------------|
| `index.html`       | `/`               |
| `about.html`       | `/about`          |
| `Bravery.html`     | `/bravery`        |
| `coffee_main.html` | `/coffee`         |
| `coffee.html`      | `/coffee/recipe`  |
| `contact.html`     | `/contact`        |
| `events.html`      | `/events`         |
| `location.html`    | `/location`       |
| `news.html`        | `/news`           |
| `remember.html`    | `/remember`       |

Use `<Link>` from `next/link` inside client components. Plain `<a>` is fine in server components.

### HTML → JSX Attribute Mapping

- `class` → `className`
- `for` → `htmlFor`
- `autoplay` → `autoPlay`
- `playsinline` → `playsInline`
- Inline styles: `style="color: red"` → `style={{ color: 'red' }}`
- `dir="rtl"` stays as-is (valid JSX)

---

## Project Setup

```
next.config.ts       ← minimal, no special config needed
tsconfig.json        ← standard Next.js TS config; @/ alias → ./* (not ./src/*)
package.json         ← next, react, react-dom, lucide-react, html2pdf.js
```

No `src/` directory — files sit at repo root level (`app/`, `components/`, `styles/`, `public/`).

---

## Out of Scope

- No new features
- No design changes  
- No CSS refactoring (only the one `@import` line removal in globals.css)
- No component library
- No state management library
- No API routes
- No database
