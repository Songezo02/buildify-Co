import { useEffect, useRef, useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { SERVICES } from "@/lib/services.catalog";

interface QuoteFormProps {
  /** Service names preselected by the user (from a card's Request-a-quote action). */
  preselected?: string[];
}

const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under R2 500",
  "R2 500 – R7 500",
  "R7 500 – R20 000",
  "R20 000 or more",
];

const CONTACT_METHODS: { id: "email" | "phone" | "whatsapp"; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone call" },
  { id: "whatsapp", label: "WhatsApp" },
];

export function QuoteForm({ preselected = [] }: QuoteFormProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState<"email" | "phone" | "whatsapp">("email");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const submittingRef = useRef(false);

  // Sync preselected services from cards / detail dialog.
  useEffect(() => {
    if (preselected.length > 0) {
      setSelected(preselected);
      setSubmitted(false);
      setFailed(false);
      setErrors([]);
    }
  }, [preselected]);

  const toggleService = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));
  };

  const validate = (data: Record<string, string>): string[] => {
    const errs: string[] = [];
    if (!data.name.trim()) errs.push("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errs.push("Please enter a valid email address.");
    if (selected.length === 0) errs.push("Please select at least one service.");
    if (data.description.trim().length < 20) errs.push("Please describe your project in at least 20 characters.");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return; // Prevent accidental duplicate submissions.

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const errs = validate(data);
    setErrors(errs);
    if (errs.length > 0) return;

    submittingRef.current = true;
    setSubmitting(true);
    setFailed(false);
    try {
      await submitEnquiry({
        name: data.name.trim(),
        business: data.business.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        services: selected,
        budget: data.budget.trim(),
        description: data.description.trim(),
        contactMethod,
      });
      setSubmitted(true);
      form.reset();
      setSelected([]);
    } catch {
      setFailed(true);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-accent/40 bg-card/60 p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-accent shadow-accent-glow">
          <ShieldCheck className="h-7 w-7 text-accent-foreground" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold">Request received!</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Thank you — your quotation request has been saved and we've been notified. We'll get back to you within one
          business day.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card/60 p-6 md:p-10 space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="q-name" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Full name <span className="text-accent">*</span>
          </label>
          <input
            id="q-name"
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="q-business" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Business name (optional)
          </label>
          <input
            id="q-business"
            name="business"
            className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="q-email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Email address <span className="text-accent">*</span>
          </label>
          <input
            id="q-email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="q-phone" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Phone number (optional)
          </label>
          <input
            id="q-phone"
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Services required <span className="text-accent">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Select the services you need">
          {SERVICES.map((s) => {
            const active = selected.includes(s.name);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleService(s.name)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                  active
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="q-budget" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Estimated budget (optional)
        </label>
        <select
          id="q-budget"
          name="budget"
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        >
          {BUDGET_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="q-description" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Project description <span className="text-accent">*</span>
        </label>
        <textarea
          id="q-description"
          name="description"
          rows={5}
          required
          maxLength={3000}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          placeholder="Tell us what you need, what your business does, and any deadlines..."
        />
      </div>

      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Preferred contact method <span className="text-accent">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Preferred contact method">
          {CONTACT_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={contactMethod === m.id}
              onClick={() => setContactMethod(m.id)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                contactMethod === m.id
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </fieldset>

      {errors.length > 0 && (
        <div role="alert" className="rounded-xl border border-destructive/50 bg-destructive/10 p-4">
          <ul className="space-y-1 text-sm text-destructive">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {failed && (
        <div role="alert" className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Something went wrong while sending your request. Please try again, or contact us directly on 083 335 9097.
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending..." : ("Request a quote" && <>Request a quote <Send className="h-4 w-4" /></>)}
      </button>
    </form>
  );
}
