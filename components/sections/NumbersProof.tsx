import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'
import TiltCard from '../TiltCard'

export default function NumbersProof() {
  const stats = [
    {
      number: '487%',
      label: 'Aumento Médio em Engajamento',
      sublabel: 'Primeiros 90 dias após implementação',
      icon: '📈',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      number: '3-5x',
      label: 'Retorno em Vendas',
      sublabel: 'Clientes relataram esse aumento em receita',
      icon: '💰',
      gradient: 'from-button-primary/20 to-accent-gold/20'
    },
    {
      number: '2-3',
      label: 'Meses para ROI',
      sublabel: 'Tempo médio para recuperar o investimento',
      icon: '⚡',
      gradient: 'from-blue-500/20 to-purple-500/20'
    }
  ]

  return (
    <section id='prova-numeros' className='relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black'>
      {/* Background decorations */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.1),transparent_70%)] animate-pulse-subtle' />
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-40' />

      <div className='max-w-7xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-4 text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400'>
              Resultados Reais
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              Enquanto Você Pensa, Outros{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Já Estão Ganhando
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
              Números comprovados de transformação em 90 dias
            </p>
          </div>
        </MSection>

        <MStagger className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {stats.map((stat, idx) => (
            <MItem key={idx}>
              <ScrollReveal direction='up' delay={idx * 100}>
                <TiltCard className='h-full'>
                  <div className='group relative h-full'>
                    {/* Animated border glow */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${stat.gradient} rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500 animate-pulse-glow`} />

                    {/* Card */}
                    <div className='relative h-full bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 text-center hover:scale-105 transition-all duration-300'>
                      {/* Icon with glow effect */}
                      <div className='relative inline-block mb-4'>
                        <div className='absolute inset-0 bg-button-primary/30 blur-2xl rounded-full animate-pulse-glow' />
                        <div className='relative text-4xl'>{stat.icon}</div>
                      </div>

                      {/* Number with gradient */}
                      <div className='text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-3'>
                        <span className='bg-gradient-to-r from-text-primary via-button-primary to-accent-gold bg-clip-text text-transparent animate-gradient-x'>
                          {stat.number}
                        </span>
                      </div>

                      {/* Label */}
                      <p className='text-text-primary font-bold text-base sm:text-lg mb-2'>{stat.label}</p>
                      <p className='text-text-tertiary text-xs sm:text-sm'>{stat.sublabel}</p>

                      {/* Decorative corner glow */}
                      <div className='absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-button-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    </div>
                  </div>                </TiltCard>              </ScrollReveal>
            </MItem>
          ))}
        </MStagger>
      </div >
    </section >
  )
}
