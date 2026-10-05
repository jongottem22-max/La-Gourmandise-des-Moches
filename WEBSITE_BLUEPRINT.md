# WEBSITE BLUEPRINT — La Gourmandise des Moches

## 1. Objectives
1. Explain in ≤ 5 seconds: **who** (artisanal anti-waste workshop + boutique), **where** (Vavang'Art, L'Entre-Deux, La Réunion), **why it matters** (imperfect péi produce given a delicious second life), **what next** (visit / call / discover products / follow).
2. Turn branded searches into visits & calls (no own site exists today).
3. Support the association's growth: workshop bookings, partner/wholesale enquiries, producer enquiries, donations (HelloAsso).
4. Be maintainable: hours, products, socials in one data file; contact via form stored in DB.

## 2. Audiences & user journeys
- **Local foodie** → Google "produits locaux Entre-Deux" → accueil → produits → horaires → click-to-call / itinéraire.
- **Tourist** → "authentic Réunion food experience" → EN page → ateliers → call/Instagram DM to book.
- **Producer** → démarche page → "Vous êtes producteur ?" → contact form (subject: producteur) → call.
- **Partner/org (hotel, school, association)** → ateliers/territoire → contact form (subject: partenariat).
- **Conscious consumer** → anti-gaspillage page → HelloAsso support link → follow Instagram.

## 3. Information architecture (bilingual, FR default)
`/fr` & `/en` mirrors. Language switcher **top-right of nav** (desktop + mobile menu), preserves current path.

| Route (FR / EN slug pair) | Page | Primary CTA |
|---|---|---|
| `/` → 307 → `/fr` | Redirect to default locale | — |
| `/[lang]/` | Accueil / Home | Découvrir nos produits · Nous rendre visite |
| `/[lang]/produits` | Nos produits / Our products | Appeler pour connaître les bocaux du moment |
| `/[lang]/boutique-atelier` | La boutique & l'atelier / Shop & workshop | Itinéraire + horaires |
| `/[lang]/anti-gaspillage` | Notre démarche / Our mission | Soutenir (HelloAsso) · Producteurs → contact |
| `/[lang]/ateliers` | Ateliers / Workshops | Réserver par téléphone |
| `/[lang]/territoire` | Nos producteurs & le territoire / Producers & land | Devenir partenaire |
| `/[lang]/histoire` | Notre histoire / Our story | Rencontrer Sandra → visite |
| `/[lang]/galerie` | Galerie / Gallery | Suivre sur Instagram |
| `/[lang]/contact` | Contact & venir / Contact & visit | Appeler · Itinéraire · Formulaire |

Nav order: Produits · Boutique & Atelier · Démarche · Ateliers · Territoire · Histoire · Galerie · Contact (+ FR | EN).

## 4. Homepage wireframe
1. **Hero** — display headline "La gourmandise des moches" + sub ("Des fruits et légumes péi trop beaux pour être jetés, transformés en gourmandises à L'Entre-Deux"), 2 CTAs (Produits / Visite), collage visual, NAP strip (hours, address) + marquee ribbon of produce names.
2. **La promesse** — 3 pillars (Racheté aux producteurs péi · Transformé à la main · Zéro import, 100% plaisir).
3. **Du moche au merveilleux** — 4-step process strip (Surplus → Achat → Transformation → Gourmandise + insertion).
4. **Les gourmandises** — 6 product category cards.
5. **L'atelier-boutique** — hours, address, map link, workshop teaser.
6. **La fondatrice** — Sandra's story teaser → /histoire.
7. **Péi & fiers** — territory strip + partners (Le Dimitile) note.
8. **Preuve sociale** — FB 100% recommend (8 avis) + partners; Instagram follow CTA.
9. **Galerie bandeau** + **CTA final** (visite / appel / formulaire).
Footer: NAP, hours, nav, socials, HelloAsso, legal note, language switch, "site bilingue" note.

## 5. Conversion strategy
Primary: *visits & calls* (tel: on every page header/footer, sticky on contact). Secondary: contact form (DB), itinerary link (Google Maps directions URL), Instagram follow, HelloAsso support. No fake cart/booking: workshop booking = phone/Instagram, clearly stated.

## 6. Visual direction
- **Mood:** tropical kiosk meets craft atelier; celebrates imperfection (wobbly shapes, hand-drawn doodles, sticker stamps).
- **Palette:** paper cream `#FAF1DC`, cream `#FFF9EC`, ink `#2B2118`, leaf `#3E6B38`, mango `#F7A603`, tomato `#E04E25`, guava `#E77C8C`, vanilla `#F3DFA9`. JJ-application: cream backgrounds, ink text, tomato/mango accents on 60/30/10.
- **Type:** Fraunces (WONK/opsz display serif — delightfully imperfect letterforms) + Karla (warm readable sans). FR & EN both supported (latin-ext).
- **Motifs:** torn-paper SVG dividers, squiggle underlines, dotted "cordon" rules, rotated badge stamps ("ANTI-GASPI", "100% PÉI"), blob-masked imagery.
- **Imagery:** warm editorial still-life illustrations labelled *visuel d'illustration* until official photos arrive (see Research §4).
- **Motion:** restrained — scroll reveals, marquee ribbon, hover lifts; full `prefers-reduced-motion` fallbacks.

## 7. Accessibility strategy (WCAG 2.2 AA)
Semantic landmarks, one h1/page, logical heading order, skip-link, keyboard-navigable menu & dialog, visible focus rings (tomato outline), contrast ≥ 4.5:1 for text, alt text on media, labelled form controls + error messaging, `lang` per page, language switcher as links with `hreflang`, reduced-motion support, min 44px tap targets.

## 8. Performance strategy
Static prerendered pages (SSG), next/image with sizes/AVIF, next/font (Fraunces+Karla, self-hosted, `display: swap`), zero heavy client libs (vanilla IntersectionObserver reveal, CSS marquee), map: click-to-load iframe (no third-party JS until user tap), system beacons via `sendBeacon` (non-blocking). Budget: ≤ ~90 kB JS first load on content pages.

## 9. Bilingual strategy
Full human-quality FR (brand voice: warm, playful, péi-proud) & natural EN (not literal); glossary: *péi* kept + glossed ("local, island-style"), *moches* → "the ugly ones" kept in FR with translation. Locale-aware slugs via `alternates.languages`, hreflang + x-default, `og:locale` fr_RE/en_US, metadata per locale, lang attr per page.

## 10. SEO strategy (summary — full doc in SEO_STRATEGY.md)
Local-first: Restaurant impossible→ use `Store`+`NGO`-flavoured `Organization` schema with full NAP & geo of L'Entre-Deux; keywords around *produits artisanaux Réunion / confiture artisanale / anti-gaspillage / Entre-Deux*; unique titles/metas per locale; sitemap.xml, robots.txt, canonicals, breadcrumbs; internal linking web between products↔démarche↔ateliers.

## 11. Content management
`/src/lib/data/business.ts` = single source for NAP/hours/socials (feeds footer, contact, JSON-LD). `/src/lib/data/products.ts` = catalogue. Dictionaries per locale. Contact messages & events in Postgres (Drizzle) so the business data persists without a developer for day-to-day enquiries; catalogue/hours edits = one data file (documented in CONTENT_GUIDE.md).

## 12. Analytics & privacy
First-party event beacon (`/api/events`) — page views (path+lang only), CTA/tel/mail/social/map clicks, form submissions, language switches. No cookies, no fingerprinting, no IP storage, no personal data beyond what users type in the contact form. DB retained for owner's insight; doc'd in TECHNICAL_ARCHITECTURE.md.

## 13. Test plan
Functional (nav/links/forms/switcher), bilingual parity, SEO meta, a11y keyboard pass, responsive 320→1440, build/typegen checks — results logged in WEBSITE_QA_REPORT.md.
