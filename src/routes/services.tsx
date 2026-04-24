import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Code2, Wrench, ArrowRight, Check, Smartphone, Search, Database } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Buildify Co." },
      { name: "description", content: "Buildify Co. builds websites, applications and provides ongoing maintenance — tailored to founders and growing teams." },
      { property: "og:title", content: "Services — Buildify Co." },
      { property: "og:description", content: "Web, app and maintenance services from Buildify Co." },
    ],
  }),
  component: Services,
});

function Services() {
  const main = [
    {
      icon: Globe,
      title: "Website Development",
      body: "Marketing sites, landing pages, portfolios and content platforms. Fast, accessible, SEO-ready and beautifully typeset.",
      points: ["Custom design systems", "SEO & performance", "CMS integration", "Analytics setup"],
    },
    {
      icon: Code2,
      title: "Application Development",
      body: "Full-stack web applications, dashboards, SaaS products and internal tools — built on modern, reliable foundations.",
      points: ["Authentication & roles", "Databases & APIs", "Payments integration", "Realtime features"],
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      body: "We don't disappear after launch. Monitoring, updates, security patching and ongoing feature work on a steady cadence.",
      points: ["24/7 monitoring", "Security updates", "Bug fixes & tweaks", "Monthly retainers"],
    },
  ];

  const extras = [
    { icon: Smartphone, title: "Mobile-first", body: "Every build is responsive by default." },
    { icon: Search, title: "SEO baked in", body: "Structured data, meta, sitemaps." },
    { icon: Database, title: "Cloud backend", body: "Scalable, secure infrastructure." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">Services</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance">
            Everything you need <span className="text-gradient-purple">to ship.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From a one-page launch site to a long-term application partnership — pick the support level that matches your growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {main.map((s) => (
            <article key={s.title} className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-8 transition hover:border-accent/50 hover:bg-card">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                <s.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition group-hover:bg-accent/20" />
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center">Standard with every project</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {extras.map((e) => (
              <div key={e.title} className="rounded-2xl border border-border bg-background/40 p-6">
                <e.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-display text-xl font-bold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Ready to start?</h2>
        <p className="mt-3 text-muted-foreground">Tell us about your project and we'll come back with a clear plan.</p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow hover:scale-105 transition"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
