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

Minimal shell only — sets `<html lang="he" dir="rtl">` and renders `{children}`. No navigation, no header, no global providers.

### Pages (all server components unless noted)

| HTML file         | Next.js route             |
|-------------------|---------------------------|
| `index.html`      | `app/page.tsx`            |
| `about.html`      | `app/about/page.tsx`      |
| `Bravery.html`    | `app/bravery/page.tsx`    |
| `coffee_main.html`| `app/coffee/page.tsx`     |
| `coffee.html`     | `app/coffee/recipe/page.tsx` |
| `contact.html`    | `app/contact/page.tsx`    |
| `events.html`     | `app/events/page.tsx`     |
| `location.html`   | `app/location/page.tsx`   |
| `news.html`       | `app/news/page.tsx`       |
| `remember.html`   | `app/remember/page.tsx`   |

Each page:
- Exports a `metadata` object for `<title>` (replacing `<title>` in `<head>`)
- Imports its own CSS file directly (e.g. `import '@/styles/about.css'`)
- Renders the `<Navigation>` client component where `#navigation-root` was
- Contains the full page body JSX (converted from the original HTML body)

### Client Components

**`components/Navigation.tsx`** — `'use client'`
- Replaces `navigation.js`
- Accepts `pageTitle: string` and `hideHamburger?: boolean` props (matching original `initNavigation` args)
- Renders the top bar + side menu HTML (identical to original template string)
- Contains `toggleMenu()` as a local function
- Uses `lucide-react` package instead of the CDN `<script>`

**`components/VideoBackground.tsx`** — `'use client'`
- Wraps the `<video autoplay muted loop playsinline>` on the home page
- Needed because `autoPlay` on video requires browser environment

**`components/EventsAccordion.tsx`** — `'use client'`  
- Wraps the accordion toggle logic from `events.html`
- Needed because click handlers toggle CSS classes

**`components/CoffeeApp.tsx`** — `'use client'`
- Wraps the coffee recipe app from `coffee.html` (has view switching, SortableJS, html2pdf)

### CSS Strategy

| Original file    | Next.js location         | Imported in             |
|------------------|--------------------------|-------------------------|
| `styles.css`     | `styles/globals.css`     | `app/layout.tsx`        |
| `about.css`      | `styles/about.css`       | `app/about/page.tsx`    |
| `bravery.css`    | `styles/bravery.css`     | `app/bravery/page.tsx`  |
| `coffee_main.css`| `styles/coffee_main.css` | `app/coffee/page.tsx`   |
| `contact.css`    | `styles/contact.css`     | `app/contact/page.tsx`  |
| `events.css`     | `styles/events.css`      | `app/events/page.tsx`   |
| `location.css`   | `styles/location.css`    | `app/location/page.tsx` |
| `remember.css`   | `styles/remember.css`    | `app/remember/page.tsx` |

CSS files are copied as-is. No modifications to CSS content.

### Static Assets

All files from `images/` and `bg.png` are copied to `public/`. References in HTML like `src="images/..."` become `src="/images/..."` in JSX.

### External Scripts → npm Packages

| CDN script                    | npm package              |
|-------------------------------|--------------------------|
| `unpkg.com/lucide@latest`     | `lucide-react`           |
| `html2pdf.js` CDN             | `html2pdf.js` (npm)      |
| `sortablejs` CDN              | `sortablejs` (npm)       |

### Link Updates

All internal `.html` links are updated to clean Next.js paths:
- `index.html` → `/`
- `about.html` → `/about`
- `Bravery.html` → `/bravery`
- `coffee_main.html` → `/coffee`
- `coffee.html` → `/coffee/recipe`
- `contact.html` → `/contact`
- `events.html` → `/events`
- `location.html` → `/location`
- `news.html` → `/news`
- `remember.html` → `/remember`

Use `<Link>` from `next/link` for internal navigation inside client components. Plain `<a>` tags are fine in server components.

### Google Fonts

Remove `<link>` tags for Google Fonts from each page. Instead, use `next/font/google` in `app/layout.tsx` to load Fredoka, Rubik, and other fonts used across the site.

### HTML Attribute Differences

Standard HTML → JSX attribute mapping:
- `class` → `className`
- `for` → `htmlFor`  
- `autoplay` → `autoPlay`
- `playsinline` → `playsInline`
- Inline styles: `style="..."` → `style={{ ... }}`
- `dir="rtl"` stays as-is (valid in JSX)

---

## Project Setup

```
next.config.ts       ← minimal, no special config needed
tsconfig.json        ← standard Next.js TS config with @/ path alias
package.json         ← next, react, react-dom, lucide-react, sortablejs, html2pdf.js
```

No `src/` directory — files sit at repo root level (`app/`, `components/`, `styles/`, `public/`).

---

## Out of Scope

- No new features
- No design changes
- No refactoring of CSS
- No component library
- No state management
- No API routes
- No database
