import { PROFILE } from "@/data/portfolio";

const ABOUT_CHIPS = [
  "Open to internships",
  "AI engineer",
  "Embedded systems",
  "Systems infrastructure",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 lg:py-24">
      <div className="reveal mb-6 flex max-w-3xl flex-wrap gap-2.5">
        {ABOUT_CHIPS.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center rounded-2xl border border-primary/20 bg-primary px-3.5 py-2 text-[12px] font-medium text-primary-foreground shadow-[0_8px_24px_-16px_hsl(180_50%_45%/0.55)]"
          >
            {chip}
          </span>
        ))}
      </div>

      <h2 className="section-label reveal mb-5">about</h2>

      <div className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground reveal">
        <p>
          I'm <span className="text-foreground font-medium">Arm</span>, a Computer Engineering student at{" "}
          <span className="text-foreground font-medium">King Mongkut's University of Technology Thonburi (KMUTT)</span>.
          I like building at the intersection of AI, embedded systems, and practical engineering tools with a strong systems mindset.
        </p>
        <p>{PROFILE.intro}</p>
        <p>
          Lately I've been exploring <span className="text-primary font-medium">private AI infrastructure</span>,{" "}
          <span className="text-primary font-medium">edge devices</span>, and{" "}
          <span className="text-primary font-medium">robotics prototypes</span>, where software meets hardware.
        </p>
        <p className="text-[15px] md:text-base italic text-muted-foreground/80">
          Outside engineering, I'm probably debugging something, learning something, or being judged by a cat.
        </p>
      </div>
    </section>
  );
}
