'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  scale: number
  opacity: number
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [isPointer, setIsPointer] = useState(false)
  const [particleId, setParticleId] = useState(0)

  useEffect(() => {
    let animationFrame: number
    let lastTime = Date.now()
    let lastParticleTime = Date.now()

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer'
      setIsPointer(isInteractive)

      // Create particle trail
      const now = Date.now()
      if (now - lastParticleTime > 30) {
        // Create particle every 30ms
        lastParticleTime = now
        setParticles((prev) => [
          ...prev,
          {
            id: particleId,
            x: e.clientX,
            y: e.clientY,
            scale: 1,
            opacity: 1,
          },
        ])
        setParticleId((prev) => prev + 1)
      }
    }

    const updateParticles = () => {
      const now = Date.now()
      const delta = now - lastTime
      lastTime = now

      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            scale: particle.scale - delta * 0.002,
            opacity: particle.opacity - delta * 0.003,
          }))
          .filter((particle) => particle.opacity > 0)
      )

      animationFrame = requestAnimationFrame(updateParticles)
    }

    window.addEventListener('mousemove', handleMouseMove)
    updateParticles()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [particleId])

  // Hide on mobile
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) {
      document.documentElement.style.setProperty('--custom-cursor-display', 'none')
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        @media (min-width: 769px) {
          body {
            cursor: none !important;
          }
          a, button, [role="button"], input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute top-0 left-0 w-10 h-10 border-2 border-button-primary/50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${isPointer ? 'scale-150 border-accent-gold' : 'scale-100'
            }`}
          style={{
            background: isPointer
              ? 'radial-gradient(circle, rgba(232,220,200,0.2), transparent)'
              : 'transparent',
          }}
        />

        {/* Inner dot */}
        <div
          className={`absolute top-0 left-0 w-2 h-2 bg-gradient-to-br from-button-primary to-accent-gold rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ${isPointer ? 'scale-0' : 'scale-100'
            }`}
          style={{
            boxShadow: '0 0 20px rgba(232,220,200,0.8)',
          }}
        />
      </div>

      {/* Particle trail */}
      <div className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-br from-button-primary to-accent-gold rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: `translate(-50%, -50%) scale(${particle.scale})`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${10 * particle.scale}px rgba(232,220,200,${particle.opacity * 0.6})`,
            }}
          />
        ))}
      </div>
    </>
  )
}
