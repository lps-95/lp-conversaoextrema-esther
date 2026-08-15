import { problemContent } from '../../content/problem'
import { useLanguage } from '../../contexts/LanguageContext'

const cardGradients = [
  'from-red-500/20 to-orange-500/20',
  'from-orange-500/20 to-yellow-500/20',
  'from-yellow-500/20 to-red-500/20',
]

export default function Problem() {
  const { language } = useLanguage()
  const content = problemContent[language]

  return (
    <section id='problema' className='relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05),transparent_70%)]' />
      <div className='absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] -translate-y-1/2' />

      <div className='max-w-4xl mx-auto px-4 relative z-10'>
        {/* Badge */}
        <div className='text-center mb-12'>
          <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full text-red-400'>
            {content.badge}
          </span>
          <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
            {content.title.prefix}
            <span className='bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>
              {content.title.highlight}
            </span>
          </h2>
        </div>

        {/* Emotional validation section */}
        <div className='space-y-6 mb-12'>
          {content.moments.map((moment, i) => (
            <div className='group relative' key={moment.heading}>
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${cardGradients[i]} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300`} />
              <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8'>
                <div className='flex gap-4 items-start'>
                  <span className='text-3xl flex-shrink-0'>{moment.emoji}</span>
                  <div>
                    <p className='text-text-primary font-bold text-lg mb-2'>{moment.heading}</p>
                    <p className='text-text-secondary text-base leading-relaxed'>
                      {moment.before}
                      <span className='text-text-primary font-semibold'>{moment.highlight}</span>
                      {moment.after}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* The harsh truth */}
          <div className='group relative mt-8'>
            <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition duration-300 animate-gradient-x' />
            <div className='relative bg-gradient-to-br from-button-primary/20 to-accent-gold/20 backdrop-blur-xl border-2 border-button-primary/50 rounded-2xl p-6 sm:p-8'>
              <div className='flex items-start gap-4'>
                <span className='text-3xl flex-shrink-0'>{content.harshTruth.emoji}</span>
                <div>
                  <p className='text-text-primary font-bold text-lg mb-2'>{content.harshTruth.heading}</p>
                  <p className='text-text-secondary text-base leading-relaxed'>
                    {content.harshTruth.before}
                    <span className='text-button-primary font-bold'>{content.harshTruth.highlight1}</span>
                    {content.harshTruth.middle}
                    <span className='text-button-primary'>{content.harshTruth.highlight2}</span>
                  </p>
                  <p className='text-text-primary font-semibold text-base mt-3'>{content.harshTruth.closing}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA transition */}
        <div className='text-center'>
          <p className='text-lg text-button-primary font-bold'>{content.ctaGood}</p>
          <p className='text-text-secondary mt-2'>{content.ctaSub}</p>
        </div>
      </div>
    </section>
  )
}
