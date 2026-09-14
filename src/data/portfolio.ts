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
  role: "AI, Systems & Embedded Engineer",
  intro:
    "Computer Engineering student building across AI infrastructure, digital IC design, and embedded systems, from private LLM serving and Slurm workflows to edge AI and RISC-V experiments.",
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
  link?: string;
  title: string;
  period: string;
  status: string;
  summary: string;
  responsibilities: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    id: "EXP-2026-001",
    organization: "Silicon Craft",
    link: "https://www.sic.co.th/",
    title: "Digital IC Design Intern and AI Engineer",
    period: "Jun 2026 - Jul 2026",
    status: "Active",
    summary:
      "Active internship building a private IC and semiconductor engineering assistant and related AI systems.",
    responsibilities: [
      "Built a private IC and semiconductor engineering assistant for company PDFs, datasheets, test reports, CSV/XLSX experiment files, and other engineering documents.",
      "Implemented parsing, chunking, metadata and embedding storage, hybrid search retrieval, and cited question answering through OpenWebUI and the Control Plane.",
      "Used hybrid RAG, Cache-Augmented Generation, bounded ReAct-style read-only investigation workflows, and structured XLSX ingestion for grounded engineering support.",
      "Integrated optional Docling PDF parsing, deterministic PASS/FAIL compliance validation, human approval for extracted spec or rule candidates, and LiteLLM as the model gateway.",
    ],
  },
  {
    id: "EXP-2026-002",
    organization: "Artificial Intelligence Association of Thailand",
    title: "Super AI Engineer Season 6 Level 2 Participant",
    period: "Apr 20, 2026 - Jun 8, 2026",
    status: "Completed",
    summary:
      "Completed the Super AI Engineer Season 6 Level 2 program through online learning and an onsite bootcamp covering machine learning, deep learning, NLP, AI agents, full-stack AI applications, edge AI, AIoT, cybersecurity, and LLM safety.",
    responsibilities: [
      "Completed the two-week online phase covering AI foundations, supervised and unsupervised learning, research methodology, deep learning, NLP/Transformers, AI usage, AI agents, database design, full-stack AI apps, and design thinking.",
      "Completed the four-week onsite bootcamp covering time-series forecasting, edge AI for intelligent transport systems, human sensing and wellness AIoT, AI cybersecurity, harness engineering, and agentic AI / LLM safety.",
      "Participated in scheduled mini hackathons and onsite weekly hackathons including demand forecasting, intelligent transport edge AI, WellSense AIoT, and FahMai enterprise data-agent work.",
      "Worked across Chest Disease Detection, Thai Math VQA, Thai Call Center ASR, Heart Disease Prediction, and Sleep Stage Classification tasks.",
      "Achieved currently evidenced individual-hackathon placements of 1st, 2nd, 6th, 20th, and 21st across the recorded tracks.",
    ],
  },
  {
    id: "EXP-2026-003",
    organization: "Artificial Intelligence Association of Thailand",
    title: "Super AI Engineer Season 6 Level 1 Participant",
    period: "Mar 2026 - Apr 2026",
    status: "Completed",
    summary:
      "Completed Super AI Engineer Season 6 Level 1, an online AI engineering preparation stage by the Artificial Intelligence Association of Thailand.",
    responsibilities: [
      "Completed prerequisite learning and assessment work including AI Ready ASEAN, AI Practitioner, and Foundation AI Theory requirements.",
      "Completed Level 1 practice challenges evidenced by Data to Insight, Thai Election OCR, and FahMai RAG certificates.",
      "Participated in challenge tracks covering OCR, RAG, Thai image captioning, house recognition, word segmentation, sleep-stage classification, and heart disease prediction.",
      "Completed selection-stage work including a data-to-insight / EDA challenge record and an AI presentation video submission record.",
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
  about: "Cat approved.",
  experience: "Experience loaded.",
  projects: "Projects are ready.",
  recognition: "Credentials sorted.",
  skills: "Skills loaded.",
  contact: "Open to new opportunities.",
};
