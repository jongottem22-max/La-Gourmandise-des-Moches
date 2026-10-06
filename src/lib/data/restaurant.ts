/**
 * Restaurant anti-gaspi — VERIFIED facts only.
 * Source: Linfo.re, interview "6/8 Ansanm", 13 May 2026 (see RESEARCH_REPORT.md §3).
 *
 * Deliberately NOT published (unverified): exact street address, exact days/hours,
 * full menu. The site says "à l'entrée du village" and routes people to the phone.
 * When the business confirms them, fill the fields below and the site updates itself.
 */

export const RESTAURANT = {
  /** Single price per meal, in euros — verified. */
  priceEur: 8,
  /** Lunch service on site + takeaway — verified. */
  service: { lunch: true, takeaway: true },
  /**
   * Confirmed by the business: the whole menu is vegan, vegetarian and gluten-free.
   * Not a “often vegan” kitchen — every plate meets all three.
   */
  diet: {
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    label: {
      fr: "100 % vegan, végétarien et sans gluten",
      en: "100% vegan, vegetarian and gluten-free",
    },
  },
  /** Located at the entrance of L'Entre-Deux village — verified (street number not published). */
  locationHint: {
    fr: "À l'entrée du village de L'Entre-Deux",
    en: "At the entrance of L'Entre-Deux village",
  },
  /** Fill in once confirmed by the business; null keeps the site honest. */
  exactAddress: null as string | null,
  openingHours: null as string | null,

  /** Homemade dessert confirmed by the business: sorbet / ice cream, vegan and gluten-free. */
  sorbet: {
    name: {
      fr: "Sorbet maison, vegan et sans gluten",
      en: "Homemade sorbet, vegan and gluten-free",
    },
    note: {
      fr: "Notre glace maison, préparée avec les fruits péi sauvés du gâchis : 100 % vegan et sans gluten, comme toute la carte.",
      en: "Our homemade ice cream, churned from rescued local fruit: 100% vegan and gluten-free, like everything else on the menu.",
    },
  },

  /** The only dish documented in the press — no invented menu items. */
  signatureDish: {
    name: {
      fr: "Carry de peaux de bananes aux lentilles corail",
      en: "Banana-peel curry with red lentils",
    },
    note: {
      fr: "L'exemple cité par Sandra : des épluchures que tout le monde jette deviennent un carry généreux.",
      en: "Sandra's own example: the peels everyone throws away become a generous curry.",
    },
  },
} as const;
