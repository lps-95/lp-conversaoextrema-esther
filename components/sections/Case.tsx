import ParallaxLayer from '../ParallaxLayer'

export default function Case() {
  return (
    <section id='case' className='relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-black via-[#0d0c12] to-black border-t border-button-primary/20'>
      <ParallaxLayer speed={0.045} className='absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(circle_at_12%_25%,rgba(255,214,102,0.10),transparent_32%),radial-gradient(circle_at_88%_15%,rgba(255,255,255,0.06),transparent_28%)]' />

      <div className='max-w-4xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='inline-block mb-4'>
            <div className='px-4 py-2 bg-gradient-to-r from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-full text-button-primary text-sm font-bold backdrop-blur-xl'>
              💎 Caso de Sucesso
            </div>
          </div>
          <h2 className='font-display text-4xl sm:text-5xl font-bold mb-4'>
            <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent animate-gradient-x'>
              Transformação Real
            </span>
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className='group relative'>
          <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-gradient-x' />
          <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12'>
            <div className='text-6xl sm:text-7xl text-button-primary mb-6 leading-none' style={{ textShadow: '0 0 30px rgba(255,214,102,0.3)' }}>❝</div>
            <p className='font-display text-2xl sm:text-4xl font-bold text-text-primary mb-8 leading-relaxed'>
              &quot;Em 60 dias, meu faturamento mensal triplicou. Não foi por acaso. A narrativa estratégica fez meus seguidores entenderem o real valor do que eu ofereço.&quot;
            </p>

            <div className='flex items-center gap-4'>
              <div className='relative'>
                <div className='absolute -inset-1 bg-gradient-to-r from-button-primary to-accent-gold rounded-full blur opacity-50' />
                <div className='relative w-16 h-16 bg-gradient-to-br from-button-primary/30 to-accent-gold/30 rounded-full flex items-center justify-center text-2xl font-bold text-button-primary border border-button-primary/30 backdrop-blur-xl'>
                  CS
                </div>
              </div>
              <div>
                <p className='font-bold text-xl text-text-primary'>Camila Santos</p>
                <p className='text-text-secondary'>Coach Executiva</p>
                <div className='flex items-center gap-2 mt-1'>
                  <span className='text-button-primary text-sm font-bold'>R$ 180k/mês</span>
                  <span className='text-text-tertiary'>•</span>
                  <span className='text-green-400 text-sm font-bold'>+300% em 60 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
