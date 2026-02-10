import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ConsentBanner, { loadPlausible } from '../components/ConsentBanner'
import '../styles/globals.css'

// Lazy load de componentes pesados
const CustomCursor = dynamic(() => import('../components/CustomCursor'), { ssr: false })
const AnimatedBlobs = dynamic(() => import('../components/AnimatedBlobs'), { ssr: false })

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
