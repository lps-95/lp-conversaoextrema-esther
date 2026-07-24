'use client'

import { useEffect, useState } from 'react'
import MagneticButton from './MagneticButton'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      const doc = document.documentElement
      const nearFooter = y + h >= doc.scrollHeight - 320 // esconde perto do rodapé
      // Show after scrolling 800px, hide near footer
      setIsVisible(y > 800 && !nearFooter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <div className="fixed left-4 right-4 z-40 animate-fade-in-up bottom-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="bg-gradient-to-r from-black/95 via-[#0d0c12]/95 to-black/95 backdrop-blur-xl border border-button-primary/30 shadow-2xl rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Message */}
          <div className="text-center sm:text-left">
            <p className="text-sm sm:text-base font-bold text-text-primary">
              🔥 Não perca essa oportunidade!
            </p>
            <p className="text-xs sm:text-sm text-text-secondary">
              Apenas 8 vagas disponíveis este mês
            </p>
          </div>

          {/* CTA */}
          <MagneticButton strength={0.3}>
            <button
              onClick={scrollToForm}
              className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-button-primary to-accent-gold rounded-lg font-bold text-sm sm:text-base text-primary-dark hover:scale-105 transition-transform duration-200 shadow-xl whitespace-nowrap"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300 animate-gradient-x" />
              <span className="relative">
                Garantir Minha Vaga Agora →
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}
