import type { Language } from '../contexts/LanguageContext'

/**
 * Conteúdo do formulário de captação de leads para newsletter/materiais,
 * em PT/EN/ES.
 *
 * IMPORTANTE (LGPD): este formulário tem uma FINALIDADE diferente do
 * formulário de agendamento de sessão (`content/form.ts`). Por isso tem
 * seu próprio texto de consentimento, específico pra essa finalidade —
 * nunca reaproveite o consentimento de um formulário no outro.
 *
 * Diferente do `content/form.ts` (onde a mensagem do WhatsApp fica sempre
 * em português porque quem lê é a Esther), aqui o e-mail de confirmação
 * vai DIRETO pro visitante — então ele é enviado no mesmo idioma que a
 * pessoa estava usando no site no momento do cadastro.
 */

interface NewsletterContent {
  badge: string
  title: string
  subtitle: string
  namePlaceholder: string
  emailPlaceholder: string
  submitLabel: string
  submitLoadingLabel: string
  submitSuccessLabel: string
  successMessage: string
  errorMessage: string
  consentLabel: string
  consentLinkLabel: string
  missingConsentError: string
  disclaimer: string
}

export const newsletterContent: Record<Language, NewsletterContent> = {
  pt: {
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
    consentLabel:
      'Aceito receber e-mails com materiais e novidades da Esther Social Media, e concordo com o tratamento dos meus dados conforme a',
    consentLinkLabel: 'Política de Privacidade',
    missingConsentError: 'Você precisa aceitar o uso dos seus dados para se cadastrar',
    disclaimer: 'Você pode cancelar sua inscrição a qualquer momento pelo link no rodapé dos e-mails.',
  },
  en: {
    badge: 'Free resources',
    title: 'Get Exclusive Content',
    subtitle: 'Sign up to receive resources, tips and news about Instagram for service-based businesses',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your best email',
    submitLabel: 'Sign Me Up',
    submitLoadingLabel: 'Submitting...',
    submitSuccessLabel: 'Subscribed!',
    successMessage: '✅ All set! Keep an eye on your inbox.',
    errorMessage: "We couldn't complete your signup. Please try again shortly.",
    consentLabel:
      'I agree to receive emails with resources and news from Esther Social Media, and I agree to the processing of my data as described in the',
    consentLinkLabel: 'Privacy Policy',
    missingConsentError: 'You need to accept the data use terms to sign up',
    disclaimer: 'You can unsubscribe at any time using the link in the footer of our emails.',
  },
  es: {
    badge: 'Materiales gratuitos',
    title: 'Recibe Contenido Exclusivo',
    subtitle: 'Regístrate para recibir materiales, consejos y novedades sobre Instagram para negocios de servicios',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'Tu mejor correo electrónico',
    submitLabel: 'Quiero Recibirlo',
    submitLoadingLabel: 'Enviando...',
    submitSuccessLabel: '¡Registro confirmado!',
    successMessage: '✅ ¡Listo! Revisa tu correo electrónico.',
    errorMessage: 'No pudimos completar tu registro. Inténtalo de nuevo en un momento.',
    consentLabel:
      'Acepto recibir correos con materiales y novedades de Esther Social Media, y acepto el tratamiento de mis datos según la',
    consentLinkLabel: 'Política de Privacidad',
    missingConsentError: 'Debes aceptar el uso de tus datos para registrarte',
    disclaimer: 'Puedes cancelar tu suscripción en cualquier momento desde el enlace en el pie de los correos.',
  },
}

/** Link da política de privacidade — igual nos três idiomas (é a mesma página). */
export const consentLinkHref = '/politica-de-privacidade'

interface ConfirmationEmailContent {
  subject: string
  fromName: string
  heading: (name?: string) => string
  body: string[]
  footerNote: string
  unsubscribeLabel: string
}

/**
 * Conteúdo do e-mail de confirmação enviado logo após o cadastro.
 * Separado do resto porque é usado pelo backend (`lib/email.ts`), não
 * pelo formulário em si.
 */
export const confirmationEmailContent: Record<Language, ConfirmationEmailContent> = {
  pt: {
    subject: 'Cadastro confirmado — Esther Social Media',
    fromName: 'Esther Social Media',
    heading: (name) => `Oi${name ? `, ${name}` : ''}! 👋`,
    body: [
      'Seu cadastro foi confirmado com sucesso.',
      'A partir de agora você vai receber materiais e novidades sobre Instagram para negócios de serviço direto na sua caixa de entrada.',
    ],
    footerNote: 'Se você não fez esse cadastro, pode ignorar este e-mail com segurança — nenhum dado adicional será usado.',
    unsubscribeLabel: 'Cancelar inscrição',
  },
  en: {
    subject: 'Subscription confirmed — Esther Social Media',
    fromName: 'Esther Social Media',
    heading: (name) => `Hi${name ? `, ${name}` : ''}! 👋`,
    body: [
      'Your subscription has been confirmed.',
      "From now on you'll receive resources and news about Instagram for service-based businesses straight to your inbox.",
    ],
    footerNote: "If you didn't sign up for this, you can safely ignore this email — no further action will be taken.",
    unsubscribeLabel: 'Unsubscribe',
  },
  es: {
    subject: 'Registro confirmado — Esther Social Media',
    fromName: 'Esther Social Media',
    heading: (name) => `¡Hola${name ? `, ${name}` : ''}! 👋`,
    body: [
      'Tu registro fue confirmado con éxito.',
      'A partir de ahora recibirás materiales y novedades sobre Instagram para negocios de servicios directo en tu bandeja de entrada.',
    ],
    footerNote: 'Si no hiciste este registro, puedes ignorar este correo con seguridad — no se tomará ninguna acción adicional.',
    unsubscribeLabel: 'Cancelar suscripción',
  },
}
