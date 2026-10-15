import { useEffect, useState } from "react";
import { MessageCircle, FileText, Code, Rocket, type LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    icon: MessageCircle,
    title: "Tell us what you need",
    desc: "Fill in our contact form or WhatsApp us. We'll reply within one business day.",
  },
  {
    icon: FileText,
    title: "Get a clear proposal",
    desc: "We send you a plain-language scope, price, and timeline. No surprises.",
  },
  {
    icon: Code,
    title: "We design and build",
    desc: "We get to work. You get progress updates — no chasing required.",
  },
  {
    icon: Rocket,
    title: "Launch and grow",
    desc: "Your product goes live. We stay on for maintenance, updates, and whatever comes next.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % STEPS.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-left hiw-fade" style={{ animationDelay: "0s" }}>
        <div className="editorial-label">
          How it works
        </div>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight hiw-fade" style={{ animationDelay: "0.08s" }}>
          Simple from day one.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = active === i;
          return (
            <div
              key={step.title}
              className={`hiw-card group relative rounded-lg border bg-card/60 p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-card hover:border-accent/60 hiw-fade ${
                isActive ? "is-active" : ""
              }`}
              style={{ animationDelay: `${0.15 + i * 0.15}s` }}
            >
              <div className="flex items-center gap-3">
                <span className="hiw-num grid h-9 w-9 place-items-center rounded-full border border-border bg-background/40 font-mono text-sm font-semibold text-muted-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
                  {i + 1}
                </span>
                <Icon className="hiw-icon h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-accent group-hover:scale-[1.15]" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-6 bg-accent" : "w-1.5 bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
