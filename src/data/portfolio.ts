import rallyScreenshot from "@/assets/projects/rally-user.png";
import freedomainScreenshot from "@/assets/projects/freedomain-user.png";

export type NavItem = { id: string; label: string };

export const NAV: NavItem[] = [
  { id: "about", label: "/about" },
  { id: "experience", label: "/experience" },
  { id: "projects", label: "/projects" },
  { id: "recognition", label: "/recognition" },
  { id: "skills", label: "/skills" },
  { id: "contact", label: "/contact" },
];

export const PROFILE = {
  name: "Kamolpop Vitayarat",
  thaiName: "กมลภพ วิทยารัฐ",
  nickname: "Arm",
  role: "AI, DevOps, Systems & Embedded Engineer",
  shortRole: "AI, DevOps & Systems",
  intro:
    "My work has grown from AI and embedded systems into DevOps and systems engineering. I'm interested in building systems end to end, including how they are deployed, scaled, operated, and maintained.",
  location: "KMUTT, Bangkok, TH",
  email: "k.kamolpopv@gmail.com",
  github: "https://github.com/ArmmyC",
  linkedin: "https://www.linkedin.com/in/kamolpopvitayarat/",
  hub: "https://hub.kamolpop.dev",
  resume: "",
};

export type Experience = {
  id: string;
  organization: string;
  logo: { src: string; alt: string; surface: "contained" | "full" };
  link?: string;
  title: string;
  period: string;
  status: string;
  summary: string;
  tools: string[];
  toolsLabel?: string;
  responsibilities: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    id: "EXP-2026-004",
    organization: "Blendata",
    logo: { src: "/brand/companies/blendata-mark.png", alt: "Blendata logo", surface: "contained" },
    link: "https://blendata.com/",
    title: "DevOps Engineer",
    period: "Aug 2026 - Current",
    status: "Current",
    summary:
      "Interning as a DevOps Engineer across Kubernetes, delivery tooling, and observability.",
    tools: ["Kubernetes", "RKE2", "Jenkins", "Harbor", "Argo CD", "Helm", "Docker", "Grafana", "Prometheus"],
    responsibilities: [
      "Operate Kubernetes and RKE2 environments.",
      "Build delivery workflows with Jenkins, Harbor, Argo CD, Helm, and Docker.",
      "Deployed Grafana, Prometheus, Loki, Alloy, Node Exporter, and cAdvisor across company VMs.",
    ],
  },
  {
    id: "EXP-2026-005",
    organization: "Innosoft Student Associate Program",
    logo: { src: "/brand/companies/isap.png", alt: "Innosoft Student Associate Program logo", surface: "contained" },
    link: "https://innosoft.kmutt.ac.th/",
    title: "System Engineer",
    period: "Aug 2026 - Current",
    status: "Current",
    summary:
      "System Engineer in KMUTT's Innosoft program, working from infrastructure fundamentals to reliable backups and document systems.",
    tools: ["Networking", "Fortinet", "Proxmox", "Database backup", "Paperless"],
    toolsLabel: "Tools / systems",
    responsibilities: [
      "Worked with networking, backup design, Fortinet firewalls, and Proxmox virtualization.",
      "Designed a backup strategy for a production database with availability and consistency in mind.",
      "Designed a signed-PDF parser for the Paperless System.",
    ],
  },
  {
    id: "EXP-2026-001",
    organization: "Silicon Craft",
    logo: { src: "/brand/companies/silicon-craft-mark.png", alt: "Silicon Craft logo", surface: "contained" },
    link: "https://www.sic.co.th/",
    title: "Digital IC Design Intern and AI Engineer",
    period: "Jun 2026 - Jul 2026",
    status: "Completed",
    summary:
      "Built a private engineering assistant that lets semiconductor teams search documents, validate specs, and get cited answers.",
    tools: ["Embeddings", "Hybrid retrieval", "OpenWebUI", "LiteLLM", "Control Plane"],
    responsibilities: [
      "Ingested PDFs, datasheets, reports, and experiment files with metadata, embeddings, and hybrid retrieval.",
      "Connected grounded Q&A to OpenWebUI and the Control Plane, with LiteLLM as the model gateway.",
      "Added deterministic compliance checks and human review for extracted specifications.",
    ],
  },
  {
    id: "EXP-2026-006",
    organization: "Artificial Intelligence Association of Thailand",
    logo: {
      src: "/brand/companies/aiat-mark.webp",
      alt: "Artificial Intelligence Association of Thailand logo",
      surface: "full",
    },
    link: "https://aiat.or.th/",
    title: "Super AI Engineer Season 6, Levels 1-3",
    period: "Mar 2026 - Sep 2026",
    status: "Completed",
    summary:
      "Completed Super AI Engineer Season 6 across Levels 1-3, from AI foundations to edge AI and LLM safety.",
    tools: ["Applied ML", "Agents", "Edge AI", "AIoT", "LLM safety"],
    toolsLabel: "Focus areas",
    responsibilities: [
      "Moved from AI foundations into applied ML, agents, edge AI, AIoT, cybersecurity, and LLM safety.",
      "Placed 1st, 2nd, 6th, 20th, and 21st across individual hackathon tracks.",
      "Finished Level 3 with a silver medal.",
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  status: string;
  year?: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Rally",
    category: "Opportunity Directory",
    status: "Live",
    description:
      "A bilingual directory for discovering verified internships, hackathons, competitions, scholarships, and student programmes in Thailand.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js"],
    link: "https://rally.kamolpop.dev/",
    image: rallyScreenshot,
  },
  {
    title: "Freedomain / WebPad",
    category: "Web Infrastructure",
    status: "Live",
    description:
      "A self-service web namespace and DNS control plane for claiming memorable addresses and connecting them to hosted projects.",
    tech: ["Next.js", "TypeScript", "React", "DNS"],
    link: "https://freedomain.kamolpop.dev/",
    image: freedomainScreenshot,
  },
  {
    title: "Lanta LLM Hosting",
    category: "AI Infrastructure",
    status: "Built / Ops",
    description:
      "A private LLM hosting and operations stack serving Slurm-hosted vLLM models through SSH tunnels, a LiteLLM gateway, OpenWebUI, and Prometheus/Grafana monitoring.",
    tech: ["FastAPI", "vLLM", "LiteLLM", "Docker", "Grafana", "Slurm"],
    link: "https://github.com/ArmmyC/Lanta-LLM-Hosting",
  },
  {
    title: "YUEDMAI Smart Stretch Coach",
    category: "Computer Vision / Edge AI",
    status: "Prototype",
    description:
      "A local-first smart stretching kiosk prototype using camera pose tracking, web session UI, and Arduino wearable and hub firmware for guided stretch feedback.",
    tech: ["Python", "FastAPI", "OpenCV", "MediaPipe", "MoveNet", "Arduino", "BLE", "WebSocket"],
    link: "https://github.com/ArmmyC/Stretching",
  },
  {
    title: "HolySoC (RV32I Softcore)",
    category: "Computer Architecture / FPGA",
    status: "Built",
    description:
      "A custom 32-bit RISC-V RV32I single-cycle softcore CPU and System-on-Chip implemented in Verilog for FPGA, with memory-mapped I/O and UART firmware.",
    tech: ["Verilog", "RISC-V", "Vivado", "Basys 3", "C", "Assembly"],
    link: "https://github.com/ArmmyC/HolySoC",
  },
  {
    title: "Miti: Tourism Opportunity Map",
    category: "Geospatial / Data Viz",
    status: "Prototype",
    description:
      "A planning dashboard using MapLibre GL, weighted opportunity scoring, and Python data pipelines to visualize tourism expansion zones.",
    tech: ["Next.js", "TypeScript", "MapLibre GL", "Python", "Tailwind", "GeoJSON"],
    link: "https://github.com/ArmmyC/Miti",
  },
];

export type Recognition = {
  title: string;
  issuer: string;
  year: string;
  category: string;
  link?: string;
};

export const RECOGNITION: Recognition[] = [
  {
    title: "Super AI Engineer Season 6 Average 5 Domain Individual Rank 1",
    issuer: "Artificial Intelligence Association of Thailand",
    year: "2026",
    category: "Award",
  },
  {
    title: "AI Ready ASEAN Completion",
    issuer: "AI Ready ASEAN",
    year: "2026",
    category: "Certificate",
  },
  {
    title: "Huawei Cloud HCCDA-AI Developer Certification",
    issuer: "Huawei Cloud",
    year: "2026",
    category: "Certification",
  },
  {
    title: "Huawei Cloud HCCDA-Tech Essentials Developer Certification",
    issuer: "Huawei Cloud",
    year: "2026",
    category: "Certification",
  },
  {
    title: "Hour of Code Certificate of Completion",
    issuer: "Code.org",
    year: "2026",
    category: "Certificate",
  },
  {
    title: "MakeX Asian Intercontinental Tournament Energy Innovator Runner-up",
    issuer: "MakeX Robotics Competition Committee",
    year: "2023",
    category: "Award",
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "AI / ML",
    items: ["Python", "RAG", "Model Fine-tuning", "OpenCV", "MediaPipe", "LightGBM", "CatBoost", "Optuna"],
  },
  {
    group: "Systems / Infrastructure",
    items: ["Linux", "SSH", "Docker", "Slurm", "FastAPI", "vLLM", "LiteLLM", "Prometheus", "Grafana"],
  },
  {
    group: "Embedded / Digital Design",
    items: ["Verilog", "RISC-V RV32I", "FPGA", "Xilinx Vivado", "ESP32", "BLE", "UART", "Memory-mapped I/O"],
  },
  {
    group: "App / Data Tools",
    items: ["pandas", "NumPy", "scikit-learn", "Next.js", "TypeScript", "Tailwind CSS", "Git", "Java"],
  },
];

export const CAT_STATUS: Record<string, string> = {
  about: "Approved",
  experience: "Loaded",
  projects: "Ready",
  recognition: "Sorted",
  skills: "Loaded",
  contact: "Available",
};
