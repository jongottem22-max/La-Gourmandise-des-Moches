import type { MetadataRoute } from "next";
import { LOCALES, localizedPath, STATIC_ROUTES } from "@/lib/i18n";
import { getPostsByDate } from "@/lib/data/blog";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

/** hreflang alternates for a path shared by both locales. */
function alternatesFor(pathFor: (lang: (typeof LOCALES)[number]) => string) {
  return {
    languages: Object.fromEntries([
      ...LOCALES.map((lang) => [lang, absoluteUrl(pathFor(lang))]),
      ["x-default", absoluteUrl(pathFor("fr"))],
    ]),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // The gallery remains available in the source for later, but is hidden from
  // the public sitemap while the page is being held back.
  const routes = ["", ...STATIC_ROUTES.filter((route) => route !== "galerie")] as const;
  const posts = getPostsByDate();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((lang) =>
    routes.map((route) => ({
      url: absoluteUrl(localizedPath(lang, route)),
      lastModified,
      changeFrequency: route === "" ? "weekly" : route === "journal" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "journal" ? 0.9 : 0.8,
      alternates: alternatesFor((l) => localizedPath(l, route)),
    })),
  );

  // Journal hub + every article, in both locales.
  const journalEntries: MetadataRoute.Sitemap = LOCALES.flatMap((lang) => [
    {
      url: absoluteUrl(localizedPath(lang, "journal")),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: alternatesFor((l) => localizedPath(l, "journal")),
    },
    ...posts.map((post) => {
      const published = new Date(`${post.publishedAt}T00:00:00Z`);
      return {
        url: absoluteUrl(`${localizedPath(lang, "journal")}/${post.slug}`),
        lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
        changeFrequency: "monthly" as const,
        priority: published.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 90 ? 0.9 : 0.7,
        alternates: alternatesFor((l) => `${localizedPath(l, "journal")}/${post.slug}`),
      };
    }),
  ]);

  return [...staticEntries, ...journalEntries];
}
