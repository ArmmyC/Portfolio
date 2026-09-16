import rallyScreenshot from "@/assets/projects/rally-home-clean.png";
import freedomainScreenshot from "@/assets/projects/webpad-home.png";

export type NavItem = { id: string; label: string };

export const NAV: NavItem[] = [
  { id: "about", label: "/about" },
  { id: "experience", label: "/experience" },
  { id: "projects", label: "/projects" },
  { id: "recognition", label: "/recognition" },
  { id: "skills", label: "/core expertise" },
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
  responsibilities: string[];
};

// Technology lists checked against ArmmyC/CareerDatabase/manifests/entities.yml
// Innosoft and WebPad refreshed on 2026-09-16; Super AI confirmed by the user.
// Keep representative named technologies; omit broad concepts and unverified tools.
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
    tools: ["Kubernetes", "Jenkins", "Argo CD", "Docker", "Grafana", "Prometheus"],
    responsibilities: [
      "Operate Kubernetes and RKE2 environments.",
      "Build delivery workflows with Jenkins, Harbor, Argo CD, Helm, and Docker.",
      "Deploy Grafana, Prometheus, Loki, Alloy, Node Exporter, and cAdvisor across company VMs.",
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
      "In KMUTT's Innosoft program, building from infrastructure fundamentals to reliable backups and document systems.",
    tools: ["Fortinet", "Proxmox", "Ceph", "PostgreSQL", "SQL Server", "Bash"],
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
    tools: ["OpenWebUI", "LiteLLM", "Docling"],
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
      "AI, edge, and safety training across Levels 1-3, including a silver medal in Level 3 and placements across individual hackathon tracks.",
    // Technology use confirmed directly by the user on 2026-09-16.
    tools: ["Python", "vLLM", "DuckDB", "C++ (Arduino)", "FastAPI", "pgvector", "Google / Gemma API", "Slurm"],
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
    // Curated from CareerDatabase PROJ-2026-025 technologies.
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "PostgreSQL", "Cloudflare DNS API"],
    link: "https://freedomain.kamolpop.dev/",
    image: freedomainScreenshot,
  },
  {
    title: "Lanta LLM Hosting",
    category: "AI Infrastructure",
    status: "Built / Ops",
    description:
      "A private LLM hosting and operations stack serving Slurm-hosted vLLM models through SSH tunnels, a LiteLLM gateway, OpenWebUI, and Prometheus/Grafana monitoring.",
    tech: ["vLLM", "LiteLLM", "Slurm", "Docker Compose", "FastAPI", "Grafana"],
    link: "https://github.com/ArmmyC/Lanta-LLM-Hosting",
  },
  {
    title: "YUEDMAI Smart Stretch Coach",
    category: "Computer Vision / Edge AI",
    status: "Prototype",
    description:
      "A local-first smart stretching kiosk prototype using camera pose tracking, web session UI, and Arduino wearable and hub firmware for guided stretch feedback.",
    tech: ["Python", "FastAPI", "OpenCV", "MediaPipe", "MoveNet", "Arduino"],
    link: "https://github.com/ArmmyC/Stretching",
  },
  {
    title: "HolySoC (RV32I Softcore)",
    category: "Computer Architecture / FPGA",
    status: "Built",
    description:
      "A custom 32-bit RISC-V RV32I single-cycle softcore CPU and System-on-Chip implemented in Verilog for FPGA, with memory-mapped I/O and UART firmware.",
    tech: ["Verilog", "Xilinx Vivado", "Digilent Basys 3", "C", "Assembly"],
    link: "https://github.com/ArmmyC/HolySoC",
  },
  {
    title: "Miti: Tourism Opportunity Map",
    category: "Geospatial / Data Viz",
    status: "Prototype",
    description:
      "A planning dashboard using MapLibre GL, weighted opportunity scoring, and Python data pipelines to visualize tourism expansion zones.",
    tech: ["Next.js", "TypeScript", "MapLibre GL JS", "Recharts", "Python"],
    link: "https://github.com/ArmmyC/Miti",
  },
];

export type RecognitionBrandKey =
  | "google"
  | "amd"
  | "superai"
  | "nstda"
  | "acr"
  | "deepmind"
  | "aiat"
  | "nectec"
  | "makex"
  | "huawei"
  | "asean"
  | "code"
  | "lablab";

export type Recognition = {
  title: string;
  issuer: string;
  year: string;
  category: string;
  link?: string;
  detail?: string;
  highlight?: string;
  logoKeys?: RecognitionBrandKey[];
};

export const RECOGNITION: Recognition[] = [
  // CareerDatabase reviewed 2026-09-16. Prize and medal below are
  // user-confirmed records pending official award evidence.
  {
    title: "AMD Developer Hackathon: ACT II",
    // First prize confirmed directly by the user on 2026-09-17.
    highlight: "Google DeepMind 1st Prize",
    logoKeys: ["google", "amd"],
    issuer: "lablab.ai / NativelyAI",
    year: "2026",
    category: "Award",
    detail: "Team KMUTT Ma Laew.",
  },
  {
    title: "Super AI Engineer Level 3",
    highlight: "Silver medal",
    logoKeys: ["aiat", "superai"],
    issuer: "Artificial Intelligence Association of Thailand",
    year: "2026",
    category: "Award",
  },
  {
    title: "AI Thailand Benchmark Programs",
    highlight: "AI Engineer Award",
    logoKeys: ["nectec", "nstda"],
    issuer: "NECTEC / NSTDA",
    year: "2026",
    category: "Award",
  },
  {
    title: "Super AI Engineer Season 6 Average 5 Domain Individual Rank 1",
    highlight: "1st place",
    logoKeys: ["aiat", "superai"],
    issuer: "Artificial Intelligence Association of Thailand",
    year: "2026",
    category: "Award",
  },
  {
    title: "AI Ready ASEAN Completion",
    issuer: "AI Ready ASEAN",
    year: "2026",
    category: "Certificate",
    logoKeys: ["asean"],
  },
  {
    title: "Huawei Cloud HCCDA-AI Developer Certification",
    issuer: "Huawei Cloud",
    year: "2026",
    category: "Certification",
    logoKeys: ["huawei"],
  },
  {
    title: "Huawei Cloud HCCDA-Tech Essentials Developer Certification",
    issuer: "Huawei Cloud",
    year: "2026",
    category: "Certification",
    logoKeys: ["huawei"],
  },
  {
    title: "Hour of Code Certificate of Completion",
    issuer: "Code.org",
    year: "2026",
    category: "Certificate",
    logoKeys: ["code"],
  },
  {
    title: "MakeX Asian Intercontinental Tournament Energy Innovator Runner-up",
    highlight: "Runner-up",
    issuer: "MakeX Robotics Competition Committee",
    year: "2023",
    category: "Award",
    logoKeys: ["makex"],
  },
];

// Group related credentials without exposing credential IDs or private evidence.
RECOGNITION.push(
  { title: "TPQI / Huawei AI Literacy", issuer: "Thailand Professional Qualification Institute", year: "2026", category: "Certification", logoKeys: ["huawei"], detail: "Certificate of competency for AI Literacy for Power Users." },
  { title: "TPQI / Huawei Cloud Developer Level 5", issuer: "Thailand Professional Qualification Institute", year: "2026", category: "Certification", logoKeys: ["huawei"], detail: "Certificate of competency and professional qualification." },
  { title: "Super AI Engineer Season 6", issuer: "Artificial Intelligence Association of Thailand", year: "2026", category: "Certificate", logoKeys: ["aiat", "superai"], detail: "AI Practitioner, Foundation AI Theory, and practice certificates for Data to Insight, Thai Election OCR, and FahMai RAG." },
  { title: "AMD Developer Hackathon: ACT II Completion", issuer: "lablab.ai / NativelyAI", year: "2026", category: "Certificate", logoKeys: ["amd"] },
  { title: "Student Council President", issuer: "Assumption College Rayong", year: "2022", category: "Leadership", logoKeys: ["acr"], detail: "Recognized for service during academic year 2021." },
);

export const CORE_EXPERTISE = [
  {
    title: "AI engineering",
    description: "Build document-grounded assistants, serve language models, and develop computer vision applications.",
  },
  {
    title: "DevOps & systems",
    description: "Work across infrastructure, container deployments, CI/CD, observability, and reliable backups.",
  },
  {
    title: "Embedded & digital design",
    description: "Connect software to hardware through microcontroller firmware, FPGA design, and RISC-V systems.",
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
