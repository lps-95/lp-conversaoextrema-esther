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

  const testimonials = [
    {
      quote: 'Em 90 dias meu perfil saiu de 1.200 para 8.500 seguidores. O melhor? São leads qualificados que viram clientes.',
      author: 'Juliana Mendes',
      role: 'Consultora de Negócios',
      result: '+R$ 47k/mês',
      before: '1.2k seguidores',
      after: '8.5k seguidores',
      stars: 5,
      gradient: 'from-green-500/20 to-emerald-500/20',
      verification: 'Resultado verificado'
    },
    {
      quote: 'Passei 3 anos tentando crescer sozinha. Em 4 meses com a Esther fechei 12 contratos de R$ 5k cada. Zero esforço da minha parte.',
      author: 'Fernanda Costa',
      role: 'Coach Executiva',
      result: '12 contratos fechados',
      before: '200 curtidas/post',
      after: '2.5k curtidas/post',
      stars: 5,
      gradient: 'from-blue-500/20 to-purple-500/20',
      verification: 'Resultado verificado'
    },
    {
      quote: 'Meu Instagram virou minha vendedora 24h. Acordo com mensagens de pessoas querendo contratar. É surreal.',
      author: 'Marina Silva',
      role: 'Arquiteta de Interiores',
      result: '+320% engajamento',
      before: '500 alcance/post',
      after: '6.8k alcance/post',
      stars: 5,
      gradient: 'from-purple-500/20 to-pink-500/20',
      verification: 'Resultado verificado'
    },
    {
      quote: 'Investia em tráfego pago sem retorno. Agora vendo orgânico todos os dias e cancelei os anúncios.',
      author: 'Carla Oliveira',
      role: 'Terapeuta Holística',
      result: '8-10 vendas/mês',
      before: 'R$ 3k investidos em ads',
      after: 'R$ 0 em ads',
      stars: 5,
      gradient: 'from-orange-500/20 to-red-500/20',
      verification: 'Resultado verificado'
    },
    {
      quote: 'Eu tinha vergonha do meu perfil. Hoje meus clientes me acham pelo Instagram e chegam impressionados.',
      author: 'Beatriz Santos',
      role: 'Nutricionista Esportiva',
      result: '+15 clientes novos',
      before: 'Perfil desorganizado',
      after: 'Autoridade reconhecida',
      stars: 5,
      gradient: 'from-cyan-500/20 to-blue-500/20',
      verification: 'Resultado verificado'
    },
    {
      quote: 'Parei de perseguir cliente. Eles me perseguem agora. Lista de espera de 2 meses.',
      author: 'Patrícia Lima',
      role: 'Designer de Interiores',
      result: 'Lista de espera 2 meses',
      before: 'Caçando clientes',
      after: 'Sendo caçada',
      stars: 5,
      gradient: 'from-pink-500/20 to-rose-500/20',
      verification: 'Resultado verificado'
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

        {/* Stats Cards */}
        <MStagger className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20'>
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
                  </div>
                </TiltCard>
              </ScrollReveal>
            </MItem>
          ))}
        </MStagger>

        {/* Testimonials Section */}
        <MSection>
          <div className='text-center mb-12'>
            <h3 className='font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3'>
              Elas Pararam De Postar Sozinhas E{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Começaram A Vender Todos Os Dias
              </span>
            </h3>
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

        {/* Authority Banner */}
        <MSection>
          <div className='group relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500 animate-gradient-x' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12 overflow-hidden'>
              {/* Background pattern */}
              <div className='absolute inset-0 opacity-5'>
                <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                  <defs>
                    <pattern id='auth-pattern' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
                      <path d='M 40 0 L 0 0 0 40' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-white' />
                    </pattern>
                  </defs>
                  <rect width='100%' height='100%' fill='url(#auth-pattern)' />
                </svg>
              </div>

              <div className='relative'>
                {/* Top section */}
                <div className='text-center mb-10'>
                  <div className='text-5xl mb-4'>🏆</div>
                  <h3 className='font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'>
                    <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                      Mais de R$ 50 Milhões em Vendas Orgânicas
                    </span>
                  </h3>
                  <p className='text-text-secondary leading-relaxed max-w-2xl mx-auto text-base sm:text-lg'>
                    Resultados comprovados com <strong className='text-button-primary'>200+ empresárias mentoradas</strong> em todo Brasil
                  </p>
                </div>

                {/* Stats grid */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10'>
                  {[
                    { emoji: '⭐', number: '5.0', label: 'Avaliação Média', sublabel: 'Satisfação total' },
                    { emoji: '💎', number: '200+', label: 'Alunas Ativas', sublabel: 'Transformadas' },
                    { emoji: '🚀', number: 'R$ 50M+', label: 'Vendas Geradas', sublabel: 'Resultado comprovado' },
                    { emoji: '👑', number: '100%', label: 'Metodologia', sublabel: 'Exclusiva e validada' }
                  ].map((item, idx) => (
                    <div key={idx} className='group/stat text-center'>
                      <div className='bg-gradient-to-br from-button-primary/10 to-accent-gold/10 border border-button-primary/20 rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300'>
                        <div className='text-3xl sm:text-4xl mb-3 group-hover/stat:scale-110 transition-transform duration-300'>
                          {item.emoji}
                        </div>
                        <div className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent mb-1'>
                          {item.number}
                        </div>
                        <div className='text-text-primary text-sm font-semibold mb-1'>{item.label}</div>
                        <div className='text-text-tertiary text-xs'>{item.sublabel}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div className='bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6'>
                  <div className='text-center mb-4'>
                    <p className='text-sm font-semibold text-button-primary uppercase tracking-wider'>Certificações e Garantias</p>
                  </div>
                  <div className='flex flex-wrap justify-center items-center gap-6'>
                    {[
                      { icon: '🔒', text: 'Dados Seguros', color: 'text-blue-400' },
                      { icon: '✅', text: 'Resultados Garantidos', color: 'text-green-400' },
                      { icon: '🎓', text: 'Método Validado', color: 'text-purple-400' },
                      { icon: '💯', text: 'Satisfação 100%', color: 'text-accent-gold' },
                      { icon: '🏅', text: 'Top Rated 2024', color: 'text-button-primary' }
                    ].map((badge, idx) => (
                      <div key={idx} className='flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 transition-colors duration-300'>
                        <span className='text-xl'>{badge.icon}</span>
                        <span className={`text-xs font-medium ${badge.color}`}>{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MSection>
      </div>
    </section>
  )
}
