import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { ThemeFavicon } from "@/components/ThemeFavicon";

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

  it("keeps the light monogram when the resolved theme is dark", async () => {
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
        "/brand/kv-monogram-light.png",
      );
    });
  });

  it("keeps the light favicon assets when the resolved theme is dark", async () => {
    const links = ["16x16", "32x32"].map((size) => {
      const link = document.createElement("link");
      link.dataset.themeFavicon = "true";
      link.setAttribute("sizes", size);
      Object.defineProperty(link, "sizes", { value: { value: size } });
      document.head.appendChild(link);
      return link;
    });

    try {
      render(
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ThemeFavicon />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(links.every((link) => link.href.includes("/brand/kv-monogram-light-"))).toBe(true);
      });
    } finally {
      links.forEach((link) => link.remove());
    }
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

  it("renders all CareerDatabase experiences as a readable timeline", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });

    expect(timeline).toHaveClass("border-l-2");
    expect(timeline.querySelectorAll(":scope > li")).toHaveLength(6);
    expect(within(timeline).getByRole("heading", { name: /Digital IC Design Intern and AI Engineer/i })).toBeInTheDocument();
    expect(within(timeline).getByRole("heading", { name: /Super AI Engineer Season 6 Level 2 Participant/i })).toBeInTheDocument();
    expect(within(timeline).getByRole("heading", { name: /Super AI Engineer Season 6 Level 1 Participant/i })).toBeInTheDocument();
    expect(within(timeline).getByText("Blendata")).toBeInTheDocument();
    expect(within(timeline).getByRole("heading", { name: "System Engineer" })).toBeInTheDocument();
    expect(within(timeline).getByRole("heading", { name: /Super AI Engineer Level 3 Completer/i })).toBeInTheDocument();
    expect(within(timeline).getAllByText(/silver medal/i).length).toBeGreaterThan(0);
  });

  it("uses the live status treatment for Rally and WebPad", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const webpad = screen.getByRole("link", { name: /Freedomain \/ WebPad/i });

    expect(within(rally).getByText("Live")).toHaveClass("status-pill--live");
    expect(within(webpad).getByText("Live")).toHaveClass("status-pill--live");
  });

  it("keeps the shell flat, cobalt-led, and readable", () => {
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

    const intro = screen.getByText("hi, i'm");
    const introBadge = intro.closest("div.inline-flex");
    const themeToggle = screen.getByRole("button", { name: "Switch to dark mode" });
    const mascot = screen.getByRole("img", { name: /illustrated cat mascot/i });

    expect(introBadge).toHaveClass("bg-primary/10", "tracking-[0.08em]");
    expect(introBadge?.querySelector("span")).toHaveClass("bg-primary");
    expect(themeToggle).not.toHaveClass("shadow-[0_2px_8px_-3px_rgba(0,0,0,0.08)]");
    expect(mascot).not.toHaveClass("drop-shadow-[0_6px_18px_hsl(222_30%_18%/0.16)]");

    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    expect(styles).not.toContain("shadow-[");
    expect(styles).not.toContain("hsl(350");
    expect(styles).toContain("--cat: 221");
    expect(styles).toContain("--status-live");
    expect(styles).toContain("text-[13px]");
  });
});
