import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import mascot from "@/assets/maew-mascot-v3.png";
import { CAT_STATUS } from "@/data/portfolio";
import {
  CAT_EASTER_EGG_CLICK_TARGET,
  useCatEasterEggEligibility,
} from "@/hooks/useCatEasterEggEligibility";
import { cn } from "@/lib/utils";

interface Props {
  active: string;
  compact?: boolean;
  allowEasterEgg?: boolean;
  easterEggUnlocked?: boolean;
  onUnlock?: () => void;
  achievementVisible?: boolean;
}

export function MaewCore({
  active,
  compact = false,
  allowEasterEgg = false,
  easterEggUnlocked = false,
  onUnlock,
  achievementVisible = false,
}: Props) {
  const [purring, setPurring] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isMotionSafeDesktop = useCatEasterEggEligibility();
  const canUnlockEasterEgg = allowEasterEgg && isMotionSafeDesktop;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  let status = "";
  if (achievementVisible) {
    status = "Unlocked";
  } else if (purring) {
    status = "Purring";
  } else if (easterEggUnlocked) {
    status = "Paw mode online";
  } else if (canUnlockEasterEgg && petCount > 0) {
    status = `${CAT_EASTER_EGG_CLICK_TARGET - petCount} more pets`;
  } else {
    const darkStatuses: Record<string, string> = {
      about: "Dreaming",
      projects: "Simulating",
      recognition: "Shining",
      skills: "Scanning",
      contact: "Available",
    };

    status = isDark ? (darkStatuses[active] ?? "Guarding") : (CAT_STATUS[active] ?? "Approved");
  }

  const handlePet = () => {
    setPurring((current) => !current);

    if (!canUnlockEasterEgg || easterEggUnlocked) {
      return;
    }

    setPetCount((current) => {
      const nextCount = current + 1;

      if (nextCount >= CAT_EASTER_EGG_CLICK_TARGET) {
        onUnlock?.();
        return 0;
      }

      return nextCount;
    });
  };

  return (
    <div
      className={cn(
        "relative flex items-center rounded-2xl border border-border bg-card/90",
        compact ? "gap-2.5 px-3 py-2" : "gap-3 px-3 py-2.5",
      )}
    >
      <button
        type="button"
        onClick={handlePet}
        className={cn(
          "group relative shrink-0 rounded-full bg-cat/15 ring-1 ring-cat/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
          compact ? "p-1.5" : "p-2",
          canUnlockEasterEgg && !easterEggUnlocked && "hover:-translate-y-0.5 hover:bg-cat/30",
          (!canUnlockEasterEgg || easterEggUnlocked) && "hover:bg-cat/25",
        )}
        aria-label="MaewCore mascot: click to pet"
      >
        <img
          src={mascot}
          alt="Illustrated cat mascot for Kamolpop Vitayarat's portfolio"
          width={compact ? 40 : 48}
          height={compact ? 40 : 48}
          loading="lazy"
          className={cn(
            "rounded-full object-cover transition duration-300 group-hover:scale-[1.08]",
            compact ? "h-10 w-10" : "h-12 w-12",
          )}
        />
      </button>

      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          maew . little helper
        </div>
        <div className="truncate text-[13px] font-medium text-foreground/90" aria-live="polite">
          {status}
        </div>
      </div>
    </div>
  );
}
