import type { Language } from '../contexts/LanguageContext'

interface Step {
  number: string
  emoji: string
  title: string
  description: string
  gradient: string
  tags: string[]
}

interface ComoFuncionaContent {
  badge: string
  title: { prefix: string; highlight: string }
  subtitle: string
  steps: Step[]
}

export const comoFuncionaContent: Record<Language, ComoFuncionaContent> = {
  pt: {
    badge: '⚡ Metodologia Comprovada',
    title: { prefix: 'Como Funciona o ', highlight: 'Gestão Extrema' },
    subtitle: '5 passos estratégicos que transformam seu perfil invisível em máquina de vendas.',
    steps: [
      {
        number: '01',
        emoji: '🔍',
        title: 'Diagnóstico da Atrofia Digital',
        description: 'Mapeamos cada ponto onde seu perfil está perdendo dinheiro. Identificamos os vazios de narrativa que transformam visitantes em desistentes. Você recebe um relatório completo mostrando exatamente onde o sangramento de oportunidades acontece.',
        gradient: 'from-red-500/20 to-orange-500/20',
        tags: ['Diagnóstico Profundo', 'Análise Completa'],
      },
      {
        number: '02',
        emoji: '🧩',
        title: 'Arquitetura de Identidade Magnética',
        description: 'Reconstruímos sua presença do zero. Bio estratégica, destaques organizados e linha editorial coesa que posiciona você como única escolha lógica. Seu perfil passa a atrair cliente ideal e repelir curioso que nunca compra.',
        gradient: 'from-blue-500/20 to-purple-500/20',
        tags: ['Bio Estratégica', 'Design Premium'],
      },
      {
        number: '03',
        emoji: '🗺️',
        title: 'Sistema de Narrativas Vendedoras',
        description: 'Criamos o planejamento completo de conteúdo baseado em funil invisível. Cada post funciona como capítulo estratégico que acumula desejo de compra. Roteiros prontos, formatos definidos, cronograma claro para os próximos 90 dias.',
        gradient: 'from-green-500/20 to-emerald-500/20',
        tags: ['90 Dias de Conteúdo', 'Funil Invisível'],
      },
      {
        number: '04',
        emoji: '⚙️',
        title: 'Gestão Executiva Hands-Off',
        description: 'Assumimos toda a execução. Criação, edição, publicação e gestão diária do perfil. Você aprova o planejamento e nós fazemos acontecer. Seu perfil trabalha 24 horas vendendo enquanto você foca em atender clientes.',
        gradient: 'from-purple-500/20 to-pink-500/20',
        tags: ['Gestão Total', 'Hands-Off'],
      },
      {
        number: '05',
        emoji: '📊',
        title: 'Otimização Contínua por Dados',
        description: 'Analisamos métricas que realmente importam. Ajustamos a estratégia com base em performance real. Seu ROI aumenta mês após mês enquanto refinamos a máquina de vendas com precisão cirúrgica.',
        gradient: 'from-button-primary/20 to-accent-gold/20',
        tags: ['ROI Crescente', 'Otimização Contínua'],
      },
    ],
  },
  en: {
    badge: '⚡ Proven Methodology',
    title: { prefix: 'How ', highlight: 'Gestão Extrema Works' },
    subtitle: '5 strategic steps that turn your invisible profile into a sales machine.',
    steps: [
      {
        number: '01',
        emoji: '🔍',
        title: 'Digital Atrophy Diagnosis',
        description: "We map every point where your profile is losing money. We identify the narrative gaps that turn visitors into people who leave. You get a complete report showing exactly where opportunities are slipping away.",
        gradient: 'from-red-500/20 to-orange-500/20',
        tags: ['Deep Diagnosis', 'Full Analysis'],
      },
      {
        number: '02',
        emoji: '🧩',
        title: 'Magnetic Identity Architecture',
        description: 'We rebuild your presence from the ground up. Strategic bio, organized highlights, and a cohesive editorial line that positions you as the only logical choice. Your profile starts attracting ideal clients and repelling curious people who never buy.',
        gradient: 'from-blue-500/20 to-purple-500/20',
        tags: ['Strategic Bio', 'Premium Design'],
      },
      {
        number: '03',
        emoji: '🗺️',
        title: 'Sales Narrative System',
        description: 'We create a complete content plan based on an invisible funnel. Every post works as a strategic chapter that builds purchase desire. Ready-made scripts, defined formats, a clear schedule for the next 90 days.',
        gradient: 'from-green-500/20 to-emerald-500/20',
        tags: ['90 Days of Content', 'Invisible Funnel'],
      },
      {
        number: '04',
        emoji: '⚙️',
        title: 'Hands-Off Executive Management',
        description: 'We take over all the execution. Creation, editing, publishing, and daily profile management. You approve the plan and we make it happen. Your profile sells 24/7 while you focus on serving clients.',
        gradient: 'from-purple-500/20 to-pink-500/20',
        tags: ['Full Management', 'Hands-Off'],
      },
      {
        number: '05',
        emoji: '📊',
        title: 'Continuous Data-Driven Optimization',
        description: 'We analyze the metrics that actually matter. We adjust strategy based on real performance. Your ROI grows month after month as we fine-tune the sales machine with surgical precision.',
        gradient: 'from-button-primary/20 to-accent-gold/20',
        tags: ['Growing ROI', 'Continuous Optimization'],
      },
    ],
  },
  es: {
    badge: '⚡ Metodología Comprobada',
    title: { prefix: 'Cómo Funciona ', highlight: 'Gestão Extrema' },
    subtitle: '5 pasos estratégicos que convierten tu perfil invisible en una máquina de ventas.',
    steps: [
      {
        number: '01',
        emoji: '🔍',
        title: 'Diagnóstico de la Atrofia Digital',
        description: 'Mapeamos cada punto donde tu perfil está perdiendo dinero. Identificamos los vacíos de narrativa que convierten visitantes en personas que se van. Recibes un informe completo mostrando exactamente dónde se escapan las oportunidades.',
        gradient: 'from-red-500/20 to-orange-500/20',
        tags: ['Diagnóstico Profundo', 'Análisis Completo'],
      },
      {
        number: '02',
        emoji: '🧩',
        title: 'Arquitectura de Identidad Magnética',
        description: 'Reconstruimos tu presencia desde cero. Bio estratégica, destacados organizados y una línea editorial coherente que te posiciona como la única opción lógica. Tu perfil empieza a atraer clientas ideales y a alejar a curiosos que nunca compran.',
        gradient: 'from-blue-500/20 to-purple-500/20',
        tags: ['Bio Estratégica', 'Diseño Premium'],
      },
      {
        number: '03',
        emoji: '🗺️',
        title: 'Sistema de Narrativas de Venta',
        description: 'Creamos la planificación completa de contenido basada en un embudo invisible. Cada publicación funciona como un capítulo estratégico que acumula deseo de compra. Guiones listos, formatos definidos, cronograma claro para los próximos 90 días.',
        gradient: 'from-green-500/20 to-emerald-500/20',
        tags: ['90 Días de Contenido', 'Embudo Invisible'],
      },
      {
        number: '04',
        emoji: '⚙️',
        title: 'Gestión Ejecutiva Hands-Off',
        description: 'Asumimos toda la ejecución. Creación, edición, publicación y gestión diaria del perfil. Tú apruebas el plan y nosotros lo hacemos realidad. Tu perfil vende 24 horas mientras tú te enfocas en atender clientas.',
        gradient: 'from-purple-500/20 to-pink-500/20',
        tags: ['Gestión Total', 'Hands-Off'],
      },
      {
        number: '05',
        emoji: '📊',
        title: 'Optimización Continua por Datos',
        description: 'Analizamos las métricas que realmente importan. Ajustamos la estrategia según el rendimiento real. Tu ROI crece mes a mes mientras afinamos la máquina de ventas con precisión quirúrgica.',
        gradient: 'from-button-primary/20 to-accent-gold/20',
        tags: ['ROI Creciente', 'Optimización Continua'],
      },
    ],
  },
}
