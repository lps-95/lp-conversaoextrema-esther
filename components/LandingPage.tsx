import { useEffect, useState } from 'react'
import useSmoothScroll from '../hooks/useSmoothScroll'
import AnimatedBlobs from './AnimatedBlobs'
import CountdownTimer from './CountdownTimer'
import CustomCursor from './CustomCursor'
import FloatingCTA from './FloatingCTA'
import MagneticButton from './MagneticButton'
import { MSection, MStagger } from './Motion'
import ParallaxLayer from './ParallaxLayer'
import ROICalculator from './ROICalculator'
import ScrollProgress from './ScrollProgress'
import VideoModal from './VideoModal'
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
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          plan,
          whatsapp,
          bestTime,
          utmSource,
          utmMedium,
          utmCampaign,
          origin,
        }),
      })
      if (res.ok) {
        setStatus('success')
        track('lead_success', { plan, whatsapp })
        redirectToWhatsApp({ name, email, plan, whatsapp, bestTime })
        setName('')
        setEmail('')
        setPlan('')
        setWhatsapp('')
        setBestTime('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
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
                <input type='hidden' name='utm_medium' value={utmMedium} readOnly />
                <input type='hidden' name='utm_campaign' value={utmCampaign} readOnly />
                <input type='hidden' name='origin' value={origin} readOnly />
                <MStagger className='space-y-5'>
                  <div>
                    <label className='sr-only'>Nome</label>
                    <input aria-label='Nome' value={name} onChange={(e) => setName(e.target.value)} placeholder='Seu nome completo' className='w-full bg-black/40 border border-white/20 rounded-xl px-5 py-3.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-button-primary focus:ring-2 focus:ring-button-primary/20 transition-all' />
                  </div>
                  <div>
                    <label className='sr-only'>E-mail</label>
                    <input aria-label='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='seu@email.com' className='w-full bg-black/40 border border-white/20 rounded-xl px-5 py-3.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-button-primary focus:ring-2 focus:ring-button-primary/20 transition-all' />
                  </div>
                  <div>
                    <label className='sr-only'>WhatsApp</label>
                    <input aria-label='WhatsApp' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder='(00) 00000-0000' className='w-full bg-black/40 border border-white/20 rounded-xl px-5 py-3.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-button-primary focus:ring-2 focus:ring-button-primary/20 transition-all' />
                  </div>
                  <div>
                    <label className='sr-only'>Melhor horário</label>
                    <input aria-label='Melhor horário' value={bestTime} onChange={(e) => setBestTime(e.target.value)} placeholder='Melhor horário para contato' className='w-full bg-black/40 border border-white/20 rounded-xl px-5 py-3.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-button-primary focus:ring-2 focus:ring-button-primary/20 transition-all' />
                  </div>
                </MStagger>
                <button type='submit' disabled={status === 'loading'} className='group/submit relative w-full'>
                  <div className='absolute -inset-0.5 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur opacity-60 group-hover/submit:opacity-100 transition duration-300' />
                  <div className='relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-lg py-4 rounded-xl hover:scale-[1.02] transition-transform duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'>
                    {status === 'loading' ? 'Enviando...' : 'Enviar e Avançar no WhatsApp'}
                    <span className='ml-2'>→</span>
                  </div>
                </button>
                {status === 'error' && <p className='text-center text-red-400 text-sm font-medium'>Ocorreu um erro. Tente novamente.</p>}
              </form>
            </div>
          </MSection>
        </div>
      </section>

      <Footer onTrack={track} />

    </div>
  )
}
