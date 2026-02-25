# CLAUDE.md — GrowBiz Media Portal

> This file is read by Claude Code at the start of every session.
> It contains the full technical context, conventions, and rules for this project.
> Keep it updated whenever architecture decisions change.

---

## Project Identity

**Name:** GrowBiz Media Portal  
**Domain:** `growbiz.media`  
**Repo:** `github.com/[org]/growbiz.media`  
**Phase 1 scope:** Hub homepage + Pessoas Globais magazine  
**Full spec:** See `SPEC.md`

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 14 |
| Language | TypeScript | 5+ |
| Styling | Tailwind CSS | 3 |
| CMS | Sanity v3 | latest |
| Hosting | Vercel | — |
| i18n | next-intl | latest |
| Analytics | GA4 via @next/third-parties | — |
| Forms | Formspree (no backend) | — |
| Email | Brevo | — |

---

## Brand Colors — EXACT VALUES

### Pessoas Globais (from official logo)

```
--pg-red:        #E8202A   ← Primary. Icon arc, "Globais", CTAs, pull quote borders
--pg-red-dark:   #C41820   ← Hover/pressed
--pg-red-light:  #FF4D55   ← Active links

--pg-navy:       #1E3560   ← Secondary. "Pessoas", navbar bg, article headers
--pg-navy-dark:  #152545   ← Hover/pressed
--pg-navy-light: #2D4F8A   ← Inline links

--pg-ink:        #0F0F0F   ← Body text
--pg-paper:      #FAFAFA   ← Page background
--pg-surface:    #FFFFFF   ← Cards, panels
--pg-muted:      #6B6B6B   ← Captions, metadata
--pg-border:     #E5E5E5   ← Dividers
--pg-tag:        #F2F2F2   ← Tag backgrounds
```

### GrowBiz Hub (official brand palette — "A Global Media of Virtues")

```
--hub-gold:      #D6A846   ← Virtude Mostarda   — primary, CTAs, logo fill, gold ring
--hub-gold-dark: #B8902E   ← Hover/pressed
--hub-navy:      #1F365D   ← Conexão Global     — navbar, headers, body text
--hub-navy-dark: #152440   ← Hover/pressed
--hub-bronze:    #A67A55   ← Sustento Elegante  — secondary accents, dividers
--hub-paper:     #F7F4EF   ← Papel de Ideias    — page background (warm white)
--hub-ink:       #1A1A1A   ← Raiz Sofisticada   — body text, dark sections bg
--hub-grey:      #CFCCBF   ← Equilíbrio Editorial — borders, subtle backgrounds
--hub-surface:   #FFFFFF   ← Card backgrounds
```

### Hub Logo Files

| File | Use |
|---|---|
| `LOGO_GROW_8CM.png` | Hub hero centrepiece (geometric mosaic on light bg) |
| `LOGO_GROW.jpg` | Dark backgrounds, navbar dark variant |
| `rotulo.png` | Circular badge — social media, avatars |

**Hub hero concept:** Geometric mosaic logo centred on `#F7F4EF` background. Tagline "A Global Media of Virtues" in `hub-navy` below. This is the visual identity anchor of the homepage — do not replace with a text headline.

**Rule:** Always use Tailwind tokens (`bg-hub-gold`, `text-hub-navy`, `bg-pg-red`) — never hardcode hex values in JSX.

---

## Fonts

```typescript
// src/app/layout.tsx
import { Fraunces, DM_Sans, DM_Mono } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const dmSans   = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmMono   = DM_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-dm-mono' })
```

- **Fraunces** — display/headings (editorial serif with character)
- **DM Sans** — body/UI (clean, highly legible)
- **DM Mono** — labels, badges, code

---

## File & Folder Conventions

```
PascalCase  → React components:   ArticleCard.tsx, PGNavbar.tsx
camelCase   → Utilities/hooks:    useArticle.ts, formatDate.ts
kebab-case  → Next.js routes:     tenha-sua-materia/page.tsx
UPPER_SNAKE → Constants:          PG_CATEGORIES, DEFAULT_OG_IMAGE
```

### Component Folders

```
src/components/hub/      ← Hub homepage components only
src/components/pg/       ← Pessoas Globais components only
src/components/shared/   ← Reusable across all brands
```

### Named Exports Only

```typescript
// ✅ Correct
export function ArticleCard({ article }: ArticleCardProps) { ... }

// ❌ Wrong — default exports make refactoring harder
export default function ArticleCard() { ... }
```

---

## Key Component Reference

| Component | Location | Purpose |
|---|---|---|
| `SubsidiaryGrid` | `components/hub/` | 8-brand grid on hub homepage |
| `SubsidiaryCard` | `components/hub/` | Individual brand card |
| `PGNavbar` | `components/pg/` | Sticky navbar with PT\|EN switcher |
| `PGFooter` | `components/pg/` | Magazine footer |
| `ArticleCard` | `components/pg/` | Article thumbnail card (grid/feed) |
| `ArticleHero` | `components/pg/` | Full-width featured article block |
| `ArticleBody` | `components/pg/` | 2-col body renderer (Portable Text) |
| `EditionBadge` | `components/pg/` | "Edição #1 · Liderança" badge |
| `PullQuote` | `components/pg/` | Pull quote with pg-red left border |
| `MiniBio` | `components/pg/` | Subject mini bio with edition seal |
| `ShareButtons` | `components/pg/` | WhatsApp, LinkedIn, X, copy link |
| `WhatsAppFloat` | `components/shared/` | Fixed bottom-right WhatsApp button |
| `Button` | `components/shared/` | Shared button with variants |

---

## Sanity CMS

### Client Setup (`src/lib/sanity/client.ts`)

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

### Image Helper (`src/lib/sanity/image.ts`)

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Usage: urlFor(article.imagemCapa).width(1200).height(630).quality(80).url()
```

### Data Schemas (3 types)

- `article` — Matéria editorial (see SPEC.md §6)
- `edicao` — Edition (numbered, themed)
- `pessoa` — Person/interviewee (mini bio, photo, links)

### GROQ Query Patterns

```typescript
// All published articles for a given edition
const query = `*[_type == "article" && edicao->slug.current == $edicao && idioma == "pt-BR"] | order(dataPublicacao desc) {
  titulo, linhaFina, slug, categoria, imagemCapa, dataPublicacao, tempoLeitura,
  "edicaoNumero": edicao->numero,
  "entrevistadoNome": entrevistado->nome
}`

// Single article by slug
const query = `*[_type == "article" && slug.current == $slug][0] {
  ...,
  edicao->, entrevistado->
}`
```

---

## Routing Structure

```
/                                               → Hub homepage
/pessoasglobais                                 → Magazine home
/pessoasglobais/edicoes                         → All editions
/pessoasglobais/edicoes/[edicao]               → Single edition
/pessoasglobais/edicoes/[edicao]/[slug]        → Article
/pessoasglobais/categorias/[categoria]          → Category filter
/pessoasglobais/tenha-sua-materia              → Lead capture landing
/pessoasglobais/sobre                           → About
/studios                                        → Placeholder (Phase 2)
/talks                                          → Placeholder (Phase 2)
/magazine                                       → Placeholder (Phase 2)
```

---

## Responsiveness Rules

- **Mobile-first always:** base classes = mobile, `md:` = 768px, `lg:` = 1024px
- Article grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Article body columns: `grid-cols-1 md:grid-cols-2` (max-width 680px total)
- Navbar: hamburger on mobile (`md:hidden`), full links on desktop
- Pull quote: always full-width (`col-span-full`)

---

## SEO Rules (enforce on every page)

```typescript
// Every page.tsx must export generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: '...',           // 50–60 chars
    description: '...',     // 130–155 chars
    openGraph: { ... },     // images: 1200×630px
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: 'https://growbiz.media/...' }
  }
}
```

- All images: `next/image` with explicit `alt`, `width`, `height`
- Fonts: `next/font` only — never `<link>` Google Fonts in `<head>`
- Article pages: add JSON-LD `Article` schema (see SPEC.md §8)
- Sitemap: auto-generated by `next-sitemap` on build

---

## Environment Variables

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=    # Safe to expose
NEXT_PUBLIC_SANITY_DATASET=       # Safe to expose
SANITY_API_TOKEN=                 # Server-only — never use in client components
NEXT_PUBLIC_GA_ID=                # Safe to expose
NEXT_PUBLIC_WHATSAPP_NUMBER=      # Format: 15551234567 (no + or spaces)
NEXT_PUBLIC_FORMSPREE_ID=         # Safe to expose
```

---

## Performance Rules

- Images: always `next/image`. Sanity images: `urlFor(img).width(N).quality(80).url()`
- No `<img>` tags anywhere in the codebase
- No render-blocking scripts — analytics loads async
- Target: LCP < 2.5s, CLS < 0.1, first load JS < 150kb

---

## Git Workflow

```
main     ← production, protected, no direct push
staging  ← pre-production preview
feature/ ← all new work, branched from staging
fix/     ← bug fixes
content/ ← content/copy-only changes
```

**Commit format:**
```
feat: short description
fix: short description
content: short description
style: short description
chore: short description
```

---

## Do Not

- ❌ Use default exports for components
- ❌ Hardcode hex color values in JSX — always use Tailwind `pg-*` / `hub-*` tokens
- ❌ Use `<img>` tags — always `next/image`
- ❌ Load Google Fonts via `<link>` — always `next/font`
- ❌ Use `any` type in TypeScript unless absolutely necessary and commented
- ❌ Commit `.env.local` or any file with secrets
- ❌ Push directly to `main`
- ❌ Use client components (`'use client'`) for data fetching — keep data fetching in server components
- ❌ Use inline styles — always Tailwind classes

---

## Quick Reference: Starting a New Feature

```bash
# 1. Make sure staging is up to date
git checkout staging && git pull origin staging

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Build and test
npm run dev

# 4. Before committing — check types and lint
npm run build
npm run lint

# 5. Push and open PR to staging
git push origin feature/your-feature-name
```

---

*Keep this file updated. It is the single source of truth for Claude Code sessions on this project.*
