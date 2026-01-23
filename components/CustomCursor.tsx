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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar mobile e desabilitar cursor customizado
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768
    setIsMobile(mobile)

    if (mobile) return // CustomCursor desativado em mobile

    let animationFrame: number
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

      // Create particle trail - com limite máximo
      const now = Date.now()
      if (now - lastParticleTime > 30) {
        lastParticleTime = now
        setParticles((prev) => {
          // Manter máximo de 20 partículas
          const updated = [
            ...prev,
            {
              id: particleId,
              x: e.clientX,
              y: e.clientY,
              scale: 1,
              opacity: 1,
            },
          ]
          return updated.length > 20 ? updated.slice(-20) : updated
        })
        setParticleId((prev) => prev + 1)
      }
    }

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            scale: p.scale * 0.92,
            opacity: p.opacity * 0.92,
          }))
          .filter((p) => p.opacity > 0.05)
      )

      animationFrame = requestAnimationFrame(updateParticles)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animationFrame = requestAnimationFrame(updateParticles)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  // Mobile: não renderizar cursor customizado
  if (isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className='fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-screen'
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: 0.7,
        }}
      />

      {/* Outer ring */}
      <div
        className='fixed w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-screen'
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isPointer ? 0.3 : 0.2,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Particles trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className='fixed w-1 h-1 bg-accent-gold rounded-full pointer-events-none z-40'
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(-50%, -50%) scale(${p.scale})`,
            opacity: p.opacity * 0.5,
          }}
        />
      ))}
    </>
  )
}
