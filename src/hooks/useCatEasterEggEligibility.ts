import { useEffect, useState } from "react";

export const CAT_EASTER_EGG_CLICK_TARGET = 4;
export const PAW_TRAIL_MIN_DISTANCE = 28;
export const PAW_TRAIL_MIN_INTERVAL_MS = 85;

const DESKTOP_POINTER_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface EligibilityOptions {
  isDesktopPointer: boolean;
  prefersReducedMotion: boolean;
}

export interface PawPoint {
  x: number;
  y: number;
  time: number;
}

export function isCatEasterEggEligible({
  isDesktopPointer,
  prefersReducedMotion,
}: EligibilityOptions) {
  return isDesktopPointer && !prefersReducedMotion;
}

export function shouldStampPawPrint(previous: PawPoint | null, next: PawPoint) {
  if (!previous) {
    return true;
  }

  const distance = Math.hypot(next.x - previous.x, next.y - previous.y);
  const elapsed = next.time - previous.time;

  return distance >= PAW_TRAIL_MIN_DISTANCE && elapsed >= PAW_TRAIL_MIN_INTERVAL_MS;
}

export function useCatEasterEggEligibility() {
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const desktopPointerMedia = window.matchMedia(DESKTOP_POINTER_QUERY);
    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);

    const updateEligibility = () => {
      setEligible(
        isCatEasterEggEligible({
          isDesktopPointer: desktopPointerMedia.matches,
          prefersReducedMotion: reducedMotionMedia.matches,
        }),
      );
    };

    updateEligibility();
    desktopPointerMedia.addEventListener("change", updateEligibility);
    reducedMotionMedia.addEventListener("change", updateEligibility);

    return () => {
      desktopPointerMedia.removeEventListener("change", updateEligibility);
      reducedMotionMedia.removeEventListener("change", updateEligibility);
    };
  }, []);

  return eligible;
}
