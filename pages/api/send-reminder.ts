import type { NextApiRequest, NextApiResponse } from 'next'
import { sendMeetingReminder } from '../../lib/whatsapp'

/**
 * API para enviar lembretes de reunião via WhatsApp
 *
 * Uso:
 * POST /api/send-reminder
 *
 * Body:
 * {
 *   "phone": "5548991964517",
 *   "name": "João Silva",
 *   "date": "22/12/2024",
 *   "time": "14:00"
 * }
 *
 * Resposta:
 * {
 *   "success": true,
 *   "messageId": "wamid.xxx..."
 * }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apenas POST permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Validar autenticação (opcional - adicione se quiser proteger)
  const authToken = req.headers.authorization
  if (authToken !== `Bearer ${process.env.API_SECRET_KEY}`) {
    // Descomente as linhas abaixo se quiser proteger com token
    // return res.status(401).json({ error: 'Unauthorized' })
  }

  const { phone, name, date, time } = req.body

  // Validar campos obrigatórios
  if (!phone || !name || !date || !time) {
    return res.status(400).json({
      error: 'Campos obrigatórios: phone, name, date, time',
      example: {
        phone: '5548991964517',
        name: 'João Silva',
        date: '22/12/2024',
        time: '14:00',
      },
    })
  }

  try {
    console.log('📤 Enviando lembrete de reunião:', { phone, name, date, time })

    const result = await sendMeetingReminder(phone, name, date, time)

    if (result.success) {
      console.log('✅ Lembrete enviado com sucesso:', result.messageId)
      return res.status(200).json({
        success: true,
        messageId: result.messageId,
        message: 'Lembrete enviado com sucesso',
      })
    } else {
      console.error('❌ Erro ao enviar lembrete:', result.error)
      return res.status(500).json({
        success: false,
        error: result.error || 'Erro ao enviar lembrete',
      })
    }
  } catch (error) {
    console.error('❌ Erro crítico ao enviar lembrete:', error)
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    })
  }
}
