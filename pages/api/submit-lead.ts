import type { NextApiRequest, NextApiResponse } from 'next'
import { sendLeadToGestao } from '../../lib/gestaoClientesAPI'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      name,
      email,
      phone,
      plan,
      bestTime,
      utmSource,
      utmMedium,
      utmCampaign,
      origin,
    } = req.body

    // Validação básica
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ error: 'Campos obrigatórios: name, email, phone' })
    }

    // Enviar para o painel de gestão
    const result = await sendLeadToGestao({
      name,
      email,
      phone,
      plan: plan || undefined,
      bestTime: bestTime || undefined,
      utmParams: {
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
      },
      origin: origin || 'landing_page_conversao_extrema',
    })

    return res.status(200).json({
      success: true,
      clientId: result.clientId,
      action: result.action,
    })
  } catch (error) {
    console.error('[API][submit-lead] Erro:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao processar lead'
    return res.status(500).json({ error: errorMessage })
  }
}
