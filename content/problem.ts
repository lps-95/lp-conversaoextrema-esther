import type { Language } from '../contexts/LanguageContext'

interface ProblemContent {
  badge: string
  title: { prefix: string; highlight: string }
  moments: {
    emoji: string
    heading: string
    before: string
    highlight: string
    after: string
  }[]
  harshTruth: {
    emoji: string
    heading: string
    before: string
    highlight1: string
    middle: string
    highlight2: string
    closing: string
  }
  ctaGood: string
  ctaSub: string
}

export const problemContent: Record<Language, ProblemContent> = {
  pt: {
    badge: '😤 O Problema Real',
    title: { prefix: 'Você Está No Ciclo da ', highlight: 'Invisibilidade Digital' },
    moments: [
      {
        emoji: '🌙',
        heading: 'São 11h da noite de domingo',
        before:
          'Você está no celular há 2 horas tentando criar o conteúdo da semana. De novo. Seu marido já reclamou que você vive grudada no Instagram mas nunca vende nada. Você sabe que amanhã vai postar aquele carrossel que levou 3 horas para fazer e vai morrer com ',
        highlight: '12 curtidas',
        after: '. E você não sabe o que mais fazer.',
      },
      {
        emoji: '😰',
        heading: 'Enquanto isso, aquela coach que você conhece...',
        before:
          'A que você secretamente acha menos qualificada (porque sabe que seus resultados são melhores) acabou de anunciar que as vagas do grupo dela esgotaram em 48 horas. ',
        highlight: 'Pelo Instagram. De novo.',
        after: ' Você viu a mãe dela comentando que a filha finalmente está faturando. Novamente, você não entende o que ela sabe que você não sabe.',
      },
      {
        emoji: '🎯',
        heading: 'O problema não é você. Não é criatividade.',
        before: 'É que seus posts funcionam como ',
        highlight: 'ilhas isoladas',
        after:
          '. Um post sobre sua metodologia aqui, outro sobre case de sucesso ali, um terceiro pedindo contato. Seu seguidor vê, curte, esquece. Não há conexão entre eles. Não há história que acumula desejo. Não há jornada que guia até a compra.',
      },
    ],
    harshTruth: {
      emoji: '💔',
      heading: 'E a verdade incômoda?',
      before: 'A concorrente menos qualificada que está vendendo não sabe conteúdo melhor que você. Ela sabe como ',
      highlight1: 'conectar cada post ao anterior',
      middle: ', criando uma jornada invisível que transforma seguidores em clientes. ',
      highlight2: 'Você tem qualidade. Ela tem estratégia.',
      closing: 'Enquanto você continua postando isolado, ela está fechando os contratos que deveriam ser seus.',
    },
    ctaGood: 'A boa notícia? Isso é completamente reversível.',
    ctaSub: 'Existe uma forma de conectar esses pontos soltos e transformar seu perfil em máquina de vendas.',
  },
  en: {
    badge: '😤 The Real Problem',
    title: { prefix: 'You Are Stuck In The ', highlight: 'Digital Invisibility Cycle' },
    moments: [
      {
        emoji: '🌙',
        heading: "It's 11pm on a Sunday night",
        before:
          "You've been on your phone for 2 hours trying to plan this week's content. Again. Your partner already complained that you're glued to Instagram but never sell anything. You know that tomorrow you'll post that carousel that took 3 hours to make and it's going to die with ",
        highlight: '12 likes',
        after: ". And you don't know what else to do.",
      },
      {
        emoji: '😰',
        heading: 'Meanwhile, that coach you know...',
        before:
          "The one you secretly think is less qualified (because you know your results are better) just announced her group's spots sold out in 48 hours. ",
        highlight: 'On Instagram. Again.',
        after: " You saw her mom commenting that her daughter is finally making money. Once again, you don't understand what she knows that you don't.",
      },
      {
        emoji: '🎯',
        heading: "It's not you. It's not a lack of creativity.",
        before: 'The problem is your posts work like ',
        highlight: 'isolated islands',
        after:
          '. One post about your method here, another about a success story there, a third one asking for contact. Your follower sees it, likes it, forgets it. There is no connection between them. No story building desire. No journey guiding them to buy.',
      },
    ],
    harshTruth: {
      emoji: '💔',
      heading: 'And the uncomfortable truth?',
      before: "The less qualified competitor who's selling doesn't have better content than you. She knows how to ",
      highlight1: 'connect each post to the last',
      middle: ', creating an invisible journey that turns followers into clients. ',
      highlight2: 'You have quality. She has strategy.',
      closing: "While you keep posting in isolation, she's closing the clients that should've been yours.",
    },
    ctaGood: 'The good news? This is completely reversible.',
    ctaSub: 'There is a way to connect these loose dots and turn your profile into a sales machine.',
  },
  es: {
    badge: '😤 El Problema Real',
    title: { prefix: 'Estás Atrapada En El Ciclo De La ', highlight: 'Invisibilidad Digital' },
    moments: [
      {
        emoji: '🌙',
        heading: 'Son las 11 de la noche de un domingo',
        before:
          'Llevas 2 horas en el celular intentando crear el contenido de la semana. Otra vez. Tu pareja ya se quejó de que vives pegada a Instagram pero nunca vendes nada. Sabes que mañana vas a publicar ese carrusel que tardó 3 horas en hacer y va a morir con ',
        highlight: '12 me gusta',
        after: '. Y no sabes qué más hacer.',
      },
      {
        emoji: '😰',
        heading: 'Mientras tanto, esa coach que conoces...',
        before:
          'La que secretamente crees menos calificada (porque sabes que tus resultados son mejores) acaba de anunciar que los cupos de su grupo se agotaron en 48 horas. ',
        highlight: 'Por Instagram. De nuevo.',
        after: ' Viste a su mamá comentando que su hija por fin está facturando. Una vez más, no entiendes lo que ella sabe que tú no sabes.',
      },
      {
        emoji: '🎯',
        heading: 'El problema no eres tú. No es falta de creatividad.',
        before: 'Es que tus publicaciones funcionan como ',
        highlight: 'islas aisladas',
        after:
          '. Una publicación sobre tu metodología aquí, otra sobre un caso de éxito allá, una tercera pidiendo contacto. Tu seguidor ve, le da me gusta, olvida. No hay conexión entre ellas. No hay historia que acumule deseo. No hay recorrido que guíe hasta la compra.',
      },
    ],
    harshTruth: {
      emoji: '💔',
      heading: '¿Y la verdad incómoda?',
      before: 'La competidora menos calificada que está vendiendo no tiene mejor contenido que tú. Ella sabe cómo ',
      highlight1: 'conectar cada publicación con la anterior',
      middle: ', creando un recorrido invisible que convierte seguidores en clientes. ',
      highlight2: 'Tú tienes calidad. Ella tiene estrategia.',
      closing: 'Mientras sigues publicando de forma aislada, ella está cerrando los contratos que deberían ser tuyos.',
    },
    ctaGood: '¿La buena noticia? Esto es completamente reversible.',
    ctaSub: 'Existe una forma de conectar estos puntos sueltos y convertir tu perfil en una máquina de ventas.',
  },
}
