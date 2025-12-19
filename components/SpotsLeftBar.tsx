import { useEffect, useState } from 'react'

type SpotsResponse = {
  spotsLeft: number
  total: number
}

export default function SpotsLeftBar() {
  const [data, setData] = useState<SpotsResponse | null>(null)

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

  if (!data) return null

  const ratio = Math.max(0, Math.min(1, (data.total - data.spotsLeft) / data.total))

  return (
    <div className="fixed bottom-6 right-4 left-auto -translate-x-0 z-40 w-80 max-w-[90vw] drop-shadow-xl">
      <div className="relative overflow-hidden rounded-xl border border-button-primary/30 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
        <div className="px-4 py-3">
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
