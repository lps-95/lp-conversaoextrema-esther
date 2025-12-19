import { useEffect, useState } from 'react'

interface ExitIntentPopupProps {
  onClose?: () => void
}

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Verificar se já foi exibido nesta sessão
    const shown = sessionStorage.getItem('exit_intent_shown')
    if (shown) {
      setHasShown(true)
      return
    }

    let mouseLeaveTimeout: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      // Detectar saída pela parte superior (usuário vai fechar aba/voltar)
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        mouseLeaveTimeout = setTimeout(() => {
          setIsVisible(true)
          setHasShown(true)
          sessionStorage.setItem('exit_intent_shown', 'true')
        }, 100)
      }
    }

    const handleMouseEnter = () => {
      clearTimeout(mouseLeaveTimeout)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearTimeout(mouseLeaveTimeout)
    }
  }, [hasShown, isVisible])

  // Timer de urgência
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const handleCTA = () => {
    // Scroll para o formulário
    const formElement = document.getElementById('form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
    handleClose()

    // Track evento
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ; (window as any).plausible('exit_intent_cta_click')
    }
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative max-w-lg w-full bg-gradient-to-br from-[#1a1625] to-[#0f0a1e] border-2 border-button-primary/50 rounded-2xl shadow-2xl animate-scaleIn overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary opacity-20 blur-xl" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-text-tertiary hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative p-8 sm:p-10">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-button-primary to-accent-gold mb-4">
              <svg className="w-10 h-10 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Headline */}
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent">
              Espere! Não Perca Esta Oportunidade
            </span>
          </h3>

          <p className="text-text-secondary text-center mb-6">
            Você está a <strong className="text-button-primary">um clique</strong> de transformar seu Instagram em uma máquina de vendas automática.
          </p>

          {/* Benefits list */}
          <div className="space-y-3 mb-6">
            {[
              '✅ Primeira consultoria GRÁTIS',
              '✅ Diagnóstico completo do seu perfil',
              '✅ Plano personalizado em 24h'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-text-primary">
                <span className="text-button-primary text-lg">{benefit.split(' ')[0]}</span>
                <span>{benefit.substring(2)}</span>
              </div>
            ))}
          </div>

          {/* Timer */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-red-400">
              <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-lg">
                Esta oferta expira em: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleCTA}
            className="group relative w-full mb-3"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-lg py-4 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow-xl">
              Sim! Quero Aproveitar Esta Oferta
              <span className="ml-2">→</span>
            </div>
          </button>

          {/* Secondary action */}
          <button
            onClick={handleClose}
            className="w-full text-text-tertiary hover:text-text-secondary text-sm transition-colors"
          >
            Não, obrigado. Prefiro continuar perdendo vendas.
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
