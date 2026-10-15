# Image Asset Library — La Gourmandise des Moches

**Never regenerate or reprompt these images.** The 23 files listed below are the
permanent assets of the site, checked into the repository in **three
byte-identical locations** (masters are kept in addition, see *Masters*):

| Location | Role |
|---|---|
| `src/assets/images/` | **Primary deployed set.** Every file is statically imported through `src/lib/assets.ts`; Next.js fingerprints and embeds the actual bytes in `.next/static/media` at build time. This is what the live pages use. |
| `public/images/` | **Direct-file fallback.** Next.js copies `public/` verbatim into every build/deploy, preserving `/images/*.jpg` URLs for diagnostics or manual reuse. |
| `design-assets/images/` | **Authoritative archival backup.** Restore either working set from here if a file is ever lost or corrupted. |
| `design-assets/base64/` | **Text recovery set.** Base64 payloads of the same 23 files — pure text, so they survive upload channels that drop binaries. The `prebuild` hook (`scripts/prepare-images.mjs`) automatically reconstructs the three sets above from these before every build. |

## Why the images persist on the host automatically

- The site imports only real local files from `src/assets/images/` through the typed `IMAGES` registry in `src/lib/assets.ts` — **there are no prompts, generator calls, data URLs, temporary links, or external image hosts at runtime**.
- Next.js emits these imports into `.next/static/media/*` with content hashes. Therefore the files are inside the exact build artifact GitHub Pages publishes, even if an upload omits `public/`.
- `next.config.ts` keeps images unoptimized, so the browser reads the emitted file directly and does not depend on a `/_next/image` serverless optimizer.
- `public/images/` remains a second deployment path, and `design-assets/images/` is a third archival copy.
- Nothing in the repository excludes image files.

## Integrity check (run any time)

```bash
sha256sum -c design-assets/CHECKSUMS.sha256   # 69 lines (23 assets × 3 locations) — all must say OK
npm run check:images                          # same verification through the prebuild script
```

## Inventory (23 assets — all JPEG)

| File | Dims | Bytes | Used on | Purpose |
|---|---|---|---|---|
| hero-moches.jpg | 1408×768 | 234 374 | Home hero, OG/social meta | Still life of imperfect tropical produce (brand signature) |
| confitures.jpg | 1408×768 | 174 988 | Produits, home, ateliers, galerie | Jams category |
| confitures-featured.jpg | 1537×1023 | 311 341 | Produits, home | Jams category card |
| ketchup-banane.jpg | 1408×768 | 215 146 | Produits, home, galerie | Banana ketchup (signature condiment) |
| ketchup-sauces-featured.jpg | 1086×1448 | 222 862 | Produits | Ketchups & sauces category card |
| achards-featured.jpg | 1086×1448 | 280 301 | Produits | Pickles category card |
| compotes.jpg | 1408×768 | 166 732 | Produits, galerie | Compotes category |
| soupes.jpg | 1408×768 | 214 690 | Produits, galerie | Soups category |
| jus-nectars.jpg | 1408×768 | 250 990 | Produits, home, galerie | Juices & nectars category |
| sirops.jpg | 1408×768 | 201 460 | Produits, galerie | Syrups category |
| sorbets-featured-web.jpg | 1312×1199 | 183 082 | Produits, home | Sorbets category card |
| atelier-mains.jpg | 1408×768 | 203 156 | Home, boutique, histoire, galerie | Hands preparing fruit in the workshop |
| entre-deux.jpg | 768×1376 | 319 854 | Home, territoire, galerie | L'Entre-Deux landscape (portrait — cropped by CSS) |
| boutique.jpg | 1408×768 | 368 111 | Home, galerie, Store JSON-LD | The Vavang'Art shop |
| restaurant-exterior.jpg | 1516×1038 | 399 446 | Journal (hero), home, restaurant | The restaurant, terrace and awning at the entrance of L'Entre-Deux |
| restaurant-meal.jpg | 1086×1448 | 319 587 | Journal, restaurant, home | €8 anti-waste lunch served on the terrace |
| sorbet-maison.jpg | 848×1264 | 193 388 | Journal, restaurant, home | Homemade vegan, gluten-free sorbet |
| territory-destination.jpg | 1600×898 | 440 536 | Home, territoire | Panorama of L'Entre-Deux and the mountains |
| hero-market.jpg | 1448×1086 | 377 149 | Home hero | Market stall of rescued produce |
| founder-kitchen.jpg | 1370×1148 | 218 468 | Home, histoire | Sandra working in the association kitchen |
| founder-market.jpg → founder-market-web.jpg | 900×1200 | 225 157 | Boutique, histoire, galerie | Sandra at a market stand |
| workshop-poster-web.jpg | 1400×1400 | 211 514 | Ateliers, galerie | Official workshop flyer (atelier confiture) |
| brand-logo.jpg | 200×200 | 9 680 | Header, footer, OG card source | Brand logo |

All are **AI-generated illustrative visuals or association documents**, labelled
*« visuel d'illustration »* on the site until the business supplies official
photography (see RESEARCH_REPORT.md §4 and CONTENT_GUIDE.md §2).

## Masters and derived twins (performance)

The supplied masters are heavy (the PNGs run 2.6–3.4 MB each). Every file the
site **serves** is a derived, web-optimised twin; all masters are kept untouched
in `src/assets/images/`.

| Supplied master | Served file | Rule |
|---|---|---|
| `territory-destination.png`, `hero-market.png`, `confitures-featured.png`, `achards-featured.png`, `founder-kitchen.png`, `ketchup-sauces-featured.png`, `brand-logo.png` | same basename, `.jpg` | PNG → JPEG, same pixels and dimensions, `-quality 82` (alpha verified fully opaque before conversion) |
| `restaurant-exterior.png`, `restaurant-meal.png`, `sorbet-maison.png` | same basename, `.jpg` | idem, added with the Journal |
| `founder-market.jpg`, `workshop-poster.jpg`, `sorbets-featured.jpg` | `<name>-web.jpg` | JPEG → JPEG recompressed (the `-web` suffix avoids overwriting the supplied JPEG) |
| `restaurant-page.png` | — | **no new file**: byte-identical to `restaurant-meal.png` (SOURCES.md), so `IMAGES.restaurantPage` points at the same optimised file |

Result: the shipped image payload of a full build dropped from **26 MB to 6.2 MB**
(−76 %), with no visible quality loss — the heaviest page now loads ~1.3 MB of
images instead of ~9 MB.

### Regenerating a twin (only if a master is ever replaced)

```bash
convert src/assets/images/<master>.png -resize '1600x1600>' -strip \
  -interlace Plane -sampling-factor 4:2:0 -quality 82 /tmp/<name>.jpg
# then, for the twin:
#   1. copy it to src/assets/images/, public/images/, design-assets/images/
#   2. refresh design-assets/base64/<name>.b64 (base64 of the file, 76-char lines)
#   3. update scripts/image-manifest.json (sha256 + bytes)
#   4. regenerate design-assets/CHECKSUMS.sha256
#   5. point the matching import in src/lib/assets.ts at it
npm run check:images   # must print "Image assets OK"
```

## Rules for the team

1. **Do not delete or rename** files in `src/assets/images/` without updating `src/lib/assets.ts`; all page and product references flow through that typed registry.
2. **Never overwrite a supplied master.** Add a `-web` twin and point the import at it.
3. Any new served image must be added to all three sets, `design-assets/base64/`, `scripts/image-manifest.json` and `CHECKSUMS.sha256` — otherwise `npm run build` fails on the integrity check.
4. If the business supplies official photos, replace the same-named file in all three sets (or add `-web` twins) and keep the typed imports in `src/lib/assets.ts` working — the site and the checksums update from there.
