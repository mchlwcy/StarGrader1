import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Background } from "@/components/background"
import { Reveal } from "@/components/reveal"
import { FAQ } from "@/components/faq"

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      desc: "Try grading on a limited basis.",
      features: ["3 essays / month", "Standard feedback", "Email support"],
    },
    {
      name: "Pro",
      price: "$9 / mo",
      desc: "For students aiming for the top.",
      features: ["Unlimited grading", "Detailed inline feedback", "Priority support"],
      highlight: true,
    },
    {
      name: "Teacher",
      price: "$19 / mo",
      desc: "For classrooms and small groups.",
      features: ["Unlimited grading", "Batch uploads", "Shareable reports"],
    },
  ]

  return (
    <div className="min-h-dvh flex flex-col bg-black text-white">
      <Background />
      <Navbar />
      <main className="flex-1 px-4 md:px-8">
        <div className="mx-auto max-w-6xl pt-20 md:pt-28 pb-10 md:pb-16">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{"Pricing"}</h1>
          </Reveal>
          <p className="mt-4 text-neutral-300 max-w-2xl">{"Simple plans that scale with your learning journey."}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <Card
                  className={`rounded-3xl ${t.highlight ? "border-[#BBDEFB]/60 shadow-[0_0_0_3px_rgba(187,222,251,.25)]" : "border-white/10"} border bg-neutral-900/70 backdrop-blur transition-all hover:-translate-y-1`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{t.name}</CardTitle>
                    <div className="text-4xl font-semibold text-white">{t.price}</div>
                    <div className="text-sm text-neutral-300">{t.desc}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-neutral-200">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="inline-block h-4 w-4 rounded-full bg-[#BBDEFB]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-8 w-full bg-[#BBDEFB] hover:bg-[#A7D3FA] text-black rounded-full">
                      {"Choose plan"}
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{"FAQs"}</h2>
            </Reveal>
            <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/70 p-6">
              <FAQ />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
