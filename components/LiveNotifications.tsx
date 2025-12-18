'use client'

import { useEffect, useState } from 'react'

interface Notification {
  id: number
  name: string
  action: string
  time: string
  avatar: string
}

const notifications: Omit<Notification, 'id'>[] = [
  { name: "Marina S.", action: "acabou de garantir sua vaga", time: "2 min atrás", avatar: "👩‍💼" },
  { name: "Juliana R.", action: "se inscreveu no plano Premium", time: "5 min atrás", avatar: "👩" },
  { name: "Carla M.", action: "garantiu sua transformação", time: "8 min atrás", avatar: "👱‍♀️" },
  { name: "Patricia L.", action: "escolheu o plano Profissional", time: "12 min atrás", avatar: "👩‍🦰" },
  { name: "Amanda T.", action: "se inscreveu agora", time: "15 min atrás", avatar: "👩‍🦱" },
  { name: "Fernanda K.", action: "garantiu sua vaga", time: "18 min atrás", avatar: "👸" },
  { name: "Beatriz A.", action: "escolheu o plano Premium", time: "22 min atrás", avatar: "👩‍💻" },
  { name: "Renata P.", action: "acabou de se inscrever", time: "25 min atrás", avatar: "🧑‍💼" },
]

export default function LiveNotifications() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let notificationIndex = 0

    const showNotification = () => {
      const notification = {
        ...notifications[notificationIndex],
        id: Date.now()
      }

      setCurrentNotification(notification)
      setIsVisible(true)

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 5000)

      notificationIndex = (notificationIndex + 1) % notifications.length
    }

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(showNotification, 5000)

    // Then show every 12 seconds
    const interval = setInterval(showNotification, 12000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  if (!currentNotification) return null

  return (
    <div
      className={`fixed bottom-24 left-4 sm:left-8 z-40 max-w-[320px] sm:max-w-sm transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0'
        }`}
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300" />

        {/* Notification card */}
        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0c12] border border-green-500/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center text-2xl border border-green-500/30">
              {currentNotification.avatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-text-primary">
                  {currentNotification.name}
                </p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-500/20 text-green-400 border border-green-500/30 whitespace-nowrap">
                  🔥 LIVE
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                {currentNotification.action}
              </p>
              <p className="text-[10px] text-text-tertiary mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currentNotification.time}
              </p>
            </div>
          </div>

          {/* Verified badge */}
          <div className="absolute top-2 right-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
