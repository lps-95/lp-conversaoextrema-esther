import type { NextApiRequest, NextApiResponse } from 'next'
import { saveLeadLocally } from '../../lib/leadsStore'

/**
 * Endpoint chamado em segundo plano pelo `useLeadForm` — o redirecionamento
 * pro WhatsApp já aconteceu antes dessa chamada terminar. Esse endpoint só
 * existe pra você manter um registro dos leads; se ele falhar, o cliente
 * já está conversando no WhatsApp normalmente.
 *
 * Passos:
 * 1. Salva o lead localmente (`lib/leadsStore.ts`) — sempre.
 * 2. Se `GESTAO_CLIENTES_LEADS_URL` e `GESTAO_CLIENTES_WEBHOOK_SECRET`
 *    estiverem configurados, também tenta enviar pra sua API de gestão de
 *    clientes (opcional — uma falha aqui não afeta a resposta).
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

    const savedLead = await saveLeadLocally({
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

    const gestaoConfigured = Boolean(
      process.env.GESTAO_CLIENTES_LEADS_URL && process.env.GESTAO_CLIENTES_WEBHOOK_SECRET
    )

    if (gestaoConfigured) {
      try {
        const { sendLeadToGestao } = await import('../../lib/gestaoClientesAPI')
        await sendLeadToGestao({
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
      } catch (gestaoError) {
        console.error('[API][submit-lead] Falha ao enviar para a API de gestão (lead já salvo local):', gestaoError)
      }
    }

    return res.status(200).json({ success: true, leadId: savedLead.id })
  } catch (error) {
    console.error('[API][submit-lead] Erro:', error)
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Erro ao processar lead' })
  }
}
