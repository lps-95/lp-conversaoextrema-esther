import { useEffect, useState } from 'react'

type SpotsResponse = {
  spotsLeft: number
  total: number
}

export default function SpotsLeftBar() {
  const [data, setData] = useState<SpotsResponse | null>(null)
  const [hidden, setHidden] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)

  async function fetchSpots() {
    try {
      const res = await fetch('/api/spots')
      if (!res.ok) return
      const json = await res.json()
      setData(json)
    } catch { }
  }

  useEffect(() => {
    fetchSpots()
    const id = setInterval(fetchSpots, 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      const doc = document.documentElement
      setNearFooter(y + h >= doc.scrollHeight - 320)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!data || hidden || nearFooter) return null

  const ratio = Math.max(0, Math.min(1, (data.total - data.spotsLeft) / data.total))

  return (
    <div className="fixed bottom-4 left-4 md:left-auto md:right-28 z-40 w-[min(20rem,90vw)] drop-shadow-xl">
      <div className="relative overflow-hidden rounded-xl border border-button-primary/30 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
        <button
          type="button"
          aria-label="Fechar barra de vagas"
          className="absolute top-2 right-2 text-text-tertiary hover:text-text-primary text-sm"
          onClick={() => setHidden(true)}
        >
          ✕
        </button>
        <div className="px-4 py-3 pr-8">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-text-secondary leading-snug">
              Vagas restantes hoje
            </p>
            <p className="text-sm font-semibold text-button-primary whitespace-nowrap">
              {data.spotsLeft} / {data.total}
            </p>
          </div>
          <div className="mt-2 h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-button-primary to-accent-gold transition-all duration-500"
              style={{ width: `${ratio * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
