import { Github, Linkedin, Mail, FileText, LayoutGrid } from "lucide-react";
import { NAV, PROFILE } from "@/data/portfolio";
import { MaewCore } from "./MaewCore";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface Props {
  active: string;
  easterEggUnlocked: boolean;
  achievementVisible: boolean;
  onUnlockEasterEgg: () => void;
}

export function Sidebar({ active, easterEggUnlocked, achievementVisible, onUnlockEasterEgg }: Props) {
  const hasLinkedIn = PROFILE.linkedin.trim().length > 0;
  const hasHub = PROFILE.hub.trim().length > 0;
  const hasResume = PROFILE.resume.trim().length > 0;

  return (
    <aside
      aria-label="Kamolpop portfolio sidebar"
      className="editorial-rail hidden lg:flex lg:w-[260px] xl:w-[292px] lg:shrink-0 lg:self-start lg:flex-col lg:gap-y-10 lg:sticky lg:top-6 lg:py-8 lg:pr-4 select-none"
    >
      <div>
        <div className="flex items-center justify-between gap-4 w-full">
          <a href="#about" aria-label="Kamolpop monogram" className="brand-mark">
            <img src="/brand/kv-monogram.png" alt="Kamolpop monogram" className="h-full w-full" />
          </a>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-cat" />
            hi, i'm
          </div>
          <ThemeToggle />
        </div>
        <h1 className="mt-6 text-[25px] xl:text-[29px] font-bold tracking-tight text-foreground leading-tight whitespace-nowrap">
          {PROFILE.name}
        </h1>
        <p className="mt-1.5 text-base text-muted-foreground">
          aka <span className="text-foreground">"{PROFILE.nickname}"</span>
        </p>
        <p className="mt-4 max-w-[17rem] text-[14px] xl:text-[15px] font-semibold text-primary uppercase tracking-[0.18em] leading-relaxed">
          {PROFILE.role}
        </p>

        <nav className="mt-10" aria-label="Primary section navigation">
          <ul className="space-y-1.5">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "editorial-nav-link group flex items-center gap-3 py-2 font-mono text-[13px] md:text-sm uppercase tracking-[0.2em] transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-px transition-all rounded-full",
                        isActive ? "w-12 bg-primary" : "w-6 bg-border group-hover:w-10 group-hover:bg-foreground/40",
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

      <div className="space-y-4">
        <MaewCore
          active={active}
          allowEasterEgg
          easterEggUnlocked={easterEggUnlocked}
          achievementVisible={achievementVisible}
          onUnlock={onUnlockEasterEgg}
        />
        <div className="flex items-center gap-5 border-t border-border/80 pt-4 text-muted-foreground">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="link-cyan">
            <Github className="h-[22px] w-[22px] transition-transform hover:scale-105" />
          </a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="link-cyan">
            <Mail className="h-[22px] w-[22px] transition-transform hover:scale-105" />
          </a>
          {hasLinkedIn && (
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="link-cyan">
              <Linkedin className="h-[22px] w-[22px] transition-transform hover:scale-105" />
            </a>
          )}
          {hasHub && (
            <a href={PROFILE.hub} target="_blank" rel="noreferrer" aria-label="Website Hub" className="link-cyan">
              <LayoutGrid className="h-[22px] w-[22px] transition-transform hover:scale-105" />
            </a>
          )}
          {hasResume && (
            <a href={PROFILE.resume} aria-label="Resume" className="link-cyan">
              <FileText className="h-[22px] w-[22px] transition-transform hover:scale-105" />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
