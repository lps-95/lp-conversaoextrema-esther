import type { Language } from '../contexts/LanguageContext'

/**
 * Conteúdo da seção Hero (primeira dobra da landing page), em PT/EN/ES.
 *
 * Por que isso existe separado do componente:
 * Pra reaproveitar o layout do Hero em outra landing page, basta duplicar
 * este arquivo e trocar os textos abaixo — o componente `Hero.tsx` não
 * precisa ser tocado.
 *
 * NOTA sobre EN/ES: são rascunhos de tradução adaptada (não literal) —
 * a referência a "R$ 15.000" foi trocada por uma dor mais universal em
 * inglês/espanhol, já que um valor em reais não faz sentido pra alguém
 * fora do Brasil. Revise antes de publicar pra produção.
 */

interface HeroContent {
  badge: string
  headline: { prefix: string; highlight: string }
  painParagraph: {
    before: string
    highlight1: string
    middle: string
    highlight2: string
    after: string
    highlight3: string
    end: string
  }
  painClosingLine: string
  cta: { primaryLabel: string; secondaryLabel: string; secondaryScrollTargetId: string }
  countdown: { targetHours: number; message: string }
  video: { url: string; title: string }
}

export const heroContent: Record<Language, HeroContent> = {
  pt: {
    badge: 'O que separa quem vende de quem só posta',
    headline: {
      prefix: 'Por Que Perfis Qualificados Perdem Contratos Para Concorrentes ',
      highlight: 'Menos Preparados',
    },
    painParagraph: {
      before: 'O motivo raramente é falta de qualidade. Enquanto você investe ',
      highlight1: 'horas toda semana',
      middle: ' criando conteúdo que gera ',
      highlight2: 'pouco retorno',
      after: ', perfis com uma narrativa estratégica ',
      highlight3: 'fecham contratos direto pelo Instagram',
      end: ' — porque cada post foi construído para vender, não só para aparecer.',
    },
    painClosingLine: 'Isso tem solução.',
    cta: {
      primaryLabel: 'Quero Transformar Meu Instagram Agora',
      secondaryLabel: 'Ver Resultados Reais',
      secondaryScrollTargetId: 'prova-numeros',
    },
    countdown: { targetHours: 24, message: 'Vagas limitadas - Oferta expira em:' },
    video: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Como Funciona a Transformação' },
  },
  en: {
    badge: 'What Separates Those Who Sell From Those Who Just Post',
    headline: {
      prefix: 'Why Qualified Professionals Lose Clients To ',
      highlight: 'Less Prepared Competitors',
    },
    painParagraph: {
      before: "It's rarely about quality. While you invest ",
      highlight1: 'hours every week',
      middle: ' creating content that gets ',
      highlight2: 'little return',
      after: ', profiles with a strategic narrative ',
      highlight3: 'close clients straight from Instagram',
      end: ' — because every post is built to sell, not just to show up.',
    },
    painClosingLine: 'That has a solution.',
    cta: {
      primaryLabel: 'I Want To Transform My Instagram Now',
      secondaryLabel: 'See Real Results',
      secondaryScrollTargetId: 'prova-numeros',
    },
    countdown: { targetHours: 24, message: 'Limited spots - Offer expires in:' },
    video: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'How The Transformation Works' },
  },
  es: {
    badge: 'Lo Que Separa A Quien Vende De Quien Solo Publica',
    headline: {
      prefix: 'Por Qué Profesionales Calificadas Pierden Clientes Ante Competidoras ',
      highlight: 'Menos Preparadas',
    },
    painParagraph: {
      before: 'Rara vez es por falta de calidad. Mientras inviertes ',
      highlight1: 'horas cada semana',
      middle: ' creando contenido que genera ',
      highlight2: 'poco retorno',
      after: ', los perfiles con una narrativa estratégica ',
      highlight3: 'cierran clientes directo por Instagram',
      end: ' — porque cada publicación está construida para vender, no solo para aparecer.',
    },
    painClosingLine: 'Eso tiene solución.',
    cta: {
      primaryLabel: 'Quiero Transformar Mi Instagram Ahora',
      secondaryLabel: 'Ver Resultados Reales',
      secondaryScrollTargetId: 'prova-numeros',
    },
    countdown: { targetHours: 24, message: 'Cupos limitados - La oferta termina en:' },
    video: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Cómo Funciona La Transformación' },
  },
}

