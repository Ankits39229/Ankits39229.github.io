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
import { FloatingThemeToggle } from "@/components/theme-toggle"

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

  // Simple scroll lock and escape key handling
  useEffect(() => {
    if (showResumeModal) {
      // Lock scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Handle escape key to close modal
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setShowResumeModal(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      // Cleanup
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showResumeModal])
  
  // No longer need PDF loading handlers as we're using direct download links

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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden relative transition-all duration-700 ease-in-out">
      {/* Floating Theme Toggle */}
      <FloatingThemeToggle />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-xl font-bold text-gray-900 dark:text-white"
              whileHover={{ y: -2 }}
            >
              Ankit Kumar
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "skills", "contact"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Resume Button */}
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="https://drive.google.com/uc?export=download&id=1kbhVW_jwXflxY3XN3gzLFWE3DCuaIj-2"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ y: 0 }}
            >
              <div className="w-6 h-6 relative">
                <motion.span
                  className="absolute top-0 left-0 w-full h-0.5 bg-gray-900 dark:bg-white transform origin-center"
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute top-2 left-0 w-full h-0.5 bg-gray-900 dark:bg-white"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute top-4 left-0 w-full h-0.5 bg-gray-900 dark:bg-white transform origin-center"
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-2">
                {["home", "about", "projects", "skills", "contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    {item}
                  </motion.button>
                ))}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href="https://drive.google.com/uc?export=download&id=1kbhVW_jwXflxY3XN3gzLFWE3DCuaIj-2"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-center"
                  >
                    <Download className="w-4 h-4 mr-2 inline" />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <motion.div className="text-center z-10 px-6 max-w-6xl mx-auto relative" style={{ y: backgroundY }}>
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Ankit Kumar
                </span>
              </h1>
              <div className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium tracking-wide">
                <GlitchTypewriter
                  texts={["Cybersecurity Specialist", "System Administrator", "Security Researcher", "IT Professional"]}
                  delay={500}
                />
              </div>
            </div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Dedicated to securing digital environments through{" "}
            <span className="text-blue-400 font-medium">advanced cybersecurity practices</span>,{" "}
            <span className="text-cyan-400 font-medium">comprehensive system administration</span>, and{" "}
            <span className="text-teal-400 font-medium">proactive vulnerability assessment</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium shadow-lg shadow-blue-600/25 transition-all duration-300"
              >
                <span className="flex items-center">
                  <Rocket className="w-5 h-5 mr-2" />
                  View My Work
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 px-8 py-3 rounded-lg text-base font-medium transition-all duration-300"
              >
                <span className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <a
                href="https://drive.google.com/uc?export=download&id=1kbhVW_jwXflxY3XN3gzLFWE3DCuaIj-2"
                className="border-2 border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white px-8 py-3 rounded-lg text-base font-medium transition-all duration-300 inline-flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Professional stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            {[
              { number: "10+", label: "Security Projects" },
              { number: "3+", label: "Years Experience" },
              { number: "25+", label: "Technologies" },
            ].map((stat, index) => (
              <motion.div key={index} className="text-center" whileHover={{ y: -2 }}>
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">{stat.number}</div>
                <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  I'm a dedicated <span className="text-blue-600 dark:text-blue-400 font-medium">cybersecurity specialist</span> and system
                  administrator with a passion for protecting digital environments and mitigating emerging threats.
                  Currently pursuing my B.Tech in Computer Science & Engineering, I bring together academic knowledge with
                  practical experience in vulnerability assessment and incident response.
                </p>
                <p>
                  My expertise encompasses <span className="text-cyan-600 dark:text-cyan-400 font-medium">penetration testing</span>,
                  <span className="text-teal-600 dark:text-teal-400 font-medium"> malware analysis</span>, and
                  <span className="text-blue-600 dark:text-blue-400 font-medium"> system optimization</span>. I've successfully developed
                  comprehensive security tools and led teams in competitive environments, earning recognition for
                  innovative and effective solutions.
                </p>
                <p>
                  I believe that every security challenge presents an opportunity to strengthen defenses, every vulnerability
                  assessment is a step toward a more secure digital landscape, and every incident response is a valuable
                  learning experience that drives continuous improvement.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                {[
                  { icon: Brain, number: "15+", label: "Security Tools Built" },
                  { icon: Cpu, number: "50K+", label: "Lines of Code" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50"
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                      <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Resume Section */}
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <a
                    href="https://drive.google.com/uc?export=download&id=1kbhVW_jwXflxY3XN3gzLFWE3DCuaIj-2"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-blue-600/25 transition-all duration-300 inline-flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </a>
                </motion.div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">Complete professional background & achievements</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">{skill.name}</h3>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore my portfolio of cybersecurity and system administration projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  {/* Image container */}
                  <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700/30 h-48">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Action buttons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 hover:bg-white text-gray-900 border-white/90"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-blue-600/25"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start a Project
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Expertise
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive skills across cybersecurity, system administration, and development
            </p>
          </motion.div>

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
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's discuss how we can work together.
            </p>
          </motion.div>

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
      <footer className="py-12 px-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 dark:text-gray-400">
                © 2024 Ankit Kumar. All rights reserved.
              </p>
            </motion.div>
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Github, href: "https://github.com/Ankits39229", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/ankitkumar", label: "LinkedIn" },
                { icon: Mail, href: "mailto:ankits39229@gmail.com", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Professional Resume Preview Modal - Optimized Centering */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="modal-backdrop">
            {/* Modal Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResumeModal(false)}
              style={{ zIndex: 99990 }}
            />
            
            {/* Modal Content - Perfectly Centered */}
            <div 
              className="modal-overlay" 
              onClick={() => setShowResumeModal(false)}
            >
              <motion.div
                className="modal-container"
                initial={{ scale: 0.9, opacity: 0, y: 0 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Simple Header */}
                <div className="modal-header">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Resume</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Ankit Kumar - Cybersecurity Specialist</p>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    onClick={() => setShowResumeModal(false)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>

                {/* Simple Resume Download Content */}
                <div className="modal-content p-12 flex flex-col items-center justify-center text-center">
                  <div className="mb-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ankit Kumar's Resume</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                      Thank you for your interest in my professional background. Click the button below to download my resume.
                    </p>
                  </div>
                  
                  <motion.a
                    href="https://drive.google.com/uc?export=download&id=1kbhVW_jwXflxY3XN3gzLFWE3DCuaIj-2"
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-6 h-6 mr-3" />
                    Download Resume (PDF)
                  </motion.a>

                  <div className="mt-10 max-w-lg mx-auto">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">Quick Overview</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Education</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">B.Tech Computer Science & Engineering</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Experience</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">3+ Years Cybersecurity Experience</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Expertise</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Penetration Testing & System Administration</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Skills</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Python, Java, Security Tools Expert</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
