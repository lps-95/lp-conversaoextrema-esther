import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'

export default function NumbersProof() {


  const testimonials = [
    {
      title: 'Medo de Perder Autenticidade Ao Delegar',
      quote: 'Meu maior medo era entregar meu consultório e perder minha voz. A Esther passou 2 semanas estudando meu jeito de atender para entender minha abordagem. Hoje meus pacientes dizem que parece até mais "eu" do que quando eu fazia os posts sozinha.',
      author: 'Priscila Mendes',
      role: 'Biomédica Estética',
      result: '2 → 8-12 consultas/mês',
      before: 'Posts próprios (resultado: 2 consultas/mês)',
      after: 'Esther gerencia com minha voz (resultado: 8-12/mês)',
      stars: 5,
      gradient: 'from-purple-500/20 to-pink-500/20',
      verification: 'Resultado verificado',
      objectiveNeutralized: 'Autenticidade preservada + crescimento'
    },
    {
      title: 'Investimento Anterior Sem Resultado',
      quote: 'Já tinha gasto R$ 12.000 com agência que prometeu autoridade e entregou reels bonitos que ninguém comprava. Esther mostrou o funil de vendas na primeira reunião. Em 8 semanas fechei 2 contratos para meu espaço de estética, totalizando R$ 16.000 em serviços.',
      author: 'Stefania Costa',
      role: 'Esteticista',
      result: '2 × R$ 8.000 em 8 semanas',
      before: 'Agência anterior: R$ 12k investidos, zero vendas',
      after: 'Com Esther: ROI recuperado + lucro extra',
      stars: 5,
      gradient: 'from-green-500/20 to-emerald-500/20',
      verification: 'Resultado verificado',
      objectiveNeutralized: 'Prova de ROI tangível vs agência anterior'
    },
    {
      title: 'Objeção: Não Tenho Tempo Para Gerenciar',
      quote: 'Atendo 40h semanais no meu espaço de estética. Não tinha como ficar pensando em reel toda semana. O processo exigiu 3h minhas no primeiro mês e depois só 40 minutos mensais para aprovar planejamento. Meu Instagram roda sozinho e gera leads todo dia.',
      author: 'Jessica Teixeira',
      role: 'Personal Trainer',
      result: '+15 clientes novos em 90 dias',
      before: 'Tentativa própria: 12h/semana criando posts',
      after: 'Com Esther: 40 min/mês de colaboração',
      stars: 5,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      verification: 'Resultado verificado',
      objectiveNeutralized: 'Tempo mínimo exigido comprovado'
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
              ⭐ Resultados Reais
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              Enquanto Você Pensa, Outras{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Já Estão Ganhando
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
              Números e transformações comprovadas em 90 dias
            </p>
          </div>
        </MSection>

        {/* Testimonials Section */}
        <MSection>
          <div className='text-center mb-12'>
            <h3 className='font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3'>
              Objeções Mais Comuns E Como{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Foram Destruídas
              </span>
            </h3>
            <p className='text-text-secondary text-base sm:text-lg'>Histórias reais de clientes que superaram as mesmas dúvidas que você tem agora</p>
          </div>
        </MSection>

        <MStagger className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12'>
          {testimonials.map((item, idx) => (
            <MItem key={idx}>
              <ScrollReveal direction='up' delay={idx * 100}>
                <div className='group relative h-full'>
                  {/* Animated border */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`} />

                  {/* Card content */}
                  <div className='relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 flex flex-col hover:scale-[1.02] transition-all duration-300'>
                    {/* Objection Title */}
                    <div className='mb-4 pb-4 border-b border-white/20'>
                      <div className='inline-block px-3 py-1 bg-button-primary/20 border border-button-primary/30 rounded-full'>
                        <p className='text-xs font-bold text-button-primary uppercase tracking-widest'>{item.title}</p>
                      </div>
                    </div>

                    {/* Stars rating */}
                    <div className='flex items-center gap-1 mb-3'>
                      {[...Array(item.stars)].map((_, i) => (
                        <span key={i} className='text-accent-gold text-sm'>★</span>
                      ))}
                      <span className='ml-2 text-xs text-text-tertiary'>({item.stars}.0)</span>
                    </div>

                    {/* Quote */}
                    <div className='flex-1 mb-4'>
                      <div className='text-button-primary text-3xl font-display mb-2 opacity-50 leading-none'>❝</div>
                      <p className='text-base text-text-primary font-medium leading-relaxed'>
                        {item.quote}
                      </p>
                    </div>

                    {/* Before/After */}
                    <div className='mb-4 pb-4 border-b border-white/10'>
                      <div className='grid grid-cols-2 gap-3'>
                        <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-2.5'>
                          <div className='text-[10px] text-red-400 font-bold mb-1 uppercase tracking-wide'>Antes</div>
                          <div className='text-xs text-text-secondary font-medium leading-tight'>{item.before}</div>
                        </div>
                        <div className='bg-green-500/10 border border-green-500/20 rounded-lg p-2.5'>
                          <div className='text-[10px] text-green-400 font-bold mb-1 uppercase tracking-wide'>Depois</div>
                          <div className='text-xs text-text-primary font-semibold leading-tight'>{item.after}</div>
                        </div>
                      </div>
                    </div>

                    {/* Result badge */}
                    <div className='mb-4'>
                      <div className='inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg'>
                        <span className='text-green-400 text-lg'>💰</span>
                        <span className='text-green-400 text-sm font-bold'>{item.result}</span>
                      </div>
                    </div>

                    {/* Author */}
                    <div className='flex items-center justify-between pt-4 border-t border-white/10'>
                      <div className='flex items-center gap-3'>
                        <div className='w-11 h-11 bg-gradient-to-br from-button-primary to-accent-gold rounded-full flex items-center justify-center text-primary-dark font-bold shadow-lg'>
                          {item.author.charAt(0)}
                        </div>
                        <div>
                          <p className='text-text-primary font-bold text-sm'>{item.author}</p>
                          <p className='text-text-tertiary text-xs'>{item.role}</p>
                        </div>
                      </div>

                      {/* Verification badge */}
                      <div className='flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full'>
                        <svg className='w-3 h-3 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                        </svg>
                        <span className='text-[9px] text-blue-400 font-semibold uppercase tracking-wide'>Verificado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </MItem>
          ))}
        </MStagger>



      </div>
    </section>
  )
}
