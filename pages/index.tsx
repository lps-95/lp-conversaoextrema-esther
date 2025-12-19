import type { NextPage } from 'next'
import Head from 'next/head'
import LandingPage from '../components/LandingPage'

const Home: NextPage = () => {
  const site = process.env.NEXT_PUBLIC_SITE_URL
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const baseUrl = site || (domain ? `https://${domain}` : 'https://seu-dominio.com')
  const url = `${baseUrl}/`
  const title = 'Gestão Extrema 💎 — Gestão Completa que Vende Todos os Dias'
  const description =
    'Transforme seu Instagram invisível em máquina de vendas com o Método Narrativa Vendedora. Gestão completa, narrativa estratégica e previsibilidade em 90 dias.'
  const image = `${baseUrl}/og-image.png`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta name='description' content={description} />
        <meta name='robots' content='index,follow' />
        <meta name='theme-color' content='#D4AF37' />
        <link rel='canonical' href={url} />

        {/* Favicon removido daqui - já está no _document.tsx */}

        {/* Open Graph */}
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Conversão Extrema' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:url' content={url} />
        <meta property='og:image' content={image} />
        <meta property='og:image:alt' content='Conversão Extrema — Máquina de Vendas' />
        <meta property='og:locale' content='pt_BR' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />

        {/* JSON-LD */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Conversão Extrema',
              url,
              description,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${url}?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Conversão Extrema',
              },
            }),
          }}
        />
      </Head>
      <main>
        <LandingPage />
      </main>
    </>
  )
}

export default Home
