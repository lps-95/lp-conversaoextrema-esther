/**
 * Wrapper para o Pixel de Conversão do Meta (Facebook/Instagram Ads).
 *
 * Segue o mesmo padrão de `loadPlausible` (ver `components/ConsentBanner.tsx`):
 * só carrega depois que o visitante aceita cookies analíticos no banner de
 * consentimento (LGPD), então nunca dispara sem consentimento.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function loadMetaPixel() {
  if (!PIXEL_ID) return
  if (typeof window === 'undefined') return
  if ((window as any).fbq) return

  ; (function (f: any, b: Document, e: string, v: string) {
    let n: any
    let t: HTMLScriptElement
    let s: Element
    if (f.fbq) return
    n = f.fbq = function (...args: any[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e) as HTMLScriptElement
    t.async = true
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode?.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  ; (window as any).fbq('init', PIXEL_ID)
  ; (window as any).fbq('track', 'PageView')
}

/**
 * Advanced Matching manual: reenviar o `init` com dados de contato (nome,
 * e-mail, telefone) assim que o visitante os informar (ex: ao preencher o
 * formulário). O SDK do próprio Pixel faz o hash (SHA-256) desses valores
 * no navegador antes de mandar pro Meta — a gente nunca manda em texto
 * puro. Isso melhora a "qualidade de correspondência de eventos" (Event
 * Match Quality) no Gerenciador de Eventos, o que é o que reduz custo por
 * resultado nas campanhas.
 *
 * Documentação: https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching
 */
export function setAdvancedMatching(userData: {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
}) {
  try {
    if (typeof window === 'undefined' || !(window as any).fbq || !PIXEL_ID) return

    const matchData: Record<string, string> = {}
    if (userData.email) matchData.em = userData.email.trim().toLowerCase()
    if (userData.phone) matchData.ph = normalizePhoneForMeta(userData.phone)
    if (userData.firstName) matchData.fn = userData.firstName.trim().toLowerCase()
    if (userData.lastName) matchData.ln = userData.lastName.trim().toLowerCase()

    if (Object.keys(matchData).length === 0) return

    ; (window as any).fbq('init', PIXEL_ID, matchData)
  } catch {
    // Falha de tracking nunca deve quebrar a experiência do usuário
  }
}

/**
 * Telefone brasileiro sem DDI (ex: "48991964517", vindo do
 * `whatsapp.replace(/\D/g, '')`) precisa do código do país (55) na frente
 * pro Meta reconhecer — sem isso o Advanced Matching/API de Conversões não
 * casa o número com a conta do usuário no Facebook/Instagram.
 */
export function normalizePhoneForMeta(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '')
  if (digits.startsWith('55') && digits.length >= 12) return digits
  return `55${digits}`
}

/**
 * Lê os cookies `_fbp` (Facebook Browser ID) e `_fbc` (Facebook Click ID,
 * só existe se o visitante veio de um anúncio com `fbclid` na URL) que o
 * próprio Pixel cria no navegador. Mandar esses dois valores pro servidor
 * (junto com o lead) é o que permite a API de Conversões casar o evento
 * server-side com a mesma sessão de navegador — sem isso, o Meta trata
 * como um evento "solto", com qualidade de correspondência bem pior.
 */
export function getFbCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === 'undefined') return {}
  const cookies = document.cookie.split(';').reduce<Record<string, string>>((acc, part) => {
    const [key, ...rest] = part.trim().split('=')
    if (key) acc[key] = rest.join('=')
    return acc
  }, {})
  return { fbp: cookies['_fbp'], fbc: cookies['_fbc'] }
}

/**
 * Dispara um evento de conversão do Pixel (padrão do Meta, ex: 'Lead',
 * 'Contact', 'Purchase', ou um evento customizado). Não faz nada se o
 * Pixel ainda não foi carregado (visitante não deu consentimento) — o
 * `try/catch` garante que falha de tracking nunca quebra a experiência.
 *
 * `eventId` é opcional e deve ser o MESMO id usado no evento equivalente
 * enviado pela API de Conversões (server-side) pro Meta deduplicar os dois
 * e não contar a mesma conversão duas vezes.
 */
export function trackPixelEvent(
  eventName: string,
  params?: Record<string, unknown>,
  eventId?: string
) {
  try {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const options = eventId ? { eventID: eventId } : undefined
      ; (window as any).fbq('track', eventName, params ?? {}, options)
    }
  } catch {
    // Falha de tracking nunca deve quebrar a experiência do usuário
  }
}
