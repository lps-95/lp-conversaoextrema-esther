import type { NextApiRequest, NextApiResponse } from 'next'

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

                // Enviar resposta automática
                try {
                  await sendAutoReply(senderPhone)
                  console.log('✅ Resposta automática enviada para:', senderPhone)
                } catch (error) {
                  console.error('❌ Erro ao enviar resposta automática:', error)
                }
              }

              // Processar mudanças de status
              const statuses = change.value.statuses || []
              statuses.forEach((status: any) => {
                console.log('📊 Status atualizado:', {
                  message_id: status.id,
                  status: status.status,
                  timestamp: new Date(status.timestamp * 1000).toISOString(),
                  recipient_id: status.recipient_id,
                })
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
