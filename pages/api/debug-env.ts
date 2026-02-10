import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const isDevelopment = process.env.NODE_ENV === 'development'
  const adminKey = process.env.DEBUG_API_KEY
  const keyFromHeader = req.headers['x-debug-key']

  // Em produção, só responde com chave explícita para evitar exposição acidental.
  if (!isDevelopment) {
    if (!adminKey || keyFromHeader !== adminKey) {
      return res.status(404).json({ error: 'Not found' })
    }
  }

  return res.status(200).json({
    GESTAO_CLIENTES_LEADS_URL:
      process.env.GESTAO_CLIENTES_LEADS_URL || 'undefined',
    GESTAO_CLIENTES_WEBHOOK_SECRET: process.env.GESTAO_CLIENTES_WEBHOOK_SECRET
      ? '[PRESENTE]'
      : '[NÃO DEFINIDO]',
    NODE_ENV: process.env.NODE_ENV || 'undefined',
    VERCEL_ENV: process.env.VERCEL_ENV || 'undefined',
    VERCEL_URL: process.env.VERCEL_URL || 'undefined',
    timestamp: new Date().toISOString(),
  })
}
