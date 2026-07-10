# ALTAMO — Luxury Tableware E-Commerce

## Project Overview

ALTAMO is a luxury vintage tableware e-commerce store for the Moscow market. It features antique porcelain, crystal, silverware, and rare collectible pieces with a distinctive "lover's eye" art motif (Georgian-era miniature eye portraits on objects).

**Stack:** React 19 + Vite + Tailwind CSS v4 (frontend), Express v5 (API server), pnpm monorepo

## Architecture

```
artifacts/
  altamo/          — React + Vite frontend (served at /)
  api-server/      — Express API server (served at /api)
  mockup-sandbox/  — Design mockup tool
lib/
  api-spec/        — OpenAPI spec + codegen config
  api-client-react/— Generated React Query hooks
  api-zod/         — Generated Zod schemas
  db/              — Drizzle ORM + PostgreSQL
```

## Running the App

Only the frontend workflow is started by default (the API server requires `DATABASE_URL`).

- **Frontend:** workflow `artifacts/altamo: web` — React + Vite dev server
- **API Server:** workflow `artifacts/api-server: API Server` — requires `DATABASE_URL` secret

## Key Files

- `artifacts/altamo/src/pages/home.tsx` — Home page with all imagery and animations
- `artifacts/altamo/src/data/products.json` — Mock product data (24 items)
- `artifacts/altamo/src/data/product-images.ts` — Maps product IDs → attached_assets images
- `artifacts/altamo/src/components/product-card.tsx` — Product card with image + wishlist
- `artifacts/altamo/src/index.css` — Global styles, liquid glass utilities, theme tokens
- `artifacts/altamo/src/components/layout.tsx` — Sticky header + footer

## Visual Design

- **Fonts:** Cormorant Garamond (serif headings), Forum/Montserrat (body)
- **Palette:** #F3EEE5 cream background, pure black foreground, #6B1C39 burgundy accent
- **Liquid glass effect:** `.glass`, `.glass-dark`, `.glass-card` utility classes
- **Animations:** Framer Motion — parallax hero, fade-up, slide-in, stagger reveals on scroll
- **Product images:** All 20 uploaded editorial images are integrated throughout the site

## Product Images

20 editorial images are in `attached_assets/` and aliased as `@assets/` in the Vite config. They feature luxury tableware with "lover's eye" miniatures.

## Current State

The frontend is a fully-styled prototype with mock JSON data. The API server exists but is not wired to the frontend (no `DATABASE_URL` configured yet). Cart and wishlist use `localStorage`.

## User Preferences

- Russian language UI
- Luxury/editorial aesthetic — dark backgrounds, serif fonts, generous whitespace
- Liquid glass (glassmorphism) effects on overlays and cards
- Framer Motion scroll animations throughout
