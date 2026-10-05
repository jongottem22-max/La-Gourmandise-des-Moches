"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Menu, X, Phone, Clock3 } from "lucide-react";
import type { Dictionary, Lang, StaticRoute } from "@/lib/i18n";
import { localizedPath, pathWithLang, NAV_ROUTES } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";
import { IMAGES } from "@/lib/assets";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex min-w-0 flex-col leading-none", className)}>
      <span className="truncate font-display text-[0.8rem] font-black tracking-tight text-ink min-[360px]:text-[0.98rem] min-[420px]:text-[1.08rem] sm:text-xl">
        La Gourmandise
      </span>
      <span className="truncate font-display text-[0.7rem] font-bold italic tracking-tight text-tomato min-[360px]:text-[0.84rem] min-[420px]:text-[0.92rem] sm:text-base">
        des Moches
      </span>
    </span>
  );
}

type HeaderProps = {
  lang: Lang;
  nav: Dictionary["nav"];
  hoursLine: string;
};

const MENU_INPUT_ID = "mobile-menu-toggle";

function forceMenuClosed() {
  const box = document.getElementById(MENU_INPUT_ID) as HTMLInputElement | null;
  if (box) box.checked = false;
  document
    .querySelector<HTMLButtonElement>('button[aria-controls="mobile-menu"]')
    ?.setAttribute("aria-expanded", "false");
  document.querySelector("header")?.removeAttribute("inert");
  document.getElementById("contenu")?.removeAttribute("inert");
  document.querySelector("footer")?.removeAttribute("inert");
}

export function Header({ lang, nav, hoursLine }: HeaderProps) {
  const pathname = usePathname();

  useEffect(() => {
    forceMenuClosed();
  }, [pathname]);

  // The hamburger is hidden from 64rem up. If the checkbox stayed checked
  // across that breakpoint, the sheet would still be open with no control.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => {
      if (mq.matches) forceMenuClosed();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (route: StaticRoute | "") =>
    pathname === localizedPath(lang, route) || pathname.startsWith(`${localizedPath(lang, route)}/`);

  return (
    <>
      {/*
        Uncontrolled checkbox is the open state. CSS shows the sheet from
        :checked, so a tap does not wait on React state, and a later render
        cannot put `hidden` back and swallow the click.
      */}
      <input
        id={MENU_INPUT_ID}
        className="mobile-menu-toggle"
        type="checkbox"
        defaultChecked={false}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />
      <header className="sticky top-0 z-50 border-b-2 border-ink/10 bg-cream">
        <div aria-hidden="true" className="brand-gradient h-1.5" />
        <div className="site-header-bar">
          <Link
            href={localizedPath(lang)}
            className="site-header-brand group flex min-w-0 items-center gap-2 rounded-lg sm:gap-2.5"
            aria-label={`${BUSINESS.name} — ${nav.home}`}
          >
            <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-cream shadow-sticker transition-transform duration-300 group-hover:-rotate-6 sm:size-11">
              <Image src={IMAGES.brandLogo} alt="" width={88} height={88} className="size-full object-cover" priority />
            </span>
            <Wordmark />
          </Link>

          <nav aria-label={nav.menu} className="site-header-nav">
            {NAV_ROUTES.map(({ route, key }) => (
              <Link
                key={route}
                href={localizedPath(lang, route)}
                aria-current={isActive(route) ? "page" : undefined}
                className={cn(
                  "rounded-full px-2 py-2 text-[0.75rem] font-bold uppercase tracking-wide text-ink-soft transition-colors hover:bg-mango-tint hover:text-ink min-[90rem]:px-2.5 min-[90rem]:text-[0.82rem]",
                  isActive(route) && "bg-mango text-ink shadow-sticker",
                )}
              >
                {nav[key]}
              </Link>
            ))}
          </nav>

          <div className="site-header-tools">
            <a
              href={BUSINESS.phone.href}
              data-track="tel_click"
              data-track-label="header"
              className="header-phone rounded-full border-2 border-ink bg-cream px-3.5 py-1.5 text-sm font-extrabold transition-colors hover:bg-mango"
              aria-label={`${nav.contact} — ${BUSINESS.phone.display[lang]}`}
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <span>{BUSINESS.phone.display[lang]}</span>
            </a>

            <nav
              aria-label={nav.language}
              className="flex items-center rounded-full border-2 border-ink bg-cream text-xs font-extrabold shadow-sticker sm:text-sm"
            >
              {(["fr", "en"] as const).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="px-0.5 text-ink-faint">
                      |
                    </span>
                  )}
                  <Link
                    href={pathWithLang(pathname, l)}
                    hrefLang={l}
                    lang={l}
                    data-track="lang_switch"
                    data-track-label={l}
                    aria-current={lang === l ? "true" : undefined}
                    aria-label={nav.switchTo[l]}
                    className={cn(
                      "rounded-full px-2 py-1.5 uppercase transition-colors sm:px-2.5",
                      lang === l ? "bg-ink text-cream" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {l}
                  </Link>
                </span>
              ))}
            </nav>

            <button
              type="button"
              aria-expanded={false}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              aria-label={nav.openMenu}
              data-label-open={nav.openMenu}
              data-label-close={nav.closeMenu}
              className="site-header-toggle size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream shadow-sticker transition-colors hover:bg-mango"
            >
              <Menu className="icon-open size-5" aria-hidden="true" />
              <X className="icon-close size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      {/*
        Sibling of the header, not a child. A sticky bar becomes the containing
        block for position:fixed descendants and collapses the sheet.
      */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={nav.menu}
        className="mobile-nav-panel paper-grain bg-paper"
      >
        <div className="mx-auto flex max-w-xl items-center justify-between px-6 pt-4">
          <p className="font-display text-lg font-black">{nav.menu}</p>
          <button
            type="button"
            data-close-menu
            aria-label={nav.closeMenu}
            className="menu-close size-11 place-items-center rounded-full border-2 border-ink bg-cream shadow-sticker"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <nav className="mx-auto flex max-w-xl flex-col gap-1 px-6 pt-2 pb-8">
          {NAV_ROUTES.map(({ route, key }, i) => (
            <Link
              key={route}
              href={localizedPath(lang, route)}
              aria-current={isActive(route) ? "page" : undefined}
              className={cn(
                "flex min-h-12 items-center justify-between border-b-2 border-dotted border-ink/20 py-3.5 font-display text-2xl font-bold text-ink",
                isActive(route) && "text-tomato",
              )}
            >
              <span>{nav[key]}</span>
              <span aria-hidden="true" className="font-sans text-sm font-extrabold text-ink-faint">
                0{i + 1}
              </span>
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={BUSINESS.phone.href}
              data-track="tel_click"
              data-track-label="mobile-menu"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-ink bg-mango px-5 py-3.5 text-base font-extrabold shadow-sticker"
            >
              <Phone className="size-5" aria-hidden="true" />
              {BUSINESS.phone.display[lang]}
            </a>
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-ink-soft">
              <Clock3 className="size-4 shrink-0" aria-hidden="true" />
              {hoursLine}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
