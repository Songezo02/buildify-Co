# AGENTS.md

## Architecture decisions

- All service catalogue content (services, categories, features, industry packages, maintenance plans) lives in `src/lib/services.catalog.ts` as the single source of truth; the Services page renders from it. Why: the brief requires a central, maintainable catalogue that can later be swapped for a database-backed admin dashboard without touching page code.
- Quotation requests and contact-page messages are stored via `submitEnquiry` (`src/lib/enquiries.functions.ts`) into the `enquiries` table (insert-only RLS, no public reads) with a Resend email notification. Why: submissions must be stored securely and never silently discarded.
- Client calls to server functions pass `{ data: payload }` (TanStack Start v1.168+ calling convention). Why: direct-argument calls fail typecheck with the current packages.
