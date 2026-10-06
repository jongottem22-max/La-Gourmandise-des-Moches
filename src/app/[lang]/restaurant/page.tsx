import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, IceCreamBowl, Info, Leaf, Phone, Recycle, ShoppingBasket, Sparkles, UtensilsCrossed,
} from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { RESTAURANT } from "@/lib/data/restaurant";
import { IMAGES } from "@/lib/assets";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { JsonLd } from "@/components/site/JsonLd";
import { Kicker, btnPrimary, btnSecondary, btnGhostLight } from "@/components/site/ui";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "restaurant", dict.restaurantPage.title, dict.restaurantPage.description);
}

export default async function RestaurantPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.restaurantPage;

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.restaurant }]} />

      {/* Concept + price */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <Reveal>
            <Kicker>
              <UtensilsCrossed className="size-4" aria-hidden="true" />
              {d.conceptTitle}
            </Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.conceptTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{d.conceptText}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border-2 border-ink bg-mango p-5 shadow-sticker">
                <p className="text-xs font-extrabold uppercase tracking-widest text-ink/70">{d.priceTitle}</p>
                <p className="mt-1 font-display text-5xl font-black leading-none">{RESTAURANT.priceEur} €</p>
                <p className="mt-2 text-sm font-semibold text-ink/80">{d.priceText}</p>
              </div>
              <div className="rounded-3xl border-2 border-ink bg-leaf-tint p-5 shadow-sticker">
                <Leaf className="size-7 text-leaf" aria-hidden="true" />
                <p className="mt-2 font-display text-xl font-black">{dict.home.restaurant.points[0].title}</p>
                <p className="mt-1.5 text-sm font-semibold text-ink-soft">{dict.home.restaurant.points[0].text}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rotate-1 rounded-[2rem] border-2 border-ink bg-vanilla p-3 shadow-sticker">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border-2 border-ink/15">
                <Image
                  src={IMAGES.restaurantPage}
                  alt={
                    lang === "fr"
                      ? "Repas réunionnais servi en terrasse"
                      : "Réunionnais meal served on the terrace"
                  }
                  fill
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Signature dish + rotating menu */}
      <section className="torn-top torn-bottom torn-cream relative bg-cream pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 pt-8 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <article className="lift h-full rounded-[2rem] border-2 border-ink bg-paper p-8 shadow-sticker">
              <Kicker>
                <Sparkles className="size-4" aria-hidden="true" />
                {d.dishTitle}
              </Kicker>
              <h2 className="mt-5 font-display text-2xl font-black leading-snug sm:text-3xl">
                {RESTAURANT.signatureDish.name[lang]}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{d.dishText}</p>
              <p className="mt-5 border-t-2 border-dotted border-ink/15 pt-4 font-display text-lg italic text-tomato">
                {dict.home.restaurant.quote}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink-faint">— {dict.home.restaurant.quoteSource}</p>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="lift h-full rounded-[2rem] border-2 border-ink bg-goyave-tint p-8 shadow-sticker">
              <Kicker>
                <Recycle className="size-4" aria-hidden="true" />
                {d.menuTitle}
              </Kicker>
              <h2 className="mt-5 font-display text-2xl font-black leading-snug sm:text-3xl">{d.menuTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{d.menuText}</p>
              <div className="mt-6">
                <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="restaurant-menu">
                  <Phone className="size-5" aria-hidden="true" />
                  {BUSINESS.phone.display[lang]}
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Homemade sorbet — vegan & gluten-free dessert */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
          <Reveal>
            <div className="-rotate-1 rounded-[2rem] border-2 border-ink bg-vanilla p-3 shadow-sticker">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border-2 border-ink/15">
                <Image
                  src={IMAGES.sorbetMaison}
                  alt={
                    lang === "fr"
                      ? "Coupe de sorbet maison aux fruits péi servie en terrasse"
                      : "Glass of homemade local-fruit sorbet served on the terrace"
                  }
                  fill
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Kicker>
              <IceCreamBowl className="size-4" aria-hidden="true" />
              {d.sorbetTitle}
            </Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {RESTAURANT.sorbet.name[lang]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{d.sorbetText}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-leaf-tint px-4 py-2 text-sm font-extrabold">
              <Leaf className="size-4 text-leaf" aria-hidden="true" />
              {RESTAURANT.diet.label[lang]}
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{RESTAURANT.sorbet.note[lang]}</p>
          </Reveal>
        </div>
      </section>

      {/* Practical info */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8">
          <Reveal>
            <Kicker tone="leaf">
              <ShoppingBasket className="size-4" aria-hidden="true" />
              {d.practicalTitle}
            </Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              {d.practicalTitle}
            </h2>
            <ul className="mt-6 space-y-3.5">
              {d.practicalItems.map((item) => (
                <li key={item} className="flex gap-3 font-semibold text-ink">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 flex items-start gap-3 rounded-2xl border-2 border-dashed border-tomato bg-tomato-tint/50 px-5 py-4 text-sm font-bold text-ink">
              <Info className="mt-0.5 size-5 shrink-0 text-tomato" aria-hidden="true" />
              {d.verifyNote}
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="restaurant-practical">
                <Phone className="size-5" aria-hidden="true" />
                {dict.common.cta.call}
              </a>
              <Link href={localizedPath(lang, "contact")} className={btnSecondary} data-track="cta_click" data-track-label="restaurant-contact">
                {dict.common.cta.contact}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-[2rem] border-2 border-ink bg-leaf-tint/70 p-8 shadow-sticker">
              <Kicker tone="leaf">
                <Recycle className="size-4" aria-hidden="true" />
                {d.modelTitle}
              </Kicker>
              <h2 className="mt-5 font-display text-2xl font-black leading-snug sm:text-3xl">{d.modelTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{d.modelText}</p>
              <div className="mt-6">
                <Link href={localizedPath(lang, "anti-gaspillage")} className="inline-flex items-center gap-2 font-extrabold text-leaf-deep hover:underline" data-track="cta_click" data-track-label="restaurant-demarche">
                  {dict.common.cta.demarche}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="torn-top torn-ink relative bg-ink py-18 text-center text-cream sm:py-20">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/80">{d.ctaText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="restaurant-final">
                <Phone className="size-5" aria-hidden="true" />
                {BUSINESS.phone.display[lang]}
              </a>
              <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer" className={btnGhostLight} data-track="social_click" data-track-label="instagram-restaurant">
                {dict.common.cta.instagram}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Restaurant structured data — verified facts only */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "@id": absoluteUrl("/#restaurant"),
          name: `${BUSINESS.name} — ${dict.nav.restaurant}`,
          description: d.description,
          servesCuisine: lang === "fr" ? ["Vegan", "Végétarienne", "Sans gluten", "Réunionnaise"] : ["Vegan", "Vegetarian", "Gluten-free", "Réunionnais"],
          priceRange: "€",
          telephone: "+262692553572",
          email: BUSINESS.email,
          image: absoluteUrl(IMAGES.restaurantPage.src),
          url: absoluteUrl(localizedPath(lang, "restaurant")),
          address: {
            "@type": "PostalAddress",
            addressLocality: BUSINESS.address.city,
            postalCode: BUSINESS.address.postalCode,
            addressRegion: BUSINESS.address.island,
            addressCountry: BUSINESS.address.countryCode,
          },
          offers: {
            "@type": "Offer",
            price: RESTAURANT.priceEur,
            priceCurrency: "EUR",
            description: lang === "fr" ? `Repas ${RESTAURANT.diet.label.fr.toLowerCase()} à prix unique` : `${RESTAURANT.diet.label.en} meal at a single price`,
          },
          hasMenu: {
            "@type": "Menu",
            name: lang === "fr" ? "Menu du jour anti-gaspi" : "Anti-waste dish of the day",
            description: d.menuText,
          },
          parentOrganization: { "@id": absoluteUrl("/#organization") },
        }}
      />
    </>
  );
}
