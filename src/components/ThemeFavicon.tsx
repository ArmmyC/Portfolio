import { useEffect } from "react";

export function ThemeFavicon() {
  useEffect(() => {
    document.querySelectorAll<HTMLLinkElement>("[data-theme-favicon]").forEach((link) => {
      const size = link.sizes.value === "16x16" ? "16" : "32";
      link.href = `/brand/kv-monogram-light-${size}.png?v=20260914kv`;
    });
  }, []);

  return null;
}
