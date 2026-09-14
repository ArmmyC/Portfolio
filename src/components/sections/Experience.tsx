import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";
import { getStatusTone } from "@/lib/status";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <h2 className="section-label reveal mb-5">experience</h2>

      <ol
        aria-label="Career experience timeline"
        className="relative space-y-8 border-l-2 border-dashed border-border pl-6 md:space-y-10"
      >
        {EXPERIENCES.map((experience) => {
          const tone = getStatusTone(experience.status);
          const content = (
            <div className="rounded-xl border border-transparent px-2 py-1 transition-colors group-hover:border-border/80 group-hover:bg-card/60 md:px-4 md:py-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <span className="font-mono text-[13px] text-primary md:text-[14px]">{experience.period}</span>
                <span className={cn("status-pill", `status-pill--${tone}`)}>{experience.status}</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <img
                  src={experience.logo.src}
                  alt={experience.logo.alt}
                  data-company-mark
                  width="36"
                  height="36"
                  loading="lazy"
                  decoding="async"
                  className="h-9 w-9 shrink-0 rounded-lg border border-primary/20 bg-white object-contain p-1"
                />
                <span className="inline-flex items-center gap-1 font-mono text-[13px] uppercase tracking-[0.06em] text-primary/85 transition-colors group-hover:text-primary md:text-[14px]">
                  {experience.organization}
                  {experience.link && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </span>
              </div>

              <h3 className="mt-1 text-[19px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[21px]">
                {experience.title}
              </h3>

              <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                {experience.summary}
              </p>

              <ul className="mt-4 space-y-2 text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          );

          return (
            <li key={experience.id} className="reveal relative">
              <span aria-hidden="true" className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center">
                <span className={cn("absolute h-4 w-4 rounded-full", `status-marker--${tone}`)} />
                <span className={cn("relative h-2 w-2 rounded-full", `status-dot--${tone}`)} />
              </span>

              {experience.link ? (
                <a href={experience.link} target="_blank" rel="noreferrer" className="group block">
                  {content}
                </a>
              ) : (
                <div className="group">{content}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
