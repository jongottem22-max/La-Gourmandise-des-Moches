/**
 * French dictionary (default locale). All keys are mirrored in en.ts —
 * the shared type keeps FR/EN parity at compile time.
 * Brand voice: chaleureuse, espiègle, fièrement péi (see CONTENT_GUIDE.md).
 */

export const fr = {
  meta: {
    siteName: "La Gourmandise des Moches",
    tagline: "Moche dehors, merveilleux dedans.",
    defaultTitle: "La Gourmandise des Moches — Bocaux artisanaux anti-gaspillage à L'Entre-Deux, La Réunion",
    description:
      "À L'Entre-Deux, La Gourmandise des Moches transforme les fruits et légumes péi « moches » en confitures, soupes, nectars et sirops artisanaux. Boutique-atelier à Vavang'Art, ouverte du mardi au dimanche.",
    keywords:
      "produits artisanaux Réunion, anti-gaspillage alimentaire Réunion, confiture artisanale Réunion, L'Entre-Deux, produits péi, circuits courts",
  },
  nav: {
    home: "Accueil",
    restaurant: "Le restaurant",
    produits: "Nos produits",
    boutique: "Boutique & atelier",
    demarche: "Notre démarche",
    ateliers: "Ateliers",
    territoire: "Producteurs & territoire",
    histoire: "Notre histoire",
    galerie: "Galerie",
    contact: "Contact",
    menu: "Menu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Choisir la langue",
    switchTo: { fr: "Passer au français", en: "Switch to English" },
    skip: "Aller au contenu",
    breadcrumb: "Fil d'Ariane",
  },
  common: {
    cta: {
      products: "Découvrir nos produits",
      visit: "Nous rendre visite",
      call: "Appeler la boutique",
      directions: "Itinéraire",
      contact: "Nous contacter",
      instagram: "Suivre sur Instagram",
      facebook: "Suivre sur Facebook",
      support: "Soutenir l'association",
      book: "Réserver un atelier",
      story: "Lire notre histoire",
      demarche: "Voir notre démarche",
      ateliers: "Découvrir les ateliers",
      gallery: "Voir la galerie",
      taste: "Voir la boutique",
    },
    badges: {
      antiGaspi: "Anti-gaspi",
      pei: "100% péi",
      handmade: "Fait main",
      seasonal: "Selon la saison",
    },
    labels: {
      address: "Adresse",
      phone: "Téléphone",
      email: "E-mail",
      hours: "Horaires",
      follow: "Suivez-nous",
      where: "Où nous trouver",
    },
    hoursNote:
      "Horaires vérifiés à l'automne 2024 — ils peuvent évoluer : suivez les annonces sur nos réseaux avant de passer.",
    backHome: "Retour à l'accueil",
  },
  footer: {
    tagline:
      "Des fruits et légumes péi sauvés du gâchis, transformés à la main en gourmandises à L'Entre-Deux.",
    navTitle: "Explorer",
    contactTitle: "Nous trouver",
    hoursTitle: "Horaires",
    legal: "Association loi 1901 · SIREN 919 056 135",
    rights: "Tous droits réservés.",
    madeNote: "Site bilingue, cuisiné à L'Entre-Deux avec des pixels invendus.",
    creditIllustrations: "Photos : documents et images fournis par La Gourmandise des Moches ; illustrations complémentaires pour les familles de produits.",
    legalLinks: {
      mentionsLegales: "Mentions légales",
      confidentialite: "Politique de confidentialité",
    },
  },
  home: {
    title: "Bocaux artisanaux anti-gaspillage à L'Entre-Deux, La Réunion",
    description:
      "Confitures, compotes, soupes, nectars, sirops et ketchup de banane faits main à L'Entre-Deux avec des fruits et légumes péi sauvés du gâchis.",
    kicker: "Atelier-Boutique Restaurant · L'Entre-Deux · La Réunion",
    heroA: "Des fruits",
    heroB: "« moches »,",
    heroC: "des bocaux",
    heroD: "merveilleux.",
    heroSub:
      "Fondée en août 2022 par Sandra Ramaye, l'association sublime les fruits et légumes dits « moches ». Les invendus deviennent à la main des confitures, sirops, achards, chutneys, compotes, nectars, soupes, ketchup et autres sauces.",
    heroHint: "Mar–Dim · 10h–17h · Vavang'Art",
    marquee: [
      "Mangues cabossées",
      "Bananes trop mûres",
      "Tomates tordues",
      "Pomélos hors calibre",
      "Bringelles biscornues",
      "Goyaves tachées",
      "Ananas bancals",
      "Combavas bosselés",
    ],
    pillars: {
      kicker: "Notre promesse",
      title: "Rien ne se perd, tout se transforme.",
      sub: "Trois principes simples, suivis chaque jour à l'atelier.",
      items: [
        {
          title: "Racheté, pas ramassé",
          text: "Nous achetons les invendus aux agriculteurs, coopératives et bazardiers péi. Leur « trop-plein » devient un revenu, pas un déchet.",
        },
        {
          title: "Transformé à la main",
          text: "Épluchage, cuisson douce, mise en pot : tout se fait à l'atelier de Vavang'Art, avec des recettes créoles et innovantes, en petites cuvées et même dans des pots recyclés.",
        },
        {
          title: "Utile au territoire",
          text: "L'association sème aussi l'insertion professionnelle : apprendre un métier en sauvant des fruits, voilà l'idée.",
        },
      ],
    },
    process: {
      kicker: "Du moche au merveilleux",
      title: "Le voyage d'un fruit sauvé",
      steps: [
        { title: "Le surplus", text: "Récoltes invendues ou déclassées chez les producteurs de l'île." },
        { title: "L'achat", text: "Nous rachetons au juste prix — adieu la benne à ordures." },
        { title: "La transformation", text: "Tri, découpe, cuisson et mise en pot à Vavang'Art." },
        { title: "La gourmandise", text: "Bocaux vendus à la boutique et la mission sociale avance." },
      ],
    },
    products: {
      kicker: "Les gourmandises",
      title: "Ce qu'on sauve, on le met en pot.",
      sub: "La sélection change avec les saisons et les sauvetages — voici les grandes familles de bocaux de l'atelier.",
      cardCta: "Voir tous les produits",
      note: "Disponibilité variable : appelez ou passez à la boutique pour connaître les bocaux du moment.",
    },
    restaurant: {
      kicker: "Le restaurant anti-gaspi",
      title: "À midi, on passe à table.",
      lead: "Sandra a ouvert son restaurant à l'entrée du village de L'Entre-Deux : une cuisine 100 % vegan, végétarienne et sans gluten, préparée avec les fruits et légumes « moches » sauvés du gâchis.",
      priceLabel: "Prix unique",
      priceSuffix: "le repas",
      dishKicker: "Le plat qui résume tout",
      points: [
        { title: "100 % vegan, végétarien et sans gluten", text: "Toute la carte l'est : des assiettes généreuses, sans viande, sans gluten, pensées avec ce que la terre péi donne en trop." },
        { title: "Sur place ou à emporter", text: "Le midi, on s'installe au restaurant… ou on repart avec sa boîte." },
        { title: "Le circuit court, jusqu'au bout", text: "« Tout l'argent que nous gagnons repart dans le circuit » : producteurs payés, charges et salaires assurés." },
      ],
      quote: "Toute la carte est 100 % vegan, végétarienne et sans gluten — cuisinée avec les “moches”.",
      quoteSource: "La cuisine du restaurant",
      menuNote: "Le menu change au rythme des sauvetages : appelez-nous pour connaître le plat du jour.",
      cta: "Découvrir le restaurant",
    },
    boutique: {
      kicker: "La boutique-atelier",
      title: "Venez voir où naissent les bocaux.",
      text: "Au cœur de Vavang'Art, le village d'artisans de L'Entre-Deux, la boutique sent le sucre qui cuit et le fruit mûr. On y découvre les cuvées du moment, on discute sauvetage, et parfois on repart avec une recette.",
      points: [
        "Confitures, sirops, achards, chutneys, compotes, nectars, soupes, ketchup et sauces du moment",
        "Conseils et histoire de chaque bocal",
        "Un lieu artisanal vivant, au milieu des créateurs de Vavang'Art",
      ],
      hoursTitle: "Horaires",
      addressTitle: "Adresse",
      ctaMap: "Ouvrir dans Google Maps",
    },
    founder: {
      kicker: "La confiturière",
      title: "Sandra Ramaye, sauveuse de fruits.",
      quote:
        "« J'ai horreur du gaspillage alimentaire. Un fruit moche n'est jamais un mauvais fruit. »",
      text: "Sandra Ramaye a fondé l'association en août 2022 avec une conviction simple : un fruit moche n'est jamais un mauvais fruit. À Vavang'Art, les invendus deviennent des bocaux, des ateliers et une invitation à savourer autrement.",
    },
    territory: {
      kicker: "L'Entre-Deux, Sud sauvage",
      title: "Une île généreuse, un village d'artisans.",
      text: "Entre mer et cirque, L'Entre-Deux cultive les saveurs et les savoir-faire. C'est ici, dans la « kaz à fabrik » de Vavang'Art, que l'atelier a posé sa bassine à confiture.",
      cta: "Découvrir le territoire",
    },
    proof: {
      kicker: "Ils nous aiment déjà",
      title: "Des bocaux qui voyagent.",
      dimitile:
        "Le Dimitile Hôtel & Spa **** propose nos créations à sa boutique et organise des ateliers confiture avec nous.",
      facebook: "100% d'avis favorables sur Facebook (8 avis)",
      instagram: "Les cuvées du moment s'annoncent sur Instagram",
    },
    final: {
      title: "Envie de goûter un fruit sauvé ?",
      text: "Passez à la boutique, appelez-nous pour réserver vos bocaux, ou venez cuisiner avec nous le temps d'un atelier.",
    },
  },
  produits: {
    title: "Nos produits artisanaux — confitures, soupes, nectars & sirops péi",
    description:
      "Confitures de fruits moches, ketchup de banane, compotes, soupes, jus, nectars et sirops : les bocaux artisanaux de La Gourmandise des Moches, faits main à L'Entre-Deux.",
    kicker: "Nos gourmandises",
    h1: "Des bocaux qui sentent bon l'île.",
    sub: "Chaque cuvée dépend des sauvetages du moment : voici les familles de produits de l'atelier. Pour savoir ce qu'il reste en rayon, un coup de fil suffit.",
    viewRecipes: "Voir les recettes de cette catégorie",
    seasonNote:
      "Production artisanale en petites séries : les saveurs tournent au gré des récoltes et des invendus disponibles. C'est le principe du sauvetage gourmand !",
    ctaTitle: "Un bocal en tête ?",
    ctaText: "Appelez la boutique pour connaître les cuvées du moment et mettre de côté votre gourmandise.",
    processNote: "Du surplus au bocal :",
    catalogueTitle: "Le catalogue des recettes",
    catalogueSub: "Les références et ingrédients transcrits du catalogue fourni. Les disponibilités suivent les récoltes et les invendus.",
    ingredientsLabel: "Ingrédients",
    downloadCatalogue: "Télécharger le catalogue PDF",
  },
  boutique: {
    title: "La boutique-atelier à Vavang'Art, L'Entre-Deux — horaires & accès",
    description:
      "La boutique de La Gourmandise des Moches vous accueille à Vavang'Art, L'Entre-Deux, du mardi au dimanche de 10h à 17h. Bocaux du moment, conseils et ateliers.",
    kicker: "Boutique & atelier",
    h1: "La kaz à bocaux de Vavang'Art.",
    sub: "Une boutique-atelier vivante au cœur du village d'artisans de L'Entre-Deux. On y entre curieux, on en ressort gourmand.",
    visitTitle: "Venir nous voir",
    visitText:
      "La boutique fait partie de Vavang'Art, le village d'artisans de L'Entre-Deux. Profitez-en pour flâner entre les ateliers de créateurs du site.",
    whatTitle: "Ce que vous y trouverez",
    whatItems: [
      "Les bocaux du moment : confitures, soupes, compotes, nectars, sirops, ketchup de banane…",
      "L'histoire de chaque cuvée, racontée avec le sourire",
      "Des idées recettes pour les fruits fatigués de votre cuisine",
      "L'atelier en action quand la cuisson bat son plein",
    ],
    atelierTeaser: {
      title: "Et si vous mettiez la main à la confiture ?",
      text: "Nous organisons aussi des ateliers pour apprendre à transformer vos propres fruits — comme ceux que nous animons avec le Dimitile Hôtel & Spa.",
    },
    mapCta: "Afficher la carte",
    mapLoading: "Chargement de la carte…",
    mapTitle: "Carte : La Gourmandise des Moches, Vavang'Art, L'Entre-Deux",
    imperative: "Pensez à vérifier nos réseaux pour les annonces (fermetures exceptionnelles, cuvées spéciales).",
  },
  demarche: {
    title: "Notre démarche anti-gaspillage — circuits courts & insertion, La Réunion",
    description:
      "Rachat des invendus aux producteurs péi, transformation artisanale, zéro importation et insertion professionnelle : la démarche anti-gaspillage de La Gourmandise des Moches.",
    kicker: "Notre démarche",
    h1: "L'anti-gaspi, du champ au bocal.",
    sub: "Notre modèle tient en une phrase : acheter ce que l'île ne veut plus voir, et le rendre irrésistible.",
    stepsTitle: "La boucle vertueuse",
    steps: [
      {
        title: "1 · Le gaspillage commence au champ",
        text: "Calibre imparfait, surproduction, fruits trop mûrs : chaque saison, des tonnes de bons produits péi risquent la poubelle alors qu'ils sont plein de goût.",
      },
      {
        title: "2 · Nous rachetons — vraiment",
        text: "Agriculteurs, coopératives, bazardiers : nous payons leurs invendus au lieu de les récupérer gratis. Un revenu en plus pour celles et ceux qui nourrissent l'île, une motivation en plus pour ne plus jeter.",
      },
      {
        title: "3 · La transformation fait la magie",
        text: "À l'atelier de Vavang'Art, les moches deviennent confitures, soupes, nectars… Cuisson douce, petites séries, recettes maison, aucun produit importé.",
      },
      {
        title: "4 · Le terrain social avance",
        text: "Association d'insertion par l'activité économique : faire revivre des fruits permet aussi d'apprendre un métier et de retrouver un chemin vers l'emploi.",
      },
      {
        title: "5 · Vous, vous goûtez",
        text: "Chaque bocal acheté boucle la boucle : un producteur payé, un fruit sauvé, une mission sociale financée — et un goûter réussi.",
      },
    ],
    principlesTitle: "Nos lignes rouges",
    principles: [
      { title: "100% péi", text: "« Je ne rachète que des produits péi, pas d'importation. » Le principe n'a jamais bougé." },
      { title: "Circuits courts", text: "Le fruit parcours quelques kilomètres, pas quelques mers." },
      { title: "Achat, pas don", text: "Revaloriser économiquement le surplus, pour que l'anti-gaspi soit durable pour tous." },
      { title: "Transmission", text: "Ateliers et formation pour répandre les gestes qui sauvent." },
    ],
    producerTitle: "Vous êtes producteur ?",
    producerText:
      "Vous avez des invendus, des déclassés, une récolte qui peine à s'écouler ? Parlons-en : nous rachetons les surplus de fruits et légumes péi.",
    producerCta: "Devenir producteur partenaire",
    supportTitle: "Soutenir la jeune association",
    supportText:
      "Née en 2022, l'association grandit grâce aux ventes de bocaux et aux coups de pouce. Une cagnotte en ligne est ouverte sur HelloAsso pour équiper l'atelier.",
  },
  ateliers: {
    title: "Ateliers confiture à La Réunion — apprenez à sauver les fruits",
    description:
      "Ateliers de confiture et de transformation anti-gaspillage animés par Sandra Ramaye à L'Entre-Deux et avec des partenaires comme le Dimitile Hôtel & Spa. Réservation par téléphone.",
    kicker: "Ateliers",
    h1: "Mettez la main à la confiture.",
    sub: "Sélection des fruits, découpe, cuisson, mise en pot : repartez avec votre propre création et les bons réflexes anti-gaspi.",
    howTitle: "Comment ça se passe",
    howItems: [
      { title: "On choisit les moches", text: "Fruits mûrs, cabossés, oubliés : c'est leur moment de gloire." },
      { title: "On cuisine ensemble", text: "Guidés pas à pas, vous composez votre recette — douceur, épices, audace." },
      { title: "On déguste et on met en pot", text: "Dégustation guidée des créations de l'atelier, puis chacun repart avec sa gourmandise." },
    ],
    whereTitle: "Où et quand ?",
    whereText:
      "Les ateliers ont lieu à l'atelier-boutique de Vavang'Art ou chez nos partenaires — comme le Dimitile Hôtel & Spa ****, avec lequel nous animons des ateliers confiture suivis d'une dégustation.",
    infoItems: [
      "Durée : 2 heures",
      "Gratuit pour les moins de 10 ans",
      "Tarif unique libre : minimum 5 € par personne",
      "Ateliers gourmands sur devis pour les groupes",
      "Réservation : 06 92 55 35 72", 
    ],
    groupsTitle: "Groupes, écoles, structures",
    groupsText:
      "Centres de loisirs, écoles, associations, comités d'entreprise : écrivez-nous pour un atelier sur mesure autour du goût et de l'anti-gaspillage.",
    bookNote:
      "La réservation se fait par téléphone ou par message sur nos réseaux — c'est simple, c'est humain, et ça nous arrange.",
    downloadFlyer: "Voir le flyer de l'atelier",
  },
  territoire: {
    title: "Nos producteurs & le territoire — L'Entre-Deux, La Réunion",
    description:
      "Agriculteurs, coopératives et bazardiers péi : découvrez le réseau local qui alimente l'atelier de La Gourmandise des Moches à L'Entre-Deux, dans le Sud sauvage.",
    kicker: "Producteurs & territoire",
    h1: "Fiers de nos producteurs péi.",
    sub: "Derrière chaque bocal : des mains qui plantent, récoltent et nous appellent quand une récolte a besoin d'un sauvetage.",
    networkTitle: "Un réseau tout proche",
    networkItems: [
      { title: "Agriculteurs de l'île", text: "Petites exploitations, grandes récoltes : nous rachetons leurs invendus et déclassés." },
      { title: "Coopératives péi", text: "Quand les volumes dépassent le marché, la bassine à confiture prend le relais." },
      { title: "Bazardiers & maraîchers", text: "Les étals savent où se cachent les plus beaux moches — ils nous les gardent." },
      { title: "Particuliers", text: "Un verger trop généreux ? Certains fruits d'atelier viennent aussi des jardins de la région." },
    ],
    landTitle: "L'Entre-Deux, entre mer et montagne",
    landText:
      "Niché dans le Sud sauvage, entre le volcan et l'océan, le village de L'Entre-Deux est une terre de culture — de fruits, de fleurs et de savoir-faire. C'est ici que se trouve Vavang'Art, le village d'artisans où l'atelier a élu domicile, dans la « kaz à fabrik ».",
    landPoints: [
      "Sud sauvage : un terroir volcanique généreux",
      "Vavang'Art : un village d'artisans et de créateurs",
      "La Réunion : une île, mille saisons de fruits",
    ],
    joinTitle: "Rejoindre la chaîne de sauvetage",
    joinText:
      "Producteur, coopérative, maraîcher ou simple jardinier débordé : si vous avez des fruits et légumes péi qui cherchent preneur, notre bassine vous attend.",
  },
  histoire: {
    title: "Notre histoire — Sandra Ramaye & La Gourmandise des Moches",
    description:
      "De l'horreur du gaspillage à l'association de Vavang'Art : l'histoire de Sandra Ramaye et de La Gourmandise des Moches, née en 2022 à La Réunion.",
    kicker: "Notre histoire",
    h1: "Il était une fois des fruits que personne ne voulait.",
    sub: "Et une confiturière qui a décidé que ce n'était pas une fin, mais un début.",
    chapters: [
      {
        title: "2015 — Le déclic",
        text: "Sandra Ramaye pose ses valises à La Réunion. Entre les étals et les champs, elle découvre une réalité qui lui serre le cœur : des fruits et légumes magnifiques de goût jetés pour leur simple apparence.",
      },
      {
        title: "La bassine avant le business",
        text: "Étals après étals, elle rachète les invendus et apprend le terroir : mangues, bringelles, pomélos, bananes… Sa cuisine devient un laboratoire où les moches finissent en confitures.",
      },
      {
        title: "2022 — L'association est née",
        text: "Déclarée le 29 août 2022, La Gourmandise des Moches officialise la mission : lutter contre le gaspillage, favoriser les circuits courts et ouvrir des chemins d'insertion professionnelle.",
      },
      {
        title: "Vavang'Art, la maison",
        text: "Très vite, l'atelier s'installe à L'Entre-Deux, dans le village d'artisans de Vavang'Art. En 2025, il déménage à quelques pas, dans un local plus grand avec le précieux point d'eau : la « kaz à fabrik ».",
      },
      {
        title: "Aujourd'hui — et demain",
        text: "Boutique, bocaux, ateliers confiture, partenariats comme celui du Dimitile Hôtel & Spa… La suite s'écrit avec celles et ceux qui passent la porte, bocal en main.",
      },
    ],
    quoteTitle: "Sa conviction",
    quote: "« Je rachète que des produits péi, pas d'importation. »",
    quoteSource: "Sandra Ramaye, interview Linfo.re",
    missionTitle: "Ce que dit le texte de l'association",
    missionText:
      "Lutter contre le gaspillage alimentaire, favoriser les circuits courts, et concourir à l'insertion professionnelle des personnes en difficulté. Trois lignes de statuts, une journée entière de travail.",
  },
  galerie: {
    title: "Galerie — gourmandises, atelier et couleurs de La Réunion",
    description:
      "Confitures ambrées, soupes du moment, fruits sauvés et lumière tropicale : la galerie de La Gourmandise des Moches. Le quotidien réel se vit sur Instagram.",
    kicker: "Galerie",
    h1: "L'atelier en couleurs.",
    sub: "Un avant-goût visuel — le vrai quotidien de la boutique se partage chaque semaine sur Instagram et Facebook.",
    note: "Galerie de l'atelier, des produits et du territoire, complétée par les visuels du catalogue.",
    items: [
      { fr: "Confitures en pleine sieste dorée", en: "Jams enjoying a golden nap" },
      { fr: "Le fameux ketchup de banane", en: "The famous banana ketchup" },
      { fr: "Compotes pour les goûters sages", en: "Compotes for mindful snacks" },
      { fr: "Soupe des légumes sauvés", en: "Soup-of-the-rescued-vegetables" },
      { fr: "Jus & nectars couleur soleil", en: "Sun-coloured juices & nectars" },
      { fr: "Sirops à partager (ou pas)", en: "Syrups to share (or not)" },
      { fr: "En cuisine, la découpe des moches", en: "In the kitchen, prepping the rescued" },
      { fr: "L'Entre-Deux, notre territoire", en: "L'Entre-Deux, our homeland" },
      { fr: "La boutique de Vavang'Art", en: "The Vavang'Art boutique" },
    ],
    followCta: "Pour les photos du quotidien",
    followText: "Cuvées du moment, marchés, annonces d'ateliers : tout se passe sur nos réseaux.",
  },
  contact: {
    title: "Contact, horaires & accès — La Gourmandise des Moches, L'Entre-Deux",
    description:
      "Téléphone, e-mail, horaires et plan d'accès de La Gourmandise des Moches à Vavang'Art, L'Entre-Deux. Appelez pour vos bocaux, ateliers ou partenariats.",
    kicker: "Contact & visite",
    h1: "On vous attend à L'Entre-Deux.",
    sub: "Un appel pour un bocal, un mail pour un partenariat, un détour pour le plaisir : choisissez votre porte d'entrée.",
    form: {
      title: "Écrire un message",
      name: "Votre nom",
      namePh: "Marie Payet",
      email: "Votre e-mail",
      emailPh: "marie@exemple.re",
      subject: "Sujet",
      subjects: {
        general: "Question générale",
        products: "Bocaux & dispo",
        workshop: "Ateliers",
        producer: "Je suis producteur",
        partner: "Partenariat / presse",
      },
      message: "Votre message",
      messagePh: "Bonjour, je passe samedi matin : reste-t-il de la confiture de pomélo ?",
      send: "Envoyer le message",
      sending: "Envoi en cours…",
      success: "Merci ! Votre message est bien arrivé dans la bassine. Nous vous répondons vite.",
      error: "Oups, l'envoi a échoué. Réessayez ou appelez-nous directement.",
      required: "Champ requis",
      invalidEmail: "E-mail invalide",
      privacy: "Votre message est transmis à l'équipe de la boutique. Pas de newsletter surprise, promis.",
    },
    direct: {
      title: "Le direct",
      call: "Appeler",
      email: "Écrire un e-mail",
      whatsappNote: "Réservation ateliers & mise de côté : privilégiez l'appel.",
    },
    whyTitle: "Pourquoi nous contacter ?",
    whyItems: [
      "Réserver des bocaux ou connaître les cuvées du moment",
      "Réserver un atelier confiture",
      "Proposer vos surplus (producteurs, coopératives, particuliers)",
      "Partenariats, presse, événements",
    ],
  },
  restaurantPage: {
    title: "Restaurant anti-gaspi 100 % vegan, végétarien et sans gluten à L'Entre-Deux — repas à 8 €",
    description:
      "Le restaurant anti-gaspillage de La Gourmandise des Moches à L'Entre-Deux : repas 100 % vegan, végétariens et sans gluten à prix unique (8 €), le midi sur place ou à emporter, cuisinés avec des produits péi sauvés.",
    kicker: "Le restaurant",
    h1: "La cuisine des « moches », servie chaude.",
    sub: "À l'entrée du village de L'Entre-Deux, un restaurant 100 % vegan, végétarien et sans gluten — chaque assiette est une victoire contre le gaspillage.",
    conceptTitle: "Le concept",
    conceptText:
      "Ici, on cuisine ce que les circuits classiques refusent : bananes tachées, légumes hors calibre, invendus du jour. Résultat : une cuisine 100 % vegan, végétarienne et sans gluten, inventive, généreuse et franchement péi, servie à prix unique pour rester accessible à tout le monde.",
    priceTitle: "Un prix, point final",
    priceText: "Tous les repas sont au même tarif. Pas de carte à rallonge, pas de mauvaise surprise à l'addition.",
    dishTitle: "Un exemple de plat",
    dishText:
      "Le plat cité par Sandra dans la presse : un carry de peaux de bananes aux lentilles corail. Oui, les épluchures. Et oui, c'est délicieux.",
    menuTitle: "Le menu du jour",
    menuText:
      "Le menu n'est pas figé : il dépend de ce que les producteurs et bazardiers ont à sauver cette semaine. C'est ce qui le rend vivant — et c'est pourquoi le plat du jour s'annonce par téléphone et sur nos réseaux.",
    practicalTitle: "Infos pratiques",
    practicalItems: [
      "Service le midi, sur place ou à emporter",
      "Cuisine 100 % vegan, végétarienne et sans gluten",
      "Prix unique pour tous les repas",
      "À l'entrée du village de L'Entre-Deux",
    ],
    verifyNote:
      "Adresse précise et jours d'ouverture : le restaurant étant tout récent, appelez-nous pour confirmer avant de vous déplacer.",
    modelTitle: "Pourquoi ça compte",
    modelText:
      "Le restaurant fait tourner toute la démarche : il achète les surplus aux producteurs, finance les charges et les salaires, et permet à l'association de continuer son travail d'insertion. Manger ici, c'est faire tourner la boucle.",
    ctaTitle: "On garde une assiette au chaud ?",
    ctaText: "Appelez pour connaître le plat du jour, réserver une table ou commander à emporter.",
  },
  mentionsLegales: {
    title: "Mentions légales — La Gourmandise des Moches, L'Entre-Deux",
    description:
      "Mentions légales du site de La Gourmandise des Moches : éditeur, hébergement, propriété intellectuelle et crédits.",
    kicker: "Informations légales",
    h1: "Mentions légales",
    sub: "Les informations obligatoires concernant l'éditeur de ce site, son hébergement et ses contenus.",
    updated: "Première version du site, publiée en 2026.",
    alsoSee: "Voir aussi",
    sections: [
      {
        heading: "Éditeur du site",
        body: [
          "Ce site est édité par l'association La Gourmandise des Moches (association loi 1901), SIREN 919 056 135, dont le siège est situé 4C rue Hubert Delisle — Vavang'Art, 97414 L'Entre-Deux, La Réunion, France.",
          "Téléphone : 06 92 55 35 72 · E-mail : contactgourmandisedesmoches@gmail.com",
        ],
      },
      {
        heading: "Directrice de la publication",
        body: ["Sandra Ramaye, gérante de l'association."],
      },
      {
        heading: "Hébergement",
        body: [
          "Ce site est hébergé par Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis — www.netlify.com.",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        body: [
          "L'ensemble des contenus du site (textes, illustrations, identité visuelle) est la propriété de l'association La Gourmandise des Moches, sauf mention contraire. Toute reproduction ou réutilisation, même partielle, sans autorisation écrite préalable est interdite.",
          "Les marques et logos cités (Instagram, Facebook, HelloAsso, Le Dimitile Hôtel & Spa) appartiennent à leurs propriétaires respectifs.",
        ],
      },
      {
        heading: "Crédits",
        body: [
          "Visuels : illustrations créées pour ce site, en attendant la galerie photo officielle de la boutique.",
          "Icônes : Lucide (licence ISC). Typographies : Fraunces et Karla (SIL Open Font License).",
        ],
      },
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité (RGPD) — La Gourmandise des Moches",
    description:
      "Politique de confidentialité du site de La Gourmandise des Moches : données du formulaire de contact, statistiques sans cookies et vos droits RGPD.",
    kicker: "Vos données",
    h1: "Politique de confidentialité",
    sub: "Ce que ce site collecte, pourquoi, et les droits dont vous disposez — expliqué simplement, conformément au RGPD.",
    updated: "Première version du site, publiée en 2026.",
    alsoSee: "Voir aussi",
    sections: [
      {
        heading: "Responsable de traitement",
        body: [
          "L'association La Gourmandise des Moches, 4C rue Hubert Delisle — Vavang'Art, 97414 L'Entre-Deux, La Réunion — contactgourmandisedesmoches@gmail.com.",
        ],
      },
      {
        heading: "Formulaire de contact",
        body: [
          "Le formulaire collecte uniquement votre nom, votre adresse e-mail et votre message. Ces données servent exclusivement à répondre à votre demande (bocaux, ateliers, partenariats, producteurs).",
          "Elles ne sont ni vendues, ni transmises à des tiers à des fins commerciales, ni utilisées pour de la prospection. Elles sont conservées au maximum 12 mois, sauf échange en cours.",
        ],
      },
      {
        heading: "Statistiques de fréquentation",
        body: [
          "Le site mesure sa fréquentation sans cookies et sans identifiants : pages vues, langue de consultation et clics sur les actions principales (téléphone, itinéraire, réseaux sociaux, formulaires).",
          "Aucune adresse IP, aucun identifiant publicitaire et aucune empreinte d'appareil n'est enregistrée. Ces mesures servent uniquement à améliorer le site.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "Ce site ne dépose aucun cookie de suivi ni cookie tiers — c'est pourquoi il n'affiche aucun bandeau de consentement.",
          "La carte Google Maps est fournie par Google et relève de sa propre politique de confidentialité.",
        ],
      },
      {
        heading: "Hébergement et transferts",
        body: [
          "Le site est hébergé par Netlify, Inc. (États-Unis). Les journaux techniques habituels d'un hébergeur peuvent s'appliquer ; les éventuels transferts sont encadrés par des clauses contractuelles types.",
        ],
      },
      {
        heading: "Vos droits",
        body: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité sur vos données. Écrivez à contactgourmandisedesmoches@gmail.com : nous répondons sous 30 jours.",
          "Vous pouvez également déposer une réclamation auprès de la CNIL (www.cnil.fr).",
        ],
      },
    ],
  },
  notFound: {
    title: "Page introuvable",
    text: "Cette page s'est peut-être fait transformer en compote. Revenons à l'accueil.",
  },
};

export type Dictionary = typeof fr;
