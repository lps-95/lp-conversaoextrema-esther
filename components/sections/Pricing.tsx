import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'

type Props = {
  onChoosePlan: (id: 'pricing_essential' | 'pricing_professional' | 'pricing_premium') => void
}

export default function Pricing({ onChoosePlan }: Props) {
  return (
    <section id='planos' className='relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-accent-brown/5 to-black border-y border-accent-brown/30'>
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,102,0.10),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_30%)]' />
      <ParallaxLayer speed={0.02} className='absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-button-primary/10 to-transparent' />
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <MSection>
            <div className='inline-block mb-4'>
              <div className='px-4 py-2 bg-gradient-to-r from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-full text-button-primary text-sm font-bold backdrop-blur-xl'>
                💎 Planos e Investimento
              </div>
            </div>
            <h2 className='font-display text-4xl sm:text-5xl font-bold mb-6'>
              <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent animate-gradient-x'>
                Escolha Seu Plano
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto mb-4'>
              Transforme seu perfil invisível com estratégia
            </p>
            <div className='inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full'>
              <p className='text-red-400 text-sm font-medium'>
                <span className='font-bold'>⚡ ATENÇÃO:</span> Apenas 8 vagas/mês • Lista de espera: 45 dias
              </p>
            </div>
          </MSection>
        </div>

        <MStagger className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12'>
          {/* Plano Essencial */}
          <MItem className='group relative'>
            <div className='relative h-full bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-button-primary/40 transition-all duration-300 flex flex-col'>

              <div className='mb-5'>
                <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4'>
                  <span className='w-2 h-2 bg-button-primary rounded-full animate-pulse' />
                  <span className='text-text-secondary text-xs font-semibold uppercase tracking-widest'>Consultoria Extrema</span>
                </div>

                <h3 className='font-display text-2xl font-bold text-text-primary mb-3'>
                  Saia da Invisibilidade
                </h3>

                <div className='flex items-end gap-2 mb-4'>
                  <span className='text-5xl font-bold text-button-primary'>R$ 500,00</span>
                  <span className='text-text-tertiary text-base mb-2'>/mês</span>
                </div>

                <p className='text-text-secondary text-sm leading-relaxed'>
                Um direcionamento completo do seu Instagram pra te DESTRAVAR de vez
                </p>
              </div>

              <div className='space-y-2.5 mb-6 flex-1'>
                {[
                  'Reunião de 4hrs com intervalo de 1h',
                  '20 dias de postagens para o seu feed',
                  'Direcionamento em posicionamento e estética ',
                  'Introdução ao stories e como começar a ser estratégica',
                  'PDF da apresentação em mãos para lembrar e rever quando quiser',
                  'Exercício de direcionamento e criação de persona para memorização'
                ].map((item, i) => (
                  <div key={i} className='flex items-start gap-2.5'>
                    <div className='w-5 h-5 rounded-full bg-button-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <svg className='w-3 h-3 text-button-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='3'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <span className='text-text-secondary text-sm'>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onChoosePlan('pricing_essential')}
                className='w-full bg-gradient-to-r from-button-primary/10 to-accent-gold/10 hover:from-button-primary hover:to-accent-gold text-button-primary hover:text-primary-dark font-bold text-sm py-4 rounded-xl border border-button-primary/30 hover:border-transparent transition-all duration-300 group/btn'
              >
                <span className='flex items-center justify-center gap-2'>
                  Escolher Plano
                  <svg className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                  </svg>
                </span>
              </button>
            </div>
          </MItem>

          {/* Plano Profissional - DESTAQUE */}
          <MItem className='group relative md:scale-105 md:-mt-4 md:mb-4'>
            <div className='absolute -inset-1 bg-gradient-to-br from-button-primary/40 via-accent-gold/40 to-button-primary/40 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500' />

            <div className='relative h-full bg-gradient-to-br from-accent-gold/10 via-button-primary/10 to-accent-gold/10 backdrop-blur-sm border-2 border-accent-gold/50 rounded-3xl p-6 flex flex-col'>

              <div className='absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-accent-gold to-button-primary rounded-full shadow-lg'>
                <span className='text-primary-dark text-xs font-bold uppercase tracking-wide'>⭐ Mais Escolhido</span>
              </div>

              <div className='mb-5 mt-2'>
                <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-accent-gold/20 border border-accent-gold/40 rounded-full mb-4'>
                  <span className='w-2 h-2 bg-accent-gold rounded-full animate-pulse' />
                  <span className='text-accent-gold text-xs font-semibold uppercase tracking-widest'>Gestão Extrema</span>
                </div>

                <h3 className='font-display text-2xl font-bold text-text-primary mb-3'>
                  Sistema Completo
                </h3>

                <div className='flex items-end gap-2 mb-4'>
                  <span className='text-5xl font-bold bg-gradient-to-r from-accent-gold to-button-primary bg-clip-text text-transparent'>
                    R$ 2.400
                  </span>
                  <span className='text-text-tertiary text-base mb-2'>/mês</span>
                </div>

                <p className='text-text-secondary text-sm leading-relaxed'>
                  Previsibilidade financeira com 90 dias.
                </p>
              </div>

              <div className='space-y-2.5 mb-6 flex-1'>
                {[
                  { text: 'Tudo da consultoria extrema', bold: true },
                  { text: 'Sistema de Narrativas 90 dias' },
                  { text: 'Calendário editorial completo' },
                  { text: 'Banco de roteiros anti-bloqueio' },
                  { text: '2 campanhas de lançamento' },
                  { text: 'Stories persuasivos' },
                  { text: 'Reunião estratégica mensal'},
                  {text: 'Bônus exclusivos'},
                
                ].map((item, i) => (
                  <div key={i} className='flex items-start gap-2.5'>
                    <div className='w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <svg className='w-3 h-3 text-accent-gold' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='3'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <span className={`text-sm ${item.bold ? 'text-text-primary font-semibold' : 'text-text-secondary'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onChoosePlan('pricing_professional')}
                className='w-full bg-gradient-to-r from-accent-gold to-button-primary hover:from-button-primary hover:to-accent-gold text-primary-dark font-bold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn'
              >
                <span className='flex items-center justify-center gap-2'>
                  Escolher Plano
                  <svg className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                  </svg>
                </span>
              </button>
            </div>
          </MItem>

          {/* Plano Premium */}
          <MItem className='group relative'>
            <div className='relative h-full bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-purple-400/40 transition-all duration-300 flex flex-col'>

              <div className='mb-5'>
                <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4'>
                  <span className='w-2 h-2 bg-purple-400 rounded-full animate-pulse' />
                  <span className='text-purple-400 text-xs font-semibold uppercase tracking-widest'>Escolha do seu jeito</span>
                </div>

                <h3 className='font-display text-2xl font-bold text-text-primary mb-3'>
                  Escolha você mesmo o que deseja
                </h3>

                <div className='flex items-end gap-2 mb-4'>
                  <span className='text-5xl font-bold text-purple-400'></span>
                  {/* <span className='text-text-tertiary text-base mb-2'>/mês</span> */}
                </div>

                <p className='text-text-secondary text-sm leading-relaxed'>
                  Feito sob medida pensando em você
                </p>
              </div>

              <div className='space-y-2.5 mb-6 flex-1'>
                {[
                  { text: 'Pacotes de videos mobile para Reels e Stories', bold: false },
                  { text: 'Pacotes fotos profissionais em estúdios ou no seu local' },
                ].map((item, i) => (
                  <div key={i} className='flex items-start gap-2.5'>
                    <div className='w-5 h-5 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <svg className='w-3 h-3 text-purple-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='3'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <span className={`text-sm ${item.bold ? 'text-text-primary font-semibold' : 'text-text-secondary'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onChoosePlan('pricing_premium')}
                className='w-full bg-gradient-to-r from-purple-500/10 to-purple-400/10 hover:from-purple-500 hover:to-purple-400 text-purple-400 hover:text-white font-bold text-sm py-4 rounded-xl border border-purple-400/30 hover:border-transparent transition-all duration-300 group/btn'
              >
                <span className='flex items-center justify-center gap-2'>
                  Escolher Plano
                  <svg className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                  </svg>
                </span>
              </button>
            </div>
          </MItem>
        </MStagger>

        {/* <MSection>
          <div className='group relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-button-primary/30 via-accent-gold/30 to-button-primary/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10'>
              <div className='text-center mb-8'>
                <div className='text-3xl mb-3'>📊</div>
                <h3 className='font-display text-2xl sm:text-3xl font-bold mb-2'>
                  <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent'>
                    Comparação Detalhada
                  </span>
                </h3>
                <p className='text-text-secondary'>Veja todos os recursos incluídos em cada plano</p>
              </div>
              <div className='overflow-x-auto -mx-4 sm:mx-0'>
                <table className='w-full text-xs sm:text-sm md:text-base min-w-[600px] lg:min-w-0'>
                  <thead>
                    <tr className='border-b border-button-primary/30'>
                      <th className='text-left py-3 sm:py-4 px-2 sm:px-4 md:px-6 font-bold text-text-primary'>Recurso</th>
                      <th className='text-center py-3 sm:py-4 px-2 sm:px-4 md:px-6 font-bold text-text-primary whitespace-nowrap'>Essencial</th>
                      <th className='text-center py-3 sm:py-4 px-2 sm:px-4 md:px-6 font-bold text-accent-gold whitespace-nowrap'>Profissional</th>
                      <th className='text-center py-3 sm:py-4 px-2 sm:px-4 md:px-6 font-bold text-text-primary whitespace-nowrap'>Premium</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-button-primary/20'>
                    {[
                      ['Diagnóstico completo', '✓', '✓', '✓'],
                      ['Arquitetura de identidade', '✓', '✓', '✓'],
                      ['Planejamento estratégico', '✓', '✓', '✓'],
                      ['Gestão executiva', '✓', '✓', '✓'],
                      ['Relatório mensal', '✓', '✓', '✓'],
                      ['Suporte WhatsApp', '✓', '✓', 'Prioritário'],
                      ['Sistema de narrativas', '—', '✓', '✓'],
                      ['Calendário editorial', '—', '✓', '✓'],
                      ['Banco de roteiros', '—', '✓', '✓'],
                      ['Workshop algorítmico', '—', '✓', '✓'],
                      ['Reunião estratégica', '—', '✓', '✓'],
                      ['Campanhas de lançamento', '—', '2x', '2x'],
                      ['Diagnóstico presencial', '—', '—', '✓'],
                      ['Sessão de posicionamento', '—', '—', '✓'],
                      ['Criação de ofertas', '—', '—', '✓'],
                      ['Análise competitiva', '—', '—', '✓'],
                      ['Consultoria individual', '—', '—', '1h/mês'],
                      ['Banco de recursos vitalício', '—', '—', '✓'],
                    ].map(([label, a, b, c]) => (
                      <tr key={label}>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-text-secondary text-left'>{label}</td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-center text-button-primary whitespace-nowrap'>{a}</td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-center text-accent-gold whitespace-nowrap'>{b}</td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-center text-button-primary whitespace-nowrap'>{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </MSection> */}
      </div >
    </section >
  )
}
