# GrowBiz Media — Website Specification
**Version:** 1.0  
**Target:** growbiz.media (institutional static site)  
**Stack:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion  
**Deployment:** Vercel (static export capable)

---

## 1. Brand Identity

### Tagline
> **"A Global Media of Virtues"**

### Color Palette

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--mustard` | Virtude Mostarda | `#D6A846` | Primary accent, CTAs, highlights |
| `--navy` | Conexão Global | `#1F365D` | Primary background, header, nav |
| `--cream` | Papel de Ideias | `#F7F4EF` | Page background, cards |
| `--gold` | Sustento Elegante | `#A67A55` | Secondary accent, borders |
| `--black` | Raiz Sofisticada | `#1A1A1A` | Body text, footer bg |
| `--silver` | Equilíbrio Editorial | `#CFCCFF` | Subtle dividers, backgrounds |

### Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Logo | `Playfair Display` | 700–900 | Headlines, hero text |
| Subheadings | `Cormorant Garamond` | 500–600 | Section headers |
| Body | `DM Sans` | 400–500 | Paragraphs, UI copy |
| Labels / Nav | `DM Sans` | 600 | Uppercase tracking |

### Visual Assets

| Asset | File | Notes |
|---|---|---|
| Logo (dark bg) | `growbiz-marca.psd` → export as `logo-dark.png` + `logo-dark.svg` | Use on navy/black bg |
| Logo (light bg) | Variation needed | Use on cream bg |
| Mosaic Pattern | `MOSAICO_PARA_APLICAR_NAS_COLUNAS.PSD` → export as `mosaic.png` | Use as header/footer texture |

**Mosaic usage:** The geometric pattern (triangles, circles, squares in mustard + navy + cream) should frame the top and bottom of the page — used as a decorative border strip, not a full background.

---

## 2. Site Architecture

```
growbiz.media/
├── / (Home — Institutional Landing)
├── /about
├── /subsidiaries
│   ├── /studios        → growbizstudios.com (redirect or embed)
│   ├── /talks          → growbiztalks.com
│   ├── /magazine       → growbizmagazine.com
│   ├── /imigrou        → imigrou.com
│   ├── /pernas-cruzadas
│   ├── /pessoas-globais
│   └── /vaptlux
├── /contact
└── /404
```

---

## 3. Page Sections — Home

### 3.1 Navigation (Sticky)
- Logo left (SVG, white on dark bg)
- Nav links: About · Subsidiaries · Magazine · Contact
- CTA button: "Work With Us" (mustard fill)
- Mobile: hamburger → full-screen slide menu
- On scroll: nav gets frosted glass effect + subtle shadow

### 3.2 Hero Section
- **Full-viewport height**
- Background: Deep navy `#1F365D` with mosaic pattern strips (top-left corner, bottom-right corner)
- Large display headline: `"Where Brands Build Authority."` in Playfair Display, cream color
- Subheadline: `"A multicultural media holding empowering entrepreneurs, founders, and leaders — globally."` in DM Sans
- Two CTAs: `Explore Our Universe` (mustard filled) + `Meet GrowBiz` (outline cream)
- Animated entrance: staggered text reveal (fade + slide up)
- Subtle animated geometric shapes (CSS-only, brand colors, low opacity)

### 3.3 Brand Statement Bar
- Full-width cream strip
- Single centered statement: `"A Global Media of Virtues"` — large, bold, Cormorant Garamond
- Flanked by thin mustard divider lines

### 3.4 About Snippet
- Two-column layout (60/40)
- Left: Headline + 3–4 paragraph summary of GrowBiz Media mission
- Right: Mosaic-bordered stat cards:
  - `8+` Brands Under One Roof
  - `NY/NJ` Based, Global Reach
  - `3` Media Pillars (Production · Events · Publishing)
- CTA: "Our Story →"

### 3.5 Subsidiaries Grid — "Our Universe"
- Section title: `"Our Universe"` — Playfair Display
- Subtitle: `"Eight brands. One mission. Infinite impact."`
- **8-card grid** (4x2 desktop, 2x4 tablet, 1x8 mobile)
- Each card contains:
  - Brand icon/initial (geometric, brand-colored)
  - Brand name
  - One-liner description
  - "Visit →" link
  - Hover: card lifts with mustard border + slight scale
- Cards use cream background with navy text

| Brand | Description | Color accent |
|---|---|---|
| GrowBiz Studios | Strategic media production studio | Mustard |
| GrowBiz Talks | Live stage & speaking events platform | Navy |
| GrowBiz Magazine | Digital publication for multicultural entrepreneurs | Gold |
| Imigrou | Resources and community for immigrants | Mustard |
| Pernas Cruzadas | Lifestyle & culture brand | Navy |
| Pessoas Globais | Global professionals network | Gold |
| VaptLux | Premium lifestyle services | Mustard |
| GrowBiz Media | (holding) — link to /about | Navy |

### 3.6 Mission Pillars
- Dark navy background section
- 3 columns, each with:
  - Geometric icon (SVG, mustard)
  - Pillar name
  - Brief description
- Pillars: **Production · Events · Publishing**
- Mosaic strip at bottom of section

### 3.7 Impact Numbers
- Cream background
- Large animated counters (intersection observer trigger):
  - `500+` Entrepreneurs Served
  - `8` Brands
  - `3` Revenue Pillars
  - `1` Community, Many Cultures
- Subtle grid line texture behind

### 3.8 Magazine Feature Callout
- Split section: dark left / cream right
- Left: GrowBiz Magazine cover mockup (placeholder or real)
- Right: "Get Featured in GrowBiz Magazine" headline + brief description + CTA "Apply Now →"

### 3.9 CTA Banner
- Full-width mustard background
- Headline: `"Ready to Grow Your Brand?"`
- Sub: `"Studio time, stage presence, media visibility — all under one roof."`
- Button: `"Start Here"` (navy fill)

### 3.10 Footer
- Dark black `#1A1A1A` background
- Mosaic strip at top of footer (decorative border)
- 4-column layout:
  - Col 1: Logo + tagline + social icons (Instagram, LinkedIn, YouTube)
  - Col 2: Company links (About, Subsidiaries, Magazine, Contact)
  - Col 3: Our Brands (all 7 subsidiaries)
  - Col 4: Contact info (email, location: NJ/NY area)
- Bottom bar: `© 2025 GrowBiz Media · All Rights Reserved · growbiz.media`
- Small print: `"A Global Media of Virtues"`

---

## 4. Subsidiaries Page (`/subsidiaries`)
- Hero with mosaic frame
- Full cards for each brand (expanded from homepage grid)
- Each card: logo, description, services/offerings, "Visit Brand →" CTA

---

## 5. About Page (`/about`)
- Mission + Vision statements
- Core Values (animated reveal cards)
- Leadership (placeholder for team bios)
- Timeline: GrowBiz Media growth phases

---

## 6. Contact Page (`/contact`)
- Clean form: Name, Email, Brand/Company, Message, Interest (dropdown: Studio · Events · Magazine · Partnership · Other)
- No backend needed — use Formspree or EmailJS
- Social links sidebar

---

## 7. Design Details & Constraints

### Mosaic Pattern Usage
- **Header strip:** 80–120px tall, full-width, positioned at very top of hero section
- **Footer strip:** 80–120px tall, full-width, positioned at top of footer
- **Section dividers:** partial-width mosaic strips as visual section breaks (optional)
- The mosaic PNG should be sliced and used as `background-image` with `background-size: cover`

### Animation Guidelines
- Page load: Staggered hero text animation (100ms delays between elements)
- Cards: Fade + translate-y on scroll (Framer Motion `whileInView`)
- Counters: Count-up animation triggered by intersection observer
- Nav: Smooth backdrop-blur transition on scroll
- Hover states: Subtle scale (1.02–1.03) + shadow lift on cards

### Responsive Breakpoints
- Mobile: 375px–767px
- Tablet: 768px–1199px
- Desktop: 1200px+
- Max content width: 1280px, centered

### Performance
- All images: Next.js `<Image>` with lazy loading
- Mosaic: Compress PNG, use `object-fit: cover`
- Fonts: Load via `next/font` (Google Fonts)
- Target Lighthouse score: 90+

---

## 8. File & Folder Structure (Next.js)

```
growbiz-media/
├── app/
│   ├── layout.tsx          # Root layout (nav + footer)
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── subsidiaries/page.tsx
│   ├── contact/page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── BrandStatement.tsx
│   │   ├── AboutSnippet.tsx
│   │   ├── SubsidiariesGrid.tsx
│   │   ├── MissionPillars.tsx
│   │   ├── ImpactNumbers.tsx
│   │   ├── MagazineCallout.tsx
│   │   └── CTABanner.tsx
│   └── ui/
│       ├── BrandCard.tsx
│       ├── MosaicStrip.tsx
│       └── AnimatedCounter.tsx
├── public/
│   ├── assets/
│   │   ├── logo-dark.png
│   │   ├── logo-light.png
│   │   └── mosaic.png
│   └── favicon.ico
├── lib/
│   └── constants.ts        # Brand data, subsidiaries list
├── tailwind.config.ts      # Extended with brand colors
├── next.config.ts
└── package.json
```

---

## 9. Tailwind Config Extensions

```ts
// tailwind.config.ts
theme: {
  extend: {
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
  }
}
```

---

## 10. Dependencies

```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.400.0",
  "@next/font": "latest"
}
```

---

## 11. Deployment Notes

- Host on **Vercel** (free tier works for static)
- Domain: `growbiz.media` → point DNS to Vercel
- Each subsidiary can be a redirect or separate Vercel project
- Enable Vercel Analytics from day 1
- Use `.env.local` for Formspree endpoint key

---

## 12. Phase 2 Additions (Post-Launch)
- [ ] GrowBiz Magazine article feed (MDX or Contentful)
- [ ] Booking/intake form for studio sessions
- [ ] Event calendar integration
- [ ] Multi-language support (EN + PT-BR)
- [ ] Members area (subscription visibility)
