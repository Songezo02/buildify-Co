import { Link } from "@tanstack/react-router";
import { Mail, Phone, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { LogoMark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-xl font-bold">
                Buildify<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              We build digital products that grow businesses. Websites, applications, and the maintenance to keep them shipping.
            </p>
            <div className="mt-6 flex gap-3">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition hover:text-accent hover:border-accent/50"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Navigate</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-accent">Home</Link></li>
              <li><Link to="/services" className="hover:text-accent">Services</Link></li>
              <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contact</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:0833359097" className="hover:text-accent">083 335 9097</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:songezogwabvu@gmail.com" className="hover:text-accent break-all">songezogwabvu@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Buildify Co. All rights reserved.</span>
          <span>Founded by Songezo Gwabavu.</span>
        </div>
      </div>
    </footer>
  );
}
