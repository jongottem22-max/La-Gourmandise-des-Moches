import { DEFAULT_LOCALE, LOCALES, type Lang } from "@/lib/data/business";
import { fr, type Dictionary } from "./fr";
import { en } from "./en";

export { DEFAULT_LOCALE, LOCALES };
export type { Lang, Dictionary };

const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function isLang(value: string): value is Lang {
  return (LOCALES as string[]).includes(value);
}

export function getDictionary(lang: string): Dictionary {
  return isLang(lang) ? dictionaries[lang] : dictionaries[DEFAULT_LOCALE];
}

export function resolveLang(lang: string): Lang {
  return isLang(lang) ? lang : DEFAULT_LOCALE;
}

/** Static paths shared by both locales (slugs are brand names / FR — kept for SEO consistency). */
export const STATIC_ROUTES = [
  "restaurant",
  "produits",
  "boutique-atelier",
  "anti-gaspillage",
  "ateliers",
  "territoire",
  "histoire",
  "galerie",
  "adhesion",
  "contact",
  "mentions-legales",
  "confidentialite",
] as const;

export type StaticRoute = (typeof STATIC_ROUTES)[number];

/** Primary navigation (order matters). Keys must exist in Dictionary["nav"]. */
export type NavKey =
  | "restaurant"
  | "produits"
  | "boutique"
  | "demarche"
  | "ateliers"
  | "territoire"
  | "histoire"
  | "galerie"
  | "adhesion"
  | "contact";

export const NAV_ROUTES: ReadonlyArray<{ route: StaticRoute; key: NavKey }> = [
  { route: "restaurant", key: "restaurant" },
  { route: "produits", key: "produits" },
  { route: "boutique-atelier", key: "boutique" },
  { route: "anti-gaspillage", key: "demarche" },
  { route: "ateliers", key: "ateliers" },
  { route: "territoire", key: "territoire" },
  { route: "histoire", key: "histoire" },
  { route: "adhesion", key: "adhesion" },
  { route: "contact", key: "contact" },
];

export function localizedPath(lang: Lang, route?: StaticRoute | ""): string {
  return route ? `/${lang}/${route}` : `/${lang}`;
}

/** Swap the locale segment of a pathname (used by the language switcher). */
export function pathWithLang(pathname: string, lang: Lang): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${lang}`;
  if (isLang(segments[0])) segments[0] = lang;
  else segments.unshift(lang);
  return `/${segments.join("/")}`;
}
