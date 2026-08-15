import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Favicon e ícones */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />

        {/* Meta tags SEO */}

        <meta name="theme-color" content="#D4AF37" />
        <meta name="author" content="Esther Social Media" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
