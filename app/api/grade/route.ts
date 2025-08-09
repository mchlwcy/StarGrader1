export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateObject } from "ai"
import { google, createGoogleGenerativeAI } from "@ai-sdk/google"

const ResultSchema = z.object({
  grade: z.string().describe("A short textual grade summary, e.g., 'Excellent', 'Strong', 'Adequate'."),
  score: z.number().min(0).max(100).describe("Overall numeric score from 0-100."),
  level: z.string().describe("HKDSE performance level estimate: 5**, 5*, 5, 4, 3, etc."),
  summary: z.string().describe("3-5 sentences summarizing performance at a high level."),
  strengths: z.array(z.string()).describe("Bullet points of strengths."),
  improvements: z.array(z.string()).describe("Bullet points of targeted improvements with actionable phrasing."),
  rubric: z.object({
    content: z.number().min(0).max(10),
    organisation: z.number().min(0).max(10),
    language: z.number().min(0).max(10),
    style: z.number().min(0).max(10),
    mechanics: z.number().min(0).max(10),
    comments: z.string(),
  }),
  inlineFeedback: z.string().describe("Inline, quoted feedback with concrete rewrites/examples; may be markdown."),
})

const SYSTEM_INSTRUCTIONS = [
  "OCR, and then mark this essay and give feedback using DSE standards.",
  "Act as a veteran HKDSE English marker and teacher.",
  "Be specific, concise, and evidence-based. Provide a numeric score out of 100 and an estimated HKDSE level.",
  "Use the rubric: content, organisation, language, style, mechanics (0-10 each).",
  "Include strengths, targeted improvements, and inline feedback with examples.",
].join(" ")

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const text = (formData.get("text") as string) || ""
    const file = formData.get("file") as File | null
    const pastedApiKey = (formData.get("apiKey") as string) || ""

    let essayText = text?.trim() || ""
    let extractionWarning: string | undefined = undefined

    if (!essayText && file) {
      const buf = Buffer.from(await file.arrayBuffer())

      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        const pdfModule = await import("pdf-parse")
        const pdfParse = (pdfModule as any).default ?? (pdfModule as any)
        const parsed = await pdfParse(buf)
        essayText = parsed.text?.trim() || ""
        if (!essayText) {
          extractionWarning =
            "No selectable text found in PDF. If this is a scanned document, please paste your essay text directly for best results."
        }
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.toLowerCase().endsWith(".docx")
      ) {
        const mammothModule = await import("mammoth")
        const extractRawText = (mammothModule as any).extractRawText ?? (mammothModule as any).default?.extractRawText
        const out = await extractRawText({ buffer: buf })
        essayText = out.value?.trim() || ""
        if (!essayText) {
          extractionWarning = "DOCX appears empty. Please ensure it contains text, or paste your essay directly."
        }
      } else if (file.type.startsWith("text/") || file.name.toLowerCase().endsWith(".txt")) {
        essayText = buf.toString("utf-8").trim()
      } else {
        return new NextResponse("Unsupported file type. Please upload PDF or DOCX.", { status: 400 })
      }
    }

    if (!essayText) {
      return new NextResponse("No essay text found. Upload a PDF/DOCX with text or paste your essay.", { status: 400 })
    }

    // Choose Google provider: env or per-request API key
    const apiKey = pastedApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
    const provider = apiKey ? createGoogleGenerativeAI({ apiKey }) : google

    const { object } = await generateObject({
      model: provider("models/gemini-1.5-flash"),
      schema: ResultSchema,
      system: SYSTEM_INSTRUCTIONS,
      prompt: [
        "You will receive a student's essay.",
        "Perform OCR if needed conceptually, then mark and provide feedback aligned to HKDSE (DSE) standards.",
        "Return only the requested JSON fields.",
        "",
        "Essay:",
        essayText,
      ].join("\n"),
    })

    const payload = {
      ...object,
      meta: {
        extractionWarning,
        model: "gemini-1.5-flash",
      },
    }

    return NextResponse.json(payload)
  } catch (err: any) {
    console.error("Grade error:", err)
    return new NextResponse(err?.message || "Failed to grade essay.", { status: 500 })
  }
}
