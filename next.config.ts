import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * Until the custom domain https://gourmandisedesmoches.fr is pointed at Pages
 * (DNS at GoDaddy), the site is served from
 * https://jongottem22-max.github.io/La-Gourmandise-des-Moches/ — so the Pages
 * workflow builds with NEXT_PUBLIC_BASE_PATH=/La-Gourmandise-des-Moches.
 * Once the apex domain is live the workflow rebuilds with it empty and every
 * URL becomes root-relative again. The variable is inlined at build time, so
 * all generated HTML carries the right prefix automatically.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Directory-style URLs (/fr/, /fr/produits/) that GitHub Pages serves as
  // plain index.html files — no server involved.
  trailingSlash: true,
  basePath,
  // Preview iframe is served from *.e2b.app, not localhost (dev mode only).
  allowedDevOrigins: ["*.e2b.app", "127.0.0.1", "localhost"],
  images: {
    /**
     * Serve statically imported JPEGs directly from `/_next/static/media`.
     * The real files live in `src/assets/images` and are compiled into every
     * deployment artifact; `public/images` remains a direct-file fallback.
     * The runtime optimizer doesn't exist on static hosting anyway.
     */
    unoptimized: true,
  },
};

export default nextConfig;
