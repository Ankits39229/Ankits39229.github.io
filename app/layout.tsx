import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GsapProvider } from "@/components/gsap-provider"
import { TransitionProvider } from "@/components/transition-provider"
import { AnimatedGlow } from "@/components/animated-glow"
import { MobileHeader } from "@/components/mobile-header"
import { SimpleAnimatedBackground } from "@/components/simple-animated-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Innovate. Create. Inspire.",
  description: "Awwwards-inspired site using Next.js, GSAP, and Three.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#0a0a0a] text-white relative">
        {/* Global animated background - simple and clean */}
        <div className="fixed inset-0 z-0">
          <SimpleAnimatedBackground />
        </div>
        <GsapProvider>
          <TransitionProvider>
            <Header />
            <MobileHeader />
            <main className="relative z-10">{children}</main>
            <Footer />
          </TransitionProvider>
        </GsapProvider>
      </body>
    </html>
  )
}
