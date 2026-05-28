# Project BookBridge

A Nigerian educational nonprofit website that connects underserved junior secondary students with donated books and learning resources.

## Run & Operate

- `pnpm --filter @workspace/bookbridge run dev` — run the frontend dev server
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite frontend at `artifacts/bookbridge` (port 19905, preview at `/`)
- API: Express 5 at `artifacts/api-server` (port 8080)
- Firebase Realtime Database (compat SDK via CDN in index.html)
- Google Fonts: Cormorant Garamond (headings) + Plus Jakarta Sans (body)
- Framer Motion (scroll animations), Embla Carousel React (hero slider)
- Lucide React (icons)

## Architecture

**Full proper React components** — no raw HTML injection. Every section is a React component.

```
src/
  components/
    Nav.tsx          — Sticky nav, scroll effect, Track Request modal, mobile menu
    Hero.tsx         — Split hero with embla carousel auto-rotating 6 student photos
    Stats.tsx        — 4 animated stat counters (IntersectionObserver)
    About.tsx        — Mission section with 3-photo collage
    Subjects.tsx     — 6 JSS subject cards; "Resources Coming Soon" badge on each
    Gallery.tsx      — Dark masonry grid (26 photos), lightbox with keyboard nav
    ContactSection.tsx — Tabbed Request/Donate forms saving to Firebase; WhatsApp CTA
    Footer.tsx       — Logo, links, contact info
  pages/
    Home.tsx         — Assembles all components
    Admin.tsx        — Full admin dashboard (login → sidebar + data tables)
  lib/
    firebase.ts      — CDN compat wrapper: db(), fbAuth(), generateTrackingId()
    images.ts        — All image path arrays organised by section
```

## Firebase

- Project: `bookbridge-admin`, Realtime Database
- Compat SDK loaded via CDN in `index.html` (no npm package needed)
- Collections: `requests` (book requests), `donations` (book donations)

## Images

All 39 files live in `artifacts/bookbridge/public/` (lowercase, with spaces):
- **Hero carousel** (6 images): `2.57.31 pm (3)` through `2.57.31 pm (4)`
- **About collage** (3 images): `2.57.33 pm (3)`, `2.57.34 pm (1)`, `2.57.34 pm (2)`
- **Gallery** (26 images): all remaining WhatsApp photos with captions
- Image paths are defined in `src/lib/images.ts`

## Product — What's on the Site

- **Hero**: "Connecting Dreams with Knowledge" + auto-carousel of real student photos
- **Stats**: 500+ Books, 350+ Students, 12+ Schools, 8+ Communities (animated counters)
- **About**: Mission description + 3 photos + key points
- **Subjects**: 6 JSS subject cards — all show "Resources Coming Soon"
- **Gallery**: 26-photo masonry grid with lightbox
- **Contact**: Book Request form + Donate Books form (both save to Firebase); WhatsApp chat; "How It Works" steps
- **Footer**: Links, WhatsApp, email

## Admin Dashboard (`/admin`)

- Credentials: `admin` / `admin123`
- Login persists in `sessionStorage`; signs in anonymously to Firebase on auth
- Sidebar: Overview | Book Requests | Book Donations | Resources (Coming Soon) | Settings
- Tables: approve/reject/delete requests and donations with status badges
- Detail modal to view full submission
- Resources section shows a "Coming Soon" placeholder (no mentors section)

## Netlify Deployment

- `public/_redirects` contains `/* /index.html 200` for SPA routing
- Build output: `dist/public/`
- Build command: `pnpm --filter @workspace/bookbridge run build`
- Publish directory: `artifacts/bookbridge/dist/public`

## User Preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Removed Features

- ❌ All mentorship logic/UI (mentor cards, applications, mentor requests)
- ❌ Cursor canvas trail animation (was causing lag)
- ❌ Floating orbs CSS animation
- ❌ Hero background slideshow
- ❌ Raw HTML injection approach (replaced with proper React components)
- ❌ Learning Resources browser (replaced with "Coming Soon")
