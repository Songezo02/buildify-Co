import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ArrowRight, Check, Smartphone, Search, Database } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServiceDialog } from "@/components/ServiceDialog";
import { QuoteForm } from "@/components/QuoteForm";
import {
  CATEGORIES,
  SERVICES,
  MAINTENANCE_PLANS,
  type Service,
  type ServiceCategory,
} from "@/lib/services.catalog";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Buildify Co." },
      {
        name: "description",
        content:
          "Explore Buildify Co.'s full digital services catalogue: websites, e-commerce, custom software, booking systems, SEO, maintenance plans and more. Request a quote online.",
      },
      { property: "og:title", content: "Services — Buildify Co." },
      {
        property: "og:description",
        content:
          "Websites, online stores, custom software, automation, security and care plans — request a quote from Buildify Co.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  const [filter, setFilter] = useState<"all" | ServiceCategory>("all");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [preselected, setPreselected] = useState<string[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);

  const filtered = SERVICES.filter((s) => filter === "all" || s.category === filter);

  const requestQuote = (service: Service) => {
    setPreselected([service.name]);
    setActiveService(null);
    quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const extras = [
    { icon: Smartphone, title: "Mobile-first", body: "Every build is responsive by default." },
    { icon: Search, title: "SEO baked in", body: "Structured data, meta, sitemaps." },
    { icon: Database, title: "Cloud backend", body: "Scalable, secure infrastructure." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/backgroundTwo.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ filter: "brightness(0.65) contrast(1.1)" }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-20 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">Services</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance text-white">
            Everything you need <span className="text-gradient-purple">to ship.</span>
          </h1>
          <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            From a one-page launch site to a long-term application partnership — pick the support
            level that matches your growth.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">
            Digital Solutions
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Digital Solutions Built{" "}
            <span className="text-gradient-purple">Around Your Business</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            From professional websites to custom software, online stores, and ongoing technical
            support, Buildify Co. helps businesses establish, improve, and grow their digital
            presence.
          </p>
        </div>

        {/* Category filters */}
        <div
          className="mx-auto mt-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter services by category"
        >
          {CATEGORIES.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Service cards */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              data-reveal-card
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-8 transition hover:bg-card"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                <s.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">{s.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
              <div className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {s.priceLabel}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveService(s)}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:text-accent"
                >
                  Learn more
                </button>
                <button
                  type="button"
                  onClick={() => requestQuote(s)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
                >
                  Request a quote{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
              <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition group-hover:bg-accent/20" />
            </div>
          ))}
        </div>
      </section>

      {/* Maintenance care plans */}
      <section id="care-plans" className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Care Plans
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
              Monthly <span className="text-gradient-purple">maintenance plans</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Keep your website healthy after launch. Recurring monthly plans — pricing is set per
              client, so request a quote and we'll match a plan to your site.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {MAINTENANCE_PLANS.map((plan) => (
              <div
                key={plan.id}
                data-reveal-card
                className={`relative flex flex-col rounded-3xl border p-8 transition ${
                  plan.popular
                    ? "border-accent/60 bg-card"
                    : "border-border bg-card/40 hover:bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-8 rounded-full bg-gradient-accent px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-foreground">
                    Most popular
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.tagline}</p>
                <div className="mt-6 border-t border-border/60 pt-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Monthly
                  </span>
                  <div className="mt-1 font-display text-3xl font-bold text-gradient-purple">
                    {plan.monthlyPrice !== null
                      ? `R${plan.monthlyPrice.toLocaleString("en-ZA")}`
                      : "Request a quote"}
                  </div>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() =>
                    requestQuote({
                      id: `plan-${plan.id}`,
                      name: `${plan.name} maintenance plan`,
                      category: "maintenance",
                      icon: Check,
                      short: "",
                      body: "",
                      benefits: [],
                      features: [],
                      suitable: [],
                      priceLabel: "Monthly care plan",
                    })
                  }
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
                >
                  Request this plan <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Care plans are recurring monthly services; website builds are once-off projects. Hosting
            and domain fees are third-party costs, billed separately.
          </p>
        </div>
      </section>

      {/* Quotation request form */}
      <section
        id="quote"
        ref={quoteRef}
        className="border-t border-border/60 bg-card/30 scroll-mt-20"
      >
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              Get a quote
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
              Tell us what <span className="text-gradient-purple">you need.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Fill in the form below and we'll come back with a clear, plain-language scope, price
              and timeline — within one business day.
            </p>
          </div>
          <div className="mt-12">
            <QuoteForm preselected={preselected} />
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center">
            Standard with every project
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {extras.map((e) => (
              <div
                key={e.title}
                data-reveal-card
                className="rounded-2xl border border-border bg-background/40 p-6"
              >
                <e.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-display text-xl font-bold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          Ready to start?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Tell us about your project and we'll come back with a clear plan.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow hover:scale-105 transition"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <SiteFooter />

      <ServiceDialog
        service={activeService}
        onClose={() => setActiveService(null)}
        onRequestQuote={requestQuote}
      />
    </div>
  );
}
