import { heroContent } from '../../content/hero'
import { track } from '../../lib/analytics'
import CountdownTimer from '../CountdownTimer'
import MagneticButton from '../MagneticButton'
import ParallaxLayer from '../ParallaxLayer'
import VideoModal from '../VideoModal'

/**
 * Seção Hero (primeira dobra da página).
 *
 * IMPORTANTE sobre mobile: a versão anterior decidia o que renderizar
 * usando `window.innerWidth` em `useState`/`useEffect`. Isso faz o servidor
 * sempre renderizar a versão "desktop" e o navegador trocar pra versão
 * mobile só depois que o JS carrega — causando um "pulo" visual (layout
 * shift) logo na primeira dobra, que é justamente o que mais pesa na nota
 * de performance mobile.
 *
 * Aqui a decisão é feita só em CSS (`hidden md:block`), então o HTML que
 * sai do servidor já é o final — sem re-render, sem flash, sem CLS.
 */
export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Camadas de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f0e16] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,220,200,0.08),transparent_50%)] md:bg-[radial-gradient(ellipse_at_top,rgba(232,220,200,0.15),transparent_50%)] md:animate-pulse-subtle" />

      {/* Blobs decorativos e grid de fundo: só existem em telas médias pra cima.
          `hidden md:block` não muda o DOM entre servidor e cliente, então não
          gera hydration mismatch nem layout shift — só é uma questão de CSS. */}
      <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-button-primary/20 rounded-full blur-[150px] animate-float-slow" />
      <div
        className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-gold/15 rounded-full blur-[120px] animate-float-slow"
        style={{ animationDelay: '2s' }}
      />
      <div className="hidden md:block absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-button-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <ParallaxLayer speed={0.06} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto">
            {/* Selo */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent-gold rounded-full animate-pulse-glow" />
              <span className="text-sm font-medium text-text-secondary">{heroContent.badge}</span>
            </div>

            {/* Título principal */}
            <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 sm:mb-8">
              {heroContent.headline.prefix}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent animate-gradient-x">
                  {heroContent.headline.highlight}
                </span>
                <span className="absolute -inset-1 bg-gradient-to-r from-button-primary/20 to-accent-gold/20 blur-xl -z-10 animate-pulse-glow" />
              </span>
            </h1>

            {/* Parágrafo de validação da dor */}
            <div className="relative group mb-8 sm:mb-10">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-x" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 md:p-8">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-text-secondary font-medium">
                  {heroContent.painParagraph.before}
                  <span className="text-text-primary font-bold">{heroContent.painParagraph.highlight1}</span>
                  {heroContent.painParagraph.middle}
                  <span className="text-text-primary font-bold">{heroContent.painParagraph.highlight2}</span>
                  {heroContent.painParagraph.after}
                  <span className="text-text-primary font-bold">{heroContent.painParagraph.highlight3}</span>
                  {heroContent.painParagraph.end}
                </p>
                <p className="text-lg sm:text-xl font-bold text-accent-gold mt-4">{heroContent.painClosingLine}</p>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <MagneticButton strength={0.4}>
                <a
                  href="#form"
                  onClick={() => track('cta_click', { id: 'hero_primary' })}
                  className="group relative inline-flex items-center justify-center"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition duration-300 animate-gradient-x" />
                  <div className="relative px-6 sm:px-8 md:px-10 lg:px-12 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-button-primary to-accent-gold rounded-xl font-bold text-sm sm:text-base md:text-lg lg:text-xl text-primary-dark hover:scale-105 transition-transform duration-200 shadow-2xl text-center">
                    {heroContent.cta.primaryLabel}
                    <span className="ml-2">→</span>
                  </div>
                </a>
              </MagneticButton>

              <MagneticButton strength={0.3}>
                <button
                  onClick={() => {
                    track('cta_click', { id: 'hero_secondary' })
                    document
                      .getElementById(heroContent.cta.secondaryScrollTargetId)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border-2 border-white/30 text-text-primary text-sm sm:text-base font-semibold hover:bg-white/5 hover:border-white/50 transition-all duration-200"
                >
                  {heroContent.cta.secondaryLabel}
                </button>
              </MagneticButton>
            </div>

            <div className="mt-8 sm:mt-10">
              <CountdownTimer targetHours={heroContent.countdown.targetHours} message={heroContent.countdown.message} />
            </div>

            {/* <div className="mt-6 flex justify-center">
              <VideoModal videoUrl={heroContent.video.url} title={heroContent.video.title} />
            </div> */}

            {/* Indicador de scroll */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-button-primary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
