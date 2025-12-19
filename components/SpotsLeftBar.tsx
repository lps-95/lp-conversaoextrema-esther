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
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md">
      <div className="relative overflow-hidden rounded-2xl border border-button-primary/30 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
        <div className="px-5 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Vagas restantes hoje
            </p>
            <p className="text-sm font-semibold text-button-primary">
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
