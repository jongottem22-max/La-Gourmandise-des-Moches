/**
 * Journal (blog) content.
 *
 * Editorial rules (see CONTENT_GUIDE.md §2): only verified facts. The restaurant
 * street address is deliberately NOT published — visitors are routed to the
 * phone, exactly like /restaurant does. The menu is never invented: only the
 * documented dish and the confirmed diet/price/hours are published.
 *
 * Long-form bodies live here (not in the i18n dictionaries, which cover UI
 * strings) because each post is a self-contained editorial object with its own
 * metadata, keywords, FAQ and internal links — the same pattern as products.ts
 * and restaurant.ts. FR is the source language, EN is an adapted translation.
 *
 * Inline markup understood by the renderer (BlogArticle.tsx):
 *   **bold**            → <strong>
 *   [label](href)       → internal <Link> (/fr/..., use {lang} for the locale)
 *                         or external <a> for absolute URLs
 */

import type { StaticImageData } from "next/image";
import { IMAGES } from "@/lib/assets";
import type { StaticRoute } from "@/lib/i18n";

export type LocaleText = { fr: string; en: string };

export type BlogBlock =
  | { type: "p"; text: LocaleText }
  | { type: "h2"; id: string; text: LocaleText }
  | { type: "h3"; text: LocaleText }
  | { type: "list"; items: { fr: string[]; en: string[] }; ordered?: boolean }
  | { type: "callout"; tone: "leaf" | "tomato" | "mango"; title?: LocaleText; text: LocaleText }
  | { type: "quote"; text: LocaleText; source: LocaleText }
  | { type: "figure"; image: StaticImageData; alt: LocaleText; caption: LocaleText };

export type BlogFaq = { q: LocaleText; a: LocaleText };

export type BlogPost = {
  slug: string;
  /** ISO date, published in both locales. */
  publishedAt: string;
  updatedAt?: string;
  category: LocaleText;
  /** Visible tag list — the long-tail keyword set of the article. */
  tags: LocaleText[];
  /** SEO metadata (title tag, meta description, keywords meta). */
  meta: {
    title: LocaleText;
    description: LocaleText;
    keywords: LocaleText;
  };
  /** <h1> of the article page. */
  h1: LocaleText;
  /** Answer-first introduction — written for featured snippets. */
  lead: LocaleText;
  /** Quick-answer box: the facts people search for before visiting. */
  facts: Array<{ label: LocaleText; value: LocaleText }>;
  hero: { image: StaticImageData; alt: LocaleText; caption: LocaleText };
  body: BlogBlock[];
  faq: BlogFaq[];
  /** Internal links, rendered as a "read next" block. */
  related: Array<{ route: StaticRoute; label: LocaleText }>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "restaurant-entre-deux-vegan-sans-gluten",
    publishedAt: "2026-10-15",
    category: { fr: "Le restaurant", en: "The restaurant" },
    tags: [
      { fr: "Restaurant L'Entre-Deux", en: "Restaurant L'Entre-Deux" },
      { fr: "Où manger à L'Entre-Deux", en: "Where to eat in L'Entre-Deux" },
      { fr: "Restaurant vegan La Réunion", en: "Vegan restaurant Réunion Island" },
      { fr: "Restaurant sans gluten La Réunion", en: "Gluten-free restaurant Réunion Island" },
      { fr: "Cuisine péi", en: "Local Réunionnais cooking" },
      { fr: "Anti-gaspillage", en: "Anti-food-waste" },
      { fr: "Sud sauvage", en: "Sud sauvage" },
      { fr: "Que faire à L'Entre-Deux", en: "Things to do in L'Entre-Deux" },
    ],
    meta: {
      title: {
        fr: "Restaurant à L'Entre-Deux : vegan, sans gluten, 8 €",
        en: "Restaurant in L'Entre-Deux: vegan, gluten-free, €8",
      },
      description: {
        fr: "Où manger à L'Entre-Deux ? Restaurant anti-gaspi 100 % vegan, végétarien et sans gluten, repas à 8 €, du dimanche au vendredi, sur place ou à emporter.",
        en: "Where to eat in L'Entre-Deux? An anti-waste restaurant, 100% vegan, vegetarian and gluten-free, €8 meals, Sunday to Friday, eat in or take away.",
      },
      keywords: {
        fr: "restaurant L'Entre-Deux, où manger à L'Entre-Deux, restaurant vegan La Réunion, restaurant sans gluten La Réunion, restaurant végétarien 974, repas pas cher Réunion, restaurant anti-gaspi La Réunion, cuisine péi, produits péi, Sud sauvage, manger local La Réunion, déjeuner à emporter L'Entre-Deux, boutique artisanale L'Entre-Deux",
        en: "restaurant L'Entre-Deux, where to eat L'Entre-Deux, vegan restaurant Réunion Island, gluten-free restaurant Réunion Island, cheap lunch Réunion, anti-food-waste restaurant, local food Réunion, Sud sauvage, things to do in L'Entre-Deux, takeaway lunch Réunion",
      },
    },
    h1: {
      fr: "Où manger à L'Entre-Deux ? Poussez la porte du restaurant des « moches »",
      en: "Where to eat in L'Entre-Deux? Step into the restaurant that cooks the “ugly” ones",
    },
    lead: {
      fr: "Vous cherchez où manger à L'Entre-Deux sans vous ruiner, sans viande, sans gluten — et sans renoncer au goût ? Le restaurant de La Gourmandise des Moches sert chaque midi une cuisine péi 100 % vegan, végétarienne et sans gluten, cuisinée avec des fruits et légumes sauvés du gaspillage. Un seul prix : **8 € le repas**. Du dimanche au vendredi, de 11h30 à 15h30, sur place ou à emporter.",
      en: "Looking for somewhere to eat in L'Entre-Deux that is meat-free, gluten-free and still full of flavour — without emptying your wallet? Every lunchtime, the La Gourmandise des Moches restaurant serves 100% vegan, vegetarian and gluten-free Réunionnais cooking, made with fruit and vegetables rescued from waste. One single price: **€8 a meal**. Sunday to Friday, 11.30 am to 3.30 pm, eat in or take away.",
    },
    facts: [
      { label: { fr: "Où", en: "Where" }, value: { fr: "À l'entrée du village de L'Entre-Deux, La Réunion", en: "At the entrance of L'Entre-Deux village, Réunion Island" } },
      { label: { fr: "Quand", en: "When" }, value: { fr: "Dimanche – vendredi · 11h30 – 15h30 (fermé le samedi)", en: "Sunday – Friday · 11.30 am – 3.30 pm (closed Saturdays)" } },
      { label: { fr: "Combien", en: "How much" }, value: { fr: "8 € le repas, prix unique", en: "€8 per meal, one single price" } },
      { label: { fr: "Régimes", en: "Diets" }, value: { fr: "100 % vegan, végétarien et sans gluten", en: "100% vegan, vegetarian and gluten-free" } },
      { label: { fr: "Sur place ou à emporter", en: "Eat in or take away" }, value: { fr: "06 92 55 35 72", en: "+262 692 55 35 72" } },
    ],
    hero: {
      image: IMAGES.restaurantExterior,
      alt: {
        fr: "Le restaurant de La Gourmandise des Moches à L'Entre-Deux, terrasse et auvent vert",
        en: "La Gourmandise des Moches restaurant in L'Entre-Deux, terrace and green awning",
      },
      caption: {
        fr: "À l'entrée du village de L'Entre-Deux : le restaurant, sa terrasse et sa route de montagne.",
        en: "At the entrance of L'Entre-Deux village: the restaurant, its terrace and the mountain road.",
      },
    },
    body: [
      {
        type: "p",
        text: {
          fr: "L'Entre-Deux est un village créole posé entre deux ravines, à une douzaine de kilomètres de Saint-Louis et une vingtaine de Saint-Pierre, à la porte du **Sud sauvage**. On y vient pour les cases colorées, les sentiers du Dimitile, l'artisanat et — de plus en plus — pour manger. Depuis 2022, l'association La Gourmandise des Moches y transforme les invendus des producteurs péi en confitures, sirops, achards et chutneys. En 2026, Sandra Ramaye a franchi une étape : ouvrir un restaurant. Une vraie table, à l'entrée du village, qui sert chaud ce que les circuits classiques refusent.",
          en: "L'Entre-Deux is a Creole village set between two ravines, a dozen kilometres from Saint-Louis and around twenty from Saint-Pierre, at the gateway to the **wild south** of Réunion Island. People come for the colourful houses, the Dimitile trails, the crafts — and, more and more, to eat. Since 2022 the La Gourmandise des Moches association has been turning local growers' surplus into jams, syrups, pickles and chutneys here. In 2026 Sandra Ramaye took the next step: opening a restaurant. A real table, at the entrance of the village, serving hot what ordinary supply chains reject.",
        },
      },
      {
        type: "p",
        text: {
          fr: "Si vous tapez « restaurant L'Entre-Deux » ou « où manger à L'Entre-Deux » dans votre moteur de recherche, vous êtes au bon endroit. Voici tout ce qu'il faut savoir avant de venir : la cuisine, les horaires, le prix, les régimes alimentaires, et ce qu'on peut faire autour — parce qu'un bon déjeuner mérite une bonne balade.",
          en: "If you typed “restaurant L'Entre-Deux” or “where to eat in L'Entre-Deux” into a search engine, you are in the right place. Here is everything to know before you come: the food, the hours, the price, the diets — and what to do nearby, because a good lunch deserves a good walk.",
        },
      },
      {
        type: "callout",
        tone: "leaf",
        title: { fr: "L'essentiel en cinq secondes", en: "The essentials in five seconds" },
        text: {
          fr: "Restaurant anti-gaspi à l'entrée de L'Entre-Deux · 100 % vegan, végétarien et sans gluten · 8 € le repas, prix unique · dimanche – vendredi, 11h30 – 15h30 · sur place ou à emporter · réservation et plat du jour au [06 92 55 35 72](tel:+262692553572).",
          en: "Anti-waste restaurant at the entrance of L'Entre-Deux · 100% vegan, vegetarian and gluten-free · €8 per meal, one price · Sunday – Friday, 11.30 am – 3.30 pm · eat in or take away · today's dish and bookings on [+262 692 55 35 72](tel:+262692553572).",
        },
      },
      {
        type: "h2",
        id: "un-restaurant-qui-cuisine-les-moches",
        text: { fr: "Un restaurant qui cuisine les « moches », pas les invendus du frigo", en: "A restaurant that cooks the “ugly” ones, not the leftovers" },
      },
      {
        type: "p",
        text: {
          fr: "Le principe tient en une phrase : **« moche dehors, merveilleux dedans »**. Bananes tachées, bringelles biscornues, tomates tordues, agrumes hors calibre : tout ce qui ne trouve pas preneur sur les étals part à l'atelier, et une partie finit dans les assiettes du restaurant. Rien n'est « abîmé » : c'est du produit frais, mûr à point, simplement refusé pour des raisons esthétiques ou de calibre.",
          en: "The idea fits in one line: **“ugly outside, wonderful inside”**. Spotted bananas, crooked aubergines, misshapen tomatoes, off-calibre citrus: everything the market stalls turn down goes to the workshop, and part of it ends up on the restaurant's plates. None of it is “spoiled” — it is fresh produce, perfectly ripe, rejected only for looks or size.",
        },
      },
      {
        type: "p",
        text: {
          fr: "Concrètement, ça change quoi dans l'assiette ? Une cuisine réunionnaise inventive, franchement péi, qui suit la saison plutôt qu'un menu imprimé une fois pour toutes. Le restaurant achète ses fruits et légumes aux agriculteurs, coopératives et bazardiers locaux ; ce que la semaine a sauvé décide de ce que vous mangerez. C'est aussi ce qui rend chaque service différent du précédent.",
          en: "What does that change on the plate? Inventive, unmistakably local Réunionnais cooking that follows the season instead of a menu printed once and for all. The restaurant buys its fruit and vegetables from local farmers, cooperatives and market sellers; whatever the week rescued decides what you eat. It is also what makes every service different from the last.",
        },
      },
      {
        type: "quote",
        text: {
          fr: "« Tout l'argent que nous gagnons repart dans le circuit. »",
          en: "“All the money we earn goes straight back into the circuit.”",
        },
        source: { fr: "Sandra Ramaye, fondatrice — interview Linfo.re", en: "Sandra Ramaye, founder — Linfo.re interview" },
      },
      {
        type: "h2",
        id: "huit-euros-le-repas",
        text: { fr: "8 € le repas : un prix unique, pour que la table reste ouverte à tous", en: "€8 a meal: one single price, so the table stays open to everyone" },
      },
      {
        type: "p",
        text: {
          fr: "Ici, pas de carte à rallonge ni de supplément qui grimpe à l'addition : **tous les repas sont au même tarif**, 8 €. C'est un choix de l'association, pas une promotion. Manger péi, local, sans viande ni gluten, pour le prix d'un sandwich urbain : voilà l'idée. Le restaurant est ouvert à tous — ouvriers du bâtiment, familles, randonneurs, visiteurs de passage et habitués du village s'y croisent à la même table.",
          en: "No endless menu here and no supplement creeping onto the bill: **every meal costs the same**, €8. It is a deliberate choice by the association, not a special offer. Local food, meat- and gluten-free, for the price of a city sandwich: that is the idea. The restaurant is open to everyone — builders, families, hikers, passing visitors and village regulars all cross paths at the same table.",
        },
      },
      {
        type: "p",
        text: {
          fr: "Ce prix unique a une raison simple : le restaurant finance la démarche. Il achète les surplus aux producteurs, couvre les charges et les salaires, et permet à l'association de poursuivre son travail d'insertion professionnelle. Manger ici, c'est faire tourner la boucle : le déjeuner que vous payez hier est un panier d'invendus racheté aujourd'hui.",
          en: "That single price has a simple reason: the restaurant funds the whole approach. It buys surplus from growers, covers running costs and wages, and lets the association carry on its inclusion work. Eating here keeps the loop turning: the lunch you pay for is a crate of surplus bought back from a grower.",
        },
      },
      {
        type: "figure",
        image: IMAGES.restaurantMeal,
        alt: {
          fr: "Repas vegan et sans gluten servi en terrasse à L'Entre-Deux : riz, légumes et carry",
          en: "Vegan, gluten-free meal served on the terrace in L'Entre-Deux: rice, greens and curry",
        },
        caption: {
          fr: "Un déjeuner complet à 8 € : riz, légumes péi et carry du jour, en terrasse face à la route de montagne.",
          en: "A full €8 lunch: rice, local vegetables and the day's curry, on the terrace by the mountain road.",
        },
      },
      {
        type: "h2",
        id: "vegan-vegetarien-sans-gluten",
        text: { fr: "100 % vegan, végétarien et sans gluten — sans faire de bruit", en: "100% vegan, vegetarian and gluten-free — without making a fuss" },
      },
      {
        type: "p",
        text: {
          fr: "C'est sans doute ce qui surprend le plus : **toute la carte est vegan, végétarienne et sans gluten**. Pas une option « de temps en temps », pas un plat de secours dans un coin du menu — chaque assiette servie respecte les trois à la fois. Une adresse rare à La Réunion, et une bonne nouvelle si vous cherchez un [restaurant vegan ou un restaurant sans gluten dans le Sud](/fr/restaurant).",
          en: "This is probably the most surprising thing: **the entire menu is vegan, vegetarian and gluten-free**. Not an occasional option, not a fallback dish tucked in a corner — every plate served respects all three at once. A rare find on Réunion Island, and good news if you are looking for a [vegan or gluten-free restaurant in the south](/en/restaurant).",
        },
      },
      {
        type: "p",
        text: {
          fr: "Le dessert suit la même règle : le **sorbet maison** est préparé avec les fruits péi sauvés du gâchis, et il est vegan et sans gluten comme le reste. Les parfums changent au rythme des sauvetages — mangue, ananas, agrumes, goyave, selon ce que l'atelier a reçu. Pour une famille ou un groupe d'amis aux régimes différents, c'est aussi la promesse de ne pas passer la commande à la carte pour savoir qui pourra manger quoi.",
          en: "Dessert follows the same rule: the **homemade sorbet** is churned from rescued local fruit and is vegan and gluten-free like everything else. Flavours change with each rescue — mango, pineapple, citrus, guava, depending on what reached the workshop. For a family or a group of friends with different diets, it also means nobody has to study the menu to work out who can eat what.",
        },
      },
      {
        type: "figure",
        image: IMAGES.sorbetMaison,
        alt: {
          fr: "Sorbet maison vegan et sans gluten aux fruits péi, servi au restaurant de L'Entre-Deux",
          en: "Homemade vegan, gluten-free local fruit sorbet served at the L'Entre-Deux restaurant",
        },
        caption: {
          fr: "Le sorbet maison, vegan et sans gluten : la fin de repas qui ne s'improvise pas à l'avance.",
          en: "The homemade sorbet, vegan and gluten-free: a dessert that can't be planned ahead.",
        },
      },
      {
        type: "h2",
        id: "au-menu-ce-que-la-semaine-a-sauve",
        text: { fr: "Au menu : ce que la semaine a sauvé", en: "On the menu: whatever the week rescued" },
      },
      {
        type: "p",
        text: {
          fr: "Le menu n'est pas figé et c'est volontaire : il dépend de ce que les producteurs et bazardiers avaient à sauver cette semaine-là. Le plat du jour s'annonce par téléphone et sur les réseaux — un coup de fil au [06 92 55 35 72](tel:+262692553572) et vous savez exactement ce qui vous attend avant de prendre la route.",
          en: "The menu is not fixed, on purpose: it depends on what growers and market sellers had to rescue that week. The dish of the day is announced by phone and on social media — one call to [+262 692 55 35 72](tel:+262692553572) and you know exactly what is waiting before you set off.",
        },
      },
      {
        type: "p",
        text: {
          fr: "Un exemple qui résume tout, cité par Sandra dans la presse : le **carry de peaux de bananes aux lentilles corail**. Oui, les épluchures que tout le monde jette — et oui, c'est délicieux. C'est la meilleure démonstration de la démarche : ce qu'on considère comme un déchet est souvent juste un ingrédient qu'on n'a pas encore appris à cuisiner.",
          en: "One example sums it all up, quoted by Sandra in the press: **banana-peel curry with red lentils**. Yes, the peels everyone throws away — and yes, it is delicious. It is the clearest demonstration of the approach: what we call waste is often just an ingredient we have not learned to cook yet.",
        },
      },
      {
        type: "list",
        items: {
          fr: [
            "Le carry du jour, servi avec riz et légumes péi",
            "Des plats végétaux complets, pensés pour rassasier — pas des accompagnements",
            "Le sorbet maison en dessert, vegan et sans gluten",
            "Un seul prix pour l'ensemble : 8 €",
          ],
          en: [
            "The curry of the day, served with rice and local vegetables",
            "Complete plant-based plates designed to fill you up — not side dishes",
            "Homemade sorbet for dessert, vegan and gluten-free",
            "One single price for all of it: €8",
          ],
        },
      },
      {
        type: "h2",
        id: "horaires-et-infos-pratiques",
        text: { fr: "Horaires, accès et service : les infos pratiques", en: "Hours, access and service: the practical details" },
      },
      {
        type: "p",
        text: {
          fr: "Le service du midi est ouvert **du dimanche au vendredi, de 11h30 à 15h30**. Le restaurant est **fermé le samedi**. Bon réflexe : arriver avant 15h, parce qu'ici on cuisine ce qui a été sauvé — quand le plat du jour est fini, il est fini.",
          en: "Lunch is served **Sunday to Friday, 11.30 am to 3.30 pm**. The restaurant is **closed on Saturdays**. Good habit: come before 3 pm, because here we cook whatever was rescued — when the dish of the day is gone, it is gone.",
        },
      },
      {
        type: "list",
        items: {
          fr: [
            "Sur place, en terrasse ou à l'intérieur, ou **à emporter** pour un pique-nique dans les Hauts",
            "À l'entrée du village de L'Entre-Deux — appelez si vous cherchez l'adresse exacte : un appel vous guide",
            "Le [village](/fr/territoire) est à environ 12 km de Saint-Louis et 20 km de Saint-Pierre, par la route de L'Entre-Deux",
            "Autour du restaurant : l'[atelier-boutique](/fr/boutique-atelier), les cases créoles du bourg, le départ des sentiers du Dimitile",
          ],
          en: [
            "Eat in — terrace or indoors — or **take away** for a picnic in the highlands",
            "At the entrance of L'Entre-Deux village — call if you need the exact address and we will guide you",
            "The [village](/en/territoire) is about 12 km from Saint-Louis and 20 km from Saint-Pierre, along the L'Entre-Deux road",
            "Around the restaurant: the [shop and workshop](/en/boutique-atelier), the village's Creole houses, the start of the Dimitile trails",
          ],
        },
      },
      {
        type: "callout",
        tone: "tomato",
        title: { fr: "Un doute avant de vous déplacer ?", en: "Not sure before you set off?" },
        text: {
          fr: "Le restaurant est récent et les jours fériés bousculent le calendrier : un appel au [06 92 55 35 72](tel:+262692553572) confirme les horaires, le plat du jour et les possibilités de réservation. Vous pouvez aussi écrire à [contactgourmandisedesmoches@gmail.com](mailto:contactgourmandisedesmoches@gmail.com) ou passer par la [page contact](/fr/contact).",
          en: "The restaurant is new and public holidays shake up the calendar: a call to [+262 692 55 35 72](tel:+262692553572) confirms the hours, the dish of the day and what is possible for bookings. You can also email [contactgourmandisedesmoches@gmail.com](mailto:contactgourmandisedesmoches@gmail.com) or use the [contact page](/en/contact).",
        },
      },
      {
        type: "h2",
        id: "pourquoi-ca-change-quelque-chose",
        text: { fr: "Pourquoi déjeuner ici change quelque chose", en: "Why having lunch here changes something" },
      },
      {
        type: "p",
        text: {
          fr: "La Gourmandise des Moches est une **association loi 1901** fondée en août 2022, pas une enseigne classique. Trois impacts concrets, vérifiables, se jouent à chaque service :",
          en: "La Gourmandise des Moches is a **French non-profit association** founded in August 2022, not a standard restaurant chain. Three concrete, verifiable impacts happen at every service:",
        },
      },
      {
        type: "list",
        ordered: true,
        items: {
          fr: [
            "**Le gaspillage recule.** Les invendus sont rachetés — pas récupérés gratuitement —, transformés et servis, au lieu de finir en décharge.",
            "**Les producteurs sont payés.** Agriculteurs, coopératives et bazardiers péi trouvent un débouché pour leur « trop-plein », y compris en pleine saison haute.",
            "**Des emplois se créent.** Le restaurant finance les charges et les salaires, et l'association en fait un outil d'insertion professionnelle.",
          ],
          en: [
            "**Waste goes down.** Surplus is bought — not collected for free — then transformed and served instead of going to landfill.",
            "**Growers get paid.** Local farmers, cooperatives and market sellers find an outlet for their surplus, peak season included.",
            "**Jobs are created.** The restaurant covers running costs and wages, and the association uses it as a path back into work.",
          ],
        },
      },
      {
        type: "p",
        text: {
          fr: "Cette logique s'appelle le **circuit court** — et à L'Entre-Deux, elle se goûte. Si le sujet vous intéresse, notre page [anti-gaspillage](/fr/anti-gaspillage) détaille chaque étape, du champ au bocal, et vous pouvez [devenir membre de l'association](/fr/adhesion) gratuitement.",
          en: "That logic is called the **short supply chain** — and in L'Entre-Deux you can taste it. If the topic interests you, our [anti-waste page](/en/anti-gaspillage) details every step, from field to jar, and you can [join the association](/en/adhesion) for free.",
        },
      },
      {
        type: "h2",
        id: "apres-le-repas-la-boutique",
        text: { fr: "Après le repas : la boutique-atelier, à quelques pas", en: "After lunch: the shop and workshop, a few steps away" },
      },
      {
        type: "p",
        text: {
          fr: "Un déjeuner au restaurant, c'est la version chaude de la démarche. La version à emporter chez soi, c'est l'**[atelier-boutique](/fr/boutique-atelier)**, au 4A rue Fortuné Hoarau, dans le village : confitures artisanales de La Réunion (et notamment la fameuse confiture de banane), ketchup de banane, chutneys, achards, soupes, nectars, sirops et compotes du moment.",
          en: "Lunch at the restaurant is the hot version of the approach. The take-home version is the **[shop and workshop](/en/boutique-atelier)** at 4A rue Fortuné Hoarau, in the village: artisanal Réunion jams (the famous banana jam included), banana ketchup, chutneys, pickles, soups, nectars, syrups and compotes of the moment.",
        },
      },
      {
        type: "list",
        items: {
          fr: [
            "Ouvert **du dimanche au vendredi, de 9h à 17h** — fermé le samedi, comme le restaurant",
            "Les [bocaux et produits](/fr/produits) changent selon les sauvetages de la saison",
            "Le lieu accueille aussi les [ateliers confiture](/fr/ateliers) et les groupes",
            "Idéal pour rapporter un souvenir péi aux visiteurs de passage",
          ],
          en: [
            "Open **Sunday to Friday, 9 am to 5 pm** — closed on Saturdays, like the restaurant",
            "The [jars and products](/en/produits) change with each season's rescues",
            "The venue also hosts the [jam workshops](/en/ateliers) and groups",
            "Ideal to bring a local gift back for visiting friends",
          ],
        },
      },
      {
        type: "h2",
        id: "que-faire-autour",
        text: { fr: "Que faire à L'Entre-Deux autour du restaurant ?", en: "What to do around the restaurant in L'Entre-Deux" },
      },
      {
        type: "p",
        text: {
          fr: "L'Entre-Deux est un point de départ idéal pour une journée dans les Hauts du Sud. Le déjeuner cale le programme, la marche le justifie :",
          en: "L'Entre-Deux is an ideal starting point for a day in the southern highlands. Lunch shapes the plan, the walk justifies it:",
        },
      },
      {
        type: "list",
        items: {
          fr: [
            "**Le village créole** : cases colorées, jardins créoles, artisans du choca, de la paille de chouchou et du café — une visite guidée part de l'office de tourisme.",
            "**Le Dimitile** : le massif qui domine L'Entre-Deux, avec un panorama sur le cirque de Cilaos. Plusieurs sentiers, du familial au sportif.",
            "**Les ravines et le pont du Bras de la Plaine** : l'accès spectaculaire au village, à environ 150 m au-dessus de la ravine.",
            "**Le Sud sauvage** : Saint-Louis et Saint-Pierre sont à 12 et 20 km — plage, marché et front de mer pour l'après-midi.",
          ],
          en: [
            "**The Creole village**: colourful houses, Creole gardens, makers of choca fibre, chouchou straw and coffee — a guided tour leaves from the tourist office.",
            "**The Dimitile**: the massif above L'Entre-Deux, with a panorama over the Cilaos cirque. Several trails, from family-friendly to sporty.",
            "**The ravines and the Bras de la Plaine bridge**: the dramatic approach to the village, some 150 m above the ravine.",
            "**The wild south**: Saint-Louis and Saint-Pierre are 12 and 20 km away — beach, market and seafront for the afternoon.",
          ],
        },
      },
      {
        type: "p",
        text: {
          fr: "Autrement dit : un déjeuner à L'Entre-Deux, puis une randonnée ou une sieste en terrasse. Dans les deux cas, vous repartez avec une histoire — celle d'un fruit moche qui a fini en carry.",
          en: "In other words: lunch in L'Entre-Deux, then a hike or a nap on the terrace. Either way, you leave with a story — the story of an ugly fruit that ended up as a curry.",
        },
      },
    ],
    faq: [
      {
        q: { fr: "Où se trouve précisément le restaurant de La Gourmandise des Moches ?", en: "Where exactly is the La Gourmandise des Moches restaurant?" },
        a: {
          fr: "À l'entrée du village de L'Entre-Deux, à La Réunion. L'adresse exacte est communiquée par téléphone au [06 92 55 35 72](tel:+262692553572) — le restaurant est distinct de la boutique-atelier du 4A rue Fortuné Hoarau, située dans le village.",
          en: "At the entrance of L'Entre-Deux village, Réunion Island. The exact address is given over the phone on [+262 692 55 35 72](tel:+262692553572) — the restaurant is separate from the shop and workshop at 4A rue Fortuné Hoarau, inside the village.",
        },
      },
      {
        q: { fr: "Quels sont les horaires du restaurant à L'Entre-Deux ?", en: "What are the restaurant's opening hours?" },
        a: {
          fr: "Le déjeuner est servi du dimanche au vendredi, de 11h30 à 15h30. Le restaurant est fermé le samedi. Les jours fériés peuvent modifier le calendrier : un appel confirme avant de vous déplacer.",
          en: "Lunch is served Sunday to Friday, 11.30 am to 3.30 pm. The restaurant is closed on Saturdays. Public holidays can change the schedule: one call confirms before you travel.",
        },
      },
      {
        q: { fr: "Combien coûte un repas ?", en: "How much is a meal?" },
        a: {
          fr: "**8 €**, quel que soit le repas : c'est un prix unique, sans supplément. Un tarif volontairement accessible, décidé par l'association pour que la table reste ouverte à tout le monde.",
          en: "**€8**, whatever the meal: one single price with no supplement. A deliberately affordable rate, decided by the association so that the table stays open to everyone.",
        },
      },
      {
        q: { fr: "Le restaurant est-il vegan, végétarien et sans gluten ?", en: "Is the restaurant vegan, vegetarian and gluten-free?" },
        a: {
          fr: "Oui, et pas à moitié : **toute la carte** est 100 % vegan, végétarienne et sans gluten, dessert compris — le sorbet maison est lui aussi vegan et sans gluten.",
          en: "Yes, and not half-way: **the whole menu** is 100% vegan, vegetarian and gluten-free, dessert included — the homemade sorbet is vegan and gluten-free too.",
        },
      },
      {
        q: { fr: "Peut-on commander à emporter ou réserver une table ?", en: "Can you order takeaway or book a table?" },
        a: {
          fr: "Le service est proposé sur place et à emporter. Pour une réservation, un groupe ou pour connaître le plat du jour, le plus simple est d'appeler le [06 92 55 35 72](tel:+262692553572) : on vous répond directement.",
          en: "The service is available to eat in or take away. For a booking, a group, or to hear the dish of the day, simply call [+262 692 55 35 72](tel:+262692553572) — you get a straight answer.",
        },
      },
      {
        q: { fr: "Où acheter les confitures et les bocaux de La Gourmandise des Moches ?", en: "Where can you buy the jams and jars?" },
        a: {
          fr: "À l'atelier-boutique du 4A rue Fortuné Hoarau, à L'Entre-Deux, ouvert du dimanche au vendredi de 9h à 17h. Certains produits sont aussi vendus par des partenaires, comme la boutique du Dimitile Hôtel & Spa.",
          en: "At the shop and workshop, 4A rue Fortuné Hoarau in L'Entre-Deux, open Sunday to Friday from 9 am to 5 pm. Some products are also stocked by partners such as the Dimitile Hôtel & Spa boutique.",
        },
      },
    ],
    related: [
      { route: "restaurant", label: { fr: "Le restaurant : la page complète", en: "The restaurant: the full page" } },
      { route: "produits", label: { fr: "Nos confitures, sirops et condiments péi", en: "Our jams, syrups and local condiments" } },
      { route: "boutique-atelier", label: { fr: "Boutique & atelier à L'Entre-Deux", en: "Shop & workshop in L'Entre-Deux" } },
      { route: "anti-gaspillage", label: { fr: "Notre démarche anti-gaspillage", en: "Our anti-waste approach" } },
      { route: "ateliers", label: { fr: "Réserver un atelier confiture", en: "Book a jam workshop" } },
      { route: "territoire", label: { fr: "Producteurs & territoire : le Sud sauvage", en: "Growers & land: the wild south" } },
    ],
  },
];

/**
 * Byline. Kept at the organisation level on purpose: an individual byline
 * (Sandra Ramaye) is only published once she has confirmed it in writing
 * (CONTENT_GUIDE.md §5) — flip AUTHOR here and every article follows.
 */
export const AUTHOR: LocaleText = {
  fr: "La Gourmandise des Moches",
  en: "La Gourmandise des Moches",
};

/** Strips the inline markup for places where plain text is required (cards, meta). */
export function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getPostsByDate(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export const BLOG_SLUGS = BLOG_POSTS.map((post) => post.slug);

/** Words in the article body, used for the reading-time badge. */
export function wordCount(post: BlogPost, lang: "fr" | "en"): number {
  const text = post.body
    .map((block) => {
      switch (block.type) {
        case "p":
        case "h2":
        case "h3":
          return block.text[lang];
        case "callout":
          return `${block.title?.[lang] ?? ""} ${block.text[lang]}`;
        case "quote":
          return block.text[lang];
        case "list":
          return block.items[lang].join(" ");
        case "figure":
          return block.caption[lang];
        default:
          return "";
      }
    })
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(post: BlogPost, lang: "fr" | "en"): number {
  return Math.max(3, Math.round(wordCount(post, lang) / 190));
}

/** Every keyword the article targets, for the visible tag cloud. */
export function localizedDate(post: BlogPost, lang: "fr" | "en"): string {
  const [y, m, d] = post.publishedAt.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1)));
}
