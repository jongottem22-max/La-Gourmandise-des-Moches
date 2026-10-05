import { cn } from "@/lib/utils";

/**
 * Hand-drawn "imperfect produce" doodles — inline decorative SVGs,
 * the visual signature of the brand. All aria-hidden.
 */

type DoodleProps = { className?: string };

export function WonkyMango({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 130" className={cn("h-auto", className)} aria-hidden="true" focusable="false">
      <path
        d="M62 14c-8 1-14 8-16 15-18 3-30 18-32 37-2 23 12 44 33 50 24 7 47-6 55-29 7-21 2-48-14-61-9-7-17-12-26-12z"
        fill="#f7a603"
        stroke="#2b2118"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M60 16c2-8 9-13 17-14-2 8-8 13-17 14z" fill="#3e6b38" stroke="#2b2118" strokeWidth="4" strokeLinejoin="round" />
      <path d="M38 62c3-10 12-16 12-16" fill="none" stroke="#2b2118" strokeWidth="4" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

export function WonkyTomato({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 120" className={cn("h-auto", className)} aria-hidden="true" focusable="false">
      <path
        d="M60 34c20-8 44 6 46 28 2 24-18 44-44 44-26 0-48-17-48-41 0-22 20-38 46-31z"
        fill="#e04e25"
        stroke="#2b2118"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M60 34c-2-10 4-18 4-18M60 34c-10-4-20 2-20 2 4 4 10 6 20 6 8 0 14-4 18-8-8-1-14-2-18 0z"
        fill="#3e6b38"
        stroke="#2b2118"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M30 70c2 12 12 22 12 22" fill="none" stroke="#fff9ec" strokeWidth="4" strokeLinecap="round" opacity=".65" />
    </svg>
  );
}

export function WonkyBanana({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 140 110" className={cn("h-auto", className)} aria-hidden="true" focusable="false">
      <path
        d="M18 22c-4 30 18 62 55 70 24 5 44-2 54-14 2-3 0-7-4-6-28 8-66-4-84-42-3-7-6-10-10-11-5-1-10-1-11 3z"
        fill="#f7d54d"
        stroke="#2b2118"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M22 20c3 26 24 52 58 62" fill="none" stroke="#2b2118" strokeWidth="4" strokeLinecap="round" opacity=".4" />
      <path d="M14 14c4-6 14-4 16 2-4 4-12 4-16-2z" fill="#5c4b39" />
    </svg>
  );
}

export function WonkyGoyave({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 120" className={cn("h-auto", className)} aria-hidden="true" focusable="false">
      <path
        d="M60 20c16-4 30 4 34 20 5 16 2 38-10 52-12 13-32 16-46 6C24 88 18 66 26 48c7-16 20-26 34-28z"
        fill="#e77c8c"
        stroke="#2b2118"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M60 20c0-8 6-12 6-12" fill="none" stroke="#2b2118" strokeWidth="4" strokeLinecap="round" />
      <circle cx="52" cy="58" r="3" fill="#2b2118" opacity=".55" />
      <circle cx="66" cy="70" r="3" fill="#2b2118" opacity=".55" />
      <circle cx="48" cy="76" r="3" fill="#2b2118" opacity=".55" />
    </svg>
  );
}

export function SquiggleArrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 60" className={cn("h-auto", className)} aria-hidden="true" focusable="false">
      <path d="M6 8c14 26 38 38 68 38" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
      <path d="M66 34l10 12-16 3z" fill="currentColor" />
    </svg>
  );
}

export function Starburst({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("h-auto", className)} aria-hidden="true" focusable="false">
      <path
        d="M50 4l7 18 16-12-3 20 20-4-11 17 19 7-19 7 11 17-20-4 3 20-16-12-7 18-7-18-16 12 3-20-20 4 11-17-19-7 19-7-11-17 20 4-3-20 16 12z"
        fill="currentColor"
      />
    </svg>
  );
}
