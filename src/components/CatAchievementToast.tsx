import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface CatAchievementToastProps {
  visible: boolean;
}

export function CatAchievementToast({ visible }: CatAchievementToastProps) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-6 right-6 z-30 hidden w-[min(390px,calc(100vw-2rem))] transition-all duration-500 ease-out lg:block",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/95 shadow-[0_18px_48px_-22px_hsl(180_55%_35%/0.45)] backdrop-blur-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--cat)/0.18),transparent_45%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.18),transparent_55%)]" />

        <div className="relative flex items-start gap-3 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/15">
            <Award className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
              Achievement unlocked
            </p>
            <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground">
              Catputer Engineer
            </h3>
            <p className="mt-1 whitespace-nowrap text-[13px] text-muted-foreground">
              Soft paw trail enabled for desktop mode.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
