import { ArrowUpRight } from "lucide-react";
import { PROFILE, PROJECTS } from "@/data/portfolio";
import { getStatusTone } from "@/lib/status";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <h2 className="section-label reveal mb-5">projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => {
          const tone = getStatusTone(p.status);

          return (
            <a
              key={p.title}
              href={p.link ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="reveal editorial-card group relative block p-5 transition-colors hover:border-primary/40"
            >
              {p.image && (
                <div className="mb-4 overflow-hidden rounded-xl border border-border/70 bg-background/60">
                  <img
                    src={p.image}
                    alt={`${p.title} project preview`}
                    width={1898}
                    height={860}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 768px) 32rem, 100vw"
                    className="h-32 w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <h3 className="text-[18px] font-semibold text-foreground transition-colors group-hover:text-primary md:text-[19px]">
                  {p.title}
                </h3>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
                <span className={cn("status-pill ml-auto", `status-pill--${tone}`)}>{p.status}</span>
              </div>

              <div className="mt-1 font-mono text-[13px] uppercase tracking-[0.06em] text-accent-foreground/75">
                {p.category}
              </div>

              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="editorial-tag">{t}</span>
                ))}
              </div>
            </a>
          );
        })}
      </div>

      <div className="reveal mt-6">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[15px] font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
        >
          More projects
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
