export type StatusTone = "live" | "prototype" | "ops" | "built" | "neutral";

export const STATUS_TONE_CLASSES: Record<
  StatusTone,
  { pill: string; marker: string; dot: string }
> = {
  live: {
    pill: "status-pill--live",
    marker: "status-marker--live",
    dot: "status-dot--live",
  },
  prototype: {
    pill: "status-pill--prototype",
    marker: "status-marker--prototype",
    dot: "status-dot--prototype",
  },
  ops: {
    pill: "status-pill--ops",
    marker: "status-marker--ops",
    dot: "status-dot--ops",
  },
  built: {
    pill: "status-pill--built",
    marker: "status-marker--built",
    dot: "status-dot--built",
  },
  neutral: {
    pill: "status-pill--neutral",
    marker: "status-marker--neutral",
    dot: "status-dot--neutral",
  },
};

export function getStatusTone(status: string): StatusTone {
  const normalized = status.trim().toLowerCase();

  if (normalized.includes("live") || normalized.includes("active") || normalized.includes("current")) return "live";
  if (normalized.includes("prototype")) return "prototype";
  if (normalized.includes("ops")) return "ops";
  if (normalized.includes("built") || normalized.includes("complete")) return "built";

  return "neutral";
}
