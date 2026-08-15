import { useLanguage, type Language } from '../contexts/LanguageContext'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

/**
 * Toggle de idioma — fixo no canto superior direito, sempre visível
 * enquanto rola a página. Fica no topo (diferente dos outros elementos
 * flutuantes, todos na parte de baixo) pra não competir por espaço com o
 * WhatsApp/voltar-ao-topo/FloatingCTA que já moram lá embaixo.
 */
export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="fixed z-50 flex items-center gap-0.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 top-[calc(0.75rem+env(safe-area-inset-top))] right-[calc(0.75rem+env(safe-area-inset-right))]"
      role="group"
      aria-label="Selecionar idioma"
    >
      {LANGUAGES.map(({ code, label }) => {
        const active = language === code
        return (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            aria-pressed={active}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide transition-colors duration-150 ${
              active ? 'bg-button-primary text-primary-dark' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
