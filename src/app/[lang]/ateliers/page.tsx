import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CookingPot, GraduationCap, Info, Phone, Users } from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead, btnGhostLight, btnPrimary, btnSecondary } from "@/components/site/ui";

type Params = Promise<{ lang: string }>;

const HOW_ICONS = [CookingPot, GraduationCap, CookingPot];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "ateliers", dict.ateliers.title, dict.ateliers.description);
}

export default async function AteliersPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.ateliers;

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.ateliers }]} />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={d.kicker} title={d.howTitle} />
          </Reveal>
          <ol className="grid gap-6 md:grid-cols-3">
            {d.howItems.map((item, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <Reveal as="li" key={item.title} delay={i * 120}>
                  <article className="lift relative h-full rounded-3xl border-2 border-ink bg-paper p-7 pt-9 shadow-sticker">
                    <span aria-hidden="true" className="absolute -top-5 left-6 grid size-10 place-items-center rounded-full border-2 border-ink bg-tomato font-display text-base font-black text-cream shadow-sticker">
                      {i + 1}
                    </span>
                    <span className="grid size-14 place-items-center rounded-2xl border-2 border-ink bg-vanilla shadow-sticker">
                      <Icon className="size-7 text-tomato" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-black">{item.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20">
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

      <section className="torn-top torn-bottom torn-cream relative bg-cream pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <div className="relative rotate-[-1.5deg] rounded-[2rem] border-2 border-ink bg-goyave-tint p-3 shadow-sticker">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border-2 border-ink/15 bg-cream">
                <Image
                  src={IMAGES.workshopPoster}
                  alt={
                    lang === "fr"
                      ? "Flyer officiel de l'atelier cuisine : réaliser sa confiture maison, deux heures, tarif libre"
                      : "Official cooking workshop flyer: make your own jam, two hours, pay what you can"
                  }
                  fill
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="stamp text-tomato">{d.whereTitle}</p>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{d.whereText}</p>
            <ul className="mt-6 space-y-3">
              {d.infoItems.map((item) => (
                <li key={item} className="flex gap-3 font-semibold text-ink">
                  <Info className="mt-0.5 size-5 shrink-0 text-tomato" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 rounded-2xl bg-leaf-tint px-5 py-4 text-sm font-bold text-leaf-deep">{d.bookNote}</p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <a href={BUSINESS.phone.href} className={btnPrimary} data-track="tel_click" data-track-label="ateliers-book">
                <Phone className="size-5" aria-hidden="true" />
                {dict.common.cta.book} — {BUSINESS.phone.display[lang]}
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/documents/atelier-confiture.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className={btnSecondary}
              >
                {d.downloadFlyer}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="torn-top torn-ink relative overflow-hidden bg-ink py-18 text-cream sm:py-20">
        <div className="relative mx-auto max-w-3xl px-4 py-6 text-center sm:px-6">
          <Reveal>
            <span className="stamp text-tomato">
              <Users className="size-4" aria-hidden="true" />
              {d.groupsTitle}
            </span>
            <h2 className="mt-6 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {d.groupsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/80">{d.groupsText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link href={localizedPath(lang, "contact")} className={btnSecondary} data-track="cta_click" data-track-label="ateliers-contact">
                {dict.common.cta.quote}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer" className={btnGhostLight} data-track="social_click" data-track-label="instagram-ateliers">
                {dict.common.cta.instagram}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
