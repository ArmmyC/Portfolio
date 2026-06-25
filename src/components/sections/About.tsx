export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 lg:py-24">
      <h2 className="section-label reveal mb-5">about</h2>
      <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground reveal">
        <p>
          I'm <span className="text-foreground font-medium">Arm</span>, a Computer Engineering student at{" "}
          <span className="text-foreground font-medium">King Mongkut's University of Technology Thonburi (KMUTT)</span>.
          I like building at the intersection of AI, embedded systems, and practical engineering tools.
        </p>
        <p>
          Lately I've been exploring{" "}
          <span className="text-primary font-medium">private AI infrastructure</span>,{" "}
          <span className="text-primary font-medium">edge devices</span>, and{" "}
          <span className="text-primary font-medium">robotics prototypes</span> — projects where software meets hardware.
        </p>
        <p className="text-sm italic text-muted-foreground/80">
          Outside engineering, I'm probably debugging something, learning something, or being judged by a cat. 🐈
        </p>
      </div>
    </section>
  );
}
