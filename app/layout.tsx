import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StagewiseProvider from "../components/stagewise-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ankit Kumar - Cybersecurity Specialist & System Administrator",
  description:
    "Portfolio of Ankit Kumar, a passionate cybersecurity specialist and system administrator securing digital environments through advanced security tools and vulnerability assessment.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <StagewiseProvider />
      </body>
    </html>
  )
}
