import type { GetServerSideProps } from 'next'

/**
 * `robots.txt` gerado dinamicamente a partir de `NEXT_PUBLIC_SITE_URL`.
 *
 * Por quê isso em vez de um arquivo estático em `public/`: um arquivo
 * estático fica com o domínio "gravado" no momento em que foi escrito —
 * é fácil esquecer de atualizar quando o domínio final do site muda (foi
 * exatamente o que tinha acontecido: o arquivo antigo apontava pra
 * "seudominio.com", nunca atualizado). Gerando na hora, ele sempre reflete
 * a env var configurada na Vercel.
 */
function generateRobotsTxt(siteUrl: string) {
  return `User-agent: *
Allow: /

Disallow: /api/
Disallow: /_next/

Sitemap: ${siteUrl}/sitemap.xml
`
}

export default function Robots() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seu-dominio.com'

  res.setHeader('Content-Type', 'text/plain')
  res.write(generateRobotsTxt(siteUrl))
  res.end()

  return { props: {} }
}
