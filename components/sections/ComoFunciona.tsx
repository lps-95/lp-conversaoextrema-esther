import { MSection } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'
import TiltCard from '../TiltCard'

export default function ComoFunciona() {
  const steps = [
    {
      number: '01',
      emoji: '🔍',
      title: 'Diagnóstico da Atrofia Digital',
      description: 'Mapeamos cada ponto onde seu perfil está perdendo dinheiro. Identificamos os vazios de narrativa que transformam visitantes em desistentes. Você recebe um relatório completo mostrando exatamente onde o sangramento de oportunidades acontece.',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      number: '02',
      emoji: '🧩',
      title: 'Arquitetura de Identidade Magnética',
      description: 'Reconstruímos sua presença do zero. Bio estratégica, destaques organizados e linha editorial coesa que posiciona você como única escolha lógica. Seu perfil passa a atrair cliente ideal e repelir curioso que nunca compra.',
      gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
      number: '03',
      emoji: '🗺️',
      title: 'Sistema de Narrativas Vendedoras',
      description: 'Criamos o planejamento completo de conteúdo baseado em funil invisível. Cada post funciona como capítulo estratégico que acumula desejo de compra. Roteiros prontos, formatos definidos, cronograma claro para os próximos 90 dias.',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      number: '04',
      emoji: '⚙️',
      title: 'Gestão Executiva Hands-Off',
      description: 'Assumimos toda a execução. Criação, edição, publicação e gestão diária do perfil. Você aprova o planejamento e nós fazemos acontecer. Seu perfil trabalha 24 horas vendendo enquanto você foca em atender clientes.',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      number: '05',
      emoji: '📊',
      title: 'Otimização Contínua por Dados',
      description: 'Analisamos métricas que realmente importam. Ajustamos a estratégia com base em performance real. Seu ROI aumenta mês após mês enquanto refinamos a máquina de vendas com precisão cirúrgica.',
      gradient: 'from-button-primary/20 to-accent-gold/20'
    }
  ]

  return (
    <section id='como-funciona' className='relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.08),transparent_70%)]' />
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-40' />

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-400'>
              ⚡ Metodologia Comprovada
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              Como Funciona o{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Gestão Extrema
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
              5 passos estratégicos que transformam seu perfil invisível em máquina de vendas.
            </p>
          </div>
        </MSection>

        <div className='space-y-6 lg:space-y-8'>
          {steps.map((step, idx) => (
            <ScrollReveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 100}>
              <TiltCard tiltAmount={5}>
                <div className='group relative'>
                  {/* Animated border glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${step.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-700 animate-gradient-x`} />

                  {/* Card content */}
                  <div className='relative h-full bg-gradient-to-br from-white/[0.12] to-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden group-hover:border-white/40 transition-all duration-500'>
                    {/* Background pattern */}
                    <div className='absolute inset-0 opacity-[0.03]'>
                      <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                        <defs>
                          <pattern id={`pattern-${idx}`} x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
                            <path d='M 40 0 L 0 0 0 40' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-white' />
                          </pattern>
                        </defs>
                        <rect width='100%' height='100%' fill={`url(#pattern-${idx})`} />
                      </svg>
                    </div>

                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

                    <div className='relative flex flex-col sm:flex-row gap-6 p-6 sm:p-8 lg:p-10'>
                      {/* Left side - Number & Icon */}
                      <div className='flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-6'>
                        {/* Step number with animated ring */}
                        <div className='relative'>
                          {/* Animated ring */}
                          <div className='absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.gradient} animate-spin-slow`} style={{ animationDuration: '8s' }} />
                            <div className='absolute inset-1 rounded-full bg-[#0d0c12]' />
                          </div>

                          {/* Number badge */}
                          <div className='relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-button-primary via-accent-gold to-button-primary rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500'>
                            <span className='text-2xl sm:text-3xl font-black text-primary-dark'>
                              {step.number}
                            </span>
                            {/* Shine effect */}
                            <div className='absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                          </div>
                        </div>

                        {/* Icon with glow */}
                        <div className='relative sm:ml-0'>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-150`} />
                          <div className='relative text-5xl sm:text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500'>
                            {step.emoji}
                          </div>
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className='flex-1 space-y-4'>
                        {/* Title with gradient on hover */}
                        <h3 className='font-display text-2xl sm:text-3xl font-bold leading-tight group-hover:bg-gradient-to-r group-hover:from-button-primary group-hover:to-accent-gold group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500'>
                          {step.title}
                        </h3>

                        {/* Divider line */}
                        <div className='flex items-center gap-3'>
                          <div className={`h-1 w-12 bg-gradient-to-r ${step.gradient.replace('/20', '')} rounded-full group-hover:w-24 transition-all duration-500`} />
                          <div className='h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent' />
                        </div>

                        {/* Description */}
                        <p className='text-text-secondary text-base sm:text-lg leading-relaxed group-hover:text-text-primary transition-colors duration-500'>
                          {step.description}
                        </p>

                        {/* Bottom highlights */}
                        <div className='flex flex-wrap gap-2 pt-2'>
                          {idx === 0 && (
                            <>
                              <span className='px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-medium'>Diagnóstico Profundo</span>
                              <span className='px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-medium'>Análise Completa</span>
                            </>
                          )}
                          {idx === 1 && (
                            <>
                              <span className='px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium'>Bio Estratégica</span>
                              <span className='px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-medium'>Design Premium</span>
                            </>
                          )}
                          {idx === 2 && (
                            <>
                              <span className='px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-medium'>90 Dias de Conteúdo</span>
                              <span className='px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium'>Funil Invisível</span>
                            </>
                          )}
                          {idx === 3 && (
                            <>
                              <span className='px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-medium'>Gestão Total</span>
                              <span className='px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-400 text-xs font-medium'>Hands-Off</span>
                            </>
                          )}
                          {idx === 4 && (
                            <>
                              <span className='px-3 py-1 bg-button-primary/10 border border-button-primary/30 rounded-full text-button-primary text-xs font-medium'>ROI Crescente</span>
                              <span className='px-3 py-1 bg-accent-gold/10 border border-accent-gold/30 rounded-full text-accent-gold text-xs font-medium'>Otimização Contínua</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className='hidden lg:flex items-center justify-center flex-shrink-0'>
                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-button-primary/20 to-accent-gold/20 flex items-center justify-center group-hover:scale-125 group-hover:rotate-90 transition-all duration-500'>
                          <svg className='w-5 h-5 text-button-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Bottom shine effect */}
                    <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-button-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
