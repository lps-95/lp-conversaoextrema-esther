import crypto from 'crypto'

interface LeadData {
  name: string
  email?: string
  phone?: string
  plan?: string
  bestTime?: string
  utmParams?: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
  }
  origin?: string
}

/**
 * Envia lead capturado para o sistema Gestão de Clientes
 */
export async function sendLeadToGestao(leadData: LeadData) {
  // LOG DE DEBUG DAS VARIÁVEIS DE AMBIENTE
  console.log(
    '[DEBUG][sendLeadToGestao] GESTAO_CLIENTES_LEADS_URL:',
    process.env.GESTAO_CLIENTES_LEADS_URL
  )
  console.log(
    '[DEBUG][sendLeadToGestao] GESTAO_CLIENTES_WEBHOOK_SECRET:',
    process.env.GESTAO_CLIENTES_WEBHOOK_SECRET ? '[PRESENTE]' : '[NÃO DEFINIDO]'
  )
  const url = process.env.GESTAO_CLIENTES_LEADS_URL
  const secret = process.env.GESTAO_CLIENTES_WEBHOOK_SECRET

  if (!url || !secret) {
    console.error('GESTAO_CLIENTES_LEADS_URL ou SECRET não configurados')
    throw new Error('Configuração de integração faltando')
  }

  // Validação básica
  if (!leadData.name) {
    throw new Error('Nome é obrigatório')
  }

  if (!leadData.email && !leadData.phone) {
    throw new Error('Email ou telefone é obrigatório')
  }

  // Preparar payload
  const payload = JSON.stringify({
    name: leadData.name,
    email: leadData.email || null,
    phone: leadData.phone || null,
    plan: leadData.plan || null,
    bestTime: leadData.bestTime || null,
    utmParams: leadData.utmParams || {},
    origin: leadData.origin || 'landing_page_conversao_extrema',
  })

  // Calcular HMAC-SHA256 signature
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  console.log('[Gestão API] Enviando lead:', {
    name: leadData.name,
    hasEmail: !!leadData.email,
    hasPhone: !!leadData.phone,
  })

  // Enviar requisição
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': `sha256=${signature}`,
    },
    body: payload,
  })

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: 'Unknown error' }))
    console.error('[Gestão API] Erro ao enviar lead:', error)
    throw new Error(`Erro ao enviar lead: ${response.status}`)
  }

  const result = await response.json()
  console.log('[Gestão API] Lead enviado com sucesso:', result)

  return result
}
