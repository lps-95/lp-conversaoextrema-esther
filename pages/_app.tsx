import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import ConsentBanner, { loadPlausible } from '../components/ConsentBanner'
import '../styles/globals.css'

const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'seu-dominio.com'

export default function MyApp({ Component, pageProps }: AppProps) {
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    const consent = window.localStorage.getItem('ce_consent')

    if (consent === 'accepted') {
      loadPlausible(PLAUSIBLE_DOMAIN)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />

      <ConsentBanner />
    </>
  )
}
