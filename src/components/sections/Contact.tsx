import { Github, Linkedin, FileText } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export function Contact() {
  const hasLinkedIn = PROFILE.linkedin.trim().length > 0;
  const hasResume = PROFILE.resume.trim().length > 0;
  const secondaryLink = "inline-flex min-h-11 items-center gap-2 text-[15px] text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

  return (
    <section id="contact" className="editorial-section editorial-section--close scroll-mt-24">
      <h2 className="section-heading reveal mb-6">Contact</h2>
      <div className="reveal max-w-3xl">
        <p className="contact-intro text-[16px] leading-7 text-muted-foreground md:text-[17px]">
          Have a project or opportunity in mind? Let's talk.
        </p>

          <a
            href={`mailto:${PROFILE.email}`}
            className="contact-email mt-3 inline-flex min-h-11 max-w-full items-center break-all text-[22px] font-semibold leading-snug tracking-tight text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-[28px]"
          >
            {PROFILE.email}
          </a>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className={secondaryLink}
            title="Open GitHub in a new tab"
          >
            <Github aria-hidden="true" className="h-4 w-4" /> GitHub
          </a>
          {hasLinkedIn && (
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className={secondaryLink}
              title="Open LinkedIn in a new tab"
            >
              <Linkedin aria-hidden="true" className="h-4 w-4" /> LinkedIn
            </a>
          )}
          {hasResume && (
            <a
              href={PROFILE.resume}
              className={secondaryLink}
            >
              <FileText aria-hidden="true" className="h-4 w-4" /> Resume
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
