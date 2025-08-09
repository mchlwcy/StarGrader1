"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Loader2, FileUp, KeyRound } from "lucide-react"
import type { GradeResult } from "./result-panel"

type Props = {
  defaultApiKey?: string
  onResult?: (result: GradeResult) => void
}

export function UploadBox({ defaultApiKey = "", onResult }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [essayText, setEssayText] = useState("")
  const [apiKey, setApiKey] = useState(defaultApiKey)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tip, setTip] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("stargrader_gemini_key") : null
    if (saved && !apiKey) setApiKey(saved)
  }, [])

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const f = e.dataTransfer.files?.[0]
    if (f) {
      setFile(f)
      setTip(null)
    }
  }, [])

  const prevent = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setTip(null)
    }
  }

  const handleSubmit = async () => {
    setError(null)
    setTip(null)
    onResult?.(null as unknown as GradeResult)
    if (!file && !essayText.trim()) {
      setError("Please upload a file or paste your essay text.")
      return
    }
    if (file && file.size > 10 * 1024 * 1024) {
      setError("File too large. Please keep under 10MB.")
      return
    }
    setIsLoading(true)
    try {
      const form = new FormData()
      if (file) form.append("file", file)
      if (essayText.trim()) form.append("text", essayText.trim())
      if (apiKey.trim()) form.append("apiKey", apiKey.trim())
      const res = await fetch("/api/grade", {
        method: "POST",
        body: form,
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Failed to grade essay.")
      }
      const data = (await res.json()) as GradeResult
      onResult?.(data)
      if (apiKey.trim()) {
        localStorage.setItem("stargrader_gemini_key", apiKey.trim())
      }
      if (data.meta?.extractionWarning) {
        setTip(data.meta.extractionWarning)
      }
    } catch (e: any) {
      setError(e.message || "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-white/10 bg-neutral-900/70 backdrop-blur shadow-sm text-white">
      <CardHeader>
        <CardTitle className="text-xl">{"Upload or paste your essay"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-950 hover:bg-neutral-900 transition-colors">
          <label
            onDragEnter={prevent}
            onDragOver={prevent}
            onDragLeave={prevent}
            onDrop={onDrop}
            htmlFor="file"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 px-6 py-10 text-center"
          >
            <FileUp className="h-6 w-6 text-neutral-400" />
            <div className="text-sm text-neutral-200">{"Drag & drop PDF or DOCX here, or click to select"}</div>
            <div className="text-xs text-neutral-400">{"Max 10MB • .pdf .docx"}</div>
            <Input
              ref={fileInputRef}
              id="file"
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={onSelectFile}
            />
          </label>
          {file && (
            <div className="border-t border-white/10 px-4 py-3 text-sm text-neutral-200">
              {"Selected: "} <span className="font-medium">{file.name}</span>
              <button
                className="ml-2 text-neutral-300 hover:text-white underline underline-offset-4"
                onClick={() => document.getElementById("file")?.dispatchEvent(new Event("click"))}
                type="button"
              >
                {"Change"}
              </button>
              <button
                className="ml-2 text-neutral-300 hover:text-white underline underline-offset-4"
                onClick={() =>
                  fileInputRef.current ? ((fileInputRef.current.value = ""), setFile(null)) : setFile(null)
                }
                type="button"
              >
                {"Remove"}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="essayText" className="text-sm text-neutral-200">
            {"Or paste text"}
          </Label>
          <Textarea
            id="essayText"
            placeholder={"Paste your essay here..."}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            className="min-h-[160px] resize-y bg-black/60 border-white/10 text-white placeholder:text-neutral-500"
          />
        </div>

        {/* Removed the privacy/API key storage sentence as requested */}

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen((x) => !x)}
            className="text-sm text-neutral-200 hover:text-white underline underline-offset-4"
          >
            {isAdvancedOpen ? "Hide advanced" : "Show advanced"}
          </button>
          {isAdvancedOpen && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="apiKey" className="text-sm text-neutral-200">
                {"Google Gemini API Key (optional)"}
              </Label>
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-neutral-400" />
                <Input
                  id="apiKey"
                  placeholder="Paste your key • Or set env GOOGLE_GENERATIVE_AI_API_KEY"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-black/60 border-white/10 text-white placeholder:text-neutral-500"
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="border-red-500/40 bg-red-950/40 text-red-200">
            <AlertTitle>{"Error"}</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{error}</AlertDescription>
          </Alert>
        )}
        {tip && (
          <Alert className="border-white/10 bg-neutral-950 text-neutral-200">
            <AlertTitle>{"Heads up"}</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{tip}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-3">
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-[#BBDEFB] hover:bg-[#A7D3FA] text-black">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {"Grading..."}
              </>
            ) : (
              "Grade my essay"
            )}
          </Button>
          <span className="text-xs text-neutral-400">
            {"Uses prompt: “OCR, and then mark this essay and give feedback using DSE standards”"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
