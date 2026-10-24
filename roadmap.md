# Services Page Upgrade (per uploaded brief)

- [x] Central service catalogue config (`src/lib/services.catalog.ts`) — 16 services (A–P, three merged into existing cards), categories, maintenance plans, industry packages
- [ ] Accessible service detail modal (Learn More)
- [ ] Category filters (keyboard accessible, aria-pressed)
- [ ] Quotation/enquiry form on Services page → stored in Lovable Cloud (`enquiries` table) + email notification to songezogwabavu@gmail.com
- [ ] Wire existing Contact page form to the same backend (stop fake success)
- [ ] Migration file + apply schema
- [ ] Verify: build, filters, modal, form end-to-end
- [ ] Summarise remaining backend work (admin enquiry management, service DB integration)

## Remaining / future work
- Admin dashboard to manage enquiries (approve/reject/follow-up status) — requires auth-protected admin extension of /admin/testimonials pattern
- Move service catalogue into database when admin management is wanted
- Payment gateway for e-commerce before advertising checkout
