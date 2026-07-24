import { useEffect, useState } from 'react'

/**
 * Replica a mesma condição de visibilidade usada pelo `FloatingCTA`
 * (aparece depois de 800px de scroll, some perto do rodapé).
 *
 * Existe como hook separado — em vez de calcular isso duas vezes com
 * números diferentes em cada componente — porque outros elementos fixos
 * (como o `WhatsAppWidget`) precisam saber se a barra está na tela pra não
 * ficar em cima dela. Se um dia o gatilho do FloatingCTA mudar, muda só
 * aqui.
 */
export function useFloatingCtaVisible() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      const doc = document.documentElement
      const nearFooter = y + h >= doc.scrollHeight - 320
      setVisible(y > 800 && !nearFooter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return visible
}
