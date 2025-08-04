"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedGlow() {
  const [isClient, setIsClient] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    size: { width: number; height: number }
    position: { left: string; top: string }
    color: string
    animation: {
      duration: number
      delay: number
      movement: { x: number; y: number }
    }
  }>>([])

  useEffect(() => {
    setIsClient(true)
    
    // Generate particles only on client side
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: {
        width: Math.random() * 4 + 1,
        height: Math.random() * 4 + 1,
      },
      position: {
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
      },
      color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, 0.6)`,
      animation: {
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 4,
        movement: {
          x: Math.random() * 200 - 100,
          y: -200,
        },
      },
    }))
    
    setParticles(particleArray)
  }, [])

  if (!isClient) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden bg-transparent">
        {/* Static fallback content */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute w-96 h-96 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(106, 13, 173, 0.4) 0%, transparent 70%)",
              filter: "blur(40px)",
              left: "10%",
              top: "20%",
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(50px)",
              right: "10%",
              bottom: "20%",
            }}
          />
          <div 
            className="absolute w-64 h-64 rounded-full opacity-25"
            style={{
              background: "radial-gradient(circle, rgba(74, 14, 78, 0.3) 0%, transparent 70%)",
              filter: "blur(30px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-transparent">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute rounded-full opacity-20"
        style={{
          width: "24rem",
          height: "24rem",
          background: "radial-gradient(circle, rgba(106, 13, 173, 0.4) 0%, transparent 70%)",
          filter: "blur(40px)",
          left: "10%",
          top: "20%",
        }}
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute rounded-full opacity-15"
        style={{
          width: "20rem",
          height: "20rem",
          background: "radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, transparent 70%)",
          filter: "blur(50px)",
          right: "10%",
          bottom: "20%",
        }}
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute rounded-full opacity-25"
        style={{
          width: "16rem",
          height: "16rem",
          background: "radial-gradient(circle, rgba(74, 14, 78, 0.3) 0%, transparent 70%)",
          filter: "blur(30px)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          x: [0, 150, 0],
          y: [0, -100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size.width}px`,
            height: `${particle.size.height}px`,
            background: `radial-gradient(circle, ${particle.color} 0%, transparent 100%)`,
            left: particle.position.left,
            top: particle.position.top,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, particle.animation.movement.y, 0],
            x: [0, particle.animation.movement.x, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: particle.animation.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.animation.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
