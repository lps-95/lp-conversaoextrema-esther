/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de performance
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },

  // Headers de cache
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },

  // Usar Turbopack (padrão no Next.js 16)
  turbopack: {},

  // Quem já tinha o link antigo salvo (ex: compartilhado antes) continua
  // chegando na política de privacidade certa, só que na versão atual.
  async redirects() {
    return [
      {
        source: '/politica-privacidade.html',
        destination: '/politica-de-privacidade',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
