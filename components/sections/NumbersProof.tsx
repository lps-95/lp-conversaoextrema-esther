import React from 'react'
import { numbersProofContent } from '../../content/numbersproof'
import { useLanguage } from '../../contexts/LanguageContext'
import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'

type Testimonial = {
  title: string
  quote: string
  author: string
  role: string
  result: string
  before: string
  after: string
  stars: number
  gradient: string
  verification?: string
  objectiveNeutralized?: string
}

function TestimonialCard({
  item,
  idx,
  beforeLabel,
  afterLabel,
  defaultVerification,
}: {
  item: Testimonial
  idx: number
  beforeLabel: string
  afterLabel: string
  defaultVerification: string
}) {
  return (
    <MItem key={`${item.title}-${item.author}`} className="h-full flex">
      <ScrollReveal direction="up" delay={idx * 90}>
        <div className="group relative h-full flex-1">
          <div
            className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}
            aria-hidden
          />

          <div
            className="
          relative h-full
          lg:h-[560px]
          bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl
          border border-white/20 rounded-2xl
          p-6 sm:p-8
          flex flex-col
          hover:scale-[1.02] transition-all duration-300 will-change-transform
        "
          >
            {/* topo */}
            <div className="mb-4 pb-4 border-b border-white/20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-button-primary/20 border border-button-primary/30 rounded-full">
                <p className="text-xs font-bold text-button-primary uppercase tracking-widest">
                  {item.title}
                </p>
              </div>

              {!!item.objectiveNeutralized && (
                <p className="mt-2 text-xs text-text-tertiary">✅ {item.objectiveNeutralized}</p>
              )}
            </div>

            {/* stars */}
            <div className="flex items-center gap-1 mb-3" aria-label={`${item.stars}/5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < item.stars ? 'text-accent-gold text-sm' : 'text-white/20 text-sm'}
                  aria-hidden
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-xs text-text-tertiary">({item.stars}.0)</span>
            </div>

            {/* quote (clamp sem plugin) */}
            <div className="mb-4">
              <div className="text-button-primary text-3xl font-display mb-2 opacity-50 leading-none" aria-hidden>
                ❝
              </div>

              <p
                className="
              text-base text-text-primary font-medium leading-relaxed
              overflow-hidden
              [display:-webkit-box]
              [-webkit-box-orient:vertical]
              [-webkit-line-clamp:5]
            "
              >
                {item.quote}
              </p>
            </div>

            {/* meio */}
            <div className="mb-4 pb-4 border-b border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                  <div className="text-[10px] text-red-400 font-bold mb-1 uppercase tracking-wide">{beforeLabel}</div>
                  <div className="text-xs text-text-secondary font-medium leading-tight">
                    {item.before}
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2.5">
                  <div className="text-[10px] text-green-400 font-bold mb-1 uppercase tracking-wide">{afterLabel}</div>
                  <div className="text-xs text-text-primary font-semibold leading-tight">
                    {item.after}
                  </div>
                </div>
              </div>
            </div>

            {/* result */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400 text-lg" aria-hidden>💰</span>
                <span className="text-green-400 text-sm font-bold">{item.result}</span>
              </div>
            </div>

            {/* empurra autor sempre pro fundo */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-button-primary to-accent-gold rounded-full flex items-center justify-center text-primary-dark font-bold shadow-lg">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-text-primary font-bold text-sm">{item.author}</p>
                  <p className="text-text-tertiary text-xs">{item.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full">
                <span className="text-[9px] text-blue-400 font-semibold uppercase tracking-wide">
                  {item.verification ?? defaultVerification}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </MItem>

  )
}

export default function NumbersProof() {
  const { language } = useLanguage()
  const content = numbersProofContent[language]

  return (
    <section
      id="prova-numeros"
      className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black"
      aria-label="Provas e depoimentos"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.1),transparent_70%)] animate-pulse-subtle" />
      <ParallaxLayer speed={0.05} className="absolute inset-0 pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <MSection>
          <div className="text-center mb-14 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400">
              {content.badge}
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {content.title.prefix}
              <span className="bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">
                {content.title.highlight}
              </span>
            </h2>

            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
              {content.subtitle.prefix}
              <span className="text-text-primary font-semibold">{content.subtitle.highlight}</span>
              {content.subtitle2Prefix}
            </p>
          </div>
        </MSection>

        <MSection>
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {content.subtitle2Title.prefix}
              <span className="bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">
                {content.subtitle2Title.highlight}
              </span>
            </h3>
            <p className="text-text-secondary text-base sm:text-lg">{content.subtitle2}</p>
          </div>
        </MSection>

        <MStagger className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch">
          {content.testimonials.map((item, idx) => (
            <React.Fragment key={`${item.title}-${item.author}`}>
              <TestimonialCard
                item={item}
                idx={idx}
                beforeLabel={content.beforeLabel}
                afterLabel={content.afterLabel}
                defaultVerification={content.defaultVerification}
              />
            </React.Fragment>
          ))}
        </MStagger>

        <MSection>
          <div className="text-center mt-10 sm:mt-12">
            <p className="text-text-tertiary text-sm">{content.footnote}</p>
          </div>
        </MSection>
      </div>
    </section>
  )
}
