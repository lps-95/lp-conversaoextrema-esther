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
      question: 'Quando vejo minha primeira venda orgânica?',
      answer: 'Primeira venda orgânica em 90 dias (mas depende totalmente do seu desempenho e foco). Aqui está o que sabemos: movimento real no direct (mensagens qualificadas) começa em 3-4 semanas. A primeira venda acontece quando você executa a estratégia com consistência. Exemplo real: Amanda (esteticista) seguiu tudo à risca e fechou seu primeiro contrato na semana 9. Já Priscila (biomédica) demorou 14 semanas porque faltou com a aprovação de posts algumas semanas. A timeline varia, mas com foco e disciplina, 90 dias é realista.',
      color: 'from-green-500/20 to-emerald-500/20',
      icon: '⏱️'
    },
    {
      number: '02',
      question: 'Preciso fazer vídeos, dancinhas ou aparecer muito?',
      answer: 'Não. Você NÃO precisa de vídeos dançando, fazendo trends ou aparecendo de forma exagerada. Precisamos de você em conteúdo estratégico, mas sem a exposição desnecessária. 60% das nossas clientes nunca fazem vídeos dinâmicos - trabalham com carrosséis, reels educativos, stories estratégicos e posts de texto. Jessica (personal trainer) gera 12+ clientes mensais com reels mostrando exercícios educativos (sem danças). Patricia (cabelereira) não aparece em vídeo, só posta antes/depois dos trabalhos. Roberta (dona de ótica) compartilha dicas de cuidado com os olhos em texto. Você vende com inteligência, não com exposição exagerada.',
      color: 'from-blue-500/20 to-purple-500/20',
      icon: '🎬'
    },
    {
      number: '03',
      question: 'E se meu perfil perder a minha autenticidade?',
      answer: 'Esse medo é legítimo e nós levamos a sério. Dedicamos as primeiras 2 semanas estudando sua voz, valores, jeitos de falar, posicionamento único, ANTES de criar um único post. Você aprova tudo que sai no ar e tem controle total. Cleiciane (Psicóloga) tinha esse medo: "Meu perfil é muito pessoal". Hoje ela diz que o perfil está "ainda mais ela". Vanessa (biomédica) pensava que seria corporativo demais. Resultado: clientes dizem que ela passou a ser mais próxima e real. Autenticidade + Estratégia = Vendas reais.',
      color: 'from-purple-500/20 to-pink-500/20',
      icon: '🎯'
    },
    {
      number: '04',
      question: 'Já investi em gestão e não funcionou. Por que seria diferente?',
      answer: 'A maioria das agências entrega posts bonitos sem foco em vendas. Nós somos diferentes: somos estrategistas de conversão, não criadores de conteúdo. Mostramos o funil completo na primeira reunião e você vê como cada post conecta à jornada de compra. Acompanhamos métricas que importam: consultas geradas, vendas fechadas, não curtidas ou likes vazios. Exemplo: Carla (dona de ótica) gastou R$ 12k com agência que entregou zero vendas. Conosco fechou 2 clientes de R$ 8k cada em 8 semanas. A diferença é estratégia + execução focada em resultado.',
      color: 'from-button-primary/20 to-accent-gold/20',
      icon: '💰'
    },
    {
      number: '05',
      question: 'Não tenho tempo para muitas reuniões e aprovações',
      answer: 'Tranquilo. Primeira reunião é imersão profunda (2-3 horas, acontece uma vez). Depois disso, você precisa de apenas 40 minutos mensais para aprovar o planejamento do mês. Todo o resto (criação, edição, agendamento, posting, gestão) é executado por nós. Natália (personal trainer) tem agenda lotada de clientes e consegue participar de uma reunião rápida por mês. Gabriela (cabelereira) aprova posts enquanto come. O sistema roda sozinho depois que você aprova a estratégia.',
      color: 'from-cyan-500/20 to-blue-500/20',
      icon: '⚙️'
    },
    {
      number: '06',
      question: 'Qual garantia vocês dão? E se não der certo?',
      answer: 'Garantia Dupla: Se após 90 dias seguindo a estratégia seu perfil não apresentar aumento mensurável em consultas qualificadas e oportunidades de venda, continuamos trabalhando SEM CUSTO ADICIONAL por mais 30 dias até atingir a meta. Sua satisfação é nossa prioridade, no mercado há muita promessa vazia. Nós fazemos o oposto: resultados provados.',
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
                        {/* <div className='mt-4 flex items-start gap-2'>
                          <span className='text-green-400 text-lg flex-shrink-0 mt-0.5'>✓</span>
                          <span className='text-sm text-text-tertiary'>
                            {idx === 0 && 'Resultado verificado: Marina passou de 2 para 8-12 consultas mensais em 90 dias'}
                            {idx === 1 && 'Você mantém sua privacidade e profissionalismo sem exposição forçada'}
                            {idx === 2 && 'Autenticidade preservada + crescimento exponencial comprovado'}
                            {idx === 3 && 'Diferença entre agência genérica e estratégia de conversão'}
                            {idx === 4 && 'Apenas 40 minutos mensais de seu tempo após o primeiro mês'}
                            {idx === 5 && 'Sua satisfação é nossa prioridade - 90 dias de garantia dupla'}
                          </span>
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </MItem>
          ))}
        </MStagger>


      </div>
    </section>
  )
}
