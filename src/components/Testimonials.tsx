import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Star, CheckCircle2 } from "lucide-react";
import {
  listApprovedTestimonials,
  submitTestimonial,
} from "@/lib/testimonials.functions";

const AVATAR_PALETTE = ["#2563EB", "#16A34A", "#DC2626", "#9333EA", "#0EA5E9", "#F97316"];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

function avatarColor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

type CardData = {
  id: string;
  initials: string;
  avatarBg: string;
  name: string;
  business: string;
  location: string;
  message: string;
};

function TestimonialCard({ t }: { t: CardData }) {
  return (
    <div
      className="flex flex-col rounded-xl bg-card/40 p-6 backdrop-blur-sm"
      style={{ border: "0.5px solid var(--border)", borderRadius: 12 }}
    >
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4" fill="#EF9F27" stroke="#EF9F27" />
        ))}
      </div>
      <p className="mt-4 font-serif text-base italic leading-relaxed text-foreground/90">
        “{t.message}”
      </p>
      <div className="my-5 h-px bg-border" />
      <div className="flex items-center gap-3">
        <div
          className="grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: t.avatarBg }}
        >
          {t.initials}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-foreground">{t.name}</div>
          <div className="truncate text-xs text-muted-foreground">
            {t.business}
            {t.location ? ` — ${t.location}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

const RATING_LABELS = ["Tap to rate", "Poor", "Fair", "Good", "Great", "Excellent"];
const MAX_MESSAGE = 400;

const SERVICES = [
  "Website development",
  "Application development",
  "Maintenance & support",
  "Other",
];

export function TestimonialsAndFeedback() {
  const fetchApproved = useServerFn(listApprovedTestimonials);
  const submitFn = useServerFn(submitTestimonial);

  const [approved, setApproved] = useState<CardData[]>([]);
  useEffect(() => {
    fetchApproved()
      .then((res) => {
        setApproved(
          res.items.map((row) => ({
            id: row.id,
            initials: initialsOf(row.name),
            avatarBg: avatarColor(row.id),
            name: row.name,
            business: row.business ?? "",
            location: row.location ?? "",
            message: row.message,
          })),
        );
      })
      .catch(() => {});
  }, [fetchApproved]);

  const allCards = useMemo(() => [...SEED_TESTIMONIALS, ...approved], [approved]);

  // Form state
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<CardData | null>(null);

  const remaining = MAX_MESSAGE - message.length;
  const displayRating = hoverRating || rating;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!service) return setError("Please select the service you received.");
    if (rating === 0) return setError("Please give a star rating.");
    if (message.trim().length < 20)
      return setError("Please write at least 20 characters in your testimonial.");

    setSubmitting(true);
    try {
      await submitFn({
        data: {
          name: name.trim(),
          business: business.trim(),
          location: location.trim(),
          service,
          rating,
          message: message.trim(),
        },
      });
      setSubmitted({
        id: "preview",
        initials: initialsOf(name),
        avatarBg: avatarColor(name),
        name: name.trim(),
        business: business.trim(),
        location: location.trim(),
        message: message.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="border-t border-border/60 bg-card/20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Section 1: Testimonials */}
        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">
            Testimonials
          </div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            What our clients say
          </h2>
        </div>

        <div
          className="mt-12 marquee group"
          aria-label="Client testimonials"
          onMouseEnter={(e) => e.currentTarget.classList.add("is-paused")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("is-paused")}
        >
          <div className="marquee-track">
            {[...allCards, ...allCards].map((t, i) => (
              <div key={`${t.id}-${i}`} className="marquee-item" aria-hidden={i >= allCards.length}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
          <div className="marquee-fade marquee-fade-left" aria-hidden />
          <div className="marquee-fade marquee-fade-right" aria-hidden />
        </div>

        {/* Section 2: Feedback form */}
        <div className="mt-20 mx-auto max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Share your experience
          </div>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight">
            How did we do?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your feedback helps us improve. It takes under a minute.
          </p>

          <div
            className="mt-6 bg-card text-card-foreground"
            style={{
              border: "0.5px solid var(--border)",
              borderRadius: 12,
              padding: "1.25rem",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-green-500/15">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="mt-3 text-xl font-bold">Thank you!</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-md">
                  Your feedback has been submitted.
                </p>
                <div className="mt-6 w-full max-w-sm text-left">
                  <div
                    className="bg-card/50"
                    style={{
                      border: "0.5px solid var(--border)",
                      borderRadius: 12,
                      padding: "1rem",
                    }}
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4" fill="#EF9F27" stroke="#EF9F27" />
                      ))}
                    </div>
                    <p className="mt-3 font-serif text-sm italic leading-relaxed text-foreground/90">
                      “{submitted.message}”
                    </p>
                    <div className="my-3 h-px bg-border" />
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-8 w-8 place-items-center rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: submitted.avatarBg }}
                      >
                        {submitted.initials}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{submitted.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {submitted.business}
                          {submitted.location ? ` — ${submitted.location}` : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Preview of how your testimonial may look once approved.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Your name">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      maxLength={100}
                    />
                  </Field>
                  <Field label="Business name">
                    <input
                      type="text"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      className="form-input"
                      maxLength={120}
                    />
                  </Field>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Your location">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-input"
                      maxLength={120}
                    />
                  </Field>
                  <Field label="Service received">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="form-input"
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Overall rating">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => {
                        const active = n <= displayRating;
                        return (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            onMouseEnter={() => setHoverRating(n)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="text-2xl leading-none transition-transform hover:scale-110"
                            style={{ color: active ? "#EF9F27" : "var(--muted-foreground)" }}
                            aria-label={`${n} star${n > 1 ? "s" : ""}`}
                          >
                            ★
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {RATING_LABELS[displayRating]}
                    </span>
                  </div>
                </Field>

                <Field label="Your testimonial">
                  <textarea
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value.slice(0, MAX_MESSAGE))
                    }
                    placeholder="Tell us what it was like working with Buildify Co."
                    className="form-input resize-y"
                    style={{ minHeight: 80 }}
                  />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {remaining} characters remaining
                  </div>
                </Field>

                {error && (
                  <div
                    className="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
                    style={{ border: "0.5px solid oklch(0.6 0.22 25 / 0.35)" }}
                  >
                    {error}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .marquee {
          position: relative;
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 1.5rem;
          animation: marquee-scroll 60s linear infinite;
          will-change: transform;
        }
        .marquee.is-paused .marquee-track { animation-play-state: paused; }
        .marquee-item {
          flex: 0 0 auto;
          width: 360px;
          max-width: 85vw;
        }
        .marquee-fade { display: none; }
        @keyframes marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(calc(-50% - 0.75rem), 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation-duration: 180s; }
        }
        .form-input {
          width: 100%;
          padding: 0.5rem 0.625rem;
          background: oklch(0.15 0.02 280);
          color: var(--foreground);
          border: 0.5px solid var(--border);
          border-radius: 8px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input::placeholder {
          color: var(--muted-foreground);
        }
        .form-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px oklch(0.55 0.22 295 / 0.15);
        }
        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.25em 1.25em;
          padding-right: 2rem;
        }
        select.form-input option {
          background: oklch(0.17 0.025 280);
          color: var(--foreground);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
