# Services Page Upgrade (per uploaded brief)

- [x] Central service catalogue config (`src/lib/services.catalog.ts`) — 16 services, categories, maintenance plans, industry packages
- [x] Accessible service detail modal (Learn More) — ESC, focus management, scroll lock
- [x] Category filters (keyboard accessible, aria-pressed) — verified: E-commerce=1, Websites=4, All=16
- [x] Quotation/enquiry form on Services page → `enquiries` table + email notification to songezogwabavu@gmail.com
- [x] Wire existing Contact page form to the same backend (no more fake success)
- [x] Migration applied (`enquiries` table, RLS insert-only policy, grants); test row removed
- [x] Build green; end-to-end submission verified in preview
- [x] Routine security package update applied

## Remaining / future work
- Admin view to manage enquiries (status: new / quoted / won) — extend the /admin/testimonials pattern with the ADMIN_PASSWORD check
- Move service catalogue from config file into database when admin management of services is wanted
- Payment gateway integration required before showing checkout/payment methods on e-commerce builds
- Maintenance plan monthly prices currently show "Request a quote" — set `monthlyPrice` values in `src/lib/services.catalog.ts` once prices are decided
- Resend sender domain: notifications send from onboarding@resend.dev (owner-directed); verify a Buildify domain in Resend for branded sending
