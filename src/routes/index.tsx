import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Globe, Wrench, Sparkles, Shield, Zap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SplashLogo } from "@/components/SplashLogo";
import { BuildingBackground } from "@/components/BuildingBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buildify Co. — We Build. You Grow." },
      { name: "description", content: "Buildify Co. designs and builds modern websites and applications, then maintains them so your business keeps growing." },
      { property: "og:title", content: "Buildify Co. — We Build. You Grow." },
      { property: "og:description", content: "Websites, applications and ongoing maintenance from Buildify Co., founded by Songezo Gwabavu." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SplashLogo />
      <SiteHeader />
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <CTABand />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-32 md:pb-40">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Now taking new projects
          </div>

          <h1 className="mt-8 font-display text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[0.95] tracking-tighter text-balance">
            <span className="text-gradient">WE BUILD.</span>
            <br />
            <span className="text-gradient-purple">YOU GROW.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Buildify Co. crafts high-performance websites and applications — then maintains them so your business never stops shipping.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-7 py-4 text-base font-medium text-foreground transition hover:border-accent/50 hover:text-accent"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-20 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
            {[
              { icon: Zap, label: "Fast delivery", v: "2–4 weeks" },
              { icon: Shield, label: "Always maintained", v: "24/7" },
              { icon: Sparkles, label: "Modern stack", v: "2026 ready" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur">
                <s.icon className="h-5 w-5 text-accent" />
                <div className="mt-3 font-display text-2xl font-bold">{s.v}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="border-t border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">About Buildify</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
            A studio built on craft, run by a founder who ships.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Buildify Co. is a technology studio founded by <span className="text-foreground font-medium">Songezo Gwabavu</span>. We partner with founders and teams to design, build and maintain the digital products that move their business forward.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
          >
            Read our story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="md:col-span-5">
          <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card to-background p-8 shadow-glow">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Founder</div>
            <div className="mt-3 font-display text-3xl font-bold">Songezo Gwabavu</div>
            <div className="mt-1 text-sm text-muted-foreground">Founder & Lead Engineer</div>
            <div className="mt-6 h-px bg-border" />
            <p className="mt-6 text-sm text-muted-foreground italic">
              "We build the things we'd want to use. Then we look after them like they're our own."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  const services = [
    { icon: Globe, title: "Websites", body: "Marketing sites, landing pages and editorial platforms — fast, accessible, beautifully typeset." },
    { icon: Code2, title: "Applications", body: "Full-stack web apps, dashboards and internal tools tailored to how your team actually works." },
    { icon: Wrench, title: "Maintenance", body: "Monitoring, updates, performance tuning and feature work on a steady monthly rhythm." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent">What we do</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Services</h2>
        </div>
        <Link to="/services" className="text-sm font-semibold text-accent hover:underline">All services →</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-8 transition hover:border-accent/50 hover:bg-card">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <s.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
          </div>
        ))}
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-card to-accent/10 p-10 md:p-16">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Have something to build?
            </h3>
            <p className="mt-2 text-muted-foreground">Tell us about your project — we'll reply within one business day.</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-base font-semibold text-background transition hover:bg-accent hover:text-accent-foreground"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
