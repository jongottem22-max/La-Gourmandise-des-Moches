# SEO STRATEGY — La Gourmandise des Moches

## 1. Landscape & intent
Branded demand exists (press: Linfo.re; directories; partner pages) but the brand owns **no web property** — every branded query lands on third parties. Non-branded opportunity is **local + product + mission**:

| Intent cluster | Example queries (FR) | Competition note |
|---|---|---|
| Local products | produits artisanaux Réunion, produits péi Entre-Deux, épicerie artisanale Réunion | Medium; mostly marketplaces & tourism boards |
| Preserves | confiture artisanale Réunion, confiture bringelle, ketchup banane Réunion | Low; niche long-tail, high conversion |
| Mission | anti-gaspillage alimentaire Réunion, fruits moches Réunion, circuits courts Sud Réunion | Low; strong PR synergy |
| Visits | boutique Vavang'Art, Vavang Art Entre-Deux, que faire à l'Entre-Deux gourmand | Low-medium |
| EN tourist | Réunion local food experience, artisanal jam Réunion island, food waste initiative Réunion | Low; near-zero competition — quick win |
| Restaurant/vegan Entre-Deux | restaurant Entre-Deux, vegan Réunion, sans gluten | **Claimed** — restaurant page: 100% vegan, vegetarian and gluten-free, €8 lunch (see Research §3) |

Titles/metas target **one primary intent per page**; long-tail handled via H2s and body copy. No keyword stuffing; NAP repeated exactly across pages & schema.

## 2. Technical SEO
- **Next.js metadata API** per page + `generateMetadata`; unique FR/EN `title` + `description` (≤ 60 / ≤ 155 chars).
- **Canonicals**: `https://gourmandisedesmoches.fr/[lang]/…` (configurable via `NEXT_PUBLIC_SITE_URL`; code fallback now matches the production domain and the Pages workflow so no build can emit a canonical to a different host).
- **hreflang**: `alternates.languages` → `fr`, `en`, `x-default` → /fr; og:locale `fr_RE` (+ `og:locale:alternate` `en_US`).
- **sitemap.ts** enumerates both locales of all routes with `alternates`. **robots.ts** allows all, points to sitemap, disallows `/api/`.
- **Semantic HTML**: single h1; descriptive anchor text; breadcrumbs with `BreadcrumbList` JSON-LD on interior pages.
- **Structured data**:
  - Global: `Organization` + `Store` (`@id` on business), sameAs → Facebook/Instagram/HelloAsso, full NAP, geo (-21.2339, 55.4703 approx L'Entre-Deux centre — flagged VERIFY), openingHours Tue–Sun 10:00–17:00.
  - Home: `WebSite` + `WebPage`.
  - Produits: `ItemList` of product categories (no fabricated price/SKU).
  - Galerie: `ImageGallery`.
  - Ateliers: `Event`-style avoided (no verified dates) → `Course`-like description kept as plain content until dates confirmed.
- **Images**: descriptive filenames, alt text in page language, AVIF/WebP via next/image.

## 3. Local SEO
- Exact-match NAP: **La Gourmandise des Moches — 4C rue Hubert Delisle, Vavang'Art, 97414 L'Entre-Deux, La Réunion — +262 6 92 55 35 72** (identical in footer, contact page, JSON-LD; ready for Google Business Profile once created [NEEDS VERIFICATION]).
- Local phrases woven naturally: "à L'Entre-Deux", "dans le Sud sauvage", "produits péi", "Vavang'Art".
- Directions deep-link to Google Maps (`api=1&query=…`) on every visit CTA.
- Reviews: Facebook 100% (8 avis) cited with attribution; encourage reviews only via existing FB page (no fake review widgets).

## 4. On-page keyword map (per locale)
| Page | FR primary | EN primary |
|---|---|---|
| Accueil | produits artisanaux anti-gaspillage Réunion | artisanal anti-waste products Réunion Island |
| Produits | confitures, soupes, nectars et sirops artisanaux Réunion | artisanal jams, soups, nectars & syrups Réunion |
| Boutique-Atelier | boutique atelier Vavang'Art Entre-Deux horaires | craft shop Vavang'Art Entre-Deux opening hours |
| Démarche | anti-gaspillage alimentaire Réunion circuits courts | fighting food waste Réunion Island short supply chains |
| Ateliers | atelier confiture La Réunion | jam-making workshop Réunion Island |
| Territoire | producteurs péi fruits et légumes locaux | Réunion farmers local produce |
| Histoire | histoire La Gourmandise des Moches Sandra Ramaye | the story of La Gourmandise des Moches |
| Galerie | galerie photos gourmandises péi | gallery — Réunion island preserves |
| Contact | contact horaires accès Entre-Deux Réunion | contact, hours & directions Entre-Deux |
| Journal (hub) | journal La Gourmandise des Moches, actualités anti-gaspi Réunion | Réunion food stories & anti-waste news |
| Journal #1 — restaurant | restaurant L'Entre-Deux, où manger à L'Entre-Deux, restaurant vegan / sans gluten La Réunion, repas pas cher Réunion, restaurant anti-gaspi | restaurant L'Entre-Deux, where to eat L'Entre-Deux, vegan & gluten-free restaurant Réunion Island, cheap lunch Réunion, things to do L'Entre-Deux |

## 5. Editorial roadmap (CTA-bearing content; see CONTENT_GUIDE.md)
Seasonal preserve announcements, producer portraits, anti-waste recipes (use-the-peel), Vavang'Art village news, workshop recaps — each with intent, keyword, internal links to /produits + /ateliers + CTA.

## 5bis. Journal (blog) — live structure

- **Hub**: `/{fr,en}/journal` — editorial promise, featured article, upcoming themes (no fake articles/dates), Blog JSON-LD, CTA to phone/directions.
- **Article template** (`src/lib/data/blog.ts` + `BlogArticle` blocks): H1 with the money keyword, answer-first lead paragraph, « l'essentiel » fact box (hours/price/diet/phone — the data people search for), H2 outline, internal links to produits/boutique/ateliers/démarche/territoire, keyword tag list, FAQ block with FAQPage JSON-LD, "read next" links, conversion block (call · restaurant page · directions).
- **Every article**: own canonical + fr/en/x-default hreflang in `pageMetadata` (`subPath`), `BlogPosting` JSON-LD linked to the Restaurant/Store/Organization entities, unique 60/155 title+meta, listed in `sitemap.xml` with per-locale alternates.
- **Published**: #1 *Restaurant à L'Entre-Deux : vegan, sans gluten, 8 €* (`/fr/journal/restaurant-entre-deux-vegan-sans-gluten`) — targets the "restaurant L'Entre-Deux / où manger à L'Entre-Deux / restaurant vegan-sans gluten Réunion" cluster, the highest-intent local queries the brand can serve today.

## 6. Measurement
First-party events (no cookies): CTA/tel/mail/map/social clicks, form submits, language switches; ready to plug Plausible/Matomo via env flag later. KPI targets: ≥ 60% branded-clicks to own site in 3 months (from 0%), calls from mobile SERP, workshop enquiries.
