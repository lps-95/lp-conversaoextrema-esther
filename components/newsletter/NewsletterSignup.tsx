import Link from 'next/link'
import { consentLinkHref, newsletterContent } from '../../content/newsletter'
import { useLanguage } from '../../contexts/LanguageContext'
import { useNewsletterSignup } from '../../hooks/useNewsletterSignup'

/**
 * Seção de captação de leads pra newsletter/materiais.
 *
 * LGPD, na prática, nesse componente:
 * - Checkbox de consentimento começa DESMARCADO (nunca pré-marque).
 * - O texto do consentimento diz exatamente pra que serve o dado.
 * - Tem link direto pra Política de Privacidade.
 * - Envio só acontece se o consentimento estiver marcado (ver
 *   `useNewsletterSignup`).
 */
export default function NewsletterSignup() {
  const { fields, setters, status, errorMessage, handleSubmit } = useNewsletterSignup()
  const { language } = useLanguage()
  const content = newsletterContent[language]

  return (
    <section id="newsletter" className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-[#0d0c12] via-black to-[#0d0c12]">
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 mb-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">{content.badge}</p>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-text-primary">{content.title}</h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto">{content.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6">
          {/* Campo armadilha contra bots — invisível pra pessoas de verdade */}
          <input
            type="text"
            name="website"
            value={fields.honeypot}
            onChange={(e) => setters.setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] w-px h-px opacity-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              {/* `sr-only`: visível pra leitor de tela, oculto na tela — o
                  placeholder sozinho não é suficiente como label (some
                  assim que a pessoa começa a digitar, e nem todo leitor de
                  tela anuncia placeholder da mesma forma que um <label>). */}
              <label htmlFor="newsletter-name" className="sr-only">
                {content.namePlaceholder}
              </label>
              <input
                id="newsletter-name"
                type="text"
                value={fields.name}
                onChange={(e) => setters.setName(e.target.value)}
                placeholder={content.namePlaceholder}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm placeholder-text-secondary/40 focus:outline-none focus:border-button-primary/50 transition-all"
              />
            </div>
            <div>
              <label htmlFor="newsletter-email" className="sr-only">
                {content.emailPlaceholder}
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={fields.email}
                onChange={(e) => setters.setEmail(e.target.value)}
                placeholder={content.emailPlaceholder}
                required
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-text-primary text-sm placeholder-text-secondary/40 focus:outline-none focus:border-button-primary/50 transition-all"
              />
            </div>
          </div>

          <label className="flex items-start gap-2.5 mb-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={fields.consent}
              onChange={(e) => setters.setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 shrink-0 accent-button-primary cursor-pointer"
            />
            <span className="text-xs text-text-secondary leading-relaxed">
              {content.consentLabel}{' '}
              <Link href={consentLinkHref} className="text-button-primary underline hover:text-accent-gold">
                {content.consentLinkLabel}
              </Link>
              .
            </span>
          </label>

          {errorMessage && (
            <div className="mb-4 text-red-400 text-xs text-center p-2.5 bg-red-500/10 border border-red-500/30 rounded-lg">
              {errorMessage}
            </div>
          )}

          {status === 'success' && (
            <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 text-xs text-center p-2.5 rounded-lg">
              {content.successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-sm py-3 rounded-lg shadow-lg hover:scale-[1.01] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading'
              ? content.submitLoadingLabel
              : status === 'success'
                ? content.submitSuccessLabel
                : content.submitLabel}
          </button>

          <p className="text-center text-[11px] text-text-secondary/50 mt-3">{content.disclaimer}</p>
        </form>
      </div>
    </section>
  )
}
