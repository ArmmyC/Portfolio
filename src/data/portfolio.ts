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
  role: "AI, Systems & Embedded Engineer",
  intro:
    "Computer Engineering student building across AI infrastructure, digital IC design, and embedded systems, from private LLM serving and Slurm workflows to edge AI and RISC-V experiments.",
  location: "KMUTT, Bangkok, TH",
  email: "k.kamolpopv@gmail.com",
  github: "https://github.com/ArmmyC",
  linkedin: "https://www.linkedin.com/in/kamolpop-vitayarat-781aa539a/",
  resume: "",
};

export type Experience = {
  organization: string;
  link?: string;
  title: string;
  period: string;
  status: string;
  summary: string;
  responsibilities: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    organization: "Silicon Craft",
    link: "https://www.sic.co.th/",
    title: "Digital IC Design Intern and AI Engineer",
    period: "Jun 2026 - Jul 2026",
    status: "Summer 2026",
    summary:
      "Internship spanning digital IC design and AI engineering work across RFID-oriented research, benchmarking, and internal LLM tooling.",
    responsibilities: [
      "Fine-tuning an RTL specialist model for hardware-oriented tasks.",
      "Creating benchmark workflows for RFID-related evaluation and experimentation.",
      "Researching spiking neural networks for RFID applications.",
      "Building and hosting an internal LLM website with RAG capabilities.",
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
    title: "TPQI Huawei Professional Qualification: Cloud Developer Level 5",
    issuer: "Thailand Professional Qualification Institute",
    year: "2026",
    category: "Certification",
  },
  {
    title: "Super AI Engineer Season 6: Level 1 and Level 2 Participant",
    issuer: "Artificial Intelligence Association of Thailand",
    year: "2026",
    category: "Program",
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
  about: "Cat approved.",
  experience: "Experience loaded.",
  projects: "Projects are ready.",
  recognition: "Credentials sorted.",
  skills: "Skills loaded.",
  contact: "Open to new opportunities.",
};
