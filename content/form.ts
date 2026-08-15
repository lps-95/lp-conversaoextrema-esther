import type { Language } from '../contexts/LanguageContext'

/**
 * Conteúdo do formulário de agendamento de sessão, em PT/EN/ES.
 *
 * DECISÃO DE DESIGN sobre o `buildWhatsAppMessage`: a mensagem que cai no
 * WhatsApp é lida pela Esther (que fala português), não pelo visitante —
 * então ela é montada SEMPRE em português, usando os rótulos em `pt`,
 * mesmo que a pessoa esteja vendo o site em inglês/espanhol no momento do
 * cadastro. Só o que a pessoa digitou livremente (nome, e-mail, WhatsApp,
 * nicho) aparece exatamente como foi escrito.
 *
 * Os `value` de cada opção (ex: 'menos-1k') são os mesmos nos três
 * idiomas de propósito — só o `label` (o que aparece no select) muda. É
 * isso que permite fazer esse "sempre em português na mensagem final"
 * sem confusão.
 */

interface FormOption {
  value: string
  label: string
}

interface FormContent {
  sectionBadge: string
  title: string
  subtitle: string
  submitLabel: string
  submitLoadingLabel: string
  submitSuccessLabel: string
  successMessage: string
  privacyNote: string
  selectPlaceholder: string
  fields: {
    name: { label: string; placeholder: string }
    email: { label: string; placeholder: string }
    whatsapp: { label: string; placeholder: string }
    niche: { label: string; placeholder: string }
    followers: { label: string }
    revenue: { label: string }
    mainGoal: { label: string }
    bestTime: { label: string }
  }
  validationMessages: {
    missingName: string
    missingEmail: string
    missingWhatsapp: string
    invalidWhatsapp: string
    genericSubmitError: string
  }
  followersOptions: FormOption[]
  revenueOptions: FormOption[]
  mainGoalOptions: FormOption[]
  bestTimeOptions: FormOption[]
}

const contentByLanguage: Record<Language, FormContent> = {
  pt: {
    sectionBadge: 'Solicite sua sessão',
    title: 'Comece Sua Transformação',
    subtitle: 'Receba um diagnóstico personalizado do seu perfil em até 24 horas',
    submitLabel: 'Solicitar Sessão Estratégica',
    submitLoadingLabel: 'Processando...',
    submitSuccessLabel: 'Sucesso!',
    successMessage: '✅ Abrindo WhatsApp...',
    privacyNote: '🔒 Seus dados estão protegidos e não serão compartilhados',
    selectPlaceholder: 'Selecione...',
    fields: {
      name: { label: 'Nome Completo *', placeholder: 'Maria Silva' },
      email: { label: 'Email *', placeholder: 'maria@exemplo.com' },
      whatsapp: { label: 'WhatsApp *', placeholder: '(11) 99999-9999' },
      niche: { label: 'Nicho/Área *', placeholder: 'Ex: Psicóloga, Coach...' },
      followers: { label: 'Seguidores *' },
      revenue: { label: 'Faturamento Mensal *' },
      mainGoal: { label: 'Seu Principal Objetivo *' },
      bestTime: { label: 'Melhor Horário para Contato *' },
    },
    validationMessages: {
      missingName: 'Por favor, preencha seu nome',
      missingEmail: 'Por favor, preencha seu e-mail',
      missingWhatsapp: 'Por favor, preencha seu WhatsApp',
      invalidWhatsapp: 'WhatsApp inválido. Use o formato: (48) 99196-4517',
      genericSubmitError: 'Erro ao enviar cadastro',
    },
    followersOptions: [
      { value: 'menos-1k', label: 'Menos de 1.000' },
      { value: '1k-5k', label: '1.000 a 5.000' },
      { value: '5k-10k', label: '5.000 a 10.000' },
      { value: '10k-50k', label: '10.000 a 50.000' },
      { value: 'mais-50k', label: 'Mais de 50.000' },
    ],
    revenueOptions: [
      { value: '0-5k', label: 'Até R$ 5.000' },
      { value: '5k-10k', label: 'R$ 5.000 a R$ 10.000' },
      { value: '10k-20k', label: 'R$ 10.000 a R$ 20.000' },
      { value: '20k-50k', label: 'R$ 20.000 a R$ 50.000' },
      { value: 'mais-50k', label: 'Acima de R$ 50.000' },
    ],
    mainGoalOptions: [
      { value: 'primeiros-clientes', label: 'Conseguir primeiros clientes pelo Instagram' },
      { value: 'aumentar-vendas', label: 'Aumentar volume de vendas/consultações' },
      { value: 'escalar-negocio', label: 'Escalar para 6 ou 7 dígitos' },
      { value: 'autoridade', label: 'Me tornar autoridade no meu nicho' },
      { value: 'recuperar-tempo', label: 'Vender mais gastando menos tempo' },
    ],
    bestTimeOptions: [
      { label: 'Manhã (8h - 12h)', value: 'Manhã' },
      { label: 'Tarde (12h - 18h)', value: 'Tarde' },
      { label: 'Noite (18h - 21h)', value: 'Noite' },
      { label: 'Horário flexível', value: 'Flexível' },
    ],
  },
  en: {
    sectionBadge: 'Request your session',
    title: 'Start Your Transformation',
    subtitle: 'Get a personalized diagnosis of your profile within 24 hours',
    submitLabel: 'Request Strategy Session',
    submitLoadingLabel: 'Processing...',
    submitSuccessLabel: 'Success!',
    successMessage: '✅ Opening WhatsApp...',
    privacyNote: '🔒 Your data is protected and will not be shared',
    selectPlaceholder: 'Select...',
    fields: {
      name: { label: 'Full Name *', placeholder: 'Jane Smith' },
      email: { label: 'Email *', placeholder: 'jane@example.com' },
      whatsapp: { label: 'WhatsApp *', placeholder: '+1 555 123 4567' },
      niche: { label: 'Niche/Field *', placeholder: 'e.g. Coach, Therapist...' },
      followers: { label: 'Followers *' },
      revenue: { label: 'Monthly Revenue *' },
      mainGoal: { label: 'Your Main Goal *' },
      bestTime: { label: 'Best Time To Contact You *' },
    },
    validationMessages: {
      missingName: 'Please enter your name',
      missingEmail: 'Please enter your email',
      missingWhatsapp: 'Please enter your WhatsApp number',
      invalidWhatsapp: 'Invalid WhatsApp number. Use the format: +1 555 123 4567',
      genericSubmitError: 'Error submitting your request',
    },
    followersOptions: [
      { value: 'menos-1k', label: 'Under 1,000' },
      { value: '1k-5k', label: '1,000 to 5,000' },
      { value: '5k-10k', label: '5,000 to 10,000' },
      { value: '10k-50k', label: '10,000 to 50,000' },
      { value: 'mais-50k', label: 'Over 50,000' },
    ],
    revenueOptions: [
      { value: '0-5k', label: 'Under $1,000/mo' },
      { value: '5k-10k', label: '$1,000 to $2,000/mo' },
      { value: '10k-20k', label: '$2,000 to $4,000/mo' },
      { value: '20k-50k', label: '$4,000 to $10,000/mo' },
      { value: 'mais-50k', label: 'Over $10,000/mo' },
    ],
    mainGoalOptions: [
      { value: 'primeiros-clientes', label: 'Get my first clients through Instagram' },
      { value: 'aumentar-vendas', label: 'Increase sales/consultation volume' },
      { value: 'escalar-negocio', label: 'Scale to six or seven figures' },
      { value: 'autoridade', label: 'Become an authority in my niche' },
      { value: 'recuperar-tempo', label: 'Sell more while spending less time' },
    ],
    bestTimeOptions: [
      { label: 'Morning (8am - 12pm)', value: 'Manhã' },
      { label: 'Afternoon (12pm - 6pm)', value: 'Tarde' },
      { label: 'Evening (6pm - 9pm)', value: 'Noite' },
      { label: 'Flexible', value: 'Flexível' },
    ],
  },
  es: {
    sectionBadge: 'Solicita tu sesión',
    title: 'Comienza Tu Transformación',
    subtitle: 'Recibe un diagnóstico personalizado de tu perfil en menos de 24 horas',
    submitLabel: 'Solicitar Sesión Estratégica',
    submitLoadingLabel: 'Procesando...',
    submitSuccessLabel: '¡Listo!',
    successMessage: '✅ Abriendo WhatsApp...',
    privacyNote: '🔒 Tus datos están protegidos y no serán compartidos',
    selectPlaceholder: 'Selecciona...',
    fields: {
      name: { label: 'Nombre Completo *', placeholder: 'María García' },
      email: { label: 'Correo Electrónico *', placeholder: 'maria@ejemplo.com' },
      whatsapp: { label: 'WhatsApp *', placeholder: '+52 55 1234 5678' },
      niche: { label: 'Nicho/Área *', placeholder: 'Ej: Psicóloga, Coach...' },
      followers: { label: 'Seguidores *' },
      revenue: { label: 'Facturación Mensual *' },
      mainGoal: { label: 'Tu Principal Objetivo *' },
      bestTime: { label: 'Mejor Horario Para Contactarte *' },
    },
    validationMessages: {
      missingName: 'Por favor, ingresa tu nombre',
      missingEmail: 'Por favor, ingresa tu correo electrónico',
      missingWhatsapp: 'Por favor, ingresa tu WhatsApp',
      invalidWhatsapp: 'WhatsApp inválido. Usa el formato: +52 55 1234 5678',
      genericSubmitError: 'Error al enviar el formulario',
    },
    followersOptions: [
      { value: 'menos-1k', label: 'Menos de 1.000' },
      { value: '1k-5k', label: '1.000 a 5.000' },
      { value: '5k-10k', label: '5.000 a 10.000' },
      { value: '10k-50k', label: '10.000 a 50.000' },
      { value: 'mais-50k', label: 'Más de 50.000' },
    ],
    revenueOptions: [
      { value: '0-5k', label: 'Hasta $1.000/mes' },
      { value: '5k-10k', label: '$1.000 a $2.000/mes' },
      { value: '10k-20k', label: '$2.000 a $4.000/mes' },
      { value: '20k-50k', label: '$4.000 a $10.000/mes' },
      { value: 'mais-50k', label: 'Más de $10.000/mes' },
    ],
    mainGoalOptions: [
      { value: 'primeiros-clientes', label: 'Conseguir mis primeros clientes por Instagram' },
      { value: 'aumentar-vendas', label: 'Aumentar el volumen de ventas/consultas' },
      { value: 'escalar-negocio', label: 'Escalar a seis o siete cifras' },
      { value: 'autoridade', label: 'Convertirme en autoridad en mi nicho' },
      { value: 'recuperar-tempo', label: 'Vender más invirtiendo menos tiempo' },
    ],
    bestTimeOptions: [
      { label: 'Mañana (8h - 12h)', value: 'Manhã' },
      { label: 'Tarde (12h - 18h)', value: 'Tarde' },
      { label: 'Noche (18h - 21h)', value: 'Noite' },
      { label: 'Horario flexible', value: 'Flexível' },
    ],
  },
}

export const formContent = {
  ...contentByLanguage,

  /** Mapa entre o id do botão de plano (na seção Pricing) e o nome do plano exibido/enviado */
  planByButtonId: {
    pricing_essential: 'Essencial',
    pricing_professional: 'Profissional',
    pricing_premium: 'Premium',
  } as const,

  /** Número padrão de WhatsApp usado se a env var não estiver configurada */
  defaultWhatsappNumber: '+5548991964517',

  /**
   * Monta a mensagem enviada pro WhatsApp a partir dos campos que o
   * cliente realmente preencheu — sempre em português (ver nota no topo
   * do arquivo). Campos vazios são simplesmente omitidos.
   */
  buildWhatsAppMessage: (data: {
    name?: string
    email?: string
    whatsapp?: string
    niche?: string
    followers?: string
    revenue?: string
    mainGoal?: string
    plan?: string
    bestTime?: string
  }) => {
    const pt = contentByLanguage.pt
    const followersLabel = pt.followersOptions.find((o) => o.value === data.followers)?.label
    const revenueLabel = pt.revenueOptions.find((o) => o.value === data.revenue)?.label
    const mainGoalLabel = pt.mainGoalOptions.find((o) => o.value === data.mainGoal)?.label

    const lines: Array<[string, string | undefined]> = [
      ['Nome', data.name],
      ['E-mail', data.email],
      ['WhatsApp', data.whatsapp],
      ['Nicho/Área', data.niche],
      ['Seguidores', followersLabel],
      ['Faturamento mensal', revenueLabel],
      ['Principal objetivo', mainGoalLabel],
      ['Plano de interesse', data.plan],
      ['Melhor horário para contato', data.bestTime],
    ]

    const filledLines = lines
      .filter(([, value]) => Boolean(value && value.trim()))
      .map(([label, value]) => `${label}: ${value}`)

    return [
      'Olá, equipe Esther Social Media! Quero avançar com o pacote.',
      ...filledLines,
      'Podem me enviar os próximos passos?',
    ].join('\n')
  },
}
