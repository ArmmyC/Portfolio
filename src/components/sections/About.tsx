import { PROFILE } from "@/data/portfolio";

const ABOUT_CHIPS = [
  "Open to internships",
  "AI engineer",
  "Embedded systems",
  "Systems infrastructure",
];

export function About() {
  return (
    <section id="about" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <div className="reveal mb-6 flex max-w-3xl flex-wrap gap-2.5">
        {ABOUT_CHIPS.map((chip) => (
          <span
            key={chip}
            className="editorial-pill inline-flex items-center rounded-full border border-primary/20 bg-primary px-3.5 py-2 text-[12px] font-medium text-primary-foreground"
          >
            {chip}
          </span>
        ))}
      </div>

      <h2 className="section-label reveal mb-5">about</h2>

      <div className="space-y-5 text-[17px] leading-relaxed text-muted-foreground reveal md:text-[19px]">
        <p>
          I'm <span className="text-foreground font-medium">Arm</span>{" "}
          <span className="text-foreground/80">({PROFILE.thaiName})</span>, a Computer Engineering student at{" "}
          <span className="text-foreground font-medium">King Mongkut's University of Technology Thonburi (KMUTT)</span>.
          I like building at the intersection of AI, embedded systems, and practical engineering tools with a strong systems mindset.
        </p>
        <p>{PROFILE.intro}</p>
        <p>
          Lately I've been exploring <span className="text-primary font-medium">private AI infrastructure</span>,{" "}
          <span className="text-primary font-medium">edge devices</span>, and{" "}
          <span className="text-primary font-medium">robotics prototypes</span>, where software meets hardware.
        </p>
        <p className="text-[16px] italic text-muted-foreground/80 md:text-[17px]">
          Outside engineering, I'm probably debugging something, learning something, or being judged by a cat.
        </p>
      </div>
    </section>
  );
}
