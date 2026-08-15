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
    badge: 'Você acabou de perder um contrato',
    headline: {
      prefix: 'Você Perdeu R$ 15.000 Para Uma ',
      highlight: 'Concorrente Menos Qualificada',
    },
    painParagraph: {
      before: 'O motivo? Seu Instagram parecia amador. Enquanto você gasta ',
      highlight1: '12 horas semanais',
      middle: ' criando posts que morrem com ',
      highlight2: '8 curtidas',
      after: ', ela fecha ',
      highlight3: '4 contratos por mês',
      end: ' porque seu perfil trabalha como vendedor 24h.',
    },
    painClosingLine: 'Isso acaba hoje.',
    cta: {
      primaryLabel: 'Quero Parar de Perder Contratos Agora',
      secondaryLabel: 'Ver Resultados Reais',
      secondaryScrollTargetId: 'prova-numeros',
    },
    countdown: { targetHours: 24, message: 'Vagas limitadas - Oferta expira em:' },
    video: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Como Funciona a Transformação' },
  },
  en: {
    badge: 'You just lost a client',
    headline: {
      prefix: 'You Just Lost a Client To A ',
      highlight: 'Less Qualified Competitor',
    },
    painParagraph: {
      before: 'Why? Your Instagram looked amateur. While you spend ',
      highlight1: '12 hours a week',
      middle: ' creating posts that get ',
      highlight2: '8 likes',
      after: ', she closes ',
      highlight3: '4 new clients a month',
      end: ' because her profile works as a 24/7 salesperson.',
    },
    painClosingLine: 'That ends today.',
    cta: {
      primaryLabel: 'I Want To Stop Losing Clients Now',
      secondaryLabel: 'See Real Results',
      secondaryScrollTargetId: 'prova-numeros',
    },
    countdown: { targetHours: 24, message: 'Limited spots - Offer expires in:' },
    video: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'How The Transformation Works' },
  },
  es: {
    badge: 'Acabas de perder un cliente',
    headline: {
      prefix: 'Acabas De Perder Un Cliente Ante Una ',
      highlight: 'Competidora Menos Calificada',
    },
    painParagraph: {
      before: '¿El motivo? Tu Instagram parecía amateur. Mientras tú dedicas ',
      highlight1: '12 horas semanales',
      middle: ' a crear publicaciones que reciben ',
      highlight2: '8 me gusta',
      after: ', ella cierra ',
      highlight3: '4 clientes nuevos al mes',
      end: ' porque su perfil trabaja como vendedor 24 horas.',
    },
    painClosingLine: 'Eso termina hoy.',
    cta: {
      primaryLabel: 'Quiero Dejar De Perder Clientes Ahora',
      secondaryLabel: 'Ver Resultados Reales',
      secondaryScrollTargetId: 'prova-numeros',
    },
    countdown: { targetHours: 24, message: 'Cupos limitados - La oferta termina en:' },
    video: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Cómo Funciona La Transformación' },
  },
}

