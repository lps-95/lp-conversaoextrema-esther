import { useEffect, useState } from 'react'

interface WhatsAppWidgetProps {
  phone?: string
  message?: string
}

export default function WhatsAppWidget({
  phone = '5548991964517',
  message = 'Olá! Vim da landing page e gostaria de saber mais sobre a mentoria.'
}: WhatsAppWidgetProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Mostrar após 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Pulsar após 10 segundos se não interagiu
    const pulseTimer = setTimeout(() => {
      if (!hasInteracted) {
        setIsExpanded(true)
        setTimeout(() => setIsExpanded(false), 3000)
      }
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(pulseTimer)
    }
  }, [hasInteracted])

  const handleClick = () => {
    setHasInteracted(true)
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')

    // Track evento
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ; (window as any).plausible('whatsapp_widget_click')
    }
  }

  const handleMouseEnter = () => {
    setIsExpanded(true)
    setHasInteracted(true)
  }

  const handleMouseLeave = () => {
    setIsExpanded(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-4 sm:right-6 z-[9998] bottom-[calc(6rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]">
      {/* Tooltip expandido */}
      <div
        className={`absolute bottom-full right-0 mb-4 transition-all duration-300 ${isExpanded
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
      >
        <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-4 w-64 max-w-[calc(100vw-2rem)] relative">
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45" />

          <div className="relative">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-button-primary to-accent-gold flex items-center justify-center">
                <span className="text-xl">👋</span>
              </div>
              <div>
                <p className="font-bold text-sm mb-1">Esther Social Media</p>
                <p className="text-xs text-gray-600">Normalmente responde em minutos</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-3">
              Olá! Tem alguma dúvida sobre nossos planos? Estou aqui para ajudar! 💬
            </p>

            <button
              onClick={handleClick}
              className="w-full bg-[#25D366] hover:bg-[#20BA59] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Conversar no WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Botão flutuante */}
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20BA59] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-slideInRight"
        aria-label="Abrir WhatsApp"
      >
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

        {/* Online badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-4 border-white rounded-full" />

        {/* WhatsApp icon */}
        <svg
          className="w-8 h-8 text-white relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Notification counter (opcional) */}
        {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          1
        </div> */}
      </button>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
