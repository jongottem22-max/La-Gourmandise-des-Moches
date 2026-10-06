/**
 * Single source of truth for the association details confirmed in the supplied
 * catalogue, workshop flyer and documentary photos.
 */

export const BUSINESS = {
  name: "La Gourmandise des Moches",
  legal: {
    form: { fr: "Association loi 1901", en: "French non-profit association (loi 1901)" },
    siren: "919 056 135",
    foundedYear: 2022,
    foundedDisplay: { fr: "Fondée en août 2022", en: "Founded in August 2022" },
  },
  founder: "Sandra Ramaye",
  mission: {
    fr: "Sublimer les fruits et légumes dits « moches » et transformer les invendus en gourmandises maison.",
    en: "Celebrating so-called “ugly” fruit and vegetables by turning surplus produce into homemade treats.",
  },
  address: {
    street: "4A rue Fortuné Hoarau",
    postalCode: "97414",
    city: "L'Entre-Deux",
    island: "La Réunion",
    countryCode: "FR",
  },
  phone: {
    href: "tel:+262692553572",
    display: { fr: "06 92 55 35 72", en: "+262 692 55 35 72" },
  },
  email: "contactgourmandisedesmoches@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/lagourmandisedesmoches",
    facebook: "https://www.facebook.com/cuisinepei974",
    helloasso: "https://www.helloasso.com/associations/la-gourmandise-des-moches",
    instagramHandle: "@lagourmandisedesmoches",
    facebookName: "La Gourmandise Des Moches",
  },
  marketsNote: {
    fr: "Retrouvez-nous aussi sur différents marchés forains.",
    en: "You can also find us at different open-air markets.",
  },
  // Boutique opening hours used by the existing template; visitors are invited
  // to check social posts before travelling for exceptional closures.
  hours: {
    closedDay: "Saturday",
    daysOpen: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
    display: {
      fr: "Dimanche – vendredi · 9h – 17h",
      en: "Sunday – Friday · 9 am – 5 pm",
    },
    closedDisplay: { fr: "Fermé le samedi", en: "Closed on Saturdays" },
  },
  geo: { lat: -21.2339, lng: 55.4704 },
  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&query=La+Gourmandise+des+Moches,+4A+Rue+Fortun%C3%A9+Hoarau,+97414+L%27Entre-Deux,+La+Réunion",
    embed:
      "https://www.google.com/maps?q=4A%20Rue%20Fortun%C3%A9%20Hoarau,%2097414%20L%27Entre-Deux,%20La%20Réunion&output=embed",
  },
  napLine: {
    fr: "4A rue Fortuné Hoarau, 97414 Entre Deux, La Réunion",
    en: "4A rue Fortuné Hoarau, 97414 Entre Deux, Réunion Island",
  },
} as const;

export type Lang = "fr" | "en";
export const LOCALES: Lang[] = ["fr", "en"];
export const DEFAULT_LOCALE: Lang = "fr";
