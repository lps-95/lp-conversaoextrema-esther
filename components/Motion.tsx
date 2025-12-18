import { motion, useReducedMotion } from 'framer-motion'
import { CSSProperties, ReactNode } from 'react'

type CommonProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
}

export function MSection({ children, className = '', style, delay = 0 }: CommonProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className} style={style}>{children}</div>
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
  if (reduce) return <div className={className} style={style}>{children}</div>
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
  if (reduce) return <div className={className} style={style}>{children}</div>
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
