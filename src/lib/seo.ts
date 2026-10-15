import { BUSINESS, type Lang } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import type { BlogPost } from "@/lib/data/blog";
import { getDictionary, localizedPath, type StaticRoute } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/utils";

const SOCIALS = Object.values(BUSINESS.socials);

/** Site-wide identity graph: Organization + the physical shop (Store). */
export function identityJsonLd(lang: Lang) {
  const dict = getDictionary(lang);
  const address = {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    postalCode: BUSINESS.address.postalCode,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.island,
    addressCountry: BUSINESS.address.countryCode,
  };
  const openingHoursSpecification = BUSINESS.hours.daysOpen.map((day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${day}`,
    opens: BUSINESS.hours.opens,
    closes: BUSINESS.hours.closes,
  }));
  return [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "NGO"],
      "@id": absoluteUrl("/#organization"),
      name: BUSINESS.name,
      description: dict.meta.description,
      url: absoluteUrl(`/${lang}`),
      email: BUSINESS.email,
      telephone: BUSINESS.phone.display.en.replaceAll(" ", ""),
      foundingDate: `${BUSINESS.legal.foundedYear}`,
      founder: { "@type": "Person", name: BUSINESS.founder },
      nonprofitStatus: "NonprofitType",
      sameAs: SOCIALS,
    },
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": absoluteUrl("/#boutique"),
      name: `${BUSINESS.name} — ${BUSINESS.address.city}`,
      description: dict.meta.description,
      url: absoluteUrl(`/${lang}`),
      telephone: "+262692553572",
      email: BUSINESS.email,
      image: absoluteUrl(IMAGES.boutique.src),
      priceRange: "€",
      currenciesAccepted: "EUR",
      address,
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.lat,
        longitude: BUSINESS.geo.lng,
      },
      openingHoursSpecification,
      sameAs: SOCIALS,
      parentOrganization: { "@id": absoluteUrl("/#organization") },
    },
  ];
}

export function webSiteJsonLd(lang: Lang) {
  const dict = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: dict.meta.siteName,
    url: absoluteUrl(""),
    inLanguage: ["fr", "en"],
  };
}

export function breadcrumbJsonLd(lang: Lang, items: Array<{ name: string; route?: StaticRoute | "" }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(lang, item.route ?? "")),
    })),
  };
}

export function itemListJsonLd(
  lang: Lang,
  entries: Array<{ name: string; description: string; image: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: e.name,
        description: e.description,
        image: absoluteUrl(e.image),
        url: absoluteUrl(e.url),
        brand: { "@type": "Brand", name: BUSINESS.name },
      },
    })),
  };
}

/**
 * Journal (blog) structured data.
 *
 * `BlogPosting` carries the editorial metadata search engines and AI answers
 * read (headline, dates, author, section), while `about` links the article to
 * the Restaurant entity of the same domain so the two reinforce each other.
 */
export function blogPostingJsonLd(lang: Lang, post: BlogPost) {
  const path = localizedPath(lang, "journal") + `/${post.slug}`;
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.meta.title[lang],
    description: post.meta.description[lang],
    inLanguage: lang,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: BUSINESS.name },
    publisher: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: BUSINESS.name },
    image: [absoluteUrl(post.hero.image.src)],
    articleSection: post.category[lang],
    keywords: post.tags.map((tag) => tag[lang]).join(", "),
    about: { "@type": "Restaurant", "@id": absoluteUrl("/#restaurant") },
    mentions: { "@type": "Store", "@id": absoluteUrl("/#boutique") },
    isPartOf: { "@type": "Blog", "@id": absoluteUrl(`${localizedPath(lang, "journal")}#blog`) },
    locationCreated: {
      "@type": "Place",
      name: `${BUSINESS.address.city}, ${BUSINESS.address.island}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.address.city,
        postalCode: BUSINESS.address.postalCode,
        addressRegion: BUSINESS.address.island,
        addressCountry: BUSINESS.address.countryCode,
      },
    },
  };
}

/** The Journal landing page, as a Blog entity listing its articles. */
export function blogJsonLd(lang: Lang, posts: BlogPost[]) {
  const url = absoluteUrl(localizedPath(lang, "journal"));
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: lang === "fr" ? `Le Journal — ${BUSINESS.name}` : `The Journal — ${BUSINESS.name}`,
    url,
    inLanguage: lang,
    publisher: { "@type": "Organization", "@id": absoluteUrl("/#organization") },
    blogPost: posts.map((post) => blogPostingJsonLd(lang, post)),
  };
}

/** FAQ block: valid markup for answer engines even where rich results are limited. */
export function faqJsonLd(entries: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: { "@type": "Answer", text: entry.a },
    })),
  };
}
