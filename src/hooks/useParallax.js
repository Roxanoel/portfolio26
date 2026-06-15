import { useEffect } from "react";

/**
 * Pointer-parallax for elements with [data-parallax="<strength>"].
 * Strength is the multiplier; positive = follows cursor, negative = opposes.
 */
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(document.querySelectorAll("[data-parallax]"));
    if (nodes.length === 0) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = null;

    function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      nodes.forEach((n) => {
        const s = parseFloat(n.getAttribute("data-parallax")) || 10;
        n.style.transform = `translate3d(${cx * s}px,${cy * s}px,0)`;
      });
      raf =
        Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001
          ? requestAnimationFrame(loop)
          : null;
    }

    function onMove(e) {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
