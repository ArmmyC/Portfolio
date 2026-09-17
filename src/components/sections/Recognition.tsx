import { RECOGNITION } from "@/data/portfolio";
import { RecognitionLogo } from "@/components/RecognitionLogo";

export function Recognition() {
  const awards = RECOGNITION.filter((item) => item.category === "Award");
  const credentials = RECOGNITION.filter((item) => item.category !== "Award");
  return (
    <section id="recognition" className="editorial-section editorial-section--dense scroll-mt-24">
      <h2 className="section-heading reveal mb-6">Recognition</h2>
      <div className="max-w-3xl">
        <h3 className="reveal mb-4 text-[18px] font-semibold">Awards</h3>
        <ul aria-label="Awards" className="recognition-awards grid gap-3 sm:grid-cols-2">
          {awards.map((award) => (
            <li key={award.title} className="recognition-award-card reveal min-w-0 border p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3 text-[13px] text-muted-foreground">
                <RecognitionLogo item={award} />
                <div className="text-right"><span>Award</span><p>{award.year}</p></div>
              </div>
              <p className="recognition-award-highlight font-semibold leading-tight text-primary">{award.highlight}</p>
              <h4 className="mt-2 text-[16px] font-medium leading-relaxed">{award.title}</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{award.issuer}</p>
              {award.detail && <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{award.detail}</p>}
            </li>
          ))}
        </ul>
        <h3 className="reveal mb-2 mt-9 text-[18px] font-semibold">Credentials & leadership</h3>
        <ul aria-label="Credentials and leadership" className="space-y-1">
          {credentials.map((credential) => (
            <li key={credential.title} className="reveal grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 py-4 sm:gap-x-4">
              <RecognitionLogo item={credential} compact />
              <div className="min-w-0">
                <h4 className="text-[16px] font-medium leading-relaxed">{credential.title}</h4>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{credential.issuer}</p>
                {credential.detail && <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{credential.detail}</p>}
              </div>
              <span className="pt-1 text-[13px] tabular-nums text-muted-foreground">{credential.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
