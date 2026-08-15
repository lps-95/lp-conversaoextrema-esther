/**
 * Conteúdo do formulário de captação de leads para newsletter/materiais.
 *
 * IMPORTANTE (LGPD): este formulário tem uma FINALIDADE diferente do
 * formulário de agendamento de sessão (`content/form.ts`). Por isso tem
 * seu próprio texto de consentimento, específico pra essa finalidade —
 * nunca reaproveite o consentimento de um formulário no outro.
 */
export const newsletterContent = {
  badge: 'Materiais gratuitos',
  title: 'Receba Conteúdo Exclusivo',
  subtitle: 'Cadastre-se para receber materiais, dicas e novidades sobre Instagram para negócios de serviço',

  namePlaceholder: 'Seu nome',
  emailPlaceholder: 'Seu melhor e-mail',
  submitLabel: 'Quero Receber',
  submitLoadingLabel: 'Enviando...',
  submitSuccessLabel: 'Cadastro confirmado!',

  successMessage: '✅ Prontinho! Fique de olho no seu e-mail.',
  errorMessage: 'Não foi possível concluir o cadastro. Tente novamente em instantes.',

  /**
   * Texto do checkbox de consentimento (LGPD, Art. 8º — precisa ser claro,
   * específico e não pode vir marcado por padrão).
   */
  consentLabel:
    'Aceito receber e-mails com materiais e novidades da Esther Social Media, e concordo com o tratamento dos meus dados conforme a',
  consentLinkLabel: 'Política de Privacidade',
  consentLinkHref: '/politica-de-privacidade',
  missingConsentError: 'Você precisa aceitar o uso dos seus dados para se cadastrar',

  /** Aparece pequeno, perto do formulário — reforça finalidade e direito de saída */
  disclaimer: 'Você pode cancelar sua inscrição a qualquer momento pelo link no rodapé dos e-mails.',
}

/**
 * Conteúdo do e-mail de confirmação enviado logo após o cadastro.
 * Separado do resto porque é usado pelo backend (`lib/email.ts`), não
 * pelo formulário em si.
 */
export const confirmationEmailContent = {
  subject: 'Cadastro confirmado — Esther Social Media',
  fromName: 'Esther Social Media',
  heading: (name?: string) => `Oi${name ? `, ${name}` : ''}! 👋`,
  body: [
    'Seu cadastro foi confirmado com sucesso.',
    'A partir de agora você vai receber materiais e novidades sobre Instagram para negócios de serviço direto na sua caixa de entrada.',
  ],
  footerNote: 'Se você não fez esse cadastro, pode ignorar este e-mail com segurança — nenhum dado adicional será usado.',
}
