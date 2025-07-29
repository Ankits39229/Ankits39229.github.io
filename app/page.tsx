"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Wrench,
  Send,
  ChevronDown,
  Zap,
  Cpu,
  Rocket,
  Brain,
  X,
  Download,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Smooth and Professional Typewriter Component
function GlitchTypewriter({ texts, delay = 0 }: { texts: string[]; delay?: number }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  
  useEffect(() => {
    if (texts.length === 0) return
    
    // Handle initial delay
    if (delay > 0 && !hasStarted) {
      const initialDelay = setTimeout(() => {
        setHasStarted(true)
      }, delay)
      return () => clearTimeout(initialDelay)
    }
    
    if (delay === 0 && !hasStarted) {
      setHasStarted(true)
    }
    
    if (!hasStarted) return
    
    const currentText = texts[currentTextIndex]
    let timeoutId: NodeJS.Timeout
    
    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, 80) // Smooth typing speed
      } else {
        // Finished typing, pause then start deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true)
        }, 1500) // Pause at full text
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 40) // Faster deletion
      } else {
        // Finished deleting, move to next text
        timeoutId = setTimeout(() => {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }, 200) // Brief pause before next text
      }
    }
    
    return () => clearTimeout(timeoutId)
  }, [displayText, currentTextIndex, isDeleting, texts, delay, hasStarted])

  // Smooth cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530) // Slightly faster blink for smoother feel
    
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className="relative inline-block min-h-[1.2em]">
      <span className="transition-all duration-100 ease-out">
        {displayText}
      </span>
      <span 
        className={`text-cyan-400 ml-1 font-light transition-opacity duration-200 ${
          showCursor ? 'opacity-100' : 'opacity-20'
        }`}
      >
        |
      </span>
    </span>
  )
}

// Holographic Card Component
function HolographicCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      className={`relative transform-gpu transition-all duration-300 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl" />
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
        {children}
      </div>
    </div>
  )
}

// Advanced Skill Visualization
function SkillOrb({ skill, percentage, delay = 0 }: { skill: string; percentage: number; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.8, delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="relative w-32 h-32 mx-auto">
        {/* Outer ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="2" fill="none" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={
              isInView
                ? { strokeDashoffset: 2 * Math.PI * 45 * (1 - percentage / 100) }
                : { strokeDashoffset: 2 * Math.PI * 45 }
            }
            transition={{ duration: 2, delay: delay + 0.5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#ff00ff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            animate={hovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-cyan-400 mb-1">{percentage}%</div>
            <div className="text-xs text-gray-300 font-medium">{skill}</div>
          </motion.div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
          animate={hovered ? { scale: 1.2, opacity: 0.6 } : { scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

// Minimal Tech Background Animation - Optimized Version
function MinimalTechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set initial canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Reduced particle count for better performance
    const dots: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      pulseSpeed: number
      baseOpacity: number
    }> = []

    // Create fewer dots for smoother performance
    for (let i = 0; i < 30; i++) {
      const baseOpacity = Math.random() * 0.3 + 0.2
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 1,
        opacity: baseOpacity,
        pulseSpeed: Math.random() * 0.01 + 0.005, // Slower pulse
        baseOpacity,
      })
    }

    let time = 0
    let animationId: number

    function animate() {
      if (!ctx || !canvas) return

      // Clear with slightly more fade for smoother trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.005 // Slower time progression

      dots.forEach((dot, index) => {
        // Update position with smoother movement
        dot.x += dot.vx
        dot.y += dot.vy

        // Bounce off edges with dampening
        if (dot.x <= 0 || dot.x >= canvas.width) {
          dot.vx *= -0.8 // Add dampening
          dot.x = Math.max(0, Math.min(canvas.width, dot.x))
        }
        if (dot.y <= 0 || dot.y >= canvas.height) {
          dot.vy *= -0.8 // Add dampening
          dot.y = Math.max(0, Math.min(canvas.height, dot.y))
        }

        // Smoother pulse effect
        const pulse = Math.sin(time + index * 0.3) * 0.2 + 0.8
        const currentOpacity = dot.baseOpacity * pulse

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${currentOpacity})`
        ctx.fill()

        // Optimized connections - only check nearby dots
        dots.forEach((otherDot, otherIndex) => {
          if (index !== otherIndex && index < otherIndex) {
            // Avoid duplicate lines
            const dx = dot.x - otherDot.x
            const dy = dot.y - otherDot.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              // Reduced connection distance
              const lineOpacity = (1 - distance / 80) * 0.05
              ctx.beginPath()
              ctx.moveTo(dot.x, dot.y)
              ctx.lineTo(otherDot.x, otherDot.y)
              ctx.strokeStyle = `rgba(6, 182, 212, ${lineOpacity})`
              ctx.lineWidth = 0.3
              ctx.stroke()
            }
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      clearTimeout(resizeTimeout)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-20 pointer-events-none" />
}

// Main Portfolio Component
export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [showResumeModal, setShowResumeModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])



  const projects = [
    {
      title: "Advanced Windows Security Application",
      description: "Comprehensive security tool with junk cleanup, diagnostics, firewall monitoring, and CIS audits",
      image: "/placeholder.svg?height=300&width=500&text=Windows+Security+Tool",
      tech: ["Java Swing", "Python", "Machine Learning", "Blockchain"],
      github: "#",
      demo: "#",
    },
    {
      title: "Malware Detection System",
      description: "Static and dynamic malware scanning using machine learning models for threat detection",
      image: "/placeholder.svg?height=300&width=500&text=Malware+Detection+AI",
      tech: ["Python", "Machine Learning", "Static Analysis", "Dynamic Analysis"],
      github: "#",
      demo: "#",
    },
    {
      title: "Network Vulnerability Scanner",
      description: "Automated vulnerability assessment tool using Nmap and custom scripts",
      image: "/placeholder.svg?height=300&width=500&text=Network+Scanner+Dashboard",
      tech: ["Python", "Nmap", "Batch Scripting", "Network Security"],
      github: "#",
      demo: "#",
    },
    {
      title: "CIS Benchmark Audit Tool",
      description: "Automated compliance checking against CIS security benchmarks",
      image: "/placeholder.svg?height=300&width=500&text=CIS+Compliance+Audit",
      tech: ["Python", "Windows API", "Security Auditing", "Compliance"],
      github: "#",
      demo: "#",
    },
    {
      title: "Firewall Monitoring Dashboard",
      description: "Real-time firewall activity monitoring and incident response system",
      image: "/placeholder.svg?height=300&width=500&text=Firewall+Monitor+Live",
      tech: ["Python", "Network Monitoring", "Incident Response", "Data Visualization"],
      github: "#",
      demo: "#",
    },
    {
      title: "Digital Forensics Toolkit",
      description: "Collection of tools for digital investigation and evidence analysis",
      image: "/placeholder.svg?height=300&width=500&text=Digital+Forensics+Suite",
      tech: ["Python", "Autopsy", "Data Recovery", "Forensic Analysis"],
      github: "#",
      demo: "#",
    },
  ]

  const skills = [
    { name: "Python", percentage: 90 },
    { name: "Java", percentage: 85 },
    { name: "Cybersecurity", percentage: 88 },
    { name: "System Admin", percentage: 82 },
    { name: "Penetration Testing", percentage: 80 },
    { name: "Network Security", percentage: 85 },
    { name: "Digital Forensics", percentage: 78 },
    { name: "Incident Response", percentage: 83 },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
          <div className="text-cyan-400 text-xl font-bold">
            <GlitchTypewriter texts={["INITIALIZING...", "LOADING SYSTEMS...", "READY TO LAUNCH..."]} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <MinimalTechBackground />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-cyan-500/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              whileHover={{ y: -2 }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              {"<ANKIT.SEC />"}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "skills", "contact"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize relative px-4 py-2 transition-all duration-300 ${
                    activeSection === item ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ y: 0 }}
            >
              <div className="w-6 h-6 relative">
                <motion.span
                  className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 transform origin-center"
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute top-2 left-0 w-full h-0.5 bg-cyan-400"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute top-4 left-0 w-full h-0.5 bg-cyan-400 transform origin-center"
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
            {/* Resume Download Button */}
            <motion.button
              onClick={() => setShowResumeModal(true)}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
              <span>Resume</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-cyan-500/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {["home", "about", "projects", "skills", "contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left capitalize text-gray-300 hover:text-cyan-400 transition-colors py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="text-center z-10 px-4 relative" style={{ y: backgroundY }}>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-6xl md:text-8xl font-black mb-4 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                ANKIT
              </span>
              <div className="text-4xl md:text-6xl mt-2 text-gray-300 font-light tracking-widest">
                <GlitchTypewriter
                  texts={["CYBERSECURITY SPECIALIST", "SYSTEM ADMINISTRATOR", "SECURITY RESEARCHER", "IT PROFESSIONAL"]}
                  delay={500}
                />
              </div>
            </div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Securing digital environments through{" "}
            <span className="text-cyan-400 font-semibold">advanced cybersecurity</span>,{" "}
            <span className="text-purple-400 font-semibold">system administration</span>, and{" "}
            <span className="text-pink-400 font-semibold">vulnerability assessment</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Rocket className="w-5 h-5 mr-2" />
                  Explore My Universe
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm bg-black/20 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Connect & Collaborate
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                onClick={() => setShowResumeModal(true)}
                variant="outline"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm bg-black/20 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Eye className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"></Eye>
                  Preview Resume
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            {[
              { number: "10+", label: "Security Projects" },
              { number: "3+", label: "Years Learning" },
              { number: "25+", label: "Tools Mastered" },
            ].map((stat, index) => (
              <motion.div key={index} className="text-center" whileHover={{ y: -2 }}>
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ABOUT THE ARCHITECT
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  I'm a <span className="text-cyan-400 font-semibold">cybersecurity specialist</span> and system
                  administrator passionate about securing digital environments and protecting against emerging threats.
                  Currently pursuing my B.Tech in Computer Science & Engineering, I combine academic knowledge with
                  hands-on experience in vulnerability assessment and incident response.
                </p>
                <p>
                  My expertise spans across <span className="text-purple-400 font-semibold">penetration testing</span>,
                  <span className="text-pink-400 font-semibold"> malware analysis</span>, and
                  <span className="text-cyan-400 font-semibold"> system optimization</span>. I've developed
                  comprehensive security tools and led teams in competitive hackathons, earning recognition for
                  innovative solutions.
                </p>
                <p>
                  Every security challenge is an opportunity to strengthen defenses, every vulnerability assessment a
                  step toward a more secure digital landscape, and every incident response a chance to learn and
                  improve.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                {[
                  { icon: Brain, number: "5+", label: "Security Tools Built" },
                  { icon: Cpu, number: "50K+", label: "Lines of Code" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-4 group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Resume Download Section */}
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Button
                    onClick={() => setShowResumeModal(true)}
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-2xl shadow-purple-500/30 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      <Eye className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"></Eye>
                      Preview Resume
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </motion.div>
                <p className="text-gray-400 text-sm mt-3">Complete professional background & achievements</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <SkillOrb key={skill.name} skill={skill.name} percentage={skill.percentage} delay={index * 0.1} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}

      <section id="projects" className="py-32 px-4 bg-gradient-to-b from-gray-900/20 to-black relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-7xl mx-auto relative">
          <motion.h2
            className="text-5xl md:text-7xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            DIGITAL MASTERPIECES
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 text-center mb-20 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore my portfolio of cutting-edge projects that push the boundaries of technology and innovation
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />

                  {/* Main card */}
                  <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                    {/* Image container with enhanced effects */}
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />

                      {/* Overlay with enhanced animations */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />

                      {/* Action buttons with better positioning */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                        <div className="flex space-x-4">
                          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/30"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-2 border-white/80 text-white hover:bg-white hover:text-black bg-black/20 backdrop-blur-sm"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      {/* Project number indicator */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-20">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content with enhanced styling */}
                    <div className="p-6 relative">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed text-sm">{project.description}</p>

                      {/* Enhanced tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 rounded-full text-xs border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 cursor-default"
                            whileHover={{ y: -2, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Progress indicator */}
                      <div className="mt-4 flex items-center space-x-2">
                        <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-cyan-500/30"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Project
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            TECH ARSENAL
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Cybersecurity",
                icon: Code,
                skills: ["Penetration Testing", "Vulnerability Assessment", "CIS Audits", "Incident Response"],
                color: "from-cyan-500 to-blue-500",
                accentColor: "cyan",
              },
              {
                category: "System Administration",
                icon: Brain,
                skills: ["Windows/Linux", "Network Monitoring", "Performance Optimization", "Data Recovery"],
                color: "from-purple-500 to-pink-500",
                accentColor: "purple",
              },
              {
                category: "Development",
                icon: Wrench,
                skills: ["Python/Java", "Machine Learning", "Blockchain", "Security Tools"],
                color: "from-green-500 to-teal-500",
                accentColor: "green",
              },
            ].map((category, index) => (
              <motion.div
                key={category.category}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Enhanced card with sophisticated hover effects */}
                <div className="relative h-full">
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 transform group-hover:scale-105`}
                  />

                  {/* Border animation */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 p-[1px] group-hover:from-cyan-400/50 group-hover:via-purple-500/50 group-hover:to-green-500/50 transition-all duration-500">
                    <div className="h-full w-full rounded-2xl bg-gray-900/90 backdrop-blur-xl" />
                  </div>

                  <div className="relative p-8 h-full flex flex-col">
                    {/* Icon with enhanced animations */}
                    <motion.div
                      className="text-center mb-8"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${category.color} rounded-full mb-6 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500`}
                      >
                        {/* Rotating background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin" />
                        <category.icon className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                      </div>

                      <h3
                        className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                          category.accentColor === "cyan"
                            ? "text-cyan-400 group-hover:text-cyan-300"
                            : category.accentColor === "purple"
                              ? "text-purple-400 group-hover:text-purple-300"
                              : "text-green-400 group-hover:text-green-300"
                        }`}
                      >
                        {category.category}
                      </h3>
                    </motion.div>

                    {/* Skills list with staggered animations */}
                    <div className="space-y-3 flex-1">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          className="relative group/skill"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {/* Skill item with enhanced hover */}
                          <div className="relative overflow-hidden rounded-lg bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group-hover/skill:border-cyan-500/30">
                            {/* Sliding background effect */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover/skill:opacity-10 transition-all duration-300 transform -translate-x-full group-hover/skill:translate-x-0`}
                            />

                            <div className="relative py-3 px-4 flex items-center justify-between">
                              <span className="text-gray-300 group-hover/skill:text-white transition-colors duration-300 font-medium">
                                {skill}
                              </span>

                              {/* Skill level indicator */}
                              <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      i < 4 ? `bg-gradient-to-r ${category.color}` : "bg-gray-600"
                                    }`}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.2, delay: skillIndex * 0.1 + i * 0.05 }}
                                    viewport={{ once: true }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom accent line */}
                    <div className="mt-6 pt-4 border-t border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-300">
                      <div
                        className={`h-1 bg-gradient-to-r ${category.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional skills showcase */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-300 mb-8">Additional Technologies</h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                "Nmap",
                "Metasploit",
                "Aircrack-ng",
                "Autopsy",
                "Wireshark",
                "Burp Suite",
                "OWASP ZAP",
                "Kali Linux",
                "Windows Server",
                "PowerShell",
                "Bash",
                "Git",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/50 hover:border-cyan-500/50 rounded-full text-gray-300 hover:text-cyan-400 transition-all duration-300 cursor-default text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 bg-gradient-to-b from-gray-900/20 to-black relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-black text-center mb-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            LET'S BUILD THE FUTURE
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Enhanced contact card with sophisticated border */}
              <div className="relative group">
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 p-[1px]">
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 25%, #ec4899 50%, #8b5cf6 75%, #06b6d4 100%)",
                      backgroundSize: "200% 100%",
                      animation: "borderFlow 3s linear infinite",
                    }}
                  />
                  <div className="h-full w-full rounded-2xl bg-gray-900/95 backdrop-blur-xl" />
                </div>

                <div className="relative p-8">
                  <h3 className="text-3xl font-bold text-cyan-400 mb-6">Ready to Innovate Together?</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                    Whether you're looking to revolutionize your industry with AI, build cutting-edge applications, or
                    explore the frontiers of technology, I'm here to turn your vision into reality.
                  </p>

                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: "ankits39229@gmail.com", href: "mailto:ankits39229@gmail.com" },
                      { icon: Linkedin, label: "Connect on LinkedIn", href: "https://linkedin.com/in/ankitkumar" },
                      { icon: Github, label: "Explore My Code", href: "https://github.com/Ankits39229" },
                    ].map((contact, index) => (
                      <motion.a
                        key={index}
                        href={contact.href}
                        className="flex items-center space-x-4 text-gray-300 hover:text-cyan-400 transition-all duration-300 group/link p-3 rounded-lg hover:bg-gray-800/30"
                        whileHover={{ x: 8 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center group-hover/link:shadow-lg group-hover/link:shadow-cyan-500/30 transition-all duration-300">
                          <contact.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg">{contact.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                {/* Enhanced form border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 p-[2px] group-hover:from-cyan-400/50 group-hover:via-purple-500/50 group-hover:to-pink-500/50 transition-all duration-500">
                  <div className="h-full w-full rounded-2xl bg-gray-900/95 backdrop-blur-xl" />
                </div>

                <div className="relative p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <Input
                          placeholder="Your Name"
                          className="bg-gray-800/60 border border-gray-600/50 hover:border-cyan-400/50 focus:border-cyan-400 text-white placeholder-gray-400 h-12 rounded-lg backdrop-blur-sm transition-all duration-300 focus:ring-1 focus:ring-cyan-400/30"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Your Email"
                          className="bg-gray-800/60 border border-gray-600/50 hover:border-purple-400/50 focus:border-purple-400 text-white placeholder-gray-400 h-12 rounded-lg backdrop-blur-sm transition-all duration-300 focus:ring-1 focus:ring-purple-400/30"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="Project Subject"
                        className="bg-gray-800/60 border border-gray-600/50 hover:border-pink-400/50 focus:border-pink-400 text-white placeholder-gray-400 h-12 rounded-lg backdrop-blur-sm transition-all duration-300 focus:ring-1 focus:ring-pink-400/30"
                      />
                    </div>
                    <div className="relative">
                      <Textarea
                        placeholder="Tell me about your vision..."
                        rows={6}
                        className="bg-gray-800/60 border border-gray-600/50 hover:border-cyan-400/50 focus:border-cyan-400 text-white placeholder-gray-400 resize-none rounded-lg backdrop-blur-sm transition-all duration-300 focus:ring-1 focus:ring-cyan-400/30"
                      />
                    </div>
                    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Launch Project Discussion
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800/50 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            © 2024 Ankit Kumar. Securing the digital world, one system at a time.
          </motion.p>
          <motion.div
            className="mt-4 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
          </motion.div>
        </div>
      </footer>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 resume-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              className="relative bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              style={{ cursor: "default" }} // Add explicit cursor styling
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400">Resume Preview</h3>
                  <p className="text-gray-400 text-sm mt-1">Ankit Kumar - Cybersecurity & System Admin</p>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = "/resume.pdf"
                      link.download = "Ankit_Kumar_Resume.pdf"
                      link.click()
                    }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg cursor-hover text-sm font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </motion.button>
                  <motion.button
                    onClick={() => window.open('/resume.pdf', '_blank')}
                    className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg cursor-hover text-sm font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in New Tab</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setShowResumeModal(false)}
                    className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-lg flex items-center justify-center cursor-hover transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-1 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="w-full h-[calc(90vh-130px)] bg-gray-800 rounded-lg overflow-hidden relative">
                  {/* Skip the iframe approach entirely and use direct buttons */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-400">
                    <div className="text-center max-w-md px-6">
                      <div className="mb-8">
                        <div className="w-16 h-16 mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400 w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-cyan-400 mb-2">Resume Options</h3>
                        <p className="text-gray-400 mb-6">Choose how you'd like to view the resume</p>
                      </div>
                      
                      <div className="space-y-4">
                        <Button
                          onClick={() => window.open('/resume.pdf', '_blank')}
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white w-full py-6 text-lg"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Open in New Tab
                        </Button>
                        
                        <Button
                          onClick={() => {
                            const link = document.createElement("a")
                            link.href = "/resume.pdf"
                            link.download = "Ankit_Kumar_Resume.pdf"
                            link.click()
                          }}
                          variant="outline"
                          className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black w-full py-6 text-lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
