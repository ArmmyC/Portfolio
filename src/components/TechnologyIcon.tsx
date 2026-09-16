import { Cpu, Database, Network, Settings, ShieldCheck, Bot, Code2 } from "lucide-react";

const logos: Record<string, string> = {
  Kubernetes: "kubernetes", Jenkins: "jenkins", "Argo CD": "argocd",
  Docker: "docker", "Docker Compose": "docker", Grafana: "grafana", Prometheus: "prometheus",
  "Next.js": "nextjs", TypeScript: "typescript", React: "react",
  "Tailwind CSS": "tailwindcss", Tailwind: "tailwindcss", "Node.js": "nodejs",
  Python: "python", FastAPI: "fastapi", OpenCV: "opencv", Arduino: "arduino", C: "c",
};

export function TechnologyIcon({ name }: { name: string }) {
  const logo = logos[name];
  if (logo) {
    return <img src={`/brand/tools/${logo}.svg`} alt="" aria-hidden="true" width={22} height={22} className={`technology-icon${logo === "nextjs" ? " technology-icon--mono" : ""}`} loading="lazy" />;
  }
  const Icon = name === "RKE2" ? Settings
    : /backup|retrieval|Embeddings|GeoJSON/i.test(name) ? Database
    : /DNS|Networking|WebSocket|BLE/i.test(name) ? Network
    : /Fortinet|safety/i.test(name) ? ShieldCheck
    : /AI|ML|Agents|LLM|OpenWebUI/i.test(name) ? Bot
    : /Verilog|RISC|Vivado|Basys|Proxmox/i.test(name) ? Cpu : Code2;
  return <Icon aria-hidden="true" className="technology-icon text-primary" />;
}
