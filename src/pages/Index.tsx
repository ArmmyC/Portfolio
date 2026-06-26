import { CatAchievementToast } from "@/components/CatAchievementToast";
import { useEffect, useState } from "react";
import { PawTrail } from "@/components/PawTrail";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { MaewCore } from "@/components/MaewCore";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Recognition } from "@/components/sections/Recognition";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { NAV, PROFILE } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  const active = useActiveSection(NAV.map((n) => n.id));
  const [catTrailUnlocked, setCatTrailUnlocked] = useState(false);
  const [showCatAchievement, setShowCatAchievement] = useState(false);
  useReveal();

  useEffect(() => {
    document.title = `${PROFILE.name} | ${PROFILE.role}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        `${PROFILE.name} (Arm) | Computer Engineering student at KMUTT focused on AI infrastructure, digital IC design, embedded systems, and RISC-V projects.`,
      );
    }
  }, []);

  useEffect(() => {
    const glowEl = document.getElementById("ambient-glow");
    if (!glowEl) return;

    const handleMouseMove = (event: MouseEvent) => {
      glowEl.style.background = `radial-gradient(circle 500px at ${event.clientX}px ${event.clientY}px, hsl(var(--primary) / 0.12), transparent 80%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!showCatAchievement) {
      return;
    }

    const timeoutId = window.setTimeout(() => setShowCatAchievement(false), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [showCatAchievement]);

  const handleUnlockEasterEgg = () => {
    setCatTrailUnlocked(true);
    setShowCatAchievement(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Interactive Ambient Mouse Glow */}
      <div
        id="ambient-glow"
        className="pointer-events-none fixed inset-0 z-0 hidden lg:block transition-opacity duration-300"
      />
      <PawTrail enabled={catTrailUnlocked} />
      <CatAchievementToast visible={showCatAchievement} />

      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-1.5 focus:text-primary-foreground">
        Skip to content
      </a>

      <MobileNav active={active} />

      <div className="mx-auto max-w-6xl px-5 lg:px-12 relative z-10">
        <div className="lg:flex lg:gap-12">
          <Sidebar
            active={active}
            easterEggUnlocked={catTrailUnlocked}
            achievementVisible={showCatAchievement}
            onUnlockEasterEgg={handleUnlockEasterEgg}
          />

          <main className="lg:flex-1 lg:py-20">
            <About />
            <Experience />
            <Projects />
            <Recognition />
            <Skills />
            <Contact />

            <footer className="border-t border-border pb-10 pt-8 text-[13px] text-muted-foreground">
              <p>
                Built with React, TypeScript and Tailwind | Designed and coded by {PROFILE.nickname}. <span className="text-cat">Cat approved.</span>
              </p>
            </footer>
          </main>
        </div>
      </div>

      {/* Floating mascot on mobile */}
      <div className="fixed bottom-4 right-4 z-30 max-w-[260px] lg:hidden">
        <MaewCore active={active} compact achievementVisible={false} />
      </div>
    </div>
  );
};

export default Index;
