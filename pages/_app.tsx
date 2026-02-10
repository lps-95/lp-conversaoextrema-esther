import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import ConsentBanner, { loadPlausible } from '../components/ConsentBanner'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // If user already consented, load Plausible automatically
    try {
      const consent = localStorage.getItem('ce_consent')
      if (consent === 'accepted') {
        loadPlausible(
          process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'seu-dominio.com'
        )
      }
    } catch (e) {
      // ignore
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <ConsentBanner />
    </>
  )
}
