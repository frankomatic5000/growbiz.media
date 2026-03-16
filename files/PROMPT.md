# GrowBiz Media — Claude Code Build Prompt

You are building **growbiz.media**, the institutional website for **GrowBiz Media**, a multicultural media holding company based in New Jersey/New York. The site presents the parent brand and links to its subsidiaries.

---

## 🎯 What You're Building

A **static institutional website** using:
- **Next.js 14** (App Router)
- **Tailwind CSS** (with custom brand tokens)
- **Framer Motion** (scroll and entrance animations)

Read `spec.md` in full before writing any code. That file is your source of truth for layout, content, colors, fonts, and components.

---

## 🚀 Step-by-Step Build Order

### Step 1 — Project Scaffolding

```bash
npx create-next-app@14 growbiz-media \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd growbiz-media
npm install framer-motion lucide-react
```

---

### Step 2 — Tailwind Configuration

Open `tailwind.config.ts` and extend with brand tokens exactly as in `spec.md` Section 9:

```ts
colors: {
  mustard: '#D6A846',
  navy: '#1F365D',
  cream: '#F7F4EF',
  gold: '#A67A55',
  ink: '#1A1A1A',
  silver: '#CFCCFF',
},
fontFamily: {
  display: ['Playfair Display', 'serif'],
  editorial: ['Cormorant Garamond', 'serif'],
  body: ['DM Sans', 'sans-serif'],
},
```

---

### Step 3 — Global Styles & Fonts

In `app/globals.css`, add Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@400;500;600&display=swap');

:root {
  --mustard: #D6A846;
  --navy: #1F365D;
  --cream: #F7F4EF;
  --gold: #A67A55;
  --ink: #1A1A1A;
  --silver: #CFCCFF;
}

body {
  background-color: #F7F4EF;
  color: #1A1A1A;
  font-family: 'DM Sans', sans-serif;
}
```

---

### Step 4 — Constants File

Create `lib/constants.ts` with the subsidiaries data:

```ts
export const SUBSIDIARIES = [
  {
    id: 'studios',
    name: 'GrowBiz Studios',
    tagline: 'Strategic media production for entrepreneurs',
    description: 'Professional studio recording, course creation, podcast production, and teleprompter-assisted authority videos.',
    url: 'https://growbizstudios.com',
    accent: 'mustard',
    icon: 'Video',
  },
  {
    id: 'talks',
    name: 'GrowBiz Talks',
    tagline: 'Live stage & speaking events platform',
    description: 'Curated speaking stages where founders build authority, generate content, and expand their network.',
    url: 'https://growbiztalks.com',
    accent: 'navy',
    icon: 'Mic',
  },
  {
    id: 'magazine',
    name: 'GrowBiz Magazine',
    tagline: 'Digital publication for multicultural leaders',
    description: 'Amplifying business leaders, women founders, and global entrepreneurs through editorial storytelling.',
    url: 'https://growbizmagazine.com',
    accent: 'gold',
    icon: 'BookOpen',
  },
  {
    id: 'imigrou',
    name: 'Imigrou',
    tagline: 'Community and resources for immigrants',
    description: 'Supporting immigrant entrepreneurs and professionals with tools, community, and visibility.',
    url: 'https://imigrou.com',
    accent: 'mustard',
    icon: 'Globe',
  },
  {
    id: 'pernas-cruzadas',
    name: 'Pernas Cruzadas',
    tagline: 'Lifestyle & culture brand',
    description: 'A creative lifestyle brand celebrating multicultural identity, culture, and expression.',
    url: '#',
    accent: 'navy',
    icon: 'Sparkles',
  },
  {
    id: 'pessoas-globais',
    name: 'Pessoas Globais',
    tagline: 'Network for global professionals',
    description: 'Connecting Brazilian and multicultural professionals building careers and businesses across borders.',
    url: '#',
    accent: 'gold',
    icon: 'Users',
  },
  {
    id: 'vaptlux',
    name: 'VaptLux',
    tagline: 'Premium lifestyle services',
    description: 'Curated premium services for entrepreneurs who value excellence in every detail of their brand.',
    url: '#',
    accent: 'mustard',
    icon: 'Star',
  },
]

export const IMPACT_STATS = [
  { value: 500, suffix: '+', label: 'Entrepreneurs Served' },
  { value: 8, suffix: '', label: 'Brands in the Portfolio' },
  { value: 3, suffix: '', label: 'Core Media Pillars' },
  { value: 10, suffix: '+', label: 'Years of Community' },
]

export const MISSION_PILLARS = [
  {
    title: 'Production',
    icon: 'Video',
    description: 'Studio-grade content creation: courses, podcasts, authority videos, and branding sessions — accessible to every entrepreneur.',
  },
  {
    title: 'Events',
    icon: 'Mic2',
    description: 'Live stages, curated panels, and event production that puts founders in the spotlight and builds lasting authority.',
  },
  {
    title: 'Publishing',
    icon: 'Newspaper',
    description: 'GrowBiz Magazine amplifies multicultural business voices through digital and print editorial platforms.',
  },
]
```

---

### Step 5 — Layout (Root)

Create `app/layout.tsx`:
- Import fonts, globals.css
- Render `<Navbar />` and `<Footer />` around `{children}`
- Set metadata: title "GrowBiz Media — A Global Media of Virtues", description, og:image

---

### Step 6 — Components (Build in this order)

#### 6.1 `components/ui/MosaicStrip.tsx`
- Props: `position: 'top' | 'bottom'`, `height?: number`
- Renders a full-width div with `mosaic.png` as background-image
- `background-size: cover`, `background-position: center`
- Height: ~100px
- Add slight overlay for depth if needed

```tsx
// Example structure
export function MosaicStrip({ height = 100 }: { height?: number }) {
  return (
    <div
      className="w-full"
      style={{
        height: `${height}px`,
        backgroundImage: 'url(/assets/mosaic.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}
```

#### 6.2 `components/layout/Navbar.tsx`
- Logo (img src="/assets/logo-dark.png") left-aligned
- Nav links: About · Our Universe · Magazine · Contact
- "Work With Us" CTA button — mustard bg, navy text, rounded
- Mobile: hamburger menu with animated slide-in drawer
- Scroll behavior: `useEffect` to add `backdrop-blur` class after 50px scroll
- Always sticky, starts transparent over hero

#### 6.3 `components/layout/Footer.tsx`
- `<MosaicStrip />` at top
- `#1A1A1A` background
- 4-column grid (responsive)
- Logo + tagline + social icons (Instagram, LinkedIn, YouTube via lucide-react)
- Links to all sections and all subsidiaries
- Copyright bar

#### 6.4 `components/home/Hero.tsx`
- Full viewport height: `min-h-screen`
- Background: navy `#1F365D`
- Mosaic decorative corners (absolutely positioned, 200x200px crops)
- Animated entrance with Framer Motion (`variants`, `staggerChildren`)
- Headline: "Where Brands Build Authority." — Playfair Display, 5xl–7xl, cream
- Subheadline: DM Sans, lg, cream/80% opacity
- Two CTA buttons side by side

#### 6.5 `components/home/BrandStatement.tsx`
- Cream background strip
- Cormorant Garamond, 3xl–5xl, centered
- Mustard horizontal lines flanking the text (use `<hr>` or divs)

#### 6.6 `components/home/AboutSnippet.tsx`
- Two-column layout (use CSS Grid `grid-cols-5` — 3 cols text, 2 cols stats)
- Left: section label "ABOUT GROWBIZ MEDIA" (small, mustard, DM Sans uppercase) + headline + 2-3 paragraphs
- Right: 3 stat cards with large number + label, navy bg, cream text, rounded corners
- Framer Motion: slide in from respective sides

#### 6.7 `components/home/SubsidiariesGrid.tsx`
- Section title "Our Universe" — Playfair Display, centered
- Subtitle — DM Sans, centered, gold color
- CSS Grid: `grid-cols-2 md:grid-cols-4` (7 brands + 1 "Explore All" card)
- `components/ui/BrandCard.tsx` — accepts subsidiary data
  - Cream bg, navy border `border border-navy/10`
  - Icon (Lucide) in accent color
  - Brand name: Playfair Display, md
  - Tagline: DM Sans, sm, navy/70%
  - "Visit →" link in mustard
  - Hover: `scale-[1.03]`, mustard border, shadow-lg

#### 6.8 `components/home/MissionPillars.tsx`
- Navy background
- Section title in cream, Playfair Display
- 3-column grid of pillar cards
- Each card: Lucide icon in mustard, title in cream, description in cream/80%
- `<MosaicStrip />` at section bottom

#### 6.9 `components/ui/AnimatedCounter.tsx`
- Uses `useInView` from framer-motion
- Counts from 0 to `value` over 2 seconds when enters viewport
- Props: `value: number`, `suffix: string`, `label: string`

#### 6.10 `components/home/ImpactNumbers.tsx`
- Cream background with subtle grid line texture (CSS background-image SVG)
- 4 `<AnimatedCounter>` components in a row
- Large Playfair Display numbers in navy, labels in DM Sans

#### 6.11 `components/home/MagazineCallout.tsx`
- Split section: left navy, right cream
- Left: magazine mockup placeholder (styled div or real image), white text
- Right: "Get Featured in GrowBiz Magazine" headline + description + CTA

#### 6.12 `components/home/CTABanner.tsx`
- Mustard background (`#D6A846`)
- Centered headline in navy, Playfair Display, 3xl–4xl
- Sub in navy/80%, DM Sans
- "Start Here →" button in navy fill, cream text

---

### Step 7 — Home Page Assembly

`app/page.tsx`:

```tsx
import Hero from '@/components/home/Hero'
import BrandStatement from '@/components/home/BrandStatement'
import AboutSnippet from '@/components/home/AboutSnippet'
import SubsidiariesGrid from '@/components/home/SubsidiariesGrid'
import MissionPillars from '@/components/home/MissionPillars'
import ImpactNumbers from '@/components/home/ImpactNumbers'
import MagazineCallout from '@/components/home/MagazineCallout'
import CTABanner from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <AboutSnippet />
      <SubsidiariesGrid />
      <MissionPillars />
      <ImpactNumbers />
      <MagazineCallout />
      <CTABanner />
    </>
  )
}
```

---

### Step 8 — Additional Pages

#### `/about` — `app/about/page.tsx`
- Hero strip (navy, mosaic border)
- Mission & Vision in editorial layout (large pull quotes)
- Core Values as animated card grid (6 values from spec)
- Team placeholder section

#### `/subsidiaries` — `app/subsidiaries/page.tsx`
- Hero strip
- Expanded grid of all 7 brands (larger cards with full description)
- Each card links to external brand URL

#### `/contact` — `app/contact/page.tsx`
- Split layout: form left, info right
- Form fields: Name, Email, Company, Message, Interest (select dropdown)
- Action: POST to Formspree or use `mailto:` fallback
- Social links sidebar

---

### Step 9 — Assets Setup

Place these files in `public/assets/`:

```
public/assets/
├── logo-dark.png      # Logo on dark background (from PSD export)
├── logo-light.png     # Logo on light background (create variation)
├── mosaic.png         # Full mosaic pattern (compress to <500KB)
└── og-image.png       # 1200x630 social share image
```

**Mosaic export instructions:**
- Open `MOSAICO_PARA_APLICAR_NAS_COLUNAS.PSD` in Photoshop/Figma
- Export as PNG, resize to 1920x880px, optimize (target <400KB)
- Save as `public/assets/mosaic.png`

**Logo export instructions:**
- Open `growbiz-marca.psd` 
- Export dark version (black bg) as `logo-dark.png` at 2x (800x377px)
- For light version: make background cream `#F7F4EF`, re-export as `logo-light.png`

---

### Step 10 — Metadata & SEO

In `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: 'GrowBiz Media — A Global Media of Virtues',
  description: 'A multicultural media holding empowering entrepreneurs, founders, and leaders through strategic production, events, and publishing.',
  openGraph: {
    title: 'GrowBiz Media',
    description: 'A Global Media of Virtues',
    url: 'https://growbiz.media',
    siteName: 'GrowBiz Media',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowBiz Media',
    description: 'A Global Media of Virtues',
    images: ['/assets/og-image.png'],
  },
}
```

---

### Step 11 — Final Check & Build

```bash
# Lint
npm run lint

# Build check
npm run build

# Local preview
npm run dev
```

Verify:
- [ ] All 4 pages render without error
- [ ] Mosaic strips display correctly on header/footer
- [ ] All 7 subsidiary cards present with correct links
- [ ] Animations work on scroll
- [ ] Mobile nav opens/closes correctly
- [ ] Lighthouse score > 85 (Performance, Accessibility, SEO)

---

## 🎨 Design Mandatories

These are NON-NEGOTIABLE design rules:

1. **Never use Inter, Roboto, or Arial** — use the three specified fonts only
2. **Mosaic always appears** as a strip at the top of the hero AND top of the footer
3. **Mustard is reserved for CTAs and key accents** — not overused
4. **Navy is the authority color** — hero, dark sections, key headings
5. **Cream is the breathing space** — page background, card fills
6. **All cards have hover animations** — scale + shadow + border color shift
7. **Section transitions must feel intentional** — alternate between cream and navy sections
8. **Logo must be crisp** — always use PNG at 2x, never stretch it

---

## 📋 Acceptance Criteria

The site is "done" when:

- [ ] `growbiz.media` loads with the mosaic-framed hero
- [ ] All 7 subsidiaries are visible in the grid
- [ ] Clicking a subsidiary card opens the correct external URL
- [ ] Contact form submits successfully
- [ ] Site is fully responsive on iPhone 14, iPad, and 1440px desktop
- [ ] No console errors in production build
- [ ] Deployed to Vercel with custom domain `growbiz.media`

---

## 💡 Notes & Tips

- Use `'use client'` only on components that need it (animations, state) — keep pages as server components
- Framer Motion's `whileInView` is perfect for section reveals — use `viewport={{ once: true }}` to prevent re-triggering
- For the animated counter, throttle the interval to avoid performance issues
- The mosaic PNG is large — always use `next/image` with `priority={false}` for it
- Vercel deployment: `next.config.ts` should have `output: 'standalone'` for best performance

---

*Spec version: 1.0 | Ready for Claude Code | GrowBiz Media 2025*
