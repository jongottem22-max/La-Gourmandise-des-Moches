# TECHNICAL ARCHITECTURE — La Gourmandise des Moches

## 1. Stack (justified by requirements)
- **Next.js 16 (App Router) + TypeScript** — SSG for all marketing pages (speed + SEO), route handlers for form/events. No SPA heaviness.
- **Tailwind CSS v4** (`@theme` design tokens) — small CSS, no runtime.
- **PostgreSQL + Drizzle ORM** — contact messages & analytics events; zero ORM overhead on static pages (DB accessed only in route handlers).
- **Fonts:** `next/font/google` Fraunces (display, opsz/SOFT/WONK) + Karla (text) — self-hosted, preloaded, `display: swap`.
- **Icons:** lucide-react (tree-shaken). No other client libs.
- **Hosting:** runs unchanged on the platform runtime **and on Netlify** (recommended public host): `netlify.toml` + `@netlify/plugin-nextjs`; 18 static pages on the CDN, route handlers as serverless functions. Managed Postgres via Netlify DB/Neon — see `NETLIFY_DEPLOY.md`. `DATABASE_URL` from env; build is DB-free (lazy pool), so previews work with zero configuration.

## 2. Internationalization architecture
- Route segment `/[lang]` with `generateStaticParams` → `fr`, `en`; root `/` 307-redirects to `/fr`.
- Root layout injects `<html lang>` from params. Dictionaries: `src/lib/i18n/{fr,en}.ts` with shared TypeScript shape (compile-time key parity).
- `localizedPath(lang, path)` helper; LanguageSwitcher = plain `<Link>` preserving current pathname (SEO-indexable, a11y-friendly, announces `hreflang`).
- Per-locale metadata, canonicals, `alternates.languages`, og:locale.

## 3. Data model (Drizzle, `src/db/schema.ts`)
- `contact_messages(id serial pk, name text, email text, subject varchar, message text, lang varchar(2), created_at timestamptz default now(), handled boolean default false)`
- `analytics_events(id bigserial pk, type varchar(40), path text, lang varchar(2), meta jsonb, created_at timestamptz default now())`
Apply with `npx drizzle-kit push`.

## 4. API surface
- `POST /api/contact` — zod-free manual validation (avoid dep): required fields, email regex, max lengths, honeypot field `company` (bots fill it), per-IP in-memory rate limit (5/10 min). Inserts row; returns `{ ok: true }`. No PII beyond user-typed data; doc tells owner to query: `psql … -c "SELECT * FROM contact_messages ORDER BY created_at DESC;"`.
- `POST /api/events` — accepts `{type, path, lang, meta?}`; allow-listed types (page_view, cta_click, tel_click, mail_click, map_click, social_click, form_submit, lang_switch); drops IP/UA; `sendBeacon` client-side (non-blocking, no cookie).
- `GET /api/health` — existing platform healthcheck.

## 5. SEO/Structured data layer
`sitemap.ts`, `robots.ts`, `metadata` per page, `JsonLd` server component emitting Organization/Store/WebSite/ItemList/BreadcrumbList. `NEXT_PUBLIC_SITE_URL` env (default `https://lagourmandisedesmoches.re` — **[NEEDS VERIFICATION]** actual domain).

## 6. Media & performance
The real JPEG binaries live primarily in `src/assets/images` and are statically imported through `src/lib/assets.ts`. Next.js fingerprints and emits all ten into `.next/static/media`, guaranteeing inclusion in every Netlify artifact. Byte-identical copies exist in `public/images` (direct-URL fallback) and `design-assets/images` (archive), plus **base64 text payloads in `design-assets/base64/`**: the `prebuild` hook (`scripts/prepare-images.mjs` → sha256-vs-`scripts/image-manifest.json`) reconstructs any binary lost in transit before compilation, so builds cannot fail on `Module not found` for images. `images.unoptimized: true` removes the runtime optimizer dependency; sources are already web-sized (≤ 400 KB), with explicit `sizes` and priority only on the hero. Torn-edge dividers & fruit doodles = inline SVG (no requests). Map: facade → lazy iframe on click. No third-party trackers.

## 7. Security & privacy
Honeypot + length caps + rate limit on contact; allow-list on events; parameterized queries via Drizzle; no auth surface (contact form is the only input); security headers via Next defaults; GDPR-light: no cookies, no fingerprinting, retention = owner's call (doc'd).

## 8. Deployment & ops notes
`npm run build` → static pages prerendered (9 pages × 2 locales + sitemap/robots), API routes server-rendered on demand. **Netlify:** `netlify.toml` pins Node 22, the build command and the Next runtime plugin; static assets get long-cache headers. Origin resolution for metadata: `NEXT_PUBLIC_SITE_URL` → Netlify `URL`/`DEPLOY_PRIME_URL` → default domain. DB access is lazy (`getDb()`), so a deploy without `DATABASE_URL` still builds and serves (contact 503s gracefully, analytics no-ops). The contact rate limit is per-serverless-instance (best-effort, layered over the honeypot). Owner-facing docs: this file + CONTENT_GUIDE.md (how to edit hours/products) + NETLIFY_DEPLOY.md (hosting runbook). Future CMS path: replace `products.ts`/`business.ts` with Drizzle tables or a headless CMS without touching page code.
