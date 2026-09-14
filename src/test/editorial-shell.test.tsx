import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Projects } from "@/components/sections/Projects";

describe("editorial portfolio shell", () => {
  it("exposes the monogram and primary section navigation from the sidebar", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <Sidebar
          active="about"
          easterEggUnlocked={false}
          achievementVisible={false}
          onUnlockEasterEgg={() => undefined}
        />
      </ThemeProvider>,
    );

    const monogram = screen.getByRole("img", { name: "Kamolpop monogram" });

    expect(monogram).toHaveAttribute("src", "/brand/kv-monogram-light.png");
    expect(screen.getByRole("navigation", { name: "Primary section navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to the dark monogram when the resolved theme is dark", async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Sidebar
          active="about"
          easterEggUnlocked={false}
          achievementVisible={false}
          onUnlockEasterEgg={() => undefined}
        />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "Kamolpop monogram" })).toHaveAttribute(
        "src",
        "/brand/kv-monogram-dark.png",
      );
    });
  });

  it("ships both PNG masters with transparent 1024px canvases", () => {
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    for (const variant of ["light", "dark"]) {
      const png = readFileSync(resolve(process.cwd(), `public/brand/kv-monogram-${variant}.png`));

      expect(png.subarray(0, 8).equals(signature)).toBe(true);
      expect(png.readUInt32BE(16)).toBe(1024);
      expect(png.readUInt32BE(20)).toBe(1024);
      expect(png[25]).toBe(6);
    }
  });

  it("keeps mobile navigation keyboard-dismissible and stateful", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <MobileNav active="about" />
      </ThemeProvider>,
    );

    const toggle = screen.getByRole("button", { name: "Open navigation menu" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-primary-navigation");

    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Primary section navigation" })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("loads project previews lazily with reserved dimensions", () => {
    render(<Projects />);

    const preview = screen.getByRole("img", { name: "Rally project preview" });

    expect(preview).toHaveAttribute("loading", "lazy");
    expect(preview).toHaveAttribute("decoding", "async");
    expect(preview).toHaveAttribute("width", "1898");
    expect(preview).toHaveAttribute("height", "860");
  });
});
