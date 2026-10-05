import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Clock3, CookingPot, MapPin, Phone, Megaphone } from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { LazyMap } from "@/components/site/LazyMap";
import { Kicker, btnPrimary, btnSecondary } from "@/components/site/ui";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "boutique-atelier", dict.boutique.title, dict.boutique.description);
}

export default async function BoutiquePage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.boutique;

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.boutique }]} />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <Reveal>
            <Kicker tone="leaf">{d.visitTitle}</Kicker>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.whatTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{d.visitText}</p>
            <ul className="mt-6 space-y-3.5">
              {d.whatItems.map((item) => (
                <li key={item} className="flex gap-3 font-semibold text-ink">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 flex items-start gap-3 rounded-2xl bg-mango-tint/60 px-5 py-4 text-sm font-bold text-ink">
              <Megaphone className="mt-0.5 size-5 shrink-0 text-tomato" aria-hidden="true" />
              <span>
                {d.imperative}{" "}
                <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-tomato hover:underline" data-track="social_click" data-track-label="instagram-boutique-note">
                  Instagram
                </a>{" "}
                ·{" "}
                <a href={BUSINESS.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-tomato hover:underline" data-track="social_click" data-track-label="facebook-boutique-note">
                  Facebook
                </a>
              </span>
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="boutique-page">
                <Phone className="size-5" aria-hidden="true" />
                {dict.common.cta.call}
              </a>
              <a href={BUSINESS.maps.directions} target="_blank" rel="noopener noreferrer" className={btnSecondary} data-track="map_click" data-track-label="boutique-page">
                <MapPin className="size-5" aria-hidden="true" />
                {dict.common.cta.directions}
              </a>
            </div>
          </Reveal>

          <Reveal delay={130}>
            <div className="flex flex-col gap-6">
              <LazyMap
                title={d.mapTitle}
                ctaLabel={d.mapCta}
                loadingLabel={d.mapLoading}
                embedUrl={BUSINESS.maps.embed}
                directionsUrl={BUSINESS.maps.directions}
                directionsLabel={dict.common.cta.directions}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border-2 border-ink bg-paper p-5 shadow-sticker">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink-faint">
                    <Clock3 className="size-4 text-tomato" aria-hidden="true" />
                    {dict.common.labels.hours}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold">{BUSINESS.hours.display[lang]}</p>
                  <p className="text-sm font-semibold text-ink-faint">{BUSINESS.hours.closedDisplay[lang]}</p>
                </div>
                <div className="rounded-3xl border-2 border-ink bg-paper p-5 shadow-sticker">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink-faint">
                    <MapPin className="size-4 text-tomato" aria-hidden="true" />
                    {dict.common.labels.address}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-snug">{BUSINESS.napLine[lang]}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-ink-faint">{dict.common.hoursNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="torn-top torn-leaf relative bg-leaf py-18 text-cream sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <div className="rotate-1 rounded-[2rem] border-2 border-cream/60 p-3">
              <div className="relative aspect-[4/2.8] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={IMAGES.founderMarket}
                  alt={
                    lang === "fr"
                      ? "Sandra Ramaye et ses bocaux sur un marché"
                      : "Sandra Ramaye and her jars at a market"
                  }
                  fill
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="stamp bg-cream text-tomato">
              <CookingPot className="size-4" aria-hidden="true" />
              {dict.nav.ateliers}
            </p>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.atelierTeaser.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/85">{d.atelierTeaser.text}</p>
            <div className="mt-8">
              <Link href={localizedPath(lang, "ateliers")} className={btnSecondary} data-track="cta_click" data-track-label="boutique-ateliers">
                {dict.common.cta.ateliers}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
