import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Dictionary, Lang, StaticRoute } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/data/business";
import { JsonLd } from "./JsonLd";
import { Kicker } from "./ui";
import { WonkyBanana, WonkyMango, WonkyTomato } from "./Doodles";

export type Crumb = { name: string; route?: StaticRoute | "" };

export function PageHero({
  lang,
  dict,
  kicker,
  title,
  sub,
  crumbs,
}: {
  lang: Lang;
  dict: Dictionary;
  kicker: string;
  title: string;
  sub: string;
  crumbs: Crumb[];
}) {
  const allCrumbs: Crumb[] = [{ name: dict.nav.home, route: "" }, ...crumbs];
  return (
    <section className="paper-grain brand-hero relative overflow-hidden border-b-2 border-ink/10 bg-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <WonkyMango className="floaty absolute -top-6 right-[8%] w-20 opacity-25 [--float-rot:8deg] sm:w-28" />
        <WonkyTomato className="floaty-alt absolute top-1/2 -left-8 w-24 opacity-20 [--float-rot:-12deg] sm:w-32" />
        <WonkyBanana className="floaty absolute bottom-2 right-[28%] w-24 opacity-20 [--float-rot:-6deg] sm:w-32" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:py-24">
        <nav aria-label={dict.nav.breadcrumb} className="mb-8">
          <ol className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-sm font-semibold text-ink-soft">
            {allCrumbs.map((crumb, i) => {
              const last = i === allCrumbs.length - 1;
              return (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5 text-ink-faint" aria-hidden="true" />}
                  {last || crumb.route === undefined ? (
                    <span aria-current={last ? "page" : undefined} className={last ? "text-tomato" : undefined}>
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={localizedPath(lang, crumb.route)} className="underline-offset-4 transition-colors hover:text-ink hover:underline">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <Kicker>{kicker}</Kicker>
        <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{sub}</p>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-leaf-tint px-4 py-2 text-sm font-bold text-leaf-deep">
          <span aria-hidden="true">◆</span> {BUSINESS.napLine[lang]}
        </p>
      </div>
      <JsonLd data={breadcrumbJsonLd(lang, allCrumbs.map((c) => ({ name: c.name, route: c.route })))} />
    </section>
  );
}
