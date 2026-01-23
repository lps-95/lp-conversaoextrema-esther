import { motion, useReducedMotion } from 'framer-motion'
import { CSSProperties, ReactNode, useEffect, useState } from 'react'

type CommonProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
}

function useIsMobileClient() {
  const [isMobileClient, setIsMobileClient] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Importante: Detectar mobile APÓS hidratação
    if (typeof window === 'undefined') return

    // Dar um tick para garantir hidratação
    const detectMobile = () => {
      setIsMobileClient(window.innerWidth < 768)
      setIsHydrated(true)
    }

    // Usar microtask para garantir que hidratação terminou
    Promise.resolve().then(detectMobile)

    // Debounce resize handler para evitar muitos updates
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setIsMobileClient(window.innerWidth < 768)
      }, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return { isMobileClient, isHydrated }
}

export function MSection({ children, className = '', style, delay = 0 }: CommonProps) {
  const reduce = useReducedMotion()
  const { isMobileClient, isHydrated } = useIsMobileClient()

  // Em mobile: renderizar simples sem qualquer animação
  if (!isHydrated || isMobileClient || reduce) {
    return <div className={className} style={style}>{children}</div>
  }

  // Em desktop com suporte a animações
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
    >
      {children}
    </motion.div>
  )
}

export function MStagger({ children, className = '', style, delay = 0 }: CommonProps) {
  const reduce = useReducedMotion()
  const { isMobileClient, isHydrated } = useIsMobileClient()

  // Em mobile: renderizar simples sem qualquer animação
  if (!isHydrated || isMobileClient || reduce) {
    return <div className={className} style={style}>{children}</div>
  }

  const container = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: delay } },
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
    >
      {children}
    </motion.div>
  )
}

export function MItem({ children, className = '', style, delay = 0 }: CommonProps) {
  const reduce = useReducedMotion()
  const { isMobileClient, isHydrated } = useIsMobileClient()

  // Em mobile: renderizar simples sem qualquer animação
  if (!isHydrated || isMobileClient || reduce) {
    return <div className={className} style={style}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ type: 'spring', stiffness: 140, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}
