import type { MetadataRoute } from "next";
import { LOCALES, localizedPath, STATIC_ROUTES } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  // The gallery remains available in the source for later, but is hidden from
  // the public sitemap while the page is being held back.
  const routes = ["", ...STATIC_ROUTES.filter((route) => route !== "galerie")] as const;
  const lastModified = new Date();
  return LOCALES.flatMap((lang) =>
    routes.map((route) => ({
      url: absoluteUrl(localizedPath(lang, route)),
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries([
          ...LOCALES.map((l) => [l, absoluteUrl(localizedPath(l, route))]),
          ["x-default", absoluteUrl(localizedPath("fr", route))],
        ]),
      },
    })),
  );
}
