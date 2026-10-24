import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Send, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type ContactSearch = { service?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact — Buildify Co." },
      { name: "description", content: "Get in touch with Buildify Co. — call or WhatsApp 083 335 9097, or email songezogwabavu@gmail.com." },
      { property: "og:title", content: "Contact Buildify Co." },
      { property: "og:description", content: "Reach Buildify Co. by phone, WhatsApp or email." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { service } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const whatsappHref = service
    ? `https://wa.me/27833359097?text=${encodeURIComponent(`Hi Buildify Co., I'm interested in: ${service}`)}`
    : "https://wa.me/27833359097";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

        <section className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">Contact</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance text-white">
            Let's <span className="text-gradient-purple">talk.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Whether it's a brand-new build or help maintaining an existing product — we'd love to hear from you.
          </p>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 pb-16 md:pb-24 pt-0">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-card
              className="flex items-start gap-4 rounded-2xl border border-accent/40 bg-accent/10 p-6 transition hover:bg-accent/15"
            >
              <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-gradient-accent shadow-accent-glow">
                <MessageCircle className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-accent">WhatsApp</div>
                <div className="mt-1 font-display text-xl font-bold">+27 83 335 9097</div>
                <div className="mt-1 text-sm text-muted-foreground">Chat with us instantly</div>
              </div>
            </a>

            <a href="tel:+27833359097" data-reveal-card className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-6 transition hover:bg-card">
              <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Cell</div>
                <div className="mt-1 font-display text-xl font-bold">083 335 9097</div>
                <div className="mt-1 text-sm text-muted-foreground">Tap to call</div>
              </div>
            </a>

            <a href="mailto:songezogwabavu@gmail.com" data-reveal-card className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-6 transition hover:bg-card">
              <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-gradient-accent shadow-accent-glow">
                <Mail className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="mt-1 font-display text-xl font-bold break-all">songezogwabavu@gmail.com</div>
                <div className="mt-1 text-sm text-muted-foreground">Replies within 1 business day</div>
              </div>
            </a>

            <div className="rounded-2xl border border-border bg-card/40 p-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Mon – Fri · 09:00 – 18:00 SAST</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Working remotely across South Africa</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-3xl border border-border bg-card/40 p-8 md:p-10 space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Your name" id="name" required />
                <Field label="Email" id="email" type="email" required />
              </div>
              <Field
                label="Service of interest"
                id="service"
                defaultValue={service ?? ""}
                placeholder="e.g. Salons website (R1 800)"
              />
              <Field label="Subject" id="subject" />
              <div>
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  defaultValue={service ? `Hi Buildify Co., I'm interested in your ${service}. Please get in touch to discuss.` : ""}
                  className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-60"
                disabled={sent}
              >
                {sent ? "Message sent — we'll be in touch ✓" : (<>Send message <Send className="h-4 w-4" /></>)}
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  required = false,
  defaultValue,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
