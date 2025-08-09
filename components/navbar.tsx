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
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#BBDEFB] to-[#E3F2FD] flex items-center justify-center shadow-sm">
            <Star className="h-4 w-4 text-black" />
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
