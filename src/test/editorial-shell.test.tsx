import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
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
});
