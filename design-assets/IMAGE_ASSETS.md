# Image Asset Library — La Gourmandise des Moches

**Never regenerate or reprompt these images.** They are permanent JPEG files checked into the repository in **three byte-identical locations**:

| Location | Role |
|---|---|
| `src/assets/images/` | **Primary deployed set.** Every file is statically imported through `src/lib/assets.ts`; Next.js fingerprints and embeds the actual JPEG bytes in `.next/static/media` at build time. This is what the live pages use. |
| `public/images/` | **Direct-file fallback.** Next.js copies `public/` verbatim into every proper build/deploy, preserving `/images/*.jpg` URLs for diagnostics or manual reuse. |
| `design-assets/images/` | **Authoritative archival backup.** Restore either working set from here if a file is ever lost or corrupted. |
| `design-assets/base64/` | **Text recovery set.** Base64 payloads of the same 10 files — pure text, so they survive upload channels that drop binaries. The `prebuild` hook (`scripts/prepare-images.mjs`) automatically reconstructs the three sets above from these before every build. |

## Why the images persist on the host automatically

- The site imports only real local JPEG files from `src/assets/images/` through the typed `IMAGES` registry in `src/lib/assets.ts` — **there are no prompts, generator calls, data URLs, temporary links, or external image hosts at runtime**.
- Next.js emits these imports into `.next/static/media/*.jpg` with content hashes. Therefore the files are inside the exact build artifact Netlify publishes, even if an upload omits `public/`.
- `next.config.ts` keeps images unoptimized, so the browser reads the emitted JPEG directly and does not depend on a `/_next/image` serverless optimizer.
- `public/images/` remains a second deployment path, and `design-assets/images/` is a third archival copy.
- Nothing in the repository excludes JPEG files.

## Integrity check (run any time)

```bash
sha256sum -c design-assets/CHECKSUMS.sha256
# all lines must say OK
```

## Restoration (automatic, runs at every build)

The `prebuild` hook restores all three binary sets from `design-assets/base64/` and verifies SHA-256. Manual run any time:

```bash
node scripts/prepare-images.mjs          # verify + restore
npm run check:images                     # verify only, non-zero exit on problems
sha256sum -c design-assets/CHECKSUMS.sha256   # raw checksum verification (30 entries)
```

## Inventory (10 assets — all JPEG)

| File | Dims | Bytes | Used on | Purpose |
|---|---|---|---|---|
| hero-moches.jpg | 1408×768 | 234 374 | Home hero, OG/social meta | Still life of imperfect tropical produce (brand signature) |
| confitures.jpg | 1408×768 | 174 988 | Produits, home, ateliers, galerie | Jams category |
| ketchup-banane.jpg | 1408×768 | 215 146 | Produits, home, galerie | Banana ketchup (signature condiment) |
| compotes.jpg | 1408×768 | 166 732 | Produits, galerie | Compotes category |
| soupes.jpg | 1408×768 | 214 690 | Produits, galerie | Soups category |
| jus-nectars.jpg | 1408×768 | 250 990 | Produits, home, galerie | Juices & nectars category |
| sirops.jpg | 1408×768 | 201 460 | Produits, galerie | Syrups category |
| atelier-mains.jpg | 1408×768 | 203 156 | Home, boutique, histoire, galerie | Hands preparing fruit in the workshop |
| entre-deux.jpg | 768×1376 | 319 854 | Home, territoire, galerie | L'Entre-Deux landscape (portrait — cropped by CSS) |
| boutique.jpg | 1408×768 | 368 111 | Home, galerie, Store JSON-LD | The Vavang'Art shop illustration |

All are **AI-generated illustrative visuals**, labelled *« visuel d'illustration »* on the site until the business supplies official photography (see RESEARCH_REPORT.md §4 and CONTENT_GUIDE.md §2).

## Binary asset provenance

The repository contains the completed JPEG files themselves. **No generation prompt is used or needed by the website, build process, Netlify runtime, or deployment.** If the business later provides official photos, replace the same-named JPEG files in all three asset locations and keep the typed imports in `src/lib/assets.ts`.

## Rules for the team

1. **Do not delete or rename** files in `src/assets/images/` without updating `src/lib/assets.ts`; all page and product references flow through that typed registry.
2. New assets → put identical files in `src/assets/images/`, `public/images/`, and `design-assets/images/`; import the bundled copy in `src/lib/assets.ts`; then refresh checksums: `sha256sum public/images/*.jpg src/assets/images/*.jpg design-assets/images/*.jpg > design-assets/CHECKSUMS.sha256`.
3. When official photography arrives from the business, swap same-named files (or update imports), and remove the *« visuel d'illustration »* labels per CONTENT_GUIDE.md.
4. Git: always `git add src/assets/images public/images design-assets/images design-assets/CHECKSUMS.sha256` — never force-push over them.
