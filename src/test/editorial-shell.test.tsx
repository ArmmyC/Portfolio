import { render, screen, waitFor } from "@testing-library/react";
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

    expect(monogram).toHaveAttribute("src", "/brand/kv-monogram-light.png");
    expect(screen.getByRole("navigation", { name: "Primary section navigation" })).toBeInTheDocument();
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
});
