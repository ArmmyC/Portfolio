import { SKILLS } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <h2 className="section-heading reveal mb-6">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((group) => (
          <div
            key={group.group}
            className="reveal editorial-card p-5 transition hover:border-primary/30"
          >
            <h3 className="font-mono text-[13px] uppercase tracking-[0.06em] text-foreground/75 font-medium">
              {group.group}
            </h3>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[14px] text-muted-foreground">
              {group.items.map((s) => (
                <span key={s} data-testid="skill-item" className="inline-flex items-center gap-2 font-mono transition-colors hover:text-foreground">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-foreground/35" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
