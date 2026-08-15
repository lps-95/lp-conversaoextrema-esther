import type { Language } from '../contexts/LanguageContext'

interface FooterContent {
  brandDescription: string
  navTitle: string
  navLinks: { label: string; href: string }[]
  contactTitle: string
  whatsappLabel: string
  emailLabel: string
  copyright: string
  privacyLabel: string
  termsLabel: string
}

export const footerContent: Record<Language, FooterContent> = {
  pt: {
    brandDescription:
      'Transformando perfis invisíveis em máquinas de autoridade através do Método Narrativa Vendedora. Pare de perder contratos de 6 figuras para concorrentes com Instagram melhor.',
    navTitle: 'Navegação',
    navLinks: [
      { label: 'Início', href: '#hero' },
      { label: 'Resultados', href: '#numeros' },
      { label: 'Problema', href: '#problema' },
      { label: 'Como Funciona', href: '#como-funciona' },
      { label: 'Planos', href: '#planos' },
    ],
    contactTitle: 'Contato',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'E-mail',
    copyright: 'Esther Social Media. Todos os direitos reservados.',
    privacyLabel: 'Política de Privacidade',
    termsLabel: 'Termos de Uso',
  },
  en: {
    brandDescription:
      "Turning invisible profiles into authority machines through the Sales Narrative Method. Stop losing six-figure clients to competitors with a better Instagram.",
    navTitle: 'Navigation',
    navLinks: [
      { label: 'Home', href: '#hero' },
      { label: 'Results', href: '#numeros' },
      { label: 'Problem', href: '#problema' },
      { label: 'How It Works', href: '#como-funciona' },
      { label: 'Plans', href: '#planos' },
    ],
    contactTitle: 'Contact',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    copyright: 'Esther Social Media. All rights reserved.',
    privacyLabel: 'Privacy Policy',
    termsLabel: 'Terms of Use',
  },
  es: {
    brandDescription:
      'Convirtiendo perfiles invisibles en máquinas de autoridad a través del Método Narrativa de Ventas. Deja de perder clientes de seis cifras ante competidoras con mejor Instagram.',
    navTitle: 'Navegación',
    navLinks: [
      { label: 'Inicio', href: '#hero' },
      { label: 'Resultados', href: '#numeros' },
      { label: 'Problema', href: '#problema' },
      { label: 'Cómo Funciona', href: '#como-funciona' },
      { label: 'Planes', href: '#planos' },
    ],
    contactTitle: 'Contacto',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Correo electrónico',
    copyright: 'Esther Social Media. Todos los derechos reservados.',
    privacyLabel: 'Política de Privacidad',
    termsLabel: 'Términos de Uso',
  },
}
