import { createHash } from 'crypto'

/**
 * API de Conversões (Conversions API / CAPI) do Meta — envia o evento de
 * conversão direto do SERVIDOR pro Meta, em paralelo ao Pixel do
 * navegador. Existe porque o Pixel sozinho perde eventos: ad-block,
 * Safari/iOS cortando cookies de terceiros, JavaScript desabilitado, etc.
 * Mandar os dois (Pixel + CAPI) com o MESMO `event_id` faz o Meta
 * deduplicar — é o "Custo Median 30.5% mais baixo por resultado" que
 * aparece no Gerenciador de Eventos.
 *
 * Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN
const GRAPH_API_VERSION = 'v21.0'

function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

/** Telefone brasileiro sem DDI precisa do código do país (55) pro Meta casar com a conta do usuário. */
function normalizePhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '')
  if (digits.startsWith('55') && digits.length >= 12) return digits
  return `55${digits}`
}

export interface LeadCapiEvent {
  eventId: string
  email: string
  phone: string
  firstName?: string
  eventSourceUrl: string
  clientIp?: string
  userAgent?: string
  fbp?: string
  fbc?: string
}

/**
 * Envia o evento `Lead` pra API de Conversões. Nunca lança erro pro
 * chamador — se o Meta estiver fora do ar ou o token estiver errado, isso
 * não pode derrubar o salvamento do lead no Supabase, que é a parte
 * crítica do endpoint.
 */
export async function sendLeadCapiEvent(event: LeadCapiEvent): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('[metaConversionsApi] NEXT_PUBLIC_META_PIXEL_ID ou META_CONVERSIONS_API_TOKEN ausente — evento CAPI não enviado.')
    return
  }

  try {
    const userData: Record<string, string | string[]> = {
      em: [sha256(event.email)],
      ph: [sha256(normalizePhone(event.phone))],
    }
    if (event.firstName) userData.fn = [sha256(event.firstName)]
    if (event.clientIp) userData.client_ip_address = event.clientIp
    if (event.userAgent) userData.client_user_agent = event.userAgent
    if (event.fbp) userData.fbp = event.fbp
    if (event.fbc) userData.fbc = event.fbc

    const body = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: event.eventId,
          event_source_url: event.eventSourceUrl,
          action_source: 'website',
          user_data: userData,
        },
      ],
    }

    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('[metaConversionsApi] Meta rejeitou o evento:', response.status, errorBody)
    }
  } catch (error) {
    console.error('[metaConversionsApi] Falha ao enviar evento pra API de Conversões:', error)
  }
}
