import Image from "next/image";
import { ArrowDown } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const ACCENTS: Record<Product["accent"], { chip: string; ring: string; stamp: string }> = {
  mango: { chip: "bg-mango-tint text-ink", ring: "bg-vanilla", stamp: "text-tomato" },
  tomato: { chip: "bg-tomato-tint text-ink", ring: "bg-tomato-tint", stamp: "text-tomato" },
  goyave: { chip: "bg-goyave-tint text-ink", ring: "bg-goyave-tint", stamp: "text-tomato" },
  leaf: { chip: "bg-leaf-tint text-leaf-deep", ring: "bg-leaf-tint", stamp: "text-leaf" },
};

const BLOBS = ["blob-1", "blob-2", "blob-3"] as const;

export function ProductCard({
  product,
  lang,
  index,
  badges,
  clickLabel,
}: {
  product: Product;
  lang: Lang;
  index: number;
  badges: { handmade: string; seasonal: string };
  clickLabel: string;
}) {
  const accent = ACCENTS[product.accent];
  const blob = BLOBS[index % BLOBS.length];
  return (
    <article
      className="lift group relative flex h-full flex-col rounded-3xl border-2 border-ink bg-cream p-5 shadow-sticker sm:p-6"
      aria-labelledby={`prod-${product.slug}`}
    >
      <div className={cn("relative mx-auto -mt-2 mb-5 w-full max-w-xs overflow-hidden p-2", accent.ring, blob)}>
        <div className={cn("relative aspect-[5/4] w-full overflow-hidden", blob)}>
          <Image
            src={product.image}
            alt={product.alt[lang]}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={cn("rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider", accent.chip)}>
          {product.category[lang]}
        </span>
        <span className="text-xs font-bold text-ink-faint">{badges.handmade}</span>
      </div>

      <h3 id={`prod-${product.slug}`} className="mt-3 font-display text-2xl font-black tracking-tight">
        {product.name[lang]}
      </h3>
      <p className="mt-1 font-display text-base font-semibold italic text-tomato">{product.tagline[lang]}</p>
      <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{product.description[lang]}</p>

      {product.examples && (
        <div className="mt-4 border-t-2 border-dotted border-ink/15 pt-4">
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {product.examples[lang].map((ex) => (
              <li key={ex} className="rounded-full border border-ink/25 bg-paper px-2.5 py-1 text-xs font-bold text-ink-soft">
                {ex}
              </li>
            ))}
          </ul>
        </div>
      )}

      <span className="mt-5 inline-flex items-center gap-2 font-extrabold text-tomato transition-colors group-hover:text-tomato-deep">
        {clickLabel}
        <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
      </span>
    </article>
  );
}
