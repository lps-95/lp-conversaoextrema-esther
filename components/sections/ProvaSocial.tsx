import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'

export default function ProvaSocial() {
  const testimonials = [
    {
      quote: 'Meu perfil estava morto. Depois da estratégia, minhas vendas de mentoria triplicaram em 60 dias.',
      author: 'Juliana Mendes',
      role: 'Consultora de Negócios',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      quote: 'Eu perdia contratos para concorrentes menos qualificadas. Hoje sou procurada diariamente por clientes prontos para fechar.',
      author: 'Fernanda Costa',
      role: 'Coach Executiva',
      gradient: 'from-blue-500/20 to-purple-500/20'
    }
  ]

  return (
    <section id='prova-social' className='relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.1),transparent_70%)]' />
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-40' />

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400'>
              ⭐ Resultados Reais
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              Elas Pararam De Postar Sozinhas E{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Começaram A Vender Todos Os Dias
              </span>
            </h2>
          </div>
        </MSection>

        <MStagger className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12'>
          {testimonials.map((item, idx) => (
            <MItem key={idx}>
              <div className='group relative h-full'>
                {/* Animated border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`} />

                {/* Card content */}
                <div className='relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300'>
                  {/* Quote icon */}
                  <div className='text-button-primary text-5xl font-display mb-4 opacity-50'>❝</div>

                  <p className='text-xl text-text-primary font-display font-semibold mb-6 leading-relaxed italic'>
                    {item.quote}
                  </p>

                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-gradient-to-br from-button-primary to-accent-gold rounded-full flex items-center justify-center text-primary-dark font-bold'>
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <p className='text-text-primary font-bold'>{item.author}</p>
                      <p className='text-text-tertiary text-sm'>{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </MItem>
          ))}
        </MStagger>

        <div className='group relative'>
          <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500 animate-gradient-x' />
          <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12 text-center'>
            <div className='text-4xl mb-4'>🏆</div>
            <h3 className='font-display text-2xl font-bold text-button-primary mb-4'>Autoridade e Confiança</h3>
            <p className='text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto'>
              Resultados comprovados com mais de 200 empresárias mentoradas e R$ 50M+ gerados em vendas orgânicas
            </p>
            <div className='flex justify-center items-center gap-4 flex-wrap'>
              {['⭐', '💎', '🚀', '👑'].map((emoji, idx) => (
                <div key={idx} className='w-16 h-16 bg-gradient-to-br from-button-primary/20 to-accent-gold/20 rounded-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-200'>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
