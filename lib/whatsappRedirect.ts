import { formContent } from '../content/form'

/**
 * Redireciona o visitante direto pro WhatsApp com a mensagem já preenchida
 * a partir dos campos que ele respondeu no formulário. Esse redirecionamento
 * é a ação principal do formulário — não depende de nenhuma chamada de
 * backend ter terminado.
 */
export function redirectToWhatsApp(data: {
  name?: string
  email?: string
  whatsapp?: string
  niche?: string
  followers?: string
  revenue?: string
  mainGoal?: string
  plan?: string
  bestTime?: string
}) {
  const message = encodeURIComponent(formContent.buildWhatsAppMessage(data))
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || formContent.defaultWhatsappNumber
  const base = number ? `https://wa.me/${number}` : 'https://wa.me/'
  window.location.href = `${base}?text=${message}`
}
