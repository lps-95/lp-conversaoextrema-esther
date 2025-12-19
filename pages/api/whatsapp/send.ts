import { sendWhatsAppMessage } from '@/lib/whatsapp'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  success?: boolean
  messageId?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Apenas POST permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  // Validar token de segurança (evitar spam)
  const apiKey = req.headers['x-api-key']
  const validKey = process.env.WHATSAPP_API_KEY

  if (!validKey || apiKey !== validKey) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const {
      phone,
      message,
      type = 'text',
      templateName,
      templateParams,
    } = req.body

    // Validar campos obrigatórios
    if (!phone) {
      return res.status(400).json({ error: 'Campo "phone" obrigatório' })
    }

    if (!message && type === 'text') {
      return res.status(400).json({ error: 'Campo "message" obrigatório' })
    }

    if (!templateName && type === 'template') {
      return res.status(400).json({ error: 'Campo "templateName" obrigatório' })
    }

    // Enviar mensagem
    const result = await sendWhatsAppMessage({
      phone,
      message,
      type,
      templateName,
      templateParams,
    })

    if (!result.success) {
      return res.status(400).json({ error: result.error })
    }

    return res.status(200).json({
      success: true,
      messageId: result.messageId,
    })
  } catch (error) {
    console.error('Send message API error:', error)
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : 'Erro interno do servidor',
    })
  }
}
