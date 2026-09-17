import { PROFILE } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="editorial-section editorial-section--intro scroll-mt-24">
      <h2 className="section-heading section-heading--hero reveal mb-5">About</h2>

      <div className="reveal max-w-[72ch] space-y-5 text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
        <p className="about-lead">
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
      </div>
    </section>
  );
}
