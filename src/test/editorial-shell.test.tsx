import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { vi } from "vitest";
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
import { RecognitionLogo } from "@/components/RecognitionLogo";
import { Skills } from "@/components/sections/Skills";
import { ThemeFavicon } from "@/components/ThemeFavicon";
import { ThemeToggle } from "@/components/ThemeToggle";
import Index from "@/pages/Index";
import { STATUS_TONE_CLASSES } from "@/lib/status";

describe("editorial portfolio shell", () => {
  it("keeps status tones mapped to concrete utility classes", () => {
    expect(STATUS_TONE_CLASSES).toEqual({
      live: { pill: "status-pill--live", marker: "status-marker--live", dot: "status-dot--live" },
      prototype: { pill: "status-pill--prototype", marker: "status-marker--prototype", dot: "status-dot--prototype" },
      ops: { pill: "status-pill--ops", marker: "status-marker--ops", dot: "status-dot--ops" },
      built: { pill: "status-pill--built", marker: "status-marker--built", dot: "status-dot--built" },
      neutral: { pill: "status-pill--neutral", marker: "status-marker--neutral", dot: "status-dot--neutral" },
    });
  });

  it("exposes the monogram, theme toggle, and primary section navigation from the sidebar", async () => {
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
    expect(await screen.findByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
    expect(screen.getByText("AI, DevOps, Systems & Embedded Engineer")).toHaveClass("tracking-[0.05em]");
  });

  it("gives sidebar social links touch-sized hit areas", () => {
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

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveClass(
      "inline-flex",
      "h-11",
      "w-11",
      "items-center",
      "justify-center",
    );
  });

  it("keeps the sidebar social row close to the Maew helper", () => {
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

    const github = screen.getByRole("link", { name: "GitHub" });

    expect(github.parentElement).toHaveClass("pt-3");
    expect(github.parentElement?.parentElement).toHaveClass("space-y-3");
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

  it("defaults the shell to dark and uses a warm sun knob in light mode", async () => {
    const appSource = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

    expect(appSource).toContain('defaultTheme="dark"');
    expect(appSource).not.toContain('forcedTheme="light"');

    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );

    const toggle = await screen.findByRole("button", { name: "Switch to dark mode" });

    expect(toggle.firstElementChild).toHaveClass("theme-toggle-knob--light");
    expect(styles).toContain("--theme-sun:");
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

  it("gives the opening section heading enough hierarchy to anchor the first fold", () => {
    render(<About />);

    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    const sectionHeadingStyles = styles.match(/\.section-heading \{[\s\S]*?\n\s*\}/)?.[0] ?? "";

    expect(screen.getByRole("heading", { name: "About", exact: true })).toHaveClass("section-heading");
    expect(sectionHeadingStyles).toContain("clamp(1.75rem, 2.2vw, 2rem)");
    expect(sectionHeadingStyles).toContain("font-weight: 650");
    expect(sectionHeadingStyles).toContain("letter-spacing: -0.035em");
  });

  it("keeps the first fold focused on the introduction", () => {
    render(<About />);

    expect(screen.queryByRole("link", { name: "View selected work" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Get in touch" })).not.toBeInTheDocument();
    expect(screen.queryByText("Focus: AI · DevOps · Systems · Embedded", { exact: true })).not.toBeInTheDocument();
  });

  it("keeps the introduction free of redundant role badges and closing asides", () => {
    render(<About />);

    for (const label of ["Open to internships", "AI engineer", "DevOps", "Systems engineer"]) {
      expect(screen.queryByText(label, { exact: true })).not.toBeInTheDocument();
    }

    expect(screen.queryByText(/Outside engineering, I'm probably debugging something/i)).not.toBeInTheDocument();
  });

  it("keeps experience entries concise and outcome-led", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const blendata = within(timeline).getByRole("heading", { name: "DevOps Engineer" }).closest("li");
    const siliconCraft = within(timeline)
      .getByRole("heading", { name: /Digital IC Design Intern and AI Engineer/i })
      .closest("li");

    expect(within(blendata!).getByText("Operate Kubernetes and RKE2 environments.", { exact: true })).toBeInTheDocument();
    expect(
      within(siliconCraft!).getByText(/Built a private engineering assistant that lets semiconductor teams search documents/i),
    ).toBeInTheDocument();
    expect(blendata?.querySelectorAll("ul > li")).toHaveLength(3);
    expect(siliconCraft?.querySelectorAll("ul > li")).toHaveLength(3);
  });

  it("highlights tools in experience entries for quick scanning", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const blendata = within(timeline).getByRole("heading", { name: "DevOps Engineer" }).closest("li");
    const aiat = within(timeline)
      .getByRole("heading", { name: /Super AI Engineer Season 6, Levels 1-3/i })
      .closest("li");
    const blendataStack = blendata?.querySelector('[data-experience-stack="true"]');
    const aiatStack = aiat?.querySelector('[data-experience-stack="true"]');

    expect(blendataStack).toHaveClass("stack-band");
    expect(within(blendata!).getByText("Kubernetes", { exact: true })).toHaveClass("stack-item");
    expect(within(blendata!).getByText("Argo CD", { exact: true })).toHaveClass("stack-item");
    expect(blendata?.querySelectorAll('[data-experience-tool="visible"]')).toHaveLength(6);
    expect(within(blendata!).getByText("Docker", { exact: true })).toHaveClass("stack-item");
    expect(within(blendata!).getByText("Prometheus", { exact: true })).toHaveClass("stack-item");
    expect(within(blendata!).getByText("Kubernetes", { exact: true })).not.toHaveClass("rounded-full", "border");
    expect(within(blendata!).queryByText("+3 more tools", { exact: true })).not.toBeInTheDocument();
    expect(within(blendata!).queryByText("Tools", { exact: true })).not.toBeInTheDocument();
    expect(blendata?.querySelector("details")).not.toBeInTheDocument();
    expect(aiatStack).toHaveClass("stack-band");
    for (const tool of ["Python", "vLLM", "DuckDB", "C++ (Arduino)", "FastAPI", "pgvector", "Google / Gemma API", "Slurm"]) {
      expect(within(aiat!).getByText(tool, { exact: true })).toHaveClass("stack-item");
    }
    expect(within(aiat!).queryByText("Focus", { exact: true })).not.toBeInTheDocument();
    expect(within(aiat!).queryByText("Edge AI", { exact: true })).not.toBeInTheDocument();
  });

  it("keeps experience links focused on company identity", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const blendataLink = within(timeline).getByRole("link", { name: /Blendata/i });

    expect(blendataLink).toHaveAttribute("title", "Visit Blendata website in a new tab");
    expect(blendataLink.querySelector("h3")).not.toBeInTheDocument();
    expect(blendataLink.querySelector("p")).not.toBeInTheDocument();
    expect(within(timeline).getByRole("heading", { name: "DevOps Engineer" })).toBeInTheDocument();
  });

  it("uses a consistent logo frame and stronger evidence hierarchy", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const blendata = within(timeline).getByRole("link", { name: /Blendata/i }).closest("li");

    expect(timeline.querySelectorAll('[data-logo-frame="true"]')).toHaveLength(4);
    expect(blendata?.querySelector("h3")).toHaveClass("experience-title");
    expect(blendata?.querySelector("ul")).toHaveClass("experience-evidence");
    expect(blendata?.querySelector("ul > li")).toHaveClass("experience-evidence--primary");
  });

  it("keeps mobile navigation keyboard-dismissible and stateful", async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <MobileNav active="about" />
      </ThemeProvider>,
    );

    const toggle = screen.getByRole("button", { name: "Open navigation menu" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-primary-navigation");
    expect(await screen.findByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();

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

  it("keeps the mobile brand link touch-sized", () => {
    render(<MobileNav active="about" />);

    expect(screen.getByRole("link", { name: /Kamolpop Vitayarat/i })).toHaveClass("min-h-11");
  });

  it("loads project previews lazily with reserved dimensions", () => {
    render(<Projects />);

    for (const name of ["Rally project preview", "Freedomain / WebPad project preview"]) {
      const preview = screen.getByRole("img", { name });

      expect(preview).toHaveAttribute("loading", "lazy");
      expect(preview).toHaveAttribute("decoding", "async");
      expect(preview).toHaveAttribute("width", "1600");
      expect(preview).toHaveAttribute("height", "900");
    }
  });

  it("uses wide media cards for visual projects and compact cards for text-only projects", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const webpad = screen.getByRole("link", { name: /Freedomain \/ WebPad/i });
    const lanta = screen.getByRole("link", { name: /Lanta LLM Hosting/i });

    expect(rally).toHaveAttribute("data-project-layout", "media");
    expect(webpad).toHaveAttribute("data-project-layout", "media");
    expect(rally.parentElement).toHaveClass("flex-col");
    expect(rally.querySelector('[data-project-preview="true"]')).toHaveClass("aspect-[16/9]");
    expect(within(webpad).getByText("Visit website")).toBeInTheDocument();
    expect(within(lanta).getByText("View repository")).toBeInTheDocument();
    expect(lanta).toHaveAttribute("data-project-layout", "text");
    expect(lanta).not.toHaveClass("md:col-span-2");
  });

  it("labels external work links before opening a new tab", () => {
    render(<Projects />);

    expect(screen.getByRole("link", { name: /Rally/i })).toHaveAttribute("title", "Open Rally in a new tab");

    const { unmount } = render(<Experience />);
    expect(screen.getByRole("link", { name: /Blendata/i })).toHaveAttribute(
      "title",
      "Visit Blendata website in a new tab",
    );

    unmount();
  });

  it("gives visual project cards a framed preview and clearer metadata", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const preview = rally.querySelector('[data-project-preview="true"]');
    const content = rally.querySelector('[data-project-content="true"]');
    const status = within(rally).getByText("Live", { exact: true });

    expect(rally).toHaveClass("overflow-hidden", "project-card");
    expect(rally).toHaveClass("block");
    expect(preview).toHaveClass("aspect-[16/9]", "border-border/60", "bg-secondary/80", "flex", "items-center", "justify-center");
    expect(preview?.querySelector("img")).toHaveClass("object-contain");
    expect(content).toHaveClass("min-w-0");
    expect(status).toHaveClass("status-pill--live", "gap-1.5");
    expect(status.querySelector('[data-status-dot="true"]')).toHaveClass("h-1.5", "w-1.5", "rounded-full");
  });

  it("keeps visual project previews aligned with the desktop card padding", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const preview = rally.querySelector('[data-project-preview="true"]');

    expect(rally).toHaveClass("p-4", "sm:p-5");
    expect(preview).toHaveClass("aspect-[16/9]", "mb-5");
    expect(preview).not.toHaveClass("md:aspect-auto", "md:h-full", "md:-my-4", "md:-ml-4");
  });

  it("uses a stronger project heading and plain technical metadata", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "Projects", exact: true })).toHaveClass("section-heading");

    const rally = screen.getByRole("link", { name: /Rally/i });
    expect(rally.querySelectorAll('[data-project-tech="true"]')).toHaveLength(5);
    expect(rally.querySelectorAll(".editorial-tag")).toHaveLength(0);
    expect(within(rally).getByText("Opportunity Directory", { exact: true })).toHaveClass("project-category");
  });

  it("labels project technology metadata as a visible stack", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const stack = rally.querySelector('[data-project-stack="true"]');

    expect(stack).toHaveClass("stack-band");
    expect(within(rally).queryByText("Stack", { exact: true })).not.toBeInTheDocument();
    expect(within(rally).getByText("Next.js", { exact: true })).toHaveClass("stack-item");

    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    const stackBandStyles = styles.match(/\.stack-band \{[\s\S]*?\n\s*\}/)?.[0] ?? "";

    expect(stackBandStyles).toContain("flex-wrap");
  });

  it("uses readable display headings for every portfolio section", () => {
    const sections = [
      [About, "About"],
      [Experience, "Experience"],
      [Recognition, "Recognition"],
      [Skills, "Core expertise"],
      [Contact, "Contact"],
    ] as const;

    sections.forEach(([Section, heading]) => {
      const { unmount } = render(<Section />);

      expect(screen.getByRole("heading", { name: heading, exact: true })).toHaveClass("section-heading");

      unmount();
    });
  });

  it("uses explicit sponsor metadata for recognition logos", () => {
    const item = {
      title: "First place",
      issuer: "Event partner",
      year: "2026",
      category: "Award",
      logoKeys: ["google", "amd"],
    } as Parameters<typeof RecognitionLogo>[0]["item"];

    render(<RecognitionLogo item={item} />);

    expect(screen.getByAltText("Google logo")).toBeInTheDocument();
    expect(screen.getByAltText("AMD logo")).toBeInTheDocument();
  });

  it("keeps the real recognition awards paired with their sponsor marks", () => {
    render(<Recognition />);

    const superAiRank = screen.getByText("1st place", { exact: true }).closest("li");
    const deepMindPrize = screen.getByText("Google DeepMind 1st Prize", { exact: true }).closest("li");

    expect(superAiRank?.querySelectorAll("img")).toHaveLength(2);
    expect(deepMindPrize?.querySelectorAll("img")).toHaveLength(2);
  });

  it("keeps supporting metadata quiet instead of pill-heavy", () => {
    const { unmount } = render(<Skills />);

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
    expect(screen.queryAllByTestId("skill-item")).toHaveLength(0);
    expect(document.querySelectorAll(".editorial-tag")).toHaveLength(0);

    unmount();
    render(<Recognition />);

    expect(screen.getAllByText("Award", { exact: true })[0]).not.toHaveClass("editorial-tag");
  });

  it("uses date ranges instead of status badges for experience entries", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const blendata = within(timeline).getByRole("heading", { name: "DevOps Engineer" }).closest("li");
    const isap = within(timeline).getByRole("heading", { name: "System Engineer" }).closest("li");
    const siliconCraft = within(timeline)
      .getByRole("heading", { name: /Digital IC Design Intern and AI Engineer/i })
      .closest("li");

    expect(within(blendata!).getByText("Aug 2026 - Current", { exact: true })).toBeInTheDocument();
    expect(within(isap!).getByText("Aug 2026 - Current", { exact: true })).toBeInTheDocument();
    expect(within(siliconCraft!).getByText("Jun 2026 - Jul 2026", { exact: true })).toBeInTheDocument();
    expect(timeline.querySelectorAll(".status-pill")).toHaveLength(0);
  });

  it("shows a visible point for each experience timeline entry", () => {
    render(<Experience />);

    const timeline = screen.getByRole("list", { name: "Career experience timeline" });
    const points = timeline.querySelectorAll('[data-timeline-point="true"]');
    const marker = points[0].parentElement?.firstElementChild;

    expect(points).toHaveLength(4);
    expect(points[0]).toHaveClass(
      "h-2.5",
      "w-2.5",
      "aspect-square",
      "rounded-full",
      "border-2",
      "border-background",
    );
    expect(points[0].parentElement).toHaveClass("-left-[33px]", "top-2.5", "aspect-square");
    expect(marker).toHaveClass("h-4", "w-4", "aspect-square", "rounded-full");
    expect(marker).not.toHaveClass("border-[3px]", "bg-background");
    expect(points[0]).toHaveClass("status-dot--live");
    expect(points[2]).toHaveClass("status-dot--built");
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
    const siliconCraft = within(timeline)
      .getByRole("heading", { name: /Digital IC Design Intern and AI Engineer/i })
      .closest("li");
    expect(within(siliconCraft!).getByText("Jun 2026 - Jul 2026", { exact: true })).toBeInTheDocument();
    expect(within(siliconCraft!).queryByText("Completed", { exact: true })).not.toBeInTheDocument();
    expect(
      within(siliconCraft!).getByText(/Built a private engineering assistant that lets semiconductor teams/i),
    ).toBeInTheDocument();
    expect(within(timeline).getByRole("link", { name: /Artificial Intelligence Association of Thailand/i })).toHaveAttribute(
      "href",
      "https://aiat.or.th/",
    );
    expect(within(timeline).getAllByText(/silver medal/i).length).toBeGreaterThan(0);
  });

  it("scrolls directly to a hash target after the page mounts", async () => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );

    const scrollIntoView = vi.fn();
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });
    window.history.replaceState({}, "", "/#experience");

    try {
      render(<Index />);

      await waitFor(() => {
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
      });
    } finally {
      window.history.replaceState({}, "", "/");
      if (originalScrollIntoView) {
        Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
          configurable: true,
          value: originalScrollIntoView,
        });
      } else {
        delete (HTMLElement.prototype as unknown as { scrollIntoView?: unknown }).scrollIntoView;
      }
    }
  });

  it("uses the live status treatment for Rally and WebPad", () => {
    render(<Projects />);

    const rally = screen.getByRole("link", { name: /Rally/i });
    const webpad = screen.getByRole("link", { name: /Freedomain \/ WebPad/i });

    expect(within(rally).getByText("Live")).toHaveClass("status-pill--live");
    expect(within(webpad).getByText("Live")).toHaveClass("status-pill--live");
  });

  it("keeps the footer quiet without a top divider", () => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );

    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <Index />
      </ThemeProvider>,
    );

    const footer = screen.getByText(/Built with React/).closest("footer");

    expect(footer).toHaveClass("editorial-footer");
    expect(footer).not.toHaveClass("border-t", "border-border/80");
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

    const mascot = screen.getByRole("img", { name: /illustrated cat mascot/i });

    expect(screen.queryByText("hi, i'm")).not.toBeInTheDocument();
    expect(mascot).not.toHaveClass("drop-shadow-[0_6px_18px_hsl(222_30%_18%/0.16)]");

    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    const inactiveNavRule = screen.getByRole("link", { name: /^experience$/i }).querySelector("span");

    expect(inactiveNavRule).toHaveClass("editorial-nav-rule");
    expect(styles).not.toContain("shadow-[");
    expect(styles).not.toContain("hsl(350");
    expect(styles).toContain("--cat: 221");
    expect(styles).toContain("--nav-rule");
    expect(styles).toContain("--status-live");
    expect(styles).toContain("--badge-cobalt");
    expect(styles).not.toContain("--badge-dark");
    expect(styles).toContain("text-[13px]");
  });

  it("uses a compact desktop composition without scaling mobile navigation", () => {
    render(<Index />);

    const frame = document.querySelector('[data-layout-frame="true"]');
    expect(frame).toHaveClass("portfolio-frame");
    expect(frame).toHaveAttribute("data-desktop-scale", "0.9");

    const styles = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    const desktopScaleStyles = styles.match(
      /@media \(min-width: 1024px\) \{[\s\S]*?\.portfolio-frame \{[\s\S]*?\n\s*\}/,
    )?.[0] ?? "";

    expect(desktopScaleStyles).toContain("zoom: 0.9");
    expect(styles).toContain("@media (max-width: 1023px)");
  });
});
