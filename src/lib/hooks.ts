import { useEffect, useRef, useState } from "react";

/** True once the element has been scrolled into view. Latches on, so a section
 *  does not re-animate every time it crosses the viewport edge. */
export function useInView<T extends HTMLElement>(rootMargin = "-10% 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, rootMargin]);

  return { ref, seen };
}

export function prefersReducedMotion() {
  return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Yields 0..steps-1 once `active` is true, then holds on the last step.
 *
 *  ⚠ Off-by-one worth watching: useSequence(active, n) yields 0..n-1, so a
 *  five-stage pipeline needs `steps = 5` and the last stage resolves at i === 4.
 *  The sibling site shipped a bug twice where the final stage never resolved,
 *  so a mock claimed "deployed" while its last node still read as pending.
 *
 *  Under prefers-reduced-motion it jumps straight to the final step rather than
 *  animating quickly. A sped-up animation is still an animation, and the end
 *  state is the informative one. */
export function useSequence(active: boolean, steps: number, intervalMs = 820) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setI(steps - 1);
      return;
    }
    setI(0);
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      if (n >= steps - 1) clearInterval(t);
      setI(Math.min(n, steps - 1));
    }, intervalMs);
    return () => clearInterval(t);
  }, [active, steps, intervalMs]);

  return i;
}

/** Cycles 0..steps-1 forever while `active`. Used by the ambient signals in the
 *  hero, which have no end state to hold on. Reduced motion pins it to 0. */
export function useLoop(active: boolean, steps: number, intervalMs = 2400) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const t = setInterval(() => setI((n) => (n + 1) % steps), intervalMs);
    return () => clearInterval(t);
  }, [active, steps, intervalMs]);

  return i;
}

type Theme = "light" | "dark";

/** Theme with three states on disk: "light", "dark", or absent meaning follow
 *  the system. Deliberately small — a dependency for one attribute on <html>
 *  is not worth the bytes. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(localStorage.getItem("quantumilion-theme") as Theme | null);
  }, []);

  const resolved: Theme =
    theme ??
    (typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark");

  function toggle() {
    const next: Theme = resolved === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("quantumilion-theme", next);
    document.documentElement.dataset.theme = next;
  }

  return { resolved, toggle };
}

/** Locks body scroll while the mobile menu is open. Without this the page
 *  behind the overlay scrolls under the user's finger on iOS. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
