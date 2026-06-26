import { useTheme } from "next-themes";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full bg-secondary/50 animate-pulse shrink-0" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex h-9 w-[72px] shrink-0 items-center justify-between rounded-full border border-border bg-card/60 p-1 text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-card/90 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.08)] backdrop-blur-sm"
      aria-label="Toggle theme"
    >
      {/* Sliding Knob */}
      <div
        className={`absolute top-0.5 left-0.5 flex h-[28px] w-[28px] items-center justify-center rounded-full text-foreground shadow-[0_2px_5px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out ${
          isDark 
            ? "translate-x-[34px] rotate-[360deg] bg-primary text-primary-foreground" 
            : "translate-x-0 rotate-0 bg-cat text-cat-foreground"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Sun className="h-3.5 w-3.5 fill-current" />
        )}
      </div>

      {/* Track Icons */}
      <div className="flex w-full justify-between px-2.5 text-[10px] text-muted-foreground/60 select-none">
        <Sun className={`h-3 w-3 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`} />
        <Moon className={`h-3 w-3 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`} />
      </div>
    </button>
  );
}
