import { ArrowUpRight } from "lucide-react";
import { TechnologyIcon } from "@/components/TechnologyIcon";
import { EXPERIENCES } from "@/data/portfolio";
import { getStatusTone, STATUS_TONE_CLASSES } from "@/lib/status";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="editorial-section editorial-section--dense scroll-mt-24">
      <h2 className="section-heading reveal mb-6">Experience</h2>

      <ol
        aria-label="Career experience timeline"
        className="experience-timeline relative border-l-2 border-dashed border-border pl-6"
      >
        {EXPERIENCES.map((experience) => {
          const tone = getStatusTone(experience.status);
          const statusClasses = STATUS_TONE_CLASSES[tone];

          return (
            <li key={experience.id} className="reveal relative">
              <span
                aria-hidden="true"
                className="absolute -left-[33px] top-2.5 flex aspect-square h-4 w-4 items-center justify-center"
              >
                <span className={cn("absolute aspect-square h-4 w-4 shrink-0 rounded-full", statusClasses.marker)} />
                <span
                  data-timeline-point="true"
                  className={cn(
                    "relative aspect-square h-2.5 w-2.5 shrink-0 rounded-full border-2 border-background",
                    statusClasses.dot,
                  )}
                />
              </span>

              <article className="max-w-[72ch] px-1 py-1 md:px-3 md:py-2">
                <p className="experience-period font-mono text-[13px] text-muted-foreground md:text-[14px]">
                  {experience.period}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    data-logo-frame="true"
                    className={cn(
                      "experience-logo-frame",
                      experience.logo.surface === "full" && "experience-logo-frame--full",
                    )}
                  >
                    <img
                      src={experience.logo.src}
                      alt={experience.logo.alt}
                      data-company-mark
                      data-logo-surface={experience.logo.surface}
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "experience-logo",
                        experience.logo.surface === "full" ? "object-cover" : "object-contain",
                      )}
                    />
                  </span>

                  {experience.link ? (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noreferrer"
                      title={"Visit " + experience.organization + " website in a new tab"}
                      className="group inline-flex min-h-9 max-w-full items-center gap-1 font-mono text-[13px] uppercase tracking-[0.05em] text-foreground/80 transition-colors hover:text-primary md:text-[14px]"
                    >
                      <span className="break-words text-left">{experience.organization}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <span className="inline-flex min-h-9 max-w-full items-center font-mono text-[13px] uppercase tracking-[0.05em] text-foreground/80 md:text-[14px]">
                      <span className="break-words text-left">{experience.organization}</span>
                    </span>
                  )}
                </div>

                <h3 className="experience-title mt-1 break-words text-[22px] font-semibold tracking-tight text-foreground md:text-[24px]">
                  {experience.title}
                </h3>

                <p className="experience-summary mt-2 max-w-[65ch] text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                  {experience.summary}
                </p>

                {experience.tools.length > 0 && <div
                  aria-label={experience.organization + " technologies"}
                  data-experience-stack="true"
                  className="stack-band mt-4"
                >
                  {experience.tools.map((tool) => (
                    <span key={tool} data-experience-tool="visible" className="stack-item">
                      <TechnologyIcon name={tool} />
                      {tool}
                    </span>
                  ))}
                </div>}

                <ul className="experience-evidence mt-4 space-y-2 text-[16px] leading-relaxed text-foreground/75 md:text-[17px]">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li
                      key={responsibility}
                      className={cn("flex gap-3", index === 0 && "experience-evidence--primary")}
                    >
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
