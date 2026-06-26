import { describe, expect, it } from "vitest";
import {
  isCatEasterEggEligible,
  shouldStampPawPrint,
} from "@/hooks/useCatEasterEggEligibility";

describe("cat easter egg helpers", () => {
  it("only enables the easter egg on desktop pointers without reduced motion", () => {
    expect(
      isCatEasterEggEligible({
        isDesktopPointer: true,
        prefersReducedMotion: false,
      }),
    ).toBe(true);

    expect(
      isCatEasterEggEligible({
        isDesktopPointer: false,
        prefersReducedMotion: false,
      }),
    ).toBe(false);

    expect(
      isCatEasterEggEligible({
        isDesktopPointer: true,
        prefersReducedMotion: true,
      }),
    ).toBe(false);
  });

  it("keeps the paw trail sparse", () => {
    expect(
      shouldStampPawPrint(null, {
        x: 10,
        y: 10,
        time: 0,
      }),
    ).toBe(true);

    expect(
      shouldStampPawPrint(
        {
          x: 10,
          y: 10,
          time: 100,
        },
        {
          x: 20,
          y: 20,
          time: 150,
        },
      ),
    ).toBe(false);

    expect(
      shouldStampPawPrint(
        {
          x: 10,
          y: 10,
          time: 100,
        },
        {
          x: 44,
          y: 44,
          time: 220,
        },
      ),
    ).toBe(true);
  });
});
