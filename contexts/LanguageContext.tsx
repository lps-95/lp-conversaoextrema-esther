import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Language = 'pt' | 'en' | 'es'

const STORAGE_KEY = 'ce_language'
const DEFAULT_LANGUAGE: Language = 'pt'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * Provedor do idioma da página. Fica no topo de `_app.tsx` pra qualquer
 * componente conseguir ler/trocar o idioma através do hook `useLanguage`.
 *
 * Por que Context em vez de prop-drilling: o idioma afeta praticamente
 * todo componente da página — passar isso como prop manualmente por cada
 * nível de componente seria muito mais código pra manter do que um único
 * Context lido onde for preciso.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Começa sempre em 'pt' (igual ao servidor) e só troca depois de montar
  // no cliente — mesma lógica do que já fizemos no Hero pra evitar
  // divergência entre o que o servidor manda e o que o cliente mostra.
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en' || saved === 'es') {
      setLanguageState(saved)
    }
  }, [])

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    window.localStorage.setItem(STORAGE_KEY, lang)
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

/** Hook pra ler/trocar o idioma atual de dentro de qualquer componente. */
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage precisa ser usado dentro de <LanguageProvider>')
  }
  return ctx
}
