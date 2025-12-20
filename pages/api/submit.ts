import crypto from 'crypto'
import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { currentDateKey, kvIncr } from '../../lib/kv'
import { sendInternalLeadAlert, sendLeadConfirmation } from '../../lib/whatsapp'

// Em Vercel (serverless), o sistema de arquivos é somente leitura,
// mas o diretório /tmp é gravável durante a execução da função.
// Usamos /tmp em produção e a pasta do projeto em desenvolvimento.
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'leads.json')

interface LeadEntry {
  name: string
  email: string
  plan: string
  whatsapp: string
  bestTime: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  origin: string
  timestamp: string
  date: string
}

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8')
  }
}

async function appendLead(entry: LeadEntry) {
  await ensureDataFile()
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  const list: LeadEntry[] = JSON.parse(raw || '[]')
  list.push(entry)
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8')
}

function normalizePhone(raw?: string): string {
  if (!raw) return ''
  const digits = String(raw).replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('55')) return digits
  return `55${digits}`
}

async function sendToZoho(data: LeadEntry) {
  const zohoWebhook = process.env.ZOHO_WEBHOOK_URL
  if (!zohoWebhook) return { sent: false, reason: 'missing_webhook' }

  try {
    const resp = await fetch(zohoWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return { sent: resp.ok }
  } catch (e) {
    console.error('Zoho send error:', e)
    return { sent: false, reason: 'exception' }
  }
}

async function sendToActiveCampaign(data: LeadEntry) {
  const acWebhook = process.env.ACTIVECAMPAIGN_WEBHOOK_URL
  if (!acWebhook) return { sent: false, reason: 'missing_webhook' }

  try {
    const resp = await fetch(acWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return { sent: resp.ok }
  } catch (e) {
    console.error('ActiveCampaign send error:', e)
    return { sent: false, reason: 'exception' }
  }
}

async function sendToRDStation(data: LeadEntry) {
  const rdWebhook = process.env.RD_STATION_WEBHOOK_URL
  if (!rdWebhook) return { sent: false, reason: 'missing_webhook' }

  try {
    const resp = await fetch(rdWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return { sent: resp.ok }
  } catch (e) {
    console.error('RD Station send error:', e)
    return { sent: false, reason: 'exception' }
  }
}

async function sendToN8n(data: LeadEntry) {
  const n8nWebhook = process.env.N8N_WEBHOOK_URL
  if (!n8nWebhook) return { sent: false, reason: 'missing_webhook' }

  try {
    const resp = await fetch(n8nWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return { sent: resp.ok }
  } catch (e) {
    console.error('n8n send error:', e)
    return { sent: false, reason: 'exception' }
  }
}

// ========================================
// ENCAMINHAR PARA GESTÃO CLIENTES (NOVO ENDPOINT /api/leads)
// ========================================
async function sendToGestaoClientes(
  data: LeadEntry,
  templates?: {
    leadConfirmation?: string
    internalAlert?: string
  }
) {
  const gestaoUrl = process.env.GESTAO_CLIENTES_LEADS_URL // Novo endpoint
  const secret = process.env.GESTAO_CLIENTES_WEBHOOK_SECRET

  if (!gestaoUrl) return { sent: false, reason: 'missing_webhook' }

  try {
    // Montar payload conforme especificação
    const payloadObj: any = {
      name: data.name,
      email: data.email,
      phone: data.whatsapp,
      plan: data.plan,
      bestTime: data.bestTime,
      utmParams: {
        utm_source: data.utmSource,
        utm_medium: data.utmMedium,
        utm_campaign: data.utmCampaign,
      },
      origin: data.origin || 'landing_page_conversao_extrema',
    }
    // Remover campos opcionais se estiverem vazios
    if (!payloadObj.plan) delete payloadObj.plan
    if (!payloadObj.bestTime) delete payloadObj.bestTime
    if (
      !payloadObj.utmParams.utm_source &&
      !payloadObj.utmParams.utm_medium &&
      !payloadObj.utmParams.utm_campaign
    )
      delete payloadObj.utmParams
    if (!payloadObj.email) delete payloadObj.email
    if (!payloadObj.phone) delete payloadObj.phone

    const payload = JSON.stringify(payloadObj)

    let signature: string | undefined
    if (secret) {
      signature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex')
    }

    const resp = await fetch(gestaoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(signature ? { 'X-Webhook-Signature': `sha256=${signature}` } : {}),
      },
      body: payload,
    })

    if (resp.ok) {
      console.log(
        '[Submit] ✅ Lead encaminhado para Gestão (novo endpoint):',
        data.name
      )
      return { sent: true }
    } else {
      console.warn('[Submit] ⚠️ Gestão retornou:', resp.status)
      return { sent: false, reason: `status_${resp.status}` }
    }
  } catch (e) {
    console.error('[Submit] Erro ao encaminhar para Gestão:', e)
    return { sent: false, reason: 'exception' }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      name,
      email,
      plan,
      whatsapp,
      bestTime,
      utmSource,
      utmMedium,
      utmCampaign,
      origin,
    } = req.body

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' })
    }

    const normalizedPhone = normalizePhone(whatsapp)
    const now = new Date()
    const entry: LeadEntry = {
      name,
      email,
      plan: plan || 'Não especificado',
      whatsapp: normalizedPhone,
      bestTime: bestTime || 'Não informado',
      utmSource: utmSource || '',
      utmMedium: utmMedium || '',
      utmCampaign: utmCampaign || '',
      origin: origin || '',
      timestamp: now.toISOString(),

      date: now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    }

    // Save locally (não bloqueante)
    try {
      await appendLead(entry)
    } catch (e) {
      console.error('Local lead log falhou (não bloqueante):', e)
    }

    // Incrementar contador diário em KV (se configurado)
    try {
      const key = `leads:${currentDateKey()}`
      await kvIncr(key, 1)
    } catch (e) {
      console.error('KV incr falhou (não bloqueante):', e)
    }

    // Armazenar templateText para enviar nos webhooks
    let leadConfirmationText: string | undefined
    let internalAlertText: string | undefined

    // Enviar confirmação via WhatsApp (com template completo)
    if (normalizedPhone) {
      try {
        const result = await sendLeadConfirmation(
          normalizedPhone,
          name,
          email,
          entry.plan
        )
        leadConfirmationText = result.templateText
        console.log(
          '✅ Confirmação de lead enviada via WhatsApp:',
          normalizedPhone,
          '| Template: lead_confirmation'
        )
      } catch (error) {
        console.error('❌ Erro ao enviar confirmação WhatsApp:', error)
        // Não retorna erro, pois o lead foi criado com sucesso
      }
    }

    // Alerta interno para o time (opcional)
    try {
      const result = await sendInternalLeadAlert({
        name,
        email,
        whatsapp: normalizedPhone,
        bestTime: entry.bestTime,
      })
      internalAlertText = result.templateText
    } catch (e) {
      console.error('Aviso interno (WhatsApp) falhou:', e)
    }

    // Send to external systems in parallel (fire and forget)
    Promise.allSettled([
      sendToZoho(entry),
      sendToActiveCampaign(entry),
      sendToRDStation(entry),
      sendToN8n(entry),
      sendToGestaoClientes(entry, {
        leadConfirmation: leadConfirmationText,
        internalAlert: internalAlertText,
      }),
    ]).catch((e) => console.error('Error sending to external systems:', e))

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Submit API error:', error)
    return res.status(500).json({ error: 'Erro ao processar solicitação' })
  }
}
