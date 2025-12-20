import type { NextApiRequest, NextApiResponse } from 'next'

interface LeadPayload {
  name: string
  email: string
  phone: string
  plan?: string | null
  bestTime?: string | null
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  origin?: string | null
  timestamp?: string | null
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    name,
    email,
    phone,
    plan = null,
    bestTime = null,
    utmSource = null,
    utmMedium = null,
    utmCampaign = null,
    origin = 'landing-page',
    timestamp = new Date().toISOString(),
  }: LeadPayload = req.body

  // Validação dos campos obrigatórios
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
  }

  // Normalizar telefone (apenas números)
  const phoneClean = String(phone).replace(/\D/g, '')
  if (phoneClean.length < 10) {
    return res.status(400).json({ error: 'Telefone inválido' })
  }

  // Simulação de armazenamento do lead (substitua por integração real)
  // Aqui você pode salvar no banco, enviar para outro serviço, etc.
  // Exemplo: await saveLead({ ... })

  // Retorno de sucesso
  return res.status(200).json({
    success: true,
    clientId: Math.random().toString(36).substring(2, 12), // Simulação de ID
    action: 'created',
  })
}
