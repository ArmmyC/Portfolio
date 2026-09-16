import { CORE_EXPERTISE } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <h2 className="section-heading reveal mb-6">Core expertise</h2>
      <div className="max-w-3xl space-y-7">
        {CORE_EXPERTISE.map((group) => (
          <div
            key={group.title}
            className="reveal grid gap-2 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6"
          >
            <h3 className="text-[17px] font-semibold leading-7 text-foreground">
              {group.title}
            </h3>
            <p className="text-[16px] leading-7 text-muted-foreground">{group.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
