import { useLayoutEffect, useRef } from "react";
import { Github, Linkedin, Mail, FileText, LayoutGrid } from "lucide-react";
import { NAV, PROFILE } from "@/data/portfolio";
import { MaewCore } from "./MaewCore";
import { ThemeToggle } from "./ThemeToggle";
import { BrandMark } from "./BrandMark";
import { cn } from "@/lib/utils";

interface Props {
  active: string;
  easterEggUnlocked: boolean;
  achievementVisible: boolean;
  onUnlockEasterEgg: () => void;
}

export function Sidebar({ active, easterEggUnlocked, achievementVisible, onUnlockEasterEgg }: Props) {
  const sidebarRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const height = sidebar.getBoundingClientRect().height;
      sidebar.style.setProperty("--rail-height", `${height}px`);
      const name = sidebar.querySelector<HTMLElement>(".portfolio-sidebar-name");
      const layout = sidebar.parentElement;
      if (!name || !layout) return;
      const nameOffset = name.getBoundingClientRect().top - sidebar.getBoundingClientRect().top;
      const minimumOffset = getComputedStyle(sidebar).getPropertyValue("--rail-offset").trim();
      layout.style.setProperty(
        "--intro-start",
        `calc(max(${minimumOffset}, (100dvh - ${height}px) / 2) + ${nameOffset}px)`,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(sidebar);
    return () => observer.disconnect();
  }, []);

  const hasLinkedIn = PROFILE.linkedin.trim().length > 0;
  const hasHub = PROFILE.hub.trim().length > 0;
  const hasResume = PROFILE.resume.trim().length > 0;

  return (
    <aside
      ref={sidebarRef}
      aria-label="Kamolpop portfolio sidebar"
      className="portfolio-sidebar editorial-rail hidden lg:flex lg:w-full lg:shrink-0 lg:self-start lg:flex-col lg:pr-4 select-none"
    >
      <div>
        <div className="flex w-full items-center justify-between gap-4">
          <a href="#about" aria-label="Kamolpop monogram" className="brand-mark">
            <BrandMark className="h-full w-full" />
          </a>
          <ThemeToggle />
        </div>
        <h1 className="portfolio-sidebar-name text-[26px] font-bold tracking-tight text-foreground leading-tight whitespace-nowrap xl:text-[30px]">
          {PROFILE.name}
        </h1>
        <p className="mt-1.5 text-[17px] text-muted-foreground">
          aka <span className="text-foreground">"{PROFILE.nickname}"</span>
        </p>
        <p className="mt-4 max-w-[17rem] text-[15px] font-semibold text-primary uppercase tracking-[0.05em] leading-relaxed xl:text-[16px]">
          {PROFILE.role}
        </p>

        <nav className="portfolio-sidebar-nav" aria-label="Primary section navigation">
          <ul className="portfolio-sidebar-nav-list">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "portfolio-sidebar-nav-link editorial-nav-link group flex items-center gap-3 font-mono text-[14px] uppercase tracking-[0.05em] transition-colors md:text-[15px]",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-px transition-all rounded-full",
                        isActive ? "w-12 bg-primary" : "w-6 editorial-nav-rule group-hover:w-10 group-hover:bg-foreground/40",
                      )}
                    />
                    <span>{item.label.replace("/", "")}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="portfolio-sidebar-social-group">
        <MaewCore
          active={active}
          allowEasterEgg
          easterEggUnlocked={easterEggUnlocked}
          achievementVisible={achievementVisible}
          onUnlock={onUnlockEasterEgg}
        />
        <div className="portfolio-sidebar-socials flex items-center gap-1.5 text-muted-foreground">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="link-cyan inline-flex h-11 w-11 items-center justify-center rounded-full"
          >
            <Github className="h-[22px] w-[22px] transition-transform hover:scale-105" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Email"
            title="Email"
            className="link-cyan inline-flex h-11 w-11 items-center justify-center rounded-full"
          >
            <Mail className="h-[22px] w-[22px] transition-transform hover:scale-105" />
          </a>
          {hasLinkedIn && (
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="link-cyan inline-flex h-11 w-11 items-center justify-center rounded-full"
            >
              <Linkedin className="h-[22px] w-[22px] transition-transform hover:scale-105" />
            </a>
          )}
          {hasHub && (
            <a
              href={PROFILE.hub}
              target="_blank"
              rel="noreferrer"
              aria-label="Website Hub"
              title="Website Hub"
              className="link-cyan inline-flex h-11 w-11 items-center justify-center rounded-full"
            >
              <LayoutGrid className="h-[22px] w-[22px] transition-transform hover:scale-105" />
            </a>
          )}
          {hasResume && (
            <a
              href={PROFILE.resume}
              aria-label="Resume"
              title="Resume"
              className="link-cyan inline-flex h-11 w-11 items-center justify-center rounded-full"
            >
              <FileText className="h-[22px] w-[22px] transition-transform hover:scale-105" />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
