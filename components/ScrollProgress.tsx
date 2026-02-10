import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar mobile
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768
    setIsMobile(mobile)

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100

      setScrollProgress(scrolled)
      setIsVisible(scrollPx > 100)
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <>
      {/* Progress bar - Oculto em mobile */}
      {!isMobile && (
        <div className='fixed top-0 left-0 right-0 h-1 bg-black/50 backdrop-blur-sm z-50'>
          <div
            className='h-full bg-gradient-to-r from-button-primary via-accent-gold to-button-primary transition-all duration-150 ease-out'
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='fixed bottom-24 right-8 z-50 group'
          aria-label='Voltar ao topo'
        >
          <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300 animate-gradient-x' />
          <div className='relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-button-primary hover:scale-110 transition-transform duration-200 shadow-2xl'>
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2.5}
                d='M5 10l7-7m0 0l7 7m-7-7v18'
              />
            </svg>
          </div>
        </button>
      )}
    </>
  )
}
