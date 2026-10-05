"use client";

import { useState, type FormEvent } from "react";
import { Send, CircleCheck, TriangleAlert } from "lucide-react";
import type { Dictionary, Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-2xl border-2 border-ink/70 bg-paper px-4 py-3 font-semibold text-ink placeholder:text-ink-faint/70 transition-colors focus:border-tomato focus:outline-none focus:ring-2 focus:ring-tomato/30";

export function ContactForm({ lang, t }: { lang: Lang; t: Dictionary["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subjects = Object.entries(t.subjects) as Array<[string, string]>;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "general");
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? ""); // honeypot

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = t.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) nextErrors.email = t.invalidEmail;
    if (message.length < 10) nextErrors.message = t.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, company, lang }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" aria-describedby="form-privacy-note">
      {/* Honeypot — invisible to humans */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide">
            {t.name} *
          </label>
          <input id="cf-name" name="name" type="text" autoComplete="name" placeholder={t.namePh} className={cn(inputCls, errors.name && "border-tomato")} aria-invalid={!!errors.name} aria-required="true" />
          {errors.name && <p className="mt-1 text-sm font-bold text-tomato">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide">
            {t.email} *
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" placeholder={t.emailPh} className={cn(inputCls, errors.email && "border-tomato")} aria-invalid={!!errors.email} aria-required="true" />
          {errors.email && <p className="mt-1 text-sm font-bold text-tomato">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide">
          {t.subject}
        </label>
        <select id="cf-subject" name="subject" className={inputCls} defaultValue="general">
          {subjects.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide">
          {t.message} *
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder={t.messagePh}
          className={cn(inputCls, "resize-y", errors.message && "border-tomato")}
          aria-invalid={!!errors.message}
          aria-required="true"
        />
        {errors.message && <p className="mt-1 text-sm font-bold text-tomato">{errors.message}</p>}
      </div>

      <p id="form-privacy-note" className="text-sm text-ink-faint">
        {t.privacy}
      </p>

      <div aria-live="polite" className="min-h-6">
        {status === "success" && (
          <p className="flex items-center gap-2 rounded-2xl bg-leaf-tint px-4 py-3 font-bold text-leaf-deep">
            <CircleCheck className="size-5 shrink-0" aria-hidden="true" />
            {t.success}
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 rounded-2xl bg-tomato-tint px-4 py-3 font-bold text-tomato-deep">
            <TriangleAlert className="size-5 shrink-0" aria-hidden="true" />
            {t.error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        data-track="form_submit"
        data-track-label="contact-form"
        className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border-2 border-ink bg-tomato px-7 py-3.5 text-lg font-extrabold text-cream shadow-sticker transition-all duration-300 hover:-translate-y-0.5 hover:bg-tomato-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="size-5" aria-hidden="true" />
        {status === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}
