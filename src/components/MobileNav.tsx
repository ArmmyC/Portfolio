import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, PROFILE } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { BrandMark } from "./BrandMark";
import { cn } from "@/lib/utils";

interface Props {
  active: string;
}

export function MobileNav({ active }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-xl lg:hidden">
      <div className="mobile-nav-bar flex min-h-[4.25rem] items-center justify-between gap-4 px-5 pb-3.5">
        <a href="#about" className="flex min-w-0 items-center gap-3 leading-tight">
          <BrandMark alt="" aria-hidden="true" className="brand-mark brand-mark--compact" />
          <span className="min-w-0">
            <h1 className="truncate text-base font-semibold text-foreground">
              {PROFILE.name}
            </h1>
            <span className="block truncate text-xs text-muted-foreground">{PROFILE.role}</span>
          </span>
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-primary-navigation"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-card p-2.5 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {open ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-primary-navigation" aria-label="Primary section navigation" className="border-t border-border/80 bg-background/95 px-5 py-3">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center py-2 font-mono text-[13px] uppercase tracking-[0.2em]",
                    active === item.id ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label.replace("/", "")}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
