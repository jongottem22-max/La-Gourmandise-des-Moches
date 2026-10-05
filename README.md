# La Gourmandise des Moches

Site vitrine bilingue (FR/EN) de **La Gourmandise des Moches** — atelier artisanal
anti-gaspillage et boutique à Vavang'Art, L'Entre-Deux, La Réunion.
Des fruits et légumes péi « trop beaux pour être jetés » transformés en confitures,
sirops, ketchups et autres gourmandises.

Bilingual (FR/EN) brochure website for an artisanal anti-food-waste workshop &
shop in L'Entre-Deux, Réunion Island.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS 4**
- Pages 100 % statiques (SSG) — fonctionne sans base de données
- 2 routes API (formulaire de contact + événements analytics) via **Drizzle ORM / PostgreSQL**
  (optionnelles : `DATABASE_URL` requis uniquement pour les activer)
- Prêt pour **Netlify** (`netlify.toml` + `@netlify/plugin-nextjs` inclus)

## Démarrer / Getting started

```bash
npm ci            # installe les dépendances
npm run dev       # serveur de développement → http://localhost:3000 (redirige vers /fr)
npm run build     # build de production (vérifie aussi les images via scripts/prepare-images.mjs)
npm run typecheck # vérification TypeScript
npm run lint      # ESLint
```

Variables d'environnement (facultatives en local) :

| Variable             | Rôle                                                        |
| -------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (SEO, sitemap, OG) — ex. `https://lagourmandisedesmoches.re` |
| `DATABASE_URL`         | PostgreSQL pour le formulaire de contact + analytics        |

## Structure

```
src/
  app/[lang]/       pages bilingues (produits, ateliers, restaurant, contact, …)
  app/api/          routes API (contact, events, health)
  assets/images/    images compilées dans le bundle
  components/site/  composants React (Header, Footer, ProductCard, …)
  db/               client + schéma Drizzle
  lib/              données métier, i18n (fr/en), SEO, utilitaires
public/images/      images servies en direct + catalogue produits
public/documents/   PDF (catalogue produits, affiches d'atelier)
design-assets/      assets source : images + sauvegardes base64 (auto-réparation des images au build)
scripts/            prepare-images.mjs (vérification SHA-256 des images)
```

## Documentation projet

| Fichier                       | Contenu                                       |
| ----------------------------- | --------------------------------------------- |
| `WEBSITE_BLUEPRINT.md`        | Objectifs, audiences, architecture de l'info  |
| `TECHNICAL_ARCHITECTURE.md`   | Choix techniques et structure du code         |
| `CONTENT_GUIDE.md`            | Ton, contenus et éditorial                    |
| `SEO_STRATEGY.md`             | Stratégie SEO (mots-clés, JSON-LD, sitemap)   |
| `WEBSITE_QA_REPORT.md`        | Rapport qualité / recette du site             |
| `RESEARCH_REPORT.md`          | Recherche initiale (concurrents, terrain)     |
| `NETLIFY_DEPLOY.md`           | Guide de déploiement Netlify pas à pas        |
| `design-assets/SOURCES.md`    | Provenance des assets (dossier Google Drive)  |
