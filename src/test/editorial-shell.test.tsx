import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { MaewCore } from "@/components/MaewCore";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Recognition } from "@/components/sections/Recognition";
import { Skills } from "@/components/sections/Skills";
import { ThemeFavicon } from "@/components/ThemeFavicon";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    expect(screen.getByText("AI, DevOps, Systems & Embedded Engineer")).toHaveClass("tracking-[0.05em]");
  });

  it("keeps the sidebar social links free of a divider", () => {
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

    expect(screen.getByRole("link", { name: "GitHub" }).parentElement).not.toHaveClass("border-t");
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

  it("animates the dark theme knob with a stable transform", async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ThemeToggle />
      </ThemeProvider>,
    );

    const toggle = await screen.findByRole("button", { name: "Switch to light mode" });
    const knob = toggle.firstElementChild;

    expect(knob).toHaveClass("left-1", "translate-x-[38px]", "transition-transform");
    expect(knob).not.toHaveClass("right-1", "translate-x-[36px]");
  });

  it("uses a concise status when Maew is purring", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <MaewCore active="about" />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "MaewCore mascot: click to pet" }));

    expect(screen.getByText("Purring")).toBeInTheDocument();
  });

  it("uses concise status copy in dark mode", async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <MaewCore active="about" />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Dreaming")).toBeInTheDocument();
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

  it("keeps the fixed light logo free from a theme-colored halo", () => {
    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    const brandMarkStyles = styles.match(/\.brand-mark \{[\s\S]*?\n\s*\}/)?.[0] ?? "";

    expect(brandMarkStyles).toContain("bg-transparent");
    expect(brandMarkStyles).not.toContain("bg-primary");
  });

  it("keeps editorial sections free of top divider rules", () => {
    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    const sectionStyles = styles.match(/\.editorial-section \{[\s\S]*?\n\s*\}/)?.[0] ?? "";

    expect(sectionStyles).not.toContain("border-t");
  });

  it("describes the expanded DevOps and systems engineering practice", () => {
    render(<About />);

    expect(
      screen.getByText(
        /People often describe me as someone who is always learning\. I enjoy understanding how systems work from the ground up, from infrastructure and deployment to the AI layer\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /My work has grown from AI and embedded systems into DevOps and systems engineering\. I'm interested in building systems end to end, including how they are deployed, scaled, operated, and maintained\./i,
      ),
    ).toBeInTheDocument();
  });

  it("keeps the first fold focused on the introduction", () => {
    render(<About />);

    expect(screen.queryByRole("link", { name: "View selected work" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Get in touch" })).not.toBeInTheDocument();
    expect(screen.queryByText("Focus: AI · DevOps · Systems · Embedded", { exact: true })).not.toBeInTheDocument();
  });

  it("shows concise role badges for quick scanning", () => {
    render(<About />);

    for (const label of ["Open to internships", "AI engineer", "DevOps", "Systems engineer"]) {
      expect(screen.getByText(label, { exact: true })).toHaveClass("status-pill", "focus-badge");
    }
  });

  it("keeps experience entries concise and outcome-led", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const blendata = within(timeline).getByRole("link", { name: /Blendata/i });
    const siliconCraft = within(timeline).getByRole("link", { name: /Silicon Craft/i });

    expect(within(blendata).getByText("Operate Kubernetes and RKE2 environments.", { exact: true })).toBeInTheDocument();
    expect(
      within(siliconCraft).getByText(/Built a private engineering assistant that lets semiconductor teams search documents/i),
    ).toBeInTheDocument();
    expect(blendata.querySelectorAll("ul > li")).toHaveLength(3);
    expect(siliconCraft.querySelectorAll("ul > li")).toHaveLength(3);
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

  it("keeps the mobile Maew helper inside the navigation flow", () => {
    render(<MobileNav active="about" />);

    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const navigation = screen.getByRole("navigation", { name: "Primary section navigation" });
    const helper = within(navigation).getByTestId("mobile-maew");

    expect(helper).toBeInTheDocument();
    expect(helper).not.toHaveClass("fixed");
  });

  it("uses a shorter mobile role label without truncation", () => {
    render(<MobileNav active="about" />);

    expect(screen.getByText("AI, DevOps & Systems", { exact: true })).toBeInTheDocument();
  });

  it("loads project previews lazily with reserved dimensions", () => {
    render(<Projects />);

    const preview = screen.getByRole("img", { name: "Rally project preview" });

    expect(preview).toHaveAttribute("loading", "lazy");
    expect(preview).toHaveAttribute("decoding", "async");
    expect(preview).toHaveAttribute("width", "1898");
    expect(preview).toHaveAttribute("height", "860");
  });

  it("uses wide media cards for visual projects and compact cards for text-only projects", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const webpad = screen.getByRole("link", { name: /Freedomain \/ WebPad/i });
    const lanta = screen.getByRole("link", { name: /Lanta LLM Hosting/i });

    expect(rally).toHaveAttribute("data-project-layout", "media");
    expect(webpad).toHaveAttribute("data-project-layout", "media");
    expect(rally).toHaveClass("md:col-span-2");
    expect(webpad).toHaveClass("md:col-span-2");
    expect(lanta).toHaveAttribute("data-project-layout", "text");
    expect(lanta).not.toHaveClass("md:col-span-2");
  });

  it("labels external work links before opening a new tab", () => {
    render(<Projects />);

    expect(screen.getByRole("link", { name: /Rally/i })).toHaveAttribute("title", "Open Rally in a new tab");

    const { unmount } = render(<Experience />);
    expect(screen.getByRole("link", { name: /Blendata/i })).toHaveAttribute("title", "Open Blendata in a new tab");

    unmount();
  });

  it("gives visual project cards a framed preview and clearer metadata", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const preview = rally.querySelector('[data-project-preview="true"]');
    const content = rally.querySelector('[data-project-content="true"]');
    const status = within(rally).getByText("Live", { exact: true });

    expect(rally).toHaveClass("overflow-hidden", "border-border/80");
    expect(rally).toHaveClass("md:grid-cols-[minmax(15rem,0.82fr)_minmax(0,1.45fr)]");
    expect(preview).toHaveClass("aspect-[16/9]", "border-primary/20", "bg-secondary/80");
    expect(content).toHaveClass("min-w-0");
    expect(status).toHaveClass("status-pill--live", "gap-1.5");
    expect(status.querySelector('[data-status-dot="true"]')).toHaveClass("h-1.5", "w-1.5", "rounded-full");
  });

  it("keeps visual project previews aligned with the desktop card padding", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const preview = rally.querySelector('[data-project-preview="true"]');

    expect(rally).toHaveClass("md:items-stretch");
    expect(preview).toHaveClass("aspect-[16/9]", "md:aspect-auto", "md:h-full", "md:mb-0");
    expect(preview).not.toHaveClass("md:-my-4", "md:-ml-4");
  });

  it("uses a stronger project heading and plain technical metadata", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "Selected work", exact: true })).toHaveClass("section-heading");

    const rally = screen.getByRole("link", { name: /Rally/i });
    expect(rally.querySelectorAll('[data-project-tech="true"]')).toHaveLength(5);
    expect(rally.querySelectorAll(".editorial-tag")).toHaveLength(0);
    expect(within(rally).getByText("Opportunity Directory", { exact: true })).toHaveClass("project-category");
  });

  it("uses readable display headings for the supporting sections", () => {
    const sections = [
      [Experience, "Experience"],
      [Recognition, "Recognition"],
      [Skills, "Skills"],
      [Contact, "Contact"],
    ] as const;

    sections.forEach(([Section, heading]) => {
      const { unmount } = render(<Section />);

      expect(screen.getByRole("heading", { name: heading, exact: true })).toHaveClass("section-heading");

      unmount();
    });
  });

  it("keeps supporting metadata quiet instead of pill-heavy", () => {
    const { unmount } = render(<Skills />);

    expect(screen.getAllByTestId("skill-item").length).toBeGreaterThan(0);
    expect(document.querySelectorAll(".editorial-tag")).toHaveLength(0);

    unmount();
    render(<Recognition />);

    expect(screen.getAllByText("Award", { exact: true })[0]).not.toHaveClass("editorial-tag");
  });

  it("uses date ranges instead of status badges for experience entries", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const blendata = within(timeline).getByRole("link", { name: /Blendata/i });
    const isap = within(timeline).getByRole("link", { name: /Innosoft Student Associate Program/i });
    const siliconCraft = within(timeline).getByRole("link", { name: /Silicon Craft/i });

    expect(within(blendata).getByText("Aug 2026 - Current", { exact: true })).toBeInTheDocument();
    expect(within(isap).getByText("Aug 2026 - Current", { exact: true })).toBeInTheDocument();
    expect(within(siliconCraft).getByText("Jun 2026 - Jul 2026", { exact: true })).toBeInTheDocument();
    expect(timeline.querySelectorAll(".status-pill")).toHaveLength(0);
  });

  it("shows a visible point for each experience timeline entry", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const points = timeline.querySelectorAll('[data-timeline-point="true"]');

    expect(points).toHaveLength(4);
    expect(points[0]).toHaveClass("h-2.5", "w-2.5", "rounded-full", "border-2", "border-background");
  });

  it("groups Super AI levels into one final month-granularity entry with company marks", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });

    expect(timeline).toHaveClass("border-l-2");
    expect(timeline.querySelectorAll(":scope > li")).toHaveLength(4);
    expect(within(timeline).getByRole("heading", { name: /Digital IC Design Intern and AI Engineer/i })).toBeInTheDocument();
    expect(within(timeline).getByRole("heading", { name: /Super AI Engineer Season 6, Levels 1-3/i })).toBeInTheDocument();
    expect(within(timeline).queryByRole("heading", { name: /Level 2 Participant/i })).not.toBeInTheDocument();
    expect(within(timeline).queryByRole("heading", { name: /Level 1 Participant/i })).not.toBeInTheDocument();
    expect(within(timeline).queryByRole("heading", { name: /Level 3 Completer/i })).not.toBeInTheDocument();
    expect(within(timeline).getByText("Blendata")).toBeInTheDocument();
    expect(within(timeline).getByRole("heading", { name: "System Engineer" })).toBeInTheDocument();
    expect(within(timeline).getByText("Mar 2026 - Sep 2026")).toBeInTheDocument();
    expect(within(timeline).queryByText(/Apr 20, 2026|Jun 8, 2026/)).not.toBeInTheDocument();
    expect(within(timeline).getByRole("img", { name: "Blendata logo" })).toHaveAttribute(
      "src",
      "/brand/companies/blendata-mark.png",
    );
    expect(within(timeline).getByRole("img", { name: "Innosoft Student Associate Program logo" })).toHaveAttribute(
      "src",
      "/brand/companies/isap.png",
    );
    expect(within(timeline).getByRole("img", { name: "Silicon Craft logo" })).toHaveAttribute(
      "src",
      "/brand/companies/silicon-craft-mark.png",
    );
    expect(
      within(timeline).getByRole("img", { name: "Artificial Intelligence Association of Thailand logo" }),
    ).toHaveAttribute("src", "/brand/companies/aiat-mark.webp");
    expect(within(timeline).getByRole("img", { name: "Blendata logo" })).toHaveAttribute(
      "data-logo-surface",
      "contained",
    );
    expect(within(timeline).getByRole("img", { name: "Innosoft Student Associate Program logo" })).toHaveAttribute(
      "data-logo-surface",
      "contained",
    );
    expect(within(timeline).getByRole("img", { name: "Silicon Craft logo" })).toHaveAttribute(
      "data-logo-surface",
      "contained",
    );
    expect(
      within(timeline).getByRole("img", { name: "Artificial Intelligence Association of Thailand logo" }),
    ).toHaveAttribute("data-logo-surface", "full");
    expect(within(timeline).getByRole("img", { name: "Artificial Intelligence Association of Thailand logo" })).not.toHaveClass(
      "bg-white",
    );
    expect(within(timeline).getByRole("link", { name: /Blendata/i })).toHaveAttribute("href", "https://blendata.com/");
    expect(within(timeline).getByRole("link", { name: /Innosoft Student Associate Program/i })).toHaveAttribute(
      "href",
      "https://innosoft.kmutt.ac.th/",
    );
    expect(within(timeline).getByRole("link", { name: /Silicon Craft/i })).toHaveAttribute(
      "href",
      "https://www.sic.co.th/",
    );
    const siliconCraft = within(timeline).getByRole("link", { name: /Silicon Craft/i });
    expect(within(siliconCraft).getByText("Jun 2026 - Jul 2026", { exact: true })).toBeInTheDocument();
    expect(within(siliconCraft).queryByText("Completed", { exact: true })).not.toBeInTheDocument();
    expect(
      within(siliconCraft).getByText(/Built a private engineering assistant that lets semiconductor teams/i),
    ).toBeInTheDocument();
    expect(within(timeline).getByRole("link", { name: /Artificial Intelligence Association of Thailand/i })).toHaveAttribute(
      "href",
      "https://aiat.or.th/",
    );
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

    const themeToggle = screen.getByRole("button", { name: "Switch to dark mode" });
    const mascot = screen.getByRole("img", { name: /illustrated cat mascot/i });

    expect(screen.queryByText("hi, i'm")).not.toBeInTheDocument();
    expect(themeToggle).not.toHaveClass("shadow-[0_2px_8px_-3px_rgba(0,0,0,0.08)]");
    expect(mascot).not.toHaveClass("drop-shadow-[0_6px_18px_hsl(222_30%_18%/0.16)]");

    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    const inactiveNavRule = screen.getByRole("link", { name: /^experience$/i }).querySelector("span");

    expect(inactiveNavRule).toHaveClass("editorial-nav-rule");
    expect(styles).not.toContain("shadow-[");
    expect(styles).not.toContain("hsl(350");
    expect(styles).toContain("--cat: 221");
    expect(styles).toContain("--nav-rule");
    expect(styles).toContain("--status-live");
    expect(styles).toContain("--badge-dark");
    expect(styles).toContain("text-[13px]");
  });
});
