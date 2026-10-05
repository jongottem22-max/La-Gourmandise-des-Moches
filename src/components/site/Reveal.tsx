"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "figure";
};

/** Scroll-in reveal via IntersectionObserver; fully disabled under prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const show = () => {
      el.classList.add("is-in");
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const inView = () => {
      const rect = el.getBoundingClientRect();
      const height = window.innerHeight || document.documentElement.clientHeight || 0;
      return rect.width > 0 && rect.bottom > 0 && rect.top < height + 80;
    };
    const onScroll = () => {
      if (inView()) show();
    };
    let io: IntersectionObserver | undefined;
    try {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) show();
        },
        { threshold: 0, rootMargin: "80px 0px" },
      );
      io.observe(el);
    } catch {
      /* getBoundingClientRect fallback below still runs */
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
