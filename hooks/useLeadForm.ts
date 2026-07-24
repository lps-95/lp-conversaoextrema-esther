import { useEffect, useState } from 'react'
import { formContent } from '../content/form'
import { track } from '../lib/analytics'
import { redirectToWhatsApp } from '../lib/whatsappRedirect'
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState('')
  const { whatsapp, setWhatsapp, handleWhatsAppChange } = useWhatsAppMask()
  const [bestTime, setBestTime] = useState('')
  const [niche, setNiche] = useState('')
  const [followers, setFollowers] = useState('')
  const [revenue, setRevenue] = useState('')
  const [mainGoal, setMainGoal] = useState('')

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

    // Validação básica dos campos obrigatórios
    if (!name.trim()) {
      setStatus('error')
      setErrorMessage(formContent.validationMessages.missingName)
      return
    }
    if (!email.trim()) {
      setStatus('error')
      setErrorMessage(formContent.validationMessages.missingEmail)
      return
    }
    if (!whatsapp.trim()) {
      setStatus('error')
      setErrorMessage(formContent.validationMessages.missingWhatsapp)
      return
    }

    const whatsappNumbers = whatsapp.replace(/\D/g, '')
    if (whatsappNumbers.length < 10 || whatsappNumbers.length > 13) {
      setStatus('error')
      setErrorMessage(formContent.validationMessages.invalidWhatsapp)
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

    // A ação principal do formulário é o redirecionamento — acontece na
    // hora, sem esperar nenhuma resposta de servidor.
    setStatus('success')
    redirectToWhatsApp({ name, email, whatsapp, niche, followers, revenue, mainGoal, plan, bestTime })

    // Salvar o lead é um registro auxiliar, em segundo plano: se falhar,
    // não afeta o que o usuário já viu (ele já está indo pro WhatsApp).
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
    fields: { name, email, plan, whatsapp, bestTime, niche, followers, revenue, mainGoal },
    setters: { setName, setEmail, setPlan, setBestTime, setNiche, setFollowers, setRevenue, setMainGoal },
    handleWhatsAppChange,
    hiddenFields: { utmSource, utmMedium, utmCampaign, origin },
    status,
    errorMessage,
    handleSubmit,
    selectPlanAndScrollToForm,
  }
}
