import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Endpoint de debug para verificar variáveis de ambiente
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
