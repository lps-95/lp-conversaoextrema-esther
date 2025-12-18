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
                Método Narrativa Vendedora
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
              5 passos estratégicos que transformam seu perfil invisível em máquina de vendas diárias
            </p>
          </div>
        </MSection>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          {steps.map((step, idx) => (
            <ScrollReveal key={idx} direction='scale' delay={idx * 100}>
              <TiltCard tiltAmount={10}>
                <div className='group relative'>
                  {/* Animated border */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${step.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`} />

                  {/* Card content */}
                  <div className='relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300'>
                    {/* Step number badge */}
                    <div className='absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-button-primary to-accent-gold rounded-full flex items-center justify-center text-primary-dark font-bold text-sm shadow-xl animate-pulse-glow'>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className='relative inline-block mb-6'>
                      <div className='absolute inset-0 bg-button-primary/30 blur-xl rounded-full animate-pulse-glow' />
                      <div className='relative text-5xl'>{step.emoji}</div>
                    </div>

                    <h3 className='font-display text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-button-primary transition-colors'>
                      {step.title}
                    </h3>

                    <p className='text-text-secondary leading-relaxed'>
                      {step.description}
                    </p>

                    {/* Decorative element */}
                    <div className='absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-button-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
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
