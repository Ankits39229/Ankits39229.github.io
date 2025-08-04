"use client"

import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"

export default function Home() {
  // Automatically scroll to top when home page loads
  useScrollToTop()

  return (
    <>
      <Hero />
      <Portfolio />
    </>
  )
}
