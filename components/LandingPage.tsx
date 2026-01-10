import { useEffect, useState } from 'react'
import useSmoothScroll from '../hooks/useSmoothScroll'
import AnimatedBlobs from './AnimatedBlobs'
import CountdownTimer from './CountdownTimer'
import CustomCursor from './CustomCursor'
import CustomSelect from './CustomSelect'
import ExitIntentPopup from './ExitIntentPopup'
import FloatingCTA from './FloatingCTA'
import MagneticButton from './MagneticButton'
import { MSection } from './Motion'
import ParallaxLayer from './ParallaxLayer'
import ScrollProgress from './ScrollProgress'
import VideoModal from './VideoModal'
import WhatsAppWidget from './WhatsAppWidget'
import ComoFunciona from './sections/ComoFunciona'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import Historia from './sections/Historia'
import NumbersProof from './sections/NumbersProof'
import Pricing from './sections/Pricing'
import Problem from './sections/Problem'

export default function LandingPage() {
  useSmoothScroll()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bestTime, setBestTime] = useState('')
  const [niche, setNiche] = useState('')
  const [followers, setFollowers] = useState('')
  const [revenue, setRevenue] = useState('')
  const [mainGoal, setMainGoal] = useState('')
  const [utmSource, setUtmSource] = useState('')
  const [utmMedium, setUtmMedium] = useState('')
  const [utmCampaign, setUtmCampaign] = useState('')
  const [origin, setOrigin] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Máscara para WhatsApp
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '')
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value)
    setWhatsapp(formatted)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    const params = url.searchParams
    setUtmSource(params.get('utm_source') || '')
    setUtmMedium(params.get('utm_medium') || '')
    setUtmCampaign(params.get('utm_campaign') || '')
    setOrigin(url.toString())
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    // Validação básica
    if (!name.trim()) {
      setStatus('error')
      setErrorMessage('Por favor, preencha seu nome')
      return
    }

    if (!email.trim()) {
      setStatus('error')
      setErrorMessage('Por favor, preencha seu e-mail')
      return
    }

    if (!whatsapp.trim()) {
      setStatus('error')
      setErrorMessage('Por favor, preencha seu WhatsApp')
      return
    }

    // Validar formato do WhatsApp
    const whatsappNumbers = whatsapp.replace(/\D/g, '')
    if (whatsappNumbers.length < 10 || whatsappNumbers.length > 13) {
      setStatus('error')
      setErrorMessage('WhatsApp inválido. Use o formato: (48) 99196-4517')
      return
    }

    setStatus('loading')
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

    try {
      // Enviar para API para registrar o lead no banco de dados
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: whatsapp.replace(/\D/g, ''),
          plan: plan || undefined,
          bestTime: bestTime || undefined,
          utmSource: utmSource || undefined,
          utmMedium: utmMedium || undefined,
          utmCampaign: utmCampaign || undefined,
          origin: 'landing_page_conversao_extrema',
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao registrar lead')
      }

      setStatus('success')
      track('lead_success', { plan, whatsapp })

      // Limpar formulário
      setName('')
      setEmail('')
      setPlan('')
      setWhatsapp('')
      setBestTime('')

      // Redirecionar para WhatsApp com as informações preenchidas
      setTimeout(() => {
        redirectToWhatsApp({
          name,
          email,
          plan,
          whatsapp,
          bestTime,
        })
      }, 500)

    } catch (err) {
      setStatus('error')
      const errorMessage = (err && typeof err === 'object' && 'message' in err) ? (err as Error).message : 'Erro ao enviar cadastro'
      console.error('❌ Erro ao enviar lead:', err)
      alert(`❌ ${errorMessage}. Tente novamente.`)
    }
  }

  function track(eventName: string, props?: Record<string, unknown>) {
    try {
      if (typeof window !== 'undefined' && (window as any).plausible) {
        ; (window as any).plausible(eventName, { props: props ?? {} })
      }
    } catch { }
  }

  function redirectToWhatsApp({ name, email, plan, whatsapp, bestTime }: { name: string; email: string; plan: string; whatsapp: string; bestTime: string }) {
    try {
      const chosenPlan = plan || 'Definir após diagnóstico'
      const message = encodeURIComponent(
        [
          'Olá, equipe Esther Social Media! Quero avançar com a mentoria.',
          `Plano: ${chosenPlan}`,
          `Nome: ${name || '—'}`,
          `E-mail: ${email || '—'}`,
          `WhatsApp: ${whatsapp || '—'}`,
          bestTime ? `Melhor horário: ${bestTime}` : null,
          'Podem me enviar os próximos passos?',
        ]
          .filter(Boolean)
          .join('\n')
      )
      const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+5548991964517'
      const base = number ? `https://wa.me/${number}` : 'https://wa.me/'
      window.location.href = `${base}?text=${message}`
    } catch { }
  }

  function goToForm(id: 'pricing_essential' | 'pricing_professional' | 'pricing_premium') {
    track('cta_click', { id })
    try {
      if (id === 'pricing_essential') setPlan('Essencial')
      else if (id === 'pricing_professional') setPlan('Profissional')
      else if (id === 'pricing_premium') setPlan('Premium')
    } catch { }
    try {
      const el = document.getElementById('form')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.hash = '#form'
      }
    } catch {
      window.location.hash = '#form'
    }
  }

  return (
    <div className='bg-gradient-to-br from-black via-[#0d0c12] to-black text-white font-sans'>
      <CustomCursor />
      <AnimatedBlobs />
      <ScrollProgress />
      <FloatingCTA />
      <ExitIntentPopup />
      <WhatsAppWidget
        phone={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5548991964517'}
        message="Olá! Vim da landing page e gostaria de saber mais sobre a mentoria Esther Social Media."
      />

      {/* Hero Section - Redesigned with sophisticated visuals */}
      <section id='hero' className='relative overflow-hidden min-h-screen flex items-center'>
        {/* Animated background layers */}
        <div className='absolute inset-0 bg-gradient-to-br from-black via-[#0f0e16] to-black' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,220,200,0.15),transparent_50%)] animate-pulse-subtle' />
        <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-button-primary/20 rounded-full blur-[150px] animate-float-slow' />
        <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-gold/15 rounded-full blur-[120px] animate-float-slow' style={{ animationDelay: '2s' }} />

        {/* Grid pattern */}
        <div className='absolute inset-0 opacity-20'>
          <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern id='hero-grid' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'>
                <path d='M 60 0 L 0 0 0 60' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-button-primary' />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#hero-grid)' />
          </svg>
        </div>

        <ParallaxLayer speed={0.06} className='absolute inset-0 pointer-events-none' />

        <div className='relative z-10 w-full'>
          <div className='max-w-6xl mx-auto px-4 py-20 sm:py-32'>
            <div className='max-w-4xl mx-auto'>
              {/* Badge */}
              <div className='inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-sm'>
                <span className='w-2 h-2 bg-accent-gold rounded-full animate-pulse-glow' />
                <span className='text-sm font-medium text-text-secondary'>Você acabou de perder um contrato</span>
              </div>

              {/* Main headline with gradient text - Emotional Validation */}
              <h1 className='font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 sm:mb-8'>
                Você Perdeu R$ 15.000 Para Uma{' '}
                <span className='relative inline-block'>
                  <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent animate-gradient-x'>
                    Concorrente Menos Qualificada
                  </span>
                  <span className='absolute -inset-1 bg-gradient-to-r from-button-primary/20 to-accent-gold/20 blur-xl -z-10 animate-pulse-glow' />
                </span>
              </h1>

              {/* Subheadline with Painful Movie - Visceral validation */}
              <div className='relative group mb-8 sm:mb-10'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-x' />
                <div className='relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 md:p-8'>
                  <p className='text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-text-secondary font-medium'>
                    O motivo? Seu Instagram parecia amador. Enquanto você gasta <span className='text-text-primary font-bold'>12 horas semanais</span> criando posts que morrem com <span className='text-text-primary font-bold'>8 curtidas</span>, ela fecha <span className='text-text-primary font-bold'>4 contratos por mês</span> porque seu perfil trabalha como vendedor 24h.
                  </p>
                  <p className='text-lg sm:text-xl font-bold text-accent-gold mt-4'>
                    Isso acaba hoje.
                  </p>
                </div>
              </div>

              {/* CTA with sophisticated styling */}
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center'>
                <MagneticButton strength={0.4}>
                  <a
                    href='#form'
                    onClick={() => track('cta_click', { id: 'hero_primary' })}
                    className='group relative inline-flex items-center justify-center'
                  >
                    <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition duration-300 animate-gradient-x' />
                    <div className='relative px-6 sm:px-8 md:px-10 lg:px-12 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-button-primary to-accent-gold rounded-xl font-bold text-sm sm:text-base md:text-lg lg:text-xl text-primary-dark hover:scale-105 transition-transform duration-200 shadow-2xl text-center'>
                      Quero Parar de Perder Contratos Agora
                      <span className='ml-2'>→</span>
                    </div>
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.3}>
                  <button
                    onClick={() => {
                      track('cta_click', { id: 'hero_secondary' })
                      const element = document.getElementById('prova-numeros')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }}
                    className='px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border-2 border-white/30 text-text-primary text-sm sm:text-base font-semibold hover:bg-white/5 hover:border-white/50 transition-all duration-200'
                  >
                    Ver Resultados Reais
                  </button>
                </MagneticButton>
              </div>

              {/* Countdown Timer */}
              <div className='mt-8 sm:mt-10'>
                <CountdownTimer targetHours={24} message="Vagas limitadas - Oferta expira em:" />
              </div>

              {/* Video Modal */}
              <div className='mt-6 flex justify-center'>
                <VideoModal
                  videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Como Funciona a Transformação"
                />
              </div>

              {/* Scroll indicator */}
              <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
                <div className='w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2'>
                  <div className='w-1.5 h-3 bg-button-primary rounded-full animate-pulse' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Numérica - Resultados Reais */}
      <NumbersProof />

      {/* Seção de Problema - Identificação de Dores */}
      <Problem />

      {/* História - Autoridade e Credibilidade (Por Que Eu) */}
      <Historia onTrack={track} />

      {/* Como Funciona - Metodologia */}
      <ComoFunciona />

      {/* Planos e Preços */}
      <Pricing onChoosePlan={goToForm} />

      {/* FAQ - Perguntas Frequentes */}
      <FAQ onTrack={track} />

      {/* Formulário de Captura de Lead */}
      <section id='form' className='relative overflow-hidden py-20 bg-gradient-to-b from-black via-[#0d0c12] to-black'>
        <ParallaxLayer speed={0.03} className='absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(232,220,200,0.08),transparent_50%)]' />

        <div className='relative z-10 max-w-3xl mx-auto px-4'>
          <MSection>
            {/* Header */}
            <div className='text-center mb-10'>
              <div className='inline-block px-4 py-2 mb-6 bg-button-primary/10 border border-button-primary/20 rounded-full backdrop-blur-sm'>
                <p className='text-button-primary text-xs font-bold uppercase tracking-widest'>Solicite sua sessão</p>
              </div>

              <h2 className='font-display text-3xl sm:text-4xl font-bold mb-4 text-text-primary'>
                Comece Sua Transformação
              </h2>

              <p className='text-text-secondary text-sm sm:text-base max-w-xl mx-auto'>
                Receba um diagnóstico personalizado do seu perfil em até 24 horas
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl'>

              {plan && (
                <div className='mb-6 p-3 bg-button-primary/10 border border-button-primary/20 rounded-lg text-center'>
                  <p className='text-xs text-text-secondary'>
                    Plano selecionado: <span className='font-bold text-button-primary'>{plan}</span>
                  </p>
                </div>
              )}

              <input type='hidden' name='plan' value={plan} readOnly />
              <input type='hidden' name='utm_source' value={utmSource} readOnly />

              {/* Grid 2 colunas */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5'>
                <div>
                  <label htmlFor='name' className='block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2'>
                    Nome Completo *
                  </label>
                  <input
                    id='name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder='Maria Silva'
                    className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm placeholder-text-secondary/40 focus:outline-none focus:border-button-primary/50 focus:bg-black/40 transition-all'
                  />
                </div>

                <div>
                  <label htmlFor='email' className='block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2'>
                    Email *
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='maria@exemplo.com'
                    className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm placeholder-text-secondary/40 focus:outline-none focus:border-button-primary/50 focus:bg-black/40 transition-all'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5'>
                <div>
                  <label htmlFor='whatsapp' className='block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2'>
                    WhatsApp *
                  </label>
                  <input
                    id='whatsapp'
                    type='tel'
                    name='whatsapp'
                    value={whatsapp}
                    onChange={handleWhatsAppChange}
                    required
                    placeholder='(11) 99999-9999'
                    className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm placeholder-text-secondary/40 focus:outline-none focus:border-button-primary/50 focus:bg-black/40 transition-all'
                  />
                </div>

                <div>
                  <label htmlFor='niche' className='block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2'>
                    Nicho/Área *
                  </label>
                  <input
                    id='niche'
                    type='text'
                    name='niche'
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    required
                    placeholder='Ex: Psicóloga, Coach...'
                    className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm placeholder-text-secondary/40 focus:outline-none focus:border-button-primary/50 focus:bg-black/40 transition-all'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5'>
                <div>
                  <label htmlFor='followers' className='block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2'>
                    Seguidores *
                  </label>
                  <select
                    id='followers'
                    name='followers'
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    required
                    className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm focus:outline-none focus:border-button-primary/50 focus:bg-black/40 transition-all cursor-pointer'
                  >
                    <option value='' className='bg-primary-dark'>Selecione...</option>
                    <option value='menos-1k' className='bg-primary-dark'>Menos de 1.000</option>
                    <option value='1k-5k' className='bg-primary-dark'>1.000 a 5.000</option>
                    <option value='5k-10k' className='bg-primary-dark'>5.000 a 10.000</option>
                    <option value='10k-50k' className='bg-primary-dark'>10.000 a 50.000</option>
                    <option value='mais-50k' className='bg-primary-dark'>Mais de 50.000</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='revenue' className='block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2'>
                    Faturamento Mensal *
                  </label>
                  <select
                    id='revenue'
                    name='revenue'
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    required
                    className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm focus:outline-none focus:border-button-primary/50 focus:bg-black/40 transition-all cursor-pointer'
                  >
                    <option value='' className='bg-primary-dark'>Selecione...</option>
                    <option value='0-5k' className='bg-primary-dark'>Até R$ 5.000</option>
                    <option value='5k-10k' className='bg-primary-dark'>R$ 5.000 a R$ 10.000</option>
                    <option value='10k-20k' className='bg-primary-dark'>R$ 10.000 a R$ 20.000</option>
                    <option value='20k-50k' className='bg-primary-dark'>R$ 20.000 a R$ 50.000</option>
                    <option value='mais-50k' className='bg-primary-dark'>Acima de R$ 50.000</option>
                  </select>
                </div>
              </div>

              <div className='mb-6'>
                <label htmlFor='mainGoal' className='block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2'>
                  Seu Principal Objetivo *
                </label>
                <select
                  id='mainGoal'
                  name='mainGoal'
                  value={mainGoal}
                  onChange={(e) => setMainGoal(e.target.value)}
                  required
                  className='w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm focus:outline-none focus:border-button-primary/50 focus:bg-black/40 transition-all cursor-pointer'
                >
                  <option value='' className='bg-primary-dark'>Selecione...</option>
                  <option value='primeiros-clientes' className='bg-primary-dark'>Conseguir primeiros clientes pelo Instagram</option>
                  <option value='aumentar-vendas' className='bg-primary-dark'>Aumentar volume de vendas/consultações</option>
                  <option value='escalar-negocio' className='bg-primary-dark'>Escalar para 6 ou 7 dígitos</option>
                  <option value='autoridade' className='bg-primary-dark'>Me tornar autoridade no meu nicho</option>
                  <option value='recuperar-tempo' className='bg-primary-dark'>Vender mais gastando menos tempo</option>
                </select>
              </div>

              <div className='mb-6'>
                <label htmlFor='bestTime' className='block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2'>
                  Melhor Horário para Contato *
                </label>
                <CustomSelect
                  value={bestTime || ''}
                  onChange={setBestTime}
                  placeholder='Selecione...'
                  options={[
                    { label: 'Manhã (8h - 12h)', value: 'Manhã' },
                    { label: 'Tarde (12h - 18h)', value: 'Tarde' },
                    { label: 'Noite (18h - 21h)', value: 'Noite' },
                    { label: 'Horário flexível', value: 'Flexível' },
                  ]}
                />
              </div>

              {errorMessage && (
                <div className='mb-5 text-red-400 text-sm text-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg'>
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className='mb-5 bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center p-3 rounded-lg'>
                  ✅ Abrindo WhatsApp...
                </div>
              )}

              <button
                type='submit'
                disabled={status === 'loading' || status === 'success'}
                className='w-full bg-gradient-to-r from-button-primary to-accent-gold hover:from-accent-gold hover:to-button-primary text-primary-dark font-bold text-base py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              >
                {status === 'loading' ? (
                  <>
                    <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                    </svg>
                    <span>Processando...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <span>✓</span>
                    <span>Sucesso!</span>
                  </>
                ) : (
                  <>
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' />
                    </svg>
                    <span>Solicitar Sessão Estratégica</span>
                  </>
                )}
              </button>

              <p className='text-center text-xs text-text-secondary/60 mt-4'>
                🔒 Seus dados estão protegidos e não serão compartilhados
              </p>

              <input type='hidden' name='utm_medium' value={utmMedium} readOnly />
              <input type='hidden' name='utm_campaign' value={utmCampaign} readOnly />
              <input type='hidden' name='origin' value={origin} readOnly />
            </form>
          </MSection>
        </div>
      </section>

      {/* Footer */}
      <Footer onTrack={track} />
    </div>
  )
}