# Provenance des assets (Google Drive)

Ce dépôt a été installé depuis le dossier Google Drive partagé du projet
(`workspace`), qui contenait quatre dossiers : `site/` (le site, installé ici à la
racine du dépôt), `source/` et `uploads/` (matériaux source), et `.config/`
(télémétrie d'éditeur, non archivée).

Pour éviter de stocker les mêmes octets plusieurs fois dans Git, les fichiers
source **strictement identiques** (comparaison binaire `cmp`) à des fichiers déjà
présents dans le site ne sont pas dupliqués. Correspondances vérifiées :

| Fichier Drive (source matériau) | Identique (à l'octet) à |
| --- | --- |
| `source/LOGO MODERNE.png` | `public/images/brand-logo.png` |
| `source/PALETTE DES COULEURS.png` | `public/images/brand-palette.png` |
| `source/plat massalé + bredes.jpg` | `public/images/plat-massale-bredes.jpg` |
| `source/IMG-20251102-WA0014.jpg` | `public/images/founder-market.jpg` |
| `source/Catalogue de produit La Gourmandise Des Moches.pdf` | `public/documents/catalogue-produits.pdf` |
| `source/ATELIER CONFITURE.pdf` | `public/documents/atelier-confiture.pdf` |
| `source/photo bringelle aux épices.pdf` | `public/documents/photo-bringelle-aux-epices.pdf` |
| `uploads/image-1.png` | `public/images/restaurant-meal.png` (= `src/assets/images/restaurant-page.png`) |

Autres dossiers :

- `uploads/image-2.png` — image unique (3,1 Mo), conservée dans
  `design-assets/uploads/image-2.png`.
- `source/la-gourmandise-des-moches(2).zip` — ancien export (instantané) du même
  projet, **antérieur** à la version installée et incomplet (la plupart des
  binaires y manquaient) → non archivé. La version du dépôt est plus récente et
  intègre tous ses fichiers.
- `.config/nextjs-nodejs/config.json` — télémetrie anonyme de l'éditeur en
  ligne, sans intérêt pour le projet → non archivé.

## Intégrité des images

Les 10 images JPEG principales sont vérifiées par SHA-256
(`scripts/image-manifest.json`) à leurs trois emplacements
(`src/assets/images/`, `public/images/`, `design-assets/images/`) via
`npm run check:images`. Le build (`prebuild`) les restaure automatiquement
depuis les copies base64 si besoin.
