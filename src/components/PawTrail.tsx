import { useEffect, useRef, useState } from "react";
import {
  type PawPoint,
  shouldStampPawPrint,
  useCatEasterEggEligibility,
} from "@/hooks/useCatEasterEggEligibility";

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

interface PawTrailProps {
  enabled: boolean;
}

const MAX_PAW_PRINTS = 8;
const PAW_LIFETIME_MS = 650;

export function PawTrail({ enabled }: PawTrailProps) {
  const canRenderTrail = useCatEasterEggEligibility();
  const [prints, setPrints] = useState<PawPrint[]>([]);
  const lastPointRef = useRef<PawPoint | null>(null);
  const timeoutIdsRef = useRef<number[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    if (!enabled || !canRenderTrail) {
      setPrints([]);
      lastPointRef.current = null;
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const nextPoint = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
      };

      // Keep the trail sparse so it feels alive without turning into a particle effect.
      if (!shouldStampPawPrint(lastPointRef.current, nextPoint)) {
        return;
      }

      lastPointRef.current = nextPoint;

      const nextPrint: PawPrint = {
        id: nextIdRef.current++,
        x: event.clientX + 10,
        y: event.clientY + 12,
        rotation: Math.random() * 20 - 10,
        scale: 0.9 + Math.random() * 0.2,
      };

      setPrints((current) => [...current.slice(-(MAX_PAW_PRINTS - 1)), nextPrint]);

      const timeoutId = window.setTimeout(() => {
        setPrints((current) => current.filter((print) => print.id !== nextPrint.id));
        timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== timeoutId);
      }, PAW_LIFETIME_MS);

      timeoutIdsRef.current.push(timeoutId);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, [enabled, canRenderTrail]);

  if (!enabled || !canRenderTrail || prints.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-20 hidden lg:block" aria-hidden="true">
      {prints.map((print) => (
        <div
          key={print.id}
          className="paw-print"
          style={{
            ["--paw-x" as "--paw-x"]: `${print.x}px`,
            ["--paw-y" as "--paw-y"]: `${print.y}px`,
            ["--paw-rotation" as "--paw-rotation"]: `${print.rotation}deg`,
            ["--paw-scale" as "--paw-scale"]: `${print.scale}`,
          }}
        >
          <div className="paw-print__shape">
            <span className="paw-print__toe paw-print__toe--1" />
            <span className="paw-print__toe paw-print__toe--2" />
            <span className="paw-print__toe paw-print__toe--3" />
            <span className="paw-print__toe paw-print__toe--4" />
            <span className="paw-print__pad" />
          </div>
        </div>
      ))}
    </div>
  );
}
