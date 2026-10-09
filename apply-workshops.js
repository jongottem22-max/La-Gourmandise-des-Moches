/**
 * apply-workshops.js — ateliers : la formule particuliers se passe à la boutique,
 * les ateliers avec déplacement et les ateliers cuisine anti-gaspi sont sur devis.
 * Supprime aussi la mention « ateliers au Dimitile ».
 *
 * Usage :  node apply-workshops.js
 * Idempotent : relancer le script ne fait rien de plus.
 */
const fs = require("fs");

const CARDS_FR = `    formulasTitle: "Nos formules",
    formulasSub:
      "L'atelier confiture pour les particuliers se déroule à la boutique. Pour venir jusqu'à vous ou animer un atelier cuisine anti-gaspillage, nous établissons un devis.",
    formulas: [
      {
        badge: "Particuliers · à la boutique",
        title: "Atelier confiture",
        text: "Chez nous, au 4A rue Fortuné Hoarau : deux heures pour choisir les fruits sauvés, cuisiner ensemble et repartir avec son pot.",
        price: "Tarif libre : minimum 5 € par personne",
      },
      {
        badge: "Groupes & collectivités · sur devis",
        title: "Atelier confiture avec déplacement",
        text: "Nous venons chez vous avec le matériel, les fruits sauvés et la bassine à confiture. Écoles, centres de loisirs, associations, comités d'entreprise, communes.",
        price: "Sur devis",
      },
      {
        badge: "Groupes & collectivités · sur devis",
        title: "Atelier cuisine anti-gaspillage",
        text: "Cuisiner les épluchures, les fruits trop mûrs et les légumes cabossés : les gestes anti-gaspi expliqués et mis en pratique, chez vous ou à l'atelier.",
        price: "Sur devis",
      },
    ],
`;

const CARDS_EN = `    formulasTitle: "Our formats",
    formulasSub:
      "The jam workshop for individuals takes place at the shop. To bring a workshop to your venue, or to run an anti-waste cooking workshop, we put together a quote.",
    formulas: [
      {
        badge: "Individuals · at the shop",
        title: "Jam workshop",
        text: "Here at 4A rue Fortuné Hoarau: two hours to pick the rescued fruit, cook together and leave with your own jar.",
        price: "Pay what you can: minimum €5 per person",
      },
      {
        badge: "Groups & local authorities · quote",
        title: "Jam workshop at your venue",
        text: "We come to you with the equipment, the rescued fruit and the jam pot. Schools, leisure centres, associations, companies, town councils.",
        price: "Quote on request",
      },
      {
        badge: "Groups & local authorities · quote",
        title: "Anti-waste cooking workshop",
        text: "Cooking with peels, overripe fruit and bruised vegetables: the anti-waste reflexes explained and put into practice, at your venue or at the workshop.",
        price: "Quote on request",
      },
    ],
`;

const SECTION_JSX = `      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={d.kicker} title={d.formulasTitle} sub={d.formulasSub} tone="leaf" />
          </Reveal>
          <ul className="grid gap-6 md:grid-cols-3">
            {d.formulas.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 120}>
                <article className="lift flex h-full flex-col rounded-3xl border-2 border-ink bg-cream p-7 shadow-sticker">
                  <span className="stamp self-start text-tomato">{item.badge}</span>
                  <h3 className="mt-4 font-display text-2xl font-black">{item.title}</h3>
                  <p className="mt-2.5 grow leading-relaxed text-ink-soft">{item.text}</p>
                  <p className="mt-5 rounded-2xl border-2 border-ink/10 bg-vanilla px-4 py-3 text-sm font-bold text-ink">
                    {item.price}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

`;

const EDITS = [
  ["src/lib/i18n/fr.ts", [
    [`      contact: "Nous contacter",\n`,
     `      contact: "Nous contacter",\n      quote: "Demander un devis",\n`],
    [`"Le Dimitile Hôtel & Spa **** propose nos créations à sa boutique et organise des ateliers confiture avec nous."`,
     `"Le Dimitile Hôtel & Spa **** propose nos créations à sa boutique."`],
    [`"Nous organisons aussi des ateliers pour apprendre à transformer vos propres fruits — comme ceux que nous animons avec le Dimitile Hôtel & Spa."`,
     `"Nous organisons aussi des ateliers confiture ici même, à la boutique, pour apprendre à transformer vos propres fruits. Pour les groupes et les collectivités, nous nous déplaçons — sur devis."`],
    [`"Ateliers de confiture et de transformation anti-gaspillage animés par Sandra Ramaye à L'Entre-Deux et avec des partenaires comme le Dimitile Hôtel & Spa. Réservation par téléphone."`,
     `"Atelier confiture pour les particuliers à la boutique du 4A rue Fortuné Hoarau, L'Entre-Deux. Atelier confiture avec déplacement et atelier cuisine anti-gaspillage pour les groupes et les collectivités, sur devis."`],
    [`    whereTitle: "Où et quand ?",
    whereText:
      "Les ateliers ont lieu à l'atelier-boutique du 4A rue Fortuné Hoarau ou chez nos partenaires — comme le Dimitile Hôtel & Spa ****, avec lequel nous animons des ateliers confiture suivis d'une dégustation.",
    infoItems: [
      "Durée : 2 heures",
      "Gratuit pour les moins de 10 ans",
      "Tarif unique libre : minimum 5 € par personne",
      "Ateliers gourmands sur devis pour les groupes",
      "Réservation : 06 92 55 35 72", 
    ],
    groupsTitle: "Groupes, écoles, structures",
    groupsText:
      "Centres de loisirs, écoles, associations, comités d'entreprise : écrivez-nous pour un atelier sur mesure autour du goût et de l'anti-gaspillage.",`,
     CARDS_FR + `    whereTitle: "Où et quand ?",
    whereText:
      "L'atelier confiture des particuliers a lieu à l'atelier-boutique du 4A rue Fortuné Hoarau, à L'Entre-Deux. Pour les groupes et les collectivités, nous nous déplaçons avec le matériel : demandez-nous un devis.",
    infoItems: [
      "Durée : 2 heures",
      "Gratuit pour les moins de 10 ans",
      "À la boutique — tarif unique libre : minimum 5 € par personne",
      "Avec déplacement ou atelier cuisine anti-gaspi : sur devis",
      "Réservation : 06 92 55 35 72", 
    ],
    groupsTitle: "Groupes, écoles, collectivités",
    groupsText:
      "Centres de loisirs, écoles, associations, comités d'entreprise, communes et collectivités : écrivez-nous pour un atelier confiture chez vous ou un atelier cuisine anti-gaspillage sur mesure. Nous vous envoyons un devis.",`],
    [`ateliers confiture, partenariats comme celui du Dimitile Hôtel & Spa…`,
     `ateliers confiture à la boutique, revendeurs partenaires comme le Dimitile Hôtel & Spa…`],
  ]],

  ["src/lib/i18n/en.ts", [
    [`      contact: "Get in touch",\n`,
     `      contact: "Get in touch",\n      quote: "Request a quote",\n`],
    [`"Le Dimitile Hôtel & Spa **** stocks our creations in its boutique and co-hosts jam workshops with us."`,
     `"Le Dimitile Hôtel & Spa **** stocks our creations in its boutique."`],
    [`"We also run workshops so you can learn to rescue your own fruit — like the ones we host with Le Dimitile Hôtel & Spa."`,
     `"We also run jam workshops right here at the shop, so you can learn to rescue your own fruit. For groups and local authorities we travel to you — quote on request."`],
    [`"Jam-making and anti-waste transformation workshops led by Sandra Ramaye in L'Entre-Deux and with partners like Le Dimitile Hôtel & Spa. Booking by phone."`,
     `"Jam workshops for individuals at the shop, 4A rue Fortuné Hoarau, L'Entre-Deux. Jam workshops at your venue and anti-waste cooking workshops for groups and local authorities, quote on request."`],
    [`    whereTitle: "Where & when?",
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
      "Leisure centres, schools, associations, companies: write to us for a tailor-made workshop around taste and anti-waste.",`,
     CARDS_EN + `    whereTitle: "Where & when?",
    whereText:
      "The jam workshop for individuals takes place at the workshop-shop, 4A rue Fortuné Hoarau, L'Entre-Deux. For groups and local authorities we travel to you with the equipment — just ask for a quote.",
    infoItems: [
      "Duration: 2 hours",
      "Free for children under 10",
      "At the shop — pay what you can: minimum €5 per person",
      "At your venue, or anti-waste cooking workshop: quote on request",
      "Booking: +262 692 55 35 72", 
    ],
    groupsTitle: "Groups, schools, local authorities",
    groupsText:
      "Leisure centres, schools, associations, companies, town councils and local authorities: write to us for a jam workshop at your venue or a tailor-made anti-waste cooking workshop. We will send you a quote.",`],
    [`jam workshops, partnerships like Le Dimitile Hôtel & Spa…`,
     `jam workshops at the shop, stockists like Le Dimitile Hôtel & Spa…`],
  ]],

  ["src/app/[lang]/ateliers/page.tsx", [
    [`      <section className="torn-top torn-bottom torn-cream relative bg-cream pb-16 sm:pb-24">`,
     SECTION_JSX + `      <section className="torn-top torn-bottom torn-cream relative bg-cream pb-16 sm:pb-24">`],
    [`                {dict.common.cta.contact}\n                <ArrowRight className="size-5" aria-hidden="true" />`,
     `                {dict.common.cta.quote}\n                <ArrowRight className="size-5" aria-hidden="true" />`],
  ]],
];

let changed = 0;
for (const [file, pairs] of EDITS) {
  if (!fs.existsSync(file)) throw new Error(`FICHIER INTROUVABLE : ${file} (lancez le script à la racine du projet)`);
  let src = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  let touched = 0;
  pairs.forEach(([oldText, newText], i) => {
    if (src.includes(newText)) return;
    if (!src.includes(oldText)) throw new Error(`ANCRE INTROUVABLE : ${file} — modification n°${i + 1}`);
    src = src.replace(oldText, newText);
    touched++;
  });
  if (touched) { fs.writeFileSync(file, src, "utf8"); changed++; console.log(`modifié  ${file} (${touched})`); }
  else console.log(`déjà à jour  ${file}`);
}
console.log(changed ? "\nOK — lancez maintenant : npm run build" : "\nRien à faire.");