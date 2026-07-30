"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import { GlowDivider } from "@/components/ui/GlowDivider"
import { contactApi } from "@/lib/api"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  project_type: z.string().min(2),
  budget: z.string().min(1),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

const services = [
  { label: "REST API Development", price: "$300 - $800" },
  { label: "Webhook Integration System", price: "$400 - $600" },
  { label: "Semantic Search Platform", price: "$450+" },
  { label: "Full-Stack MVP", price: "$600+" },
  { label: "LLM Streaming & Chat Interfaces", price: "$500+" },
  { label: "Agentic Tool-Use Systems", price: "$500+" },
  { label: "LLM Cost & Context Engineering", price: "$450+" },
  { label: "Structured Output Validation", price: "$400+" },
  { label: "Provider-Agnostic AI Architecture", price: "$400+" },
]

const inputClass = "w-full bg-[#0D0D15] border border-[#1A1A2E] rounded-sm text-[#EEEEFF] font-mono text-sm p-3 placeholder:text-[#303055] focus:outline-none focus:border-[#6C63FF] focus:shadow-[0_0_12px_#6C63FF20] transition-all"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await contactApi.send(data)
      setSent(true)
    } catch {
      alert("Something went wrong. Email me directly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
      <p className="font-mono text-[#50507A] text-[0.9rem] mb-2">// contact</p>
      <p className="font-mono text-[#50507A] text-[0.8rem] mb-12">
        &gt; serious projects only · reply within 48 hours
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left — Form */}
        <div>
          {sent ? (
            <div className="font-mono text-[#00D4AA] text-sm">
              &gt; message received. reply within 48 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input {...register("name")} placeholder="name" className={inputClass} />
                {errors.name && <p className="font-mono text-[0.75rem] text-[#FF4560] mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register("email")} placeholder="email" className={inputClass} />
                {errors.email && <p className="font-mono text-[0.75rem] text-[#FF4560] mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <input {...register("project_type")} placeholder="project type" className={inputClass} />
                {errors.project_type && <p className="font-mono text-[0.75rem] text-[#FF4560] mt-1">{errors.project_type.message}</p>}
              </div>
              <div>
                <input {...register("budget")} placeholder="budget (e.g. $300-500)" className={inputClass} />
                {errors.budget && <p className="font-mono text-[0.75rem] text-[#FF4560] mt-1">{errors.budget.message}</p>}
              </div>
              <div>
                <textarea {...register("message")} placeholder="describe your project" rows={5} className={inputClass} />
                {errors.message && <p className="font-mono text-[0.75rem] text-[#FF4560] mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={loading} className="w-full justify-center">
                {loading ? "sending..." : "send message"}
              </Button>
            </form>
          )}
        </div>

        {/* Right — Info */}
        <div>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-mono text-[#50507A] text-[0.75rem] mb-1">// Direct</p>
              <a href="mailto:fuadhaque.dev@gmail.com"
                className="font-mono text-[#9090BB] text-sm hover:text-[#EEEEFF] transition-colors">
                fuadhaque.dev@gmail.com
              </a>
            </div>
            <div>
              <p className="font-mono text-[#50507A] text-[0.75rem] mb-1">// DM</p>
              <a href="https://www.linkedin.com/in/fuadviews" target="_blank" rel="noopener noreferrer"
              className="font-mono text-[#9090BB] text-sm hover:text-[#EEEEFF] transition-colors block">
                LinkedIn
              </a>
              <a href="https://x.com/fuadviews" target="_blank" rel="noopener noreferrer"
              className="font-mono text-[#9090BB] text-sm hover:text-[#EEEEFF] transition-colors block">
                X
              </a>
            </div>
            <div>
              <p className="font-mono text-[#50507A] text-[0.75rem] mb-1">// Book a call</p>
              <a href="https://cal.com/fuad-haque/30min" target="_blank" rel="noopener noreferrer"
                className="font-mono text-[#9090BB] text-sm hover:text-[#EEEEFF] transition-colors">
                cal.com/fuad-haque — 30 min, always free
              </a>
            </div>
            <div>
              <p className="font-mono text-[#50507A] text-[0.75rem] mb-1">// Response time</p>
              <p className="font-mono text-[#9090BB] text-sm">&lt; 48 hours, usually same day</p>
            </div>
            <div>
              <p className="font-mono text-[#50507A] text-[0.75rem] mb-1">// Timezone</p>
              <p className="font-mono text-[#9090BB] text-sm">UTC+6 · Bangladesh Standard Time</p>
            </div>
          </div>

          <GlowDivider color="teal" />

          <div className="space-y-2">
            {services.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-mono text-[0.75rem] text-[#9090BB]">{s.label}</span>
                <span className="font-mono text-[0.75rem] text-[#00D4AA]">{s.price}</span>
              </div>
            ))}
            <p className="font-mono text-[0.7rem] text-[#50507A] mt-3">
              exact scope after a 30-min call
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}