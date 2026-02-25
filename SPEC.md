# GrowBiz Media — Project Specification
**Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Active Development

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Site Architecture](#2-site-architecture)
3. [Brand Tokens — Pessoas Globais](#3-brand-tokens--pessoas-globais)
4. [Page Specifications](#4-page-specifications)
5. [Article Template Anatomy](#5-article-template-anatomy)
6. [CMS Schema — Sanity](#6-cms-schema--sanity)
7. [Internationalization](#7-internationalization)
8. [SEO Requirements](#8-seo-requirements)
9. [Landing Page — "Tenha sua Matéria"](#9-landing-page--tenha-sua-matéria)
10. [GitHub Branching Strategy](#10-github-branching-strategy)
11. [CI/CD Deployment Workflow](#11-cicd-deployment-workflow)
12. [Component Naming Conventions](#12-component-naming-conventions)
13. [Content Guidelines for Editors](#13-content-guidelines-for-editors)
14. [Performance Budgets](#14-performance-budgets)
15. [Package Dependencies](#15-package-dependencies)

---

## 1. Project Overview

**Domain:** `growbiz.media`  
**Framework:** Next.js 14 (App Router)  
**Language:** TypeScript  
**Styling:** Tailwind CSS  
**CMS:** Sanity v3  
**Hosting:** Vercel  
**Repo:** `github.com/[org]/growbiz.media`

### Phase 1 Scope

| Property | Route | Type | Language |
|---|---|---|---|
| GrowBiz Media Hub | `/` | Directory portal | EN |
| Pessoas Globais | `/pessoasglobais` | Premium magazine | PT-BR + EN |

### All Subsidiaries (full roadmap)

| Brand | Route | Phase |
|---|---|---|
| GrowBiz Studios | `/studios` | 2 |
| GrowBiz Talks | `/talks` | 2 |
| GrowBiz Magazine | `/magazine` | 2 |
| Imigrou | `/imigrou` | 3 |
| Pernas Cruzadas | `/pernascruzadas` | 3 |
| **Pessoas Globais** | `/pessoasglobais` | **1** |
| VaptLux | `/vaptlux` | 3 |

---

## 2. Site Architecture

```
growbiz.media/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout — fonts, GA4
│   │   ├── page.tsx                            # growbiz.media — Hub homepage
│   │   ├── globals.css                         # CSS variables + Tailwind base
│   │   │
│   │   ├── pessoasglobais/
│   │   │   ├── layout.tsx                      # PG layout — navbar, footer
│   │   │   ├── page.tsx                        # Magazine home
│   │   │   ├── edicoes/
│   │   │   │   ├── page.tsx                    # All editions archive
│   │   │   │   └── [edicao]/
│   │   │   │       ├── page.tsx                # Single edition page
│   │   │   │       └── [slug]/
│   │   │   │           └── page.tsx            # Article page
│   │   │   ├── categorias/
│   │   │   │   └── [categoria]/
│   │   │   │       └── page.tsx
│   │   │   ├── tenha-sua-materia/
│   │   │   │   └── page.tsx                    # Lead capture landing page
│   │   │   └── sobre/
│   │   │       └── page.tsx
│   │   │
│   │   ├── studios/page.tsx                    # Placeholder — Phase 2
│   │   ├── talks/page.tsx                      # Placeholder — Phase 2
│   │   └── magazine/page.tsx                   # Placeholder — Phase 2
│   │
│   ├── components/
│   │   ├── hub/                                # Hub-only components
│   │   │   ├── SubsidiaryGrid.tsx
│   │   │   ├── SubsidiaryCard.tsx
│   │   │   └── HubHero.tsx
│   │   ├── pg/                                 # Pessoas Globais components
│   │   │   ├── PGNavbar.tsx
│   │   │   ├── PGFooter.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleHero.tsx
│   │   │   ├── ArticleBody.tsx
│   │   │   ├── EditionBadge.tsx
│   │   │   ├── EditionGrid.tsx
│   │   │   ├── PullQuote.tsx
│   │   │   ├── MiniBio.tsx
│   │   │   ├── CategoryTag.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── NewsletterSignup.tsx
│   │   └── shared/                             # Cross-brand components
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── SectionLabel.tsx
│   │       └── WhatsAppFloat.tsx
│   │
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── image.ts                        # urlFor() helper
│   │   └── utils.ts
│   │
│   ├── sanity/
│   │   └── schemas/
│   │       ├── article.ts
│   │       ├── edicao.ts
│   │       └── pessoa.ts
│   │
│   ├── messages/
│   │   ├── pt-BR.json
│   │   └── en.json
│   │
│   └── types/
│       ├── article.ts
│       ├── edicao.ts
│       └── pessoa.ts
│
├── public/
│   ├── logos/
│   │   ├── growbiz-hub.svg
│   │   ├── pessoas-globais.svg
│   │   └── pessoas-globais-icon.svg
│   └── og/
│       └── default-og.png                      # 1200×630px fallback OG image
│
├── .github/
│   ├── workflows/
│   │   └── deploy.yml
│   └── pull_request_template.md
│
├── SPEC.md                                     # This file
├── CLAUDE.md                                   # Claude Code instructions
├── next.config.ts
├── tailwind.config.ts
├── next-sitemap.config.js
├── sanity.config.ts
└── .env.local                                  # Never commit — in .gitignore
```

---

## 3. Brand Tokens — Pessoas Globais

Colors extracted from the official Pessoas Globais logo (February 2026).

```
Logo anatomy:
  Red arc (P symbol) + "Globais" wordmark  →  #E8202A
  Navy dot (center)  + "Pessoas" wordmark  →  #1E3560
  White counter-forms / background         →  #FFFFFF
```

### CSS Variables (`src/app/globals.css`)

```css
:root {
  /* ── Pessoas Globais Brand ── */
  --pg-red:           #E8202A;   /* Primary — icon, "Globais", CTAs, pull quotes */
  --pg-red-dark:      #C41820;   /* Hover, pressed state */
  --pg-red-light:     #FF4D55;   /* Active links, highlights */

  --pg-navy:          #1E3560;   /* Secondary — "Pessoas", navbar bg, article headers */
  --pg-navy-dark:     #152545;   /* Hover, pressed state */
  --pg-navy-light:    #2D4F8A;   /* Inline links, secondary accents */

  /* ── Neutrals ── */
  --pg-ink:           #0F0F0F;   /* Body text */
  --pg-paper:         #FAFAFA;   /* Page background */
  --pg-surface:       #FFFFFF;   /* Card, panel background */
  --pg-muted:         #6B6B6B;   /* Captions, metadata, secondary text */
  --pg-border:        #E5E5E5;   /* Dividers, card borders */
  --pg-tag-bg:        #F2F2F2;   /* Category tag backgrounds */

  /* ── GrowBiz Hub (official brand palette) ── */
  --hub-gold:         #D6A846;   /* Virtude Mostarda   — primary, CTAs, logo fill */
  --hub-gold-dark:    #B8902E;   /* Hover/pressed */
  --hub-navy:         #1F365D;   /* Conexão Global     — navbar, headers, text */
  --hub-navy-dark:    #152440;   /* Hover/pressed */
  --hub-bronze:       #A67A55;   /* Sustento Elegante  — secondary accents */
  --hub-paper:        #F7F4EF;   /* Papel de Ideias    — page background */
  --hub-ink:          #1A1A1A;   /* Raiz Sofisticada   — body text */
  --hub-grey:         #CFCCBF;   /* Equilíbrio Editorial — borders, subtle bg */
  --hub-surface:      #FFFFFF;   /* Card backgrounds */
}
```

### Tailwind Extension (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pg: {
          red:           '#E8202A',
          'red-dark':    '#C41820',
          'red-light':   '#FF4D55',
          navy:          '#1E3560',
          'navy-dark':   '#152545',
          'navy-light':  '#2D4F8A',
          ink:           '#0F0F0F',
          paper:         '#FAFAFA',
          surface:       '#FFFFFF',
          muted:         '#6B6B6B',
          border:        '#E5E5E5',
          tag:           '#F2F2F2',
        },
        hub: {
          gold:         '#D6A846',   // Virtude Mostarda
          'gold-dark':  '#B8902E',
          navy:         '#1F365D',   // Conexão Global
          'navy-dark':  '#152440',
          bronze:       '#A67A55',   // Sustento Elegante
          paper:        '#F7F4EF',   // Papel de Ideias
          ink:          '#1A1A1A',   // Raiz Sofisticada
          grey:         '#CFCCBF',   // Equilíbrio Editorial
          surface:      '#FFFFFF',
        }
      },
      fontFamily: {
        'pg-display': ['var(--font-fraunces)', 'Georgia', 'serif'],
        'pg-body':    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        'pg-mono':    ['var(--font-dm-mono)', 'monospace'],
      }
    },
  },
  plugins: [],
}
export default config
```

### Typography Scale

| Role | Size (desktop) | Weight | Font | Usage |
|---|---|---|---|---|
| Headline | 48–72px | 900 | Fraunces | Hero titles, edition covers |
| Title | 32–42px | 700 | Fraunces | Article titles |
| Subtitle | 22–28px | 600 | Fraunces | Section headings |
| Deck | 18–20px | 400 | DM Sans | Linha fina |
| Body | 16–17px | 400 | DM Sans | Article body (max-width: 680px) |
| Caption | 12–13px | 400 | DM Sans | Bylines, image captions |
| Label | 10–11px | 600 | DM Mono | Category tags, badges (uppercase + tracking) |

### Hub Homepage Visual Direction

The hub homepage uses the geometric mosaic version of the GrowBiz logo (`LOGO_GROW_8CM.png`) as the centrepiece of the hero section, displayed on the `--hub-paper` (`#F7F4EF`) background. This communicates the multicultural media ecosystem concept immediately and distinctively.

```
Hero layout:
  Background:   #F7F4EF (Papel de Ideias)
  Centre:       GrowBiz geometric logo — large, prominent
  Below logo:   Tagline "A Global Media of Virtues" in hub-navy
  Below tag:    Subtle CTA "Explore o ecossistema ↓"
  Tone:         Editorial luxury — NOT a SaaS landing page
```

Logo file usage by context:

| Context | File | Background |
|---|---|---|
| Hub hero (light bg) | `LOGO_GROW_8CM.png` (geometric mosaic) | `#F7F4EF` |
| Dark hero / navbar | `LOGO_GROW.jpg` (gold+navy on black) | `#1A1A1A` |
| Circular avatar / social | `rotulo.png` (circular badge) | Any dark |
| Favicon / small mark | Export icon only from `LOGO_GROW_8CM.png` | — |

---

## 4. Page Specifications

### 4.1 Hub Homepage (`/`)

| Section | Content | Priority |
|---|---|---|
| Hero — Logo Centrepiece | Geometric mosaic logo centred on `#F7F4EF` bg. Tagline "A Global Media of Virtues" in `hub-navy`. Subtle scroll CTA below. | Required |
| Subsidiary Grid | 4-col → 2-col → 1-col. Card: logo, name, 1-line desc, language badges, link. Each card accented with its own brand color. | Required |
| About GrowBiz | Mission, vision, social impact | Required |
| Content Highlights | Latest 3 PG articles + next Talks event | Required |
| Newsletter | Single email field — Brevo embed | Required |
| Footer | Subsidiary links, social, copyright, privacy policy. Dark bg `#1A1A1A`. | Required |

### 4.2 Pessoas Globais Home (`/pessoasglobais`)

| Section | Notes | Priority |
|---|---|---|
| Navbar | Logo, nav links, PT\|EN switcher. Sticky on scroll. | Required |
| Hero — Featured Article | Full-width bg image, edition badge, title, deck, author. Pulls from `featured: true` in Sanity. | Required |
| Edition Strip | Horizontal scroll of edition cards. Active = `bg-pg-red`. | Required |
| Article Grid | 3-col desktop / 2-col tablet / 1-col mobile. 9 per page. | Required |
| Category Row | Filter links: Liderança / Negócios / Cultura / Diáspora / Tecnologia | Required |
| Newsletter | "Receba cada nova edição no seu email" — Brevo embed | Required |
| CTA Banner | "Quer contar sua história?" → `/tenha-sua-materia`. Full-width, `bg-pg-navy`. | Required |

### 4.3 Edition Page (`/pessoasglobais/edicoes/[edicao]`)

| Section | Content |
|---|---|
| Edition Header | Number, theme, date, editor's note (2–3 sentences) |
| Cover Story | Featured article — full-width card |
| Articles Grid | All articles in this edition |
| Edition Navigation | ← Previous Edition / Next Edition → |
| Archive | All editions compact list |

### 4.4 Article Page — see [Section 5](#5-article-template-anatomy)

### 4.5 Category Page (`/pessoasglobais/categorias/[categoria]`)

| Section | Content |
|---|---|
| Category Header | Name, short description, article count |
| Article Grid | Filtered, same layout as homepage |
| Related Categories | Links to other 4 categories |

---

## 5. Article Template Anatomy

```
┌──────────────────────────────────────────────────────┐
│  NAVBAR  (sticky, bg-pg-navy)                        │
├──────────────────────────────────────────────────────┤
│  ARTICLE HEADER  (bg-pg-navy, white text)            │
│  ├─ Edition Badge  "Edição #1 · Liderança"           │
│  │  └─ bg-pg-red, uppercase, DM Mono                 │
│  ├─ Category Tag                                     │
│  ├─ Título  (Fraunces 900, large)                    │
│  ├─ Linha Fina  (DM Sans 400, muted)                 │
│  └─ Byline row:                                      │
│     ├─ Author avatar (32px circle)                   │
│     ├─ "Por [Author] · [Date] · [X min de leitura]"  │
│     └─ Share: WhatsApp · LinkedIn · X · Copy link    │
├──────────────────────────────────────────────────────┤
│  COVER IMAGE  (full-width, next/image + caption)     │
├──────────────────────────────────────────────────────┤
│  HIGHLIGHTS BOX  (bg-pg-tag, left border pg-red)    │
│  Label: "Destaques desta matéria"                    │
│  • Destaque 1                                        │
│  • Destaque 2                                        │
│  • Destaque 3                                        │
├─────────────────────────┬────────────────────────────┤
│  BODY COLUMN 1          │  BODY COLUMN 2             │
│  DM Sans 400, 16-17px   │  max-width 680px total     │
│  line-height 1.75       │                            │
├─────────────────────────┴────────────────────────────┤
│  PULL QUOTE  (full width)                            │
│  ├─ 3px solid pg-red left border                    │
│  ├─ Fraunces italic, 22–26px, text-pg-ink           │
│  └─ "— First Last, Title"  (DM Sans, muted)         │
├─────────────────────────┬────────────────────────────┤
│  BODY CONTINUES         │  BODY CONTINUES            │
├─────────────────────────┴────────────────────────────┤
│  MINI BIO  (bg-pg-tag, rounded)                     │
│  ├─ Circular photo 64px                             │
│  ├─ Name (bold) · Title · Company                   │
│  ├─ Bio text (2 lines max)                          │
│  ├─ LinkedIn / Instagram icon links                 │
│  └─ Edition Seal: "Edição #X" badge → edition page  │
├──────────────────────────────────────────────────────┤
│  CTA BANNER  (bg-pg-navy)                           │
│  "Quer contar sua história?" → /tenha-sua-materia    │
├──────────────────────────────────────────────────────┤
│  RELATED ARTICLES  (3 cards, same edition/category) │
├──────────────────────────────────────────────────────┤
│  FOOTER                                              │
└──────────────────────────────────────────────────────┘
```

**Responsive:**
- Two-column body → single column at `md` breakpoint
- Pull quote spans full width on all screen sizes
- Navbar collapses to hamburger at `md`

---

## 6. CMS Schema — Sanity

### Installation

```bash
npm create sanity@latest -- --project-id YOUR_ID --dataset production
npm install next-sanity @sanity/image-url @portabletext/react
```

`.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

### Schema: Article

```typescript
// src/sanity/schemas/article.ts
export const article = {
  name: 'article',
  title: 'Matéria',
  type: 'document',
  fields: [
    { name: 'titulo',          title: 'Título',                   type: 'string',    validation: (R: any) => R.required().max(100) },
    { name: 'linhaFina',       title: 'Linha Fina (Deck)',        type: 'string',    validation: (R: any) => R.required().max(200) },
    { name: 'slug',            title: 'Slug',                     type: 'slug',      options: { source: 'titulo' }, validation: (R: any) => R.required() },
    { name: 'edicao',          title: 'Edição',                   type: 'reference', to: [{ type: 'edicao' }], validation: (R: any) => R.required() },
    { name: 'categoria',       title: 'Categoria',                type: 'string',    options: { list: ['Liderança','Negócios','Cultura','Diáspora','Tecnologia'] }, validation: (R: any) => R.required() },
    { name: 'imagemCapa',      title: 'Imagem de Capa',           type: 'image',     options: { hotspot: true }, validation: (R: any) => R.required() },
    { name: 'legendaImagem',   title: 'Legenda da Imagem',        type: 'string' },
    { name: 'destaques',       title: 'Destaques (máx. 3)',       type: 'array',     of: [{ type: 'string' }], validation: (R: any) => R.max(3) },
    { name: 'corpo',           title: 'Corpo da Matéria',         type: 'array',     of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
    { name: 'citacaoDestaque', title: 'Citação em Destaque',      type: 'object',
      fields: [
        { name: 'texto', title: 'Citação',    type: 'text' },
        { name: 'autor', title: 'Atribuição', type: 'string', description: 'Ex: — Maria Silva, CEO da Empresa' }
      ]
    },
    { name: 'entrevistado',    title: 'Entrevistado / Protagonista', type: 'reference', to: [{ type: 'pessoa' }] },
    { name: 'autor',           title: 'Autor da Matéria',         type: 'string',    initialValue: 'Equipe Pessoas Globais' },
    { name: 'dataPublicacao',  title: 'Data de Publicação',       type: 'date',      validation: (R: any) => R.required() },
    { name: 'tempoLeitura',    title: 'Tempo de Leitura (min)',   type: 'number' },
    { name: 'featured',        title: 'Matéria em Destaque?',     type: 'boolean',   initialValue: false },
    { name: 'idioma',          title: 'Idioma',                   type: 'string',    options: { list: ['pt-BR','en'] }, initialValue: 'pt-BR' },
    { name: 'traducao',        title: 'Versão em Inglês',         type: 'reference', to: [{ type: 'article' }] },
    { name: 'seoTitle',        title: 'SEO Title (opcional)',     type: 'string' },
    { name: 'seoDescription',  title: 'SEO Description (opcional)', type: 'text' },
  ],
  preview: { select: { title: 'titulo', subtitle: 'edicao.tema', media: 'imagemCapa' } }
}
```

### Schema: Edition

```typescript
// src/sanity/schemas/edicao.ts
export const edicao = {
  name: 'edicao',
  title: 'Edição',
  type: 'document',
  fields: [
    { name: 'numero',         title: 'Número da Edição',    type: 'number',  validation: (R: any) => R.required() },
    { name: 'tema',           title: 'Tema Central',        type: 'string',  validation: (R: any) => R.required() },
    { name: 'slug',           title: 'Slug',                type: 'slug',    options: { source: (doc: any) => `edicao-${doc.numero}` } },
    { name: 'dataPublicacao', title: 'Data de Publicação',  type: 'date' },
    { name: 'imagemCapa',     title: 'Imagem de Capa',      type: 'image',   options: { hotspot: true } },
    { name: 'editorial',      title: 'Editorial do Editor', type: 'text',    description: '2–4 frases de apresentação da edição' },
    { name: 'publicada',      title: 'Publicada?',          type: 'boolean', initialValue: false },
  ],
  orderings: [{ title: 'Número (desc)', name: 'numeroDesc', by: [{ field: 'numero', direction: 'desc' }] }]
}
```

### Schema: Person

```typescript
// src/sanity/schemas/pessoa.ts
export const pessoa = {
  name: 'pessoa',
  title: 'Pessoa / Entrevistado',
  type: 'document',
  fields: [
    { name: 'nome',      title: 'Nome Completo',       type: 'string', validation: (R: any) => R.required() },
    { name: 'titulo',    title: 'Cargo / Título',      type: 'string' },
    { name: 'empresa',   title: 'Empresa / Org',       type: 'string' },
    { name: 'bio',       title: 'Mini Bio (2 linhas)', type: 'text',   validation: (R: any) => R.max(300) },
    { name: 'foto',      title: 'Foto',                type: 'image',  options: { hotspot: true } },
    { name: 'linkedin',  title: 'LinkedIn URL',        type: 'url' },
    { name: 'instagram', title: 'Instagram URL',       type: 'url' },
    { name: 'pais',      title: 'País',                type: 'string' },
  ]
}
```

---

## 7. Internationalization

**Library:** `next-intl`  
**Default:** `pt-BR` — no URL prefix  
**English:** `/en/` path prefix

```bash
npm install next-intl
```

**`src/messages/pt-BR.json` (key namespaces):**
```json
{
  "pg": {
    "nav": { "editions": "Edições", "categories": "Categorias", "about": "Sobre", "cta": "Tenha sua Matéria" },
    "article": { "readTime": "{min} min de leitura", "publishedOn": "Publicado em {date}", "highlights": "Destaques desta matéria", "share": "Compartilhar" },
    "newsletter": { "title": "Receba cada nova edição", "placeholder": "seu@email.com", "cta": "Assinar" },
    "landing": { "headline": "Sua história merece ser contada ao mundo", "sub": "Seja a próxima voz da Pessoas Globais", "button": "Tenha sua Matéria" }
  }
}
```

**Rules:**
- PT-BR is the default locale — never use `/pt/` prefix
- Always add `hreflang` alternate links on bilingual article pages
- Dates in PT-BR: `dd 'de' MMMM 'de' yyyy` — use `date-fns/locale/ptBR`
- Dates in EN: `MMMM dd, yyyy`

---

## 8. SEO Requirements

### Dynamic Metadata Per Article

```typescript
// src/app/pessoasglobais/edicoes/[edicao]/[slug]/page.tsx
export async function generateMetadata({ params }: Props) {
  const article = await getArticle(params.slug)
  return {
    title: `${article.titulo} | Pessoas Globais`,
    description: article.seoDescription || article.linhaFina,
    openGraph: {
      title: article.titulo,
      description: article.linhaFina,
      images: [{ url: urlFor(article.imagemCapa).width(1200).height(630).url(), width: 1200, height: 630 }],
      type: 'article',
      publishedTime: article.dataPublicacao,
      locale: 'pt_BR',
      siteName: 'Pessoas Globais',
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      canonical: `https://growbiz.media/pessoasglobais/edicoes/${params.edicao}/${params.slug}`,
      languages: article.traducao
        ? { en: `https://growbiz.media/en/pessoasglobais/edicoes/${params.edicao}/${article.traducao.slug.current}` }
        : undefined
    }
  }
}
```

### JSON-LD Structured Data

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.titulo,
  description: article.linhaFina,
  image: urlFor(article.imagemCapa).url(),
  datePublished: article.dataPublicacao,
  author: { '@type': 'Person', name: article.entrevistado?.nome },
  publisher: {
    '@type': 'Organization',
    name: 'Pessoas Globais',
    logo: { '@type': 'ImageObject', url: 'https://growbiz.media/logos/pessoas-globais.svg' }
  },
  inLanguage: 'pt-BR',
}
// Render: <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
```

### Sitemap

```bash
npm install next-sitemap
```

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://growbiz.media',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  exclude: ['/studios', '/talks', '/magazine'],
}
```

### Pre-launch Checklist

- [ ] Every page: unique `<title>` (50–60 chars)
- [ ] Every page: `<meta description>` (130–155 chars)
- [ ] OG images at 1200×630px for all articles
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] `robots.txt` allows all crawlers
- [ ] GA4 via `@next/third-parties/google`
- [ ] All images via `next/image` with `alt` text
- [ ] Core Web Vitals pass: LCP < 2.5s, CLS < 0.1, INP < 200ms

---

## 9. Landing Page — "Tenha sua Matéria"

**Route:** `/pessoasglobais/tenha-sua-materia`  
**Goal:** Capture leads from entrepreneurs wanting editorial coverage.

| # | Section | Priority |
|---|---|---|
| 1 | Hero — "Sua história merece ser contada ao mundo" + CTA scroll-to-form | Critical |
| 2 | What's included — article, photos, SEO, GrowBiz network distribution | Critical |
| 3 | Published examples — 2–3 real article cards (social proof) | Critical |
| 4 | Testimonials — 2–3 quotes from published people | Recommended |
| 5 | Lead form — Nome / Email / WhatsApp / Empresa / Cargo / Área / História / Como nos conheceu | Critical |
| 6 | FAQ accordion — process, timeline, language, revisions | Recommended |
| 7 | WhatsApp floating button (fixed, bottom-right) | Critical |

### Form (Formspree — free tier)

```typescript
// src/components/pg/LeadForm.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  setStatus(res.ok ? 'success' : 'error')
}
```

### WhatsApp Float

```typescript
// src/components/shared/WhatsAppFloat.tsx
const message = encodeURIComponent('Olá! Tenho interesse em ter minha matéria na Pessoas Globais.')
const href = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`
// Fixed bottom-right, z-50, always visible
```

---

## 10. GitHub Branching Strategy

```
main         ────────────────────────────►  Production (auto-deploy to Vercel)
  │
  └── staging ──────────────────────────►  Preview URL (test before merging)
        │
        ├── feature/hub-homepage
        ├── feature/pg-magazine-home
        ├── feature/pg-article-template
        ├── feature/pg-tenha-sua-materia
        ├── feature/sanity-setup
        ├── feature/i18n-setup
        ├── fix/navbar-mobile-overflow
        └── content/edicao-1
```

### Branch Rules

| Branch | Push | Merge Via | Who |
|---|---|---|---|
| `main` | Protected — no direct push | PR from `staging` only | Lead only |
| `staging` | PR required | PR from `feature/*` | Any dev |
| `feature/*` | Open | PR → `staging` | Developer |
| `fix/*` | Open | PR → `staging` or `main` (hotfix) | Developer |
| `content/*` | Open | PR → `staging` | Editor or dev |

### Commit Message Convention

```
feat:    add article template component
fix:     correct navbar z-index on mobile
content: add edicao-1 article slug
style:   update pg-red token to #E8202A
chore:   install next-intl
docs:    update SPEC.md branching section
```

### PR Template (`.github/pull_request_template.md`)

```markdown
## What does this PR do?

## Spec section reference

## Screenshots (if UI change)

## Checklist
- [ ] Tested on mobile (375px)
- [ ] No TypeScript errors (`npm run build`)
- [ ] Accessibility: images have alt text
```

---

## 11. CI/CD Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: CI

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

### Vercel Configuration

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Root directory | `./` |
| Build command | `npm run build` |
| Node.js version | 20.x |

**Environments:**

| Env | Branch | URL |
|---|---|---|
| Production | `main` | `https://growbiz.media` |
| Staging | `staging` | Vercel auto-preview URL |
| Feature | `feature/*` | Vercel per-PR preview URL |

**Environment variables to set in Vercel dashboard:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_FORMSPREE_ID
```

---

## 12. Component Naming Conventions

### Files

```
PascalCase   →  React components:    ArticleCard.tsx, PGNavbar.tsx
camelCase    →  Utilities/hooks:     useArticle.ts, formatDate.ts
kebab-case   →  Routes (Next.js):    tenha-sua-materia/page.tsx
UPPER_SNAKE  →  Constants:           PG_CATEGORIES, DEFAULT_OG_IMAGE
```

### Standard Component Template

```typescript
// src/components/pg/ArticleCard.tsx

import type { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

// Named export — never default export for components
export function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  return (
    // Use pg-* Tailwind tokens — never hardcode hex values in JSX
    <div className={`bg-pg-surface border border-pg-border rounded-lg ${className}`}>
      {/* ... */}
    </div>
  )
}
```

### Folder Scopes

| Folder | Scope |
|---|---|
| `components/hub/` | Hub homepage only |
| `components/pg/` | Pessoas Globais only |
| `components/shared/` | Reusable across all brands |

### CSS Rules

- Always use `pg-*` / `hub-*` Tailwind tokens — never hardcode hex in JSX
- Mobile-first: base = mobile, `md:` = tablet (768px), `lg:` = desktop (1024px)
- Extract repeated class strings to `@apply` in `globals.css` only if used 3+ times

---

## 13. Content Guidelines for Editors

> For the editorial team publishing in Sanity CMS — share this section with non-technical editors.

### Título (Article Title)
- Max **100 characters**
- Must contain a strong verb or named subject
- ✅ `"A empresária que construiu um império sem pedir permissão"`
- ❌ `"Você não vai acreditar nessa história de sucesso"` (clickbait)

### Linha Fina (Deck / Subtitle)
- Max **200 characters**
- Adds context — never repeats the title
- Should mention the person's origin, field, or key achievement

### Destaques (Highlights)
- Exactly **3 bullet points**, each under 80 characters
- Summarize the 3 most actionable or surprising takeaways

### Corpo (Body Text)
- Between **600–2000 words**
- Use H2 and H3 only — never H1 inside body
- Insert max **2 inline images** per article
- Include exactly **1 pull quote** per article

### Citação em Destaque (Pull Quote)
- Single most powerful direct quote from the subject
- Max **180 characters**
- Attribution format: `— First Last, Title at Company`

### Imagens
- Cover image minimum: **1200×800px**
- Professional photos only — no generic stock photography
- Always fill in `legendaImagem` (caption field)
- Upload to Sanity directly — never use external image URLs

### Mini Bio
- Max **300 characters**, written in third person
- Format: `"[Name] é [title] da [company]. [One achievement sentence]. [Country]."`

### Pre-publish Checklist
- [ ] Slug auto-generated from title (check for special chars)
- [ ] Edição field assigned
- [ ] Tempo de Leitura estimated (word count ÷ 200 = minutes)
- [ ] Cover image uploaded with caption
- [ ] Exactly 3 destaques filled
- [ ] Pull quote text and attribution filled
- [ ] Entrevistado linked (or created if new person)
- [ ] Mini bio under 300 chars
- [ ] `featured` toggle: only ONE article per edition should be true
- [ ] `publicada` toggle set to `true` only when fully reviewed

---

## 14. Performance Budgets

| Metric | Target | Measured By |
|---|---|---|
| LCP | < 2.5s | Vercel Analytics |
| CLS | < 0.1 | Vercel Analytics |
| INP | < 200ms | Vercel Analytics |
| First load JS | < 150kb | `npm run build` output |
| Image size | < 200kb each (WebP) | next/image auto-optimization |
| Lighthouse | > 90 all categories | Chrome DevTools |

**Enforcement rules:**
- All images via `next/image` — never raw `<img>` tags
- Fonts loaded via `next/font` — never Google Fonts `<link>` in HTML head
- No render-blocking third-party scripts — load analytics async
- Sanity images served with explicit width/quality: `urlFor(img).width(800).quality(80).url()`

---

## 15. Package Dependencies

### Installation Order

```bash
# CMS
npm install next-sanity @sanity/image-url @portabletext/react

# Internationalization
npm install next-intl

# SEO
npm install next-sitemap

# Social sharing buttons
npm install react-share

# Analytics (Next.js native)
npm install @next/third-parties

# Date formatting (PT-BR locale support)
npm install date-fns
```

### `.env.local` Template

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Analytics
NEXT_PUBLIC_GA_ID=

# Contact / Forms
NEXT_PUBLIC_WHATSAPP_NUMBER=        # Format: 15551234567 (no +, no spaces)
NEXT_PUBLIC_FORMSPREE_ID=
```

> ⚠️ `.env.local` is already in `.gitignore` from `create-next-app`. Never commit it.

---

*Maintained by the GrowBiz Media dev team. Update this file whenever architecture or design decisions change. Last update: February 2026.*
