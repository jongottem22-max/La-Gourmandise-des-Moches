import type { Metadata } from "next";
import Image from "next/image";
import { BUSINESS } from "@/lib/data/business";
import { getDictionary, isLang, resolveLang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/assets";
import { absoluteUrl } from "@/lib/utils";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { JsonLd } from "@/components/site/JsonLd";
import { btnGhostLight, btnSecondary } from "@/components/site/ui";
import { FacebookIcon, InstagramIcon } from "@/components/site/BrandIcons";
import { cn } from "@/lib/utils";

type Params = Promise<{ lang: string }>;

const GALLERY_IMAGES = [
  IMAGES.founderMarket,
  IMAGES.bringelleEpices,
  IMAGES.photoDish,
  IMAGES.platMassaleBredes,
  IMAGES.jusNectars,
  IMAGES.sirops,
  IMAGES.workshopPoster,
  IMAGES.entreDeux,
  IMAGES.boutique,
] as const;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "galerie", dict.galerie.title, dict.galerie.description);
}

export default async function GaleriePage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  const d = dict.galerie;

  return (
    <>
      <PageHero lang={lang} dict={dict} kicker={d.kicker} title={d.h1} sub={d.sub} crumbs={[{ name: dict.nav.galerie }]} />

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.items.map((caption, i) => (
              <Reveal as="li" key={i} delay={(i % 3) * 100}>
                <figure
                  className={cn(
                    "lift group overflow-hidden rounded-3xl border-2 border-ink bg-paper shadow-sticker",
                    i % 3 === 1 && "sm:-rotate-1",
                    i % 3 === 2 && "sm:rotate-1",
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink/10">
                    <Image
                      src={GALLERY_IMAGES[i]}
                      alt={caption[lang]}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="font-display text-lg font-bold">{caption[lang]}</span>
                    <span aria-hidden="true" className="text-mango">✦</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10 text-center">
            <p className="text-sm font-semibold text-ink-faint">{d.note}</p>
          </Reveal>
        </div>
      </section>

      <section className="torn-top torn-ink relative bg-ink py-18 text-center text-cream sm:py-20">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          <Reveal>
            <p className="stamp text-tomato">@lagourmandisedesmoches</p>
            <h2 className="mt-6 font-display text-3xl font-black leading-tight tracking-tight text-balance sm:text-4xl">
              {dict.galerie.followCta}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-cream/80">{dict.galerie.followText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer" className={btnSecondary} data-track="social_click" data-track-label="instagram-galerie">
                <InstagramIcon className="size-5" />
                {dict.common.cta.instagram}
              </a>
              <a href={BUSINESS.socials.facebook} target="_blank" rel="noopener noreferrer" className={btnGhostLight} data-track="social_click" data-track-label="facebook-galerie">
                <FacebookIcon className="size-5" />
                {dict.common.cta.facebook}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: `${BUSINESS.name} — ${dict.nav.galerie}`,
          about: { "@id": absoluteUrl("/#boutique") },
        }}
      />
    </>
  );
}
