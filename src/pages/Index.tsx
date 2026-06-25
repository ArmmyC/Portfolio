import { useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { MaewCore } from "@/components/MaewCore";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Recognition } from "@/components/sections/Recognition";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { NAV, PROFILE } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  const active = useActiveSection(NAV.map((n) => n.id));
  useReveal();

  useEffect(() => {
    document.title = `${PROFILE.name} — ${PROFILE.role}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", `${PROFILE.name} (Arm) — Computer Engineering student at KMUTT. AI, embedded systems, edge AI, RISC-V, and systems engineering portfolio.`);
  }, []);

  return (
    <div className="min-h-screen">
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-1.5 focus:text-primary-foreground">
        Skip to content
      </a>

      <MobileNav active={active} />

      <div className="mx-auto max-w-6xl px-5 lg:px-12">
        <div className="lg:flex lg:gap-12">
          <Sidebar active={active} />

          <main className="lg:flex-1 lg:py-20">
            <About />
            <Projects />
            <Recognition />
            <Skills />
            <Contact />

            <footer className="border-t border-border pb-10 pt-8 text-xs text-muted-foreground">
              <p>
                Built with React, TypeScript &amp; Tailwind — designed &amp; coded by {PROFILE.nickname}. <span className="text-cat">🐾</span>
              </p>
            </footer>
          </main>
        </div>
      </div>

      {/* Floating mascot on mobile */}
      <div className="fixed bottom-4 right-4 z-30 max-w-[260px] lg:hidden">
        <MaewCore active={active} compact />
      </div>
    </div>
  );
};

export default Index;
