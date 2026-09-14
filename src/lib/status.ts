export type StatusTone = "live" | "prototype" | "ops" | "built" | "neutral";

export function getStatusTone(status: string): StatusTone {
  const normalized = status.trim().toLowerCase();

  if (normalized.includes("live") || normalized.includes("active") || normalized.includes("current")) return "live";
  if (normalized.includes("prototype")) return "prototype";
  if (normalized.includes("ops")) return "ops";
  if (normalized.includes("built") || normalized.includes("complete")) return "built";

  return "neutral";
}
