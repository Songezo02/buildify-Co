import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Code2, Wrench, ArrowRight, Check, Smartphone, Search, Database } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import salonImg from "@/assets/industry-salon.jpg";
import restaurantImg from "@/assets/industry-restaurant.jpg";
import bnbImg from "@/assets/industry-bnb.jpg";
import logisticsImg from "@/assets/industry-logistics.jpg";
import doctorImg from "@/assets/industry-doctor.jpg";

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

  const pricing = [
    { industry: "Salons", price: "R1 800", image: salonImg, blurb: "Booking-ready sites for stylists and beauty studios." },
    { industry: "Healthcare Professional Website", price: "R2 400", image: doctorImg, blurb: "Patient-friendly sites for doctors and private practices." },
    { industry: "Restaurants", price: "R2 650", image: restaurantImg, blurb: "Menus, reservations and brand storytelling." },
    { industry: "BnBs & Guesthouses", price: "R3 700", image: bnbImg, blurb: "Showcase rooms and capture direct bookings." },
    { industry: "Logistics Companies", price: "R3 900", image: logisticsImg, blurb: "Fleet, services and quote-request workflows." },
  ];

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
        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">Services</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance text-white">
            Everything you need <span className="text-gradient-purple">to ship.</span>
          </h1>
          <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            From a one-page launch site to a long-term application partnership — pick the support level that matches your growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {main.map((s) => (
            <Link
              key={s.title}
              to="/contact"
              search={{ service: s.title }}
              data-reveal-card
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-8 transition hover:bg-card"
            >
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
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Request this service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
              <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition group-hover:bg-accent/20" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Pricing</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
              Websites by <span className="text-gradient-purple">industry</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Transparent starting prices for the industries we know best. Every build is custom — these are launch-ready packages.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricing.map((p) => (
              <Link
                key={p.industry}
                to="/contact"
                search={{ service: `${p.industry} website (${p.price})` }}
                data-reveal-card
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 transition hover:bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.industry} website example by Buildify Co.`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold">{p.industry}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.blurb}</p>
                  <div className="mt-6 flex items-end justify-between border-t border-border/60 pt-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">From</span>
                    <span className="font-display text-3xl font-bold text-gradient-purple">{p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Prices exclude domain &amp; hosting. Custom industries quoted on request.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center">Standard with every project</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {extras.map((e) => (
              <div key={e.title} data-reveal-card className="rounded-2xl border border-border bg-background/40 p-6">
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
