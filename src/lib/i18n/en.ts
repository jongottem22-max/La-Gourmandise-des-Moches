import type { Dictionary } from "./fr";

/**
 * English dictionary. Natural localization (not literal) — brand flavor kept:
 * "moches" stays French, "péi" is glossed once as "local, island-style".
 */

export const en: Dictionary = {
  meta: {
    siteName: "La Gourmandise des Moches",
    tagline: "Ugly outside, wonderful inside.",
    defaultTitle: "La Gourmandise des Moches — Artisanal anti-waste preserves in L'Entre-Deux, Réunion Island",
    description:
      "In L'Entre-Deux, Réunion Island, La Gourmandise des Moches turns “ugly” local fruit and vegetables into handmade jams, soups, nectars and syrups. Shop & workshop at 4A rue Fortuné Hoarau, open Sunday to Friday.",
    keywords:
      "Réunion Island local food, artisanal jam Réunion, food waste initiative Réunion, L'Entre-Deux, short supply chain preserves",
  },
  nav: {
    home: "Home",
    restaurant: "Restaurant",
    produits: "Our products",
    boutique: "Shop & workshop",
    demarche: "Our mission",
    ateliers: "Workshops",
    territoire: "Producers & land",
    histoire: "Our story",
    galerie: "Gallery",
    adhesion: "Join us",
    contact: "Contact",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Choose language",
    switchTo: { fr: "Passer au français", en: "Switch to English" },
    skip: "Skip to content",
    breadcrumb: "Breadcrumb",
  },
  common: {
    cta: {
      products: "Discover our products",
      visit: "Plan your visit",
      call: "Call the shop",
      directions: "Get directions",
      contact: "Get in touch",
      instagram: "Follow on Instagram",
      facebook: "Follow on Facebook",
      support: "Support the non-profit",
      book: "Book a workshop",
      story: "Read our story",
      demarche: "See our mission",
      ateliers: "Explore workshops",
      gallery: "View the gallery",
      taste: "Visit the shop",
    },
    badges: {
      antiGaspi: "Anti-waste",
      pei: "100% local péi",
      handmade: "Handmade",
      seasonal: "Seasonal",
    },
    labels: {
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Opening hours",
      follow: "Follow us",
      where: "Where to find us",
    },
    hoursNote:
      "Hours verified in autumn 2024 — they may change: check our social channels for announcements before heading over.",
    backHome: "Back to home",
  },
  footer: {
    tagline:
      "Local péi fruit and vegetables rescued from waste, turned by hand into treats in L'Entre-Deux.",
    navTitle: "Explore",
    contactTitle: "Find us",
    hoursTitle: "Opening hours",
    legal: "Non-profit association (loi 1901) · SIREN 919 056 135",
    rights: "All rights reserved.",
    madeNote: "A bilingual site, slow-cooked in L'Entre-Deux with unsold pixels.",
    creditIllustrations: "Imagery: illustrative visuals pending our official photo gallery.",
    legalLinks: {
      mentionsLegales: "Legal notice",
      confidentialite: "Privacy policy",
    },
  },
  home: {
    title: "Artisanal anti-waste preserves in L'Entre-Deux, Réunion Island",
    description:
      "Jams, compotes, soups, nectars, syrups and banana ketchup handmade in L'Entre-Deux from island-grown fruit and vegetables saved from the bin.",
    kicker: "Atelier-Boutique Restaurant · L'Entre-Deux · Réunion Island",
    heroA: "Ugly fruit,",
    heroB: "glorious",
    heroC: "jars of",
    heroD: "joy.",
    heroSub:
      "Founded in August 2022 by Sandra Ramaye, the association celebrates so-called “ugly” fruit and vegetables. Surplus becomes jams, syrups, pickles, chutneys, compotes, nectars, soups, ketchup and other sauces, made by hand.",
    heroHint: "Sun–Fri · 9 am–5 pm · L'Entre-Deux",
    marquee: [
      "Bruised mangoes",
      "Overripe bananas",
      "Crooked tomatoes",
      "Off-size pomelos",
      "Wonky eggplants",
      "Speckled guavas",
      "Lopsided pineapples",
      "Bumpy combavas",
    ],
    pillars: {
      kicker: "Our promise",
      title: "Nothing wasted, everything transformed.",
      sub: "Three simple principles, followed every day at the workshop.",
      items: [
        {
          title: "Bought, not scavenged",
          text: "We purchase surplus from local farmers, cooperatives and market sellers. Their excess becomes income, not landfill.",
        },
        {
          title: "Transformed by hand",
          text: "Peeling, slow cooking and jarring all happen at the 4A rue Fortuné Hoarau workshop, with Creole-inspired and inventive recipes, small batches and even recycled jars.",
        },
        {
          title: "Good for the island",
          text: "The non-profit also nurtures professional inclusion: learning a trade while saving fruit — that's the idea.",
        },
      ],
    },
    process: {
      kicker: "From ugly to wonderful",
      title: "The journey of a rescued fruit",
      steps: [
        { title: "The surplus", text: "Unsold or downgraded harvests from growers across the island." },
        { title: "The purchase", text: "We buy at a fair price — the skip can stay empty." },
        { title: "The transformation", text: "Sorting, chopping, cooking, jarring at the workshop." },
        { title: "The treat", text: "Jars sold at the shop keep the social mission moving." },
      ],
    },
    products: {
      kicker: "The treats",
      title: "What we rescue, we jar.",
      sub: "The selection changes with the seasons and the rescues — here are the workshop's great jar families.",
      cardCta: "See all products",
      note: "Availability varies: call or drop by the shop to hear what's on the shelf right now.",
    },
    restaurant: {
      kicker: "The anti-waste restaurant",
      title: "At lunchtime, pull up a chair.",
      lead: "Sandra has opened her restaurant at the entrance of L'Entre-Deux village: a kitchen that is 100% vegan, vegetarian and gluten-free, built around the “ugly” fruit and vegetables saved from the bin.",
      hoursLabel: "Lunch service",
      priceLabel: "One price",
      priceSuffix: "per meal",
      dishKicker: "The dish that says it all",
      sorbetKicker: "The frozen treat",
      points: [
        { title: "100% vegan, vegetarian and gluten-free", text: "Every plate is generous, meat-free and gluten-free, composed from whatever the island's growers have in surplus." },
        { title: "Eat in or take away", text: "Lunch is served Sunday to Friday, 11.30 am to 3.30 pm: sit down with us… or grab your box and go." },
        { title: "Short circuit, all the way", text: "“All the money we earn goes straight back into the circuit”: producers paid, running costs and wages covered." },
      ],
      quote: "The whole menu is 100% vegan, vegetarian and gluten-free — cooked with the ‘ugly ones’.",
      quoteSource: "The restaurant kitchen",
      menuNote: "The menu changes with each rescue: call us to hear today's dish.",
      cta: "Discover the restaurant",
    },
    boutique: {
      kicker: "The shop & workshop",
      title: "Come see where the jars are born.",
      text: "In the heart of the village of L'Entre-Deux, at 4A rue Fortuné Hoarau, the shop smells of simmering sugar and ripe fruit. Browse the current batches, chat about rescue cooking, and maybe leave with a recipe.",
      points: [
        "Jams, soups, nectars, syrups and compotes of the moment",
        "Friendly advice — and the story behind every jar",
        "A living craft venue, surrounded by L'Entre-Deux's creators",
      ],
      hoursTitle: "Opening hours",
      addressTitle: "Address",
      ctaMap: "Open in Google Maps",
    },
    founder: {
      kicker: "The jam-maker",
      title: "Sandra Ramaye, fruit rescuer.",
      quote: "“I hate food waste. An ugly fruit is never a bad fruit.”",
      text: "Sandra Ramaye founded the association in August 2022 with one simple conviction: an ugly fruit is never a bad fruit. At the workshop, surplus becomes jars, workshops and an invitation to taste differently.",
    },
    territory: {
      kicker: "L'Entre-Deux, the wild south",
      title: "A generous island, a village of makers.",
      text: "Between ocean and cirque, L'Entre-Deux cultivates flavours and know-how. It's here, in the “kaz à fabrik” (making house) at 4A rue Fortuné Hoarau, that the workshop set down its jam pot.",
      cta: "Discover the land",
    },
    proof: {
      kicker: "Loved already",
      title: "Jars that travel.",
      dimitile:
        "Le Dimitile Hôtel & Spa **** stocks our creations in its boutique and co-hosts jam workshops with us.",
      facebook: "100% recommended on Facebook (8 reviews)",
      instagram: "Fresh batches are announced on Instagram",
    },
    final: {
      title: "Fancy tasting a rescued fruit?",
      text: "Drop by the shop, call us to set jars aside, or come cook with us at a workshop.",
    },
  },
  produits: {
    title: "Our artisanal products — jams, soups, nectars & syrups from Réunion",
    description:
      "Jams from “ugly” fruit, banana ketchup, compotes, soups, juices, nectars and syrups: the handmade jars of La Gourmandise des Moches, crafted in L'Entre-Deux.",
    kicker: "Our treats",
    h1: "Jars that smell like the island.",
    sub: "Every batch depends on the latest rescues: these are the workshop's product families. To know what's on the shelf today, just call.",
    viewRecipes: "See this category's recipes",
    seasonNote:
      "Small-batch artisanal production: flavours rotate with the harvests and available surplus. That's the point of rescue cooking!",
    ctaTitle: "A jar in mind?",
    ctaText: "Call the shop to hear about the current batches and set your favourites aside.",
    processNote: "From surplus to jar:",
    catalogueTitle: "The recipe catalogue",
    catalogueSub: "References and ingredients transcribed from the supplied catalogue. Availability follows harvests and rescued surplus.",
    ingredientsLabel: "Ingredients",
    downloadCatalogue: "Download the catalogue PDF",
  },
  boutique: {
    title: "The shop & workshop at 4A rue Fortuné Hoarau, L'Entre-Deux — hours & directions",
    description:
      "La Gourmandise des Moches welcomes you at 4A rue Fortuné Hoarau, L'Entre-Deux, Sunday to Friday, 9 am–5 pm. Current jars, friendly advice and workshops.",
    kicker: "Shop & workshop",
    h1: "The little jar house of L'Entre-Deux.",
    sub: "A living workshop-boutique in the artisan village of L'Entre-Deux. Walk in curious, walk out hungry for more.",
    visitTitle: "Come and see us",
    visitText:
      "The shop sits at 4A rue Fortuné Hoarau, in the heart of L'Entre-Deux's artisan village. Take the time to wander between the makers' studios nearby.",
    whatTitle: "What you'll find",
    whatItems: [
      "The jars of the moment: jams, syrups, pickles, chutneys, compotes, nectars, soups, ketchup and sauces…",
      "The story of every batch, told with a smile",
      "Recipe ideas for the tired fruit in your own kitchen",
      "The workshop in action, when the pots are bubbling",
    ],
    atelierTeaser: {
      title: "How about making jam yourself?",
      text: "We also run workshops so you can learn to rescue your own fruit — like the ones we host with Le Dimitile Hôtel & Spa.",
    },
    mapCta: "Show the map",
    mapLoading: "Loading the map…",
    mapTitle: "Map: La Gourmandise des Moches, 4A rue Fortuné Hoarau, L'Entre-Deux",
    imperative: "Check our socials for announcements (exceptional closures, special batches).",
  },
  demarche: {
    title: "Our anti-waste mission — short supply chains & inclusion, Réunion",
    description:
      "Buying surplus from local producers, artisanal transformation, zero imports and professional inclusion: the anti-waste approach of La Gourmandise des Moches.",
    kicker: "Our mission",
    h1: "Anti-waste, from field to jar.",
    sub: "Our model fits in one sentence: buy what the island no longer wants to look at — and make it irresistible.",
    stepsTitle: "The virtuous circle",
    steps: [
      {
        title: "1 · Waste starts in the field",
        text: "Off-size, overproduced, overripe: every season, tonnes of perfectly tasty local produce risk the bin.",
      },
      {
        title: "2 · We buy it — truly",
        text: "Farmers, cooperatives, market sellers: we pay for their surplus instead of collecting it free. Extra income for those who feed the island, extra motivation to stop throwing away.",
      },
      {
        title: "3 · Transformation works the magic",
        text: "At the 4A rue Fortuné Hoarau workshop, the “ugly ones” become jams, soups, nectars… Slow cooking, small batches, house recipes, nothing imported.",
      },
      {
        title: "4 · The social side grows",
        text: "As a non-profit working through economic inclusion, reviving fruit also means learning a trade and finding a path back to employment.",
      },
      {
        title: "5 · You get to taste",
        text: "Every jar purchased closes the loop: a paid producer, a saved fruit, a funded social mission — and a very good snack.",
      },
    ],
    principlesTitle: "Our red lines",
    principles: [
      { title: "100% péi", text: "“I only buy local péi produce — no imports.” The principle has never budged." },
      { title: "Short chains", text: "Our fruit travels a few kilometres, not a few seas." },
      { title: "Purchase, not donation", text: "Giving surplus economic value, so anti-waste stays sustainable for everyone." },
      { title: "Transmission", text: "Workshops and training to spread the rescue reflexes." },
    ],
    producerTitle: "Are you a producer?",
    producerText:
      "Surplus, downgraded produce, a harvest struggling to sell? Let's talk: we buy local péi fruit and vegetable surplus.",
    producerCta: "Become a partner producer",
    supportTitle: "Support the young non-profit",
    supportText:
      "Born in 2022, the association grows thanks to jar sales and helping hands. An online fund is open on HelloAsso to equip the workshop.",
  },
  ateliers: {
    title: "Jam workshops in Réunion Island — learn to rescue fruit",
    description:
      "Jam-making and anti-waste transformation workshops led by Sandra Ramaye in L'Entre-Deux and with partners like Le Dimitile Hôtel & Spa. Booking by phone.",
    kicker: "Workshops",
    h1: "Get your hands into jam.",
    sub: "Choosing fruit, chopping, cooking, jarring: leave with your own creation and the right anti-waste reflexes.",
    howTitle: "How it unfolds",
    howItems: [
      { title: "Choosing the ugly ones", text: "Ripe, bruised, forgotten fruit: their moment of glory." },
      { title: "Cooking together", text: "Guided step by step, you compose your own recipe — sweetness, spices, boldness." },
      { title: "Tasting & jarring", text: "A guided tasting of the workshop's creations, then everyone leaves with their jar." },
    ],
    whereTitle: "Where & when?",
    whereText:
      "Workshops take place at the 4A rue Fortuné Hoarau workshop-shop or at our partners' venues — like Le Dimitile Hôtel & Spa ****, where we co-host jam workshops followed by a tasting.",
    infoItems: [
      "Duration: 2 hours",
      "Free for children under 10",
      "Pay what you can: minimum €5 per person",
      "Gourmet workshops for groups: quote on request",
      "Booking: +262 692 55 35 72", 
    ],
    groupsTitle: "Groups, schools, organisations",
    groupsText:
      "Leisure centres, schools, associations, companies: write to us for a tailor-made workshop around taste and anti-waste.",
    bookNote:
      "Booking is done by phone or via a message on our socials — simple, human, and it suits us fine.",
    downloadFlyer: "View the workshop flyer",
  },
  territoire: {
    title: "Our producers & the land — L'Entre-Deux, Réunion Island",
    description:
      "Farmers, cooperatives and market sellers of Réunion: meet the local network that supplies the La Gourmandise des Moches workshop in L'Entre-Deux, in the wild south.",
    kicker: "Producers & land",
    h1: "Proud of our péi producers.",
    sub: "Behind every jar: hands that plant, harvest, and call us when a crop needs rescuing.",
    networkTitle: "A close-knit network",
    networkItems: [
      { title: "Island farmers", text: "Small farms, big harvests: we buy their surplus and downgraded produce." },
      { title: "Local cooperatives", text: "When volumes exceed the market, the jam pot steps in." },
      { title: "Market sellers & growers", text: "Stallholders know where the finest ugly ones hide — they set them aside for us." },
      { title: "Private gardens", text: "A too-generous orchard? Some workshop fruit also comes from gardens in the area." },
    ],
    landTitle: "L'Entre-Deux, between sea and mountain",
    landText:
      "Nestled in the wild south, between volcano and ocean, the village of L'Entre-Deux is a land of culture — of fruits, flowers and know-how. It's here, in the “kaz à fabrik” (making house) at 4A rue Fortuné Hoarau, that the workshop settled.",
    landPoints: [
      "Wild south: a generous volcanic terroir",
      "L'Entre-Deux: a village of artisans and creators",
      "Réunion: one island, a thousand fruit seasons",
    ],
    joinTitle: "Join the rescue chain",
    joinText:
      "Producer, cooperative, grower or just an overwhelmed gardener: if you have local fruit and vegetables looking for a home, our jam pot is waiting.",
  },
  histoire: {
    title: "Our story — Sandra Ramaye & La Gourmandise des Moches",
    description:
      "From hating food waste to the L'Entre-Deux association: the story of Sandra Ramaye and La Gourmandise des Moches, founded in 2022 on Réunion Island.",
    kicker: "Our story",
    h1: "Once upon a time, there was fruit nobody wanted.",
    sub: "And a jam-maker who decided it wasn't an ending, but a beginning.",
    chapters: [
      {
        title: "2015 — The wake-up call",
        text: "Sandra Ramaye settles in Réunion. Between market stalls and fields, she discovers a heartbreaking reality: gloriously tasty fruit and vegetables thrown away for their looks alone.",
      },
      {
        title: "The jam pot before the business",
        text: "Stall after stall, she buys up surplus and learns the terroir: mangoes, eggplants, pomelos, bananas… Her kitchen becomes a laboratory where the ugly ones turn into jam.",
      },
      {
        title: "2022 — The association is born",
        text: "Registered on 29 August 2022, La Gourmandise des Moches makes the mission official: fight food waste, favour short supply chains, and open paths to professional inclusion.",
      },
      {
        title: "L'Entre-Deux, home",
        text: "The workshop soon settles in L'Entre-Deux, in the heart of the artisans' village. In 2025, it moves a few steps away to 4A rue Fortuné Hoarau, into a larger space with a precious water point: the “kaz à fabrik”.",
      },
      {
        title: "Today — and tomorrow",
        text: "Shop, jars, jam workshops, partnerships like Le Dimitile Hôtel & Spa… The next chapter is written with everyone who walks through the door, jar in hand.",
      },
    ],
    quoteTitle: "Her conviction",
    quote: "“I only buy local péi produce — no imports.”",
    quoteSource: "Sandra Ramaye, interview with Linfo.re",
    missionTitle: "What the association's charter says",
    missionText:
      "Fight food waste, favour short supply chains, and contribute to the professional inclusion of people in difficulty. Three lines of statutes, a full day's work.",
  },
  galerie: {
    title: "Gallery — treats, workshop and the colours of Réunion",
    description:
      "Amber jams, soups of the moment, rescued fruit and tropical light: the gallery of La Gourmandise des Moches. Daily life happens on Instagram.",
    kicker: "Gallery",
    h1: "The workshop in colour.",
    sub: "A visual appetiser — the real day-to-day of the shop is shared every week on Instagram and Facebook.",
    note: "A gallery of the workshop, products and territory, complemented by catalogue visuals.",
    items: [
      { fr: "Confitures en pleine sieste dorée", en: "Jams enjoying a golden nap" },
      { fr: "Le fameux ketchup de banane", en: "The famous banana ketchup" },
      { fr: "Compotes pour les goûters sages", en: "Compotes for mindful snacks" },
      { fr: "Soupe des légumes sauvés", en: "Soup-of-the-rescued-vegetables" },
      { fr: "Jus & nectars couleur soleil", en: "Sun-coloured juices & nectars" },
      { fr: "Sirops à partager (ou pas)", en: "Syrups to share (or not)" },
      { fr: "En cuisine, la découpe des moches", en: "In the kitchen, prepping the rescued" },
      { fr: "L'Entre-Deux, notre territoire", en: "L'Entre-Deux, our homeland" },
      { fr: "La boutique du 4A rue Fortuné Hoarau", en: "The 4A rue Fortuné Hoarau boutique" },
    ],
    followCta: "For everyday photos",
    followText: "Current batches, markets, workshop announcements: it all happens on our socials.",
  },
  contact: {
    title: "Contact, hours & directions — La Gourmandise des Moches, L'Entre-Deux",
    description:
      "Phone, email, opening hours and directions to La Gourmandise des Moches at 4A rue Fortuné Hoarau, L'Entre-Deux. Call for jars, workshops or partnerships.",
    kicker: "Contact & visit",
    h1: "We'll be waiting in L'Entre-Deux.",
    sub: "A call for a jar, an email for a partnership, a detour for pleasure: pick your door.",
    form: {
      title: "Send a message",
      name: "Your name",
      namePh: "Mary Payet",
      email: "Your email",
      emailPh: "mary@example.com",
      subject: "Subject",
      subjects: {
        general: "General question",
        products: "Jars & availability",
        workshop: "Workshops",
        producer: "I'm a producer",
        partner: "Partnership / press",
      },
      message: "Your message",
      messagePh: "Hello, I'm coming on Saturday morning: is there any pomelo jam left?",
      send: "Send the message",
      sending: "Sending…",
      success: "Thank you! Your message landed safely in our jam pot. We'll reply shortly.",
      error: "Oops, sending failed. Please retry — or simply call us.",
      required: "Required field",
      invalidEmail: "Invalid email",
      privacy: "Your message goes straight to the shop team. No surprise newsletters, promise.",
      channelsIntro:
        "Pick a subject: your email app opens a pre-addressed message to the shop. All that's left to do is write.",
      channelsFallback: "No email app handy? Copy our address:",
      whatsappCta: "Chat on WhatsApp",
    },
    direct: {
      title: "Direct lines",
      call: "Call us",
      email: "Write an email",
      whatsappNote: "For workshop bookings & setting jars aside: a call works best.",
    },
    whyTitle: "Why get in touch?",
    whyItems: [
      "Reserve jars or hear about the current batches",
      "Book a jam workshop",
      "Offer your surplus (producers, cooperatives, gardeners)",
      "Partnerships, press, events",
    ],
  },
  restaurantPage: {
    title: "100% vegan, vegetarian and gluten-free anti-waste restaurant in L'Entre-Deux — €8 meals",
    description:
      "The anti-waste restaurant of La Gourmandise des Moches in L'Entre-Deux: meals that are 100% vegan, vegetarian and gluten-free, at one single price (€8), served Sunday to Friday from 11.30 am to 3.30 pm, eat in or take away, cooked with rescued island produce.",
    kicker: "The restaurant",
    h1: "The cuisine of the “ugly ones”, served hot.",
    sub: "At the entrance of L'Entre-Deux village, a restaurant that is 100% vegan, vegetarian and gluten-free — every plate is a win against food waste.",
    conceptTitle: "The concept",
    conceptText:
      "Here we cook what the usual supply chains reject: spotted bananas, off-calibre vegetables, the day's unsold crates. The result is an inventive, generous, unmistakably island kitchen — 100% vegan, vegetarian and gluten-free — served at a single price so it stays open to everyone.",
    priceTitle: "One price, full stop",
    priceText: "Every meal costs the same. No endless menu, no surprise at the till.",
    sorbetTitle: "The homemade sorbet",
    sorbetText:
      "To finish on a fresh note: our homemade sorbet, churned at the workshop from local fruit saved from waste. Vegan and gluten-free, like the rest of the menu — the flavours change with whatever gets rescued.",
    dishTitle: "An example dish",
    dishText:
      "The dish Sandra quoted to the press: a banana-peel curry with red lentils. Yes, the peels. And yes, it's delicious.",
    menuTitle: "Today's menu",
    menuText:
      "The menu isn't fixed: it depends on what growers and market sellers need rescuing that week. That's what keeps it alive — and why the dish of the day is announced by phone and on our socials.",
    practicalTitle: "Practical info",
    hoursTitle: "Service hours",
    hoursText:
      "Lunch is served Sunday to Friday, 11.30 am to 3.30 pm. Closed on Saturdays. Come before 3 pm to be sure of the dish of the day: when it's rescued, it's served — and when it's gone, it's gone.",
    practicalItems: [
      "Lunch Sunday to Friday, 11.30 am to 3.30 pm, eat in or take away",
      "100% vegan, vegetarian and gluten-free cooking",
      "Homemade vegan, gluten-free sorbet for dessert",
      "One single price for every meal",
      "At the entrance of L'Entre-Deux village",
    ],
    verifyNote:
      "The restaurant is brand new: for the exact address, or around public holidays, one call confirms everything before you make the trip.",
    modelTitle: "Why it matters",
    modelText:
      "The restaurant powers the whole approach: it buys surplus from producers, covers running costs and wages, and lets the association continue its inclusion work. Eating here keeps the loop turning.",
    ctaTitle: "Shall we keep a plate warm?",
    ctaText: "Call to hear today's dish, book a table or order a takeaway.",
  },
  mentionsLegales: {
    title: "Legal notice — La Gourmandise des Moches, L'Entre-Deux",
    description:
      "Legal notice of the La Gourmandise des Moches website: publisher, hosting, intellectual property and credits.",
    kicker: "Legal information",
    h1: "Legal notice",
    sub: "The mandatory information about this site's publisher, its hosting and its content.",
    updated: "First version of this site, published in 2026.",
    alsoSee: "See also",
    sections: [
      {
        heading: "Site publisher",
        body: [
          "This site is published by the association La Gourmandise des Moches (French non-profit, loi 1901), SIREN 919 056 135, with its registered seat at 4A rue Fortuné Hoarau, 97414 Entre Deux, Réunion Island, France.",
          "Phone: +262 692 55 35 72 · Email: contactgourmandisedesmoches@gmail.com",
        ],
      },
      {
        heading: "Publication director",
        body: ["Sandra Ramaye, manager of the association."],
      },
      {
        heading: "Hosting",
        body: [
          "This site is hosted by GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States) — pages.github.com.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "All site content (texts, illustrations, visual identity) is the property of the association La Gourmandise des Moches, unless stated otherwise. Any reproduction or reuse, even partial, without prior written permission is prohibited.",
          "Trademarks and logos mentioned (Instagram, Facebook, HelloAsso, Le Dimitile Hôtel & Spa) belong to their respective owners.",
        ],
      },
      {
        heading: "Credits",
        body: [
          "Photography: documents and images supplied by La Gourmandise des Moches; supplementary illustrations for product families.",
          "Icons: Lucide (ISC licence). Typefaces: Fraunces and Karla (SIL Open Font License).",
        ],
      },
    ],
  },
  confidentialite: {
    title: "Privacy policy (GDPR) — La Gourmandise des Moches",
    description:
      "Privacy policy of the La Gourmandise des Moches website: contact-form data, cookieless analytics and your GDPR rights.",
    kicker: "Your data",
    h1: "Privacy policy",
    sub: "What this site collects, why, and the rights you have — explained simply, in line with the GDPR.",
    updated: "First version of this site, published in 2026.",
    alsoSee: "See also",
    sections: [
      {
        heading: "Data controller",
        body: [
          "The association La Gourmandise des Moches, 4A rue Fortuné Hoarau, 97414 Entre Deux, Réunion Island — contactgourmandisedesmoches@gmail.com.",
        ],
      },
      {
        heading: "Contact form",
        body: [
          "The form only collects your name, email address and message. This data is used exclusively to answer your enquiry (jars, workshops, partnerships, producers).",
          "It is never sold, never shared with third parties for marketing, and never used for prospecting. It is kept for a maximum of 12 months, unless a conversation is ongoing.",
        ],
      },
      {
        heading: "Audience measurement",
        body: [
          "The site measures its audience without cookies and without identifiers: page views, browsing language and clicks on the main actions (phone, directions, social networks, forms).",
          "No IP address, no advertising identifier and no device fingerprint is stored. These measurements are only used to improve the site.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "This site sets no tracking cookies and no third-party cookies — which is why you see no consent banner.",
          "The Google Maps map is provided by Google and is subject to Google's own privacy policy.",
        ],
      },
      {
        heading: "Hosting & transfers",
        body: [
          "The site is hosted by GitHub Pages, a service of GitHub, Inc. (United States). A host's standard technical logs may apply; any transfers are governed by standard contractual clauses.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You have the right to access, rectify, erase, object to and port your data. Write to contactgourmandisedesmoches@gmail.com: we reply within 30 days.",
          "You may also lodge a complaint with the CNIL (www.cnil.fr).",
        ],
      },
    ],
  },
  notFound: {
    title: "Page not found",
    text: "This page may have been turned into compote. Let's head back home.",
  },
  adhesionPage: {
    title: "Join La Gourmandise des Moches — membership form & volunteer charter",
    description:
      "Free membership of La Gourmandise des Moches in L'Entre-Deux: download the GDPR membership form and the volunteer charter, then return them to the shop or by email.",
    kicker: "Join us",
    h1: "Become part of the adventure.",
    sub: "Membership is free. It connects you to a non-profit that buys surplus from local growers, turns it into jars and meals, and makes it a tool for professional inclusion.",
    freeBadge: "Free membership",
    whyTitle: "Why join?",
    whyItems: [
      {
        title: "Support the rescue",
        text: "Surplus bought from local growers, preserves in recycled jars, meals cooked from unsold produce: your membership keeps the whole chain alive.",
      },
      {
        title: "Volunteer, if you want to",
        text: "Collection, cooking, jarring, logistics, solidarity sales or communication: the form asks how much time you could give. Nothing is compulsory.",
      },
      {
        title: "Benefit from solidarity sharing",
        text: "Members can ask to receive a share of the meals left unsold, depending on what is available.",
      },
    ],
    documentsTitle: "Documents to download",
    documentsLead:
      "The membership form is all you need to join. If you'd like to lend a hand, the volunteer charter comes on top: it sets the legal and food-safety framework on both sides.",
    documents: [
      {
        name: "Membership form",
        description:
          "Your contact details, whether you'd like to volunteer and for how many hours, solidarity meal sharing, an optional donation, and your GDPR consent. To be dated and signed.",
        meta: "For all members · PDF",
        cta: "Download the membership form",
        file: "/documents/fiche-adhesion.pdf",
      },
      {
        name: "Volunteer charter",
        description:
          "The framework for volunteering under French 1901 association law: possible missions, food hygiene and safety rules, insurance, traceability, personal data, and the freedom to stop at any time.",
        meta: "For volunteers · PDF",
        cta: "Download the charter",
        file: "/documents/charte-engagement.pdf",
      },
    ],
    stepsTitle: "How it works",
    stepsItems: [
      { title: "Download and print", text: "The membership form for everyone, plus the charter if you'd like to volunteer." },
      { title: "Fill in and sign", text: "A few fields, a GDPR box to tick, the date and your signature. Five minutes, no more." },
      { title: "Bring them back", text: "To the shop at 4A rue Fortuné Hoarau during opening hours, or scanned by email." },
    ],
    volunteerTitle: "What the volunteer charter says",
    volunteerLead:
      "Volunteering is free, unpaid, carries no relationship of subordination, and can stop at any moment. The charter sets out what each side brings.",
    volunteerAssociation: "The association commits to",
    volunteerAssociationItems: [
      "Providing an environment that meets food hygiene and safety standards",
      "Supplying workwear, gloves and suitable equipment",
      "Ensuring product traceability and an unbroken cold chain",
      "Holding public liability insurance for the association",
      "Respecting the dignity, confidentiality and integrity of volunteers",
    ],
    volunteerMember: "The volunteer commits to",
    volunteerMemberItems: [
      "Following the hygiene and safety rules given by the association",
      "Reporting any food-safety concern immediately",
      "Not handling food when unwell or showing incompatible symptoms",
      "Using equipment and premises as instructed",
      "Letting us know about any difficulty or absence",
    ],
    mealsNote:
      "Meals or products shared with volunteers come solely from unsold surplus. It is a gesture of solidarity in kind, never a payment, and it depends on availability.",
    returnTitle: "Where to return your documents",
    returnText:
      "At the shop & workshop during opening hours, or by email as an attachment. A question before you start? Just call.",
    rgpdTitle: "Your personal data",
    rgpdText:
      "The information collected is used solely to manage memberships and the association's activities. It is kept for the duration of your membership and never passed on to third parties. You have the right to access, correct or delete it: write to us and it's done.",
    rgpdLink: "Read our privacy policy",
    ctaTitle: "Ready to join us?",
    ctaText: "Call us, drop by the shop or email your completed documents — we'll be glad to hear from you.",
    printNote: "No printer? Drop by the shop: we always keep paper copies to hand.",
  },

};

