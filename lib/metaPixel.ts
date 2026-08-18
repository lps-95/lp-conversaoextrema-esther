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
 * Dispara um evento de conversão do Pixel (padrão do Meta, ex: 'Lead',
 * 'Contact', 'Purchase', ou um evento customizado). Não faz nada se o
 * Pixel ainda não foi carregado (visitante não deu consentimento) — o
 * `try/catch` garante que falha de tracking nunca quebra a experiência.
 */
export function trackPixelEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      ; (window as any).fbq('track', eventName, params ?? {})
    }
  } catch {
    // Falha de tracking nunca deve quebrar a experiência do usuário
  }
}
