import { useState } from 'react'
import { faqContent } from '../../content/faq'
import { useLanguage } from '../../contexts/LanguageContext'
import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'

type Props = {
  onTrack: (event: string, props?: any) => void
}

export default function FAQ({ onTrack }: Props) {
  const [openIndex, setOpenIndex] = useState(0)
  const { language } = useLanguage()
  const content = faqContent[language]

  return (
    <section id='faq' className='relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black border-y border-white/10 overflow-hidden'>
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_30%,rgba(255,214,102,0.1),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_28%)]' />

      <div className='max-w-5xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-4 text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-400'>
              {content.badge}
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                {content.title}
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>{content.subtitle}</p>
          </div>
        </MSection>

        <MStagger className='space-y-4 lg:space-y-6 mb-16'>
          {content.faqs.map((faq, idx) => (
            <MItem key={faq.number}>
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
