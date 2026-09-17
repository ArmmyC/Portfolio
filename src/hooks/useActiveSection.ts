import { useEffect, useState } from "react";

export function useActiveSection(ids: string[], rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState(ids[0] ?? "");
  const idKey = ids.join("|");

  useEffect(() => {
    const sectionIds = idKey.split("|").filter(Boolean);
    const validIds = new Set(sectionIds);
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (validIds.has(hash)) {
        setActive(hash);
      }
    };

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      observer.disconnect();
    };
  }, [idKey, rootMargin]);

  return active;
}
