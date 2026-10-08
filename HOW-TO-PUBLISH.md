# How to publish the pending changes without a coding session

`site-update.zip` (repo root) holds the nine changed source files plus the new
sorbet photo, already in their correct `src/...` folder structure. Unzipping it
gives you a single `src` folder. These are the final versions — they replace
what is in the repo today; nothing else needs to change.

## Option A — drag and drop on GitHub (~2 minutes, no tools)

1. Unzip `site-update.zip` → you get a folder named `src`.
2. Open https://github.com/jongottem22-max/La-Gourmandise-des-Moches/upload/main
3. Drag the whole `src` folder into the drop zone (GitHub keeps the structure
   and overwrites the matching files).
4. Commit message: `New address everywhere, new hours, homemade sorbet`
5. Keep "Commit directly to the main branch" → **Commit changes**.
6. Deploy starts automatically:
   https://github.com/jongottem22-max/La-Gourmandise-des-Moches/actions

## Option B — from a local clone

```bash
git clone https://github.com/jongottem22-max/La-Gourmandise-des-Moches.git
cd La-Gourmandise-des-Moches
unzip -o /path/to/site-update.zip
git add -A
git commit -m "New address everywhere, new hours, homemade sorbet"
git push origin main
```

## What changed

| File | Change |
|---|---|
| `src/lib/data/business.ts` | hours → Sunday–Friday 9am–5pm, closed Saturday; `address.place` ("Vavang'Art") removed |
| `src/lib/i18n/fr.ts`, `en.ts` | all Vavang'Art mentions replaced with the new address; hours in prose + meta descriptions; sorbet copy |
| `src/lib/data/restaurant.ts` | new `sorbet` menu item (vegan, gluten-free) |
| `src/lib/assets.ts` | registers the photo as `IMAGES.sorbetMaison` |
| `src/assets/images/sorbet-maison.png` | new photo, matching the existing terrace shot |
| `src/app/[lang]/page.tsx` | sorbet card in the home restaurant section; address card uses street + postcode |
| `src/app/[lang]/restaurant/page.tsx` | new sorbet section with the photo |
| `src/components/site/LazyMap.tsx` | caption → "4A rue Fortuné Hoarau · 97414 L'Entre-Deux" |
| `src/lib/seo.ts` | schema.org address no longer references the old venue name |

## After it deploys, check

- https://gourmandisedesmoches.fr/fr/ — "Dimanche – vendredi · 9h – 17h" + sorbet card
- https://gourmandisedesmoches.fr/fr/restaurant/ — sorbet section with photo
- no page still says "Vavang'Art"
