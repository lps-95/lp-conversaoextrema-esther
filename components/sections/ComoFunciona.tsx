import { comoFuncionaContent } from '../../content/comofunciona'
import { useLanguage } from '../../contexts/LanguageContext'
import { MSection } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'
import TiltCard from '../TiltCard'

// Cores dos badges de destaque de cada passo — não dependem de idioma,
// então ficam aqui (não em content/), uma por índice do passo.
const TAG_COLORS = [
  ['bg-red-500/10 border-red-500/30 text-red-400', 'bg-orange-500/10 border-orange-500/30 text-orange-400'],
  ['bg-blue-500/10 border-blue-500/30 text-blue-400', 'bg-purple-500/10 border-purple-500/30 text-purple-400'],
  ['bg-green-500/10 border-green-500/30 text-green-400', 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'],
  ['bg-purple-500/10 border-purple-500/30 text-purple-400', 'bg-pink-500/10 border-pink-500/30 text-pink-400'],
  ['bg-button-primary/10 border-button-primary/30 text-button-primary', 'bg-accent-gold/10 border-accent-gold/30 text-accent-gold'],
]

export default function ComoFunciona() {
  const { language } = useLanguage()
  const content = comoFuncionaContent[language]

  return (
    <section id='como-funciona' className='relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.08),transparent_70%)]' />
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-40' />

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-400'>
              {content.badge}
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              {content.title.prefix}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                {content.title.highlight}
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>{content.subtitle}</p>
          </div>
        </MSection>

        <div className='space-y-6 lg:space-y-8'>
          {content.steps.map((step, idx) => (
            <ScrollReveal key={step.number} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 100}>
              <TiltCard tiltAmount={5}>
                <div className='group relative'>
                  {/* Animated border glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${step.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-700 animate-gradient-x`} />

                  {/* Card content */}
                  <div className='relative h-full bg-gradient-to-br from-white/[0.12] to-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden group-hover:border-white/40 transition-all duration-500'>
                    {/* Background pattern */}
                    <div className='absolute inset-0 opacity-[0.03]'>
                      <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                        <defs>
                          <pattern id={`pattern-${idx}`} x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
                            <path d='M 40 0 L 0 0 0 40' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-white' />
                          </pattern>
                        </defs>
                        <rect width='100%' height='100%' fill={`url(#pattern-${idx})`} />
                      </svg>
                    </div>

                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

                    <div className='relative flex flex-col sm:flex-row gap-6 p-6 sm:p-8 lg:p-10'>
                      {/* Left side - Number & Icon */}
                      <div className='flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-6'>
                        {/* Step number with animated ring */}
                        <div className='relative'>
                          {/* Animated ring */}
                          <div className='absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.gradient} animate-spin-slow`} style={{ animationDuration: '8s' }} />
                            <div className='absolute inset-1 rounded-full bg-[#0d0c12]' />
                          </div>

                          {/* Number badge */}
                          <div className='relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-button-primary via-accent-gold to-button-primary rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500'>
                            <span className='text-2xl sm:text-3xl font-black text-primary-dark'>
                              {step.number}
                            </span>
                            {/* Shine effect */}
                            <div className='absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                          </div>
                        </div>

                        {/* Icon with glow */}
                        <div className='relative sm:ml-0'>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-150`} />
                          <div className='relative text-5xl sm:text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500'>
                            {step.emoji}
                          </div>
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className='flex-1 space-y-4'>
                        {/* Title with gradient on hover */}
                        <h3 className='font-display text-2xl sm:text-3xl font-bold leading-tight group-hover:bg-gradient-to-r group-hover:from-button-primary group-hover:to-accent-gold group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500'>
                          {step.title}
                        </h3>

                        {/* Divider line */}
                        <div className='flex items-center gap-3'>
                          <div className={`h-1 w-12 bg-gradient-to-r ${step.gradient.replace('/20', '')} rounded-full group-hover:w-24 transition-all duration-500`} />
                          <div className='h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent' />
                        </div>

                        {/* Description */}
                        <p className='text-text-secondary text-base sm:text-lg leading-relaxed group-hover:text-text-primary transition-colors duration-500'>
                          {step.description}
                        </p>

                        {/* Bottom highlights */}
                        <div className='flex flex-wrap gap-2 pt-2'>
                          {step.tags.map((tag, tagIdx) => (
                            <span
                              key={tag}
                              className={`px-3 py-1 border rounded-full text-xs font-medium ${TAG_COLORS[idx][tagIdx]}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className='hidden lg:flex items-center justify-center flex-shrink-0'>
                        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-button-primary/20 to-accent-gold/20 flex items-center justify-center group-hover:scale-125 group-hover:rotate-90 transition-all duration-500'>
                          <svg className='w-5 h-5 text-button-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Bottom shine effect */}
                    <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-button-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
