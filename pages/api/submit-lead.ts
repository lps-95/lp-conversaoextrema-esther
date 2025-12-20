import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'application/json')
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

    console.log('[API][submit-lead] Body recebido:', {
      name,
      email,
      phone:
        typeof phone === 'string' ? `${phone.slice(0, 4)}****` : typeof phone,
      plan,
      bestTime,
      utmSource,
      utmMedium,
      utmCampaign,
      origin,
    })

    // Validação básica
    if (!name || !email || !phone) {
      res.setHeader('Content-Type', 'application/json')
      return res
        .status(400)
        .json({ error: 'Campos obrigatórios: name, email, phone' })
    }

    // Import dinâmico para evitar erro de inicialização do módulo em runtime Edge
    const { sendLeadToGestao } = await import('../../lib/gestaoClientesAPI')

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

    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({
      success: true,
      ...(typeof result === 'object' ? result : {}),
    })
  } catch (error) {
    console.error('[API][submit-lead] Erro:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao processar lead'
    try {
      res.setHeader('Content-Type', 'application/json')
      return res.status(500).json({ error: errorMessage })
    } catch {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: errorMessage }))
      return
    }
  }
}
