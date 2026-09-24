import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-11 w-[80px] shrink-0 rounded-full bg-secondary/50 animate-pulse" aria-hidden="true" />
    );
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex min-h-11 w-[80px] shrink-0 items-center justify-between rounded-full border border-border bg-card/60 p-1 text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-primary/50 hover:bg-card/90"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={isDark}
      title={`Switch to ${nextTheme} mode`}
    >
      {/* Sliding Knob */}
      <div
        className={`absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-[transform,background-color,color] duration-300 ease-out ${
          isDark
            ? "translate-x-[38px] rotate-[360deg] bg-primary text-primary-foreground"
            : "translate-x-0 rotate-0 theme-toggle-knob--light"
        }`}
        aria-hidden="true"
      >
        {isDark ? (
          <Moon aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Sun aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
        )}
      </div>

      {/* Track Icons */}
      <div className="flex w-full justify-between px-2.5 text-[10px] text-muted-foreground/60 select-none">
        <Sun aria-hidden="true" className={`h-3 w-3 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`} />
        <Moon aria-hidden="true" className={`h-3 w-3 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`} />
      </div>
    </button>
  );
}
