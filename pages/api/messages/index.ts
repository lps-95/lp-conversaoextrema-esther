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

  const { phone, limit, order = 'desc' } = req.query
  const max = Math.min(Number(limit) || 100, 500)

  const items = await readAll()

  // Filtrar por telefone se fornecido
  const filtered = phone
    ? items.filter((m) => {
        const msgPhone = m.from === 'me' ? m.to : m.from
        return msgPhone === phone || m.recipient_id === phone
      })
    : items

  // Ordenar por timestamp
  filtered.sort((a, b) => {
    const ta = new Date(a.timestamp || a.time || 0).getTime()
    const tb = new Date(b.timestamp || b.time || 0).getTime()
    return order === 'asc' ? ta - tb : tb - ta
  })

  // Se não filtrou por telefone, retornar lista de conversas únicas
  if (!phone) {
    const conversations = new Map<string, any>()

    filtered.forEach((msg) => {
      const phoneNumber = msg.from === 'me' ? msg.to : msg.from
      if (!phoneNumber || phoneNumber === 'me') return

      const existing = conversations.get(phoneNumber)
      const msgTime = new Date(msg.timestamp || msg.time || 0).getTime()

      if (!existing || msgTime > new Date(existing.timestamp || 0).getTime()) {
        conversations.set(phoneNumber, {
          phone: phoneNumber,
          name: msg.name || 'Cliente',
          lastMessage: msg.text || msg.body || msg.message || 'Sem texto',
          timestamp: msg.timestamp || msg.time,
          unread: msg.from !== 'me' && !msg.read, // Marcar como não lida se veio do cliente
        })
      }
    })

    return res.status(200).json({
      conversations: Array.from(conversations.values()).sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    })
  }

  return res.status(200).json({
    items: filtered.slice(0, max),
    total: filtered.length,
  })
}
