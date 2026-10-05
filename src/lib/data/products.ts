/**
 * Product catalogue transcribed from the supplied 15-page catalogue PDF.
 * The range changes with rescued produce, so prices and permanent stock are
 * intentionally not shown.
 */
import type { StaticImageData } from "next/image";
import { IMAGES } from "@/lib/assets";

export type Product = {
  slug: string;
  image: StaticImageData;
  alt: { fr: string; en: string };
  name: { fr: string; en: string };
  category: { fr: string; en: string };
  tagline: { fr: string; en: string };
  description: { fr: string; en: string };
  examples?: { fr: string[]; en: string[] };
  accent: "mango" | "tomato" | "goyave" | "leaf";
};

export type CatalogueItem = {
  name: { fr: string; en: string };
  ingredients: { fr: string; en: string };
};

export type CatalogueSection = {
  slug: string;
  title: { fr: string; en: string };
  items: CatalogueItem[];
};

const same = (fr: string, en = fr) => ({ fr, en });

export const PRODUCTS: Product[] = [
  {
    slug: "confitures",
    image: IMAGES.confituresFeatured,
    alt: same("Assortiment de pots de confiture artisanale", "Assortment of artisanal jam jars"),
    name: same("Confitures", "Jams"),
    category: same("Bocaux sucrés", "Sweet jars"),
    tagline: same("Des fruits sauvés, cuits en petites fournées.", "Rescued fruit, cooked in small batches."),
    description: same(
      "La collection la plus généreuse du catalogue : banane, agrumes, melon, tomate, papaye, bringelle et bien d'autres recettes aux épices péi.",
      "The catalogue's most generous collection: banana, citrus, melon, tomato, papaya, eggplant and many island-spiced recipes.",
    ),
    examples: {
      fr: ["Bringelle aux épices", "Pamplemousse à la banane", "Banane de Noël", "Orange au curcuma", "Papaye en tranches"],
      en: ["Spiced eggplant", "Pomelo & banana", "Christmas banana", "Orange & turmeric", "Sliced papaya"],
    },
    accent: "goyave",
  },
  {
    slug: "sirops",
    image: IMAGES.sirops,
    alt: same("Bouteilles de sirops artisanaux — visuel du catalogue fourni"),
    name: same("Sirops", "Syrups"),
    category: same("À boire", "To drink"),
    tagline: same("Une touche tropicale dans le verre.", "A splash of the tropics in your glass."),
    description: same("Des sirops de clémentine, mangue, menthe, ananas et papaye confite.", "Syrups made with clementine, mango, mint, pineapple and candied papaya."),
    examples: { fr: ["Clémentine", "Mangue", "Menthe", "Ananas", "Papaye confite"], en: ["Clementine", "Mango", "Mint", "Pineapple", "Candied papaya"] },
    accent: "mango",
  },
  {
    slug: "achards",
    image: IMAGES.achardsFeatured,
    alt: same("Bocal d'achards citron artisanaux", "Artisanal lemon pickle jar"),
    name: same("Achards", "Pickles"),
    category: same("Condiments", "Condiments"),
    tagline: same("Le peps acidulé des légumes réunionnais.", "The bright tang of Réunion vegetables."),
    description: same("Achards citron, préparés avec oignon, gingembre, ail, curcuma et piment.", "Lemon pickles prepared with onion, ginger, garlic, turmeric and chilli."),
    examples: { fr: ["Achards citron"], en: ["Lemon pickles"] },
    accent: "leaf",
  },
  {
    slug: "chutneys",
    image: IMAGES.ketchupBanane,
    alt: same("Bocaux de chutney et condiments — visuel du catalogue fourni"),
    name: same("Chutneys", "Chutneys"),
    category: same("Condiments", "Condiments"),
    tagline: same("Des mélanges sucré-salé qui ne ressemblent à aucun autre.", "Sweet-savoury combinations unlike any other."),
    description: same("Bringelle-banane, poivron rouge et peau de banane : trois façons de prolonger la vie des produits.", "Eggplant-banana, red pepper and banana peel: three ways to extend a product's life."),
    examples: { fr: ["Bringelle à la banane", "Poivron rouge", "Peau de banane"], en: ["Eggplant & banana", "Red pepper", "Banana peel"] },
    accent: "tomato",
  },
  {
    slug: "compotes",
    image: IMAGES.compotes,
    alt: same("Pot de compote artisanale — visuel du catalogue fourni"),
    name: same("Compotes", "Compotes"),
    category: same("Douceurs de fruits", "Fruit comforts"),
    tagline: same("Le goût du fruit, rien que le goût du fruit.", "The taste of fruit — nothing but fruit."),
    description: same("Une compote banane aux agrumes, avec mandarine, citron et cannelle.", "A banana and citrus compote with mandarin, lemon and cinnamon."),
    examples: { fr: ["Banane aux agrumes"], en: ["Banana & citrus"] },
    accent: "goyave",
  },
  {
    slug: "nectars",
    image: IMAGES.jusNectars,
    alt: same("Bouteilles de nectars artisanaux — visuel du catalogue fourni"),
    name: same("Nectars", "Nectars"),
    category: same("À boire", "To drink"),
    tagline: same("Des associations surprenantes, pleines de fruit.", "Surprising combinations, full of fruit."),
    description: same("Nectars de chou de Chine à la banane et de chou à l'ananas.", "Chinese cabbage and banana nectar, and cabbage and pineapple nectar."),
    examples: { fr: ["Chou de Chine à la banane", "Chou à l'ananas"], en: ["Chinese cabbage & banana", "Cabbage & pineapple"] },
    accent: "mango",
  },
  {
    slug: "soupes",
    image: IMAGES.soupes,
    alt: same("Bocaux de soupes artisanales — visuel du catalogue fourni"),
    name: same("Soupes", "Soups"),
    category: same("Bocaux salés", "Savoury jars"),
    tagline: same("Les légumes sauvés offrent leur plus belle texture.", "Rescued vegetables in their finest texture."),
    description: same("Soupes de chouchou et de blettes, cuisinées avec des légumes simples et généreux.", "Chayote and Swiss chard soups, cooked with simple, generous vegetables."),
    examples: { fr: ["Soupe chouchou", "Soupe blettes"], en: ["Chayote soup", "Swiss chard soup"] },
    accent: "leaf",
  },
  {
    slug: "ketchup-et-sauces",
    image: IMAGES.ketchupSaucesFeatured,
    alt: same("Bocal de chutney poivron rouge artisanal", "Artisanal red pepper chutney jar"),
    name: same("Ketchup & autres sauces", "Ketchup & other sauces"),
    category: same("Condiments signature", "Signature condiments"),
    tagline: same("La banane et les aromates passent côté salé.", "Banana and aromatics go savoury."),
    description: same("Ketchup banane pimenté, sauce coriandre et sauce roquette : des recettes anti-gaspi pour relever les plats.", "Spicy banana ketchup, coriander sauce and rocket sauce: anti-waste recipes to lift a meal."),
    examples: { fr: ["Ketchup banane pimenté", "Sauce coriandre", "Sauce roquette"], en: ["Spicy banana ketchup", "Coriander sauce", "Rocket sauce"] },
    accent: "tomato",
  },
];

export const CATALOGUE_SECTIONS: CatalogueSection[] = [
  {
    slug: "confitures",
    title: same("Nos confitures", "Our jams"),
    items: [
      { name: same("Confiture pamplemousse à la banane", "Pomelo & banana jam"), ingredients: same("Pamplemousse, banane, sucre de canne, miel, baie rose, citron") },
      { name: same("Confiture banane de Noël", "Christmas banana jam"), ingredients: same("Banane, muscade, sucre, citron, cannelle, étoile de badiane") },
      { name: same("Confiture mandarine à la liqueur", "Mandarin liqueur jam"), ingredients: same("Mandarine, sucre de canne, liqueur anisette") },
      { name: same("Confiture melon en folie", "Melon madness jam"), ingredients: same("Peau de melon et pépin, sucre de canne, eau, citron") },
      { name: same("Confiture tomate aux agrumes", "Tomato & citrus jam"), ingredients: same("Tomate, sucre de canne, orange, citron, agar-agar") },
      { name: same("Confiture carambole au pamplemousse", "Starfruit & pomelo jam"), ingredients: same("Carambole, sucre de canne, pamplemousse, badiane") },
      { name: same("Confiture banane au citron", "Banana & lemon jam"), ingredients: same("Banane, sucre de canne, citron, zeste de citron") },
      { name: same("Confiture peau de citron, cacahuètes grillées et salées", "Lemon peel, roasted & salted peanut jam"), ingredients: same("Peau de citron, sucre de canne, cacahuètes grillées et salées") },
      { name: same("Confiture piment", "Chilli jam"), ingredients: same("Piment, eau, sucre de canne, citron, vinaigre de cidre, sel") },
      { name: same("Confiture peau de pamplemousse, cacahuètes grillées et salées", "Pomelo peel, roasted & salted peanut jam"), ingredients: same("Peau de pamplemousse, sucre de canne, cacahuètes grillées et salées") },
      { name: same("Confiture orange au curcuma", "Orange & turmeric jam"), ingredients: same("Orange, sucre de canne, curcuma, agar-agar") },
      { name: same("Confiture banane à la verveine", "Banana & verbena jam"), ingredients: same("Banane, infusion de verveine, sucre de canne, citron") },
      { name: same("Confiture banane kaloupilé", "Kaloupilé banana jam"), ingredients: same("Banane, sucre de canne, infusion de kaloupilé") },
      { name: same("Confiture banane au thym", "Banana & thyme jam"), ingredients: same("Banane, sucre de canne, citron, étoile de badiane, cannelle, muscade") },
      { name: same("Confiture banane au galabé", "Banana & galabé jam"), ingredients: same("Banane, sucre de canne, galabé, citron") },
      { name: same("Confiture papaye en tranches", "Sliced papaya jam"), ingredients: same("Papaye verte, sucre de canne, citron, vanille") },
      { name: same("Confiture banane aux drêches", "Banana & brewer's grain jam"), ingredients: same("Banane, sucre de canne, citron, drêches") },
      { name: same("Confiture pamplemousse aux épices", "Spiced pomelo jam"), ingredients: same("Pamplemousse, sucre de canne, miel, baie rose, gingembre, cardamome") },
      { name: same("Électuaire bringelle aux épices", "Spiced eggplant electuary"), ingredients: same("Bringelle, sucre de canne, citron, cannelle, anis étoilé, clou de girofle") },
      { name: same("Marmelade citron", "Lemon marmalade"), ingredients: same("Citron, jus, sucre de canne, eau, menthe") },
      { name: same("Confiture tomate à la badiane", "Tomato & star anise jam"), ingredients: same("Tomate, sucre de canne, citron, pamplemousse, badiane, agar-agar") },
      { name: same("Confiture pomme de terre aux épices", "Spiced potato jam"), ingredients: same("Pomme de terre, sucre de canne, eau, jus d'orange, feuille de cannelle, badiane") },
      { name: same("Confit chou blanc", "White cabbage preserve"), ingredients: same("Chou blanc, sucre, clou de girofle, anis étoilé, oignon, vinaigre de cidre") },
    ],
  },
  {
    slug: "sirops",
    title: same("Nos sirops", "Our syrups"),
    items: [
      { name: same("Sirop de clémentine", "Clementine syrup"), ingredients: same("Clémentines, sucre de canne") },
      { name: same("Sirop de mangue", "Mango syrup"), ingredients: same("Infusion de peau de mangue, noyau, sucre") },
      { name: same("Sirop de menthe", "Mint syrup"), ingredients: same("Infusion de menthe, sucre, citron") },
      { name: same("Sirop d'ananas", "Pineapple syrup"), ingredients: same("Peau d'ananas, eau, sucre") },
      { name: same("Sirop de papaye confite", "Candied papaya syrup"), ingredients: same("Papaye, sucre de canne, citron, vanille") },
    ],
  },
  {
    slug: "nectars-compote",
    title: same("Nos nectars & compote", "Our nectars & compote"),
    items: [
      { name: same("Nectar chou de Chine à la banane", "Chinese cabbage & banana nectar"), ingredients: same("Purée de chou, banane, jus de citron, eau") },
      { name: same("Nectar chou à l'ananas", "Cabbage & pineapple nectar"), ingredients: same("Purée de chou, ananas, eau, gingembre, citron") },
      { name: same("Compote banane aux agrumes", "Banana & citrus compote"), ingredients: same("Banane, mandarine, jus de citron, cannelle") },
    ],
  },
  {
    slug: "condiments",
    title: same("Nos condiments", "Our condiments"),
    items: [
      { name: same("Chutney bringelle à la banane", "Eggplant & banana chutney"), ingredients: same("Bringelle, banane, vinaigre de cidre, huile, sucre de canne, piment, sel") },
      { name: same("Chutney poivron rouge", "Red pepper chutney"), ingredients: same("Poivron, sucre de canne, oignon, vinaigre de cidre, clou de girofle, piment") },
      { name: same("Chutney peau de banane", "Banana peel chutney"), ingredients: same("Peau de banane, cardamome, oignon rouge, vinaigre blanc, sucre, sel, graines de moutarde noire, fenugrec, gingembre, curcuma, piment, clou de girofle") },
      { name: same("Sauce coriandre", "Coriander sauce"), ingredients: same("Coriandre, huile, jus de citron, ail, paprika, curcuma, gingembre, miel, baie rose, sel, piment") },
      { name: same("Sauce roquette", "Rocket sauce"), ingredients: same("Jus de tangor, roquette, huile, poudre d'amande, jus de citron, sel") },
      { name: same("Ketchup banane pimenté", "Spicy banana ketchup"), ingredients: same("Banane, eau, oignon, vinaigre de cidre, sucre de canne, ail, piment, curcuma") },
    ],
  },
  {
    slug: "soupes-achards",
    title: same("Nos soupes & achards", "Our soups & pickles"),
    items: [
      { name: same("Soupe chouchou", "Chayote soup"), ingredients: same("Chouchou, eau, pomme de terre, oignon, citron, sel") },
      { name: same("Soupe blettes", "Swiss chard soup"), ingredients: same("Blettes, citron, oignon, sel") },
      { name: same("Achards citron", "Lemon pickles"), ingredients: same("Citron, oignon, huile de tournesol, vinaigre blanc, gingembre, ail, curcuma, gros sel, piment") },
    ],
  },
];


const CATALOGUE_IMAGES_RAW: Record<string, string> = {
  'Confiture tomate aux agrumes': '/images/catalogue/confiture-tomate-aux-agrumes.jpg',
  'Confiture banane de Noël': '/images/catalogue/confiture-banane-de-noel.jpg',
  'Confiture pamplemousse à la banane': '/images/catalogue/confiture-pamplemousse-a-la-banane.jpg',
  'Confiture carambole au pamplemousse': '/images/catalogue/confiture-carambole-au-pamplemousse.jpg',
  'Confiture melon en folie': '/images/catalogue/confiture-melon-en-folie.jpg',
  'Confiture mandarine à la liqueur': '/images/catalogue/confiture-mandarine-a-la-liqueur.jpg',
  'Confiture orange au curcuma': '/images/catalogue/confiture-orange-au-curcuma.jpg',
  'Confiture banane à la verveine': '/images/catalogue/confiture-banane-a-la-verveine.jpg',
  'Confiture peau de pamplemousse, cacahuètes grillées et salées': '/images/catalogue/confiture-peau-de-pamplemousse-cacahuetes-grillees-et-salees.jpg',
  'Confiture peau de citron, cacahuètes grillées et salées': '/images/catalogue/confiture-peau-de-citron-cacahuetes-grillees-et-salees.jpg',
  'Confiture piment': '/images/catalogue/confiture-piment.jpg',
  'Confiture banane au citron': '/images/catalogue/confiture-banane-au-citron.jpg',
  'Confiture banane kaloupilé': '/images/catalogue/confiture-banane-kaloupile.jpg',
  'Confiture banane au thym': '/images/catalogue/confiture-banane-au-thym.jpg',
  'Confiture banane au galabé': '/images/catalogue/confiture-banane-au-galabe.jpg',
  'Confiture papaye en tranches': '/images/catalogue/confiture-papaye-en-tranches.jpg',
  'Confiture banane aux drêches': '/images/catalogue/confiture-banane-aux-dreches.jpg',
  'Confiture pamplemousse aux épices': '/images/catalogue/confiture-pamplemousse-aux-epices.jpg',
  'Confiture tomate à la badiane': '/images/catalogue/confiture-tomate-a-la-badiane.jpg',
  'Confiture pomme de terre aux épices': '/images/catalogue/confiture-pomme-de-terre-aux-epices.jpg',
  'Marmelade citron': '/images/catalogue/marmelade-citron.jpg',
  'Électuaire bringelle aux épices': '/images/catalogue/electuaire-bringelle-aux-epices.jpg',
  'Confit chou blanc': '/images/catalogue/confit-chou-blanc.jpg',
  'Sirop de mangue': '/images/catalogue/sirop-de-mangue.jpg',
  'Sirop de menthe': '/images/catalogue/sirop-de-menthe.jpg',
  "Sirop d'ananas": '/images/catalogue/sirop-dananas.jpg',
  'Sirop de papaye confite': '/images/catalogue/sirop-de-papaye-confite.jpg',
  'Sirop de clémentine': '/images/catalogue/sirop-de-clementine.jpg',
  "Nectar chou à l'ananas": '/images/catalogue/nectar-chou-a-lananas.jpg',
  'Nectar chou de Chine à la banane': '/images/catalogue/nectar-chou-de-chine-a-la-banane.jpg',
  'Compote banane aux agrumes': '/images/catalogue/compote-banane-aux-agrumes.jpg',
  'Sauce coriandre': '/images/catalogue/sauce-coriandre.jpg',
  'Sauce roquette': '/images/catalogue/sauce-roquette.jpg',
  'Ketchup banane pimenté': '/images/catalogue/ketchup-banane-pimente.jpg',
  'Chutney bringelle à la banane': '/images/catalogue/chutney-bringelle-a-la-banane.jpg',
  'Chutney poivron rouge': '/images/catalogue/chutney-poivron-rouge.jpg',
  'Chutney peau de banane': '/images/catalogue/chutney-peau-de-banane.jpg',
  'Soupe blettes': '/images/catalogue/soupe-blettes.jpg',
  'Soupe chouchou': '/images/catalogue/soupe-chouchou.jpg',
  'Achards citron': '/images/catalogue/achards-citron.jpg',
};

/**
 * Images cropped from the matching product photographs inside the supplied
 * catalogue PDF. Served from `public/`, which means the paths are NOT prefixed
 * by Next's `basePath` automatically — so we add the build-time Pages sub-path
 * (NEXT_PUBLIC_BASE_PATH, empty once the custom domain is live) ourselves.
 */
export const CATALOGUE_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(CATALOGUE_IMAGES_RAW).map(([name, path]) => [
    name,
    `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`,
  ]),
);
