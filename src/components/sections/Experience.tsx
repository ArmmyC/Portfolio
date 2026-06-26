import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-16 lg:py-24">
      <h2 className="section-label reveal mb-5">experience</h2>
      <div className="space-y-4">
        {EXPERIENCES.map((experience) => {
          const cardContent = (
            <>
              <div className="flex flex-wrap items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.18em] text-primary/80 transition group-hover:text-primary">
                    {experience.organization}
                    {experience.link && <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                  </div>
                  <h3 className="mt-1 text-[18px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[20px]">
                    {experience.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
                    {experience.summary}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 text-left md:items-end md:text-right">
                  <span className="rounded-full bg-cat/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/75">
                    {experience.status}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                    {experience.period}
                  </span>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </>
          );

          const key = `${experience.organization}-${experience.title}`;

          if (experience.link) {
            return (
              <a
                key={key}
                href={experience.link}
                target="_blank"
                rel="noreferrer"
                className="reveal soft-card group block p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_30px_-12px_hsl(180_50%_45%/0.25)] md:p-6"
              >
                {cardContent}
              </a>
            );
          }

          return (
            <article key={key} className="reveal soft-card group p-5 md:p-6">
              {cardContent}
            </article>
          );
        })}
      </div>
    </section>
  );
}
