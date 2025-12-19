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
  const graphVersion = process.env.WHATSAPP_GRAPH_VERSION || 'v20.0'

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
        `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
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
                code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'pt_BR',
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
      `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
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

// ========================================
// 🎯 TEMPLATES PRÉ-CONFIGURADOS
// ========================================

/**
 * 1. Confirmação de Lead (lead_confirmation)
 * Envia confirmação completa quando alguém preenche o formulário
 *
 * Variáveis do template:
 * {{1}} = Nome do lead
 * {{2}} = E-mail
 * {{3}} = Plano escolhido
 * {{4}} = WhatsApp formatado
 *
 * Uso: Automático após preenchimento do formulário
 */
export async function sendLeadConfirmation(
  phone: string,
  name: string,
  email?: string,
  plan?: string
): Promise<WhatsAppResponse> {
  const templateName =
    process.env.WHATSAPP_TEMPLATE_LEAD_CONFIRM || 'lead_confirmation'

  // Formatar o telefone para exibição (55 XX XXXXX-XXXX)
  const formatPhone = (phone: string) => {
    const clean = phone.replace(/\D/g, '')
    if (clean.length === 13 && clean.startsWith('55')) {
      return `${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(
        4,
        9
      )}-${clean.slice(9)}`
    }
    return phone
  }

  // Usa template com os 4 parâmetros conforme configurado no WhatsApp Business
  if (templateName && name && email && plan) {
    return sendWhatsAppMessage({
      phone,
      message: '',
      type: 'template',
      templateName,
      templateParams: [name, email, plan, formatPhone(phone)],
    })
  }

  // Fallback: mensagem de texto simples
  const message = `Olá ${name}! 👋

Recebemos seu interesse na Mentoria Esther Social Media!

📋 Seus dados foram registrados com sucesso.

✅ Próximos passos:
Nossa equipe entrará em contato em breve para agendar uma conversa inicial e explicar tudo sobre o programa.

🚀 Prepare-se para transformar seu Instagram em uma máquina de autoridade!

_Esta é uma mensagem automática de confirmação._

*Esther Social Media © 2025*`

  return sendWhatsAppMessage({
    phone,
    message,
    type: 'text',
  })
}

/**
 * 2. Boas-vindas Simples (boas_vindas)
 * Versão curta e direta para primeira aprovação
 *
 * Variáveis:
 * {{1}} = Nome
 *
 * Uso: Alternativa mais simples à confirmação completa
 */
export async function sendWelcomeMessage(
  phone: string,
  name: string
): Promise<WhatsAppResponse> {
  const templateName = process.env.WHATSAPP_TEMPLATE_WELCOME || 'boas_vindas'

  if (templateName) {
    return sendWhatsAppMessage({
      phone,
      message: '',
      type: 'template',
      templateName,
      templateParams: [name],
    })
  }

  const message = `Olá ${name}! 🌟

Obrigada pelo seu interesse na Mentoria Esther Social Media!

Nossa equipe vai entrar em contato em breve.

Enquanto isso, fique à vontade para tirar dúvidas aqui no WhatsApp.

Abraços,
Equipe Esther Social Media`

  return sendWhatsAppMessage({
    phone,
    message,
    type: 'text',
  })
}

/**
 * 3. Lembrete de Reunião (lembrete_reuniao)
 * Envia lembrete para reuniões agendadas
 *
 * Variáveis:
 * {{1}} = Nome
 * {{2}} = Data
 * {{3}} = Horário
 *
 * Uso: Manual ou via automação de agendamento
 */
export async function sendMeetingReminder(
  phone: string,
  name: string,
  date: string,
  time: string
): Promise<WhatsAppResponse> {
  const templateName =
    process.env.WHATSAPP_TEMPLATE_MEETING || 'lembrete_reuniao'

  if (templateName) {
    return sendWhatsAppMessage({
      phone,
      message: '',
      type: 'template',
      templateName,
      templateParams: [name, date, time],
    })
  }

  const message = `Olá ${name}! 📅

Lembrando que nossa reunião está agendada para:

📆 Data: ${date}
🕐 Horário: ${time}

Te aguardamos!

Caso precise reagendar, responda esta mensagem.

Abraços,
Esther Social Media`

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

/**
 * 4. Alerta Interno para o Time (novo_lead_interno)
 * Notifica a equipe quando entra um novo lead
 *
 * Variáveis:
 * {{1}} = Nome
 * {{2}} = E-mail
 * {{3}} = WhatsApp
 * {{4}} = Plano
 * {{5}} = Melhor horário
 * {{6}} = UTM Source
 * {{7}} = UTM Medium
 * {{8}} = UTM Campaign
 * {{9}} = URL de origem
 * {{10}} = Data/hora
 *
 * Uso: Automático após captura de lead
 */
export async function sendInternalLeadAlert(params: {
  name: string
  email: string
  plan?: string
  whatsapp?: string
  bestTime?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  origin?: string
}) {
  const to = process.env.INTERNAL_ALERT_NUMBER
  if (!to) return { success: false, error: 'INTERNAL_ALERT_NUMBER not set' }

  const templateName =
    process.env.WHATSAPP_TEMPLATE_INTERNAL_ALERT || 'novo_lead_interno'
  const now = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })

  // Formatar o telefone para exibição
  const formatPhone = (phone?: string) => {
    if (!phone) return 'Não informado'
    const clean = phone.replace(/\D/g, '')
    if (clean.length === 13 && clean.startsWith('55')) {
      return `${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(
        4,
        9
      )}-${clean.slice(9)}`
    }
    return phone
  }

  // Tenta usar template primeiro - TODOS os 10 parâmetros são obrigatórios
  if (templateName) {
    return sendWhatsAppMessage({
      phone: to,
      message: '',
      type: 'template',
      templateName,
      templateParams: [
        params.name || 'Nome não informado',
        params.email || 'Email não informado',
        formatPhone(params.whatsapp),
        params.plan || 'Não especificado',
        params.bestTime || 'Não informado',
        params.utmSource || 'Direto',
        params.utmMedium || '-',
        params.utmCampaign || '-',
        params.origin || 'Landing Page',
        now,
      ],
    })
  }

  // Fallback: mensagem de texto
  const messageLines = [
    '🔥 NOVO LEAD CAPTURADO!',
    '',
    `👤 Nome: ${params.name}`,
    `📧 E-mail: ${params.email}`,
    params.whatsapp ? `📱 WhatsApp: ${params.whatsapp}` : undefined,
    params.plan ? `💎 Plano: ${params.plan}` : undefined,
    params.bestTime ? `🕐 Melhor horário: ${params.bestTime}` : undefined,
    '',
    '📊 Origem do Lead:',
    params.utmSource ? `• Source: ${params.utmSource}` : undefined,
    params.utmMedium ? `• Medium: ${params.utmMedium}` : undefined,
    params.utmCampaign ? `• Campaign: ${params.utmCampaign}` : undefined,
    params.origin ? `• URL: ${params.origin}` : undefined,
    '',
    `⏰ ${now}`,
  ].filter(Boolean)

  return sendWhatsAppMessage({
    phone: to,
    message: messageLines.join('\n'),
    type: 'text',
  })
}
