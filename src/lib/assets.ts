import heroMoches from "@/assets/images/hero-moches.jpg";
import confitures from "@/assets/images/confitures.jpg";
import confituresFeatured from "@/assets/images/confitures-featured.png";
import ketchupBanane from "@/assets/images/ketchup-banane.jpg";
import achardsFeatured from "@/assets/images/achards-featured.png";
import ketchupSaucesFeatured from "@/assets/images/ketchup-sauces-featured.png";
import compotes from "@/assets/images/compotes.jpg";
import soupes from "@/assets/images/soupes.jpg";
import jusNectars from "@/assets/images/jus-nectars.jpg";
import sirops from "@/assets/images/sirops.jpg";
import atelierMains from "@/assets/images/atelier-mains.jpg";
import entreDeux from "@/assets/images/entre-deux.jpg";
import territoryDestination from "@/assets/images/territory-destination.png";
import boutique from "@/assets/images/boutique.jpg";

// Official brand and documentary photos supplied by the association.
import brandLogo from "@/assets/images/brand-logo.png";
import founderMarket from "@/assets/images/founder-market.jpg";
import heroMarket from "@/assets/images/hero-market.png";
import founderKitchen from "@/assets/images/founder-kitchen.png";
import photoDish from "@/assets/images/photo-dish.jpg";
// Web-optimised JPEG twins of the supplied documentary PNGs: same pixels, same
// dimensions, roughly 8× lighter (3.3 MB PNG → ~320 KB JPEG). They are the files
// every page serves; the PNG masters stay untouched in src/assets/images/ and
// public/images/ and are registered in the asset pipeline (see
// design-assets/IMAGE_ASSETS.md).
import restaurantMeal from "@/assets/images/restaurant-meal.jpg";
import restaurantExterior from "@/assets/images/restaurant-exterior.jpg";
import sorbetMaison from "@/assets/images/sorbet-maison.jpg";
import sorbetsFeatured from "@/assets/images/sorbets-featured.jpg";
import platMassaleBredes from "@/assets/images/plat-massale-bredes.jpg";
import bringelleEpices from "@/assets/images/bringelle-epices.jpg";
import workshopPoster from "@/assets/images/workshop-poster.jpg";

/**
 * Permanent, compile-time image assets. The supplied documentary photos are
 * used ahead of the original illustration placeholders wherever they fit.
 */
export const IMAGES = {
  heroMoches,
  confitures,
  confituresFeatured,
  ketchupBanane,
  achardsFeatured,
  ketchupSaucesFeatured,
  compotes,
  soupes,
  jusNectars,
  sirops,
  atelierMains,
  entreDeux,
  territoryDestination,
  boutique,
  brandLogo,
  founderMarket,
  heroMarket,
  founderKitchen,
  photoDish,
  restaurantMeal,
  // restaurant-page.png is byte-identical to restaurant-meal.png (SOURCES.md),
  // so both keys point at the same optimised file.
  restaurantPage: restaurantMeal,
  restaurantExterior,
  sorbetMaison,
  sorbetsFeatured,
  platMassaleBredes,
  bringelleEpices,
  workshopPoster,
} as const;
