import type { NextApiRequest, NextApiResponse } from 'next'
import { sendWhatsAppMessage } from '../../../lib/whatsapp'

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
    return res.status(200).json({ success: true, messageId: result.messageId })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return res.status(500).json({ error: msg })
  }
}
