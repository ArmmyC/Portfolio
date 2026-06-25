import { useState } from "react";
import mascot from "@/assets/maew-mascot.png";
import { CAT_STATUS } from "@/data/portfolio";

interface Props {
  active: string;
  compact?: boolean;
}

export function MaewCore({ active, compact = false }: Props) {
  const [purring, setPurring] = useState(false);
  const status = purring ? "Currently purring." : CAT_STATUS[active] ?? "Cat approved.";

  return (
    <div
      className={
        "flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-3 py-2.5 shadow-[0_4px_20px_-12px_hsl(350_60%_60%/0.35)]" +
        (compact ? "" : "")
      }
    >
      <button
        type="button"
        onClick={() => setPurring((p) => !p)}
        className="group relative shrink-0 rounded-full bg-cat/30 p-1 ring-1 ring-cat/40 transition hover:bg-cat/50"
        aria-label="MaewCore mascot — click to pet"
      >
        <img
          src={mascot}
          alt="MaewCore mascot"
          width={36}
          height={36}
          loading="lazy"
          className="h-9 w-9 rounded-full object-contain transition group-hover:scale-110"
        />
      </button>
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          maew · little helper
        </div>
        <div className="truncate text-[13px] font-medium text-foreground/90">
          {status}
        </div>
      </div>
    </div>
  );
}
