import type { Recognition } from "@/data/portfolio";

type Brand = { file: string; name: string; url?: string; full?: boolean; wide?: boolean; dark?: boolean };
const brands: Record<string, Brand> = {
  google: { file: "google.png", name: "Google", url: "https://www.google.com/", wide: true },
  amd: { file: "amd.svg", name: "AMD", url: "https://www.amd.com/", wide: true, dark: true },
  superai: { file: "super-ai-banner.png", name: "Super AI Engineer Season 6", full: true, wide: true },
  nstda: { file: "nstda-wordmark.png", name: "NSTDA", url: "https://www.nstda.or.th/", wide: true },
  acr: { file: "acr-crest.png", name: "Assumption College Rayong", full: true },
  deepmind: { file: "deepmind.png", name: "Google DeepMind", url: "https://deepmind.google/" },
  aiat: { file: "aiat-mark.webp", name: "AIAT", url: "https://aiat.or.th/", full: true },
  nectec: { file: "nectec-wordmark.png", name: "NECTEC", url: "https://www.nectec.or.th/", wide: true },
  makex: { file: "makex.png", name: "MakeX", url: "https://www.makex.cc/en" },
  huawei: { file: "huawei.svg", name: "Huawei", url: "https://www.huawei.com/" },
  asean: { file: "asean.png", name: "ASEAN Foundation", url: "https://aseanfoundation.org/learning-platforms/ai-ready-asean/" },
  code: { file: "code.svg", name: "Code.org", url: "https://code.org/" },
  lablab: { file: "lablab.png", name: "lablab.ai", url: "https://lablab.ai/" },
};

export function RecognitionLogo({ item, compact = false }: { item: Recognition; compact?: boolean }) {
  const keys = item.highlight === "Google DeepMind 1st Prize" ? ["google", "amd"]
    : item.title.includes("Super AI") ? ["aiat", "superai"]
    : item.title.includes("Benchmark") ? ["nectec", "nstda"]
    : item.title.includes("MakeX") ? ["makex"]
    : item.title.includes("Huawei") ? ["huawei"]
    : item.title.includes("ASEAN") ? ["asean"]
    : item.issuer === "Code.org" ? ["code"]
    : item.title.includes("AMD") ? ["amd"]
    : item.issuer === "Assumption College Rayong" ? ["acr"] : [];
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      {(compact ? keys.slice(0, 1) : keys).map((key) => {
        const brand = brands[key];
        const className = `inline-flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${compact ? "w-16" : brand.wide ? "w-28" : "w-12"} ${brand.dark ? "bg-neutral-950" : brand.full ? "" : "bg-white"}`;
        const img = <img src={`/brand/companies/${brand.file}`} alt={`${brand.name} ${key === "superai" ? "banner" : "logo"}`}
          width={brand.wide ? 112 : 48} height={48} loading="lazy" decoding="async"
          className={`h-full w-full object-contain ${brand.full ? "" : "p-1.5"}`} />;
        return brand.url ? <a key={key} href={brand.url} target="_blank" rel="noreferrer" aria-label={`Visit ${brand.name} website (opens in a new tab)`} className={className}>{img}</a>
          : <span key={key} className={className}>{img}</span>;
      })}
    </div>
  );
}
