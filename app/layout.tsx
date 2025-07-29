import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StagewiseProvider from "../components/stagewise-provider"
import { ThemeProvider } from "../components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ankit Kumar",
  description:
    "Portfolio of Ankit Kumar, a passionate cybersecurity specialist and system administrator securing digital environments through advanced security tools and vulnerability assessment.",
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-500 ease-in-out`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative overflow-hidden">
            {/* Theme transition overlay */}
            <div className="fixed inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-all duration-700 ease-in-out" />
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </ThemeProvider>
        <StagewiseProvider />
      </body>
    </html>
  )
}
