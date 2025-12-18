import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'
import TiltCard from '../TiltCard'

export default function Beneficios() {
  const beneficios = [
    {
      icon: '✦',
      title: 'Vendas Orgânicas Diárias Sem Prospecção Ativa',
      description: 'Acorde com mensagens de clientes prontos para comprar no seu direct. Nada de perseguir leads frios ou fazer prospecção desesperada. Seu perfil atrai quem já decidiu que você é a solução.',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: '⏰',
      title: 'Liberdade de Tempo Para Focar no Estratégico',
      description: 'Pare de gastar 20 horas semanais criando conteúdo aleatório. Com a gestão completa executada profissionalmente, você recupera seu tempo para atender clientes e expandir o negócio enquanto o Instagram trabalha para você.',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: '👑',
      title: 'Autoridade Instantânea Que Elimina Concorrência',
      description: 'Quando seu posicionamento está cristalino e sua narrativa é única, você para de competir por preço. Clientes te escolhem porque você é a única opção lógica, não a mais barata.',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: '💰',
      title: 'Previsibilidade Financeira Que Traz Paz',
      description: 'Durma tranquila sabendo que o próximo mês está garantido. Com um sistema de vendas orgânicas funcionando, você substitui a ansiedade financeira por faturamento recorrente e planejável.',
      gradient: 'from-button-primary/20 to-accent-gold/20'
    }
  ]

  return (
    <section id='beneficios' className='relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.1),transparent_70%)]' />
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-40' />

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-full text-button-primary'>
              🎁 Benefícios Reais
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              O Que Você Ganha Quando Seu Perfil{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Finalmente Vende
              </span>
            </h2>
          </div>
        </MSection>

        <MStagger className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          {beneficios.map((item, idx) => (
            <MItem key={idx}>
              <ScrollReveal direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 100}>
                <TiltCard className='h-full'>
                  <div className='group relative h-full'>
                    {/* Animated border */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`} />

                    {/* Card content */}
                    <div className='relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300'>
                      {/* Icon with glow */}
                      <div className='relative inline-block mb-4 sm:mb-6'>
                        <div className='absolute inset-0 bg-button-primary/30 blur-xl rounded-full animate-pulse-glow' />
                        <div className='relative text-4xl sm:text-5xl'>{item.icon}</div>
                      </div>

                      <h3 className='font-display text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-3 sm:mb-4 group-hover:text-button-primary transition-colors'>
                        {item.title}
                      </h3>

                      <p className='text-text-secondary text-sm sm:text-base leading-relaxed'>
                        {item.description}
                      </p>

                      {/* Decorative element */}
                      <div className='absolute bottom-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-button-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    </div>
                  </div>                </TiltCard>              </ScrollReveal>
            </MItem>
          ))}
        </MStagger>
      </div>
    </section>
  )
}
