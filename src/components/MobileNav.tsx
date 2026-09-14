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
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5">
        <a href="#about" className="flex min-w-0 items-center gap-3 leading-tight">
          <img
            src="/brand/kv-monogram.png"
            alt=""
            aria-hidden="true"
            className="brand-mark brand-mark--compact"
          />
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
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle navigation"
            className="rounded-full border border-border bg-card p-2 text-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Primary section navigation" className="border-t border-border/80 bg-background/95 px-5 py-3">
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
