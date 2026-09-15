import { ArrowDown, Mail } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="editorial-section scroll-mt-24 py-16 lg:py-20">
      <div className="reveal mb-8 flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View selected work
          <ArrowDown aria-hidden="true" className="h-4 w-4" />
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:border-primary/45 hover:text-primary"
        >
          Get in touch
          <Mail aria-hidden="true" className="h-4 w-4" />
        </a>
        <span className="about-focus font-mono text-[12px] text-muted-foreground">
          Focus: AI · DevOps · Systems · Embedded
        </span>
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
