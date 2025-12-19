import crypto from 'crypto'
import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { sendAutoReply } from '../../../lib/whatsapp'

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || ''

type ResponseData = {
  message?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Validação do webhook (GET request do WhatsApp)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook validado com sucesso')
      res.status(200).end(challenge as string)
    } else {
      console.error('❌ Token de verificação inválido')
      res.status(403).json({ error: 'Token inválido' })
    }
  }

  // Receber mensagens (POST request do WhatsApp)
  if (req.method === 'POST') {
    const body = req.body

    // Validar se é uma mensagem de entrada
    if (body.object === 'whatsapp_business_account') {
      const DATA_DIR = process.env.VERCEL
        ? path.join('/tmp', 'data')
        : path.join(process.cwd(), 'data')
      const MSG_FILE = path.join(DATA_DIR, 'messages.json')

      async function appendMessage(entry: any) {
        try {
          await fs.mkdir(DATA_DIR, { recursive: true })
          let current: any[] = []
          try {
            const raw = await fs.readFile(MSG_FILE, 'utf-8')
            current = JSON.parse(raw || '[]')
          } catch {}
          current.push(entry)
          await fs.writeFile(
            MSG_FILE,
            JSON.stringify(current, null, 2),
            'utf-8'
          )
        } catch (e) {
          console.error('Persist inbound message failed:', e)
        }
      }

      async function forwardToExternalApp(payload: any) {
        // ========================================
        // ENCAMINHAR PARA GESTÃO DE CLIENTES
        // ========================================
        const gestaoUrl = process.env.GESTAO_CLIENTES_WEBHOOK_URL
        const secret = process.env.WHATSAPP_WEBHOOK_SECRET

        if (!gestaoUrl) {
          console.log(
            '[Webhook LP] ⚠️ GESTAO_CLIENTES_WEBHOOK_URL não configurada'
          )
          return
        }

        try {
          console.log('[Webhook LP] 🚀 Encaminhando para Gestão:', gestaoUrl)

          const payloadString = JSON.stringify(payload)

          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          }

          // Adicionar assinatura HMAC se secret configurado
          if (secret) {
            const signature = crypto
              .createHmac('sha256', secret)
              .update(payloadString)
              .digest('hex')
            headers['X-Signature'] = signature
            console.log('[Webhook LP] ✅ Assinatura HMAC adicionada')
          } else {
            console.log(
              '[Webhook LP] ⚠️ WHATSAPP_WEBHOOK_SECRET não configurado'
            )
          }

          const response = await fetch(gestaoUrl, {
            method: 'POST',
            headers,
            body: payloadString,
          })

          if (response.ok) {
            console.log(
              '[Webhook LP] ✅ Encaminhado com sucesso!',
              payload.event
            )
          } else {
            console.error(
              '[Webhook LP] ❌ Erro:',
              response.status,
              await response.text()
            )
          }
        } catch (e) {
          console.error('[Webhook LP] ❌ Erro ao encaminhar:', e)
        }
      }
      // Processar eventos
      if (body.entry && Array.isArray(body.entry)) {
        for (const entry of body.entry) {
          const changes = entry.changes || []
          for (const change of changes) {
            if (change.field === 'messages') {
              const messages = change.value.messages || []
              const contacts = change.value.contacts || []
              const statusMap: { [key: string]: string } = {}

              // Criar mapa de contatos
              contacts.forEach((contact: any) => {
                statusMap[contact.wa_id] = contact.profile?.name || 'Usuário'
              })

              // Processar mensagens recebidas
              for (const message of messages) {
                const senderPhone = message.from
                const senderName = statusMap[senderPhone] || 'Usuário'

                console.log('📨 Mensagem recebida:', {
                  from: senderPhone,
                  name: senderName,
                  type: message.type,
                  text: message.text?.body,
                  timestamp: new Date(message.timestamp * 1000).toISOString(),
                  id: message.id,
                })

                const normalized = {
                  id: message.id,
                  from: senderPhone,
                  to: change.value?.metadata?.display_phone_number || null,
                  name: senderName,
                  type: message.type,
                  text: message.text?.body || null,
                  body: message.text?.body || null, // Adicionar campo "body" também
                  message: message.text?.body || null, // Adicionar campo "message" também
                  timestamp: new Date(message.timestamp * 1000).toISOString(),
                  raw: message,
                }

                // Persistir localmente (best-effort)
                appendMessage({ event: 'message', ...normalized }).catch(
                  () => {}
                )

                // Encaminhar para aplicação externa (se configurado)
                // Enviando formato mais compatível com diferentes sistemas
                forwardToExternalApp({
                  event: 'message',
                  type: 'whatsapp_message',
                  messageId: message.id,
                  from: senderPhone,
                  name: senderName,
                  text: message.text?.body || null,
                  body: message.text?.body || null,
                  message: message.text?.body || null,
                  timestamp: new Date(message.timestamp * 1000).toISOString(),
                  data: normalized,
                }).catch(() => {})

                // Enviar resposta automática
                try {
                  await sendAutoReply(senderPhone)
                  console.log(
                    '✅ Resposta automática enviada para:',
                    senderPhone
                  )
                } catch (error) {
                  console.error('❌ Erro ao enviar resposta automática:', error)
                }
              }

              // Processar mudanças de status
              const statuses = change.value.statuses || []
              statuses.forEach((status: any) => {
                const entry = {
                  message_id: status.id,
                  status: status.status,
                  timestamp: new Date(status.timestamp * 1000).toISOString(),
                  recipient_id: status.recipient_id,
                }
                console.log('📊 Status atualizado:', entry)
                appendMessage({ event: 'status', ...entry }).catch(() => {})
                forwardToExternalApp({ event: 'status', data: entry }).catch(
                  () => {}
                )
              })
            }
          }
        }
      }

      // Sempre responder com 200 para o WhatsApp
      res.status(200).json({ message: 'Evento recebido' })
    } else {
      res.status(404).json({ error: 'Evento não reconhecido' })
    }
  }

  // Método não permitido
  if (req.method && !['GET', 'POST'].includes(req.method)) {
    res.status(405).json({ error: 'Método não permitido' })
  }
}
