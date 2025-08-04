"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

const EtherealMaterial = shaderMaterial(
  { uTime: 0, uMouse: new THREE.Vector2() },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    // 2D Random
    float random (vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))*
            43758.5453123);
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    float noise (vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    void main() {
      vec2 st = vUv;
      
      // Create flowing effect
      vec2 flow = vec2(
        noise(st * 3.0 + uTime * 0.5) * 2.0 - 1.0,
        noise(st * 3.0 + uTime * 0.3 + 100.0) * 2.0 - 1.0
      );
      
      // Add mouse interaction
      vec2 mouseInfluence = (uMouse - st) * 0.5;
      flow += mouseInfluence;
      
      // Multiple layers of noise for complexity
      float n1 = noise(st * 4.0 + flow * 0.5 + uTime * 0.2);
      float n2 = noise(st * 8.0 + flow * 0.3 + uTime * 0.3);
      float n3 = noise(st * 16.0 + flow * 0.1 + uTime * 0.4);
      
      float finalNoise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
      
      // Create color gradient
      vec3 color1 = vec3(0.2, 0.6, 1.0); // Blue
      vec3 color2 = vec3(0.8, 0.3, 1.0); // Purple
      vec3 color3 = vec3(1.0, 0.5, 0.7); // Pink
      
      vec3 color = mix(color1, color2, finalNoise);
      color = mix(color, color3, smoothstep(0.3, 0.7, finalNoise));
      
      // Add some transparency based on noise
      float alpha = smoothstep(0.2, 0.8, finalNoise) * 0.8;
      
      gl_FragColor = vec4(color, alpha);
    }
  `,
)

extend({ EtherealMaterial })

function Scene() {
  const materialRef = useRef<any>()
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime
      materialRef.current.uMouse.x = state.mouse.x * 0.5 + 0.5
      materialRef.current.uMouse.y = state.mouse.y * 0.5 + 0.5
    }
  })

  return (
    <mesh ref={meshRef} scale={[4, 4, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <etherealMaterial ref={materialRef} transparent />
    </mesh>
  )
}

const EtherealScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (typeof window !== 'undefined') {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resizeCanvas()
    
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", resizeCanvas)
    }

    let time = 0
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / canvas.width
      mouseY = (e.clientY - rect.top) / canvas.height
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      time += 0.01

      // Clear with dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create flowing particles
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time + i) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(time * 0.7 + i) * 0.5 + 0.5) * canvas.height
        
        const size = Math.sin(time * 2 + i) * 2 + 3
        const opacity = Math.sin(time + i) * 0.5 + 0.5
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${100 + Math.sin(i) * 155}, ${150 + Math.cos(i) * 105}, 255, ${opacity * 0.6})`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", resizeCanvas)
      }
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Floating particles for extra depth */}
      {isClient && [...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-70"
          animate={{
            x: [0, 1920],
            y: [
              (i * 50) % 800, 
              ((i + 5) * 50) % 800
            ],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default EtherealScene
