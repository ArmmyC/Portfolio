import { ArrowUpRight } from "lucide-react";
import { TechnologyIcon } from "@/components/TechnologyIcon";
import { PROFILE, PROJECTS } from "@/data/portfolio";
import { getStatusTone, STATUS_TONE_CLASSES } from "@/lib/status";
import { cn } from "@/lib/utils";

const PROJECT_PREVIEW_WIDTH = 1600;
const PROJECT_PREVIEW_HEIGHT = 900;

export function Projects() {
  return (
    <section id="projects" className="editorial-section editorial-section--work scroll-mt-24">
      <h2 className="section-heading reveal mb-6">Projects</h2>
      <div className="flex max-w-3xl flex-col gap-6">
        {PROJECTS.map((p) => {
          const tone = getStatusTone(p.status);
          const statusClasses = STATUS_TONE_CLASSES[tone];

          return (
            <a
              key={p.title}
              href={p.link ?? "#"}
              target="_blank"
              rel="noreferrer"
              title={`Open ${p.title} in a new tab`}
              data-project-layout={p.image ? "media" : "text"}
              className={cn(
                "project-card reveal group relative block min-w-0 overflow-hidden border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                "p-4 sm:p-5",
              )}
            >
              {p.image && (
                <div
                  data-project-preview="true"
                  className="mb-5 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-md border border-border/60 bg-secondary/80"
                >
                  <img
                    src={p.image}
                    alt={`${p.title} project preview`}
                    width={PROJECT_PREVIEW_WIDTH}
                    height={PROJECT_PREVIEW_HEIGHT}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              {p.image ? (
                <div data-project-content="true" className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className={cn("status-pill gap-1.5", statusClasses.pill)}>
                      <span aria-hidden="true" data-status-dot="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.status}
                    </span>
                    <div className="project-category text-[14px] text-muted-foreground">
                      {p.category}
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-[22px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[25px]">
                      {p.title}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </div>

                  <p className="project-description mt-3 max-w-2xl text-[16px] leading-7 text-muted-foreground md:text-[17px]">
                    {p.description}
                  </p>

                  {p.tech.length > 0 && <div data-project-stack="true" className="stack-band mt-4">
                    {p.tech.map((t) => (
                      <span key={t} data-project-tech="true" className="stack-item">
                        <TechnologyIcon name={t} />
                        {t}
                      </span>
                    ))}
                  </div>}
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
                    <span className={cn("status-pill ml-auto gap-1.5", statusClasses.pill)}>
                      <span aria-hidden="true" data-status-dot="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.status}
                    </span>
                  </div>

                  <div className="project-category mt-2 text-[14px] text-muted-foreground">
                    {p.category}
                  </div>

                  <p className="project-description mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                    {p.description}
                  </p>

                  {p.tech.length > 0 && <div data-project-stack="true" className="stack-band mt-4">
                    {p.tech.map((t) => (
                      <span key={t} data-project-tech="true" className="stack-item">
                        <TechnologyIcon name={t} />
                        {t}
                      </span>
                    ))}
                  </div>}
                </>
              )}
              <span className="mt-3 inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-primary">
                {p.link?.includes("github.com") ? "View repository" : "Visit website"}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="reveal mt-6">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          title="Open GitHub in a new tab"
          className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          More projects
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
