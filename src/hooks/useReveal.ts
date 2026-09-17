import { useEffect } from "react";

const REVEAL_EXIT_DELAY_MS = 220;

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const exitTimers = new Map<HTMLElement, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const target = e.target as HTMLElement;

          if (e.isIntersecting) {
            const exitTimer = exitTimers.get(target);
            if (exitTimer !== undefined) {
              window.clearTimeout(exitTimer);
              exitTimers.delete(target);
            }
            target.classList.add("in");
            return;
          }

          if (!target.classList.contains("in") || exitTimers.has(target)) return;

          const exitTimer = window.setTimeout(() => {
            target.classList.remove("in");
            exitTimers.delete(target);
          }, REVEAL_EXIT_DELAY_MS);
          exitTimers.set(target, exitTimer);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-8% 0px -8% 0px",
      },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      exitTimers.forEach((timer) => window.clearTimeout(timer));
      exitTimers.clear();
      io.disconnect();
    };
  }, []);
}
