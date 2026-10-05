import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared button & section primitives (server-safe). */

export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-ink bg-tomato px-6 py-3 font-sans text-base font-extrabold text-cream shadow-sticker transition-all duration-300 hover:-translate-y-0.5 hover:bg-tomato-deep active:translate-y-0";

export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-ink bg-cream px-6 py-3 font-sans text-base font-extrabold text-ink shadow-sticker transition-all duration-300 hover:-translate-y-0.5 hover:bg-mango active:translate-y-0";

export const btnLeaf =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-ink bg-leaf px-6 py-3 font-sans text-base font-extrabold text-cream shadow-sticker transition-all duration-300 hover:-translate-y-0.5 hover:bg-leaf-deep active:translate-y-0";

export const btnGhostLight =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-cream/70 px-6 py-3 font-sans text-base font-extrabold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-mango hover:text-mango";

export function Kicker({ children, tone = "tomato", className }: { children: ReactNode; tone?: "tomato" | "leaf"; className?: string }) {
  return (
    <p
      className={cn(
        "stamp",
        tone === "leaf" ? "text-leaf" : "text-tomato",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  sub,
  align = "center",
  tone,
  dark = false,
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
  tone?: "tomato" | "leaf";
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-10 sm:mb-14", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2
        className={cn(
          "mt-5 font-display text-3xl font-black leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {sub && <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-cream/75" : "text-ink-soft")}>{sub}</p>}
    </div>
  );
}
