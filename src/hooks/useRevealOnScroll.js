import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to all [data-reveal] descendants of the
 * given containerRef, adding class "in" when they enter the viewport.
 * Staggered children inside [data-reveal-group] get auto --reveal-delay.
 * Falls back to revealing everything at once when IntersectionObserver is
 * unavailable or the user prefers reduced motion.
 */
export function useRevealOnScroll(containerRef) {
  useEffect(() => {
    const root = containerRef?.current ?? document;

    const els = Array.from(root.querySelectorAll("[data-reveal]"));
    if (els.length === 0) return;

    const revealAll = () => els.forEach((el) => el.classList.add("in"));

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      revealAll();
      return;
    }

    root.querySelectorAll("[data-reveal-group]").forEach((group) => {
      group.querySelectorAll("[data-reveal]").forEach((el, i) => {
        el.style.setProperty("--reveal-delay", `${(i % 6) * 90}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}
