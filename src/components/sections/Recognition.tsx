import { RECOGNITION } from "@/data/portfolio";

export function Recognition() {
  return (
    <section id="recognition" className="scroll-mt-24 py-16 lg:py-24">
      <h2 className="section-label reveal mb-5">recognition</h2>
      <p className="reveal mb-6 text-sm text-muted-foreground">A few credentials and moments along the way.</p>

      <ol className="relative space-y-5 border-l-2 border-dashed border-border pl-6">
        {RECOGNITION.map((r) => (
          <li key={r.title} className="reveal relative">
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center">
              <span className="absolute h-4 w-4 rounded-full bg-cat/30" />
              <span className="h-2 w-2 rounded-full bg-cat" />
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="font-mono text-[11px] text-primary">{r.year}</span>
              <span className="tag">{r.category}</span>
            </div>
            <h3 className="mt-1 text-[14px] font-medium text-foreground">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.issuer}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
