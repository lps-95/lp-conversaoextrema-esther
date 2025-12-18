import React, { useEffect, useState } from 'react'

type Props = {
  speed?: number
  className?: string
  children?: React.ReactNode
}

export default function ParallaxLayer({ speed = 0.08, className = '', children }: Props) {
  const [offset, setOffset] = useState(0)
  const [smoothOffset, setSmoothOffset] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce?.matches) return

    let raf: number | null = null
    let targetOffset = 0

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0
      targetOffset = y * speed * -1
    }

    // Smooth interpolation for ultra-smooth parallax
    const animate = () => {
      setSmoothOffset((prev) => {
        const diff = targetOffset - prev
        return prev + diff * 0.1 // Easing factor for smoothness
      })
      raf = requestAnimationFrame(animate)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div
      aria-hidden='true'
      className={className}
      style={{
        transform: `translate3d(0, ${smoothOffset}px, 0)`,
        willChange: 'transform',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  )
}
