import { motion, useReducedMotion } from 'framer-motion'
import { CSSProperties, ReactNode, useEffect, useState } from 'react'

type CommonProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export function MSection({ children, className = '', style, delay = 0 }: CommonProps) {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()
  
  if (reduce) return <div className={className} style={style}>{children}</div>
  
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? '-50%' : '-10%', amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
    >
      {children}
    </motion.div>
  )
}

export function MStagger({ children, className = '', style, delay = 0 }: CommonProps) {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()
  
  if (reduce) return <div className={className} style={style}>{children}</div>
  
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: isMobile ? 0 : delay } },
  }
  
  return (
    <motion.div
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: isMobile ? '-50%' : '-10%', amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function MItem({ children, className = '', style, delay = 0 }: CommonProps) {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()
  
  if (reduce) return <div className={className} style={style}>{children}</div>
  
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: isMobile ? '-50%' : '-10%', amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 140, damping: 20, delay: isMobile ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}
