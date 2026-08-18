import type { Language } from '../contexts/LanguageContext'

interface NumbersProofContent {
  badge: string
  title: { prefix: string; highlight: string }
  subtitle: { prefix: string; highlight: string }
  subtitle2Prefix: string
  screenshotsTitle: { prefix: string; highlight: string }
  screenshotsSubtitle: string
  footnote: string
  screenshotAlt: string
}

/**
 * Prints reais de conversas com clientes (WhatsApp/e-mail), tirados de
 * `public/feedbacks/`. Substituem os depoimentos fabricados que existiam
 * aqui antes — texto e números "de resultado" que ninguém confirmou.
 *
 * Um print de conversa real é uma prova muito mais forte (e muito mais
 * defensável, inclusive perante o Meta) do que um card de depoimento bonito
 * com nome e estatística que não dá pra verificar. Se novos prints forem
 * adicionados em `public/feedbacks/`, só incluir o nome do arquivo na lista
 * abaixo — não precisa mexer no componente.
 */
export const feedbackScreenshots: string[] = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
]

export const numbersProofContent: Record<Language, NumbersProofContent> = {
  pt: {
    badge: '⭐ Resultados Reais',
    title: { prefix: 'Enquanto Você Pensa, Outras ', highlight: 'Já Estão Ganhando' },
    subtitle: { prefix: 'Transformações comprovadas em até ', highlight: '90 dias' },
    subtitle2Prefix: ' — com processo leve e direção clara.',
    screenshotsTitle: { prefix: 'Prints Reais De ', highlight: 'Conversas Com Clientes' },
    screenshotsSubtitle: 'Sem atriz, sem roteiro — só o que as clientes mandaram mesmo, do jeito que mandaram.',
    footnote: '*Nomes e números foram borrados nas conversas para preservar a privacidade das clientes.',
    screenshotAlt: 'Print de conversa real com cliente',
  },
  en: {
    badge: '⭐ Real Results',
    title: { prefix: 'While You Think It Over, Others ', highlight: 'Are Already Winning' },
    subtitle: { prefix: 'Proven transformations within ', highlight: '90 days' },
    subtitle2Prefix: ' — with a light process and clear direction.',
    screenshotsTitle: { prefix: 'Real ', highlight: 'Client Conversations' },
    screenshotsSubtitle: 'No actors, no script — just what clients actually sent, exactly as they sent it.',
    footnote: '*Names and numbers have been blurred in the conversations to protect client privacy.',
    screenshotAlt: 'Real client conversation screenshot',
  },
  es: {
    badge: '⭐ Resultados Reales',
    title: { prefix: 'Mientras Lo Piensas, Otras ', highlight: 'Ya Están Ganando' },
    subtitle: { prefix: 'Transformaciones comprobadas en hasta ', highlight: '90 días' },
    subtitle2Prefix: ' — con un proceso ligero y una dirección clara.',
    screenshotsTitle: { prefix: 'Conversaciones Reales Con ', highlight: 'Clientas' },
    screenshotsSubtitle: 'Sin actrices, sin guion — solo lo que las clientas realmente enviaron, tal como lo enviaron.',
    footnote: '*Se difuminaron nombres y números en las conversaciones para proteger la privacidad de las clientas.',
    screenshotAlt: 'Captura real de conversación con clienta',
  },
}
