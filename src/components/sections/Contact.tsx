import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export function Contact() {
  const hasLinkedIn = PROFILE.linkedin.trim().length > 0;
  const hasResume = PROFILE.resume.trim().length > 0;

  return (
    <section id="contact" className="scroll-mt-24 py-16 lg:py-24">
      <h2 className="section-label reveal mb-5">contact</h2>
      <div className="reveal soft-card p-6">
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          Open to internships, collaborations, and engineering projects across{" "}
          <span className="text-foreground font-medium">AI</span>,{" "}
          <span className="text-foreground font-medium">embedded systems</span>, and{" "}
          <span className="text-foreground font-medium">systems infrastructure</span>.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[15px] md:text-base font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Mail className="h-4 w-4" /> Say hi
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[15px] md:text-base font-medium text-foreground transition hover:border-primary/40"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          {hasLinkedIn && (
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[15px] md:text-base font-medium text-foreground transition hover:border-primary/40"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          )}
          {hasResume && (
            <a
              href={PROFILE.resume}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[15px] md:text-base font-medium text-foreground transition hover:border-primary/40"
            >
              <FileText className="h-4 w-4" /> Resume
            </a>
          )}
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cat/20 px-3.5 py-1.5 text-[13px] text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-cat" /> currently open to opportunities
        </div>
      </div>
    </section>
  );
}
