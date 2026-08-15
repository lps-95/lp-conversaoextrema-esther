import { getSupabaseAdmin } from './supabaseAdmin'

/**
 * Salva um lead do formulário de agendamento de sessão na tabela
 * `session_leads` do Supabase.
 *
 * Antes isso gravava num arquivo local (`data/leads.jsonl`) — funcionava
 * rodando localmente, mas não em produção na Vercel, onde o sistema de
 * arquivos é temporário e é apagado a cada novo acesso. Usar o mesmo
 * Supabase da newsletter resolve isso (e já estava configurado).
 */
export interface SessionLead {
  name: string
  email: string
  phone: string
  plan?: string
  bestTime?: string
  niche?: string
  followers?: string
  revenue?: string
  mainGoal?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  origin?: string
}

export async function saveSessionLead(lead: SessionLead) {
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from('session_leads')
    .insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      plan: lead.plan || null,
      best_time: lead.bestTime || null,
      niche: lead.niche || null,
      followers: lead.followers || null,
      revenue: lead.revenue || null,
      main_goal: lead.mainGoal || null,
      utm_source: lead.utmSource || null,
      utm_medium: lead.utmMedium || null,
      utm_campaign: lead.utmCampaign || null,
      origin: lead.origin || 'landing_page_conversao_extrema',
    })
    .select('id')
    .single()

  if (error) throw error

  return data
}
