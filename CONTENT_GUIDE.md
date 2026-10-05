# CONTENT GUIDE — La Gourmandise des Moches

## 1. Brand voice
**FR (default):** chaleureuse, directe, un brin espiègle, fièrement péi. Phrases courtes. On tutoie le fruit, on vouvoie le client. On parle de "sauvetage gourmand", jamais de "concept disruptif".
- Signature words: *moches* (assumé, entre guillemets la première fois), *péi*, *bocaux*, *gourmandise*, *seconde vie*, *Sud sauvage*, *Vavang'Art*.
- Golden line: **« Moche dehors, merveilleux dedans. »**
**EN:** natural, friendly, keeps the French flavor — *péi* is kept and glossed once ("local, island-style"). Never literal translation.

## 2. Factual guardrails (binding)
Publish **only** facts in RESEARCH_REPORT.md marked CURRENT. Prices, menu items, restaurant service, staff beyond Sandra, awards, delivery: **[NEEDS VERIFICATION]** → never published. Hours shown as verified at research date with a "check our socials for updates" note. Photos: AI/stock visuals always labelled *visuel d'illustration* until the business supplies real photography.

## 3. Where content lives (for the business)
| What | Where | How to update |
|---|---|---|
| Address / phone / email / hours / socials | `src/lib/data/business.ts` | One file; auto-updates footer, contact, schema |
| Product catalogue | `src/lib/data/products.ts` | Add/edit objects; FR + EN fields |
| All UI strings/page copy FR | `src/lib/i18n/fr.ts` | Plain text |
| All UI strings/page copy EN | `src/lib/i18n/en.ts` | Plain text, mirrored keys |
| Contact messages received | Postgres `contact_messages` | Queried via dashboard SQL (see TECHNICAL doc) |
| Photos & illustrations | `src/assets/images/` (compiled live set) + `public/images/` (fallback) + `design-assets/images/` (archive) | See **design-assets/IMAGE_ASSETS.md** — actual JPEGs, never regenerate; all three sets checksummed |

## 4. Product entry template
`{ slug, category, name {fr,en}, description {fr,en}, ingredients?, image, alt {fr,en}, availabilityNote?, isSeasonal }` — image under `public/images/`, alt text mandatory, no invented prices/weights.

## 5. Editorial strategy for future posts (Notre livre de recettes / Journal)
| # | Proposed title (FR) | Intent | Primary keyword | CTA |
|---|---|---|---|---|
| 1 | Ketchup de banane : la star des bocaux moches | découverte produit | ketchup banane Réunion | Voir nos produits |
| 2 | Que faire des écorces d'orange ? Nos réponses en pot | inspiration/recette | zéro déchet cuisine Réunion | Découvrir la démarche |
| 3 | Portrait : pourquoi nous rachetons les invendus aux producteurs péi | confiance/mission | circuits courts Réunion | Devenir producteur partenaire |
| 4 | Un week-end gourmand à L'Entre-Deux | tourisme local | que faire Entre-Deux | Nous rendre visite |
| 5 | Atelier confiture : repartez avec votre propre pot | conversion atelier | atelier confiture Réunion | Réserver un atelier |
| 6 | Un fruit moche, c'est quoi au juste ? | éducation/EN adapté | ugly fruit food waste | Soutenir l'association |

Each post: 1 h2/process photos (real ones once supplied), internal links to produits/ateliers/contact, FR+EN versions, author = Sandra Ramaye (with consent).

## 6. Social integration rules
Link out to @lagourmandisedesmoches & facebook.com/cuisinepei974; curated gallery tiles link to Instagram (no scraping, no embeds of third-party JS). Announcements ("horaires d'été", "atelier samedi") should always point to the official socials as source of truth.

## 7. Review & testimonial policy
Only verifiable, attributed endorsements (Facebook rating 100% — 8 avis, Le Dimitile partnership). Never invent quotes. Once Google profile exists [NEEDS VERIFICATION], link "Laisser un avis".

## 8. Localization QA checklist
FR ↔ EN key parity (CI via TS types), EN reviewed by a native-level editor before any campaign, guillemets « » in FR, typographic apostrophes, date/time formats per locale, phone formatted +262 for EN pages and 06 92 55 35 72 in FR body copy (tel: href always +262692553572).
