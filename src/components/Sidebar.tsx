import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { NAV, PROFILE } from "@/data/portfolio";
import { MaewCore } from "./MaewCore";
import { cn } from "@/lib/utils";

interface Props {
  active: string;
}

export function Sidebar({ active }: Props) {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:justify-between lg:sticky lg:top-0 lg:h-screen lg:max-h-screen lg:w-[360px] lg:py-20 lg:pr-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-cat/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-cat" />
          hi, i'm
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
          {PROFILE.name}
        </h1>
        <p className="mt-1 text-lg text-muted-foreground">
          aka <span className="text-foreground">"{PROFILE.nickname}"</span> 🐾
        </p>
        <p className="mt-3 text-sm font-medium text-primary">{PROFILE.role}</p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {PROFILE.intro}
        </p>

        <nav className="mt-10" aria-label="Section navigation">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "group flex items-center gap-3 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
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
        <MaewCore active={active} />
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="link-cyan">
            <Github className="h-5 w-5" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="link-cyan">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="link-cyan">
            <Mail className="h-5 w-5" />
          </a>
          <a href={PROFILE.resume} aria-label="Resume" className="link-cyan">
            <FileText className="h-5 w-5" />
          </a>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          {PROFILE.location}
        </p>
      </div>
    </aside>
  );
}
