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

  // Ler como texto sempre para evitar crashes ao tentar parsear HTML
  const rawText = await response.text().catch(() => '')
  const contentType = response.headers.get('content-type') || ''

  // Tentar parsear JSON quando aplicável
  let parsed: any = null
  if (rawText && contentType.includes('application/json')) {
    try {
      parsed = JSON.parse(rawText)
    } catch {
      // mantém parsed como null
    }
  } else if (rawText) {
    try {
      parsed = JSON.parse(rawText)
    } catch {
      parsed = null
    }
  }

  if (!response.ok) {
    const snippet = rawText ? rawText.slice(0, 200) : ''
    console.error('[Gestão API] Erro ao enviar lead:', {
      status: response.status,
      contentType,
      bodySnippet: snippet,
    })
    throw new Error(
      parsed?.error ||
        `Falha no endpoint de gestão (status ${response.status}). Conteúdo: ${snippet}`
    )
  }

  const result = parsed ?? { success: true }
  console.log('[Gestão API] Lead enviado com sucesso:', result)

  return result
}
