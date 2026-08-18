import type { AppProps } from 'next/app'
import { Inter, Playfair_Display } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import ConsentBanner, { loadPlausible } from '../components/ConsentBanner'
import { LanguageProvider } from '../contexts/LanguageContext'
import { loadMetaPixel } from '../lib/metaPixel'
import '../styles/globals.css'

const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'seu-dominio.com'

/**
 * Fontes carregadas via `next/font/google` em vez do `@import` que
 * existia em `globals.css`. Diferença real de performance: o `@import`
 * fazia o navegador baixar o CSS da página → só DEPOIS descobrir que
 * precisa buscar mais CSS no Google Fonts → só DEPOIS baixar as fontes de
 * verdade (3 requisições em sequência, uma esperando a outra). O
 * `next/font` baixa as fontes durante o BUILD e serve elas pelo seu
 * próprio domínio — nenhuma requisição externa, nenhuma espera. Isso é o
 * que provavelmente estava pesando no First Contentful Paint / Largest
 * Contentful Paint do relatório do PageSpeed Insights.
 */
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    const consent = window.localStorage.getItem('ce_consent')

    if (consent === 'accepted') {
      loadPlausible(PLAUSIBLE_DOMAIN)
      loadMetaPixel()
    }
  }, [])

  return (
    <LanguageProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className={`${playfairDisplay.variable} ${inter.variable}`}>
        <Component {...pageProps} />
      </div>

      <ConsentBanner />
    </LanguageProvider>
  )
}
