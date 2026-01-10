export default function Problem() {
  return (
    <section id='problema' className='relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05),transparent_70%)]' />
      <div className='absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] -translate-y-1/2' />

      <div className='max-w-4xl mx-auto px-4 relative z-10'>
        {/* Badge */}
        <div className='text-center mb-12'>
          <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full text-red-400'>
            😤 O Problema Real
          </span>
          <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
            Você Está No Ciclo da{' '}
            <span className='bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>
              Invisibilidade Digital
            </span>
          </h2>
        </div>

        {/* Emotional validation section */}
        <div className='space-y-6 mb-12'>
          {/* Moment 1 - Sunday Suffering */}
          <div className='group relative'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8'>
              <div className='flex gap-4 items-start'>
                <span className='text-3xl flex-shrink-0'>🌙</span>
                <div>
                  <p className='text-text-primary font-bold text-lg mb-2'>São 11h da noite de domingo</p>
                  <p className='text-text-secondary text-base leading-relaxed'>
                    Você está no celular há 2 horas tentando criar o conteúdo da semana. De novo. Seu marido já reclamou que você vive grudada no Instagram mas nunca vende nada. Você sabe que amanhã vai postar aquele carrossel que levou 3 horas para fazer e vai morrer com <span className='text-text-primary font-semibold'>12 curtidas</span>. E você não sabe o que mais fazer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Moment 2 - Social comparison */}
          <div className='group relative'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8'>
              <div className='flex gap-4 items-start'>
                <span className='text-3xl flex-shrink-0'>😰</span>
                <div>
                  <p className='text-text-primary font-bold text-lg mb-2'>Enquanto isso, aquela coach que você conhece...</p>
                  <p className='text-text-secondary text-base leading-relaxed'>
                    A que você secretamente acha menos qualificada (porque sabe que seus resultados são melhores) acabou de anunciar que as vagas do grupo dela esgotaram em 48 horas. <span className='text-text-primary font-semibold'>Pelo Instagram. De novo.</span> Você viu a mãe dela comentando que a filha finalmente está faturando. Novamente, você não entende o que ela sabe que você não sabe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The real problem */}
          <div className='group relative'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8'>
              <div className='flex gap-4 items-start'>
                <span className='text-3xl flex-shrink-0'>🎯</span>
                <div>
                  <p className='text-text-primary font-bold text-lg mb-2'>O problema não é você. Não é criatividade.</p>
                  <p className='text-text-secondary text-base leading-relaxed'>
                    É que seus posts funcionam como <span className='text-text-primary font-semibold'>ilhas isoladas</span>. Um post sobre sua metodologia aqui, outro sobre case de sucesso ali, um terceiro pedindo contato. Seu seguidor vê, curte, esquece. <span className='text-text-primary font-bold'>Não há conexão entre eles. Não há história que acumula desejo. Não há jornada que guia até a compra.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The harsh truth */}
          <div className='group relative mt-8'>
            <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition duration-300 animate-gradient-x' />
            <div className='relative bg-gradient-to-br from-button-primary/20 to-accent-gold/20 backdrop-blur-xl border-2 border-button-primary/50 rounded-2xl p-6 sm:p-8'>
              <div className='flex items-start gap-4'>
                <span className='text-3xl flex-shrink-0'>💔</span>
                <div>
                  <p className='text-text-primary font-bold text-lg mb-2'>E a verdade incômoda?</p>
                  <p className='text-text-secondary text-base leading-relaxed'>
                    A concorrente menos qualificada que está vendendo não sabe conteúdo melhor que você. Ela sabe como <span className='text-button-primary font-bold'>conectar cada post ao anterior</span>, criando uma jornada invisível que transforma seguidores em clientes. <span className='text-button-primary'>Você tem qualidade. Ela tem estratégia.</span>
                  </p>
                  <p className='text-text-primary font-semibold text-base mt-3'>
                    Enquanto você continua postando isolado, ela está fechando os contratos que deveriam ser seus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA transition */}
        <div className='text-center'>
          <p className='text-lg text-button-primary font-bold'>
            A boa notícia? Isso é completamente reversível.
          </p>
          <p className='text-text-secondary mt-2'>
            Existe uma forma de conectar esses pontos soltos e transformar seu perfil em máquina de vendas.
          </p>
        </div>
      </div>
    </section>
  )
}
