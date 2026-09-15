import { PROFILE } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <div aria-label="Availability and areas of practice" className="reveal mb-7 flex max-w-3xl flex-wrap gap-2">
        <span className="status-pill status-pill--live !tracking-[0.03em]">Open to internships</span>
        <span className="status-pill status-pill--built !tracking-[0.03em]">AI engineer</span>
        <span className="status-pill status-pill--built !tracking-[0.03em]">DevOps</span>
        <span className="status-pill status-pill--built !tracking-[0.03em]">Systems engineer</span>
      </div>

      <h2 className="section-label reveal mb-5">about</h2>

      <div className="reveal max-w-[72ch] space-y-5 text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
        <p>
          I'm <span className="text-foreground font-medium">Arm</span>{" "}
          <span className="text-foreground/80">({PROFILE.thaiName})</span>, a Computer Engineering student at{" "}
          <span className="text-foreground font-medium">King Mongkut's University of Technology Thonburi (KMUTT)</span>.
          People often describe me as someone who is always learning. I enjoy understanding how systems work from the ground up, from infrastructure and deployment to the AI layer.
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
