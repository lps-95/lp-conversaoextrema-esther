import type { Language } from '../contexts/LanguageContext'

interface FaqItem {
  number: string
  question: string
  answer: string
  color: string
  icon: string
}

interface FaqContent {
  badge: string
  title: string
  subtitle: string
  faqs: FaqItem[]
}

export const faqContent: Record<Language, FaqContent> = {
  pt: {
    badge: '❓ Perguntas Frequentes',
    title: 'Elimine Suas Objeções',
    subtitle: 'As 6 perguntas que todo mundo faz antes de começar',
    faqs: [
      {
        number: '01',
        question: 'Quando vejo minha primeira venda orgânica?',
        answer: 'Depende totalmente do seu nicho, oferta e constância na execução — não prometemos uma data fechada. O que costumamos observar: movimento real no direct (mensagens qualificadas) começa a aparecer nas primeiras 3-4 semanas de execução consistente, e a primeira venda orgânica normalmente vem depois disso, conforme a estratégia amadurece. Quem segue o planejamento e as aprovações em dia tende a ver resultado mais rápido — a consistência pesa mais do que qualquer prazo fixo.',
        color: 'from-green-500/20 to-emerald-500/20',
        icon: '⏱️',
      },
      {
        number: '02',
        question: 'Preciso fazer vídeos, dancinhas ou aparecer muito?',
        answer: 'Não. Você não precisa de vídeos dançando, trends ou uma exposição exagerada. Trabalhamos com carrosséis, reels educativos, stories estratégicos e posts de texto — o formato é escolhido de acordo com o que funciona pro seu nicho e com o que você se sente confortável fazendo. Várias clientes vendem bem sem nunca aparecer em vídeo dinâmico. Você vende com inteligência, não com exposição.',
        color: 'from-blue-500/20 to-purple-500/20',
        icon: '🎬',
      },
      {
        number: '03',
        question: 'E se meu perfil perder a minha autenticidade?',
        answer: 'Esse medo é legítimo e levamos a sério. Dedicamos as primeiras semanas estudando sua voz, valores, jeito de falar e posicionamento único, ANTES de criar um único post. Você aprova tudo que vai ao ar e tem controle total sobre o resultado final. Autenticidade + Estratégia = Vendas reais, sem virar um perfil genérico.',
        color: 'from-purple-500/20 to-pink-500/20',
        icon: '🎯',
      },
      {
        number: '04',
        question: 'Já investi em gestão e não funcionou. Por que seria diferente?',
        answer: 'A maioria das agências entrega posts bonitos sem foco em vendas. Aqui a diferença é a abordagem: somos estrategistas de conversão, não só criadores de conteúdo. Mostramos o funil completo já na primeira reunião, e você acompanha métricas que realmente importam — consultas geradas, vendas fechadas — não curtidas ou seguidores. A diferença está na estratégia + execução focada em resultado, não em posts bonitos isolados.',
        color: 'from-button-primary/20 to-accent-gold/20',
        icon: '💰',
      },
      {
        number: '05',
        question: 'Não tenho tempo para muitas reuniões e aprovações',
        answer: 'Tranquilo. A primeira reunião é uma imersão mais profunda (2-3 horas, acontece uma vez). Depois disso, você precisa de cerca de 40 minutos por mês para aprovar o planejamento. Todo o resto — criação, edição, agendamento, publicação, gestão — é executado por nós. O sistema roda sozinho depois que você aprova a estratégia.',
        color: 'from-cyan-500/20 to-blue-500/20',
        icon: '⚙️',
      },
      {
        number: '06',
        question: 'Qual garantia vocês dão? E se não der certo?',
        answer: 'Garantia de Entrega: nosso compromisso é com o que está sob nosso controle — cronograma, qualidade e execução da estratégia combinada. Se algum entregável do plano não sair no prazo, ajustamos ou compensamos SEM CUSTO ADICIONAL. Resultado de venda depende de fatores como nicho, oferta e mercado, então não prometemos números — prometemos rigor na execução, o que no mercado é raro de encontrar.',
        color: 'from-orange-500/20 to-red-500/20',
        icon: '✅',
      },
    ],
  },
  en: {
    badge: '❓ Frequently Asked Questions',
    title: 'Answering Your Objections',
    subtitle: 'The 6 questions everyone asks before getting started',
    faqs: [
      {
        number: '01',
        question: 'When will I see my first organic sale?',
        answer: "It fully depends on your niche, offer, and consistency in execution — we don't promise a fixed date. What we typically see: real movement in your DMs (qualified messages) starts appearing within the first 3-4 weeks of consistent execution, and the first organic sale usually follows as the strategy matures. Clients who stay on top of the plan and approvals tend to see results faster — consistency matters more than any fixed deadline.",
        color: 'from-green-500/20 to-emerald-500/20',
        icon: '⏱️',
      },
      {
        number: '02',
        question: 'Do I need to make videos, dance trends, or show my face a lot?',
        answer: "No. You don't need dancing videos, trends, or excessive on-camera exposure. We work with carousels, educational reels, strategic stories, and text posts — the format is chosen based on what works for your niche and what you're comfortable doing. Plenty of clients sell well without ever appearing in a dynamic video. You sell with intelligence, not exposure.",
        color: 'from-blue-500/20 to-purple-500/20',
        icon: '🎬',
      },
      {
        number: '03',
        question: 'What if my profile loses my authenticity?',
        answer: 'That fear is legitimate and we take it seriously. We spend the first weeks studying your voice, values, way of speaking, and unique positioning, BEFORE creating a single post. You approve everything that goes live and keep full control over the final result. Authenticity + Strategy = Real sales, without turning into a generic profile.',
        color: 'from-purple-500/20 to-pink-500/20',
        icon: '🎯',
      },
      {
        number: '04',
        question: "I've already invested in management before and it didn't work. Why would this be different?",
        answer: "Most agencies deliver pretty posts with no focus on sales. Here the difference is the approach: we're conversion strategists, not just content creators. We show you the complete funnel in the first meeting, and you track metrics that actually matter — consultations generated, sales closed — not likes or followers. The difference is strategy + execution focused on results, not isolated pretty posts.",
        color: 'from-button-primary/20 to-accent-gold/20',
        icon: '💰',
      },
      {
        number: '05',
        question: "I don't have time for a lot of meetings and approvals",
        answer: "No worries. The first meeting is a deep-dive session (2-3 hours, happens once). After that, you only need about 40 minutes a month to approve the plan. Everything else — creation, editing, scheduling, posting, management — is handled by us. The system runs itself once you approve the strategy.",
        color: 'from-cyan-500/20 to-blue-500/20',
        icon: '⚙️',
      },
      {
        number: '06',
        question: 'What guarantee do you offer? What if it doesn\'t work?',
        answer: "Delivery Guarantee: our commitment is to what's within our control — timeline, quality, and execution of the agreed strategy. If any deliverable slips past its deadline, we adjust or make it right at NO ADDITIONAL COST. Sales results depend on factors like niche, offer, and market, so we don't promise numbers — we promise rigorous execution, which is rare to find in this market.",
        color: 'from-orange-500/20 to-red-500/20',
        icon: '✅',
      },
    ],
  },
  es: {
    badge: '❓ Preguntas Frecuentes',
    title: 'Eliminemos Tus Objeciones',
    subtitle: 'Las 6 preguntas que todo el mundo hace antes de empezar',
    faqs: [
      {
        number: '01',
        question: '¿Cuándo veré mi primera venta orgánica?',
        answer: 'Depende totalmente de tu nicho, oferta y constancia en la ejecución — no prometemos una fecha fija. Esto es lo que solemos observar: el movimiento real en mensajes directos (mensajes calificados) empieza a aparecer en las primeras 3-4 semanas de ejecución constante, y la primera venta orgánica normalmente llega después, a medida que la estrategia madura. Quien mantiene al día el plan y las aprobaciones suele ver resultados más rápido — la constancia pesa más que cualquier plazo fijo.',
        color: 'from-green-500/20 to-emerald-500/20',
        icon: '⏱️',
      },
      {
        number: '02',
        question: '¿Necesito hacer videos, bailes o mostrarme mucho?',
        answer: 'No. No necesitas videos bailando, tendencias ni una exposición exagerada. Trabajamos con carruseles, reels educativos, historias estratégicas y publicaciones de texto — el formato se elige según lo que funciona para tu nicho y con lo que te sientas cómoda haciendo. Muchas clientas venden bien sin aparecer nunca en un video dinámico. Vendes con inteligencia, no con exposición.',
        color: 'from-blue-500/20 to-purple-500/20',
        icon: '🎬',
      },
      {
        number: '03',
        question: '¿Y si mi perfil pierde mi autenticidad?',
        answer: 'Ese miedo es legítimo y lo tomamos en serio. Dedicamos las primeras semanas a estudiar tu voz, valores, forma de hablar y posicionamiento único, ANTES de crear una sola publicación. Tú apruebas todo lo que se publica y tienes control total sobre el resultado final. Autenticidad + Estrategia = Ventas reales, sin convertirte en un perfil genérico.',
        color: 'from-purple-500/20 to-pink-500/20',
        icon: '🎯',
      },
      {
        number: '04',
        question: 'Ya invertí en gestión antes y no funcionó. ¿Por qué sería diferente?',
        answer: 'La mayoría de las agencias entregan publicaciones bonitas sin enfoque en ventas. Aquí la diferencia es el enfoque: somos estrategas de conversión, no solo creadoras de contenido. Te mostramos el embudo completo en la primera reunión, y sigues métricas que realmente importan — consultas generadas, ventas cerradas — no me gusta o seguidores. La diferencia está en la estrategia + ejecución enfocada en resultados, no en publicaciones bonitas aisladas.',
        color: 'from-button-primary/20 to-accent-gold/20',
        icon: '💰',
      },
      {
        number: '05',
        question: 'No tengo tiempo para muchas reuniones y aprobaciones',
        answer: 'Tranquila. La primera reunión es una inmersión más profunda (2-3 horas, ocurre una sola vez). Después de eso, solo necesitas unos 40 minutos al mes para aprobar la planificación. Todo lo demás — creación, edición, programación, publicación, gestión — lo ejecutamos nosotros. El sistema funciona solo después de que apruebas la estrategia.',
        color: 'from-cyan-500/20 to-blue-500/20',
        icon: '⚙️',
      },
      {
        number: '06',
        question: '¿Qué garantía ofrecen? ¿Y si no funciona?',
        answer: 'Garantía de Entrega: nuestro compromiso es con lo que está bajo nuestro control — cronograma, calidad y ejecución de la estrategia acordada. Si algún entregable del plan no sale en el plazo, lo ajustamos o compensamos SIN COSTO ADICIONAL. El resultado de venta depende de factores como nicho, oferta y mercado, así que no prometemos números — prometemos rigor en la ejecución, algo poco común en este mercado.',
        color: 'from-orange-500/20 to-red-500/20',
        icon: '✅',
      },
    ],
  },
}
