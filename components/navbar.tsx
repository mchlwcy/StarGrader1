"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        className={cn(
          "px-3 py-2 rounded-full text-sm transition-colors",
          active ? "text-white bg-neutral-800" : "text-neutral-300 hover:text-white hover:bg-neutral-800/70",
        )}
        aria-current={active ? "page" : undefined}
      >
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-6xl px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full opacity-80"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.35), rgba(187,222,251,0.22) 45%, rgba(187,222,251,0.08) 60%, transparent 75%)",
                filter: "blur(6px)",
              }}
            />
            <Star
              className="relative h-6 w-6 text-white"
              style={{
                filter: "drop-shadow(0 0 10px rgba(255,255,255,.85)) drop-shadow(0 0 26px rgba(187,222,251,.35))",
              }}
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">{"StarGrader"}</span>
          <span className="sr-only">{"StarGrader Home"}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/" label="Home" />
          <NavLink href="/members" label="Members" />
          <NavLink href="/pricing" label="Pricing" />
          <NavLink href="/testimonials" label="Testimonials" />
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="rounded-full border border-white/10 bg-[#BBDEFB] px-3 py-1.5 text-sm text-black shadow-sm hover:bg-[#A7D3FA]"
          >
            {"Get StarGrader"}
          </Link>
        </div>
      </div>
    </header>
  )
}
