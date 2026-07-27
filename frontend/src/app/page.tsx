"use client"

import { useEffect, useRef, useState } from "react"

const services = [
  {
    id: "01",
    title: "REST API Development",
    tag: "backend",
    description: "Production-grade FastAPI backends with JWT auth, rate limiting, Pydantic validation, and full Swagger docs. Built to handle real traffic from day one.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic", "Docker", "Railway"],
    deliverables: ["OpenAPI/Swagger docs", "`.env.example`", "Docker Compose", "`/health` endpoint", "Postman collection"],
    price: "$300 - $800",
  },
  {
    id: "02",
    title: "Webhook Integration System",
    tag: "real-time",
    description: "End-to-end webhook pipelines with HMAC signature verification, real-time event inspection via WebSocket, retry logic, and full audit trail.",
    stack: ["FastAPI", "WebSocket", "HMAC-SHA256", "Next.js", "Railway"],
    deliverables: ["Live event inspector UI", "Signature verification", "Retry queue", "Event log dashboard", "Loom walkthrough"],
    price: "$400 - $600",
  },
  {
    id: "03",
    title: "Semantic Search Platform",
    tag: "AI / vector",
    description: "Hybrid search combining dense vector embeddings with BM25 keyword matching and RRF re-ranking. SSE streaming results. Qdrant as the vector store.",
    stack: ["Qdrant", "Sentence-Transformers", "FastAPI", "SSE", "Next.js", "Framer Motion"],
    deliverables: ["Vector ingestion pipeline", "Hybrid RRF search", "SSE streaming UI", "Swagger docs", "Loom walkthrough"],
    price: "$450+",
  },
  {
    id: "04",
    title: "Full-Stack MVP",
    tag: "full-stack",
    description: "Complete product from zero: FastAPI backend, Next.js frontend, PostgreSQL, auth, deployment on Railway + Vercel. GSAP / Framer Motion animations included.",
    stack: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "GSAP", "Framer Motion", "Vercel"],
    deliverables: ["Full source code", "GitHub Actions CI", "Production deployment", "Scope doc", "30-day post-launch support"],
    price: "$600+",
  },
  {
    id: "05",
    title: "LLM Streaming & Chat Interfaces",
    tag: "AI / LLM",
    description: "Token-by-token streaming from OpenAI or Anthropic SDKs, wired through SSE or the Vercel AI SDK's useChat. Disconnect-aware: client drops the tab, the upstream call stops too.",
    stack: ["OpenAI SDK", "Anthropic SDK", "Vercel AI SDK", "SSE", "Next.js", "asyncio"],
    deliverables: ["Token-by-token streaming endpoint", "Mid-stream cancellation", "SSE reconnect / resume", "useChat frontend wiring", "Loom walkthrough"],
    price: "$500+",
  },
  {
    id: "06",
    title: "Agentic Tool-Use Systems",
    tag: "AI / LLM",
    description: "Anthropic tool-use loops: model requests a function, the server executes it against a real backend, the result loops back until a final answer. Decoupled so swapping one tool touches zero loop logic.",
    stack: ["Anthropic SDK", "FastAPI", "Python", "MCP"],
    deliverables: ["Full tool_use round-trip", "Real subprocess/tool execution", "Message-history management", "Error handling per tool call", "Loom walkthrough"],
    price: "$500+",
  },
  {
    id: "07",
    title: "LLM Cost & Context Engineering",
    tag: "AI / LLM",
    description: "Four-bucket cost accounting — input, output, cache-write, cache-read priced separately — checked before a request is even allowed to fire. Context-window auto-summarisation at a real, measured 80% threshold, not a guess.",
    stack: ["Anthropic API", "tiktoken", "FastAPI", "Python", "SQLite"],
    deliverables: ["Per-request cost ledger", "Pre-call token threshold guard", "Auto-summarisation at 80% capacity", "Admin cost dashboard", "Swagger docs"],
    price: "$450+",
  },
  {
    id: "08",
    title: "Structured Output Validation",
    tag: "AI / LLM",
    description: "Closing the gap between 'asked the model for JSON' and 'got JSON back.' Strict schema mode plus runtime validation at every checkpoint — the model's output is trusted exactly as much as a user's form input.",
    stack: ["Zod", "instructor", "Pydantic", "Anthropic SDK", "Express"],
    deliverables: ["Strict JSON schema mode", "Zod / Pydantic runtime validation", "Three-checkpoint validation pipeline", "Near-zero failure rate", "Test suite"],
    price: "$400+",
  },
  {
    id: "09",
    title: "Provider-Agnostic AI Architecture",
    tag: "AI / LLM",
    description: "Swap GPT-4 for Claude via one environment variable, not a rewrite. Paired with retry/backoff logic that's tested to actually fire correctly — not retry code that looks right and silently does nothing.",
    stack: ["Vercel AI SDK", "OpenAI SDK", "Anthropic SDK", "tenacity", "Express"],
    deliverables: ["Provider adapter layer", "One-env-var model routing", "Typed error responses (no silent fallthrough)", "Retry/backoff configuration", "Architecture doc"],
    price: "$400+",
  },
]

const tagColors: Record<string, string> = {
  "backend":     "text-[#00D4AA] border-[#00D4AA30] bg-[#00D4AA08]",
  "real-time":   "text-[#6C63FF] border-[#6C63FF30] bg-[#6C63FF08]",
  "AI / vector": "text-[#A78BFA] border-[#A78BFA30] bg-[#A78BFA08]",
  "full-stack":  "text-[#F59E0B] border-[#F59E0B30] bg-[#F59E0B08]",
  "AI / LLM":    "text-[#A78BFA] border-[#A78BFA30] bg-[#A78BFA08]",
}

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border border-[#1A1A2E] bg-[#0D0D15]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.3s ease`,
        borderColor: hovered ? "#6C63FF40" : "#1A1A2E",
      }}
    >
      <div
        className="absolute top-0 left-0 h-px"
        style={{
          width: hovered ? "100%" : "0%",
          background: "linear-gradient(90deg, #6C63FF, #00D4AA)",
          transition: "width 0.5s ease",
        }}
      />

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[0.65rem] text-[#50507A]">{s.id}</span>
              <span className={`font-mono text-[0.65rem] px-2 py-0.5 border rounded-sm ${tagColors[s.tag]}`}>
                {s.tag}
              </span>
            </div>
            <h3 className="font-display font-bold text-[#EEEEFF] text-[1.25rem] tracking-tight">
              {s.title}
            </h3>
          </div>
          <span className="font-mono text-[#6C63FF] text-[0.9rem] font-bold whitespace-nowrap ml-4 mt-1">
            {s.price}
          </span>
        </div>

        <p className="font-body text-[#9090BB] text-[0.9rem] leading-[1.75] mb-6">
          {s.description}
        </p>

        <div className="mb-6">
          <p className="font-mono text-[0.65rem] text-[#50507A] uppercase tracking-widest mb-2">stack</p>
          <div className="flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <span key={t} className="font-mono text-[0.7rem] text-[#9090BB] border border-[#1A1A2E] px-2 py-0.5 bg-[#10101A]">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.65rem] text-[#50507A] uppercase tracking-widest mb-2">deliverables</p>
          <ul className="space-y-1">
            {s.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2 font-mono text-[0.75rem] text-[#9090BB]">
                <span className="text-[#00D4AA] text-[0.6rem]">{">"}</span>
                <span dangerouslySetInnerHTML={{ __html: d.replace(/`([^`]+)`/g, '<code class="text-[#00D4AA]">$1</code>') }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const techList = [
    "FastAPI", "Next.js", "Qdrant", "WebSocket", "SSE streaming",
    "GSAP", "Framer Motion", "PostgreSQL", "Docker", "Railway", "Vercel",
    "JWT", "Sentence-Transformers", "TypeScript", "GitHub Actions",
    "FastAPI", "Next.js", "Qdrant", "WebSocket", "SSE streaming",
    "GSAP", "Framer Motion", "PostgreSQL", "Docker", "Railway", "Vercel",
    "JWT", "Sentence-Transformers", "TypeScript", "GitHub Actions",
  ]

  const metaItems = [
    { label: "Reply time", value: "< 4 hours" },
    { label: "Timezone", value: "UTC+6 / BDT" },
    { label: "Availability", value: "Remote only" },
    { label: "Status", value: "Available" },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">

        <p
          className="font-mono text-[#50507A] text-[0.9rem] mb-12"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          {"// services"}
        </p>

        <div
          className="mb-6"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
          }}
        >
          <h1
            className="font-display font-black text-[#EEEEFF] leading-[1.1] tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {"Full-stack engineer building"}
            <br />
            <span className="text-[#EEEEFF]">{"production AI-powered"}</span>
            {" systems."}
          </h1>
        </div>

        <div
          className="mb-16 border-y border-[#1A1A2E] py-3 overflow-hidden"
          style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.15s",
          }}
        >
          <div className="flex gap-8 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
            {techList.map((tech, i) => (
              <span key={i} className="font-mono text-[0.7rem] text-[#50507A]">
                {tech}
                <span className="text-[#1A1A2E] mx-2">{"·"}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>

        <div
          className="border border-[#1A1A2E] bg-[#0D0D15] px-8 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-0 md:justify-between"
          style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
        >
          {metaItems.map((item, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="font-mono text-[0.6rem] text-[#50507A] uppercase tracking-widest">
                {item.label}
              </span>
              <span className={`font-mono text-[0.8rem] ${item.label === "Status" ? "text-[#00D4AA]" : "text-[#9090BB]"}`}>
                {item.label === "Status" ? "● " : ""}{item.value}
              </span>
            </div>
          ))}
          <a
            href="https://cal.com/fuad-haque/30min"
            className="font-mono text-[0.75rem] text-[#0A0A0F] bg-[#6C63FF] hover:bg-[#5B52E8] px-5 py-2.5 transition-colors duration-150 whitespace-nowrap"
          >
            {"start a project ->"}
          </a>
        </div>

      </div>
    </div>
  )
}