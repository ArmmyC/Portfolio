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
              data-project-layout={p.image ? "media" : "text"}
              className={cn(
                "reveal editorial-card group relative block overflow-hidden border-border/80 transition-colors duration-300 hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60",
                p.image
                  ? "p-3.5 md:col-span-2 md:grid md:grid-cols-[minmax(15rem,0.82fr)_minmax(0,1.45fr)] md:items-stretch md:gap-6 md:p-4"
                  : "p-5",
              )}
            >
              {p.image && (
                <div
                  data-project-preview="true"
                  className="mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-primary/20 bg-secondary/80 md:-my-4 md:-ml-4 md:aspect-auto md:rounded-l-none"
                >
                  <img
                    src={p.image}
                    alt={`${p.title} project preview`}
                    width={1898}
                    height={860}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 768px) 32rem, 100vw"
                    className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              {p.image ? (
                <div data-project-content="true" className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className={cn("status-pill gap-1.5", `status-pill--${tone}`)}>
                      <span aria-hidden="true" data-status-dot="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.status}
                    </span>
                    <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-primary/80">
                      {p.category}
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-[21px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[23px]">
                      {p.title}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </div>

                  <p className="mt-3 max-w-2xl text-[16px] leading-7 text-muted-foreground md:text-[17px]">
                    {p.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="editorial-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3 className="text-[18px] font-semibold text-foreground transition-colors group-hover:text-primary md:text-[19px]">
                      {p.title}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                    <span className={cn("status-pill ml-auto gap-1.5", `status-pill--${tone}`)}>
                      <span aria-hidden="true" data-status-dot="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.status}
                    </span>
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
                </>
              )}
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
