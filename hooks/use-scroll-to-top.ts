"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function useScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Only scroll to top if we're on the home page
    if (pathname === "/") {
      // Small delay to ensure page is fully loaded
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        })
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [pathname])

  // Also handle immediate scroll to top on mount (for page refreshes)
  useEffect(() => {
    if (pathname === "/") {
      // Immediate scroll for page refreshes
      window.scrollTo(0, 0)
    }
  }, [])
}
