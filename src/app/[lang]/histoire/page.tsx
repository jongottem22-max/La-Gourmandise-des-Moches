import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Quote, Phone } from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { btnGhostLight, btnSecondary, Kicker } from "@/components/site/ui";
import { WonkyGoyave, WonkyMango } from "@/components/site/Doodles";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "histoire", dict.histoire.title, dict.histoire.description);
}

export default async function HistoirePage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.histoire;

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.histoire }]} />

      <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
        <WonkyMango aria-hidden="true" className="floaty absolute top-12 right-[5%] w-16 opacity-15 [--float-rot:8deg] sm:w-24" />
        <WonkyGoyave aria-hidden="true" className="floaty-alt absolute bottom-12 left-[4%] w-16 opacity-15 [--float-rot:-8deg] sm:w-24" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <ol className="relative space-y-9 before:absolute before:top-2 before:bottom-2 before:left-[1.05rem] before:border-l-3 before:border-dotted before:border-ink/25">
            {d.chapters.map((chapter, i) => (
              <Reveal as="li" key={chapter.title} delay={i * 90} className="relative pl-14">
                <span aria-hidden="true" className="absolute top-1 left-[0.44rem] size-5 rounded-full border-2 border-ink bg-tomato shadow-sticker" />
                <article>
                  <h2 className="font-display text-2xl font-black tracking-tight">{chapter.title}</h2>
                  <p className="mt-2.5 text-lg leading-relaxed text-ink-soft">{chapter.text}</p>
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16">
            <figure className="relative rotate-[-0.6deg] rounded-[2rem] border-2 border-ink bg-vanilla p-8 text-center shadow-sticker sm:p-10">
              <Quote className="mx-auto size-9 text-tomato" aria-hidden="true" />
              <blockquote className="mt-4 font-display text-2xl font-black italic leading-snug text-balance sm:text-3xl">
                {d.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm font-bold text-ink-faint">— {d.quoteSource}</figcaption>
            </figure>
          </Reveal>

          <Reveal className="mt-12">
            <div className="flex items-start gap-4 rounded-3xl border-2 border-dashed border-leaf bg-leaf-tint/60 p-6 sm:p-7">
              <BookOpenCheck className="mt-1 size-7 shrink-0 text-leaf" aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-black">{d.missionTitle}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{d.missionText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="torn-top torn-leaf relative bg-leaf py-18 text-cream sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <div className="rotate-1 rounded-[2rem] border-2 border-cream/60 p-3">
              <div className="relative aspect-[4/2.9] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={IMAGES.founderMarket}
                  alt={
                    lang === "fr"
                      ? "Sandra Ramaye présentant ses créations sur un marché"
                      : "Sandra Ramaye presenting her creations at a market"
                  }
                  fill
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="text-center lg:text-left">
            <Kicker className="bg-cream">{dict.home.founder.kicker}</Kicker>
            <h2 className="mt-6 font-display text-3xl font-black leading-tight tracking-tight text-balance text-cream sm:text-4xl">
              {dict.home.founder.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/85 lg:max-w-none">{dict.home.founder.text}</p>
            <div className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row lg:justify-start sm:justify-center">
              <a href={BUSINESS.phone.href} className={btnSecondary} data-track="tel_click" data-track-label="histoire-call">
                <Phone className="size-5" aria-hidden="true" />
                {dict.common.cta.call}
              </a>
              <Link href={localizedPath(lang, "boutique-atelier")} className={btnGhostLight} data-track="cta_click" data-track-label="histoire-visit">
                {dict.common.cta.visit}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
