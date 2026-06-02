import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import {
  listApprovedTestimonials,
  submitTestimonial,
} from "@/lib/testimonials.functions";

const SEED_TESTIMONIALS = [
  {
    id: "seed-1",
    initials: "TN",
    avatarBg: "#2563EB",
    name: "Thandi Nkosi",
    business: "Owner, Glam Studio",
    location: "East London",
    message:
      "Songezo built our salon booking site in under two weeks. It looks amazing and our clients actually use it — bookings went up immediately.",
  },
  {
    id: "seed-2",
    initials: "ML",
    avatarBg: "#16A34A",
    name: "Mpho Lekgau",
    business: "Manager, Sunrise Guesthouse",
    location: "Mthatha",
    message:
      "We needed a guest portal for our guesthouse and Buildify delivered beyond what we imagined. Professional, fast, and they still help us monthly.",
  },
  {
    id: "seed-3",
    initials: "DM",
    avatarBg: "#DC2626",
    name: "Dr. Ayanda Mthembu",
    business: "General Practitioner",
    location: "King William's Town",
    message:
      "As a doctor running a private practice, I needed something I could trust. Buildify built a clean, patient-friendly site and I didn't have to follow up once.",
  },
];

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

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {allCards.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        {/* Section 2: Feedback form */}
        <div className="mt-24 mx-auto max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Share your experience
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            How did we do?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Your feedback helps us improve and helps other businesses decide. It takes under a minute.
          </p>

          <div
            className="mt-8 bg-white text-zinc-900"
            style={{
              border: "0.5px solid #e5e7eb",
              borderRadius: 12,
              padding: "1.75rem",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 text-2xl font-bold">Thank you!</h3>
                <p className="mt-2 text-sm text-zinc-600 max-w-md">
                  Your feedback has been submitted. Songezo will review it and it may appear on the Buildify Co. website soon.
                </p>
                <div className="mt-8 w-full max-w-md text-left">
                  <div className="bg-white" style={{ border: "0.5px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4" fill="#EF9F27" stroke="#EF9F27" />
                      ))}
                    </div>
                    <p className="mt-4 font-serif text-base italic leading-relaxed text-zinc-800">
                      “{submitted.message}”
                    </p>
                    <div className="my-4 h-px bg-zinc-200" />
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: submitted.avatarBg }}
                      >
                        {submitted.initials}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{submitted.name}</div>
                        <div className="text-xs text-zinc-500">
                          {submitted.business}
                          {submitted.location ? ` — ${submitted.location}` : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-zinc-500">
                    Preview of how your testimonial may look once approved.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Thandi Nkosi"
                      className="form-input"
                      maxLength={100}
                    />
                  </Field>
                  <Field label="Business name">
                    <input
                      type="text"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="e.g. Glam Studio"
                      className="form-input"
                      maxLength={120}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your location">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. East London"
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
                            className="text-3xl leading-none transition-transform hover:scale-110"
                            style={{ color: active ? "#EF9F27" : "#d1d5db" }}
                            aria-label={`${n} star${n > 1 ? "s" : ""}`}
                          >
                            ★
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-sm text-zinc-600">{RATING_LABELS[displayRating]}</span>
                  </div>
                </Field>

                <Field label="Your testimonial">
                  <textarea
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value.slice(0, MAX_MESSAGE))
                    }
                    placeholder="Tell us what it was like working with Buildify Co. — what did we do well, what could we improve?"
                    className="form-input resize-y"
                    style={{ minHeight: 100 }}
                  />
                  <div className="mt-1 text-xs text-zinc-500">
                    {remaining} characters remaining
                  </div>
                </Field>

                <div className="flex items-start gap-3 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-600" style={{ border: "0.5px solid #e5e7eb" }}>
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-500" />
                  <p>
                    Your testimonial will be reviewed by Songezo before appearing on the site. We may shorten it slightly for display.
                  </p>
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" style={{ border: "0.5px solid #fecaca" }}>
                    {error}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
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
        .form-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          background: #fff;
          color: #111827;
          border: 0.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .form-input:focus {
          border-color: #18181b;
          box-shadow: 0 0 0 3px rgba(24,24,27,0.08);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      {children}
    </label>
  );
}
