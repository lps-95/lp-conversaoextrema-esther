import type { NextApiRequest, NextApiResponse } from 'next'
import { saveSessionLead } from '../../lib/leadsStore'

/**
 * Endpoint chamado em segundo plano pelo `useLeadForm` — o redirecionamento
 * pro WhatsApp já aconteceu antes dessa chamada terminar (ver
 * `hooks/useLeadForm.ts`). Esse endpoint só existe pra manter um registro
 * dos leads no Supabase; se ele falhar, o cliente já está conversando no
 * WhatsApp normalmente.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

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
      niche,
      followers,
      revenue,
      mainGoal,
      utmSource,
      utmMedium,
      utmCampaign,
      origin,
    } = req.body

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Campos obrigatórios: name, email, phone' })
    }

    const savedLead = await saveSessionLead({
      name,
      email,
      phone,
      plan: plan || undefined,
      bestTime: bestTime || undefined,
      niche: niche || undefined,
      followers: followers || undefined,
      revenue: revenue || undefined,
      mainGoal: mainGoal || undefined,
      utmSource: utmSource || undefined,
      utmMedium: utmMedium || undefined,
      utmCampaign: utmCampaign || undefined,
      origin: origin || 'landing_page_conversao_extrema',
    })

    return res.status(200).json({ success: true, leadId: savedLead.id })
  } catch (error) {
    console.error('[API][submit-lead] Erro:', error)
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Erro ao processar lead' })
  }
}
