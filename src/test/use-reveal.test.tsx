import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReveal } from "@/hooks/useReveal";

function RevealProbe() {
  useReveal();
  return <div className="reveal" data-testid="reveal-probe" />;
}

describe("useReveal", () => {
  it("keeps an element revealed after it leaves the viewport", () => {
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

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    render(<RevealProbe />);

    const target = screen.getByTestId("reveal-probe");
    const observer = {} as IntersectionObserver;

    act(() => {
      intersectionCallback?.([
        { target, isIntersecting: true } as IntersectionObserverEntry,
      ], observer);
    });

    expect(target).toHaveClass("in");
    expect(unobserve).toHaveBeenCalledWith(target);

    act(() => {
      intersectionCallback?.([
        { target, isIntersecting: false } as IntersectionObserverEntry,
      ], observer);
    });

    expect(target).toHaveClass("in");
  });
});
