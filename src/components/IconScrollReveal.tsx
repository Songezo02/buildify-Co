import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Observes all Lucide icons on the page and applies a smooth
 * fade + slight upward translate as they enter/leave the viewport.
 * Re-scans on route changes so newly mounted icons are picked up.
 */
export function IconScrollReveal() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // small stagger based on position within this batch
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

    const scan = () => {
      const icons = document.querySelectorAll<HTMLElement>("svg.lucide");
      icons.forEach((icon) => {
        if (icon.dataset.revealBound === "1") return;
        icon.dataset.revealBound = "1";
        icon.classList.add("icon-reveal");
        observer.observe(icon);
      });
    };

    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    const unsub = router.subscribe("onResolved", () => {
      // give the new route a tick to mount
      setTimeout(scan, 30);
    });

    return () => {
      observer.disconnect();
      mo.disconnect();
      unsub();
    };
  }, [router]);

  return null;
}
