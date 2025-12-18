'use client'

import { ReactNode, useRef } from 'react'

interface CardWithParticlesProps {
  children: ReactNode
  className?: string
}

export default function CardWithParticles({ children, className = '' }: CardWithParticlesProps) {
  const particlesRef = useRef<HTMLDivElement>(null)

  const createParticle = (x: number, y: number) => {
    if (!particlesRef.current) return

    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`)
    particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 100}px`)

    particlesRef.current.appendChild(particle)

    setTimeout(() => particle.remove(), 1000)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create particle occasionally (not on every move)
    if (Math.random() > 0.9) {
      createParticle(x, y)
    }
  }

  return (
    <div
      className={`card-with-particles relative ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
      <div ref={particlesRef} className="particles-container" />

      <style jsx>{`
        .card-with-particles {
          position: relative;
        }
        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
        }
        :global(.particle) {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(232,220,200,0.8), transparent);
          border-radius: 50%;
          pointer-events: none;
          animation: particle-float 1s ease-out forwards;
        }
        @keyframes particle-float {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
          }
        }
      `}</style>
    </div>
  )
}
