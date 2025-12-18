import ParallaxLayer from '../ParallaxLayer'

type Props = {
  onTrack: (event: string, props?: any) => void
}

export default function Footer({ onTrack }: Props) {
  return (
    <footer className='relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0f] to-black border-t border-white/10'>
      <ParallaxLayer speed={0.03} className='absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_20%,rgba(255,214,102,0.08),transparent_50%)]' />

      <div className='relative z-10'>
        {/* Main footer content */}
        <div className='max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12'>
            {/* Brand column */}
            <div className='lg:col-span-2'>
              <div className='group relative inline-block mb-4 sm:mb-6'>
                <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-gradient-x' />
                <h3 className='relative font-display text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent'>
                  Esther Social Media
                </h3>
              </div>
              <p className='text-text-secondary text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-md'>
                Transformando perfis invisíveis em máquinas de autoridade através do Método Narrativa Vendedora.
                Pare de perder contratos de 6 figuras para concorrentes com Instagram melhor.
              </p>
              <div className='flex items-center gap-3'>
                <a
                  href='https://instagram.com/esthersocialmedia'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => onTrack('footer_social_click', { platform: 'instagram' })}
                  className='group/icon relative'
                >
                  <div className='absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur opacity-0 group-hover/icon:opacity-100 transition duration-300' />
                  <div className='relative w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform duration-200'>
                    📱
                  </div>
                </a>
                <a
                  href='https://wa.me/5548991964517'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => onTrack('footer_social_click', { platform: 'whatsapp' })}
                  className='group/icon relative'
                >
                  <div className='absolute -inset-1 bg-gradient-to-r from-green-500/40 to-emerald-500/40 rounded-full blur opacity-0 group-hover/icon:opacity-100 transition duration-300' />
                  <div className='relative w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform duration-200'>
                    💬
                  </div>
                </a>
              </div>
            </div>

            {/* Navigation column */}
            <div>
              <h4 className='font-display text-base sm:text-lg font-bold text-text-primary mb-4 sm:mb-5 flex items-center gap-2'>
                <span className='text-lg sm:text-xl'>🧭</span>
                Navegação
              </h4>
              <ul className='space-y-2 sm:space-y-3'>
                {[
                  { label: 'Início', href: '#hero' },
                  { label: 'Resultados', href: '#numeros' },
                  { label: 'Problema', href: '#problema' },
                  { label: 'Solução', href: '#oportunidade' },
                  { label: 'Como Funciona', href: '#como-funciona' },
                  { label: 'Planos', href: '#planos' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => onTrack('footer_link_click', { link: link.label })}
                      className='text-text-secondary text-sm sm:text-base hover:text-button-primary transition-colors duration-200 inline-flex items-center gap-2 group/link'
                    >
                      <span className='w-1.5 h-1.5 bg-button-primary/50 rounded-full group-hover/link:bg-button-primary transition-colors' />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className='font-display text-base sm:text-lg font-bold text-text-primary mb-4 sm:mb-5 flex items-center gap-2'>
                <span className='text-lg sm:text-xl'>📞</span>
                Contato
              </h4>
              <ul className='space-y-3 sm:space-y-4'>
                <li>
                  <a
                    href='https://wa.me/5548991964517'
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={() => onTrack('footer_contact_click', { type: 'whatsapp' })}
                    className='text-text-secondary hover:text-button-primary transition-colors duration-200 block'
                  >
                    <div className='text-xs sm:text-sm font-medium mb-1 text-text-tertiary'>WhatsApp</div>
                    <div className='flex items-center gap-2'>
                      <span className='text-green-400 text-base sm:text-lg'>💬</span>
                      <span className='text-sm sm:text-base'>+55 48 99196-4517</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:contato@esthersocialmedia.com'
                    onClick={() => onTrack('footer_contact_click', { type: 'email' })}
                    className='text-text-secondary hover:text-button-primary transition-colors duration-200 block'
                  >
                    <div className='text-xs sm:text-sm font-medium mb-1 text-text-tertiary'>E-mail</div>
                    <div className='flex items-center gap-2'>
                      <span className='text-blue-400 text-base sm:text-lg'>✉️</span>
                      <span className='text-xs sm:text-sm break-all'>contato@esthersocialmedia.com</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className='mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10'>
            <div className='group relative max-w-3xl mx-auto'>
              <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-gradient-x' />
              <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-10 text-center'>
                <div className='text-3xl sm:text-4xl mb-3 sm:mb-4'>🚀</div>
                <h3 className='font-display text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-3 sm:mb-4'>
                  Pronta Para Transformar Seu Instagram em Máquina de Vendas?
                </h3>
                <p className='text-text-secondary text-sm sm:text-base mb-5 sm:mb-6 max-w-xl mx-auto'>
                  Agende uma conversa estratégica gratuita e descubra como o Método Narrativa Vendedora pode funcionar para você
                </p>
                <a
                  href='#form'
                  onClick={() => onTrack('cta_click', { id: 'footer_cta' })}
                  className='group/cta relative inline-block'
                >
                  <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur-lg opacity-60 group-hover/cta:opacity-100 transition duration-300 animate-gradient-x' />
                  <div className='relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-button-primary to-accent-gold rounded-xl font-bold text-base sm:text-lg text-primary-dark hover:scale-105 transition-transform duration-200 shadow-2xl'>
                    Quero Começar Agora
                    <span className='ml-2'>→</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-white/10'>
          <div className='max-w-6xl mx-auto px-4 py-6 sm:py-8'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-text-tertiary'>
              <p className='text-center sm:text-left'>
                © {new Date().getFullYear()} Esther Social Media. Todos os direitos reservados.
              </p>
              <div className='flex items-center gap-4 sm:gap-6'>
                <a href='#' className='hover:text-button-primary transition-colors duration-200 whitespace-nowrap'>
                  Política de Privacidade
                </a>
                <a href='#' className='hover:text-button-primary transition-colors duration-200 whitespace-nowrap'>
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
