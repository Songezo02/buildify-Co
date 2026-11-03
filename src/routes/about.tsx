import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Target, Heart, Rocket } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Buildify Co." },
      {
        name: "description",
        content:
          "Buildify Co. is a technology studio founded by Songezo Gwabavu, building websites and applications that help businesses grow.",
      },
      { property: "og:title", content: "About Buildify Co." },
      { property: "og:description", content: "Meet the studio and its founder, Songezo Gwabavu." },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    { icon: Target, title: "Clarity", body: "We strip away the noise and ship what matters." },
    { icon: Heart, title: "Craft", body: "Every pixel and line of code is treated with intent." },
    {
      icon: Rocket,
      title: "Growth",
      body: "Our work is judged by the results it creates for you.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">About</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter text-balance">
            Built by makers, <span className="text-gradient-purple">for makers.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Buildify Co. is a small, focused technology studio. We design, build and maintain the
            digital products that businesses rely on every day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/30 via-card to-accent/20 border border-border p-10 flex items-end shadow-glow">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Founder
                </div>
                <div className="mt-2 font-display text-5xl font-bold tracking-tight">
                  Songezo
                  <br />
                  Gwabavu
                </div>
                <div className="mt-3 text-sm text-muted-foreground">Founder & Lead Engineer</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-accent/30 blur-3xl" />
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Our story</div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">
              A studio with a builder's heart.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Buildify Co. was founded by{" "}
                <span className="text-foreground font-medium">Songezo Gwabavu</span> with a simple
                belief: technology should serve growth, not slow it down.
              </p>
              <p>
                We work directly with founders and teams — no middlemen, no inflated processes. From
                the first sketch to the hundredth deploy, the people building your product are the
                ones who care about it most.
              </p>
              <p>
                Every project we ship is one we'd be proud to maintain ourselves. And usually, we
                do.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center">
            What we value
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                data-reveal-card
                className="rounded-2xl border border-border bg-card/60 p-8 text-center"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <v.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{v.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          Let's build something together.
        </h2>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow hover:scale-105 transition"
        >
          Get in touch <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
