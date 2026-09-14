import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeFavicon() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const variant = resolvedTheme === "dark" ? "dark" : "light";

    document.querySelectorAll<HTMLLinkElement>("[data-theme-favicon]").forEach((link) => {
      const size = link.sizes.value === "16x16" ? "16" : "32";
      link.href = `/brand/kv-monogram-${variant}-${size}.png?v=20260914kv`;
    });
  }, [resolvedTheme]);

  return null;
}
