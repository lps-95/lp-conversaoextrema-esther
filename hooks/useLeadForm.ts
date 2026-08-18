import { useEffect, useState } from 'react'
import { formContent } from '../content/form'
import { useLanguage } from '../contexts/LanguageContext'
import { track } from '../lib/analytics'
import { getFbCookies, setAdvancedMatching, trackPixelEvent } from '../lib/metaPixel'
import { redirectToWhatsApp } from '../lib/whatsappRedirect'
import { useSpamGuard } from './useSpamGuard'
import { useWhatsAppMask } from './useWhatsAppMask'

type PlanButtonId = keyof typeof formContent.planByButtonId

/**
 * Hook que concentra TODO o estado e a lógica do formulário de captura de
 * lead: campos, UTMs da URL, validação, envio pra API e redirecionamento
 * pro WhatsApp.
 *
 * Isolar isso do componente visual (`LeadForm.tsx`) permite:
 * - testar a lógica sem precisar renderizar JSX
 * - reaproveitar o mesmo formulário em outra landing page trocando só o
 *   `content/form.ts` e o layout, sem tocar nesta lógica
 */
export function useLeadForm() {
  const { language } = useLanguage()
  const content = formContent[language]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState('')
  const { whatsapp, setWhatsapp, handleWhatsAppChange } = useWhatsAppMask()
  const [bestTime, setBestTime] = useState('')
  const [niche, setNiche] = useState('')
  const [followers, setFollowers] = useState('')
  const [revenue, setRevenue] = useState('')
  const [mainGoal, setMainGoal] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const { isLikelySpam } = useSpamGuard()

  // UTMs e URL de origem, capturados assim que a página carrega
  const [utmSource, setUtmSource] = useState('')
  const [utmMedium, setUtmMedium] = useState('')
  const [utmCampaign, setUtmCampaign] = useState('')
  const [origin, setOrigin] = useState('')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const params = url.searchParams
    setUtmSource(params.get('utm_source') || '')
    setUtmMedium(params.get('utm_medium') || '')
    setUtmCampaign(params.get('utm_campaign') || '')
    setOrigin(url.toString())
  }, [])

  /** Usado pelos botões de plano (seção Pricing) pra pré-selecionar o plano e rolar até o formulário */
  function selectPlanAndScrollToForm(id: PlanButtonId) {
    track('cta_click', { id })
    setPlan(formContent.planByButtonId[id])
    try {
      const el = document.getElementById('form')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.location.hash = '#form'
    } catch {
      window.location.hash = '#form'
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    // Bot: sai silenciosamente, sem redirecionar e sem salvar nada — um
    // bot não segue o redirecionamento de qualquer forma, então não há
    // ganho nenhum em fingir sucesso aqui como fazemos na newsletter.
    if (isLikelySpam(honeypot)) return

    // Validação básica dos campos obrigatórios
    if (!name.trim()) {
      setStatus('error')
      setErrorMessage(content.validationMessages.missingName)
      return
    }
    if (!email.trim()) {
      setStatus('error')
      setErrorMessage(content.validationMessages.missingEmail)
      return
    }
    if (!whatsapp.trim()) {
      setStatus('error')
      setErrorMessage(content.validationMessages.missingWhatsapp)
      return
    }

    const whatsappNumbers = whatsapp.replace(/\D/g, '')
    if (whatsappNumbers.length < 10 || whatsappNumbers.length > 13) {
      setStatus('error')
      setErrorMessage(content.validationMessages.invalidWhatsapp)
      return
    }

    track('lead_submit', {
      name,
      email,
      plan,
      whatsapp,
      bestTime,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    })

    // Advanced Matching: reenvia o init do Pixel com os dados de contato que
    // o visitante acabou de informar. O SDK do Pixel faz o hash no
    // navegador antes de mandar pro Meta — melhora a qualidade de
    // correspondência do evento (Event Match Quality).
    setAdvancedMatching({ email, phone: whatsappNumbers, firstName: name.split(' ')[0] })

    // Um único id de evento, compartilhado entre o Pixel (navegador) e a
    // API de Conversões (servidor, ver /api/submit-lead) — é o que permite
    // o Meta deduplicar as duas chamadas do mesmo evento em vez de contar
    // a conversão duas vezes.
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`

    // Evento de conversão do Pixel do Meta — esta é a ação que a campanha
    // de anúncios está tentando otimizar (lead qualificado, pronto pra
    // seguir pro WhatsApp).
    trackPixelEvent(
      'Lead',
      {
        content_name: plan || 'formulario_landing_page',
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      },
      eventId
    )

    // A ação principal do formulário é o redirecionamento — acontece na
    // hora, sem esperar nenhuma resposta de servidor.
    setStatus('success')
    redirectToWhatsApp({ name, email, whatsapp, niche, followers, revenue, mainGoal, plan, bestTime })

    // Salvar o lead é um registro auxiliar, em segundo plano: se falhar,
    // não afeta o que o usuário já viu (ele já está indo pro WhatsApp).
    // Também carrega o `eventId` e os cookies do Pixel (_fbp/_fbc) pra API
    // de Conversões do servidor conseguir deduplicar e casar o evento.
    const { fbp, fbc } = getFbCookies()
    fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone: whatsappNumbers,
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
        eventId,
        fbp,
        fbc,
      }),
    }).catch((err) => console.error('[useLeadForm] Falha ao salvar lead em segundo plano:', err))

    // Limpa o formulário
    setName('')
    setEmail('')
    setPlan('')
    setWhatsapp('')
    setBestTime('')
    setNiche('')
    setFollowers('')
    setRevenue('')
    setMainGoal('')
  }

  return {
    fields: { name, email, plan, whatsapp, bestTime, niche, followers, revenue, mainGoal, honeypot },
    setters: { setName, setEmail, setPlan, setBestTime, setNiche, setFollowers, setRevenue, setMainGoal, setHoneypot },
    handleWhatsAppChange,
    hiddenFields: { utmSource, utmMedium, utmCampaign, origin },
    status,
    errorMessage,
    handleSubmit,
    selectPlanAndScrollToForm,
  }
}
