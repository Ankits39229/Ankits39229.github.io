"use client"

import { useEffect, useRef } from "react"

export function SimpleAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Optimized stars - fewer but more visible
    const stars: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      baseOpacity: number
    }> = []

    // Floating particles with more movement
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
    }> = []

    // Create fewer stars for better performance
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: 1,
        baseOpacity: Math.random() * 0.8 + 0.2,
      })
    }

    // Create moving particles
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        hue: Math.random() * 60 + 200, // Blue to purple range
      })
    }

    let time = 0
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) * 0.001 // Convert to seconds
      lastTime = currentTime
      time += deltaTime

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw twinkling stars with movement
      stars.forEach((star) => {
        // Gentle movement
        star.x += star.vx
        star.y += star.vy

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        // Twinkling effect
        star.opacity = star.baseOpacity * (0.7 + 0.3 * Math.sin(time * 3 + star.x * 0.01))

        ctx.save()
        ctx.globalAlpha = star.opacity
        ctx.fillStyle = "#ffffff"
        ctx.shadowColor = "#ffffff"
        ctx.shadowBlur = star.size
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw moving colored particles
      particles.forEach((particle) => {
        // Dynamic movement with wave patterns
        particle.x += particle.vx + Math.sin(time * 0.5 + particle.y * 0.01) * 0.5
        particle.y += particle.vy + Math.cos(time * 0.3 + particle.x * 0.01) * 0.3

        // Wrap around screen
        if (particle.x < -20) particle.x = canvas.width + 20
        if (particle.x > canvas.width + 20) particle.x = -20
        if (particle.y < -20) particle.y = canvas.height + 20
        if (particle.y > canvas.height + 20) particle.y = -20

        // Pulsing opacity
        const pulseOpacity = particle.opacity * (0.8 + 0.2 * Math.sin(time * 2 + particle.x * 0.02))

        ctx.save()
        ctx.globalAlpha = pulseOpacity
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`
        ctx.shadowBlur = particle.size * 2
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: "linear-gradient(to bottom, #0f0f23 0%, #1a1a3a 50%, #0f0f23 100%)",
        zIndex: -1
      }}
    />
  )
}
