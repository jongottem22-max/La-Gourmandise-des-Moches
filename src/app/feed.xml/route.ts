import { BLOG_POSTS, plain } from "@/lib/data/blog";
import { LOCALES, localizedPath } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { absoluteUrl } from "@/lib/utils";

/**
 * RSS feed of the Journal, one per locale:
 *   /feed.xml            → French (default locale)
 *   /feed.xml?lang=en    → English
 * Prerendered at build time (`output: "export"`, force-static), so it works on
 * GitHub Pages exactly like the rest of the site.
 */
export const dynamic = "force-static";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET(request: Request) {
  const requested = new URL(request.url).searchParams.get("lang");
  const lang: "fr" | "en" = requested === "en" ? "en" : "fr";
  const journalUrl = absoluteUrl(localizedPath(lang, "journal"));
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const items = posts
    .map((post) => {
      const url = `${journalUrl}/${post.slug}`;
      return `    <item>
      <title>${escape(post.meta.title[lang])}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.publishedAt}T08:00:00Z`).toUTCString()}</pubDate>
      <category>${escape(post.category[lang])}</category>
      <description>${escape(plain(post.lead[lang]))}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`Le Journal — ${BUSINESS.name}`)}</title>
    <link>${journalUrl}</link>
    <atom:link href="${absoluteUrl(`/feed.xml${lang === "en" ? "?lang=en" : ""}`)}" rel="self" type="application/rss+xml" />
    <description>${escape(
      lang === "fr"
        ? "Bonnes adresses, recettes anti-gaspillage et nouvelles du restaurant à L'Entre-Deux, La Réunion."
        : "Local addresses, anti-waste recipes and restaurant news from L'Entre-Deux, Réunion Island.",
    )}</description>
    <language>${lang}</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
