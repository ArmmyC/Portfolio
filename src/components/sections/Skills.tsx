import { SKILLS } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <h2 className="section-label reveal mb-5">skills</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((group) => (
          <div
            key={group.group}
            className="reveal editorial-card p-5 transition hover:border-primary/30"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/75 font-medium">
              {group.group}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((s) => (
                <span key={s} className="editorial-tag transition-colors hover:border-primary/40 hover:text-foreground">
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
