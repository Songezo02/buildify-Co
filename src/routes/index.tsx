import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Folio — Editorial portfolio software for makers" },
      { name: "description", content: "Folio is the editorial-first portfolio builder for designers, writers and studios who care about typography." },
      { property: "og:title", content: "Folio — Editorial portfolio software" },
      { property: "og:description", content: "The editorial-first portfolio builder for designers, writers and studios." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <Showcase />
      <Pricing />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl font-black tracking-tight">
          Folio<span className="text-tomato">.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#features" className="hover:text-tomato">Features</a>
          <a href="#showcase" className="hover:text-tomato">Showcase</a>
          <a href="#pricing" className="hover:text-tomato">Pricing</a>
        </nav>
        <a href="#pricing" className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition hover:bg-tomato">
          Start free
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-28 md:pb-36">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-paper px-3 py-1 text-xs font-mono uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-tomato" /> v3.0 — out now
          </div>
          <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] font-black leading-[0.9] tracking-tighter text-balance">
            Portfolios<br />
            <span className="italic font-normal">that read like</span><br />
            <span className="relative inline-block">
              magazines
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8 Q 75 2, 150 6 T 298 4" stroke="oklch(0.62 0.22 28)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink/70 leading-relaxed">
            Folio is the editorial-first portfolio builder for designers, writers, and studios who believe layout is a feeling — not a template.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#pricing" className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-semibold text-paper shadow-[var(--shadow-brutal)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[var(--shadow-brutal-lg)]">
              Start your folio →
            </a>
            <a href="#showcase" className="text-base font-medium underline underline-offset-4 decoration-tomato decoration-2 hover:text-tomato">
              See work made with Folio
            </a>
          </div>
        </div>

        <div className="relative md:col-span-4">
          <div className="animate-float relative aspect-[3/4] rounded-sm bg-citrus shadow-[var(--shadow-brutal-lg)] border-2 border-ink p-6 flex flex-col justify-between">
            <div className="font-mono text-xs uppercase tracking-widest">Issue 03 / Spring</div>
            <div>
              <div className="font-display text-5xl font-black leading-none">Make it<br/><em className="font-normal">unforgettable.</em></div>
              <div className="mt-4 h-px bg-ink/40" />
              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase">
                <span>Folio Press</span><span>№ 0042</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-8 h-16 w-16 rounded-full bg-tomato border-2 border-ink flex items-center justify-center text-paper font-display font-black text-xl rotate-12">
            New
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Typography first", "Editorial layouts", "Custom grids", "Zero templates", "Print-quality kerning", "Made for makers"];
  return (
    <div className="border-y-2 border-ink bg-ink py-5 text-paper overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mx-8 font-display text-3xl font-black italic">
            {t} <span className="text-tomato mx-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const features = [
    { n: "01", title: "Grids that bend", body: "Twelve, sixteen, or twenty-four columns. Break out, span across, overlap. Your layout, your rules." },
    { n: "02", title: "Typography that sings", body: "Variable fonts, optical sizing, true small caps. Every letter set with intention." },
    { n: "03", title: "Motion with manners", body: "Subtle scroll choreography that respects your work — and your readers' attention." },
    { n: "04", title: "One-click publishing", body: "Custom domain, instant CDN, perfect Lighthouse scores. Ship in thirty seconds." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="md:col-span-7 font-display text-5xl md:text-7xl font-black leading-none tracking-tighter">
          Built for the <em className="font-normal">obsessive.</em>
        </h2>
        <p className="md:col-span-5 text-lg text-ink/70">
          Every feature exists because somebody — probably you — was about to throw their laptop out a window. We listened.
        </p>
      </div>
      <div className="grid gap-px bg-ink border-2 border-ink md:grid-cols-2">
        {features.map((f) => (
          <div key={f.n} className="bg-paper p-8 md:p-12 transition hover:bg-citrus">
            <div className="font-mono text-xs uppercase tracking-widest text-ink/60">{f.n}</div>
            <h3 className="mt-4 font-display text-3xl md:text-4xl font-black tracking-tight">{f.title}</h3>
            <p className="mt-4 text-base text-ink/70 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  const works = [
    { title: "Studio Mira", cat: "Brand Studio", color: "bg-cobalt", text: "text-paper" },
    { title: "Hana Okada", cat: "Photographer", color: "bg-tomato", text: "text-paper" },
    { title: "Press & Ink", cat: "Editorial", color: "bg-citrus", text: "text-ink" },
  ];
  return (
    <section id="showcase" className="border-t-2 border-ink bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter">In the wild.</h2>
          <a href="#" className="hidden md:inline text-sm font-mono uppercase tracking-widest hover:text-tomato">View all →</a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {works.map((w, i) => (
            <article key={w.title} className={`group relative aspect-[4/5] ${w.color} ${w.text} border-2 border-ink p-6 flex flex-col justify-between transition hover:-translate-y-2 ${i === 1 ? 'md:translate-y-12' : ''}`}>
              <div className="font-mono text-xs uppercase tracking-widest opacity-80">{w.cat}</div>
              <div>
                <div className="font-display text-4xl font-black leading-none">{w.title}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4">
                  Read case study →
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Reader", price: "0", desc: "For dipping a toe in.", features: ["1 project", "Folio subdomain", "Editorial templates"], cta: "Start free", featured: false },
    { name: "Maker", price: "12", desc: "For working creatives.", features: ["Unlimited projects", "Custom domain", "Advanced typography", "No Folio badge"], cta: "Go Maker", featured: true },
    { name: "Studio", price: "39", desc: "For teams and agencies.", features: ["Everything in Maker", "5 collaborators", "Client review mode", "Priority support"], cta: "Go Studio", featured: false },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="mb-16 text-center">
        <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter">
          Plans that <em className="font-normal">read well.</em>
        </h2>
        <p className="mt-4 text-lg text-ink/70">No annual lock-in. No surprise tiers. Just three honest plans.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`relative border-2 border-ink p-8 ${p.featured ? 'bg-ink text-paper shadow-[var(--shadow-brutal-lg)] md:-translate-y-4' : 'bg-paper'}`}>
            {p.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-tomato text-paper border-2 border-ink px-3 py-1 font-mono text-xs uppercase tracking-widest">
                Most loved
              </div>
            )}
            <div className="font-mono text-xs uppercase tracking-widest opacity-70">{p.name}</div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-6xl font-black">${p.price}</span>
              <span className="text-sm opacity-70">/mo</span>
            </div>
            <p className="mt-2 text-sm opacity-70">{p.desc}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map(f => (
                <li key={f} className="flex gap-2"><span className="text-tomato">✦</span>{f}</li>
              ))}
            </ul>
            <button className={`mt-8 w-full rounded-full py-3 text-sm font-semibold border-2 border-ink transition ${p.featured ? 'bg-citrus text-ink hover:bg-tomato hover:text-paper' : 'bg-ink text-paper hover:bg-tomato'}`}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="font-display text-[clamp(3rem,12vw,11rem)] font-black leading-none tracking-tighter">
          Folio<span className="text-tomato">.</span>
        </div>
        <div className="mt-12 grid gap-8 border-t border-paper/20 pt-8 md:grid-cols-4 text-sm">
          <div>
            <div className="font-mono uppercase tracking-widest opacity-60 mb-3">Product</div>
            <ul className="space-y-2"><li>Features</li><li>Templates</li><li>Pricing</li></ul>
          </div>
          <div>
            <div className="font-mono uppercase tracking-widest opacity-60 mb-3">Company</div>
            <ul className="space-y-2"><li>About</li><li>Journal</li><li>Contact</li></ul>
          </div>
          <div>
            <div className="font-mono uppercase tracking-widest opacity-60 mb-3">Legal</div>
            <ul className="space-y-2"><li>Privacy</li><li>Terms</li></ul>
          </div>
          <div>
            <div className="font-mono uppercase tracking-widest opacity-60 mb-3">Made in</div>
            <p>Stockholm, with strong coffee and stronger opinions.</p>
          </div>
        </div>
        <div className="mt-12 flex justify-between font-mono text-xs uppercase opacity-60">
          <span>© 2026 Folio Press</span>
          <span>№ 0042</span>
        </div>
      </div>
    </footer>
  );
}
