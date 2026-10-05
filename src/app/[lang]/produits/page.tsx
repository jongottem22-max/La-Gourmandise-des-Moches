import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, WheatOff } from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { CATALOGUE_IMAGES, CATALOGUE_SECTIONS, PRODUCTS } from "@/lib/data/products";
import { pageMetadata } from "@/lib/metadata";
import { itemListJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { JsonLd } from "@/components/site/JsonLd";
import { Kicker, btnPrimary, btnSecondary } from "@/components/site/ui";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "produits", dict.produits.title, dict.produits.description);
}

export default async function ProduitsPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.produits;
  const catalogueAnchors: Record<string, string> = {
    confitures: "confitures",
    sirops: "sirops",
    achards: "soupes-achards",
    chutneys: "condiments",
    compotes: "nectars-compote",
    nectars: "nectars-compote",
    soupes: "soupes-achards",
    "ketchup-et-sauces": "condiments",
  };

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.produits }]} />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 110}>
                <a
                  href={`#catalogue-${catalogueAnchors[product.slug] ?? product.slug}`}
                  aria-label={`${product.name[lang]} — ${d.viewRecipes}`}
                  className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/50"
                >
                  <ProductCard
                    product={product}
                    lang={lang}
                    index={i}
                    badges={dict.common.badges}
                    clickLabel={d.viewRecipes}
                  />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="mx-auto flex max-w-3xl items-start gap-3 rounded-3xl border-2 border-dashed border-mango bg-mango-tint/50 px-6 py-5 text-center font-semibold text-ink sm:items-center sm:justify-center">
              <WheatOff className="mt-0.5 size-6 shrink-0 text-tomato sm:mt-0" aria-hidden="true" />
              <span>{d.seasonNote}</span>
            </p>
          </Reveal>

          <Reveal className="mt-16">
            <div className="flex flex-col gap-4 border-b-2 border-ink pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Kicker tone="leaf">{d.catalogueTitle}</Kicker>
                <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-4xl">{d.catalogueTitle}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{d.catalogueSub}</p>
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/documents/catalogue-produits.pdf`}
                download
                className={btnSecondary}
              >
                {d.downloadCatalogue}
              </a>
            </div>
          </Reveal>

          <div className="mt-8 space-y-8">
            {CATALOGUE_SECTIONS.map((section, sectionIndex) => (
              <Reveal key={section.slug} delay={(sectionIndex % 2) * 80}>
                <section className="scroll-mt-28 rounded-3xl border-2 border-ink bg-paper p-5 shadow-sticker sm:p-7" aria-labelledby={`catalogue-${section.slug}`}>
                  <h3 id={`catalogue-${section.slug}`} className="font-display text-2xl font-black text-tomato sm:text-3xl">{section.title[lang]}</h3>
                  <ul className="mt-5 grid gap-3 md:grid-cols-2">
                    {section.items.map((item) => (
                      <li key={item.name.fr} className="overflow-hidden rounded-2xl border border-ink/15 bg-cream">
                        <div className="relative aspect-[4/3] overflow-hidden border-b border-ink/10 bg-sand">
                          <Image
                            src={CATALOGUE_IMAGES[item.name.fr]}
                            alt={item.name[lang]}
                            fill
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-display text-lg font-bold">{item.name[lang]}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-ink-soft"><span className="font-extrabold text-ink">{d.ingredientsLabel}:</span> {item.ingredients[lang]}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="torn-top torn-cream relative bg-cream pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <Kicker>{dict.common.badges.seasonal}</Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">{d.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{d.ctaText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="products-cta">
                <Phone className="size-5" aria-hidden="true" />
                {dict.common.cta.call}
              </a>
              <Link href={localizedPath(lang, "anti-gaspillage")} className={btnSecondary} data-track="cta_click" data-track-label="products-demarche">
                {dict.common.cta.demarche}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={itemListJsonLd(
          lang,
          PRODUCTS.map((p) => ({
            name: p.name[lang],
            description: p.description[lang],
            image: p.image.src,
            url: localizedPath(lang, "produits"),
          })),
        )}
      />
    </>
  );
}
