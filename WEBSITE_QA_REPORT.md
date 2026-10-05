# WEBSITE QA REPORT — La Gourmandise des Moches
*Executed against the production build in the project sandbox.*

## 1. Build & type safety ✅
- `npx next typegen` → ✓ Types generated successfully
- `tsc --noEmit` → 0 errors (dictionaries enforce FR/EN key parity at compile time)
- `npm run build` → success; 22 pages prerendered (11 routes × fr/en, incl. mentions-legales & confidentialite) + sitemap/robots/icon static; 3 API routes dynamic
- Platform `build_and_start` → pass; `/api/health` ok; Postgres schema pushed via `drizzle-kit push`
- Images verified: plain static `src="/images/…"` URLs (no runtime optimizer), all files 200 `image/jpeg`

## 2. Functional ✅ (curl-verified)
- `/` → **307 → /fr** (default locale); `/de` (invalid locale) → 307 → /fr
- FR nav: 8 links, active-state `aria-current="page"`; mobile menu button with `aria-expanded`/`aria-controls`, Escape closes, route change closes
- Language switcher **FR | EN top-right**, preserves current path (`/en/produits` ↔ `/fr/produits`), `hrefLang` + `aria-current` set
- All tel: / mailto: / Google Maps directions / Instagram / Facebook / HelloAsso links carry `data-track` analytics attributes
- Contact form: client validation (name ≥ 2, email regex, message ≥ 10) + server re-validation + honeypot (bot payload → fake success, **nothing stored**) + rate limit → rows land in `contact_messages`
- Analytics beacon → rows land in `analytics_events` (test rows cleaned afterwards)
- Branded 404 inside site chrome (`/fr/unknown-page` → 404 with bilingual message)

## 3. SEO & local SEO ✅
- Per-locale unique `<title>` (+ template), meta description, canonical (absolute), `hrefLang` fr/en/x-default, `og:locale` (+alternate), twitter summary_large_image, SVG favicon
- `sitemap.xml` lists 22 URLs with language alternates; `robots.txt` allows all, disallows `/api/`, references sitemap
- Legal compliance: `/[lang]/mentions-legales` (publisher/SIREN/host/IP/credits) + `/[lang]/confidentialite` (RGPD: form data, cookieless analytics, rights, CNIL) linked site-wide from the footer
- JSON-LD: Organization+NGO & **Store** (full NAP, geo, Tue–Sun 10:00–17:00 openingHours), WebSite, BreadcrumbList (interior pages), ItemList (products), ImageGallery (gallery) — NAP consistent everywhere
- Keyword mapping per SEO_STRATEGY.md §4; illustration alts in page language

## 4. Accessibility ✅
- `<html lang>` correct per locale (verified: fr → fr, en → en)
- Skip-link to `#contenu`, landmarks (header/nav/main/footer), single h1 per page, breadcrumb nav with aria-label
- Visible focus (3px tomato outline), ≥44px tap targets, form labels + aria-required/aria-invalid + aria-live status, decorative SVGs aria-hidden
- `prefers-reduced-motion` disables reveals/marquee/floats; contrast pairs checked (ink #2B2118 on paper ≥ 12:1; cream on tomato ≥ 4.6:1 for large/UI text)

## 5. Performance ✅
- Fully static marketing pages; first-load JS kept minimal (no UI libs; lucide tree-shaken; vanilla IO reveal)
- next/image everywhere (AVIF/WebP, explicit `sizes`); hero `priority`, rest lazy
- Fonts self-hosted via next/font, preloaded woff2, `display:swap`; zero render-blocking third parties
- Google Maps loads **only on explicit tap** (LazyMap facade) — no third-party JS by default
- Analytics via `navigator.sendBeacon` (non-blocking)

## 6. Privacy ✅
No cookies, no fingerprinting, no IP/UA storage; event types allow-listed server-side; contact form stores only user-typed data; honeypot silently discards spam.

## 7. Content compliance ✅
- Only verified facts published (RESEARCH_REPORT.md); hours shown with "verified autumn 2024 — check socials" disclaimer
- No prices, no restaurant claims, no invented reviews — Facebook 100%/8 avis and Le Dimitile partnership cited with attribution
- All imagery labelled *visuel d'illustration* pending official photos (also noted in footer/docs)

## 8. Known follow-ups for the business
1. Confirm opening hours + verify exact address pin ([NEEDS VERIFICATION] in research file)
2. Provide real photography to replace illustrative visuals
3. Create/verify Google Business Profile with identical NAP
4. Configure `NEXT_PUBLIC_SITE_URL` to the final domain before public launch
5. Review EN copy with a native speaker before any ad campaigns
