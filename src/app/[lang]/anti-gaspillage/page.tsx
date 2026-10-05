import type { Metadata } from "next";
import { ArrowRight, HandCoins, HeartHandshake, Recycle, ShieldCheck, Sprout } from "lucide-react";
import { getDictionary, isLang, localizedPath, resolveLang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead, btnPrimary, btnSecondary, Kicker } from "@/components/site/ui";
import { WonkyBanana, WonkyMango, WonkyTomato } from "@/components/site/Doodles";

type Params = Promise<{ lang: string }>;

const PRINCIPLE_ICONS = [Sprout, Recycle, HandCoins, HeartHandshake];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "anti-gaspillage", dict.demarche.title, dict.demarche.description);
}

export default async function DemarchePage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.demarche;

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.demarche }]} />

      {/* Virtuous circle — the heart of the mission */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
        <WonkyTomato aria-hidden="true" className="floaty absolute top-10 right-[4%] w-16 opacity-15 sm:w-24" />
        <WonkyMango aria-hidden="true" className="floaty-alt absolute bottom-10 left-[3%] w-16 opacity-15 sm:w-24" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <SectionHead kicker={d.stepsTitle} title={dict.home.process.title} tone="leaf" />
          </Reveal>
          <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[1.6rem] before:border-l-3 before:border-dotted before:border-ink/25">
            {d.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90} className="relative pl-16 sm:pl-20">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 grid size-[3.25rem] place-items-center rounded-full border-2 border-ink bg-mango font-display text-lg font-black shadow-sticker"
                >
                  {i + 1}
                </span>
                <article className="lift rounded-3xl border-2 border-ink bg-paper p-6 shadow-sticker">
                  <h3 className="font-display text-xl font-black">{step.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Red lines */}
      <section className="torn-top torn-bottom torn-cream relative bg-cream pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHead kicker={dict.nav.demarche} title={d.principlesTitle} tone="leaf" />
          </Reveal>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.principles.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i];
              return (
                <Reveal as="li" key={p.title} delay={i * 100}>
                  <article className="lift h-full rounded-3xl border-2 border-ink bg-leaf-tint p-6 shadow-sticker">
                    <span className="grid size-12 place-items-center rounded-2xl border-2 border-ink bg-leaf text-cream shadow-sticker">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-black">{p.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{p.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Producers + support */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <article className="lift relative h-full overflow-hidden rounded-[2rem] border-2 border-ink bg-mango-tint p-8 shadow-sticker sm:p-10">
              <WonkyBanana aria-hidden="true" className="absolute -right-6 -bottom-4 w-28 rotate-12 opacity-40" />
              <p className="stamp text-tomato">
                <Sprout className="size-4" aria-hidden="true" />
                {dict.territoire.kicker}
              </p>
              <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight">{d.producerTitle}</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{d.producerText}</p>
              <div className="mt-8">
                <a href={`${localizedPath(lang, "contact")}#producteurs`} className={btnPrimary} data-track="cta_click" data-track-label="demarche-producer">
                  {d.producerCta}
                  <ArrowRight className="size-5" aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="lift relative h-full overflow-hidden rounded-[2rem] border-2 border-ink bg-goyave-tint p-8 shadow-sticker sm:p-10">
              <HeartHandshake aria-hidden="true" className="absolute -right-4 -bottom-4 size-28 rotate-12 text-goyave opacity-50" />
              <p className="stamp text-tomato">
                <HeartHandshake className="size-4" aria-hidden="true" />
                HelloAsso
              </p>
              <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight">{d.supportTitle}</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{d.supportText}</p>
              <div className="mt-8">
                <a href={BUSINESS.socials.helloasso} target="_blank" rel="noopener noreferrer" className={btnSecondary} data-track="social_click" data-track-label="helloasso-demarche">
                  {dict.common.cta.support}
                  <ArrowRight className="size-5" aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>
        </div>
        <Reveal className="mt-14 text-center">
          <Kicker tone="leaf">
            <ShieldCheck className="size-4" aria-hidden="true" />
            {BUSINESS.founder}
          </Kicker>
          <p className="mx-auto mt-5 max-w-2xl px-4 font-display text-2xl font-bold italic leading-snug text-balance text-ink">
            {dict.histoire.quote}
          </p>
        </Reveal>
      </section>
    </>
  );
}
