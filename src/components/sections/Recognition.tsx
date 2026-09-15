import { RECOGNITION } from "@/data/portfolio";

export function Recognition() {
  return (
    <section id="recognition" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <h2 className="section-heading reveal mb-6">Recognition</h2>
      <p className="reveal mb-6 max-w-[68ch] text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">A few credentials and moments along the way.</p>

      <ol className="relative space-y-6 border-l-2 border-dashed border-border pl-6">
        {RECOGNITION.map((r) => (
          <li key={r.title} className="reveal relative">
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center">
              <span className="absolute h-4 w-4 rounded-full bg-cat/30" />
              <span className="h-2 w-2 rounded-full bg-cat" />
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="font-mono text-[13px] text-muted-foreground">{r.year}</span>
              <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-muted-foreground/80">{r.category}</span>
            </div>
            <h3 className="mt-1 text-[17px] font-medium text-foreground md:text-[18px]">{r.title}</h3>
            <p className="text-[15px] text-muted-foreground md:text-[16px]">{r.issuer}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
