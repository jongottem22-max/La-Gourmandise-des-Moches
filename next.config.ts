import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preview iframe is served from *.e2b.app, not localhost.
  allowedDevOrigins: ["*.e2b.app", "127.0.0.1", "localhost"],
  async redirects() {
    return [
      // Always open the site itself. A phone frame around an iframe made the
      // hamburger visible but untappable in the live preview.
      {
        source: "/",
        destination: "/fr",
        permanent: false,
      },
    ];
  },
  images: {
    /**
     * Serve statically imported JPEGs directly from `/_next/static/media`.
     * The real files live in `src/assets/images` and are compiled into every
     * deployment artifact; `public/images` remains a direct-file fallback.
     * Skipping the runtime optimizer removes the most common Netlify failure
     * mode (`/_next/image` not responding) while preserving responsive CSS.
     */
    unoptimized: true,
  },
};

export default nextConfig;
