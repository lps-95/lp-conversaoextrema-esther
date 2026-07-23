/**
 * Conteúdo do formulário de captura de lead: labels, opções dos selects,
 * mensagens de validação e o template da mensagem enviada pro WhatsApp.
 *
 * Para reaproveitar este formulário em outra landing page, troque só os
 * valores abaixo — a lógica fica em `hooks/useLeadForm.ts` e o layout em
 * `components/form/LeadForm.tsx`.
 */

export const formContent = {
  sectionBadge: 'Solicite sua sessão',
  title: 'Comece Sua Transformação',
  subtitle: 'Receba um diagnóstico personalizado do seu perfil em até 24 horas',

  submitLabel: 'Solicitar Sessão Estratégica',
  submitLoadingLabel: 'Processando...',
  submitSuccessLabel: 'Sucesso!',
  successMessage: '✅ Abrindo WhatsApp...',
  privacyNote: '🔒 Seus dados estão protegidos e não serão compartilhados',

  validationMessages: {
    missingName: 'Por favor, preencha seu nome',
    missingEmail: 'Por favor, preencha seu e-mail',
    missingWhatsapp: 'Por favor, preencha seu WhatsApp',
    invalidWhatsapp: 'WhatsApp inválido. Use o formato: (48) 99196-4517',
    genericSubmitError: 'Erro ao enviar cadastro',
  },

  /** Opções do select "Seguidores" */
  followersOptions: [
    { value: 'menos-1k', label: 'Menos de 1.000' },
    { value: '1k-5k', label: '1.000 a 5.000' },
    { value: '5k-10k', label: '5.000 a 10.000' },
    { value: '10k-50k', label: '10.000 a 50.000' },
    { value: 'mais-50k', label: 'Mais de 50.000' },
  ],

  /** Opções do select "Faturamento Mensal" */
  revenueOptions: [
    { value: '0-5k', label: 'Até R$ 5.000' },
    { value: '5k-10k', label: 'R$ 5.000 a R$ 10.000' },
    { value: '10k-20k', label: 'R$ 10.000 a R$ 20.000' },
    { value: '20k-50k', label: 'R$ 20.000 a R$ 50.000' },
    { value: 'mais-50k', label: 'Acima de R$ 50.000' },
  ],

  /** Opções do select "Principal Objetivo" */
  mainGoalOptions: [
    { value: 'primeiros-clientes', label: 'Conseguir primeiros clientes pelo Instagram' },
    { value: 'aumentar-vendas', label: 'Aumentar volume de vendas/consultações' },
    { value: 'escalar-negocio', label: 'Escalar para 6 ou 7 dígitos' },
    { value: 'autoridade', label: 'Me tornar autoridade no meu nicho' },
    { value: 'recuperar-tempo', label: 'Vender mais gastando menos tempo' },
  ],

  /** Opções do "Melhor Horário para Contato" (usa o componente CustomSelect) */
  bestTimeOptions: [
    { label: 'Manhã (8h - 12h)', value: 'Manhã' },
    { label: 'Tarde (12h - 18h)', value: 'Tarde' },
    { label: 'Noite (18h - 21h)', value: 'Noite' },
    { label: 'Horário flexível', value: 'Flexível' },
  ],

  /** Mapa entre o id do botão de plano (na seção Pricing) e o nome do plano exibido/enviado */
  planByButtonId: {
    pricing_essential: 'Essencial',
    pricing_professional: 'Profissional',
    pricing_premium: 'Premium',
  } as const,

  /** Número padrão de WhatsApp usado se a env var não estiver configurada */
  defaultWhatsappNumber: '+5548991964517',

  /** Monta a mensagem enviada pro WhatsApp após o envio do formulário */
  buildWhatsAppMessage: (data: {
    name: string
    email: string
    plan: string
    whatsapp: string
    bestTime: string
  }) => {
    const chosenPlan = data.plan || 'Definir após diagnóstico'
    return [
      'Olá, equipe Esther Social Media! Quero avançar com a mentoria.',
      `Plano: ${chosenPlan}`,
      `Nome: ${data.name || '—'}`,
      `E-mail: ${data.email || '—'}`,
      `WhatsApp: ${data.whatsapp || '—'}`,
      data.bestTime ? `Melhor horário: ${data.bestTime}` : null,
      'Podem me enviar os próximos passos?',
    ]
      .filter(Boolean)
      .join('\n')
  },
}
