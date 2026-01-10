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
      question: 'Quanto tempo leva para ver resultados? (Vendas, não likes)',
      answer: 'Movimento real no direct (mensagens qualificadas) começa em 3-4 semanas. Primeira venda orgânica acontece entre 6-10 semanas dependendo do seu ticket e ciclo de venda. A maioria das clientes vê ROI completo (recupera investimento) entre 2-3 meses através de 2-3 contratos fechados. Marina (arquiteta) fechou primeiro contrato na semana 7. Carla (terapeuta) teve 3 vendas no segundo mês.',
      color: 'from-green-500/20 to-emerald-500/20',
      icon: '⏱️'
    },
    {
      number: '02',
      question: 'Preciso aparecer em vídeos ou fazer dancinhas para vender?',
      answer: 'Não. Autoridade não vem de exposição forçada, vem de posicionamento estratégico. 60% das nossas clientes nunca aparecem em vídeo e vendem consistentemente através de carrosséis, posts de texto e stories estratégicos. Se você se sente confortável em vídeo, usamos isso a favor. Se não, construímos sua máquina de vendas sem exigir que você vire influencer. A prova? Beatriz (nutricionista) trabalha 50h semanais, não faz vídeos, e gera 15+ clientes novos a cada ciclo.',
      color: 'from-blue-500/20 to-purple-500/20',
      icon: '🎬'
    },
    {
      number: '03',
      question: 'E se eu entregar meu perfil e ele perder minha autenticidade?',
      answer: 'Esse é o medo número 1 e por isso dedicamos as primeiras 2 semanas só estudando sua voz, valores e jeitos de falar antes de criar um único post. Você aprova todo conteúdo antes de publicar e tem controle total sobre o que vai ao ar. Marina (arquiteta) tinha exatamente esse medo e hoje seus clientes dizem que o perfil parece "ainda mais ela" do que quando fazia sozinha. Confiança e autenticidade é não-negociável.',
      color: 'from-purple-500/20 to-pink-500/20',
      icon: '🎯'
    },
    {
      number: '04',
      question: 'Já investi em gestão antes e não funcionou. Por que seria diferente?',
      answer: 'A maioria das agências entrega posts bonitos sem estratégia de vendas. Nós não somos agência, somos estrategistas de conversão. A diferença: mostramos o funil de vendas completo na primeira reunião, você vê exatamente como cada post conecta à jornada de compra, e acompanha métricas que importam (consultas geradas, vendas fechadas) não métricas de vaidade (curtidas, seguidores). Carla gastou R$ 12k com agência que prometeu autoridade e entregou zero vendas. Conosco fechou 2 contratos de R$ 8k em 8 semanas. É a diferença entre criar posts e criar resultados.',
      color: 'from-button-primary/20 to-accent-gold/20',
      icon: '💰'
    },
    {
      number: '05',
      question: 'Não tenho tempo para reuniões semanais e aprovações constantes',
      answer: 'Entendemos. O processo exige 3-4 horas suas no primeiro mês (reunião de imersão + aprovação de planejamento). Depois disso, apenas 40 minutos mensais para aprovar o calendário do mês seguinte. Todo o resto (criação, edição, agendamento, gestão) é 100% executado por nós. Beatriz (nutricionista) trabalha 50h semanais atendendo clientes e consegue manter o sistema rodando perfeitamente. Seu Instagram roda sozinho enquanto você trabalha.',
      color: 'from-cyan-500/20 to-blue-500/20',
      icon: '⚙️'
    },
    {
      number: '06',
      question: 'Qual garantia de que vai funcionar? E se não der certo?',
      answer: 'Garantia Dupla: Se após 90 dias seguindo o planejamento estratégico seu perfil não apresentar aumento mensurável em consultas qualificadas e oportunidades de venda, continuamos trabalhando sem custo adicional por mais 30 dias até atingir a meta. Você não arrisca nada além de 90 dias de execução comprometida. Sua satisfação é nossa prioridade - no mercado há muita promessa e pouca entrega. Nós fazemos o oposto.',
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
                            {idx === 0 && 'Resultado verificado: Marina passou de 2 para 8-12 consultas mensais em 90 dias'}
                            {idx === 1 && 'Você mantém sua privacidade e profissionalismo sem exposição forçada'}
                            {idx === 2 && 'Autenticidade preservada + crescimento exponencial comprovado'}
                            {idx === 3 && 'Diferença entre agência genérica e estratégia de conversão'}
                            {idx === 4 && 'Apenas 40 minutos mensais de seu tempo após o primeiro mês'}
                            {idx === 5 && 'Sua satisfação é nossa prioridade - 90 dias de garantia dupla'}
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


      </div>
    </section>
  )
}
