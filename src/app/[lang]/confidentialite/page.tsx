import type { Metadata } from "next";
import { getDictionary, isLang, resolveLang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/site/LegalPage";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);
  return pageMetadata(lang, "confidentialite", dict.confidentialite.title, dict.confidentialite.description);
}

export default async function ConfidentialitePage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);

  return (
    <LegalPage
      lang={lang}
      dict={dict}
      data={dict.confidentialite}
      route="confidentialite"
      related={[
        { label: dict.footer.legalLinks.mentionsLegales, route: "mentions-legales" },
        { label: dict.nav.contact, route: "contact" },
      ]}
    />
  );
}
