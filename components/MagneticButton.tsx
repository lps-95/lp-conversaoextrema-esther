'use client'

import { ReactNode, useEffect, useRef } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
}

export default function MagneticButton({
  children,
  strength = 0.3,
  className = '',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // Magnetic effect within 150px radius
      if (distance < 150) {
        const pullX = deltaX * strength
        const pullY = deltaY * strength
        button.style.transform = `translate(${pullX}px, ${pullY}px)`
      } else {
        button.style.transform = 'translate(0, 0)'
      }
    }

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0)'
    }

    document.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return (
    <div
      ref={buttonRef}
      className={`magnetic-button inline-block transition-transform duration-300 ease-out ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
