"use client"

import { Reveal } from "./reveal"

const steps = [
  {
    title: "Upload or paste",
    desc: "Drag a PDF/DOCX or paste your essay—no clutter, just writing.",
  },
  {
    title: "Grade with DSE rubric",
    desc: "We apply DSE-aligned scoring and ALWM insight for precision.",
  },
  {
    title: "Iterate with feedback",
    desc: "Use strengths, improvements, and inline notes to rewrite stronger.",
  },
]

export function HowItWorks() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 100}>
          <div className="group relative rounded-2xl border border-white/10 bg-neutral-900/70 p-6 backdrop-blur">
            <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-[#BBDEFB] text-black flex items-center justify-center font-semibold shadow-[0_0_0_6px_rgba(187,222,251,.15)]">
              {i + 1}
            </div>
            <div className="mt-4 text-white font-medium">{s.title}</div>
            <p className="mt-2 text-sm text-neutral-300">{s.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
