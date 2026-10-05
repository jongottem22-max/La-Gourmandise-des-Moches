import { Mail, MessageCircle } from "lucide-react";
import type { Dictionary, Lang } from "@/lib/i18n";
import { BUSINESS } from "@/lib/data/business";

/**
 * Contact panel for the static hosting (no server, no database).
 * Instead of a form that posted to /api/contact, each subject opens the
 * visitor's own email app with a pre-addressed, pre-subjected message — plus
 * a WhatsApp shortcut for quick conversations.
 */
export function ContactChannels({ lang, t }: { lang: Lang; t: Dictionary["contact"]["form"] }) {
  const subjects = Object.entries(t.subjects) as Array<[string, string]>;
  const waHref = `https://wa.me/${BUSINESS.phone.href.replace("tel:+", "")}`;

  const mailHref = (label: string) => {
    const subject = encodeURIComponent(`[LGDM] ${label}`);
    const body = encodeURIComponent(
      lang === "fr"
        ? `Bonjour,\n\n(votre message ici)\n\n— envoyé depuis gourmandisedesmoches.fr`
        : `Hello,\n\n(your message here)\n\n— sent from gourmandisedesmoches.fr`,
    );
    return `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold text-ink-faint">{t.channelsIntro}</p>

      <div className="flex flex-col gap-3">
        {subjects.map(([value, label]) => (
          <a
            key={value}
            href={mailHref(label)}
            data-track="mail_click"
            data-track-label={`subject-${value}`}
            className="lift group flex items-center gap-4 rounded-2xl border-2 border-ink bg-cream px-5 py-3.5 shadow-sticker"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-mango">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <span className="font-extrabold group-hover:underline">{label}</span>
          </a>
        ))}
      </div>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-track-label="contact-panel"
        className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border-2 border-ink bg-leaf px-7 py-3.5 text-lg font-extrabold text-cream shadow-sticker transition-all duration-300 hover:-translate-y-0.5 hover:bg-leaf-deep"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        {t.whatsappCta}
      </a>

      <p className="text-sm font-semibold text-ink-faint">
        {t.channelsFallback}{" "}
        <a href={`mailto:${BUSINESS.email}`} className="font-extrabold text-tomato underline break-all">
          {BUSINESS.email}
        </a>
      </p>
    </div>
  );
}
