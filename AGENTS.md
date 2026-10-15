# Architecture
- Keep all page navigation in TanStack file routes; this preserves the existing service-to-contact search flow.
- Define the shared editorial palette and motion styles in src/styles.css and use semantic tokens throughout presentation code so visual changes stay consistent.
- Use the shared Button variants for editorial calls to action so navigation and form controls retain accessible focus and interaction states.
- Preserve existing testimonial server functions and moderation behavior during visual redesigns; presentation updates must not change submission permissions or notifications.
