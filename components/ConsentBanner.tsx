import { useEffect, useState } from 'react'

export function loadPlausible(domain: string) {
  if (!domain) return
  if (typeof window === 'undefined') return
  if ((window as any).plausible) return

  const s = document.createElement('script')
  s.setAttribute('defer', '')
  s.setAttribute('data-domain', domain)
  s.src = 'https://plausible.io/js/plausible.js'
  document.head.appendChild(s)
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const c = localStorage.getItem('ce_consent')
      if (!c) setVisible(true)
    } catch (e) {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem('ce_consent', 'accepted')
      loadPlausible(
        process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'seu-dominio.com'
      )
    } catch (e) { }
    setVisible(false)
  }

  function decline() {
    try {
      localStorage.setItem('ce_consent', 'declined')
    } catch (e) { }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className='fixed inset-x-4 bottom-6 z-50 animate-slide-up'>
      <div className='max-w-2xl mx-auto bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.3)] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='text-sm text-gray-800 font-medium'>
          Usamos análises para melhorar a experiência. Aceita o uso de cookies
          analíticos (Plausible)?
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-6 flex items-center space-x-3'>
          <button
            onClick={decline}
            className='px-4 py-2.5 rounded-lg border-2 border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200'
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className='px-6 py-2.5 rounded-lg bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-200'
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
