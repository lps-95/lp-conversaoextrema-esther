import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { currentDateKey, kvGetNumber } from '../../lib/kv'

type Data = { spotsLeft: number; total: number }

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'leads.json')
const TZ = 'America/Sao_Paulo'

function getSpotsTotal() {
  const val = process.env.SPOTS_PER_DAY
  const parsed = val ? parseInt(val, 10) : NaN
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 8
}

function dateKeyFor(input: Date | string | number, tz = TZ) {
  const date = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(date.getTime())) return ''

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== 'literal') acc[p.type] = p.value
      return acc
    }, {})

  return `${parts.year}-${parts.month}-${parts.day}`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const total = getSpotsTotal()

  try {
    // 1) Tenta obter contagem persistente via KV
    const todayKey = `leads:${currentDateKey(TZ)}`
    const kv = await kvGetNumber(todayKey)

    if (kv.ok && typeof kv.value === 'number') {
      const todayCount = Math.max(0, kv.value)
      const spotsLeft = Math.max(0, total - todayCount)
      return res.status(200).json({ spotsLeft, total })
    }

    // 2) Fallback: contar pelo arquivo local (ambiente dev)
    const raw = await fs.readFile(DATA_FILE, 'utf-8').catch(() => '[]')
    const list = JSON.parse(raw || '[]') as Array<{
      timestamp?: string
      date?: string
    }>

    const today = currentDateKey(TZ)
    const todayCount = list.filter((item) => {
      if (item.timestamp) {
        return dateKeyFor(item.timestamp, TZ) === today
      }
      if (item.date) {
        // Support legacy pt-BR date like 18/12/2025 12:34:56
        const [datePart] = String(item.date).split(' ')
        const [dd, mm, yyyy] = datePart.split('/')
        if (dd && mm && yyyy) {
          const d = new Date(
            parseInt(yyyy, 10),
            parseInt(mm, 10) - 1,
            parseInt(dd, 10)
          )
          return dateKeyFor(d, TZ) === today
        }
      }
      return false
    }).length

    const spotsLeft = Math.max(0, total - todayCount)
    return res.status(200).json({ spotsLeft, total })
  } catch (e) {
    // On error, return full availability to avoid blocking UX
    return res.status(200).json({ spotsLeft: total, total })
  }
}
