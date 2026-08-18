import Image from 'next/image'
import { useState } from 'react'
import { feedbackScreenshots, numbersProofContent } from '../../content/numbersproof'
import { useLanguage } from '../../contexts/LanguageContext'
import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'

/**
 * Card de print individual. Aspect-ratio fixo (não conhecemos as dimensões
 * de cada print) com `object-cover` no thumbnail — clique abre o print
 * inteiro (`object-contain`) num lightbox simples, sem dependências.
 */
function ScreenshotCard({
  file,
  idx,
  alt,
  onOpen,
}: {
  file: string
  idx: number
  alt: string
  onOpen: (file: string, alt: string) => void
}) {
  return (
    <MItem key={file}>
      <ScrollReveal direction="up" delay={(idx % 6) * 70}>
        <button
          type="button"
          onClick={() => onOpen(file, alt)}
          className="
            group relative block w-full
            aspect-[9/16]
            rounded-2xl overflow-hidden
            border border-white/20
            bg-white/5 backdrop-blur-xl
            hover:scale-[1.03] hover:border-button-primary/50
            transition-all duration-300 will-change-transform
            focus:outline-none focus-visible:ring-2 focus-visible:ring-button-primary
          "
          aria-label={`${alt} ${idx + 1}`}
        >
          <Image
            src={`/feedbacks/${file}`}
            alt={`${alt} ${idx + 1}`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </ScrollReveal>
    </MItem>
  )
}

/** Lightbox minimalista: fundo escurecido, imagem inteira, fecha ao clicar fora ou no X. */
function Lightbox({
  file,
  alt,
  onClose,
}: {
  file: string
  alt: string
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors"
        aria-label="Fechar"
      >
        ✕
      </button>
      <div className="relative max-w-md w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <img src={`/feedbacks/${file}`} alt={alt} className="w-full h-full object-contain rounded-xl" />
      </div>
    </div>
  )
}

export default function NumbersProof() {
  const { language } = useLanguage()
  const content = numbersProofContent[language]
  const [openScreenshot, setOpenScreenshot] = useState<{ file: string; alt: string } | null>(null)

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
              {content.screenshotsTitle.prefix}
              <span className="bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">
                {content.screenshotsTitle.highlight}
              </span>
            </h3>
            <p className="text-text-secondary text-base sm:text-lg">{content.screenshotsSubtitle}</p>
          </div>
        </MSection>

        <MStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {feedbackScreenshots.map((file, idx) => (
            <ScreenshotCard
              key={file}
              file={file}
              idx={idx}
              alt={content.screenshotAlt}
              onOpen={(f, a) => setOpenScreenshot({ file: f, alt: a })}
            />
          ))}
        </MStagger>

        <MSection>
          <div className="text-center mt-10 sm:mt-12">
            <p className="text-text-tertiary text-sm">{content.footnote}</p>
          </div>
        </MSection>
      </div>

      {openScreenshot && (
        <Lightbox
          file={openScreenshot.file}
          alt={openScreenshot.alt}
          onClose={() => setOpenScreenshot(null)}
        />
      )}
    </section>
  )
}
