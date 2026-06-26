import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          } else {
            e.target.classList.remove("in");
          }
        });
      },
      { 
        threshold: 0.02, 
        rootMargin: "-4% 0px -4% 0px" 
      },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
