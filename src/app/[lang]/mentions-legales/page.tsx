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
  return {
    ...pageMetadata(lang, "mentions-legales", dict.mentionsLegales.title, dict.mentionsLegales.description),
    robots: { index: true, follow: true },
  };
}

export default async function MentionsLegalesPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang = resolveLang(raw);
  const dict = getDictionary(lang);

  return (
    <LegalPage
      lang={lang}
      dict={dict}
      data={dict.mentionsLegales}
      route="mentions-legales"
      related={[
        { label: dict.footer.legalLinks.confidentialite, route: "confidentialite" },
        { label: dict.nav.contact, route: "contact" },
      ]}
    />
  );
}
