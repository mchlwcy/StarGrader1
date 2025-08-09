"use client"

import { useState } from "react"
import Link from "next/link"
import { UploadBox } from "@/components/upload-box"
import { ResultPanel, type GradeResult } from "@/components/result-panel"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Background } from "@/components/background"
import { FeatureCards } from "@/components/feature-cards"
import { HowItWorks } from "@/components/how-it-works"
import { Reveal } from "@/components/reveal"

export default function Page() {
  const [result, setResult] = useState<GradeResult | null>(null)

  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <Background />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="w-full pt-20 md:pt-28 pb-12 md:pb-16">
              <Reveal className="flex flex-col items-center text-center gap-6">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
                  {"Kickstart your road to "}
                  <span className="bg-gradient-to-r from-[#BBDEFB] via-[#D2EAFD] to-[#E3F2FD] bg-clip-text text-transparent">
                    {"5**"}
                  </span>
                </h1>
                <p className="max-w-2xl text-neutral-300 text-lg md:text-xl">
                  {
                    "Upload a PDF or DOCX, or paste your essay. StarGrader assesses and gives actionable feedback using DSE standards."
                  }
                </p>
              </Reveal>

              {/* Keep Upload first, What you'll get second (below) on all sizes */}
              <div className="mt-12 md:mt-16 grid gap-12 md:grid-cols-2">
                <Reveal>
                  <UploadBox defaultApiKey={""} onResult={(r) => setResult(r)} />
                </Reveal>
                <Reveal delay={120}>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl md:text-2xl font-medium text-white">{"What you’ll get"}</h2>
                    <ul className="mt-5 space-y-4 text-base text-neutral-300">
                      <li>{"• Overall score and DSE-aligned level (5**, 5*, 5...)"}</li>
                      <li>{"• Strengths and targeted improvements"}</li>
                      <li>{"• Rubric breakdown (content, organisation, language, style, mechanics)"}</li>
                      <li>{"• Inline feedback with examples"}</li>
                    </ul>
                    <div className="mt-8 rounded-xl border border-white/10 bg-neutral-950 p-4 text-sm text-neutral-400">
                      {"Note: For scanned PDFs without selectable text, paste your essay directly for best results."}
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-6 text-sm">
                      <Link href="/members" className="text-[#BBDEFB] hover:text-white underline underline-offset-4">
                        {"Members"}
                      </Link>
                      <span className="text-neutral-600">{"|"}</span>
                      <Link href="/pricing" className="text-[#BBDEFB] hover:text-white underline underline-offset-4">
                        {"Pricing"}
                      </Link>
                      <span className="text-neutral-600">{"|"}</span>
                      <Link
                        href="/testimonials"
                        className="text-[#BBDEFB] hover:text-white underline underline-offset-4"
                      >
                        {"Testimonials"}
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>

              {result && (
                <Reveal className="mt-16">
                  <ResultPanel result={result} />
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl py-16 md:py-24">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{"Designed for focus"}</h2>
            </Reveal>
            <p className="mt-3 text-neutral-300 max-w-2xl">
              {"Less clutter, more craft. We keep the interface clean so you can think and improve."}
            </p>
            <div className="mt-10">
              <FeatureCards />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl py-16 md:py-24">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{"How it works"}</h2>
            </Reveal>
            <div className="mt-10">
              <HowItWorks />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl py-16 md:py-24">
            <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-10 text-center">
              <Reveal>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {"We are StarGrader, finding the golden formula to "}
                  <span className="text-[#BBDEFB]">{"5**"}</span>
                </h3>
                <p className="mt-3 text-neutral-300">
                  {"Start with the free plan—upgrade anytime. Your best writing is ahead."}
                </p>
                <div className="mt-6 flex justify-center">
                  <Link
                    href="/pricing"
                    className="rounded-full border border-white/10 bg-[#BBDEFB] px-5 py-2.5 text-sm font-medium text-black shadow-sm hover:bg-[#A7D3FA]"
                  >
                    {"See pricing"}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
