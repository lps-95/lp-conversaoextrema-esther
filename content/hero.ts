/**
 * Conteúdo da seção Hero (primeira dobra da landing page).
 *
 * Por que isso existe separado do componente:
 * Pra reaproveitar o layout do Hero em outra landing page, basta duplicar
 * este arquivo e trocar os textos abaixo — o componente `Hero.tsx` não
 * precisa ser tocado.
 */

export const heroContent = {
  /** Selo pequeno acima do título */
  badge: 'Você acabou de perder um contrato',

  /** Título principal. Dividido em partes pra poder estilizar o trecho em destaque. */
  headline: {
    prefix: 'Você Perdeu R$ 15.000 Para Uma ',
    highlight: 'Concorrente Menos Qualificada',
  },

  /** Parágrafo de validação da dor do visitante (usa <strong> para os trechos em destaque) */
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
    /** id do elemento pra onde o botão secundário rola a página */
    secondaryScrollTargetId: 'prova-numeros',
  },

  countdown: {
    targetHours: 24,
    message: 'Vagas limitadas - Oferta expira em:',
  },

  video: {
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Como Funciona a Transformação',
  },
}
