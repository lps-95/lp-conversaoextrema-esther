import { useEffect, useState } from 'react'
import useSmoothScroll from '../hooks/useSmoothScroll'
import { sendLeadToGestao } from '../lib/gestaoClientesAPI'
import AnimatedBlobs from './AnimatedBlobs'
import CountdownTimer from './CountdownTimer'
import CustomCursor from './CustomCursor'
import CustomSelect from './CustomSelect'
import ExitIntentPopup from './ExitIntentPopup'
import FloatingCTA from './FloatingCTA'
import MagneticButton from './MagneticButton'
import { MSection } from './Motion'
import ParallaxLayer from './ParallaxLayer'
import ROICalculator from './ROICalculator'
import ScrollProgress from './ScrollProgress'
import VideoModal from './VideoModal'
import WhatsAppWidget from './WhatsAppWidget'
import Beneficios from './sections/Beneficios'
import Case from './sections/Case'
import ComoFunciona from './sections/ComoFunciona'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import Historia from './sections/Historia'
import NumbersProof from './sections/NumbersProof'
import Oportunidade from './sections/Oportunidade'
import ParaQuem from './sections/ParaQuem'
import Pricing from './sections/Pricing'
import Problem from './sections/Problem'
import ProvaSocial from './sections/ProvaSocial'

export default function LandingPage() {
  useSmoothScroll()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bestTime, setBestTime] = useState('')
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
      const result = await sendLeadToGestao({
        name: name,
        email: email,
        phone: whatsapp.replace(/\D/g, ''),
        plan: plan || undefined,
        bestTime: bestTime || undefined,
        utmParams: {
          utm_source: utmSource || undefined,
          utm_medium: utmMedium || undefined,
          utm_campaign: utmCampaign || undefined,
        },
        origin: 'landing_page_conversao_extrema',
      })
      setStatus('success')
      track('lead_success', { plan, whatsapp })
      setName('')
      setEmail('')
      setPlan('')
      setWhatsapp('')
      setBestTime('')
      alert('✅ Cadastro realizado com sucesso! Nossa equipe entrará em contato em breve.')
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
                <span className='text-sm font-medium text-text-secondary'>Mentoria Exclusiva para Alta Performance</span>
              </div>

              {/* Main headline with gradient text */}
              <h1 className='font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 sm:mb-8'>
                Pare de Perder Contratos de{' '}
                <span className='relative inline-block'>
                  <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent animate-gradient-x'>
                    2 digitos
                  </span>
                  <span className='absolute -inset-1 bg-gradient-to-r from-button-primary/20 to-accent-gold/20 blur-xl -z-10 animate-pulse-glow' />
                </span>{' '}
                Para Concorrentes Com Instagram Melhor
              </h1>

              {/* Subheadline in glassmorphic card */}
              <div className='relative group mb-8 sm:mb-10'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-x' />
                <div className='relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 md:p-8'>
                  <p className='text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-text-secondary font-medium'>
                    Transforme seu perfil invisível em uma{' '}
                    <span className='text-text-primary font-bold'>máquina de autoridade</span>{' '}
                    sem depender de algoritmo ou passar horas criando conteúdo
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
                      document.getElementById('numeros')?.scrollIntoView({ behavior: 'smooth' })
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

              {/* Social proof indicators */}
              <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10'>
                <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-text-tertiary'>
                  <div className='flex items-center gap-2'>
                    <span className='text-accent-gold text-base sm:text-xl'>★★★★★</span>
                    <span className='whitespace-nowrap'>Avaliação 5.0</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse-glow' />
                    <span className='whitespace-nowrap'>+200 Alunas Ativas</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-accent-gold text-base sm:text-lg'>💰</span>
                    <span className='whitespace-nowrap'>R$ 50M+ Gerados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2'>
            <div className='w-1.5 h-3 bg-button-primary rounded-full animate-pulse' />
          </div>
        </div>
      </section>

      <NumbersProof />
      <Problem />
      <Oportunidade />
      <ParaQuem />
      <Beneficios />
      <Historia onTrack={track} />
      <ProvaSocial />
      <Case />
      <ComoFunciona />

      <section className='relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-black via-[#0d0c12] to-black border-y border-white/10'>
        <ParallaxLayer speed={0.04} className='absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,214,102,0.08),transparent_50%)]' />
        <div className='relative z-10 max-w-4xl mx-auto px-4 text-center'>
          <MSection>
            <div className='group relative inline-block'>
              <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-gradient-x' />
              <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-10'>
                <div className='text-4xl mb-4'>💎</div>
                <h2 className='font-display text-3xl sm:text-4xl font-bold mb-6'>
                  <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent animate-gradient-x'>
                    Pronta Para Escolher Seu Plano?
                  </span>
                </h2>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                  <a href='#planos' onClick={() => track('cta_click', { id: 'pre_pricing_cta' })} className='group/btn relative inline-block'>
                    <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur-lg opacity-60 group-hover/btn:opacity-100 transition duration-300 animate-gradient-x' />
                    <div className='relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-200 shadow-2xl'>
                      Ver Planos e Preços
                      <span className='ml-2'>→</span>
                    </div>
                  </a>
                  <a href='#faq' className='text-text-secondary hover:text-button-primary transition-colors text-base font-medium'>
                    Ver Perguntas Frequentes
                  </a>
                </div>
              </div>
            </div>
          </MSection>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className='relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.08),transparent_70%)]' />
        <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-40' />

        <div className='max-w-7xl mx-auto px-4 relative z-10'>
          <MSection>
            <div className='text-center mb-12'>
              <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-full text-button-primary'>
                📊 Faça as Contas
              </span>
              <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
                Descubra Seu <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>Potencial de Retorno</span>
              </h2>
              <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
                Veja quanto você pode ganhar investindo no crescimento do seu Instagram
              </p>
            </div>

            <ROICalculator onTrack={track} />
          </MSection>
        </div>
      </section>

      <Pricing onChoosePlan={goToForm} />
      <FAQ onTrack={track} />

      {/* Form anchor section */}
      <section id='form' className='relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-black via-[#0d0c12] to-black border-t border-button-primary/20'>
        <ParallaxLayer speed={0.04} className='absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_22%_20%,rgba(255,214,102,0.10),transparent_35%),radial-gradient(circle_at_78%_0%,rgba(255,255,255,0.06),transparent_30%)]' />
        <div className='relative z-10 max-w-lg mx-auto px-4'>
          <MSection>
            <div className='group relative'>
              <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-gradient-x' />
              <form onSubmit={handleSubmit} className='relative space-y-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-10 shadow-2xl'>
                <div className='text-center mb-6'>
                  <div className='text-4xl mb-3'>✨</div>
                  <h4 className='font-display text-3xl font-bold mb-2'>
                    <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent'>
                      Vamos Começar
                    </span>
                  </h4>
                  <p className='text-text-secondary text-sm'>Preencha o formulário e avance no WhatsApp</p>
                  {plan && (
                    <p className='text-center text-sm text-text-secondary mt-3 px-4 py-2 bg-button-primary/10 border border-button-primary/30 rounded-full inline-block'>
                      Plano selecionado: <span className='font-semibold text-button-primary'>{plan}</span>
                    </p>
                  )}
                </div>
                <input type='hidden' name='plan' value={plan} readOnly />
                <input type='hidden' name='utm_source' value={utmSource} readOnly />

                <div className='flex flex-col gap-5'>
                  <div>
                    <label htmlFor='name' className='block text-base font-semibold text-text-primary mb-2'>Nome completo <span className='text-accent-gold'>*</span></label>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      autoComplete='name'
                      required
                      className={`w-full px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border-2 hover:border-white/30 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30 outline-none text-base text-white placeholder:text-text-secondary transition-all duration-150 shadow-sm ${status === 'error' && !name.trim() ? 'border-red-500' : 'border-white/10'}`}
                      placeholder='Seu nome completo'
                      value={name}
                      onChange={e => setName(e.target.value)}
                      aria-invalid={status === 'error' && !name.trim()}
                    />
                    {status === 'error' && !name.trim() && (
                      <span className='text-xs text-red-500 mt-1 block'>Preencha seu nome completo</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor='email' className='block text-base font-semibold text-text-primary mb-2'>E-mail <span className='text-accent-gold'>*</span></label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      className={`w-full px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border-2 hover:border-white/30 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30 outline-none text-base text-white placeholder:text-text-secondary transition-all duration-150 shadow-sm ${status === 'error' && !email.trim() ? 'border-red-500' : 'border-white/10'}`}
                      placeholder='seu@email.com'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      aria-invalid={status === 'error' && !email.trim()}
                    />
                    {status === 'error' && !email.trim() && (
                      <span className='text-xs text-red-500 mt-1 block'>Preencha seu e-mail</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor='whatsapp' className='block text-base font-semibold text-text-primary mb-2'>WhatsApp <span className='text-accent-gold'>*</span></label>
                    <input
                      id='whatsapp'
                      name='whatsapp'
                      type='tel'
                      inputMode='tel'
                      autoComplete='tel'
                      required
                      className={`w-full px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border-2 hover:border-white/30 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30 outline-none text-base text-white placeholder:text-text-secondary transition-all duration-150 shadow-sm ${status === 'error' && (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) ? 'border-red-500' : 'border-white/10'}`}
                      placeholder='(99) 99999-9999'
                      value={whatsapp}
                      onChange={handleWhatsAppChange}
                      aria-invalid={status === 'error' && (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10)}
                      maxLength={15}
                    />
                    {status === 'error' && (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) && (
                      <span className='text-xs text-red-500 mt-1 block'>Informe um WhatsApp válido</span>
                    )}
                  </div>
                  <div className='relative'>
                    <label className='block text-base font-semibold text-text-primary mb-2'>Melhor horário para contato</label>
                    <CustomSelect
                      value={bestTime || ''}
                      onChange={setBestTime}
                      placeholder='Selecione uma opção'
                      options={[
                        { label: 'Manhã', value: 'Manhã' },
                        { label: 'Tarde', value: 'Tarde' },
                        { label: 'Noite', value: 'Noite' },
                        { label: 'Agora', value: 'Agora' },
                        { label: 'Indiferente', value: 'Indiferente' },
                      ]}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className='text-red-500 text-sm text-center'>{errorMessage}</div>
                )}
                {status === 'success' && (
                  <div className='text-green-500 text-sm text-center'>Lead enviado! Você receberá a confirmação automática no WhatsApp.</div>
                )}

                <button
                  type='submit'
                  className={`group relative overflow-hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-base bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark shadow-xl hover:scale-[1.02] transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-button-primary/50 ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                  aria-label='Enviar e receber confirmação no WhatsApp'
                  title='Enviar e receber confirmação no WhatsApp'
                >
                  <span aria-hidden className='pointer-events-none absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent' />
                  {status === 'loading' ? (
                    <svg className='animate-spin h-5 w-5 text-primary-dark' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                    </svg>
                  ) : (
                    <span className='inline-flex items-center gap-2'>
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                        <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' />
                      </svg>
                      Enviar e receber no WhatsApp
                    </span>
                  )}
                </button>
                <input type='hidden' name='utm_medium' value={utmMedium} readOnly />
                <input type='hidden' name='utm_campaign' value={utmCampaign} readOnly />
                <input type='hidden' name='origin' value={origin} readOnly />
                {/* Apenas um bloco de inputs e um botão de submit estilizado */}
                {status === 'error' && (
                  <p className='text-center text-red-400 text-sm font-medium'>
                    {errorMessage || 'Ocorreu um erro. Tente novamente.'}
                  </p>
                )}
              </form>
            </div>
          </MSection>
        </div>
      </section>

      <Footer onTrack={track} />

    </div>
  )
}
