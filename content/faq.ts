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
        answer: 'Primeira venda orgânica em 90 dias (mas depende totalmente do seu desempenho e foco). Aqui está o que sabemos: movimento real no direct (mensagens qualificadas) começa em 3-4 semanas. A primeira venda acontece quando você executa a estratégia com consistência. Exemplo real: Amanda (esteticista) seguiu tudo à risca e fechou seu primeiro contrato na semana 9. Já Priscila (biomédica) demorou 14 semanas porque faltou com a aprovação de posts algumas semanas. A timeline varia, mas com foco e disciplina, 90 dias é realista.',
        color: 'from-green-500/20 to-emerald-500/20',
        icon: '⏱️',
      },
      {
        number: '02',
        question: 'Preciso fazer vídeos, dancinhas ou aparecer muito?',
        answer: 'Não. Você NÃO precisa de vídeos dançando, fazendo trends ou aparecendo de forma exagerada. Precisamos de você em conteúdo estratégico, mas sem a exposição desnecessária. 60% das nossas clientes nunca fazem vídeos dinâmicos - trabalham com carrosséis, reels educativos, stories estratégicos e posts de texto. Jessica (personal trainer) gera 12+ clientes mensais com reels mostrando exercícios educativos (sem danças). Patricia (cabelereira) não aparece em vídeo, só posta antes/depois dos trabalhos. Roberta (dona de ótica) compartilha dicas de cuidado com os olhos em texto. Você vende com inteligência, não com exposição exagerada.',
        color: 'from-blue-500/20 to-purple-500/20',
        icon: '🎬',
      },
      {
        number: '03',
        question: 'E se meu perfil perder a minha autenticidade?',
        answer: 'Esse medo é legítimo e nós levamos a sério. Dedicamos as primeiras 2 semanas estudando sua voz, valores, jeitos de falar, posicionamento único, ANTES de criar um único post. Você aprova tudo que sai no ar e tem controle total. Cleiciane (Psicóloga) tinha esse medo: "Meu perfil é muito pessoal". Hoje ela diz que o perfil está "ainda mais ela". Vanessa (biomédica) pensava que seria corporativo demais. Resultado: clientes dizem que ela passou a ser mais próxima e real. Autenticidade + Estratégia = Vendas reais.',
        color: 'from-purple-500/20 to-pink-500/20',
        icon: '🎯',
      },
      {
        number: '04',
        question: 'Já investi em gestão e não funcionou. Por que seria diferente?',
        answer: 'A maioria das agências entrega posts bonitos sem foco em vendas. Nós somos diferentes: somos estrategistas de conversão, não criadores de conteúdo. Mostramos o funil completo na primeira reunião e você vê como cada post conecta à jornada de compra. Acompanhamos métricas que importam: consultas geradas, vendas fechadas, não curtidas ou likes vazios. Exemplo: Carla (dona de ótica) gastou R$ 12k com agência que entregou zero vendas. Conosco fechou 2 clientes de R$ 8k cada em 8 semanas. A diferença é estratégia + execução focada em resultado.',
        color: 'from-button-primary/20 to-accent-gold/20',
        icon: '💰',
      },
      {
        number: '05',
        question: 'Não tenho tempo para muitas reuniões e aprovações',
        answer: 'Tranquilo. Primeira reunião é imersão profunda (2-3 horas, acontece uma vez). Depois disso, você precisa de apenas 40 minutos mensais para aprovar o planejamento do mês. Todo o resto (criação, edição, agendamento, posting, gestão) é executado por nós. Natália (personal trainer) tem agenda lotada de clientes e consegue participar de uma reunião rápida por mês. Gabriela (cabelereira) aprova posts enquanto come. O sistema roda sozinho depois que você aprova a estratégia.',
        color: 'from-cyan-500/20 to-blue-500/20',
        icon: '⚙️',
      },
      {
        number: '06',
        question: 'Qual garantia vocês dão? E se não der certo?',
        answer: 'Garantia Dupla: Se após 90 dias seguindo a estratégia seu perfil não apresentar aumento mensurável em consultas qualificadas e oportunidades de venda, continuamos trabalhando SEM CUSTO ADICIONAL por mais 30 dias até atingir a meta. Sua satisfação é nossa prioridade, no mercado há muita promessa vazia. Nós fazemos o oposto: resultados provados.',
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
        answer: "First organic sale within 90 days (though it fully depends on your effort and focus). Here's what we know: real movement in your DMs (qualified messages) starts within 3-4 weeks. The first sale happens once you execute the strategy consistently. Real example: Amanda (esthetician) followed everything closely and closed her first contract in week 9. Priscila (biomedical scientist) took 14 weeks because she missed post approvals a few weeks in a row. The timeline varies, but with focus and discipline, 90 days is realistic.",
        color: 'from-green-500/20 to-emerald-500/20',
        icon: '⏱️',
      },
      {
        number: '02',
        question: 'Do I need to make videos, dance trends, or show my face a lot?',
        answer: "No. You do NOT need dancing videos, trends, or excessive on-camera exposure. We need you present in strategic content, but without unnecessary exposure. 60% of our clients never make dynamic videos - they work with carousels, educational reels, strategic stories, and text posts. Jessica (personal trainer) gets 12+ clients a month with reels showing educational exercises (no dancing). Patricia (hairstylist) never appears on camera, only posts before/after work. Roberta (optical shop owner) shares eye-care tips in text. You sell with intelligence, not with excessive exposure.",
        color: 'from-blue-500/20 to-purple-500/20',
        icon: '🎬',
      },
      {
        number: '03',
        question: 'What if my profile loses my authenticity?',
        answer: 'That fear is legitimate and we take it seriously. We spend the first 2 weeks studying your voice, values, way of speaking, and unique positioning, BEFORE creating a single post. You approve everything that goes live and keep full control. Cleiciane (Psychologist) had that fear: "My profile is very personal." Today she says her profile feels "even more like her." Vanessa (biomedical scientist) thought it would become too corporate. Result: clients say she became more approachable and real. Authenticity + Strategy = Real sales.',
        color: 'from-purple-500/20 to-pink-500/20',
        icon: '🎯',
      },
      {
        number: '04',
        question: "I've already invested in management before and it didn't work. Why would this be different?",
        answer: 'Most agencies deliver pretty posts with no focus on sales. We are different: we are conversion strategists, not content creators. We show you the complete funnel in the first meeting, and you see how every post connects to the buying journey. We track metrics that matter: consultations generated, sales closed, not empty likes. Example: Carla (optical shop owner) spent R$ 12k with an agency that delivered zero sales. With us, she closed 2 clients worth R$ 8k each in 8 weeks. The difference is strategy + execution focused on results.',
        color: 'from-button-primary/20 to-accent-gold/20',
        icon: '💰',
      },
      {
        number: '05',
        question: "I don't have time for a lot of meetings and approvals",
        answer: "No worries. The first meeting is a deep-dive session (2-3 hours, happens once). After that, you only need 40 minutes a month to approve the plan for the month. Everything else (creation, editing, scheduling, posting, management) is handled by us. Natália (personal trainer) has a packed client schedule and still manages one quick meeting a month. Gabriela (hairstylist) approves posts while eating lunch. The system runs itself once you approve the strategy.",
        color: 'from-cyan-500/20 to-blue-500/20',
        icon: '⚙️',
      },
      {
        number: '06',
        question: 'What guarantee do you offer? What if it doesn\'t work?',
        answer: "Double Guarantee: if after 90 days of following the strategy your profile doesn't show a measurable increase in qualified consultations and sales opportunities, we keep working at NO ADDITIONAL COST for 30 more days until we hit the goal. Your satisfaction is our priority — there are a lot of empty promises out there. We do the opposite: proven results.",
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
        answer: 'Primera venta orgánica en 90 días (aunque depende totalmente de tu desempeño y enfoque). Esto es lo que sabemos: el movimiento real en los mensajes directos (mensajes calificados) empieza en 3-4 semanas. La primera venta ocurre cuando ejecutas la estrategia con constancia. Ejemplo real: Amanda (esteticista) siguió todo al pie de la letra y cerró su primer contrato en la semana 9. Priscila (bioméloga) tardó 14 semanas porque le faltó aprobar publicaciones algunas semanas. El tiempo varía, pero con enfoque y disciplina, 90 días es realista.',
        color: 'from-green-500/20 to-emerald-500/20',
        icon: '⏱️',
      },
      {
        number: '02',
        question: '¿Necesito hacer videos, bailes o mostrarme mucho?',
        answer: 'No. NO necesitas videos bailando, tendencias ni una exposición exagerada. Necesitamos que estés presente en contenido estratégico, pero sin exposición innecesaria. El 60% de nuestras clientas nunca hace videos dinámicos: trabajan con carruseles, reels educativos, historias estratégicas y publicaciones de texto. Jessica (entrenadora personal) genera más de 12 clientas mensuales con reels de ejercicios educativos (sin bailes). Patricia (estilista) no aparece en video, solo publica antes/después de sus trabajos. Roberta (dueña de óptica) comparte consejos de cuidado ocular en texto. Vendes con inteligencia, no con exposición exagerada.',
        color: 'from-blue-500/20 to-purple-500/20',
        icon: '🎬',
      },
      {
        number: '03',
        question: '¿Y si mi perfil pierde mi autenticidad?',
        answer: 'Ese miedo es legítimo y lo tomamos en serio. Dedicamos las primeras 2 semanas a estudiar tu voz, valores, forma de hablar y posicionamiento único, ANTES de crear una sola publicación. Tú apruebas todo lo que se publica y tienes control total. Cleiciane (Psicóloga) tenía ese miedo: "Mi perfil es muy personal". Hoy dice que su perfil está "aún más ella". Vanessa (bioméloga) pensaba que sería demasiado corporativo. Resultado: sus clientas dicen que se volvió más cercana y real. Autenticidad + Estrategia = Ventas reales.',
        color: 'from-purple-500/20 to-pink-500/20',
        icon: '🎯',
      },
      {
        number: '04',
        question: 'Ya invertí en gestión antes y no funcionó. ¿Por qué sería diferente?',
        answer: 'La mayoría de las agencias entregan publicaciones bonitas sin enfoque en ventas. Nosotros somos diferentes: somos estrategas de conversión, no creadores de contenido. Te mostramos el embudo completo en la primera reunión y ves cómo cada publicación se conecta con el recorrido de compra. Seguimos métricas que importan: consultas generadas, ventas cerradas, no me gusta vacíos. Ejemplo: Carla (dueña de óptica) gastó R$ 12k en una agencia que no entregó ninguna venta. Con nosotros cerró 2 clientas de R$ 8k cada una en 8 semanas. La diferencia es estrategia + ejecución enfocada en resultados.',
        color: 'from-button-primary/20 to-accent-gold/20',
        icon: '💰',
      },
      {
        number: '05',
        question: 'No tengo tiempo para muchas reuniones y aprobaciones',
        answer: 'Tranquila. La primera reunión es una inmersión profunda (2-3 horas, ocurre una sola vez). Después de eso, solo necesitas 40 minutos al mes para aprobar la planificación del mes. Todo lo demás (creación, edición, programación, publicación, gestión) lo ejecutamos nosotros. Natália (entrenadora personal) tiene la agenda llena de clientas y aun así logra participar en una reunión rápida al mes. Gabriela (estilista) aprueba publicaciones mientras come. El sistema funciona solo después de que apruebas la estrategia.',
        color: 'from-cyan-500/20 to-blue-500/20',
        icon: '⚙️',
      },
      {
        number: '06',
        question: '¿Qué garantía ofrecen? ¿Y si no funciona?',
        answer: 'Garantía Doble: si después de 90 días siguiendo la estrategia tu perfil no muestra un aumento medible en consultas calificadas y oportunidades de venta, seguimos trabajando SIN COSTO ADICIONAL por 30 días más hasta alcanzar la meta. Tu satisfacción es nuestra prioridad, en el mercado hay muchas promesas vacías. Nosotros hacemos lo contrario: resultados comprobados.',
        color: 'from-orange-500/20 to-red-500/20',
        icon: '✅',
      },
    ],
  },
}
