import type { Language } from '../contexts/LanguageContext'

interface HistoriaContent {
  badge: string
  title: { prefix: string; highlight: string }
  intro: string
  body1: string
  storyLabel: string
  story: string
  insight: string
  body2: string
  diff1: { label: string; title: string; body: string }
  diff2: { label: string; title: string; body: string }
  commitmentLabel: string
  commitments: string[]
  result: string
  cta: string
}

export const historiaContent: Record<Language, HistoriaContent> = {
  pt: {
    badge: '🎯 Por Que Eu',
    title: { prefix: 'Por Que Esther Maia e Não ', highlight: 'Uma Outra Social Media?' },
    intro: 'Eu não sou mais uma social media que agenda posts bonitos.',
    body1:
      'Sou estrategista digital especializada em Arquitetura de Conversão para negócios de alto ticket. Existem milhares de agências que entregam conteúdo visualmente bonito. Mas a maioria delas desconhece completamente como estruturar um perfil como máquina de vendas.',
    storyLabel: 'Minha História:',
    story:
      'Passei 4 anos vendo empresárias competentes perderem contratos para concorrentes menos qualificados apenas porque o Instagram delas parecia amador. Tentei todas as fórmulas que o mercado ensina — postar mais, viralizar, seguir trends — e vi que nada funcionava porque o problema não era criatividade, era ausência de funil estratégico.',
    insight: 'Foi aí que entendi o padrão invisível.',
    body2:
      'Criei o Método Ressonância Direcional depois de estudar dezenas de perfis de autoridades e identificar exatamente o que separa quem vende de quem posta. Não é sorte. Não é viralização. É arquitetura estratégica que transforma cada post em um degrau de uma escada que leva do seguidor até a compra.',
    diff1: {
      label: 'Diferença 1',
      title: 'Não sou social media genérica',
      body: 'Trabalho exclusivamente com 10-12 clientes por vez, não 50+. Cada estratégia é construída do zero baseada no seu negócio específico, não em template genérico.',
    },
    diff2: {
      label: 'Diferença 2',
      title: 'Foco em vendas, não vaidade',
      body: 'Você acompanha métricas que importam (consultas geradas, vendas fechadas), não métricas de vaidade (curtidas, seguidores). Seu ROI é mensurável em dias.',
    },
    commitmentLabel: 'Meu compromisso com você:',
    commitments: [
      'Você não será só mais um número na carteira de clientes. Você terá minha atenção estratégica dedicada.',
      'Resposta em até 1 hora (não dias) para dúvidas e ajustes.',
      'Compromisso de entrega: se algum item do cronograma combinado não sair no prazo, ajustamos ou compensamos sem custo adicional.',
    ],
    result:
      'Resultado: Clientes que chegam aquecidas, perfis que vendem 24h, e você finalmente sendo reconhecida como A autoridade do seu nicho.',
    cta: 'Quero Trabalhar Com Você →',
  },
  en: {
    badge: '🎯 Why Me',
    title: { prefix: 'Why Esther Maia And Not ', highlight: 'Another Social Media Manager?' },
    intro: "I'm not just another social media manager scheduling pretty posts.",
    body1:
      'I am a digital strategist specialized in Conversion Architecture for high-ticket businesses. There are thousands of agencies delivering visually beautiful content. But most of them have no idea how to structure a profile as a sales machine.',
    storyLabel: 'My Story:',
    story:
      "I spent 4 years watching competent business owners lose clients to less qualified competitors just because their Instagram looked amateur. I tried every formula the market teaches — post more, go viral, follow trends — and saw that nothing worked because the problem wasn't creativity, it was the absence of a strategic funnel.",
    insight: "That's when I understood the invisible pattern.",
    body2:
      "I created the Directional Resonance Method after studying dozens of authority profiles and identifying exactly what separates those who sell from those who just post. It's not luck. It's not going viral. It's strategic architecture that turns every post into a step on a staircase leading from follower to purchase.",
    diff1: {
      label: 'Difference 1',
      title: "I'm not a generic social media manager",
      body: "I work exclusively with 10-12 clients at a time, not 50+. Every strategy is built from scratch based on your specific business, not a generic template.",
    },
    diff2: {
      label: 'Difference 2',
      title: 'Focus on sales, not vanity',
      body: "You track metrics that matter (consultations generated, sales closed), not vanity metrics (likes, followers). Your ROI is measurable in days.",
    },
    commitmentLabel: 'My commitment to you:',
    commitments: [
      "You won't be just another number in a client roster. You'll get my dedicated strategic attention.",
      'Response within 1 hour (not days) for questions and adjustments.',
      "Delivery commitment: if any item on the agreed schedule slips, we adjust or make it right at no extra cost.",
    ],
    result:
      "Result: clients who arrive warmed up, a profile that sells 24/7, and you finally being recognized as THE authority in your niche.",
    cta: 'I Want To Work With You →',
  },
  es: {
    badge: '🎯 Por Qué Yo',
    title: { prefix: 'Por Qué Esther Maia Y No ', highlight: 'Otra Social Media?' },
    intro: 'Ya no soy solo una social media que agenda publicaciones bonitas.',
    body1:
      'Soy estratega digital especializada en Arquitectura de Conversión para negocios de alto ticket. Existen miles de agencias que entregan contenido visualmente bonito. Pero la mayoría de ellas no tiene idea de cómo estructurar un perfil como máquina de ventas.',
    storyLabel: 'Mi Historia:',
    story:
      'Pasé 4 años viendo a empresarias competentes perder clientes ante competidoras menos calificadas solo porque su Instagram parecía amateur. Probé todas las fórmulas que enseña el mercado —publicar más, volverse viral, seguir tendencias— y vi que nada funcionaba porque el problema no era la creatividad, era la ausencia de un embudo estratégico.',
    insight: 'Fue ahí cuando entendí el patrón invisible.',
    body2:
      'Creé el Método Resonancia Direccional después de estudiar decenas de perfiles de autoridades e identificar exactamente qué separa a quien vende de quien solo publica. No es suerte. No es viralización. Es arquitectura estratégica que convierte cada publicación en un escalón que lleva del seguidor a la compra.',
    diff1: {
      label: 'Diferencia 1',
      title: 'No soy una social media genérica',
      body: 'Trabajo exclusivamente con 10-12 clientas a la vez, no con 50+. Cada estrategia se construye desde cero según tu negocio específico, no con una plantilla genérica.',
    },
    diff2: {
      label: 'Diferencia 2',
      title: 'Enfoque en ventas, no en vanidad',
      body: 'Sigues métricas que importan (consultas generadas, ventas cerradas), no métricas de vanidad (me gusta, seguidores). Tu ROI es medible en días.',
    },
    commitmentLabel: 'Mi compromiso contigo:',
    commitments: [
      'No serás solo un número más en la cartera de clientas. Tendrás mi atención estratégica dedicada.',
      'Respuesta en hasta 1 hora (no días) para dudas y ajustes.',
      'Compromiso de entrega: si algún punto del cronograma acordado no sale en el plazo, lo ajustamos o compensamos sin costo adicional.',
    ],
    result:
      'Resultado: clientas que llegan predispuestas, un perfil que vende 24 horas, y tú finalmente reconocida como LA autoridad de tu nicho.',
    cta: 'Quiero Trabajar Contigo →',
  },
}
