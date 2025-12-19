import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.join(process.cwd(), 'data')
const MSG_FILE = path.join(DATA_DIR, 'messages.json')

async function readAll() {
  try {
    const raw = await fs.readFile(MSG_FILE, 'utf-8')
    return JSON.parse(raw || '[]') as any[]
  } catch {
    return []
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { phone, limit } = req.query
  const max = Math.min(Number(limit) || 100, 500)

  const items = await readAll()
  const filtered = phone
    ? items.filter((m) => m.from === phone || m.recipient_id === phone)
    : items
  // sort by timestamp desc when possible
  filtered.sort((a, b) => {
    const ta = new Date(a.timestamp || a.time || 0).getTime()
    const tb = new Date(b.timestamp || b.time || 0).getTime()
    return tb - ta
  })

  return res.status(200).json({ items: filtered.slice(0, max) })
}
