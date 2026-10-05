# La Gourmandise des Moches

Site vitrine bilingue (FR/EN) de **La Gourmandise des Moches** — atelier artisanal
anti-gaspillage et boutique à Vavang'Art, L'Entre-Deux, La Réunion.
Des fruits et légumes péi « trop beaux pour être jetés » transformés en confitures,
sirops, ketchups et autres gourmandises.

🌐 **Site en production : https://gourmandisedesmoches.fr** (domaine GoDaddy)
🧪 **Adresse technique : https://jongottem22-max.github.io/La-Gourmandise-des-Moches/**

Bilingual (FR/EN) brochure website for an artisanal anti-food-waste workshop &
shop in L'Entre-Deux, Réunion Island. Statically hosted on GitHub Pages behind
the custom domain `gourmandisedesmoches.fr`.

## Stack

- **Next.js 16** (App Router, `output: "export"`) + React 19 + TypeScript
- **Tailwind CSS 4**
- Site 100 % statique (SSG) — aucun serveur ni base de données requis
- Hébergement : **GitHub Pages** (workflow `.github/workflows/deploy-pages.yml`)
- Contact : boutons d'appel, **e-mail pré-rempli** (mailto par sujet) et
  **WhatsApp** — pas de formulaire serveur
- Fraunces & Karla auto-hébergées (`src/fonts/`, latin) — build reproductible
  hors-ligne, aucune requête Google Fonts

## Hébergement GitHub Pages

Le site se déploie automatiquement à chaque push sur `main` (et sur la branche
de travail `arena/01a10cb8-…`) via le workflow *Deploy to GitHub Pages* :

1. `npm ci` → `npm run build` (génère `out/` — export statique)
2. Téléversement de `out/` comme artefact Pages
3. Déploiement

Activation une seule fois : **Settings → Pages → Source : GitHub Actions**.

### Deux configurations d'URL

| Phase | URL | Réglage workflow |
| --- | --- | --- |
| 1 — aujourd'hui | `https://jongottem22-max.github.io/La-Gourmandise-des-Moches/` | `NEXT_PUBLIC_BASE_PATH: /La-Gourmandise-des-Moches` |
| 2 — DNS GoDaddy propagé | `https://gourmandisedesmoches.fr` | `NEXT_PUBLIC_BASE_PATH: ""` + fichier `public/CNAME` contenant `gourmandisedesmoches.fr` |

`NEXT_PUBLIC_SITE_URL` reste **toujours** `https://gourmandisedesmoches.fr` afin
que les URL canoniques, le sitemap et les balises OG référencent le domaine
final (jamais l'adresse technique).

## Domaine personnalisé GoDaddy → GitHub Pages

Dans l'espace GoDaddy (**Domaines → gourmandisedesmoches.fr → DNS**) :

| Type | Nom | Valeur |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` (optionnel) | `@` | `2606:50c0:8000::153` … `8003::153` |
| `CNAME` | `www` | `jongottem22-max.github.io` |

Puis côté GitHub : passer la phase 2 (ci-dessus), saisir `gourmandisedesmoches.fr`
dans **Settings → Pages → Custom domain**, et cocher **Enforce HTTPS** dès que le
certificat est délivré (automatique, ~15 min après la propagation DNS).

## Démarrer / Getting started

```bash
npm ci            # installe les dépendances
npm run dev       # serveur de développement → http://localhost:3000 (redirige vers /fr/)
npm run build     # build de production (export statique vers out/ + vérif. des images)
npm run typecheck # vérification TypeScript
npm run lint      # ESLint
npm run check:images  # vérifie les SHA-256 des images clés
```

Variables d'environnement (injectées par le workflow, optionnelles en local) :

| Variable | Rôle | Défaut |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (SEO, sitemap, OG) | `https://gourmandisedesmoches.fr` |
| `NEXT_PUBLIC_BASE_PATH` | Sous-chemin GitHub Pages avant la mise en route du domaine | `""` |

## Structure

```
src/
  app/[lang]/       pages bilingues (produits, ateliers, restaurant, contact, …)
  app/icon.svg      favicon   ·   robots.ts / sitemap.ts   ·   globals.css
  assets/images/    images compilées dans le bundle
  components/site/  composants React (Header, Footer, ProductCard, ContactChannels, …)
  fonts/            Fraunces & Karla variables (latin), auto-hébergées
  lib/              données métier, i18n (fr/en), SEO, utilitaires
public/
  index.html        redirection racine → ./fr/ (compatible sous-chemin Pages)
  images/           images servies en direct + catalogue produits (40 photos)
  documents/        PDF (catalogue produits, affiches d'atelier)
  menu.js           script accessibilité du menu mobile
design-assets/      assets source : images + sauvegardes base64 (auto-réparation au build)
scripts/            prepare-images.mjs (vérification SHA-256 des images)
```

## Documentation projet

| Fichier                       | Contenu                                       |
| ----------------------------- | --------------------------------------------- |
| `WEBSITE_BLUEPRINT.md`        | Objectifs, audiences, architecture de l'info  |
| `TECHNICAL_ARCHITECTURE.md`   | Choix techniques (v1 serveur — voir note §0)  |
| `CONTENT_GUIDE.md`            | Ton, contenus et éditorial                    |
| `SEO_STRATEGY.md`             | Stratégie SEO (mots-clés, JSON-LD, sitemap)   |
| `WEBSITE_QA_REPORT.md`        | Rapport qualité / recette du site             |
| `RESEARCH_REPORT.md`          | Recherche initiale (concurrents, terrain)     |
| `design-assets/SOURCES.md`    | Provenance des assets (dossier Google Drive)  |
