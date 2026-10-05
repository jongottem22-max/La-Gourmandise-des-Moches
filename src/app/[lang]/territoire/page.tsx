import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Handshake, Landmark, Mountain, Store, Tractor, Trees } from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead, btnPrimary, btnSecondary } from "@/components/site/ui";

type Params = Promise<{ lang: string }>;

const NETWORK_ICONS = [Tractor, Landmark, Store, Trees];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "territoire", dict.territoire.title, dict.territoire.description);
}

export default async function TerritoirePage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.territoire;

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.territoire }]} />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={d.kicker} title={d.networkTitle} tone="leaf" />
          </Reveal>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.networkItems.map((item, i) => {
              const Icon = NETWORK_ICONS[i];
              return (
                <Reveal as="li" key={item.title} delay={i * 100}>
                  <article className="lift h-full rounded-3xl border-2 border-ink bg-paper p-6 shadow-sticker">
                    <span className="grid size-12 place-items-center rounded-2xl border-2 border-ink bg-mango shadow-sticker">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-black">{item.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="torn-top torn-bottom torn-cream relative bg-cream pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <p className="stamp text-leaf">
              <Mountain className="size-4" aria-hidden="true" />
              {d.landTitle}
            </p>
            <h2 className="mt-6 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.landTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{d.landText}</p>
            <ul className="mt-6 space-y-3">
              {d.landPoints.map((point) => (
                <li key={point} className="flex gap-3 font-semibold text-ink">
                  <span aria-hidden="true" className="mt-1 size-2.5 shrink-0 rounded-full bg-tomato" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rotate-1 rounded-[2rem] border-2 border-ink bg-leaf-tint p-3 shadow-sticker">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border-2 border-ink/15">
                <Image
                  src={IMAGES.entreDeux}
                  alt={
                    lang === "fr"
                      ? "Vue illustrée des montagnes et maisons créoles de L'Entre-Deux"
                      : "Illustrated view of L'Entre-Deux's mountains and creole houses"
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

      <section className="torn-top torn-leaf relative bg-leaf py-18 text-cream sm:py-20">
        <div className="relative mx-auto max-w-3xl px-4 py-6 text-center sm:px-6">
          <Reveal>
            <span className="stamp bg-cream text-tomato">
              <Handshake className="size-4" aria-hidden="true" />
              {d.joinTitle}
            </span>
            <h2 className="mt-6 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.joinTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/85">{d.joinText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link href={{ pathname: localizedPath(lang, "contact") }} className={btnSecondary} data-track="cta_click" data-track-label="territoire-contact">
                {dict.common.cta.contact}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="territoire-call">
                {dict.common.cta.call}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
