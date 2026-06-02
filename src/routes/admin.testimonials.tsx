import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Star, Check, X, LogOut } from "lucide-react";
import {
  adminListTestimonials,
  adminUpdateTestimonial,
} from "@/lib/testimonials.functions";

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({
    meta: [{ title: "Admin — Testimonials" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminTestimonials,
});

type Row = {
  id: string;
  name: string;
  business: string | null;
  location: string | null;
  service: string | null;
  rating: number;
  message: string;
  approved: boolean;
  created_at: string;
};

function AdminTestimonials() {
  const listFn = useServerFn(adminListTestimonials);
  const updateFn = useServerFn(adminUpdateTestimonial);

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(pw: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await listFn({ data: { password: pw } });
      setRows(res.items as Row[]);
      setAuthed(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function act(id: string, action: "approve" | "reject" | "delete") {
    try {
      await updateFn({ data: { password, id, action } });
      await load(password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background text-foreground grid place-items-center px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(password);
          }}
          className="w-full max-w-sm rounded-xl border border-border bg-card/40 p-6"
        >
          <h1 className="font-display text-2xl font-bold">Admin access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the admin password to manage testimonials.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
          {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
          >
            {loading ? "Checking..." : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  const pending = rows.filter((r) => !r.approved);
  const approved = rows.filter((r) => r.approved);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="font-display text-xl font-bold">Testimonials admin</h1>
          <button
            onClick={() => {
              setPassword("");
              setAuthed(false);
              setRows([]);
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {error && (
          <div className="mb-6 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <Section title={`Pending review (${pending.length})`} rows={pending} act={act} mode="pending" />
        <Section title={`Approved (${approved.length})`} rows={approved} act={act} mode="approved" />
      </main>
    </div>
  );
}

function Section({
  title,
  rows,
  act,
  mode,
}: {
  title: string;
  rows: Row[];
  act: (id: string, action: "approve" | "reject" | "delete") => void;
  mode: "pending" | "approved";
}) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-lg font-bold uppercase tracking-widest text-accent">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">Nothing here.</p>
      ) : (
        <ul className="mt-4 grid gap-4">
          {rows.map((r) => (
            <li key={r.id} className="rounded-xl border border-border bg-card/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {[r.business, r.location].filter(Boolean).join(" — ")} · {r.service} ·{" "}
                    {new Date(r.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      fill={i < r.rating ? "#EF9F27" : "transparent"}
                      stroke="#EF9F27"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 font-serif italic text-foreground/90">“{r.message}”</p>
              <div className="mt-4 flex gap-2">
                {mode === "pending" && (
                  <button
                    onClick={() => act(r.id, "approve")}
                    className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                )}
                <button
                  onClick={() => act(r.id, mode === "pending" ? "reject" : "delete")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-red-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                >
                  <X className="h-3.5 w-3.5" /> {mode === "pending" ? "Reject" : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
