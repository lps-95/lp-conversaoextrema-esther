import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
}

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if element is already in viewport on mount
    const rect = element.getBoundingClientRect()
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0

    if (isInViewport) {
      // Em mobile: sem delay para carregar instantaneamente
      const isMobile = window.innerWidth < 768
      const actualDelay = isMobile ? 0 : delay
      setTimeout(() => setIsVisible(true), actualDelay)
      return
    }

    // Detectar mobile para ajustar configurações
    const isMobile = window.innerWidth < 768

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Em mobile: sem delay para carregar instantaneamente
          const actualDelay = isMobile ? 0 : delay
          setTimeout(() => setIsVisible(true), actualDelay)
          observer.unobserve(element)
        }
      },
      {
        // Mobile: threshold menor e rootMargin mais generoso (aparece antes de entrar na view)
        threshold: isMobile ? 0.01 : 0.1,
        rootMargin: isMobile ? '100px 0px -50px 0px' : '0px 0px -80px 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  const animationClass = {
    up: 'animate-fade-in-up',
    left: 'animate-fade-in-left',
    right: 'animate-fade-in-right',
    scale: 'animate-scale-in',
  }[direction]

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  )
}
