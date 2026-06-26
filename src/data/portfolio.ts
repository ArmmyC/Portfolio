export type NavItem = { id: string; label: string };

export const NAV: NavItem[] = [
  { id: "about", label: "/about" },
  { id: "projects", label: "/projects" },
  { id: "recognition", label: "/recognition" },
  { id: "skills", label: "/skills" },
  { id: "contact", label: "/contact" },
];

export const PROFILE = {
  name: "Kamolpop Vitayarat",
  nickname: "Arm",
  role: "AI & Embedded Systems Engineer",
  intro:
    "I build systems across AI, embedded software, and computer engineering: from private LLM infrastructure to edge AI and RISC-V experiments.",
  location: "KMUTT · Bangkok, TH",
  email: "arm@example.com",
  github: "https://github.com/ArmmyC",
  linkedin: "#",
  resume: "#",
};

export type Project = {
  title: string;
  category: string;
  status: string;
  year?: string;
  description: string;
  tech: string[];
  link?: string;
};

export const PROJECTS: Project[] = [
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
      "A local-first smart stretching kiosk prototype using camera pose tracking, web session UI, and Arduino wearable/hub firmware for guided stretch feedback.",
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
    title: "Huawei Cloud HCCDA-AI Developer Certification",
    issuer: "Huawei",
    year: "2026",
    category: "Certification",
  },
  {
    title: "TPQI Huawei Professional Qualification: Cloud Developer Level 5",
    issuer: "TPQI × Huawei",
    year: "2026",
    category: "Certification",
  },
  {
    title: "Super AI Engineer Season 6: Foundation & Hackathon",
    issuer: "AIAT",
    year: "2026",
    category: "Program",
  },
  {
    title: "MakeX Robotics: Asian Intercontinental, Energy Innovator (Runner-up)",
    issuer: "MakeX",
    year: "2023",
    category: "Award",
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "AI / Machine Learning",
    items: ["PyTorch", "TensorFlow", "OpenCV", "MediaPipe", "MoveNet", "Computer Vision", "RAG"],
  },
  {
    group: "Embedded / Systems",
    items: ["C/C++", "Arduino", "ESP32", "BLE", "RTOS", "Verilog", "RISC-V", "FPGA"],
  },
  {
    group: "Backend / Infrastructure",
    items: ["FastAPI", "Docker", "LiteLLM", "vLLM", "Prometheus", "Grafana", "Slurm"],
  },
  {
    group: "Frontend / Tools",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Git", "Python", "MapLibre GL"],
  },
];

export const CAT_STATUS: Record<string, string> = {
  about: "Cat approved.",
  projects: "Projects are ready.",
  recognition: "Credentials sorted.",
  skills: "Skills loaded.",
  contact: "Open to new opportunities.",
};
