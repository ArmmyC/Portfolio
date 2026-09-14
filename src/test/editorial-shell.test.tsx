import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Sidebar } from "@/components/Sidebar";

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

    expect(monogram).toHaveAttribute("src", "/brand/kv-monogram.svg");
    expect(screen.getByRole("navigation", { name: "Primary section navigation" })).toBeInTheDocument();
  });

  it("keeps the kv mark as separate vector shapes with a broken k leg", () => {
    const logo = readFileSync(resolve(process.cwd(), "public/brand/kv-monogram.svg"), "utf8");

    expect(logo).toContain('id="k-stem"');
    expect(logo).toContain('id="k-upper"');
    expect(logo).toContain('id="k-lower"');
    expect(logo).toContain('id="v"');
    expect(logo).not.toContain("<text");
  });
});
