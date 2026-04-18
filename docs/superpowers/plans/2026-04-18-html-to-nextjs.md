# HTML to Next.js Migration — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert a 10-page static HTML/CSS memorial site to an identical-looking Next.js 15 TypeScript app using the App Router.

**Architecture:** Server components by default; only interactive pieces (Navigation with toggleMenu, GalleryModal, CoffeeApp, NewsApp, ContactForm, VideoBackground) are `'use client'`. No shared layout wrapping pages — root layout is a minimal HTML shell only. CSS files are copied as-is and imported per-page.

**Tech Stack:** Next.js 15, TypeScript, Plain CSS, lucide-react, react-icons (for brand icons), html2pdf.js (dynamic import)

---

## File Map

**Create:**
```
package.json
next.config.ts
tsconfig.json
app/
  layout.tsx                   ← minimal shell: html[lang=he dir=rtl] + fonts + globals.css
  page.tsx                     ← index.html (home with video bg)
  about/page.tsx
  bravery/page.tsx
  coffee/page.tsx              ← coffee_main.html
  coffee/recipe/page.tsx       ← coffee.html
  contact/page.tsx
  events/page.tsx
  location/page.tsx
  news/page.tsx
  remember/page.tsx
components/
  Navigation.tsx               ← 'use client': top bar + side menu, useState toggle
  VideoBackground.tsx          ← 'use client': <video autoPlay muted loop playsInline>
  GalleryModal.tsx             ← 'use client': card→modal, prev/next, keyboard, optional zoom
  CoffeeApp.tsx                ← 'use client': recipe list/detail, html2pdf dynamic import
  NewsApp.tsx                  ← 'use client': renders newsArticles data as JSX cards
  ContactForm.tsx              ← 'use client': mailto form submit handler
styles/
  globals.css                  ← styles.css minus the @import fonts line
  about.css
  bravery.css
  coffee_main.css
  contact.css
  events.css
  location.css
  remember.css
public/
  images/...                   ← copied from source images/
  bg.png                       ← copied from source
```

---

## Chunk 1: Project Bootstrap

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `types/html2pdf.d.ts`

- [ ] **Step 1: Create package.json**

Using Next.js 15 (required for `next.config.ts` support). Adding `react-icons` for Instagram/Facebook brand icons (removed from lucide-react in v0.263).

```json
{
  "name": "amit-memorial",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.468.0",
    "react-icons": "^5.0.0",
    "html2pdf.js": "^0.10.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create next.config.ts**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 3: Create tsconfig.json** (critical: `@/` maps to project root, NOT `./src/`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "types/**/*.d.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create types/html2pdf.d.ts** (html2pdf.js has no bundled types)

```ts
declare module 'html2pdf.js' {
  const html2pdf: (element: HTMLElement, opts?: object) => void;
  export default html2pdf;
}
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 6: Commit**

```bash
git add package.json next.config.ts tsconfig.json types/ package-lock.json
git commit -m "chore: initialize Next.js 15 TypeScript project"
```

---

### Task 2: Copy static assets

**Files:**
- Create: `public/images/` (copied from source)
- Create: `public/bg.png`

- [ ] **Step 1: Copy all images and assets to public/**

```bash
cp -r images public/
cp bg.png public/
```

- [ ] **Step 2: Verify copy**

```bash
ls public/images/
```

Expected: same subdirectories as source `images/`.

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "chore: copy static assets to public/"
```

---

### Task 3: Copy and prepare CSS files

**Files:**
- Create: `styles/globals.css` (styles.css minus one @import line)
- Create: `styles/about.css`
- Create: `styles/bravery.css`
- Create: `styles/coffee_main.css`
- Create: `styles/contact.css`
- Create: `styles/events.css`
- Create: `styles/location.css`
- Create: `styles/remember.css`

- [ ] **Step 1: Create styles/ directory and copy files**

```bash
mkdir -p styles
cp about.css styles/about.css
cp bravery.css styles/bravery.css
cp coffee_main.css styles/coffee_main.css
cp contact.css styles/contact.css
cp events.css styles/events.css
cp location.css styles/location.css
cp remember.css styles/remember.css
```

- [ ] **Step 2: Create styles/globals.css from styles.css, removing the Google Fonts @import**

Copy `styles.css` to `styles/globals.css`, then remove line 1 which reads:
```css
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
```
All other lines remain identical.

- [ ] **Step 3: Commit**

```bash
git add styles/
git commit -m "chore: copy CSS files to styles/"
```

---

## Chunk 2: Root Layout + Navigation

### Task 4: Create root layout with Google Fonts

**Files:**
- Create: `app/layout.tsx`

- [ ] **Step 1: Create app/layout.tsx**

> **Font variable naming:** `globals.css` uses `--font-main`, `--font-title`, and `--font-handwriting` as CSS custom properties. Map the `next/font` variables to these exact names so they override the hardcoded values in `:root`. Other fonts (Fredoka, Assistant, Varela Round, Amatic SC) load under their own variable names for direct use in page-level CSS.

```tsx
import type { Metadata } from 'next';
import {
  Fredoka,
  Rubik,
  Assistant,
  Varela_Round,
  Amatic_SC,
  Klee_One,
  Frank_Ruhl_Libre,
} from 'next/font/google';
import '@/styles/globals.css';

// --font-main maps to Rubik (primary body font in globals.css)
const rubik = Rubik({ subsets: ['hebrew', 'latin'], weight: ['400', '500', '700', '800'], variable: '--font-main' });
// --font-title maps to Frank Ruhl Libre (heading font in globals.css)
const frankRuhlLibre = Frank_Ruhl_Libre({ subsets: ['hebrew', 'latin'], weight: ['400', '700'], variable: '--font-title' });
// --font-handwriting maps to Klee One (quote/handwriting font in globals.css)
const kleeOne = Klee_One({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-handwriting' });
// Additional fonts used in specific pages
const fredoka = Fredoka({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-fredoka' });
const assistant = Assistant({ subsets: ['hebrew', 'latin'], weight: ['300', '400', '700'], variable: '--font-assistant' });
const varelaRound = Varela_Round({ subsets: ['latin', 'hebrew'], weight: ['400'], variable: '--font-varela' });
const amaticSC = Amatic_SC({ subsets: ['latin', 'hebrew'], weight: ['400', '700'], variable: '--font-amatic' });

export const metadata: Metadata = {
  title: 'החברים של עמית',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={[
        rubik.variable,
        frankRuhlLibre.variable,
        kleeOne.variable,
        fredoka.variable,
        assistant.variable,
        varelaRound.variable,
        amaticSC.variable,
      ].join(' ')}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build compiles**

```bash
npm run build
```

Expected: Build succeeds (no pages yet, that's fine — Next.js will warn about missing app/page.tsx but the layout should compile).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Google Fonts"
```

---

### Task 5: Create Navigation component

**Files:**
- Create: `components/Navigation.tsx`

- [ ] **Step 1: Create components/Navigation.tsx**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu, X, Home, Info, Shield, Coffee,
  Calendar, Heart, Newspaper, Mail,
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

interface NavigationProps {
  pageTitle: string;
  hideHamburger?: boolean;
}

export default function Navigation({ pageTitle, hideHamburger = false }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-right">
          {!hideHamburger && (
            <button className="hamburger-btn-top" onClick={toggleMenu}>
              <Menu strokeWidth={2.5} width={28} height={28} />
            </button>
          )}
          <h1 className="page-title">{pageTitle}</h1>
        </div>
        <div className="top-bar-left">
          <Link href="/">
            <img src="/images/main/לוגו עגלה לבן.png" alt="לוגו עגלה" />
          </Link>
        </div>
      </header>

      {menuOpen && (
        <div className="side-menu-overlay active" onClick={toggleMenu} />
      )}

      <div className={`side-menu${menuOpen ? ' active' : ''}`}>
        <button className="close-menu-btn" onClick={toggleMenu}>
          <X />
        </button>
        <nav className="menu-nav">
          <Link href="/" onClick={toggleMenu}><Home /> דף הבית</Link>
          <Link href="/about" onClick={toggleMenu}><Info /> סיפורו של עמית</Link>
          <Link href="/bravery" onClick={toggleMenu}><Shield /> סיפור גבורתו</Link>
          <Link href="/coffee" onClick={toggleMenu}><Coffee /> עגלת &quot;קפה החברים של עמית&quot;</Link>
          <Link href="/events" onClick={toggleMenu}><Calendar /> אירועי הנצחה</Link>
          <Link href="/remember" onClick={toggleMenu}><Heart /> זוכרים אותך</Link>
          <Link href="/news" onClick={toggleMenu}><Newspaper /> כתבות בעיתונות</Link>
          <Link href="/contact" onClick={toggleMenu}><Mail /> צור קשר</Link>
        </nav>
        <div className="menu-social">
          <a
            href="https://www.instagram.com/remember_amitfriedman/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FaInstagram size={30} />
          </a>
          <div className="social-icon facebook">
            <FaFacebook size={30} />
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: No TypeScript errors for Navigation.tsx.

- [ ] **Step 3: Commit**

```bash
git add components/Navigation.tsx
git commit -m "feat: add Navigation client component"
```

---

## Chunk 3: Home Page

### Task 6: Create VideoBackground component

**Files:**
- Create: `components/VideoBackground.tsx`

- [ ] **Step 1: Create components/VideoBackground.tsx**

```tsx
'use client';

export default function VideoBackground() {
  return (
    <div className="video-bg-container">
      <video autoPlay muted loop playsInline className="video-bg" id="bg-video">
        <source src="/images/main/clouds480.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/VideoBackground.tsx
git commit -m "feat: add VideoBackground client component"
```

---

### Task 7: Create home page

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create app/page.tsx**

```tsx
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import VideoBackground from '@/components/VideoBackground';

export const metadata: Metadata = {
  title: 'החברים של עמית',
};

export default function HomePage() {
  return (
    <body className="home-page">
      <VideoBackground />

      <div id="navigation-root">
        <Navigation pageTitle="" />
      </div>

      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <filter id="remove-white">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1 -1 -1 3 0"
          />
        </filter>
      </svg>

      <main className="main-content-scroll">
        <div className="hello-world-container">
          <div className="memorial-image-container">
            <img src="/images/main/amit mag home11.png" alt="עמית פרידמן" className="memorial-image" />
          </div>
          <div className="memorial-text-container">
            <div className="memorial-headline">
              <div className="memorial-rank">סמ&quot;ר</div>
              <div className="memorial-name-wrapper">
                <h1 className="memorial-name">
                  עמית פרידמן
                  <span className="memorial-suffix">ז&quot;ל</span>
                </h1>
              </div>
              <div className="memorial-dates" dir="ltr">2005 – 2024</div>
            </div>
            <div className="memorial-info">
              לוחם בחטיבת הנח&quot;ל, נפל בקרב ברפיח<br />
              ביום כ&quot;ד באב תשפ&quot;ד (27.8.2024)
            </div>
            <div className="memorial-quote">
              &quot;מעצבן אותי אנשים שמפסידים חוויות<br />בגלל שלא היה להם כח לקום&quot;
            </div>
            <div className="memorial-motto">
              מלח הארץ שהיה גם מלך החיים הטובים
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}
```

> **Note:** In Next.js App Router, `page.tsx` renders *inside* the `<body>` provided by `layout.tsx`. Do not include `<html>` or `<body>` tags in pages. Remove the `<body className="home-page">` wrapper — instead apply `home-page` class via a wrapper `<div>` or by using a different approach.
>
> **Correction for page.tsx:** Since we cannot render a `<body>` tag in a page component, apply the `home-page` body class differently. The best approach: wrap all page content in a fragment and add a `useEffect` in a small `'use client'` `BodyClass` component, OR move `className` to a wrapper `<div>` using a CSS reset that mimics body behavior. For this migration, add a thin client component:

- [ ] **Step 2: Create components/BodyClass.tsx** (sets body className for pages that need it)

```tsx
'use client';
import { useEffect } from 'react';

export default function BodyClass({ className }: { className: string }) {
  useEffect(() => {
    const prev = document.body.className;
    document.body.className = className;
    return () => { document.body.className = prev; };
  }, [className]);
  return null;
}
```

- [ ] **Step 3: Update app/page.tsx to use BodyClass**

```tsx
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import VideoBackground from '@/components/VideoBackground';
import BodyClass from '@/components/BodyClass';

export const metadata: Metadata = {
  title: 'החברים של עמית',
};

export default function HomePage() {
  return (
    <>
      <BodyClass className="home-page" />
      <VideoBackground />

      <div id="navigation-root">
        <Navigation pageTitle="" />
      </div>

      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <filter id="remove-white">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1 -1 -1 3 0"
          />
        </filter>
      </svg>

      <main className="main-content-scroll">
        <div className="hello-world-container">
          <div className="memorial-image-container">
            <img src="/images/main/amit mag home11.png" alt="עמית פרידמן" className="memorial-image" />
          </div>
          <div className="memorial-text-container">
            <div className="memorial-headline">
              <div className="memorial-rank">סמ&quot;ר</div>
              <div className="memorial-name-wrapper">
                <h1 className="memorial-name">
                  עמית פרידמן
                  <span className="memorial-suffix">ז&quot;ל</span>
                </h1>
              </div>
              <div className="memorial-dates" dir="ltr">2005 – 2024</div>
            </div>
            <div className="memorial-info">
              לוחם בחטיבת הנח&quot;ל, נפל בקרב ברפיח<br />
              ביום כ&quot;ד באב תשפ&quot;ד (27.8.2024)
            </div>
            <div className="memorial-quote">
              &quot;מעצבן אותי אנשים שמפסידים חוויות<br />בגלל שלא היה להם כח לקום&quot;
            </div>
            <div className="memorial-motto">
              מלח הארץ שהיה גם מלך החיים הטובים
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Compiles successfully.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/VideoBackground.tsx components/BodyClass.tsx
git commit -m "feat: add home page with VideoBackground"
```

---

## Chunk 4: Static Server Pages

### Task 8: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

```tsx
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import BodyClass from '@/components/BodyClass';
import '@/styles/about.css';

export const metadata: Metadata = {
  title: 'סיפורו של עמית',
};

export default function AboutPage() {
  return (
    <>
      <BodyClass className="home-page" />
      <div id="bg-image" />
      <div id="navigation-root">
        <Navigation pageTitle="סיפורו של עמית" />
      </div>
      <main className="main-content-scroll">
        <div className="about-layout">
          <div className="story-card">
            <h2 className="story-title">סיפורו של עמית</h2>
            <div className="story-content">
              <p className="story-first">סמ״ר עמית פרידמן ז״ל, בנם של ליאת ואסף פרידמן, נולד באור יהודה בי&quot;א באדר א&apos; תשס&quot;ה (20/02/2005).</p>
              <p>עמית היה אדם שכולו לב, ערכים, שייכות ומשמעות. ידע לראות את הטוב שבחיים ולמצות כל רגע.<br />
              ילד עם נשמה ענקית וחיוך שלא ירד מהפנים. רגיש, חכם, מצחיק, מלח הארץ ומלך החיים הטובים כאחד.</p>
              <p>אח צעיר לרועי ואח גדול ליובל. ילד שגדל בבית מלא חום ואהבה, ובכל שלב בחייו השאיר שובל של אור, חיוך ושמחה.</p>
              <p>עמית עבר את כל שנות ילדותו באור יהודה, מגן חובה ועד לתיכון המקומי יובלים. כבר מגיל צעיר התבלט כתלמיד מצטיין, חד מחשבה ויצירתי, כזה שתמיד רצה לדעת עוד. הוא שילב בין ספורט, כימיה וקולנוע, והצטיין בכל מה שבחר לעשות. הצוות החינוכי תיאר אותו כ&quot;ילד מושלם עם נשמה גדולה וחיוך צנוע&quot;, עדין ומפיץ אור עם עוצמה פנימית גדולה וערכים חזקים שהובילו אותו לכל אורך דרכו.</p>
              <p>הספורט היה חלק גדול מחייו. בכדורסל שיחק בקבוצה העירונית ע.ל.ה אור יהודה, הוא היה שחקן חזק, שתמיד דחף את עצמו ואת חבריו קדימה. בנוסף לכדורסל אהב מאוד כדורגל והיה אוהד נאמן של מועדון הכדורגל ״מכבי תל אביב״.</p>
              <p>במקביל, תנועת הנוער ״הצופים״ הייתה כבית שני עבורו. הוא החל כחניך בשבט &quot;יהודה&quot;, ובהמשך הפך למדריך אהוב ומוערך. דרך ההדרכה למד להוביל, להקשיב ולגעת בלב של חניכי השבט.</p>
              <p>עמית היה נער שאוהב את החיים. קרוביו כינו אותו &quot;מלך החיים הטובים&quot;, הוא ידע לנצל כל רגע, לחגוג בלי סיבה מיוחדת, ליהנות מאוכל טוב, מטיולים ומבילויים. לוח הזמנים שלו היה תמיד מלא, וגם כשהגיע הביתה לא נח לרגע. חבריו סיפרו כי לא ויתר מעולם על &quot;קפה עם חברים&quot;, לא רק מתוך אהבתו למשקה אלא בשל המפגש, השיחה, בשביל צחוק טוב, בשביל רגע של חיבור. אלה היו הדברים שהגדירו אותו. <br />
              עמית היה חבר טוב. ויותר חשוב מהכל ראה את האחר את החזקים והחלשים כאחד.</p>
              <p>הוא היה מקור השראה, אופטימי, מלא מוטיבציה, תמיד מחפש לחדש ולהתקדם. בכל עשייה הביא את כולו, ובעיקר ידע לעצב לעצמו דרך ייחודית.</p>
              <p>13.08.2023 התגייס לצה&quot;ל ושוב ניכר בו כל מה שנשא בתוכו – מקצועיות, רצינות, ומנהיגות טבעית. הוא שירת כלוחם בגדוד 932 של חטיבת הנח&quot;ל, וכבר בתחילת דרכו זכה להערכה עמוקה ממפקדיו וחבריו אשר כינו אותו ״אחראי האחריות״. הוא היה הראשון להתנדב, הראשון להרים אחרים, הראשון לחשוב על הכלל לפני עצמו.</p>
              <p className="story-footer">בתחילת מלחמת ״חרבות ברזל״ לאחר שסיים את הכשרתו בהצטיינות, יצא עמית לקורס מ&quot;כים, אשר גם אותו סיים בהצטיינות, ושב לגדוד כמפקד כיתה אשר היה אהוב במיוחד.</p>
            </div>
          </div>
          <div className="portrait-col">
            <img src="/images/about/AmitP.png" alt="עמית פרידמן" className="portrait-img" />
          </div>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/about/
git commit -m "feat: add about page"
```

---

### Task 9: Bravery page

**Files:**
- Create: `app/bravery/page.tsx`

- [ ] **Step 1: Create app/bravery/page.tsx**

Uses `lucide-react` icons inline (server-safe — they are pure SVG components):

```tsx
import type { Metadata } from 'next';
import { PlayCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BodyClass from '@/components/BodyClass';
import '@/styles/bravery.css';

export const metadata: Metadata = {
  title: 'סיפור גבורתו - עמית פרידמן',
};

export default function BraveryPage() {
  return (
    <>
      <BodyClass className="bravery-page" />
      <div id="navigation-root">
        <Navigation pageTitle="סיפור גבורתו" />
      </div>
      <main className="main-content-scroll">
        <div className="bravery-container">
          <div className="bravery-image-col">
            <img src="/images/Bravery/Wings.PNG" alt="עמית פרידמן - כנפיים" className="bravery-img" />
            <a href="https://www.youtube.com/watch?v=gAIJvP0JXAo" target="_blank" rel="noopener noreferrer" className="bravery-video-btn desktop-only">
              <PlayCircle />
              <div className="btn-text-content">
                <span className="btn-text-main">מרדף עד הכרעה בתל-סולטאן</span>
                <span className="btn-text-sub">חטיבת הנח&quot;ל</span>
              </div>
            </a>
          </div>
          <div className="bravery-text-col">
            <h1 className="bravery-title">סיפור גבורתו</h1>
            <h3 className="bravery-subtitle">סמל ראשון עמית פרידמן מ&quot;כ בגדוד 932 של חטיבת הנח&quot;ל, נפל בקרב בתל סולטן שברפיח, רצועת עזה.</h3>
            <div className="bravery-story">
              <p>בשבת כ&quot;ב בתשרי, שמחת תורה תשפ&quot;ד, 7 באוקטובר 2023, בשעה שש וחצי בבוקר, פתח ארגון הטרור חמאס מרצועת עזה במתקפת פתע על ישראל. בבוקר זה החלה מלחמה.</p>
              <p>כשהחלה המלחמה עמית היה בעיצומה של ההכשרה, סיים אותה בהצטיינות, ויצא מיד לאחר מכן לקורס מ״כים.</p>
              <p>ביולי 2024 שב לגדוד כמפקד כיתה בפלוגה המבצעית. חייליו נקשרו אליו מיד וראו בו דמות נערצת וכריזמטית. יחד עמו נכנסו לקרבות ברצועת עזה.</p>
              <p>ביום שלישי 27 באוגוסט 2024 יצא עם הכוח לפשיטה מבצעית בשכונת תל סולטן ברפיח. עמית זיהה חוליית מחבלים, הזהיר את חבריו, פתח באש וחתר למגע. בקרב שהתפתח לחם בגבורה עד שנפל.</p>
              <p>סמל עמית פרידמן נפל בקרב ביום כ&quot;ד באב תשפ&quot;ד (27.8.2024). בן תשע-עשרה בנופלו. הובא למנוחות בחלקה הצבאית של בית העלמין ביהוד.</p>
              <p className="bravery-footer">לאחר נפילתו הועלה לדרגת סמל ראשון. יהי זכרו ברוך.</p>
            </div>
            <a href="https://www.youtube.com/watch?v=gAIJvP0JXAo" target="_blank" rel="noopener noreferrer" className="bravery-video-btn mobile-only">
              <PlayCircle />
              <div className="btn-text-content">
                <span className="btn-text-main">מרדף עד הכרעה בתל-סולטאן</span>
                <span className="btn-text-sub">חטיבת הנח&quot;ל</span>
              </div>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/bravery/
git commit -m "feat: add bravery page"
```

---

### Task 10: Location page

**Files:**
- Create: `app/location/page.tsx`

- [ ] **Step 1: Create app/location/page.tsx**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Navigation as NavIcon, Map } from 'lucide-react';
import Navigation from '@/components/Navigation';
import '@/styles/location.css';

export const metadata: Metadata = {
  title: 'מיקום עגלת הקפה - קפה החברים של עמית',
  description: 'מיקום עגלת קפה החברים של עמית - הדקל 11 פינת ברלב, נווה סביון, אור יהודה',
};

export default function LocationPage() {
  return (
    <>
      <div id="navigation-root">
        <Navigation pageTitle="מיקום עגלת הקפה" />
      </div>
      <main className="main-content-scroll">
        <div className="back-link-wrapper" style={{ marginTop: '36px' }}>
          <Link href="/coffee" className="back-to-hub">
            <ArrowRight /> חזרה לעגלת הקפה
          </Link>
        </div>
        <div className="location-wrapper" style={{ marginTop: 0 }}>
          <div className="location-body">
            <div className="location-info">
              <div className="info-card">
                <MapPin width={22} height={22} />
                <div className="info-card-body">
                  <strong>כתובת</strong>
                  <p>הדקל 11 פינת ברלב<br />שכונת נווה סביון, אור יהודה</p>
                </div>
              </div>
              <div className="info-card">
                <Clock width={22} height={22} />
                <div className="info-card-body">
                  <strong>שעות פעילות</strong>
                  <p>ימי שישי — 10:00–13:00</p>
                </div>
              </div>
              <div className="info-card">
                <NavIcon width={22} height={22} />
                <div className="info-card-body">
                  <strong>ניווט</strong>
                  <p>קפה החברים של עמית</p>
                  <a
                    href="https://waze.com/ul?q=קפה%20החברים%20של%20עמית&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="waze-btn"
                  >
                    <Map width={16} height={16} />
                    נווט עם Waze
                  </a>
                </div>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://maps.google.com/maps?q=%D7%A7%D7%A4%D7%94+%D7%94%D7%97%D7%91%D7%A8%D7%99%D7%9D+%D7%A9%D7%9C+%D7%A2%D7%9E%D7%99%D7%AA,+%D7%90%D7%95%D7%A8+%D7%99%D7%94%D7%95%D7%93%D7%94&t=&z=17&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/location/
git commit -m "feat: add location page"
```

---

## Chunk 5: Gallery Modal + Events + Remember

### Task 11: GalleryModal component

**Files:**
- Create: `components/GalleryModal.tsx`

- [ ] **Step 1: Create components/GalleryModal.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  zoomable?: boolean;
}

export default function GalleryModal({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  zoomable = false,
}: GalleryModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isZoomedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onPrev();
      if (e.key === 'ArrowLeft') onNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, onNext, onPrev]);

  // Reset zoom when image changes
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.classList.remove('zoomed');
      isZoomedRef.current = false;
    }
  }, [currentIndex]);

  const handleImgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!zoomable || !imgRef.current || !modalRef.current) return;
    const modalContent = modalRef.current.querySelector('.modal-content') as HTMLElement;
    const img = imgRef.current;
    const isSmall =
      img.naturalWidth < modalContent.clientWidth * 0.85 ||
      img.naturalHeight < modalContent.clientHeight * 0.85;
    if (isSmall) {
      img.classList.toggle('zoomed');
    }
  };

  const showNav = images.length > 1;

  if (!isOpen) return null;

  return (
    <div
      id="gallery-modal"
      className="gallery-modal active"
      ref={modalRef}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <X />
        </button>
        {showNav && (
          <button className="nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
            <ChevronRight />
          </button>
        )}
        <div className="image-container">
          <img
            ref={imgRef}
            id="gallery-img"
            src={images[currentIndex]}
            alt="Gallery Image"
            onClick={handleImgClick}
          />
        </div>
        {showNav && (
          <button className="nav-btn next-btn" onClick={(e) => { e.stopPropagation(); onNext(); }}>
            <ChevronLeft />
          </button>
        )}
      </div>
      <div className="gallery-counter" dir="ltr">
        <span id="current-index">{currentIndex + 1}</span> / <span id="total-count">{images.length}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/GalleryModal.tsx
git commit -m "feat: add GalleryModal client component"
```

---

### Task 12: Events page

**Files:**
- Create: `app/events/page.tsx`

- [ ] **Step 1: Create app/events/page.tsx**

```tsx
'use client';

import { useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import GalleryModal from '@/components/GalleryModal';
import BodyClass from '@/components/BodyClass';
import '@/styles/events.css';

const galleryData: Record<string, string[]> = {
  scouts: [
    '/images/events/scouts/zofim 1.jpeg',
    '/images/events/scouts/zofim 2.jpeg',
    '/images/events/scouts/zofim 3.jpeg',
    '/images/events/scouts/zofim actions 1.jpeg',
    '/images/events/scouts/zofim actions 2.jpeg',
    '/images/events/scouts/zofim hanuka 25.jpeg',
  ],
  memorial: ['/images/events/memorial day 2025.jpeg'],
  lecture: [
    '/images/events/lecture/DSC_2282.jpg',
    '/images/events/lecture/Rmember Amit 38.jpeg',
    '/images/events/lecture/Rmember Amit 41.jpeg',
    '/images/events/lecture/lecture1.jpeg',
  ],
  sport: [
    '/images/events/sport/Rmember Amit 17.jpeg',
    '/images/events/sport/Rmember Amit 33.jpeg',
    '/images/events/sport/Rmember Amit 34.jpeg',
    '/images/events/sport/Rmember Amit 35.jpeg',
    '/images/events/sport/Rmember Amit 36.jpeg',
    '/images/events/sport/Rmember Amit 39.jpeg',
    '/images/events/sport/Rmember Amit 40.jpeg',
    '/images/events/sport/Rmember Amit 42.jpeg',
    '/images/events/sport/Rmember Amit 58.jpeg',
    '/images/events/sport/Yuvalim team.jpeg',
    '/images/events/sport/basketball 25.jpeg',
    '/images/events/sport/מכבי.jpeg',
  ],
  birthday: [
    '/images/main/birthday.jpeg',
    '/images/events/birthday/Fridman.jpg',
    '/images/events/birthday/Rmember Amit 54.jpeg',
    '/images/events/birthday/Rmember Amit 56.jpeg',
    '/images/events/birthday/WhatsApp Image 2026-04-13 at 19.38.34.jpeg',
  ],
  others: [
    '/images/events/more events/IMG_7629.JPEG',
    '/images/events/more events/IMG_7645.JPEG',
    '/images/events/more events/IMG_7655.JPEG',
    '/images/events/more events/Rmember Amit 25.jpeg',
    '/images/events/more events/Rmember Amit 26.jpeg',
    '/images/events/more events/Rmember Amit 44.jpeg',
    '/images/events/more events/Rmember Amit 45.jpeg',
  ],
};

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const closeGallery = useCallback(() => {
    setActiveCategory(null);
  }, []);

  const images = activeCategory ? galleryData[activeCategory] ?? [] : [];

  const handleNext = useCallback(() => {
    setCurrentIndex(i => (i + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <>
      <BodyClass className="events-page" />
      <div id="navigation-root">
        <Navigation pageTitle="אירועי הנצחה" />
      </div>
      <main className="main-content-scroll">
        <div className="events-page-wrapper">
          <div className="events-grid">
            <a href="#" className="event-card" data-category="memorial" onClick={(e) => { e.preventDefault(); openGallery('memorial'); }}>
              <img src="/images/events/memorial day 2025.jpeg" alt="ימי הזיכרון" className="event-card-img" />
              <div className="event-card-label"><span>ימי הזיכרון</span></div>
            </a>
            <a href="#" className="event-card" data-category="lecture" onClick={(e) => { e.preventDefault(); openGallery('lecture'); }}>
              <img src="/images/events/lecture.jpg" alt="הרצאות" className="event-card-img" />
              <div className="event-card-label"><span>הרצאות</span></div>
            </a>
            <a href="#" className="event-card" data-category="scouts" onClick={(e) => { e.preventDefault(); openGallery('scouts'); }}>
              <img src="/images/events/scouts 1.jpeg" alt="צופים" className="event-card-img" />
              <div className="event-card-label"><span>צופים</span></div>
            </a>
            <a href="#" className="event-card" data-category="sport" onClick={(e) => { e.preventDefault(); openGallery('sport'); }}>
              <img src="/images/events/basketball team.jpg" alt="ספורט" className="event-card-img" />
              <div className="event-card-label"><span>ספורט</span></div>
            </a>
            <a href="#" className="event-card" data-category="birthday" onClick={(e) => { e.preventDefault(); openGallery('birthday'); }}>
              <img src="/images/main/birthday.jpeg" alt="ימי הולדת בלעדיך" className="event-card-img" />
              <div className="event-card-label"><span>ימי הולדת בלעדיך</span></div>
            </a>
            <a href="#" className="event-card" data-category="others" onClick={(e) => { e.preventDefault(); openGallery('others'); }}>
              <img src="/images/events/Lev.jpeg" alt="ארועים נוספים" className="event-card-img" />
              <div className="event-card-label"><span>ארועים נוספים</span></div>
            </a>
          </div>
        </div>
      </main>
      <GalleryModal
        isOpen={activeCategory !== null}
        images={images}
        currentIndex={currentIndex}
        onClose={closeGallery}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/events/
git commit -m "feat: add events page with gallery modal"
```

---

### Task 13: Remember page

**Files:**
- Create: `app/remember/page.tsx`

- [ ] **Step 1: Create app/remember/page.tsx**

Same pattern as events page. Gallery data from remember.html:

```tsx
'use client';

import { useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import GalleryModal from '@/components/GalleryModal';
import BodyClass from '@/components/BodyClass';
import '@/styles/remember.css';

const galleryData: Record<string, string[]> = {
  stickers: [
    '/images/Remember/Stickers/Rmember Amit 13.jpeg',
    '/images/Remember/Stickers/Rmember Amit 18.jpeg',
    '/images/Remember/Stickers/Rmember Amit 19.jpeg',
    '/images/Remember/Stickers/Rmember Amit 21.jpeg',
    '/images/Remember/Stickers/Rmember Amit 3.jpeg',
    '/images/Remember/Stickers/Rmember Amit 31.jpeg',
    '/images/Remember/Stickers/Rmember Amit 32.jpeg',
    '/images/Remember/Stickers/Rmember Amit 4.jpeg',
    '/images/Remember/Stickers/Rmember Amit 49.jpeg',
    '/images/Remember/Stickers/Rmember Amit 5.jpeg',
  ],
  memorial: [
    '/images/Remember/memorial/Rmember Amit 10.jpeg',
    '/images/Remember/memorial/Rmember Amit 11.jpeg',
    '/images/Remember/memorial/Rmember Amit 12.jpeg',
    '/images/Remember/memorial/Rmember Amit 20.jpeg',
    '/images/Remember/memorial/Rmember Amit 22.jpeg',
    '/images/Remember/memorial/Rmember Amit 46.jpeg',
    '/images/Remember/memorial/Rmember Amit 48.jpeg',
    '/images/Remember/memorial/Rmember Amit 53.jpeg',
    '/images/Remember/memorial/Rmember Amit 65.jpeg',
    '/images/Remember/memorial/Rmember Amit 8.jpeg',
    '/images/Remember/memorial/Rmember Amit 9.jpeg',
    '/images/Remember/memorial/WhatsApp Image 2026-04-13 at 19.38.34 (1).jpeg',
    '/images/Remember/memorial/הנצחה עט.jpeg',
    '/images/Remember/memorial/ציור פרידמן.jpeg',
  ],
  shows: [
    '/images/Remember/shows/Rmember Amit 57.jpeg',
    '/images/Remember/shows/Rmember Amit 59.jpeg',
    '/images/Remember/shows/Rmember Amit 63.jpeg',
  ],
  journey: [
    '/images/Remember/journey/Rmember Amit 14.jpeg',
    '/images/Remember/journey/Rmember Amit 2.jpeg',
    '/images/Remember/journey/Rmember Amit 24.jpeg',
    '/images/Remember/journey/Rmember Amit 27.jpeg',
    '/images/Remember/journey/Rmember Amit 28.jpeg',
    '/images/Remember/journey/Rmember Amit 47.jpeg',
    '/images/Remember/journey/Rmember Amit 64.jpeg',
    '/images/Remember/journey/Rmember Amit 7.jpeg',
  ],
};

export default function RememberPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const closeGallery = useCallback(() => setActiveCategory(null), []);

  const images = activeCategory ? galleryData[activeCategory] ?? [] : [];

  const handleNext = useCallback(() => setCurrentIndex(i => (i + 1) % images.length), [images.length]);
  const handlePrev = useCallback(() => setCurrentIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <>
      <BodyClass className="remember-page" />
      <div id="navigation-root">
        <Navigation pageTitle="זוכרים אותך" />
      </div>
      <main className="main-content-scroll">
        <div className="remember-page-wrapper">
          <div className="remember-grid">
            <a href="#" className="remember-card" onClick={(e) => { e.preventDefault(); openGallery('stickers'); }}>
              <img src="/images/Remember/Stickers/Rmember Amit 31.jpeg" alt="עמית מסביב לעולם" className="remember-card-img" />
              <div className="remember-card-label"><span>עמית מסביב לעולם</span></div>
            </a>
            <a href="#" className="remember-card" onClick={(e) => { e.preventDefault(); openGallery('memorial'); }}>
              <img src="/images/Remember/memorial/Rmember Amit 9.jpeg" alt="פינות הנצחה" className="remember-card-img" />
              <div className="remember-card-label"><span>פינות הנצחה</span></div>
            </a>
            <a href="#" className="remember-card" onClick={(e) => { e.preventDefault(); openGallery('shows'); }}>
              <img src="/images/Remember/shows/Rmember Amit 59.jpeg" alt="הופעות" className="remember-card-img" />
              <div className="remember-card-label"><span>הופעות</span></div>
            </a>
            <a href="#" className="remember-card" onClick={(e) => { e.preventDefault(); openGallery('journey'); }}>
              <img src="/images/Remember/journey/Rmember Amit 14.jpeg" alt="מסעות" className="remember-card-img" />
              <div className="remember-card-label"><span>מסעות</span></div>
            </a>
          </div>
        </div>
      </main>
      <GalleryModal
        isOpen={activeCategory !== null}
        images={images}
        currentIndex={currentIndex}
        onClose={closeGallery}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/remember/
git commit -m "feat: add remember page with gallery modal"
```

---

## Chunk 6: Coffee Pages

### Task 14: Coffee main page

**Files:**
- Create: `app/coffee/page.tsx`

- [ ] **Step 1: Create app/coffee/page.tsx**

Same gallery pattern, plus zoomable=true, gallery data from coffee_main.html:

```tsx
'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import Navigation from '@/components/Navigation';
import GalleryModal from '@/components/GalleryModal';
import BodyClass from '@/components/BodyClass';
import '@/styles/coffee_main.css';

const galleryData: Record<string, string[]> = {
  fam: [
    '/images/coffee/CoffeeFam/מפורסמים.jpeg',
    '/images/coffee/CoffeeFam/DSC_1403.jpg',
    '/images/coffee/CoffeeFam/ליאת פרידמן ושחר חיון, בפסל הלב לזכרו של עמית פרידמן.jpeg',
    '/images/coffee/CoffeeFam/מה קשור בעגלה.jpeg',
    '/images/coffee/CoffeeFam/עגלה עם ליאת שוחט.jpeg',
  ],
  pic: [
    '/images/coffee/CoffeePIC/כוס מעוצבת מחייכת.jpeg',
    '/images/coffee/CoffeePIC/CoffeePic1.jpeg',
    '/images/coffee/CoffeePIC/DSC_5887.jpg',
    '/images/coffee/CoffeePIC/IMG_9418.jpeg',
    '/images/coffee/CoffeePIC/Rmember Amit 15.jpeg',
    '/images/coffee/CoffeePIC/Rmember Amit 29.jpeg',
    '/images/coffee/CoffeePIC/Rmember Amit 50.jpeg',
    '/images/coffee/CoffeePIC/Rmember Amit 51.jpeg',
    '/images/coffee/CoffeePIC/Rmember Amit 60.jpeg',
    '/images/coffee/CoffeePIC/Rmember Amit 62.jpeg',
    '/images/coffee/CoffeePIC/WhatsApp Image 2026-04-13 at 19.38.33.jpeg',
    '/images/coffee/CoffeePIC/wine.jpeg',
    '/images/coffee/CoffeePIC/לב בכיכר.jpeg',
    '/images/coffee/CoffeePIC/מפית משפטים.jpeg',
    '/images/coffee/CoffeePIC/קפה החברים של עמית צילום יחצ (1).jpg',
    '/images/coffee/CoffeePIC/קפה החברים של עמית צילום נטלי בוגנה.jpg',
  ],
  event: [
    '/images/coffee/CoffeeEvent/IMG_7735.JPEG',
    '/images/coffee/CoffeeEvent/7f351100-6fed-40e2-89ec-ec2314840e5a.jpg',
    '/images/coffee/CoffeeEvent/IMG_8861.JPEG',
    '/images/coffee/CoffeeEvent/WhatsApp Image 2026-04-13 at 19.38.34.jpeg',
  ],
};

export default function CoffeePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (category: string) => { setActiveCategory(category); setCurrentIndex(0); };
  const closeGallery = useCallback(() => setActiveCategory(null), []);
  const images = activeCategory ? galleryData[activeCategory] ?? [] : [];
  const handleNext = useCallback(() => setCurrentIndex(i => (i + 1) % images.length), [images.length]);
  const handlePrev = useCallback(() => setCurrentIndex(i => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <>
      <BodyClass className="coffee-main-page" />
      <div id="navigation-root">
        <Navigation pageTitle="עגלת קפה" />
      </div>
      <main className="main-content-scroll">
        <div className="coffee-main-container">
          <section className="coffee-hero">
            <div className="coffee-image-col">
              <img src="/images/coffee/CoffeePIC/CoffeePic1.jpeg" alt="עגלת הקפה של עמית" className="coffee-hero-img" />
              <Link href="/coffee/recipe" className="coffee-recipe-btn desktop-only">
                <BookOpen />
                <div className="btn-text-content">
                  <span className="btn-text-main">מאפיית פרידמן</span>
                  <span className="btn-text-sub">ספר מתכונים</span>
                </div>
              </Link>
            </div>
            <div className="coffee-info-col">
              <div className="coffee-logo-area">
                <img src="/images/main/לוגו עגלה לבן.png" alt="לוגו קפה החברים של עמית" className="coffee-logo-img" />
              </div>
              <h1 className="coffee-main-title">עגלת &quot;קפה החברים של עמית&quot;</h1>
              <div className="coffee-description">
                <p>עגלת &quot;קפה החברים של עמית&quot; הוקמה לזכרו של סמ&quot;ר עמית פרידמן ז&quot;ל, שנפל בקרב בתל סולטן שברפיח ב־27 באוגוסט 2024, בגיל 19.</p>
                <p>העגלה פועלת ביוזמה קהילתית מדי יום שישי בנווה סביון שבאור יהודה. תושבי השכונה מתנדבים, אופים ומגישים קפה, מאפים ומשקאות, עוגיות אמסטרדם ייחודיות, סמבוסק, מילקשייק ועוד כאשר כל ההכנסות מוקדשות להנצחתו.</p>
                <p>המיזם נולד מהרגעים הפשוטים שעמית אהב יותר מכל: לשבת עם חברים, לשוחח, לצחוק ולהיות יחד. <br />
                כשעמית היה יוצא מהצבא נהג לפקוד את בתי הקפה באזור ולפגוש חברים ממעגלים שונים.</p>
                <p>&quot;קפה החברים של עמית&quot; ממשיך לספר את סיפורו, אהבת האדם, השמחה והחברות והופך לזיכרון ולחיבור חם בקהילה.<br />
                מיזם של קהילה שלמה שלוקחת חלק בלהשאיר את עמית נוכח ולהנציח את האדם שהיה והאור שהפיץ.</p>
                <p><strong>העגלה פועלת בכל יום שישי בין השעות 10:00–13:00, ברחוב דקל 11 פינת חיים בר־לב, נווה סביון, אור יהודה (חפשו ב-Waze: קפה החברים של עמית – עגלת קפה)</strong></p>
              </div>
              <Link href="/coffee/recipe" className="coffee-recipe-btn mobile-only">
                <BookOpen />
                <div className="btn-text-content">
                  <span className="btn-text-main">מאפיית פרידמן</span>
                  <span className="btn-text-sub">ספר מתכונים</span>
                </div>
              </Link>
              <section className="coffee-grid">
                <a href="#" className="coffee-card" onClick={(e) => { e.preventDefault(); openGallery('fam'); }}>
                  <div className="coffee-card-img-wrapper">
                    <img src="/images/coffee/CoffeeFam/מפורסמים.jpeg" alt="מפורסמים בעגלה" className="coffee-card-img" />
                  </div>
                  <div className="coffee-card-label"><span>מפורסמים בעגלה</span></div>
                </a>
                <a href="#" className="coffee-card" onClick={(e) => { e.preventDefault(); openGallery('pic'); }}>
                  <div className="coffee-card-img-wrapper">
                    <img src="/images/coffee/CoffeePIC/כוס מעוצבת מחייכת.jpeg" alt="תמונות עגלה" className="coffee-card-img" />
                  </div>
                  <div className="coffee-card-label"><span>תמונות עגלה</span></div>
                </a>
                <a href="#" className="coffee-card" onClick={(e) => { e.preventDefault(); openGallery('event'); }}>
                  <div className="coffee-card-img-wrapper">
                    <img src="/images/coffee/CoffeeEvent/IMG_7735.JPEG" alt="אירועי מאפיית פרידמן" className="coffee-card-img" />
                  </div>
                  <div className="coffee-card-label"><span>אירועי מאפיית פרידמן</span></div>
                </a>
              </section>
            </div>
          </section>
        </div>
      </main>
      <GalleryModal
        isOpen={activeCategory !== null}
        images={images}
        currentIndex={currentIndex}
        onClose={closeGallery}
        onNext={handleNext}
        onPrev={handlePrev}
        zoomable
      />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/coffee/page.tsx
git commit -m "feat: add coffee main page"
```

---

### Task 15: CoffeeApp component + Recipe page

**Files:**
- Create: `components/CoffeeApp.tsx`
- Create: `app/coffee/recipe/page.tsx`

- [ ] **Step 1: Create components/CoffeeApp.tsx**

This component holds all recipe data and the list/detail view logic from coffee.html. The recipes array, sortRecipes, renderHome, showRecipe, showHome logic all move here as React state.

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

interface Recipe {
  title: string;
  author: string;
  ingredients: string;
  instructions: string;
}

const recipes: Recipe[] = [
  // COPY THE FULL recipes ARRAY FROM coffee.html verbatim
  // (all entries from "אלפחורס (המתכון שקים דוקרקר..." through "עוגת גבינה" by מיטל שבתאי)
  // See source file: coffee.html lines 121-325
];

const END_LIST_KEYWORDS = ['לחמניות', 'סמבוסק', 'סלט ביצים'];

function getSortedRecipes(): Recipe[] {
  return [...recipes].sort((a, b) => {
    const aIsEnd = END_LIST_KEYWORDS.some(k => a.title.includes(k));
    const bIsEnd = END_LIST_KEYWORDS.some(k => b.title.includes(k));
    if (aIsEnd && !bIsEnd) return 1;
    if (!aIsEnd && bIsEnd) return -1;
    return a.title.localeCompare(b.title, 'he');
  });
}

function getImagePaths(recipe: Recipe) {
  const safeTitle = recipe.title.replace(/[<>:"/\\|?*'`\u05F3\u05F4]/g, '');
  const safeAuthor = recipe.author.replace(/[<>:"/\\|?*'`\u05F3\u05F4]/g, '');
  return {
    jpg: `/images/coffee/${safeTitle} - ${safeAuthor}.jpg`,
    jpeg: `/images/coffee/${safeTitle} - ${safeAuthor}.jpeg`,
    png: `/images/coffee/${safeTitle} - ${safeAuthor}.png`,
  };
}

function getFallbackUrl(title: string): string {
  if (title.includes('שוקולד') || title.includes('בראוניז')) return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80';
  if (title.includes('גבינה')) return 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=300&q=80';
  if (title.includes('תפוח')) return 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=300&q=80';
  if (title.includes('עוגיות') || title.includes('סהרוני')) return 'https://images.unsplash.com/photo-1499636138143-bd649043ea52?auto=format&fit=crop&w=300&q=80';
  if (title.includes('סמבוסק') || title.includes('לחמניות')) return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80';
  if (title.includes('אלפחורס')) return 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&q=80';
  if (title.includes('סלט')) return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80';
  if (title.includes('גזר')) return 'https://images.unsplash.com/photo-1598375811776-6c58971f11e9?auto=format&fit=crop&w=300&q=80';
  if (title.includes('שמרים') || title.includes('שושני')) return 'https://images.unsplash.com/photo-1606101272675-52467d16a570?auto=format&fit=crop&w=300&q=80';
  return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80';
}

type View = 'home' | 'recipe' | 'amit' | 'location';

export default function CoffeeApp() {
  const [view, setView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const sorted = getSortedRecipes();

  const showHome = () => { setView('home'); window.scrollTo(0, 0); };
  const showRecipe = (recipe: Recipe) => { setSelectedRecipe(recipe); setView('recipe'); window.scrollTo(0, 0); };

  const handlePrint = async () => {
    if (!selectedRecipe) return;
    const el = document.getElementById('single-recipe-container');
    if (!el) return;
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf(el);
  };

  return (
    <div id="app-container">
      {/* Home View */}
      <div id="home-view" className={`view${view === 'home' ? ' active' : ''}`}>
        <div className="back-link-wrapper">
          <Link href="/coffee" className="back-to-hub">
            <ArrowRight /> חזרה לעגלת הקפה
          </Link>
        </div>
        <div className="recipe-grid" id="recipe-list-container">
          {sorted.map((recipe, idx) => {
            const paths = getImagePaths(recipe);
            const fallback = getFallbackUrl(recipe.title);
            return (
              <div key={idx} className="recipe-card" onClick={() => showRecipe(recipe)} style={{ cursor: 'pointer' }}>
                <RecipeCardImage paths={paths} fallback={fallback} title={recipe.title} />
                <div className="card-info">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recipe Detail View */}
      <div id="recipe-view" className={`view${view === 'recipe' ? ' active' : ''}`}>
        {selectedRecipe && (
          <div id="single-recipe-container" className="preview-area">
            <div className="page recipe-page">
              <button className="close-btn" onClick={showHome}>
                <X />
              </button>
              <div className="icons-bg" />
              <div className="recipe-header">
                <h1 className="recipe-title">{selectedRecipe.title}</h1>
                <div className="recipe-author">נאפה באהבה על ידי: {selectedRecipe.author}</div>
              </div>
              <div className="recipe-content">
                <div className="ingredients-box">
                  <span className="box-title">מצרכים</span>
                  <div dangerouslySetInnerHTML={{ __html: selectedRecipe.ingredients.replace(/\n/g, '<br>') }} />
                </div>
                <div className="instructions-box">
                  <span className="box-title">אופן ההכנה</span>
                  <div dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions.replace(/\n/g, '<br>') }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dead views — never activated, kept for identical HTML structure */}
      <div id="amit-view" className="view">
        <div className="page story-page">
          <button className="close-btn" onClick={showHome}><X /></button>
          <div className="story-content">
            <h1 className="story-title">לזכרו של סמ&quot;ר עמית פרידמן הי&quot;ד</h1>
            <p>סמל ראשון עמית פרידמן מ&quot;כ בגדוד 932 של חטיבת הנח&quot;ל, נפל בקרב בתל סולטן שברפיח, רצועת עזה.</p>
          </div>
        </div>
      </div>
      <div id="location-view" className="view">
        <div className="page location-page">
          <button className="close-btn" onClick={showHome}><X /></button>
          <div className="location-content">
            <h1 className="story-title">מיקום עגלת הקפה</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeCardImage({ paths, fallback, title }: { paths: { jpg: string; jpeg: string; png: string }; fallback: string; title: string }) {
  const [src, setSrc] = useState(paths.jpg);
  const [errCount, setErrCount] = useState(0);

  const handleError = () => {
    if (errCount === 0) { setSrc(paths.jpeg); setErrCount(1); }
    else if (errCount === 1) { setSrc(paths.png); setErrCount(2); }
    else { setSrc(fallback); }
  };

  return <img src={src} onError={handleError} alt={title} className="card-img" />;
}
```

> **Important:** The `recipes` array in CoffeeApp.tsx must contain the complete data from `coffee.html` lines 121–325. Copy the entire array verbatim, converting the JS object literals to TypeScript (they are already valid TypeScript as-is).

- [ ] **Step 2: Create app/coffee/recipe/page.tsx**

```tsx
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import CoffeeApp from '@/components/CoffeeApp';

export const metadata: Metadata = {
  title: 'ספר המתכונים - החברים של עמית',
};

export default function CoffeeRecipePage() {
  return (
    <>
      <div id="navigation-root">
        <Navigation pageTitle='קפה "החברים של עמית"' />
      </div>
      <main className="main-content-scroll">
        <CoffeeApp />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/CoffeeApp.tsx app/coffee/recipe/
git commit -m "feat: add CoffeeApp component and recipe page"
```

---

## Chunk 7: News, Contact, Final Pages

### Task 16: NewsApp component + news page

**Files:**
- Create: `components/NewsApp.tsx`
- Create: `app/news/page.tsx`

- [ ] **Step 1: Create components/NewsApp.tsx**

```tsx
'use client';

interface NewsArticle {
  title: string;
  source: string;
  image: string;
  link: string;
}

const newsArticles: NewsArticle[] = [
  {
    title: 'לזכרו של סמ"ר עמית פרידמן',
    source: 'Ynet',
    image: 'https://v.ynet.co.il/PicServer5/2023/10/08/12948639/12948633010099640360no.jpg',
    link: 'https://www.ynet.co.il/gal-hed/article/b1jpe83pbl?utm_source=ynet.app.ios&utm_term=b1jpe83pbl&utm_campaign=whatsapp&utm_medium=social?utm_source=https://www.ynet.co.il&utm_medium=social&utm_campaign=general_share',
  },
  {
    title: 'קפה לזכרו של גיבור',
    source: 'עיתונות מקומית',
    image: '/images/news/coffe 1.jpeg',
    link: '/images/news/coffe 1.jpeg',
  },
  {
    title: 'השקת עגלת הקפה',
    source: 'עיתונות מקומית',
    image: '/images/news/coffe 2.jpeg',
    link: '/images/news/coffe 2.jpeg',
  },
];

const FALLBACK = 'https://images.unsplash.com/photo-1585829365234-78d9b692d47d?auto=format&fit=crop&w=300&q=80';

export default function NewsApp() {
  return (
    <div id="app-container">
      <div id="news-view" className="view active">
        <div className="news-grid" id="news-list-container">
          {newsArticles.map((article, idx) => (
            <div
              key={idx}
              className="news-card"
              onClick={() => window.open(article.link, '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={article.image}
                alt={article.title}
                className="card-img"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }}
              />
              <div className="card-info">
                <h3>{article.title}</h3>
                <p>{article.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create app/news/page.tsx**

```tsx
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import NewsApp from '@/components/NewsApp';

export const metadata: Metadata = {
  title: 'News - החברים של עמית',
};

export default function NewsPage() {
  return (
    <>
      <div id="navigation-root">
        <Navigation pageTitle="כתבות בעיתונות" />
      </div>
      <main className="main-content-scroll">
        <NewsApp />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/NewsApp.tsx app/news/
git commit -m "feat: add news page"
```

---

### Task 17: ContactForm component + contact page

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create components/ContactForm.tsx**

```tsx
'use client';

import { FormEvent } from 'react';

const CONTACT_EMAIL = 'iris.porat@gmail.com';

export default function ContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const subject = encodeURIComponent('פנייה מאתר עמית פרידמן - ' + name);
    const body = encodeURIComponent(
      'שם: ' + name + '\n' +
      'אימייל: ' + email + '\n' +
      'טלפון: ' + phone + '\n\n' +
      'הודעה:\n' + message
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">שם</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">דוא&quot;ל *</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="phone">טלפון</label>
        <input type="tel" id="phone" name="phone" />
      </div>
      <div className="form-group">
        <label htmlFor="message">הודעה</label>
        <textarea id="message" name="message" />
      </div>
      <button type="submit" className="submit-btn">שלח</button>
    </form>
  );
}
```

- [ ] **Step 2: Create app/contact/page.tsx**

```tsx
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';
import BodyClass from '@/components/BodyClass';
import '@/styles/contact.css';

export const metadata: Metadata = {
  title: 'צור קשר - עמית פרידמן',
};

export default function ContactPage() {
  return (
    <>
      <BodyClass className="contact-page" />
      <div id="navigation-root">
        <Navigation pageTitle="צור קשר" />
      </div>
      <main className="main-content-scroll">
        <div className="contact-wrapper">
          <div className="contact-header">
            <h2>צור קשר</h2>
            <p>נשמח לשמוע מכם</p>
          </div>
          <ContactForm />
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify final build**

```bash
npm run build
```

Expected: All 10 pages and all components compile successfully with zero TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add components/ContactForm.tsx app/contact/
git commit -m "feat: add contact page"
```

---

## Final Verification

- [ ] **Start dev server and visually verify all 10 pages**

```bash
npm run dev
```

Open `http://localhost:3000` and visit each route:
- `/` — home page, clouds video, memorial text and image
- `/about` — story text + portrait image
- `/bravery` — story text + wings image + YouTube button
- `/coffee` — coffee cart hero + 3 gallery cards (click each to open modal with zoom)
- `/coffee/recipe` — recipe grid, click a recipe to see detail, close returns to grid
- `/events` — 6 event cards, click each to open gallery
- `/remember` — 4 remember cards, click each to open gallery
- `/news` — 3 news cards
- `/contact` — form, submit opens email client
- `/location` — address cards + Google Maps iframe

For each page verify:
1. Navigation top bar renders correctly
2. Hamburger opens/closes side menu
3. Side menu links navigate correctly
4. Page content matches original HTML visually
5. No console errors

- [ ] **Final commit**

```bash
git add .
git commit -m "feat: complete HTML to Next.js migration"
```
