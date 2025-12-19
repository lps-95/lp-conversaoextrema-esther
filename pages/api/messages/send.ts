import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { sendWhatsAppMessage } from '../../../lib/whatsapp'

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.join(process.cwd(), 'data')
const MSG_FILE = path.join(DATA_DIR, 'messages.json')

async function appendSentMessage(entry: any) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    let current: any[] = []
    try {
      const raw = await fs.readFile(MSG_FILE, 'utf-8')
      current = JSON.parse(raw || '[]')
    } catch {}
    current.push(entry)
    await fs.writeFile(MSG_FILE, JSON.stringify(current, null, 2), 'utf-8')
  } catch (e) {
    console.error('Failed to persist sent message:', e)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { to, body, templateName, templateParams } = req.body || {}
    if (!to) return res.status(400).json({ error: 'Missing to' })

    const clean = String(to).replace(/\D/g, '')
    const payload = templateName
      ? {
          phone: clean,
          message: '',
          type: 'template' as const,
          templateName,
          templateParams: (templateParams || []) as string[],
        }
      : { phone: clean, message: String(body || ''), type: 'text' as const }

    const result = await sendWhatsAppMessage(payload)

    if (!result.success) {
      return res.status(400).json({ success: false, error: result.error })
    }

    // Salvar mensagem enviada no histórico
    const sentMessage = {
      event: 'sent',
      id: result.messageId || `sent_${Date.now()}`,
      from: 'me', // Indica que foi enviada pelo sistema
      to: clean,
      type: templateName ? 'template' : 'text',
      text: body || `Template: ${templateName}`,
      body: body || `Template: ${templateName}`,
      message: body || `Template: ${templateName}`,
      templateName,
      timestamp: new Date().toISOString(),
    }

    // Salvar no histórico (não bloqueante)
    appendSentMessage(sentMessage).catch(() => {})

    return res.status(200).json({
      success: true,
      messageId: result.messageId,
      sentMessage,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return res.status(500).json({ error: msg })
  }
}
