import { BUSINESS, type Lang } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import { getDictionary, localizedPath, type StaticRoute } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/utils";

const SOCIALS = Object.values(BUSINESS.socials);

/** Site-wide identity graph: Organization + the physical shop (Store). */
export function identityJsonLd(lang: Lang) {
  const dict = getDictionary(lang);
  const address = {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.address.street}, ${BUSINESS.address.place}`,
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
      name: `${BUSINESS.name} — ${BUSINESS.address.place}`,
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
