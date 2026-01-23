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
  const [isMountedClient, setIsMountedClient] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Garantir que só executa no cliente
  useEffect(() => {
    setIsMountedClient(true)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element || !isMountedClient) return

    // Em mobile: mostrar imediatamente sem delay
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    if (isMobile) {
      setIsVisible(true)
      return
    }

    // Em desktop: usar IntersectionObserver normal
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Usar ref para evitar memory leak
          timeoutRef.current = setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [delay, isMountedClient])

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
