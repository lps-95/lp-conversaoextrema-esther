interface WhatsAppMessage {
  phone: string
  message: string
  type?: 'text' | 'template'
  templateName?: string
  templateParams?: string[]
}

interface WhatsAppResponse {
  success: boolean
  messageId?: string
  error?: string
}

export async function sendWhatsAppMessage(
  data: WhatsAppMessage
): Promise<WhatsAppResponse> {
  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

  if (!token || !phoneNumberId) {
    return {
      success: false,
      error: 'WhatsApp credentials not configured',
    }
  }

  try {
    // Remover caracteres especiais do número
    const cleanPhone = data.phone.replace(/\D/g, '')

    // Se for tipo template (recomendado para notificações)
    if (data.type === 'template' && data.templateName) {
      const response = await fetch(
        `https://graph.instagram.com/v18.0/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: cleanPhone,
            type: 'template',
            template: {
              name: data.templateName,
              language: {
                code: 'pt_BR',
              },
              components: data.templateParams
                ? [
                    {
                      type: 'body',
                      parameters: data.templateParams.map((param) => ({
                        type: 'text',
                        text: param,
                      })),
                    },
                  ]
                : undefined,
            },
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        console.error('WhatsApp template error:', result)
        return {
          success: false,
          error: result.error?.message || 'Failed to send template',
        }
      }

      return {
        success: true,
        messageId: result.messages?.[0]?.id,
      }
    }

    // Envio de mensagem de texto simples
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: cleanPhone,
          type: 'text',
          text: {
            body: data.message,
          },
        }),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('WhatsApp send error:', result)
      return {
        success: false,
        error: result.error?.message || 'Failed to send message',
      }
    }

    console.log('WhatsApp message sent:', {
      phone: cleanPhone,
      messageId: result.messages?.[0]?.id,
    })

    return {
      success: true,
      messageId: result.messages?.[0]?.id,
    }
  } catch (error) {
    console.error('WhatsApp service error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Função auxiliar para enviar confirmação de lead
export async function sendLeadConfirmation(
  phone: string,
  name: string
): Promise<WhatsAppResponse> {
  const message = `Olá ${name}! 👋

Recebemos sua solicitação com sucesso! 

Um de nossos especialistas entrará em contato em breve para discutir sobre a mentoria Esther Social Media.

Obrigado por confiar em nós! 🚀

*Esther Social Media*`

  return sendWhatsAppMessage({
    phone,
    message,
    type: 'text',
  })
}

// Função auxiliar para respostas automáticas
export async function sendAutoReply(phone: string): Promise<WhatsAppResponse> {
  const message = `Olá! 👋

Obrigado por entrar em contato com a Esther Social Media!

Recebemos sua mensagem e responderemos assim que possível. Estamos aqui para ajudar! 🚀

*Horário de atendimento: Segunda a Sexta, 9h às 18h*`

  return sendWhatsAppMessage({
    phone,
    message,
    type: 'text',
  })
}
