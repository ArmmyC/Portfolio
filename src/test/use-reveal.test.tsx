import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReveal } from "@/hooks/useReveal";

function RevealProbe() {
  useReveal();
  return <div className="reveal" data-testid="reveal-probe" />;
}

describe("useReveal", () => {
  it("replays after a stable exit without flickering at the viewport edge", () => {
    vi.useFakeTimers();

    let intersectionCallback: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const unobserve = vi.fn();

    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }

      observe = observe;
      unobserve = unobserve;
      disconnect = vi.fn();
    }

    try {
      vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
      render(<RevealProbe />);

      const target = screen.getByTestId("reveal-probe");
      const observer = {} as IntersectionObserver;
      const emit = (isIntersecting: boolean) => {
        act(() => {
          intersectionCallback?.([
            { target, isIntersecting } as IntersectionObserverEntry,
          ], observer);
        });
      };

      emit(true);
      expect(target).toHaveClass("in");

      emit(false);
      expect(target).toHaveClass("in");

      emit(true);
      act(() => vi.advanceTimersByTime(500));
      expect(target).toHaveClass("in");

      emit(false);
      act(() => vi.advanceTimersByTime(500));
      expect(target).not.toHaveClass("in");

      emit(true);
      expect(target).toHaveClass("in");
      expect(unobserve).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});
