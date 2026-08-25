import Image from 'next/image'
import { useState } from 'react'
import { feedbackScreenshots, numbersProofContent, type FeedbackScreenshot } from '../../content/numbersproof'
import { useLanguage } from '../../contexts/LanguageContext'
import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'

const INITIAL_COUNT = 6

/**
 * Card de print individual. Cada print tem uma proporção diferente (são
 * capturas de tela reais, não um asset desenhado) — por isso o card usa a
 * largura/altura reais da imagem (`shot.width/height`) em vez de forçar um
 * aspect-ratio fixo. Isso evita cortar ou esticar o print, e o layout em
 * colunas (`columns-*` no container) reorganiza os cards conforme a altura
 * de cada um, como um mural, sem buracos nem sobreposição.
 */
function ScreenshotCard({
  shot,
  idx,
  alt,
  badgeLabel,
  onOpen,
}: {
  shot: FeedbackScreenshot
  idx: number
  alt: string
  badgeLabel: string
  onOpen: (file: string, alt: string) => void
}) {
  return (
    <MItem className="mb-4 sm:mb-5 break-inside-avoid">
      <ScrollReveal direction="up" delay={(idx % 6) * 70}>
        <div className="group relative">
          {/* Glow de borda, mesmo padrão usado nos outros cards premium da página */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-button-primary/50 to-accent-gold/50 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

          <button
            type="button"
            onClick={() => onOpen(shot.file, alt)}
            className="
              relative block w-full overflow-hidden
              rounded-2xl border border-white/10
              bg-white/5 backdrop-blur-xl
              group-hover:border-button-primary/40
              transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-button-primary
            "
            aria-label={`${alt} ${idx + 1}`}
          >
            {/* Barra de contexto: mesma função de um "chip" — avisa que é uma
                conversa real antes de qualquer coisa, sem depender de legenda por print */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-wide text-text-tertiary">
                {badgeLabel}
              </span>
              <svg
                className="ml-auto w-3.5 h-3.5 text-button-primary/80"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <Image
              src={`/feedbacks/${shot.file}`}
              alt={`${alt} ${idx + 1}`}
              width={shot.width}
              height={shot.height}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
              className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
        </div>
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
  const [showAll, setShowAll] = useState(false)

  const hasMore = feedbackScreenshots.length > INITIAL_COUNT
  const visibleScreenshots = showAll ? feedbackScreenshots : feedbackScreenshots.slice(0, INITIAL_COUNT)

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

        <MStagger className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-5">
          {visibleScreenshots.map((shot, idx) => (
            <ScreenshotCard
              key={shot.file}
              shot={shot}
              idx={idx}
              alt={content.screenshotAlt}
              badgeLabel={content.screenshotBadgeLabel}
              onOpen={(f, a) => setOpenScreenshot({ file: f, alt: a })}
            />
          ))}
        </MStagger>

        {hasMore && (
          <div className="text-center mt-2 mb-10 sm:mb-12">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="
                group inline-flex items-center gap-2 px-6 py-3
                rounded-full border border-white/15 bg-white/5 backdrop-blur-xl
                text-sm font-semibold text-text-secondary
                hover:text-button-primary hover:border-button-primary/40
                transition-all duration-300
              "
            >
              {showAll ? content.showLessLabel : content.showMoreLabel}
              <span
                className={`inline-block transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                ↓
              </span>
            </button>
          </div>
        )}

        <MSection>
          <div className="text-center">
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
