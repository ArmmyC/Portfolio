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
  responsibilities: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    id: "EXP-2026-004",
    organization: "Blendata",
    logo: { src: "/brand/companies/blendata-mark.png", alt: "Blendata logo", surface: "contained" },
    link: "https://blendata.com/",
    title: "DevOps Engineer",
    period: "Current",
    status: "Active",
    summary:
      "Currently interning at Blendata as a DevOps Engineer, working across Kubernetes and RKE2, CI/CD and artifact tooling, and company-wide observability deployment.",
    responsibilities: [
      "Currently working with Kubernetes and RKE2 cluster environments.",
      "Currently working with Jenkins, Harbor, Argo CD, Helm, and Docker in DevOps workflows.",
      "Deployed Grafana, Prometheus, Loki, Alloy, Node Exporter, and cAdvisor across company VMs to improve observability and logging.",
    ],
  },
  {
    id: "EXP-2026-005",
    organization: "Innosoft Student Associate Program",
    logo: { src: "/brand/companies/isap.png", alt: "Innosoft Student Associate Program logo", surface: "contained" },
    link: "https://innosoft.kmutt.ac.th/",
    title: "System Engineer",
    period: "Current",
    status: "Active",
    summary:
      "Currently participating in the Innosoft Student Associate Program as a System Engineer, learning infrastructure fundamentals while contributing to production backup and document-system design.",
    responsibilities: [
      "Learned about computer networking, backup design, Fortinet firewalls, and Proxmox virtualization.",
      "Designed a backup strategy for a production database to support high availability and consistency requirements.",
      "Designed a signed-PDF parser using tooling for the Paperless System.",
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
      "Completed internship building a private IC and semiconductor engineering assistant and related AI systems.",
    responsibilities: [
      "Built a private IC and semiconductor engineering assistant for company PDFs, datasheets, test reports, CSV/XLSX experiment files, and other engineering documents.",
      "Implemented parsing, chunking, metadata and embedding storage, hybrid search retrieval, and cited question answering through OpenWebUI and the Control Plane.",
      "Used hybrid RAG, Cache-Augmented Generation, bounded ReAct-style read-only investigation workflows, and structured XLSX ingestion for grounded engineering support.",
      "Integrated optional Docling PDF parsing, deterministic PASS/FAIL compliance validation, human approval for extracted spec or rule candidates, and LiteLLM as the model gateway.",
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
      "Completed Super AI Engineer Season 6 across Levels 1-3, progressing from AI foundations to applied engineering, edge AI, AIoT, cybersecurity, and LLM safety.",
    responsibilities: [
      "Level 1: completed AI foundations, RAG, OCR, image captioning, and selection-stage challenges.",
      "Level 2: completed online learning and onsite bootcamp across machine learning, deep learning, NLP, AI agents, edge AI, AIoT, cybersecurity, and LLM safety.",
      "Level 2: placed 1st, 2nd, 6th, 20th, and 21st across recorded individual hackathon tracks.",
      "Level 3: completed the program and received a silver medal reward.",
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
