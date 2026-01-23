import React, { useEffect, useState } from 'react'

type Props = {
  speed?: number
  className?: string
  children?: React.ReactNode
}

export default function ParallaxLayer({ speed = 0.08, className = '', children }: Props) {
  const [smoothOffset, setSmoothOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Detectar mobile e desabilitar parallax
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)

    if (mobile) return // Parallax desativado em mobile

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce?.matches) return

    let raf: number | null = null
    let targetOffset = 0
    let isScrolling = false

    const onScroll = () => {
      if (!isScrolling) {
        isScrolling = true
        const y = window.scrollY || window.pageYOffset || 0
        targetOffset = y * speed * -1
      }
    }

    // Smooth interpolation - rodando só quando necessário
    const animate = () => {
      setSmoothOffset((prev) => {
        const diff = targetOffset - prev
        if (Math.abs(diff) < 0.5) {
          isScrolling = false
          return targetOffset
        }
        return prev + diff * 0.1
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

  // Mobile: render sem transform
  if (isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      aria-hidden='true'
      className={className}
      style={{
        transform: `translate3d(0, ${smoothOffset}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
