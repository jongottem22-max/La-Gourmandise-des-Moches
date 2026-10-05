export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Canonical site origin. Priority:
 * 1. NEXT_PUBLIC_SITE_URL (set explicitly — recommended for production),
 * 2. Netlify's automatic URL / DEPLOY_PRIME_URL (branch previews get their own origin),
 * 3. hard fallback for local/dev.
 */
export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    "https://lagourmandisedesmoches.re";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  return `${siteUrl()}${path}`;
}
