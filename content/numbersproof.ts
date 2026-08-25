import type { Language } from '../contexts/LanguageContext'

interface NumbersProofContent {
  badge: string
  title: { prefix: string; highlight: string }
  subtitle: { prefix: string; highlight: string }
  subtitle2Prefix: string
  screenshotsTitle: { prefix: string; highlight: string }
  screenshotsSubtitle: string
  screenshotBadgeLabel: string
  footnote: string
  screenshotAlt: string
  showMoreLabel: string
  showLessLabel: string
}

export interface FeedbackScreenshot {
  file: string
  /** Dimensões reais do arquivo — usadas pra manter a proporção original de
   *  cada print no layout em mosaico, sem cortar ou esticar a imagem. */
  width: number
  height: number
}

/**
 * Prints reais de conversas com clientes (WhatsApp/e-mail), tirados de
 * `public/feedbacks/`. Substituem os depoimentos fabricados que existiam
 * aqui antes — texto e números "de resultado" que ninguém confirmou.
 *
 * Um print de conversa real é uma prova muito mais forte (e muito mais
 * defensável, inclusive perante o Meta) do que um card de depoimento bonito
 * com nome e estatística que não dá pra verificar. Se novos prints forem
 * adicionados em `public/feedbacks/`, incluir o arquivo com as dimensões
 * reais dele (`width`/`height` da imagem) na lista abaixo.
 */
export const feedbackScreenshots: FeedbackScreenshot[] = [
  { file: '1.jpg', width: 828, height: 1011 },
  { file: '2.jpg', width: 827, height: 494 },
  { file: '3.jpg', width: 828, height: 359 },
  { file: '4.jpg', width: 828, height: 488 },
  { file: '5.jpg', width: 828, height: 631 },
  { file: '6.jpg', width: 828, height: 522 },
  { file: '7.jpg', width: 828, height: 406 },
  { file: '8.jpg', width: 828, height: 547 },
  { file: '9.jpg', width: 828, height: 510 },
  { file: '10.jpg', width: 828, height: 612 },
  { file: '11.jpg', width: 828, height: 502 },
  { file: '12.jpg', width: 828, height: 650 },
  { file: '13.jpg', width: 828, height: 506 },
]

export const numbersProofContent: Record<Language, NumbersProofContent> = {
  pt: {
    badge: '⭐ Resultados Reais',
    title: { prefix: 'Enquanto Você Pensa, Outras ', highlight: 'Já Estão Ganhando' },
    subtitle: { prefix: 'Transformações comprovadas em até ', highlight: '90 dias' },
    subtitle2Prefix: ' — com processo leve e direção clara.',
    screenshotsTitle: { prefix: 'Prints Reais De ', highlight: 'Conversas Com Clientes' },
    screenshotsSubtitle: 'Sem atriz, sem roteiro — só o que as clientes mandaram mesmo, do jeito que mandaram.',
    screenshotBadgeLabel: 'Conversa real',
    footnote: '*Nomes e números foram borrados nas conversas para preservar a privacidade das clientes.',
    screenshotAlt: 'Print de conversa real com cliente',
    showMoreLabel: 'Ver mais conversas',
    showLessLabel: 'Ver menos',
  },
  en: {
    badge: '⭐ Real Results',
    title: { prefix: 'While You Think It Over, Others ', highlight: 'Are Already Winning' },
    subtitle: { prefix: 'Proven transformations within ', highlight: '90 days' },
    subtitle2Prefix: ' — with a light process and clear direction.',
    screenshotsTitle: { prefix: 'Real ', highlight: 'Client Conversations' },
    screenshotsSubtitle: 'No actors, no script — just what clients actually sent, exactly as they sent it.',
    screenshotBadgeLabel: 'Real chat',
    footnote: '*Names and numbers have been blurred in the conversations to protect client privacy.',
    screenshotAlt: 'Real client conversation screenshot',
    showMoreLabel: 'Show more conversations',
    showLessLabel: 'Show less',
  },
  es: {
    badge: '⭐ Resultados Reales',
    title: { prefix: 'Mientras Lo Piensas, Otras ', highlight: 'Ya Están Ganando' },
    subtitle: { prefix: 'Transformaciones comprobadas en hasta ', highlight: '90 días' },
    subtitle2Prefix: ' — con un proceso ligero y una dirección clara.',
    screenshotsTitle: { prefix: 'Conversaciones Reales Con ', highlight: 'Clientas' },
    screenshotsSubtitle: 'Sin actrices, sin guion — solo lo que las clientas realmente enviaron, tal como lo enviaron.',
    screenshotBadgeLabel: 'Chat real',
    footnote: '*Se difuminaron nombres y números en las conversaciones para proteger la privacidad de las clientas.',
    screenshotAlt: 'Captura real de conversación con clienta',
    showMoreLabel: 'Ver más conversaciones',
    showLessLabel: 'Ver menos',
  },
}
