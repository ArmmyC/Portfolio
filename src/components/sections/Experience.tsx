import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";
import { getStatusTone } from "@/lib/status";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <h2 className="section-heading reveal mb-6">Experience</h2>

      <ol
        aria-label="Career experience timeline"
        className="relative space-y-8 border-l-2 border-dashed border-border pl-6 md:space-y-10"
      >
        {EXPERIENCES.map((experience) => {
          const tone = getStatusTone(experience.status);
          const content = (
            <div className="max-w-[72ch] px-1 py-1 md:px-3 md:py-2">
              <div className="flex flex-wrap items-baseline">
                <span className="font-mono text-[13px] text-muted-foreground md:text-[14px]">{experience.period}</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <img
                  src={experience.logo.src}
                  alt={experience.logo.alt}
                  data-company-mark
                  data-logo-surface={experience.logo.surface}
                  width="36"
                  height="36"
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "h-9 w-9 shrink-0 rounded-lg",
                    experience.logo.surface === "full"
                      ? "object-cover"
                      : "border border-primary/20 bg-white object-contain p-1",
                  )}
                />
                <span className="inline-flex items-center gap-1 font-mono text-[13px] uppercase tracking-[0.05em] text-foreground/80 transition-colors group-hover:text-primary md:text-[14px]">
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

              <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                {experience.summary}
              </p>

              <div
                aria-label={`${experience.toolsLabel ?? "Tools"} for ${experience.organization}`}
                data-experience-stack="true"
                className="mt-4 flex flex-wrap items-center gap-2"
              >
                <span className="stack-label">{experience.toolsLabel ?? "Tools"}</span>
                {experience.tools.map((tool) => (
                  <span key={tool} className="stack-chip">
                    {tool}
                  </span>
                ))}
              </div>

              <ul className="mt-4 space-y-1.5 text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35" />
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
                <span
                  data-timeline-point="true"
                  className={cn(
                    "relative h-2.5 w-2.5 rounded-full border-2 border-background",
                    `status-dot--${tone}`,
                  )}
                />
              </span>

              {experience.link ? (
                <a
                  href={experience.link}
                  target="_blank"
                  rel="noreferrer"
                  title={`Open ${experience.organization} in a new tab`}
                  className="group block"
                >
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
