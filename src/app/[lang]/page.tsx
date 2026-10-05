import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Clock3, HandCoins, HeartHandshake, MapPin, Phone,
  Recycle, Salad, ShoppingBasket, Sparkles, Sprout, Star, UtensilsCrossed,
} from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { PRODUCTS } from "@/lib/data/products";
import { RESTAURANT } from "@/lib/data/restaurant";
import { IMAGES } from "@/lib/assets";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead, btnGhostLight, btnLeaf, btnPrimary, btnSecondary, Kicker } from "@/components/site/ui";
import { WonkyBanana, WonkyMango, WonkyTomato, WonkyGoyave, SquiggleArrow } from "@/components/site/Doodles";
import { FacebookIcon, InstagramIcon } from "@/components/site/BrandIcons";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "", dict.home.title, dict.home.description);
}

const PILLAR_ICONS = [HandCoins, Sparkles, Sprout];
const STEP_ICONS = [ShoppingBasket, HandCoins, Sparkles, Recycle];

export default async function HomePage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.home;
  const featured = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[4]];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="paper-grain relative overflow-hidden bg-paper">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <WonkyTomato className="floaty absolute top-10 left-[2%] w-16 opacity-30 [--float-rot:-14deg] md:w-24" />
          <WonkyBanana className="floaty-alt absolute bottom-24 left-[38%] w-16 opacity-25 [--float-rot:6deg]" />
          <WonkyGoyave className="floaty absolute top-[16%] right-[4%] w-14 opacity-30 [--float-rot:10deg] md:w-20" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-16 lg:pb-24">
          <div className="text-center lg:text-left">
            <p className="stamp text-tomato">{d.kicker}</p>
            <h1 className="mt-6 font-display text-[2.6rem] font-black leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-[4.2rem]">
              {d.heroA}{" "}
              <span className="squiggle whitespace-nowrap">{d.heroB}</span>{" "}
              {d.heroC}{" "}
              <span className="squiggle-leaf">{d.heroD}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl lg:mx-0">{d.heroSub}</p>

            <div className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link href={localizedPath(lang, "restaurant")} className={btnPrimary} data-track="cta_click" data-track-label="hero-restaurant">
                <UtensilsCrossed className="size-5" aria-hidden="true" />
                {d.restaurant.cta}
              </Link>
              <Link href={localizedPath(lang, "produits")} className={btnSecondary} data-track="cta_click" data-track-label="hero-products">
                {dict.common.cta.products}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>

            <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5 text-sm font-bold text-ink-soft lg:justify-start">
              <li className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-2 ring-1 ring-ink/10">
                <Clock3 className="size-4 text-tomato" aria-hidden="true" />
                {BUSINESS.hours.display[lang]}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-2 ring-1 ring-ink/10">
                <MapPin className="size-4 text-tomato" aria-hidden="true" />
                {BUSINESS.address.place} · {BUSINESS.address.city}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-2 ring-1 ring-ink/10">
                <Phone className="size-4 text-tomato" aria-hidden="true" />
                <a href={BUSINESS.phone.href} data-track="tel_click" data-track-label="hero" className="hover:underline">
                  {BUSINESS.phone.display[lang]}
                </a>
              </li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute -top-5 -left-2 z-10 sm:-left-6">
              <p className="stamp text-leaf">{dict.common.badges.pei}</p>
            </div>
            <div className="relative rotate-1 rounded-[2.2rem] border-2 border-ink bg-vanilla p-3 shadow-sticker">
              <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.7rem] border-2 border-ink/15">
                <Image
                  src={IMAGES.heroMarket}
                  alt={
                    lang === "fr"
                      ? "Sandra Ramaye présentant les bocaux de La Gourmandise des Moches sur un marché"
                      : "Sandra Ramaye presenting La Gourmandise des Moches jars at a market"
                  }
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div aria-hidden="true" className="absolute -right-3 -bottom-5 rotate-6 sm:-right-6">
              <p className="stamp text-tomato">{dict.common.badges.antiGaspi}</p>
            </div>
            <WonkyMango aria-hidden="true" className="absolute -bottom-8 -left-6 w-20 -rotate-12 sm:w-24" />
            <SquiggleArrow className="absolute -left-12 top-[42%] hidden w-20 -rotate-12 text-tomato lg:block" />
            
          </div>
        </div>

        {/* Marquee ribbon */}
        <div className="relative z-10 -rotate-1 border-y-2 border-ink bg-ink py-3 text-cream">
          <div className="marquee-track items-center gap-8 pr-8" aria-hidden="true">
            {[...d.marquee, ...d.marquee].map((item, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-lg font-bold italic">
                {item}
                <span className="text-mango">✦</span>
              </span>
            ))}
          </div>
          <span className="sr-only">{d.marquee.join(", ")}</span>
        </div>
      </section>

      {/* ── Pillars ──────────────────────────────────────────────── */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={d.pillars.kicker} title={d.pillars.title} sub={d.pillars.sub} />
          </Reveal>
          <ul className="grid gap-6 md:grid-cols-3">
            {d.pillars.items.map((item, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal as="li" key={item.title} delay={i * 120}>
                  <article className="lift h-full rounded-3xl border-2 border-ink bg-paper p-7 shadow-sticker">
                    <span className="grid size-14 place-items-center rounded-2xl border-2 border-ink bg-mango text-ink shadow-sticker">
                      <Icon className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Restaurant anti-gaspi ────────────────────────────────── */}
      <section className="torn-top torn-leaf restaurant-section relative overflow-hidden bg-leaf py-18 text-cream sm:py-24" aria-labelledby="resto-title">
        <WonkyGoyave aria-hidden="true" className="floaty absolute top-12 right-[3%] w-16 opacity-25 [--float-rot:10deg] sm:w-24" />
        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <Reveal>
              <div className="relative">
                <div className="rotate-[-1.5deg] rounded-[2rem] border-2 border-cream/60 p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={IMAGES.restaurantMeal}
                      alt={
                        lang === "fr"
                          ? "Repas de massalé et brèdes servi au restaurant"
                          : "Massalé and greens meal served at the restaurant"
                      }
                      fill
                      sizes="(min-width: 1024px) 44vw, 92vw"
                      className="object-cover object-[center_68%]"
                    />
                  </div>
                </div>
                {/* Price sticker — the single most compelling fact */}
                <div className="absolute -right-3 -bottom-6 grid size-28 place-items-center rounded-full border-2 border-ink bg-mango text-center shadow-sticker sm:-right-6 sm:size-32">
                  <div>
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-widest text-ink/70">
                      {d.restaurant.priceLabel}
                    </p>
                    <p className="font-display text-4xl font-black leading-none text-ink sm:text-5xl">
                      {RESTAURANT.priceEur}€
                    </p>
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-widest text-ink/70">
                      {d.restaurant.priceSuffix}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="stamp text-tomato">
                <UtensilsCrossed className="size-4" aria-hidden="true" />
                {d.restaurant.kicker}
              </p>
              <h2 id="resto-title" className="mt-6 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
                {d.restaurant.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">{d.restaurant.lead}</p>

              <ul className="mt-7 space-y-4">
                {d.restaurant.points.map((point, i) => {
                  const Icon = [Salad, ShoppingBasket, Recycle][i];
                  return (
                    <li key={point.title} className="flex gap-3.5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-cream/40 bg-cream/10">
                        <Icon className="size-5 text-mango" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-display text-lg font-bold">{point.title}</span>
                        <span className="block text-cream/75">{point.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Signature dish — the only verified menu item */}
              <div className="mt-8 rounded-3xl border-2 border-dashed border-mango/70 bg-cream/5 p-5">
                <p className="text-xs font-extrabold uppercase tracking-widest text-mango">{d.restaurant.dishKicker}</p>
                <p className="mt-2 font-display text-xl font-black text-cream">{RESTAURANT.signatureDish.name[lang]}</p>
                <p className="mt-1.5 text-cream/75">{RESTAURANT.signatureDish.note[lang]}</p>
              </div>

              <p className="mt-6 text-sm font-semibold text-cream/60">{d.restaurant.menuNote}</p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                <Link href={localizedPath(lang, "restaurant")} className={btnPrimary} data-track="cta_click" data-track-label="home-restaurant">
                  {d.restaurant.cta}
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Link>
                <a href={BUSINESS.phone.href} className={btnGhostLight} data-track="tel_click" data-track-label="home-restaurant">
                  <Phone className="size-5" aria-hidden="true" />
                  {dict.common.cta.call}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <section className="torn-top torn-bottom torn-cream relative bg-cream pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={d.process.kicker} title={d.process.title} tone="leaf" />
          </Reveal>
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <hr aria-hidden="true" className="cordon absolute top-7 right-[12%] left-[12%] hidden lg:block" />
            {d.process.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Reveal as="li" key={step.title} delay={i * 130} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <span className="relative z-10 grid size-14 place-items-center rounded-full border-2 border-ink bg-leaf text-cream shadow-sticker">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="mt-3 text-xs font-extrabold uppercase tracking-widest text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 font-display text-xl font-black">{step.title}</h3>
                    <p className="mt-2 max-w-[16rem] text-[0.95rem] leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
          <Reveal className="mt-12 text-center">
            <Link href={localizedPath(lang, "anti-gaspillage")} className="inline-flex items-center gap-2 font-extrabold text-leaf-deep hover:underline" data-track="cta_click" data-track-label="home-process-demarche">
              {dict.common.cta.demarche}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Products preview ─────────────────────────────────────── */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={d.products.kicker} title={d.products.title} sub={d.products.sub} />
          </Reveal>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={i * 110}>
                <article className="lift group h-full overflow-hidden rounded-3xl border-2 border-ink bg-cream shadow-sticker">
                  <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink/10">
                    <Image
                      src={product.image}
                      alt={product.alt[lang]}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-extrabold uppercase tracking-wider shadow-sticker">
                      {product.category[lang]}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-black">{product.name[lang]}</h3>
                    <p className="mt-1 font-display font-semibold italic text-tomato">{product.tagline[lang]}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-col items-center gap-4">
            <Link href={localizedPath(lang, "produits")} className={btnPrimary} data-track="cta_click" data-track-label="home-products-all">
              {d.products.cardCta}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <p className="max-w-xl text-center text-sm font-semibold text-ink-faint">{d.products.note}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Boutique ─────────────────────────────────────────────── */}
      <section className="torn-top torn-bottom torn-cream relative bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <div className="relative">
              <div className="rotate-[-1.5deg] rounded-[2rem] border-2 border-ink bg-leaf-tint p-3 shadow-sticker">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-2 border-ink/15">
                  <Image
                    src={IMAGES.restaurantExterior}
                    alt={
                      lang === "fr"
                        ? "Façade colorée du restaurant La Gourmandise des Moches à La Réunion"
                        : "Colourful exterior of La Gourmandise des Moches restaurant in Réunion"
                    }
                    fill
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="stamp absolute -bottom-4 left-6 text-tomato">{dict.common.badges.handmade}</p>

            </div>
          </Reveal>
          <Reveal delay={120}>
            <Kicker>{d.boutique.kicker}</Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.boutique.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{d.boutique.text}</p>
            <ul className="mt-6 space-y-3">
              {d.boutique.points.map((point) => (
                <li key={point} className="flex gap-3 font-semibold text-ink">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-ink bg-paper p-4">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink-faint">
                  <Clock3 className="size-4 text-tomato" aria-hidden="true" />
                  {d.boutique.hoursTitle}
                </p>
                <p className="mt-1.5 font-display text-lg font-bold">{BUSINESS.hours.display[lang]}</p>
                <p className="text-sm font-semibold text-ink-faint">{BUSINESS.hours.closedDisplay[lang]}</p>
              </div>
              <div className="rounded-2xl border-2 border-ink bg-paper p-4">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink-faint">
                  <MapPin className="size-4 text-tomato" aria-hidden="true" />
                  {d.boutique.addressTitle}
                </p>
                <p className="mt-1.5 font-display text-lg font-bold leading-snug">{BUSINESS.address.place}</p>
                <p className="text-sm font-semibold text-ink-faint">
                  {BUSINESS.address.street}, {BUSINESS.address.city}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a href={BUSINESS.maps.directions} target="_blank" rel="noopener noreferrer" className={btnPrimary} data-track="map_click" data-track-label="home-boutique">
                <MapPin className="size-5" aria-hidden="true" />
                {d.boutique.ctaMap}
              </a>
              <Link href={localizedPath(lang, "boutique-atelier")} className={btnSecondary} data-track="cta_click" data-track-label="home-boutique-page">
                {dict.common.cta.taste}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Founder ──────────────────────────────────────────────── */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <Reveal className="order-2 lg:order-1">
            <Kicker tone="leaf">{d.founder.kicker}</Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.founder.title}
            </h2>
            <blockquote className="mt-6 border-l-4 border-mango pl-5 font-display text-xl font-bold italic leading-snug text-ink">
              {d.founder.quote}
            </blockquote>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{d.founder.text}</p>
            <div className="mt-8">
              <Link href={localizedPath(lang, "histoire")} className={btnLeaf} data-track="cta_click" data-track-label="home-story">
                {dict.common.cta.story}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md -rotate-1 lg:max-w-none">
              <div className="blob-2 border-2 border-ink bg-mango-tint p-3 shadow-sticker">
                <div className="blob-2 relative aspect-[4/3.6] overflow-hidden border-2 border-ink/15">
                  <Image
                    src={IMAGES.founderKitchen}
                    alt={
                      lang === "fr"
                        ? "Sandra Ramaye préparant une recette dans la cuisine de l'association"
                        : "Sandra Ramaye preparing a recipe in the association's kitchen"
                    }
                    fill
                    sizes="(min-width: 1024px) 44vw, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Territory + proof ────────────────────────────────────── */}
      <section className="torn-top torn-leaf relative bg-leaf py-20 text-cream sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Kicker className="bg-cream">{d.territory.kicker}</Kicker>
              <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance text-cream sm:text-4xl">
                {d.territory.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">{d.territory.text}</p>
              <div className="mt-8">
                <Link href={localizedPath(lang, "territoire")} className={btnGhostLight} data-track="cta_click" data-track-label="home-territory">
                  {d.territory.cta}
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={130}>
              <div className="rotate-1 rounded-[2rem] border-2 border-cream/60 p-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={IMAGES.territoryDestination}
                    alt={
                      lang === "fr"
                        ? "Vue panoramique de L'Entre-Deux et des montagnes réunionnaises"
                        : "Panoramic view of L'Entre-Deux and Réunion's mountains"
                    }
                    fill
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <hr className="cordon my-14 border-cream/40" aria-hidden="true" />

          <Reveal>
            <SectionHead kicker={d.proof.kicker} title={d.proof.title} dark tone="leaf" />
          </Reveal>
          <ul className="grid gap-6 md:grid-cols-3">
            <Reveal as="li">
              <article className="h-full rounded-3xl border-2 border-cream/30 bg-leaf-deep/60 p-7">
                <Star className="size-7 text-mango" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-black">Le Dimitile Hôtel & Spa ****</h3>
                <p className="mt-2 leading-relaxed text-cream/80">{d.proof.dimitile}</p>
              </article>
            </Reveal>
            <Reveal as="li" delay={110}>
              <article className="h-full rounded-3xl border-2 border-cream/30 bg-leaf-deep/60 p-7">
                <FacebookIcon className="size-7 text-mango" />
                <h3 className="mt-4 font-display text-xl font-black">Facebook</h3>
                <p className="mt-2 leading-relaxed text-cream/80">{d.proof.facebook}</p>
              </article>
            </Reveal>
            <Reveal as="li" delay={220}>
              <article className="h-full rounded-3xl border-2 border-cream/30 bg-leaf-deep/60 p-7">
                <InstagramIcon className="size-7 text-mango" />
                <h3 className="mt-4 font-display text-xl font-black">Instagram</h3>
                <p className="mt-2 leading-relaxed text-cream/80">{d.proof.instagram}</p>
              </article>
            </Reveal>
          </ul>
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3.5">
            <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer" className={btnGhostLight} data-track="social_click" data-track-label="instagram-home">
              <InstagramIcon className="size-5" />
              {dict.common.cta.instagram}
            </a>
            <a href={BUSINESS.socials.helloasso} target="_blank" rel="noopener noreferrer" className={btnGhostLight} data-track="social_click" data-track-label="helloasso-home">
              <HeartHandshake className="size-5" aria-hidden="true" />
              {dict.common.cta.support}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="torn-top torn-ink relative overflow-hidden bg-ink py-20 text-center text-cream sm:py-24">
        <WonkyTomato aria-hidden="true" className="floaty absolute top-8 left-[6%] w-16 opacity-40 [--float-rot:-10deg] sm:w-24" />
        <WonkyBanana aria-hidden="true" className="floaty-alt absolute right-[6%] bottom-10 w-20 opacity-40 [--float-rot:12deg] sm:w-28" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-5xl">
              {d.final.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/80">{d.final.text}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="final-cta">
                <Phone className="size-5" aria-hidden="true" />
                {dict.common.cta.call}
              </a>
              <Link href={localizedPath(lang, "contact")} className={btnSecondary} data-track="cta_click" data-track-label="final-contact">
                {dict.common.cta.contact}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
