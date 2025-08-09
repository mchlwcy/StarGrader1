"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Cpu, FileText, Sparkles, Shield } from "lucide-react"
import { Reveal } from "./reveal"

const features = [
  {
    title: "Atomic-Level Metrics",
    desc: "Our ALWM framework pinpoints gains with precision—down to content, organisation, language, style, mechanics.",
    icon: Sparkles,
  },
  {
    title: "PDF/DOCX In",
    desc: "Drop your draft and get clear, evidence-backed feedback mapped to HKDSE standards.",
    icon: FileText,
  },
  {
    title: "AI, Human Taste",
    desc: "Minimal interface with machine intelligence—built to encourage craft and clarity.",
    icon: Cpu,
  },
  {
    title: "Privacy-first",
    desc: "Your work is yours. Processing is grading-only.",
    icon: Shield,
  },
]

export function FeatureCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={i * 80}>
          <Card className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(187,222,251,.35),0_20px_60px_-20px_rgba(0,0,0,.5)] hover:border-[#BBDEFB]/40">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <f.icon className="h-5 w-5 text-[#BBDEFB]" />
                <div className="font-medium text-white">{f.title}</div>
              </div>
              <p className="mt-3 text-sm text-neutral-300">{f.desc}</p>
            </CardContent>
          </Card>
        </Reveal>
      ))}
    </div>
  )
}
