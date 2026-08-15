import type { GetServerSideProps } from 'next'

/**
 * `sitemap.xml` gerado dinamicamente — mesma razão do `robots.txt.tsx`:
 * evita ficar com um domínio "seudominio.com" esquecido pra sempre.
 *
 * Só tem a home por enquanto porque é uma landing page de página única.
 * Se no futuro a Esther Social Media ganhar mais páginas (blog, outras
 * landing pages), é só adicionar mais entradas no array `pages` abaixo.
 */
function generateSitemap(siteUrl: string) {
  const pages = [{ path: '/', priority: '1.0', changefreq: 'weekly' }]

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export default function Sitemap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seu-dominio.com'

  res.setHeader('Content-Type', 'text/xml')
  res.write(generateSitemap(siteUrl))
  res.end()

  return { props: {} }
}
