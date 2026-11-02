import { useEffect, useRef } from "react";
import { X, Check, Info } from "lucide-react";
import type { Service } from "@/lib/services.catalog";

interface ServiceDialogProps {
  service: Service | null;
  onClose: () => void;
  onRequestQuote: (service: Service) => void;
}

export function ServiceDialog({ service, onClose, onRequestQuote }: ServiceDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastActive = useRef<Element | null>(null);

  useEffect(() => {
    if (!service) return;
    lastActive.current = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (lastActive.current instanceof HTMLElement) lastActive.current.focus();
    };
  }, [service, onClose]);

  if (!service) return null;
  const Icon = service.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-dialog-title"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-glow sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4 border-b border-border/60 p-6">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-accent">
                {CATEGORIES.find((c) => c.id === service.category)?.label ?? "Service"}
              </div>
              <h2 id="service-dialog-title" className="mt-1 font-display text-2xl font-bold">
                {service.name}
              </h2>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close service details"
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <p className="text-sm leading-relaxed text-foreground/90">{service.body}</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Key benefits</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Suitable for</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {service.suitable.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Features included</h3>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.notes && service.notes.length > 0 && (
            <div className="mt-6 space-y-2 rounded-2xl border border-border/60 bg-background/50 p-4">
              {service.notes.map((n) => (
                <p key={n} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                  <span>{n}</span>
                </p>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-background/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Starting price</div>
              <div className="mt-1 font-display text-lg font-bold text-gradient-purple">{service.priceLabel}</div>
            </div>
            <button
              onClick={() => onRequestQuote(service)}
              className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
            >
              Request a quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
