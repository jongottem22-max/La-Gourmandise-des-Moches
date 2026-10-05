import type { Metadata } from "next";
import { LOCALES, localizedPath, type Lang, type StaticRoute } from "@/lib/i18n";
import { IMAGES } from "@/lib/assets";
import { absoluteUrl } from "@/lib/utils";

/** Locale-aware metadata with canonical + hreflang alternates + OG. */
export function pageMetadata(lang: Lang, route: StaticRoute | "", title: string, description: string): Metadata {
  const canonical = absoluteUrl(localizedPath(lang, route));
  const languages = Object.fromEntries([
    ...LOCALES.map((l) => [l, absoluteUrl(localizedPath(l, route))]),
    ["x-default", absoluteUrl(localizedPath("fr", route))],
  ]);
  return {
    title,
    description: description.length > 158 ? `${description.slice(0, 155)}…` : description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: lang === "fr" ? "fr_RE" : "en_US",
      alternateLocale: lang === "fr" ? ["en_US"] : ["fr_RE"],
      images: [{ url: absoluteUrl(IMAGES.heroMoches.src), width: IMAGES.heroMoches.width, height: IMAGES.heroMoches.height }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
