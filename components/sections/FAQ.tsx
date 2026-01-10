import { useState } from 'react'
import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'

type Props = {
  onTrack: (event: string, props?: any) => void
}

export default function FAQ({ onTrack }: Props) {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      number: '01',
      question: 'Quanto tempo leva para ver os primeiros resultados de venda?',
      answer: 'Os primeiros sinais aparecem em 30 dias com mais mensagens qualificadas no direct. Vendas orgânicas começam entre 60 e 90 dias de implementação estratégica. Alguns clientes relatam primeira venda já na 3ª semana, dependendo do ticket médio e público.',
      color: 'from-green-500/20 to-emerald-500/20',
      icon: '⏱️'
    },
    {
      number: '02',
      question: 'Eu preciso aparecer em vídeos ou fazer dancinhas para vender?',
      answer: 'Não. Autoridade digital vem de posicionamento claro e narrativa estratégica, não de exposição forçada. Você vende através de conteúdo profissional que mostra expertise, não de trends virais. Muitas alunas gerenciam perfil de forma discreta e mesmo assim fecham contratos altos.',
      color: 'from-blue-500/20 to-purple-500/20',
      icon: '🎬'
    },
    {
      number: '03',
      question: 'Funciona para qualquer nicho ou só para alguns mercados específicos?',
      answer: 'Funciona para qualquer profissional com expertise validada que vende conhecimento ou serviços. Coaches, consultoras, terapeutas, arquitetas, nutricionistas, designers e infoprodutoras já comprovaram resultados. A metodologia é agnóstica ao nicho.',
      color: 'from-purple-500/20 to-pink-500/20',
      icon: '🎯'
    },
    {
      number: '04',
      question: 'Qual é o investimento mensal? Há alguma taxa oculta?',
      answer: 'Nós operamos com planos fixos e transparentes: Essencial, Profissional e Premium. Sem taxas ocultas. Você sabe exatamente o que paga e recebe. Após 90 dias, muitas clientes geram receita que cobre o investimento muitas vezes.',
      color: 'from-button-primary/20 to-accent-gold/20',
      icon: '💰'
    },
    {
      number: '05',
      question: 'Preciso estar todos os dias no Instagram ou a Esther faz tudo?',
      answer: 'Dependendo do plano: Essencial você gera o conteúdo, Profissional fazemos juntas, Premium nós fazemos tudo. Você nunca fica preso ao algoritmo. A gestão é estratégica e hands-off conforme você escolher.',
      color: 'from-cyan-500/20 to-blue-500/20',
      icon: '⚙️'
    },
    {
      number: '06',
      question: 'E se não funcionar? Existe garantia ou reembolso?',
      answer: 'Sim. Se você não ver mudanças palpáveis de engajamento, mensagens qualificadas e movimento em direção a vendas após 90 dias de trabalho integrado, oferecemos revisão completa ou reembolso. Sua satisfação é garantida.',
      color: 'from-orange-500/20 to-red-500/20',
      icon: '✅'
    }
  ]

  return (
    <section id='faq' className='relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black border-y border-white/10 overflow-hidden'>
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_30%,rgba(255,214,102,0.1),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_28%)]' />

      <div className='max-w-5xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-4 text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-400'>
              ❓ Perguntas Frequentes
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Elimine Suas Objeções
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
              As 6 perguntas que todo mundo faz antes de começar
            </p>
          </div>
        </MSection>

        <MStagger className='space-y-4 lg:space-y-6 mb-16'>
          {faqs.map((faq, idx) => (
            <MItem key={idx}>
              <div className='group/details relative'>
                {/* Animated border */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${faq.color} rounded-2xl blur opacity-0 ${openIndex === idx ? 'opacity-60' : ''} group-hover/details:opacity-40 transition-all duration-500`} />

                {/* Card */}
                <div className='relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden group-hover/details:border-white/30 transition-all duration-300'>
                  {/* Summary - Pergunta */}
                  <button
                    onClick={() => {
                      setOpenIndex(openIndex === idx ? -1 : idx)
                      onTrack('faq_open', { question: faq.number })
                    }}
                    className='w-full flex items-start gap-4 sm:gap-6 p-6 sm:p-8 cursor-pointer select-none hover:bg-white/5 transition-colors duration-300 text-left'
                  >
                    {/* Número com ícone */}
                    <div className='flex-shrink-0 flex flex-col items-center gap-2'>
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${faq.color} border border-white/20 flex items-center justify-center font-bold text-lg sm:text-xl ${openIndex === idx ? 'scale-110' : ''} transition-transform duration-300`}>
                        {faq.number}
                      </div>
                      <div className='text-2xl'>{faq.icon}</div>
                    </div>

                    {/* Pergunta */}
                    <div className='flex-1 pt-1'>
                      <h3 className={`font-display text-lg sm:text-xl font-bold ${openIndex === idx ? 'text-button-primary' : 'text-text-primary'} transition-colors duration-300 text-left`}>
                        {faq.question}
                      </h3>
                    </div>

                    {/* Indicador */}
                    <div className={`flex-shrink-0 text-button-primary ${openIndex === idx ? 'opacity-100 rotate-180' : 'opacity-60'} transition-all duration-300`}>
                      <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>
                  </button>

                  {/* Answer - Resposta */}
                  {openIndex === idx && (
                    <div className='px-6 sm:px-8 pb-6 sm:pb-8 border-t border-white/10 bg-gradient-to-br from-white/5 to-transparent animate-in fade-in slide-in-from-top-2 duration-300'>
                      <div className='ml-0 sm:ml-20'>
                        <p className='text-text-secondary text-base leading-relaxed'>
                          {faq.answer}
                        </p>

                        {/* Helper text */}
                        <div className='mt-4 flex items-start gap-2'>
                          <span className='text-green-400 text-lg flex-shrink-0 mt-0.5'>✓</span>
                          <span className='text-sm text-text-tertiary'>
                            {idx === 0 && 'A maioria vê movimento significativo no 1º mês'}
                            {idx === 1 && 'Você mantém sua privacidade e profissionalismo'}
                            {idx === 2 && 'Já transformamos 200+ profissionais de diversos mercados'}
                            {idx === 3 && 'Sem cobranças surpresa ou aumentos sem aviso'}
                            {idx === 4 && 'A flexibilidade é parte do nosso diferencial'}
                            {idx === 5 && 'Sua satisfação é nossa prioridade máxima'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </MItem>
          ))}
        </MStagger>

        {/* CTA Final */}
        <MSection>
          <div className='text-center'>
            <div className='group relative inline-block'>
              <div className='absolute -inset-2 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-gradient-x' />
              <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-10 max-w-2xl'>
                <div className='text-4xl mb-4'>🤝</div>
                <h3 className='font-display text-2xl sm:text-3xl font-bold mb-4'>
                  Ainda tem dúvidas?
                </h3>
                <p className='text-text-secondary text-base sm:text-lg mb-6 leading-relaxed'>
                  Agende uma conversa estratégica gratuita de 20 minutos. Vamos entender se o <strong className='text-button-primary'>Método Narrativa Vendedora</strong> é exatamente o que você precisa para decolar suas vendas.
                </p>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                  <a
                    href='#form'
                    onClick={() => onTrack('cta_click', { id: 'faq_final' })}
                    className='group/cta relative inline-block'
                  >
                    <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur opacity-60 group-hover/cta:opacity-100 transition duration-300' />
                    <div className='relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-base sm:text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-200 shadow-xl'>
                      Começar Agora
                      <span className='ml-2'>→</span>
                    </div>
                  </a>
                  <a
                    href='#form'
                    className='text-button-primary hover:text-accent-gold transition-colors font-semibold text-base'
                  >
                    ou saiba mais detalhes
                  </a>
                </div>
              </div>
            </div>
          </div>
        </MSection>
      </div>
    </section>
  )
}
