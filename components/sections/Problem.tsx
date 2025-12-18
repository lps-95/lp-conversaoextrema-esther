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
            ⚠️ O Problema Real
          </span>
          <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
            O Vazio de Narrativa Está{' '}
            <span className='bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>
              Matando Suas Vendas
            </span>
          </h2>
        </div>

        {/* Content cards */}
        <div className='space-y-6'>
          <div className='group relative'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8'>
              <p className='text-text-secondary text-lg leading-relaxed'>
                Você posta todo dia. Cria conteúdo. Se esforça. Mas as vendas não aparecem.
              </p>
            </div>
          </div>

          <div className='group relative'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8'>
              <p className='text-text-secondary text-lg leading-relaxed'>
                E não é porque você não sabe o que faz. É porque cada post funciona como uma ilha isolada. Seu seguidor vê, curte, esquece. <span className='text-text-primary font-semibold'>Não há conexão. Não há história. Não há ponte entre a atenção dele e o cartão de crédito.</span>
              </p>
            </div>
          </div>

          <div className='group relative'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8'>
              <p className='text-text-primary text-lg leading-relaxed'>
                Enquanto isso, seus concorrentes menos qualificados fecham os contratos que deveriam ser seus. Não porque são melhores. Mas porque o Instagram deles <span className='text-button-primary font-bold'>conta uma história que acumula desejo de compra</span>. O seu joga informação solta no ar.
              </p>
            </div>
          </div>

          {/* Highlight box */}
          <div className='group relative mt-8'>
            <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition duration-300 animate-gradient-x' />
            <div className='relative bg-gradient-to-br from-button-primary/20 to-accent-gold/20 backdrop-blur-xl border-2 border-button-primary/50 rounded-2xl p-6 sm:p-8'>
              <div className='flex items-start gap-4'>
                <span className='text-3xl flex-shrink-0'>💔</span>
                <p className='text-text-primary font-semibold text-lg leading-relaxed'>
                  E o pior... não é sua culpa. Ninguém te ensinou que conteúdo sem narrativa estratégica é só ruído bonito. Te venderam a mentira de que postar mais resolve. <span className='text-button-primary'>Mentira.</span> O que resolve é conectar os pontos soltos em uma jornada que leva o cliente até você.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
