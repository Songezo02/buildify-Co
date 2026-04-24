import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Send, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Buildify Co." },
      { name: "description", content: "Get in touch with Buildify Co. — call 083 335 9097 or email songezogwabvu@gmail.com." },
      { property: "og:title", content: "Contact Buildify Co." },
      { property: "og:description", content: "Reach Buildify Co. by phone or email." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">Contact</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance">
            Let's <span className="text-gradient-purple">talk.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Whether it's a brand-new build or help maintaining an existing product — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <a href="tel:0833359097" className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-6 transition hover:border-accent/50 hover:bg-card">
              <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Cell</div>
                <div className="mt-1 font-display text-xl font-bold">083 335 9097</div>
                <div className="mt-1 text-sm text-muted-foreground">Tap to call</div>
              </div>
            </a>

            <a href="mailto:songezogwabvu@gmail.com" className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-6 transition hover:border-accent/50 hover:bg-card">
              <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-gradient-accent shadow-accent-glow">
                <Mail className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="mt-1 font-display text-xl font-bold break-all">songezogwabvu@gmail.com</div>
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
              <Field label="Subject" id="subject" />
              <div>
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  required
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

function Field({ label, id, type = "text", required = false }: { label: string; id: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
