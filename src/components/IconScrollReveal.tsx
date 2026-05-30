import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Observes Lucide icons and any `[data-reveal-card]` elements on the page
 * and applies a smooth fade + translate (+ scale for cards) as they
 * enter/leave the viewport. Re-scans on route changes so newly mounted
 * elements are picked up.
 */
export function IconScrollReveal() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const iconObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
            el.classList.add("icon-reveal-in");
            el.classList.remove("icon-reveal-out");
          } else {
            el.style.transitionDelay = "0ms";
            el.classList.remove("icon-reveal-in");
            el.classList.add("icon-reveal-out");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("reveal-card-in");
            el.classList.remove("reveal-card-out");
          } else {
            el.classList.remove("reveal-card-in");
            el.classList.add("reveal-card-out");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("svg.lucide").forEach((icon) => {
        if (icon.dataset.revealBound === "1") return;
        icon.dataset.revealBound = "1";
        icon.classList.add("icon-reveal");
        iconObserver.observe(icon);
      });

      document.querySelectorAll<HTMLElement>("[data-reveal-card]").forEach((card) => {
        if (card.dataset.revealBound === "1") return;
        card.dataset.revealBound = "1";
        card.classList.add("reveal-card");
        // compute index among siblings sharing the same parent to stagger nicely
        const parent = card.parentElement;
        const siblings = parent
          ? Array.from(parent.querySelectorAll<HTMLElement>("[data-reveal-card]"))
          : [card];
        const idx = siblings.indexOf(card);
        card.style.setProperty("--reveal-index", String(idx >= 0 ? idx : 0));
        cardObserver.observe(card);
      });
    };

    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    const unsub = router.subscribe("onResolved", () => {
      setTimeout(scan, 30);
    });

    return () => {
      iconObserver.disconnect();
      cardObserver.disconnect();
      mo.disconnect();
      unsub();
    };
  }, [router]);

  return null;
}
