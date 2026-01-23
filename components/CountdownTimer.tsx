'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  targetHours?: number
  message?: string
}

export default function CountdownTimer({
  targetHours = 24,
  message = "Oferta especial expira em:"
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Calculate end time (stored in localStorage to persist across refreshes)
    const getEndTime = () => {
      if (typeof window === 'undefined') return Date.now()

      const stored = localStorage.getItem('countdown_end')
      if (stored) {
        return parseInt(stored)
      }
      const end = Date.now() + (targetHours * 60 * 60 * 1000)
      localStorage.setItem('countdown_end', end.toString())
      return end
    }

    const endTime = getEndTime()

    const updateTimer = () => {
      const now = Date.now()
      const difference = endTime - now

      if (difference <= 0) {
        // Timer expired, reset it
        localStorage.removeItem('countdown_end')
        const newEnd = Date.now() + (targetHours * 60 * 60 * 1000)
        localStorage.setItem('countdown_end', newEnd.toString())
        return
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })
    }

    updateTimer()

    // Otimização mobile: atualizar a cada 1s, mas com requestAnimationFrame para economizar bateria
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    if (isMobile) {
      // Mobile: atualizar só quando a página está visível
      let lastUpdate = Date.now()
      let animationFrame: number

      const tick = () => {
        const now = Date.now()
        if (now - lastUpdate >= 1000) {
          updateTimer()
          lastUpdate = now
        }
        animationFrame = requestAnimationFrame(tick)
      }

      animationFrame = requestAnimationFrame(tick)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    } else {
      // Desktop: usar setInterval normal
      const interval = setInterval(updateTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [targetHours, isClient])

  const pad = (num: number) => num.toString().padStart(2, '0')

  // Não renderizar até estar no cliente (SSR safety)
  if (!isClient) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 px-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
        <p className="text-xs sm:text-sm font-semibold text-red-400 uppercase tracking-wider">
          ⚡ {message}
        </p>
        <div className="flex gap-2 sm:gap-3 opacity-50">
          <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-2xl sm:text-3xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-xl">
              00
            </div>
            <span className="text-xs text-text-tertiary mt-1">Horas</span>
          </div>
          <div className="flex items-center text-2xl sm:text-3xl font-bold text-red-400 pb-6">:</div>
          <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-2xl sm:text-3xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-xl">
              00
            </div>
            <span className="text-xs text-text-tertiary mt-1">Minutos</span>
          </div>
          <div className="flex items-center text-2xl sm:text-3xl font-bold text-red-400 pb-6">:</div>
          <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-2xl sm:text-3xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-xl">
              00
            </div>
            <span className="text-xs text-text-tertiary mt-1">Segundos</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4 px-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
      <p className="text-xs sm:text-sm font-semibold text-red-400 uppercase tracking-wider">
        ⚡ {message}
      </p>
      <div className="flex gap-2 sm:gap-3">
        <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
          <div className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-2xl sm:text-3xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-xl">
            {pad(timeLeft.hours)}
          </div>
          <span className="text-xs text-text-tertiary mt-1">Horas</span>
        </div>
        <div className="flex items-center text-2xl sm:text-3xl font-bold text-red-400 pb-6">:</div>
        <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
          <div className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-2xl sm:text-3xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-xl">
            {pad(timeLeft.minutes)}
          </div>
          <span className="text-xs text-text-tertiary mt-1">Minutos</span>
        </div>
        <div className="flex items-center text-2xl sm:text-3xl font-bold text-red-400 pb-6">:</div>
        <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px]">
          <div className="bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-2xl sm:text-3xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-xl md:animate-pulse">
            {pad(timeLeft.seconds)}
          </div>
          <span className="text-xs text-text-tertiary mt-1">Segundos</span>
        </div>
      </div>
    </div>
  )
}
