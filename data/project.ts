import {
  isBlurEnabled,
  featuredProjectTitle,
  secondProjectTitle,
} from "@/lib/config";

export interface ProjectHighlight {
  title: string;
  summary: string;
}

export interface ProjectTech {
  name: string;
  iconSrc?: string;
}

export interface Project {
  id: string;
  number: string;
  company?: string;
  category: string;
  type: "all" | "backend" | "fullstack" | "data" | "security";
  title: string;
  isConfidential?: boolean;
  confidentialMessage?: string;
  tagline: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  tech: ProjectTech[];
  highlights?: ProjectHighlight[];
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "wealthtech-platform",
    number: "01",
    company: "datamoo.ai",
    category: "BACKEND & FINTECH ARCHITECTURE",
    type: "backend",
    title: featuredProjectTitle,
    isConfidential: isBlurEnabled,
    confidentialMessage:
      "Sorry, as per company policy, the project name cannot be revealed.",
    tagline: "Enterprise WealthTech & Direct Mutual Fund Advisory Platform (Backend)",
    description:
      "A production-grade Indian WealthTech backend powering paperless investor KYC onboarding (PAN, CAMS KRA, Cashfree penny-drop, PyMuPDF AOF, Zoho Sign), mutual fund & SIF order execution via NSE and MFU, FIFO lot-level capital-gains accounting, quantitative XIRR performance analytics, and OpenAI-driven wealth insights with deterministic financial guardrails.",
    image: "/projects/fintech.jpg",
    metrics: [
      { label: "Integrations", value: "10+ Fintech APIs" },
      { label: "PII Security", value: "AES-256-GCM" },
      { label: "Celery Pipelines", value: "19+ Scheduled" },
      { label: "Real-Time", value: "ASGI WebSockets" },
    ],
    tech: [
      { name: "Python 3.10", iconSrc: "/tech/python.svg" },
      { name: "Django 5.1", iconSrc: "/tech/django.svg" },
      { name: "DRF", iconSrc: "/tech/restapi.svg" },
      { name: "PostgreSQL", iconSrc: "/tech/postgresql.svg" },
      { name: "Redis", iconSrc: "/tech/redis.svg" },
      { name: "Celery", iconSrc: "/tech/celery.svg" },
      // { name: "Django Channels", iconSrc: "/tech/pipelines.svg" },
      // { name: "OpenAI API", iconSrc: "/tech/openai.svg" },
      { name: "SciPy / NumPy", iconSrc: "/tech/numpy.svg" },
      { name: "PyMuPDF", iconSrc: "/tech/automation.svg" },
      // { name: "Docker", iconSrc: "/tech/docker.svg" },
    ],
    highlights: [
      {
        title: "Zero-Leak PII Encryption & Blind Indexing",
        summary:
          "Custom Django ORM SecureField using AES-256-GCM authenticated encryption with key rotation, LazyDecryptor proxies, PBKDF2-HMAC-SHA256 blind indexing for fast DB lookups, and automated PII masking across audit logs.",
      },
      {
        title: "Real-Time ASGI WebSockets & Celery Automation",
        summary:
          "Hybrid HTTP + WebSocket serving via Gunicorn/Uvicorn ASGI workers with 4 JWT-authenticated Channels consumers and 19+ Celery Beat pipelines for NAV/benchmark ingestion, KYC polling, and order syncing.",
      },
      {
        title: "Resilient Multi-Provider Fintech Integration Layer",
        summary:
          "Unified NSE, MFU XML, CAMS KRA (AES-CBC), Cashfree, Razorpay, and Zoho Billing/Sign behind a pooled BaseAPIClient (pool_maxsize=100) with exponential-backoff retries and async audit logging.",
      },
      {
        title: "Dynamic Hierarchical RBAC & Multi-Format Reports",
        summary:
          "Reflection-based ScreenRegistry permissions cached in Redis for RM/RIA hierarchies, plus batch-prefetched (zero N+1) exports to JSON, CSV, multi-sheet Excel (openpyxl), and PDF AOFs (PyMuPDF).",
      },
    ],
  },
  {
    id: "workforce-ai-platform",
    number: "02",
    company: "datamoo.ai",
    category: "FULL STACK & WORKFORCE AI",
    type: "fullstack",
    title: secondProjectTitle,
    isConfidential: isBlurEnabled,
    confidentialMessage:
      "Sorry, as per company policy, the project name cannot be revealed.",
    tagline: "AI Facial Recognition & Geo-Verified Field Workforce Platform",
    description:
      "An enterprise workforce and field-resource tracking platform built for on-site, remote, construction, mining, and distributed teams to eliminate proxy attendance and streamline payroll. I engineered the Google Forms-style dynamic form builder (supporting all input types and validation rules) and the interactive role-based dashboard using React, Tailwind CSS, Django DRF, and PostgreSQL.",
    image: "/projects/cloud-infra.jpg",
    metrics: [
      { label: "Verification", value: "Face AI + GPS" },
      { label: "Form Engine", value: "All Field Types" },
      { label: "Access Control", value: "Role-Based UI" },
      { label: "Backend API", value: "Django DRF" },
    ],
    tech: [
      { name: "React", iconSrc: "/tech/react.svg" },
      { name: "Tailwind CSS", iconSrc: "/tech/tailwind.svg" },
      { name: "Django", iconSrc: "/tech/django.svg" },
      { name: "DRF", iconSrc: "/tech/restapi.svg" },
      { name: "PostgreSQL", iconSrc: "/tech/postgresql.svg" },
    ],
    highlights: [
      {
        title: "Google Forms-Style Dynamic Form Builder",
        summary:
          "Built a complete dynamic form builder and renderer supporting short/long text, multiple choice, checkboxes, dropdowns, date/time pickers, file uploads, and validation rules—enabling field teams and admins to create custom site check-ins and operational forms on the fly.",
      },
      {
        title: "Interactive Role-Based Dashboard",
        summary:
          "Engineered role-scoped dashboards for enterprise admins, site managers, and HR/payroll teams to track real-time attendance, shift/overtime governance, field task allocations, and form submissions.",
      },
      {
        title: "Facial Recognition, Geo-Fencing & Payroll Governance",
        summary:
          "Supports AI face-matching with GPS geofencing to prevent proxy check-ins, automated working-hour and overtime calculations, and audit-ready HRMS/payroll integrations.",
      },
      {
        title: "Django DRF, PostgreSQL & Responsive React UI",
        summary:
          "Designed normalized PostgreSQL schemas for dynamic form definitions, submissions, and RBAC permissions exposed via Django REST Framework APIs and a responsive React + Tailwind CSS interface.",
      },
    ],
  },
  {
    id: "cctv-attendance-ai",
    number: "03",
    company: "datamoo.ai",
    category: "COMPUTER VISION & EDGE AI",
    type: "data",
    title: "Industrial CCTV Attendance & Productivity",
    tagline: "Automated Factory Floor Attendance, Break & Productivity Tracking via Live Cameras",
    description:
      "A production computer-vision pipeline built for industrial and factory environments to automate worker attendance, break duration tracking, and floor productivity directly from live CCTV streams. Combines OpenCV frame processing with lazy-loaded InsightFace, MediaPipe, and ONNX Runtime/PyTorch models, edge health monitoring, and cloud S3 syncing.",
    image: "/projects/ai-agent.jpg",
    metrics: [
      { label: "Face Engines", value: "InsightFace / ONNX" },
      { label: "Tracking", value: "Attendance & Breaks" },
      { label: "Cloud Sync", value: "Boto3 S3 + REST" },
      { label: "Telemetry", value: "psutil Edge Guard" },
    ],
    tech: [
      { name: "OpenCV", iconSrc: "/tech/opencv.svg" },
      { name: "Python", iconSrc: "/tech/python.svg" },
      { name: "PyTorch", iconSrc: "/tech/automation.svg" },
      { name: "InsightFace / ONNX", iconSrc: "/tech/chatbots.svg" },
      { name: "MediaPipe", iconSrc: "/tech/pipelines.svg" },
      { name: "NumPy", iconSrc: "/tech/numpy.svg" },
      { name: "AWS S3 (Boto3)", iconSrc: "/tech/apis.svg" },
      { name: "REST APIs", iconSrc: "/tech/restapi.svg" },
    ],
    highlights: [
      {
        title: "Lazy-Loaded Multi-Engine Face Recognition",
        summary:
          "Built a modular inference layer supporting InsightFace, MediaPipe, and ONNX Runtime with PyTorch—lazily importing only the active engine to reduce memory footprint and optimize inference speed on edge hardware.",
      },
      {
        title: "Automated Attendance, Break & Productivity Tracking",
        summary:
          "Processes live OpenCV and NumPy video streams to log entry/exit attendance, measure break durations, and calculate active workstation presence without manual badges or proxy check-ins.",
      },
      {
        title: "Resilient Cloud Sync & S3 Snapshot Storage",
        summary:
          "Dispatches verified attendance events and audit snapshots using pooled requests/urllib3 retries and boto3 S3 uploads, backed by environment-driven configuration via python-dotenv.",
      },
      {
        title: "24/7 Industrial Edge Telemetry (psutil)",
        summary:
          "Continuously monitors CPU, RAM, and camera stream health with psutil to prevent memory leaks, handle automatic RTSP reconnection, and keep multi-shift factory deployments stable.",
      },
    ],
  },
];
