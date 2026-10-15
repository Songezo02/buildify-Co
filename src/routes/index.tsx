import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Globe, Wrench, Sparkles, Shield, Zap, Scissors, Utensils, Hotel, Truck, Stethoscope } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SplashLogo } from "@/components/SplashLogo";
import { BuildingBackground } from "@/components/BuildingBackground";
import { TestimonialsAndFeedback } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import salonImg from "@/assets/industry-salon.jpg";
import logisticsImg from "@/assets/industry-logistics.jpg";
import doctorImg from "@/assets/industry-doctor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Buildify Co. — We Build. You Grow." },
    { name: "description", content: "Buildify Co. designs and builds modern websites and applications, then maintains them so your business keeps growing." },
    { property: "og:title", content: "Buildify Co. — We Build. You Grow." },
    { property: "og:description", content: "Websites, applications and ongoing maintenance from Buildify Co., founded by Songezo Gwabavu." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Home,
});

function Home() {
  return <div className="min-h-screen bg-background text-foreground"><SplashLogo /><SiteHeader /><Hero /><ServicesTeaser /><Industries /><AboutTeaser /><HowItWorks /><TestimonialsAndFeedback /><CTABand /><SiteFooter /></div>;
}

function Hero() {
  return <section className="editorial-hero border-b border-border/60">
    <BuildingBackground />
    <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
      <div className="editorial-label">Digital products. Real business growth.</div>
      <h1 className="editorial-title mt-7">Buildify Co.</h1>
      <p className="mt-4 font-display text-5xl font-extrabold leading-tight md:text-7xl">WE BUILD.<br />YOU GROW<span className="text-accent">.</span></p>
      <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">The digital partner for your next chapter.<br className="hidden sm:block" /> Websites, applications, and <span className="text-accent">lasting support.</span></p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button asChild variant="editorial" className="h-12 px-6"><Link to="/contact">Get Started <ArrowRight /></Link></Button>
        <Button asChild variant="editorialOutline" className="h-12 px-6"><Link to="/services">Explore Services <ArrowRight /></Link></Button>
      </div>
      <div className="mt-12 border-t border-border pt-6">
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Built for businesses across South Africa</p>
        <div className="mt-6 grid grid-cols-2 gap-5 text-sm text-muted-foreground sm:grid-cols-5">
          {[{ icon: Scissors, label: "Salons" }, { icon: Utensils, label: "Restaurants" }, { icon: Hotel, label: "Guesthouses" }, { icon: Truck, label: "Logistics" }, { icon: Stethoscope, label: "Healthcare" }].map(s => <div key={s.label} className="flex items-center justify-center gap-2"><s.icon className="h-5 w-5" /><span>{s.label}</span></div>)}
        </div>
      </div>
    </div>
  </section>;
}

function ServicesTeaser() {
  const services = [{ icon: Globe, title: "Websites", body: "Distinctive websites that turn first impressions into lasting connections." }, { icon: Code2, title: "Applications", body: "Purpose-built applications that make your business work better." }, { icon: Wrench, title: "Maintenance", body: "Reliable support, updates, and improvements. Long after launch." }];
  return <section className="editorial-section mx-auto max-w-6xl px-6">
    <div className="editorial-label">What we build</div>
    <div className="mt-5 flex flex-wrap items-end justify-between gap-6"><h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">Your ambition.<br />Our expertise.</h2><Button asChild variant="link" className="px-0 text-foreground"><Link to="/services">Explore all services <ArrowRight /></Link></Button></div>
    <div className="mt-12 grid gap-0 md:grid-cols-3">{services.map((s, i) => <Link key={s.title} to="/contact" search={{ service: s.title }} className="group border-t border-border py-8 md:pr-8"><div className="flex items-center justify-between"><span className="service-number">0{i + 1}</span><s.icon className="h-6 w-6 text-muted-foreground" /></div><h3 className="mt-9 text-2xl font-semibold">{s.title}</h3><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.body}</p><ArrowRight className="mt-7 h-5 w-5 text-accent transition group-hover:translate-x-2" /></Link>)}</div>
  </section>;
}

function Industries() {
  const items = [{ title: "Salons & beauty", image: salonImg, service: "Salons website (R1 800)", price: "R1 800" }, { title: "Healthcare professionals", image: doctorImg, service: "Healthcare Professional Website (R2 400)", price: "R2 400" }, { title: "Logistics companies", image: logisticsImg, service: "Logistics Companies website (R3 900)", price: "R3 900" }];
  return <section className="border-y border-border bg-card/30"><div className="editorial-section mx-auto max-w-6xl px-6"><div className="editorial-label">Built around your business</div><div className="mt-5 flex flex-wrap items-end justify-between gap-5"><h2 className="text-4xl font-bold md:text-5xl">Different industries.<br />One commitment.</h2><Button asChild variant="link" className="px-0 text-foreground"><Link to="/services">View packages & pricing <ArrowRight /></Link></Button></div><div className="mt-10 grid gap-6 md:grid-cols-3">{items.map(item => <Link key={item.title} to="/contact" search={{ service: item.service }} className="group overflow-hidden rounded-lg border border-border bg-card"><div className="aspect-[4/3] overflow-hidden"><img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div><div className="p-5"><h3 className="text-xl font-semibold">{item.title}</h3><div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-xs text-muted-foreground">From <span className="ml-1 text-base font-semibold text-foreground">{item.price}</span></span><ArrowRight className="h-5 w-5 text-accent" /></div></div></Link>)}</div></div></section>;
}

function AboutTeaser() {
  return <section className="editorial-section mx-auto max-w-6xl px-6"><div className="grid gap-12 md:grid-cols-2"><div><div className="editorial-label">The people behind the product</div><h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">Small studio.<br />Big on craft.</h2><Button asChild variant="link" className="mt-6 px-0 text-foreground"><Link to="/about">Meet Buildify <ArrowRight /></Link></Button></div><div><p className="text-xl leading-relaxed text-muted-foreground">Founded by <span className="text-foreground">Songezo Gwabavu</span>, Buildify Co. partners with founders and teams to design, build, and maintain the digital products that move their businesses forward.</p><div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">{[{ icon: Zap, v: "5–10 Days", label: "Fast delivery" }, { icon: Shield, v: "24/7", label: "Maintained" }, { icon: Sparkles, v: "2026", label: "Modern stack" }].map(s => <div key={s.label}><s.icon className="h-4 w-4 text-signal" /><div className="mt-3 text-lg font-bold">{s.v}</div><div className="mt-2 text-[10px] uppercase text-muted-foreground">{s.label}</div></div>)}</div></div></div></section>;
}

function CTABand() {
  return <section className="border-y border-border bg-secondary/40"><div className="editorial-section mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center"><div><div className="editorial-label">Let's make it happen</div><h2 className="mt-5 text-4xl font-bold md:text-5xl">Have something to build<span className="text-accent">?</span></h2><p className="mt-4 text-muted-foreground">Tell us about your project. We'll reply within one business day.</p></div><Button asChild variant="editorial" className="h-12 shrink-0 px-6"><Link to="/contact">Start a project <ArrowRight /></Link></Button></div></section>;
}
