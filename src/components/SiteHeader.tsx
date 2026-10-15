import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [{ to: "/", label: "Home" }, { to: "/services", label: "Services" }, { to: "/about", label: "About Us" }, { to: "/contact", label: "Contact" }] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-5 px-6">
        <Link to="/" aria-label="Buildify Co. home" className="flex shrink-0 items-center gap-2">
          <LogoMark className="h-8 w-8" />
          <span className="font-display text-2xl font-extrabold">Buildify Co<span className="text-accent">.</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {links.map(l => <Link key={l.to} to={l.to} className="text-xs font-medium text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>{l.label}</Link>)}
        </nav>
        <Button asChild variant="editorial" className="hidden h-10 px-5 text-xs md:inline-flex"><Link to="/contact">Get Started <ArrowRight /></Link></Button>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-6 py-5 md:hidden">{links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-3 text-sm text-foreground">{l.label}</Link>)}</nav>}
    </header>
  );
}

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return <svg viewBox="0 0 40 40" className={className} aria-hidden="true"><rect x="3" y="20" width="10" height="14" rx="1" fill="currentColor" /><rect x="15" y="12" width="10" height="22" rx="1" fill="currentColor" /><rect x="27" y="4" width="10" height="30" rx="1" fill="var(--accent)" /></svg>;
}
