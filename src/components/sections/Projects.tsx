import { ArrowUpRight } from "lucide-react";
import { PROFILE, PROJECTS } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 lg:py-24">
      <h2 className="section-label reveal mb-5">projects</h2>
      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href={p.link ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="reveal soft-card group relative block p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_30px_-12px_hsl(180_50%_45%/0.25)]"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[17px] md:text-[18px] font-semibold text-foreground transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              <span className="ml-auto rounded-full bg-cat/20 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-foreground/70">
                {p.status}
              </span>
            </div>

            <div className="mt-1 font-mono text-[12px] uppercase tracking-widest text-accent-foreground/70">
              {p.category}
            </div>

            <p className="mt-3 max-w-2xl text-[15px] md:text-[16px] leading-relaxed text-muted-foreground">
              {p.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <div className="reveal mt-6">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
        >
          More projects
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
