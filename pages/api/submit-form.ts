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
    const body = req.body

    // UTM params podem vir do body ou cookies (ajuste conforme necessário)
    const utmParams = {
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      utm_term: body.utm_term,
      utm_content: body.utm_content,
    }

    // Envia para Gestão de Clientes
    const gestaoResult = await sendLeadToGestao({
      name: body.name,
      email: body.email,
      phone: body.phone,
      plan: body.plan,
      bestTime: body.bestTime,
      utmParams,
      origin: 'landing_page_conversao_extrema',
    })

    return res.status(200).json({
      success: true,
      gestaoResult,
      message: 'Lead enviado com sucesso para Gestão',
    })
  } catch (error: any) {
    console.error('Erro ao processar formulário:', error)
    return res
      .status(500)
      .json({
        success: false,
        error: error.message || 'Erro ao processar formulário',
      })
  }
}
