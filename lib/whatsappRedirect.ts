import { formContent } from '../content/form'

/**
 * Depois que o lead é registrado com sucesso, mandamos o visitante pro
 * WhatsApp já com a mensagem pré-preenchida (nome, plano, contato etc).
 */
export function redirectToWhatsApp(data: {
  name: string
  email: string
  plan: string
  whatsapp: string
  bestTime: string
}) {
  try {
    const message = encodeURIComponent(formContent.buildWhatsAppMessage(data))
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || formContent.defaultWhatsappNumber
    const base = number ? `https://wa.me/${number}` : 'https://wa.me/'
    window.location.href = `${base}?text=${message}`
  } catch {
    // Se o redirecionamento falhar, o lead já foi registrado no backend —
    // não é motivo pra mostrar erro pro usuário.
  }
}
