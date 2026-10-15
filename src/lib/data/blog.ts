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
  {
    slug: "que-faire-a-l-entre-deux-une-journee-gourmande",
    publishedAt: "2026-10-15",
    category: { fr: "Bonnes adresses", en: "Good addresses" },
    tags: [
      { fr: "Que faire à L'Entre-Deux", en: "Things to do in L'Entre-Deux" },
      { fr: "Village créole La Réunion", en: "Creole village Réunion Island" },
      { fr: "Randonnée Dimitile", en: "Dimitile hike" },
      { fr: "Bassin Sassa", en: "Bassin Sassa" },
      { fr: "Sud sauvage", en: "The wild south" },
      { fr: "Où manger à L'Entre-Deux", en: "Where to eat in L'Entre-Deux" },
      { fr: "Produits péi", en: "Local Réunionnais produce" },
      { fr: "Week-end à La Réunion", en: "Weekend in Réunion Island" },
      { fr: "Cilaos", en: "Cilaos" },
    ],
    meta: {
      title: {
        fr: "Que faire à L'Entre-Deux : la journée gourmande idéale",
        en: "Things to do in L'Entre-Deux: the perfect gourmet day",
      },
      description: {
        fr: "Que faire à L'Entre-Deux ? Village créole, randonnée du Dimitile, Bassin Sassa et déjeuner à 8 € : notre programme d'une journée, heure par heure.",
        en: "Things to do in L'Entre-Deux: the Creole village, a Dimitile hike, Bassin Sassa, the Bras de la Plaine bridge and an €8 lunch — our one-day programme.",
      },
      keywords: {
        fr: "que faire à L'Entre-Deux, L'Entre-Deux La Réunion, village créole Réunion, visite guidée L'Entre-Deux, randonnée Dimitile, sentier Bayonne, sentier Bœuf-La Chapelle, Bassin Sassa, pont Bras de la Plaine, office de tourisme L'Entre-Deux, week-end Sud sauvage, où manger à L'Entre-Deux, produits péi, Cilaos, Saint-Pierre, Car Jaune, journée à L'Entre-Deux",
        en: "things to do in L'Entre-Deux, L'Entre-Deux Réunion Island, Creole village Réunion, Dimitile hike, Bassin Sassa, Bras de la Plaine bridge, L'Entre-Deux tourist office, wild south weekend, where to eat L'Entre-Deux, local produce, Cilaos, Saint-Pierre",
      },
    },
    h1: {
      fr: "Que faire à L'Entre-Deux ? Notre journée gourmande, du village au Dimitile",
      en: "What to do in L'Entre-Deux? Our gourmet day, from the village to the Dimitile",
    },
    lead: {
      fr: "L'Entre-Deux, c'est le village créole que beaucoup traversent sans s'arrêter — et c'est une erreur. Posé entre deux ravines, à **environ 12 km de Saint-Louis et une vingtaine de Saint-Pierre**, il concentre les cases créoles, l'artisanat péi, les départs de randonnée du **Dimitile** et, depuis 2026, un restaurant anti-gaspi à 8 €. Voici notre programme d'une journée, heure par heure, avec les bonnes adresses à la fin — dont la nôtre.",
      en: "L'Entre-Deux is the Creole village many people drive through without stopping — which is a mistake. Set between two ravines, **about 12 km from Saint-Louis and twenty from Saint-Pierre**, it packs in colourful Creole houses, island crafts, the trailheads of the **Dimitile** massif and, since 2026, an €8 anti-waste restaurant. Here is our hour-by-hour plan for a day here, with the best addresses at the end — ours included.",
    },
    facts: [
      { label: { fr: "Où", en: "Where" }, value: { fr: "L'Entre-Deux, Hauts du Sud, La Réunion (entre 100 et 1 700 m d'altitude)", en: "L'Entre-Deux, southern highlands, Réunion Island (100-1 700 m above sea level)" } },
      { label: { fr: "Y aller", en: "Getting there" }, value: { fr: "≈ 12 km de Saint-Louis, ≈ 20 km de Saint-Pierre (RD26) ; bus Car Jaune depuis Saint-Louis et Saint-Pierre", en: "≈ 12 km from Saint-Louis, ≈ 20 km from Saint-Pierre (RD26); Car Jaune bus from Saint-Louis and Saint-Pierre" } },
      { label: { fr: "Déjeuner", en: "Lunch" }, value: { fr: "Restaurant anti-gaspi, 8 € le repas — dimanche à vendredi, 11h30 – 15h30", en: "Anti-waste restaurant, €8 a meal — Sunday to Friday, 11.30 am – 3.30 pm" } },
      { label: { fr: "Boutique", en: "Shop" }, value: { fr: "4A rue Fortuné Hoarau — dimanche à vendredi, 9h – 17h", en: "4A rue Fortuné Hoarau — Sunday to Friday, 9 am – 5 pm" } },
      { label: { fr: "À réserver", en: "To book" }, value: { fr: "06 92 55 35 72 (plat du jour, table, atelier)", en: "+262 692 55 35 72 (dish of the day, table, workshop)" } },
    ],
    hero: {
      image: IMAGES.territoryDestination,
      alt: {
        fr: "Panorama de L'Entre-Deux et des montagnes réunionnaises, Hauts du Sud",
        en: "Panorama of L'Entre-Deux and the Réunion mountains, southern highlands",
      },
      caption: {
        fr: "L'Entre-Deux, entre les ravines du Bras de Cilaos et du Bras de la Plaine.",
        en: "L'Entre-Deux, between the Bras de Cilaos and Bras de la Plaine ravines.",
      },
    },
    body: [
      {
        type: "p",
        text: {
          fr: "Longtemps, L'Entre-Deux est resté difficile d'accès : deux ravines l'encerclent, et c'est justement cet enclavement qui a préservé son architecture créole et son art de vivre. On y accède aujourd'hui facilement depuis Saint-Louis, en franchissant le **pont du Bras de la Plaine, à environ 150 m au-dessus de la ravine** — un premier panoramique qui donne le ton de la journée.",
          en: "For a long time L'Entre-Deux was hard to reach: two ravines close in around it, and that very isolation is what preserved its Creole architecture and way of life. Today you get there easily from Saint-Louis, crossing the **Bras de la Plaine bridge, some 150 m above the ravine** — a first panoramic moment that sets the tone.",
        },
      },
      {
        type: "callout",
        tone: "leaf",
        title: { fr: "Le programme en une ligne", en: "The plan in one line" },
        text: {
          fr: "Matinée : le village créole à pied. Midi : déjeuner anti-gaspi à 8 € à l'entrée de L'Entre-Deux (dimanche – vendredi, 11h30 – 15h30). Après-midi : Dimitile, Bassin Sassa ou sieste en terrasse. Fin d'après-midi : la [boutique-atelier](/fr/boutique-atelier) avant de repartir.",
          en: "Morning: the Creole village on foot. Midday: an €8 anti-waste lunch at the entrance of L'Entre-Deux (Sunday – Friday, 11.30 am – 3.30 pm). Afternoon: Dimitile, Bassin Sassa or a nap on the terrace. Late afternoon: the [shop and workshop](/en/boutique-atelier) before heading home.",
        },
      },
      {
        type: "h2",
        id: "9h30-le-village-creole-a-pied",
        text: { fr: "9h30 — Le village créole à pied", en: "9.30 am — The Creole village on foot" },
      },
      {
        type: "p",
        text: {
          fr: "Commencez par le bourg, à pied. L'Entre-Deux est un **village créole** : cases colorées, jardins créoles entretenus, varangues et fleurs. L'**office de tourisme**, installé dans une maison créole traditionnelle, fournit des plans, des conseils sur les sentiers du secteur et peut organiser des **visites guidées** — la meilleure façon de comprendre pourquoi le village a gardé son caractère quand d'autres bourgs se sont banalisés.",
          en: "Start in the village centre, on foot. L'Entre-Deux is a **Creole village**: colourful houses, well-kept Creole gardens, verandas and flowers. The **tourist office**, housed in a traditional Creole building, gives out maps, advice on the local trails and can arrange **guided tours** — the best way to understand why the village kept its character while other towns became ordinary.",
        },
      },
      {
        type: "p",
        text: {
          fr: "Le village est aussi un bourg d'artisans, héritier d'une histoire de café et de savoir-faire : travail du choca (fibre d'agave), paille de chouchou, bois, cuisine, et de nombreux créateurs installés dans les ruelles. C'est le moment de repérer ce que vous irez chercher en fin de journée — et de discuter avec ceux qui font le village.",
          en: "The village is also a town of makers, heir to a coffee-growing past and its crafts: choca (agave fibre) work, chouchou straw, wood, food, and many artisans along the lanes. This is the moment to spot what you will come back for at the end of the day — and to chat with the people who make the village.",
        },
      },
      {
        type: "figure",
        image: IMAGES.entreDeux,
        alt: {
          fr: "Village créole de L'Entre-Deux et reliefs des Hauts du Sud à La Réunion",
          en: "Creole village of L'Entre-Deux and the southern highland relief of Réunion",
        },
        caption: {
          fr: "Le bourg, ses cases créoles et les crêtes qui l'encerclent.",
          en: "The village centre, its Creole houses and the ridges surrounding it.",
        },
      },
      {
        type: "h2",
        id: "11h30-le-dejeuner-anti-gaspi",
        text: { fr: "11h30 — Le déjeuner anti-gaspi, à 8 €", en: "11.30 am — The €8 anti-waste lunch" },
      },
      {
        type: "p",
        text: {
          fr: "C'est le moment de notre rendez-vous : le [restaurant](/fr/restaurant) de La Gourmandise des Moches, à l'entrée du village, ouvre à 11h30. Un seul prix, **8 € le repas**, et une carte entièrement **vegan, végétarienne et sans gluten** — carry du jour, riz, légumes péi, et le sorbet maison en dessert. Tout est cuisiné avec des fruits et légumes sauvés du gaspillage, ce qui veut dire que le menu suit la semaine des producteurs et non l'inverse.",
          en: "Now for our own appointment: the La Gourmandise des Moches [restaurant](/en/restaurant) at the entrance of the village opens at 11.30 am. One single price, **€8 a meal**, and a menu that is entirely **vegan, vegetarian and gluten-free** — the curry of the day, rice, local vegetables and homemade sorbet for dessert. Everything is cooked with fruit and vegetables rescued from waste, which means the menu follows the growers' week, not the other way round.",
        },
      },
      {
        type: "p",
        text: {
          fr: "Deux conseils : appelez le [06 92 55 35 72](tel:+262692553572) le matin pour connaître le **plat du jour** (il change à chaque sauvetage), et arrivez avant 15h — quand c'est fini, c'est fini. Le service se fait du **dimanche au vendredi, de 11h30 à 15h30**, sur place ou **à emporter** si vous préférez pique-niquer plus haut dans les Hauts.",
          en: "Two tips: call [+262 692 55 35 72](tel:+262692553572) in the morning for the **dish of the day** (it changes with every rescue), and arrive before 3 pm — when it is gone, it is gone. Service runs **Sunday to Friday, 11.30 am to 3.30 pm**, eat in or **take away** if you would rather picnic higher up in the highlands.",
        },
      },
      {
        type: "callout",
        tone: "mango",
        title: { fr: "Cinq minutes pour comprendre la démarche", en: "Five minutes to understand the approach" },
        text: {
          fr: "Ici, les invendus sont **rachetés** aux agriculteurs, coopératives et bazardiers péi, transformés à l'atelier et servis : rien ne part à la benne, et les producteurs sont payés. L'argent du déjeuner repart dans le circuit. Si le sujet vous intéresse, notre article dédié raconte [où manger à L'Entre-Deux et pourquoi ça compte](/fr/journal/restaurant-entre-deux-vegan-sans-gluten).",
          en: "Here, surplus is **bought back** from local farmers, cooperatives and market sellers, transformed at the workshop and served: nothing goes to the bin and growers get paid. Your lunch money goes back into the circuit. If that interests you, our dedicated article explains [where to eat in L'Entre-Deux and why it matters](/en/journal/restaurant-entre-deux-vegan-sans-gluten).",
        },
      },
      {
        type: "h2",
        id: "13h30-choisissez-votre-apres-midi",
        text: { fr: "13h30 — Choisissez votre après-midi", en: "1.30 pm — Choose your afternoon" },
      },
      {
        type: "h3",
        text: { fr: "Option 1 — Les randonneurs : le Dimitile", en: "Option 1 — Hikers: the Dimitile" },
      },
      {
        type: "p",
        text: {
          fr: "L'Entre-Deux est la **porte d'entrée du Dimitile**, ce belvédère qui culmine à environ 1 800 m et offre l'un des panoramas les plus spectaculaires de l'île sur le **cirque de Cilaos** et le Piton des Neiges. Plusieurs sentiers partent du secteur, du plus accessible au plus sportif : **Bœuf-La Chapelle**, Bayonne, Zèbre, Grande Jument. Comptez la journée pour un sommet, l'après-midi pour une portion — et de l'eau, beaucoup d'eau.",
          en: "L'Entre-Deux is the **gateway to the Dimitile**, the lookout that rises to around 1 800 m and offers one of the island's most spectacular panoramas over the **Cilaos cirque** and Piton des Neiges. Several trails leave from the area, from easy to strenuous: **Bœuf-La Chapelle**, Bayonne, Zèbre, Grande Jument. Allow a full day for a summit, an afternoon for a stretch — and bring water, plenty of it.",
        },
      },
      {
        type: "h3",
        text: { fr: "Option 2 — Les familles : balade douce et bassin", en: "Option 2 — Families: an easy walk and a pool" },
      },
      {
        type: "p",
        text: {
          fr: "Avec des enfants, restez dans le secteur du village : **le Bassin Sassa**, accessible depuis le bourg, est la sortie familiale classique — on marche, on pique-nique, on se baigne quand le niveau d'eau le permet. Les ruelles du bourg, les jardins créoles et l'aire de jeux offrent de quoi occuper une demi-journée sans voiture.",
          en: "With children, stay around the village: **Bassin Sassa**, reachable from the village centre, is the classic family outing — you walk, you picnic, you swim when the water level allows. The village lanes, the Creole gardens and the playground are enough to fill half a day without driving.",
        },
      },
      {
        type: "h3",
        text: { fr: "Option 3 — Les contemplatifs : terrasse, sieste et panoramas", en: "Option 3 — The unhurried: terrace, nap and views" },
      },
      {
        type: "p",
        text: {
          fr: "Envie de ne rien faire ? Vous êtes au bon endroit. Une table en terrasse face à la route de montagne, un sorbet maison, et le temps qui ralentit : c'est aussi ça, L'Entre-Deux. En fin d'après-midi, la **route de Cilaos** et ses fameux lacets (« la route aux 400 virages ») prolongent la balade si vous repartez par l'ouest.",
          en: "Feel like doing nothing? You are in the right place. A table on the terrace facing the mountain road, a homemade sorbet and time slowing down: that is L'Entre-Deux too. Late afternoon, the **Cilaos road** and its famous hairpins (“the road with 400 bends”) extend the drive if you leave towards the west.",
        },
      },
      {
        type: "h2",
        id: "16h-la-boutique-atelier",
        text: { fr: "16h — La boutique-atelier avant de repartir", en: "4 pm — The shop and workshop before heading home" },
      },
      {
        type: "p",
        text: {
          fr: "Dernière étape, et pas la moindre : l'**[atelier-boutique](/fr/boutique-atelier)** du 4A rue Fortuné Hoarau, dans le village, ouvert **du dimanche au vendredi de 9h à 17h**. C'est là que naissent les bocaux : confitures artisanales, **ketchup de banane**, chutneys, achards, compotes, soupes, nectars et sirops de [la gamme complète](/fr/produits). Les cuvées changent avec les sauvetages de la saison — autrement dit, ce que vous rapportez d'ici n'existe pas ailleurs.",
          en: "Last stop, and not the least: the **[shop and workshop](/en/boutique-atelier)** at 4A rue Fortuné Hoarau in the village, open **Sunday to Friday, 9 am to 5 pm**. This is where the jars are born: artisanal jams, **banana ketchup**, chutneys, pickles, compotes, soups, nectars and syrups from [the full range](/en/produits). Batches change with each season's rescues — in other words, what you take home from here exists nowhere else.",
        },
      },
      {
        type: "list",
        items: {
          fr: [
            "**À rapporter** : confitures, ketchup de banane, achards citron, sirops — des cadeaux péi qui ne finiront pas au fond d'un sac",
            "**À offrir** : les coffrets et assortiments du moment",
            "**À tester plus tard** : les [ateliers confiture](/fr/ateliers), pour repartir avec votre propre pot",
          ],
          en: [
            "**To take home**: jams, banana ketchup, lemon pickles, syrups — local gifts that won't be forgotten at the bottom of a bag",
            "**To give**: the current gift boxes and assortments",
            "**To try later**: the [jam workshops](/en/ateliers), to leave with your own jar",
          ],
        },
      },
      {
        type: "figure",
        image: IMAGES.boutique,
        alt: {
          fr: "Boutique-atelier de La Gourmandise des Moches à L'Entre-Deux, bocaux et créations péi",
          en: "La Gourmandise des Moches shop and workshop in L'Entre-Deux, jars and local creations",
        },
        caption: {
          fr: "La boutique-atelier, 4A rue Fortuné Hoarau : on y goûte, on y discute, on y repart avec un bocal.",
          en: "The shop and workshop, 4A rue Fortuné Hoarau: taste, chat, and leave with a jar.",
        },
      },
      {
        type: "h2",
        id: "comment-venir-a-l-entre-deux",
        text: { fr: "Comment venir à L'Entre-Deux ?", en: "How do you get to L'Entre-Deux?" },
      },
      {
        type: "list",
        items: {
          fr: [
            "**En voiture depuis Saint-Louis** : direction L'Entre-Deux par la RD26, environ 12 km, en franchissant le pont sur le Bras de la Plaine.",
            "**En voiture depuis Saint-Pierre** : comptez une vingtaine de kilomètres, soit environ 25 minutes hors trafic.",
            "**En bus** : le réseau **Car Jaune** dessert L'Entre-Deux depuis Saint-Louis et Saint-Pierre — pratique si vous voulez randonner sans redescendre en voiture.",
            "**Sans véhicule, pour déjeuner** : l'arrêt de bus du bourg vous laisse à quelques minutes du restaurant et de la boutique.",
          ],
          en: [
            "**By car from Saint-Louis**: follow the RD26 towards L'Entre-Deux, about 12 km, crossing the Bras de la Plaine bridge.",
            "**By car from Saint-Pierre**: around twenty kilometres, roughly 25 minutes outside peak traffic.",
            "**By bus**: the **Car Jaune** network serves L'Entre-Deux from Saint-Louis and Saint-Pierre — handy if you want to hike without driving back down.",
            "**Without a car, for lunch**: the village bus stop leaves you a few minutes from the restaurant and the shop.",
          ],
        },
      },
      {
        type: "callout",
        tone: "tomato",
        title: { fr: "Un appel avant de prendre la route", en: "One call before you set off" },
        text: {
          fr: "Horaires du restaurant, plat du jour, réservation de table, jours fériés, atelier : le [06 92 55 35 72](tel:+262692553572) répond à tout. C'est aussi la meilleure façon d'éviter un déplacement pour rien les jours de fermeture exceptionnelle — la boutique et le restaurant sont **fermés le samedi**.",
          en: "Restaurant hours, dish of the day, table bookings, public holidays, workshops: [+262 692 55 35 72](tel:+262692553572) answers it all. It is also the best way to avoid a wasted trip on exceptional closure days — the shop and restaurant are **closed on Saturdays**.",
        },
      },
      {
        type: "h2",
        id: "et-si-vous-avez-plus-de-temps",
        text: { fr: "Et si vous avez plus de temps ?", en: "And if you have more time?" },
      },
      {
        type: "list",
        items: {
          fr: [
            "**Cilaos** : le cirque classé au patrimoine mondial, ses sources thermales et sa route mythique depuis Saint-Louis.",
            "**Saint-Pierre** : marché, front de mer, port de plaisance — la capitale du Sud à une vingtaine de kilomètres.",
            "**Le Sud sauvage** : la côte entre Saint-Pierre et Saint-Philippe, pour une deuxième journée plus volcanique que villageoise.",
            "**Nos producteurs** : si vous voulez comprendre d'où viennent les fruits sauvés, la page [producteurs & territoire](/fr/territoire) raconte les exploitations et les coopératives partenaires.",
          ],
          en: [
            "**Cilaos**: the UNESCO-listed cirque, its thermal springs and its legendary road from Saint-Louis.",
            "**Saint-Pierre**: market, seafront, marina — the capital of the south, about twenty kilometres away.",
            "**The wild south**: the coast between Saint-Pierre and Saint-Philippe, for a second day that is more volcanic than village.",
            "**Our growers**: to understand where the rescued fruit comes from, the [growers & land page](/en/territoire) introduces the partner farms and cooperatives.",
          ],
        },
      },
      {
        type: "p",
        text: {
          fr: "Une dernière chose : L'Entre-Deux se visite **toute l'année**, mais c'est un village de montagne — prévoyez de quoi vous couvrir, et gardez la boutique-atelier comme plan B les jours de pluie. C'est là que se racontent les histoires de bocaux, à l'abri, un sorbet à la main.",
          en: "One last thing: L'Entre-Deux can be visited **all year round**, but it is a mountain village — bring a layer, and keep the shop and workshop as your rainy-day plan B. That is where the jar stories get told, under shelter, with a sorbet in hand.",
        },
      },
    ],
    faq: [
      {
        q: { fr: "Que faire à L'Entre-Deux en une journée ?", en: "What can you do in L'Entre-Deux in one day?" },
        a: {
          fr: "Matinée : le village créole et l'office de tourisme. Midi : déjeuner anti-gaspi à 8 € à l'entrée du village (dimanche – vendredi, 11h30 – 15h30). Après-midi : randonnée vers le Dimitile, baignade au Bassin Sassa ou terrasse. Fin d'après-midi : la boutique-atelier du 4A rue Fortuné Hoarau (9h – 17h).",
          en: "Morning: the Creole village and the tourist office. Midday: an €8 anti-waste lunch at the entrance of the village (Sunday – Friday, 11.30 am – 3.30 pm). Afternoon: hike the Dimitile, swim at Bassin Sassa or sit on the terrace. Late afternoon: the shop and workshop at 4A rue Fortuné Hoarau (9 am – 5 pm).",
        },
      },
      {
        q: { fr: "Peut-on venir à L'Entre-Deux sans voiture ?", en: "Can you get to L'Entre-Deux without a car?" },
        a: {
          fr: "Oui : le réseau de bus **Car Jaune** dessert L'Entre-Deux depuis Saint-Louis et Saint-Pierre. L'arrêt du bourg vous laisse à quelques minutes du restaurant et de la boutique-atelier, ce qui permet de randonner ou de déjeuner sans redescendre en voiture.",
          en: "Yes: the **Car Jaune** bus network serves L'Entre-Deux from Saint-Louis and Saint-Pierre. The village stop is a few minutes from the restaurant and the shop, so you can hike or have lunch without driving back down.",
        },
      },
      {
        q: { fr: "Où manger à L'Entre-Deux le midi ?", en: "Where to eat in L'Entre-Deux at lunchtime?" },
        a: {
          fr: "Au restaurant de La Gourmandise des Moches, à l'entrée du village : repas à **8 €**, 100 % vegan, végétarien et sans gluten, du dimanche au vendredi de 11h30 à 15h30, sur place ou à emporter. Le plat du jour change chaque semaine selon les produits sauvés — appelez le [06 92 55 35 72](tel:+262692553572) pour le connaître.",
          en: "At the La Gourmandise des Moches restaurant at the entrance of the village: **€8** meals, 100% vegan, vegetarian and gluten-free, Sunday to Friday from 11.30 am to 3.30 pm, eat in or take away. The dish of the day changes weekly with whatever was rescued — call [+262 692 55 35 72](tel:+262692553572) to hear it.",
        },
      },
      {
        q: { fr: "Que faire à L'Entre-Deux avec des enfants ?", en: "What is there to do in L'Entre-Deux with children?" },
        a: {
          fr: "Le **Bassin Sassa**, accessible depuis le bourg, est la sortie familiale idéale (marche courte, pique-nique, baignade selon le niveau d'eau). Les ruelles du village, les jardins créoles et les animations de l'office de tourisme complètent facilement une demi-journée. Le restaurant sert tout le monde au même prix, ce qui simplifie l'addition en famille.",
          en: "**Bassin Sassa**, reachable from the village centre, is the ideal family outing (short walk, picnic, swim depending on the water level). The village lanes, the Creole gardens and the tourist office activities easily fill half a day. The restaurant charges everyone the same price, which keeps the family bill simple.",
        },
      },
      {
        q: { fr: "Que faire à L'Entre-Deux quand il pleut ?", en: "What can you do in L'Entre-Deux when it rains?" },
        a: {
          fr: "Déjeuner au restaurant (c'est couvert), puis la boutique-atelier : on y découvre les bocaux, on discute avec l'équipe et on repart avec de quoi se consoler. Les jours de pluie, un appel au [06 92 55 35 72](tel:+262692553572) confirme les horaires et l'ouverture du jour.",
          en: "Lunch at the restaurant (it is sheltered), then the shop and workshop: browse the jars, chat with the team and take home some consolation. On rainy days, a call to [+262 692 55 35 72](tel:+262692553572) confirms the day's opening hours.",
        },
      },
      {
        q: { fr: "Quelle randonnée choisir à L'Entre-Deux ?", en: "Which hike should you choose in L'Entre-Deux?" },
        a: {
          fr: "Pour un panorama, le **Dimitile** (environ 1 800 m) offre une vue sur le cirque de Cilaos et le Piton des Neiges, avec plusieurs sentiers de niveaux variés (Bœuf-La Chapelle, Bayonne, Zèbre, Grande Jument). Pour une sortie familiale, préférez le **Bassin Sassa** depuis le bourg. L'office de tourisme conseille l'itinéraire adapté à votre niveau.",
          en: "For a panorama, the **Dimitile** (around 1 800 m) looks over the Cilaos cirque and Piton des Neiges, with several trails of varying difficulty (Bœuf-La Chapelle, Bayonne, Zèbre, Grande Jument). For a family outing, choose **Bassin Sassa** from the village centre. The tourist office will recommend a route to match your level.",
        },
      },
    ],
    related: [
      { route: "restaurant", label: { fr: "Le restaurant anti-gaspi à L'Entre-Deux", en: "The anti-waste restaurant in L'Entre-Deux" } },
      { route: "boutique-atelier", label: { fr: "Boutique & atelier : horaires et accès", en: "Shop & workshop: hours and access" } },
      { route: "territoire", label: { fr: "Producteurs & territoire du Sud sauvage", en: "Growers & land of the wild south" } },
      { route: "produits", label: { fr: "Confitures, sirops et condiments péi", en: "Jams, syrups and local condiments" } },
      { route: "ateliers", label: { fr: "Ateliers confiture : repartez avec votre pot", en: "Jam workshops: leave with your own jar" } },
      { route: "contact", label: { fr: "Nous contacter et venir", en: "Contact us and visit" } },
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
