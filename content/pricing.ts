import type { Language } from '../contexts/LanguageContext'

interface PlanFeature {
  text: string
  bold?: boolean
}

interface PricingContent {
  badge: string
  title: string
  subtitle: string
  urgency: { prefix: string; rest: string }
  essential: {
    tag: string
    title: string
    price: string
    period: string
    description: string
    features: string[]
    cta: string
  }
  professional: {
    ribbon: string
    tag: string
    title: string
    price: string
    period: string
    description: string
    features: PlanFeature[]
    cta: string
  }
  premium: {
    tag: string
    title: string
    priceLabel: string
    description: string
    features: PlanFeature[]
    cta: string
  }
}

export const pricingContent: Record<Language, PricingContent> = {
  pt: {
    badge: '💎 Planos e Investimento',
    title: 'Escolha Seu Plano',
    subtitle: 'Transforme seu perfil invisível com estratégia',
    urgency: { prefix: '⚡ ATENÇÃO:', rest: 'Apenas 8 vagas/mês • Lista de espera: 45 dias' },
    essential: {
      tag: 'Consultoria Extrema',
      title: 'Saia da Invisibilidade',
      price: 'R$ 500,00',
      period: '/mês',
      description: 'Um direcionamento completo do seu Instagram pra te DESTRAVAR de vez',
      features: [
        'Reunião de 4hrs com intervalo de 1h',
        '20 dias de postagens para o seu feed',
        'Direcionamento em posicionamento e estética',
        'Introdução ao stories e como começar a ser estratégica',
        'PDF da apresentação em mãos para lembrar e rever quando quiser',
        'Exercício de direcionamento e criação de persona para memorização',
      ],
      cta: 'Escolher Plano',
    },
    professional: {
      ribbon: '⭐ Mais Escolhido',
      tag: 'Plano Profissional',
      title: 'Sistema Completo',
      price: 'R$ 2.400',
      period: '/mês',
      description: 'Previsibilidade financeira com 90 dias.',
      features: [
        { text: 'Tudo da consultoria extrema', bold: true },
        { text: 'Sistema de Narrativas 90 dias' },
        { text: 'Calendário editorial completo' },
        { text: 'Banco de roteiros anti-bloqueio' },
        { text: '2 campanhas de lançamento' },
        { text: 'Stories persuasivos' },
        { text: 'Reunião estratégica mensal' },
        { text: 'Bônus exclusivos' },
      ],
      cta: 'Escolher Plano',
    },
    premium: {
      tag: 'Escolha do seu jeito',
      title: 'Escolha você mesmo o que deseja',
      priceLabel: 'Sob Consulta',
      description: 'Feito sob medida pensando em você',
      features: [
        { text: 'Pacotes de videos mobile para Reels e Stories' },
        { text: 'Pacotes fotos profissionais em estúdios ou no seu local' },
      ],
      cta: 'Escolher Plano',
    },
  },
  en: {
    badge: '💎 Plans & Investment',
    title: 'Choose Your Plan',
    subtitle: 'Transform your invisible profile with strategy',
    urgency: { prefix: '⚡ HEADS UP:', rest: 'Only 8 spots/month • Waitlist: 45 days' },
    essential: {
      tag: 'Extreme Consulting',
      title: 'Break Free From Invisibility',
      price: 'R$ 500.00',
      period: '/mo',
      description: 'A complete direction plan for your Instagram to UNBLOCK you for good',
      features: [
        '4hr session with a 1hr break',
        '20 days of posts for your feed',
        'Guidance on positioning and aesthetics',
        'Intro to Stories and how to start being strategic',
        'PDF of the presentation to keep and revisit anytime',
        'Direction exercise and persona creation to help it stick',
      ],
      cta: 'Choose Plan',
    },
    professional: {
      ribbon: '⭐ Most Popular',
      tag: 'Professional Plan',
      title: 'Complete System',
      price: 'R$ 2,400',
      period: '/mo',
      description: 'Financial predictability within 90 days.',
      features: [
        { text: 'Everything in Extreme Consulting', bold: true },
        { text: '90-Day Narrative System' },
        { text: 'Complete editorial calendar' },
        { text: 'Anti-writer\'s-block script bank' },
        { text: '2 launch campaigns' },
        { text: 'Persuasive Stories' },
        { text: 'Monthly strategy meeting' },
        { text: 'Exclusive bonuses' },
      ],
      cta: 'Choose Plan',
    },
    premium: {
      tag: 'Build your own',
      title: 'Choose exactly what you need',
      priceLabel: 'Custom Pricing',
      description: 'Custom-built with you in mind',
      features: [
        { text: 'Mobile video packages for Reels and Stories' },
        { text: 'Professional photo packages, in-studio or on location' },
      ],
      cta: 'Choose Plan',
    },
  },
  es: {
    badge: '💎 Planes e Inversión',
    title: 'Elige Tu Plan',
    subtitle: 'Transforma tu perfil invisible con estrategia',
    urgency: { prefix: '⚡ ATENCIÓN:', rest: 'Solo 8 cupos/mes • Lista de espera: 45 días' },
    essential: {
      tag: 'Consultoría Extrema',
      title: 'Sal de la Invisibilidad',
      price: 'R$ 500,00',
      period: '/mes',
      description: 'Una guía completa de tu Instagram para DESBLOQUEARTE de una vez',
      features: [
        'Reunión de 4hrs con descanso de 1h',
        '20 días de publicaciones para tu feed',
        'Guía de posicionamiento y estética',
        'Introducción a las historias y cómo empezar a ser estratégica',
        'PDF de la presentación para guardar y repasar cuando quieras',
        'Ejercicio de dirección y creación de persona para memorizar',
      ],
      cta: 'Elegir Plan',
    },
    professional: {
      ribbon: '⭐ Más Elegido',
      tag: 'Plan Profesional',
      title: 'Sistema Completo',
      price: 'R$ 2.400',
      period: '/mes',
      description: 'Previsibilidad financiera en 90 días.',
      features: [
        { text: 'Todo lo de la consultoría extrema', bold: true },
        { text: 'Sistema de Narrativas de 90 días' },
        { text: 'Calendario editorial completo' },
        { text: 'Banco de guiones anti-bloqueo' },
        { text: '2 campañas de lanzamiento' },
        { text: 'Historias persuasivas' },
        { text: 'Reunión estratégica mensual' },
        { text: 'Bonos exclusivos' },
      ],
      cta: 'Elegir Plan',
    },
    premium: {
      tag: 'Elige a tu manera',
      title: 'Elige tú misma lo que necesitas',
      priceLabel: 'Bajo Consulta',
      description: 'Hecho a la medida pensando en ti',
      features: [
        { text: 'Paquetes de videos móviles para Reels e Historias' },
        { text: 'Paquetes de fotos profesionales en estudio o en tu ubicación' },
      ],
      cta: 'Elegir Plan',
    },
  },
}
