import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, PROFILE } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface Props {
  active: string;
}

export function MobileNav({ active }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between px-5 py-3">
        <a href="#about" className="flex flex-col leading-tight">
          <h1 className="text-base font-semibold text-foreground">
            {PROFILE.name} <span className="text-cat">🐾</span>
          </h1>
          <span className="text-xs text-muted-foreground">{PROFILE.role}</span>
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle navigation"
            className="rounded-full border border-border bg-card p-2 text-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background/95 px-5 py-3">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-2 font-mono text-[13px] uppercase tracking-[0.2em]",
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
