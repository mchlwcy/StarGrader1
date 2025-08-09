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
import { VeryPen } from "@/components/very-pen"

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
            <div className="w-full pt-32 md:pt-40 pb-24 md:pb-32">
              <Reveal className="flex flex-col items-center text-center gap-10">
                {/* Very Pen above the words, large and sweeping left→right */}
                <VeryPen className="w-[860px] max-w-[94vw]" />

                <div className="relative">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
                    {"Kickstart your road to "}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-[#BBDEFB] via-[#D2EAFD] to-[#E3F2FD] bg-clip-text text-transparent">
                        {"5**"}
                      </span>
                      {/* Soft supporting glow under 5** */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-x-4 -bottom-2 h-8 rounded-full blur-2xl"
                        style={{
                          background:
                            "radial-gradient(60% 100% at 50% 90%, rgba(255,255,255,0.55), rgba(187,222,251,0.45) 55%, rgba(187,222,251,0) 75%)",
                        }}
                      />
                    </span>
                  </h1>
                </div>

                <p className="max-w-2xl text-neutral-300 text-lg md:text-xl">
                  {
                    "Upload a PDF or DOCX, or paste your essay. StarGrader assesses and gives actionable feedback using DSE standards."
                  }
                </p>
              </Reveal>

              {/* Keep Upload first, What you'll get second (below) with generous space */}
              <div className="mt-16 md:mt-24 grid gap-16 md:grid-cols-2">
                <Reveal>
                  <UploadBox defaultApiKey={""} onResult={(r) => setResult(r)} />
                </Reveal>
                <Reveal delay={120}>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur p-8 md:p-10 shadow-sm">
                    <h2 className="text-xl md:text-2xl font-medium text-white">{"What you’ll get"}</h2>
                    <ul className="mt-6 space-y-5 text-base text-neutral-300">
                      <li>{"• Overall score and DSE-aligned level (5**, 5*, 5...)"}</li>
                      <li>{"• Strengths and targeted improvements"}</li>
                      <li>{"• Rubric breakdown (content, organisation, language, style, mechanics)"}</li>
                      <li>{"• Inline feedback with examples"}</li>
                    </ul>
                    <div className="mt-10 rounded-xl border border-white/10 bg-neutral-950 p-5 text-sm text-neutral-400">
                      {"Note: For scanned PDFs without selectable text, paste your essay directly for best results."}
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-6 text-sm">
                      <Link href="/members" className="text-[#BBDEFB] hover:text-white underline underline-offset-4">
                        {"Members"}
                      </Link>
                      <span className="text-neutral-700">{"|"}</span>
                      <Link href="/pricing" className="text-[#BBDEFB] hover:text-white underline underline-offset-4">
                        {"Pricing"}
                      </Link>
                      <span className="text-neutral-700">{"|"}</span>
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
                <Reveal className="mt-24">
                  <ResultPanel result={result} />
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* Features with extra breathing room */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl py-24 md:py-36">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{"Designed for focus"}</h2>
            </Reveal>
            <p className="mt-4 text-neutral-300 max-w-2xl">
              {"Less clutter, more craft. We keep the interface clean so you can think and improve."}
            </p>
            <div className="mt-12">
              <FeatureCards />
            </div>
          </div>
        </section>

        {/* How it works with more space */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl py-24 md:py-36">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{"How it works"}</h2>
            </Reveal>
            <div className="mt-12">
              <HowItWorks />
            </div>
          </div>
        </section>

        {/* CTA with generous whitespace */}
        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl py-24 md:py-36">
            <div className="rounded-3xl border border-white/10 bg-neutral-900/70 p-10 md:p-14 text-center">
              <Reveal>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {"We are StarGrader, finding the golden formula to "}
                  <span className="text-[#BBDEFB]">{"5**"}</span>
                </h3>
                <p className="mt-3 text-neutral-300">
                  {"Start with the free plan—upgrade anytime. Your best writing is ahead."}
                </p>
                <div className="mt-8 flex justify-center">
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
