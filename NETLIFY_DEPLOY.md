# Netlify Deployment Guide — La Gourmandise des Moches

The site is Netlify-ready out of the box: fully static marketing pages served from the CDN, and the two API routes (contact form + analytics) run as serverless functions. The repo ships `netlify.toml` + `@netlify/plugin-nextjs` (pinned in `package.json`), so there is nothing else to configure in code.

---

## 1. One-time Netlify setup

1. Push this repository to GitHub/GitLab.
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
3. Netlify auto-detects Next.js and reads `netlify.toml`:
   - Build command: `npm run build` · Publish: `.next` · Node 22 · Next runtime plugin.
   - Just click **Deploy** — no UI changes needed.

### Environment variables (Site configuration → Environment variables)

| Variable | Required | Example | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ production | `https://lagourmandisedesmoches.re` | Canonical URLs, sitemap, OG tags, JSON-LD |
| `DATABASE_URL` | ✅ if you want the contact form + analytics | `postgresql://user:pass@host/db?sslmode=require` | Serverless DB connection (see §2) |

> If `NEXT_PUBLIC_SITE_URL` is missing, the build falls back to Netlify's auto-provided `URL`/`DEPLOY_PRIME_URL` (good for deploy previews), then to a hard default. Set it explicitly for production so Google indexes the final domain.
>
> **After changing env vars: trigger a fresh deploy** (metadata is baked in at build time).

## 2. Database options (contact form + analytics)

Netlify does not host PostgreSQL itself. Pick one — all work with the existing Drizzle setup:

**Option A — Netlify DB (recommended, least work)**
1. In the Netlify dashboard, add the **Neon / Netlify DB integration** for this site.
2. It provisions a managed Postgres and injects `DATABASE_URL` (and `NETLIFY_DATABASE_URL`) automatically.
3. If the variable is injected as `NETLIFY_DATABASE_URL` only, add a second env var `DATABASE_URL` with the same value.

**Option B — Neon / Supabase / Railway (external)**
1. Create a project, copy the **pooled** connection string (it contains `sslmode=require`).
2. Add it as `DATABASE_URL` in Netlify.

**Create the tables** (once, from your machine — no migrations needed, schema is pushed):
```bash
DATABASE_URL="your-production-connection-string" npx drizzle-kit push
```

**Behavior without a database:** the whole site still builds and serves perfectly; `/api/contact` answers `503` (the form shows the friendly "call us" error) and analytics events are silently skipped. `/api/health` reports `{ ok: true, db: false }`.

## 3. Reading contact messages & stats later

```bash
psql "your-production-connection-string" -c \
  "SELECT created_at, name, subject, message FROM contact_messages ORDER BY created_at DESC LIMIT 20;"
psql "your-production-connection-string" -c \
  "SELECT type, count(*) FROM analytics_events GROUP BY 1 ORDER BY 2 DESC;"
```

## 4. DNS & go-live checklist

1. Point the domain (e.g. `lagourmandisedesmoches.re`) in **Netlify → Domain management**; Netlify provisions the TLS certificate automatically.
2. Set `NEXT_PUBLIC_SITE_URL` to the final domain and **redeploy**.
3. Verify: `/sitemap.xml` shows the final domain · `/fr` and `/en` show correct `canonical`/`hreflang` · toggle FR|EN on a few pages.
4. Submit the sitemap in Google Search Console; create/verify the Google Business Profile with the exact NAP from `src/lib/data/business.ts` (see SEO_STRATEGY.md §3).

## 5. Deploy previews & branches

- Every pull request gets a preview URL; because the origin falls back to `DEPLOY_PRIME_URL`, metadata stays coherent on previews.
- A preview has no DB by default (contact form disabled, analytics skipped) — or point `DATABASE_URL` to a separate *dev* database, never production.

## 6. Notes specific to serverless

- The DB pool is lazy and small (`max: 3`, short idle timeout) — safe for serverless concurrency. No action needed.
- The contact-form rate limit is per-function-instance (best-effort anti-spam alongside the honeypot); upgrade path: Netlify's built-in spam filtering or reCAPTCHA if abuse appears.
- **The actual JPEGs are compiled into the build** from `src/assets/images/` via `src/lib/assets.ts`. Next emits them as immutable `/_next/static/media/*.jpg` files. `public/images/` remains a second direct-file fallback. No image prompt, generator, remote URL or runtime image optimizer is involved.

## 7. Image assets — self-healing deployment

**Context of the last incident:** the build previously failed with `Module not found: Can't resolve '@/assets/images/*.jpg'` because the binary JPEGs never reached Netlify — some upload channels (zip exports, manual file copies, some UIs) silently drop binary files while keeping text.

**The fix (self-heal, always active):** every image also exists as base64 **text** in `design-assets/base64/`, and `npm run build` automatically runs the `prebuild` hook (`scripts/prepare-images.mjs`) *before* Next.js compiles. It:

1. verifies every image in all three locations (`src/assets/images`, `public/images`, `design-assets/images`) against embedded SHA-256 hashes;
2. restores anything missing or corrupted from the base64 text copies;
3. fails loudly if — and only if — a base64 text file is also missing.

So Netlify builds succeed **even if the JPEG binaries never arrive**. This was tested by deleting all 30 binaries and running `npm run build` — the prebuild reconstructed every file, all SHA-256 verified, and the build passed.

**What must reach the repo at minimum:** the *text* files `design-assets/base64/*.b64`, `scripts/prepare-images.mjs`, `scripts/image-manifest.json`. Text survives every upload channel.

If you deploy with Git, also commit the binaries themselves (better for local dev):

```bash
git add -A
git commit -m "Full site: code, images (binary + base64 recovery set)"
git push
```

The repo also ships `.gitattributes` (marks `*.jpg` binary) and `.gitignore` (explicitly un-ignores all image folders). If images still get silently skipped, run `git check-ignore -v src/assets/images/confitures.jpg` to see which rule is excluding them.

**Local integrity checks:**
```bash
npm run check:images                  # verifies all 30 file locations against SHA-256
sha256sum -c design-assets/CHECKSUMS.sha256  # alternative shell check
```
