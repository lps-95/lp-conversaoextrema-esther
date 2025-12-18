import { MSection } from '../Motion'

export default function Oportunidade() {
  return (
    <section id='oportunidade' className='relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.08),transparent_70%)] animate-pulse-subtle' />
      <div className='absolute top-1/2 right-0 w-96 h-96 bg-button-primary/10 rounded-full blur-[120px] -translate-y-1/2' />

      <div className='max-w-5xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400'>
              ✨ A Solução
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              A Narrativa Proprietária Que Transforma{' '}
              <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent animate-gradient-x'>
                Seguidores em Compradores
              </span>
            </h2>
          </div>
        </MSection>

        <div className='grid md:grid-cols-2 gap-6 lg:gap-8'>
          {/* Card 1 */}
          <div className='group relative'>
            <div className='absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500' />
            <div className='relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300'>
              <div className='text-4xl mb-4'>💡</div>
              <p className='text-text-primary text-lg leading-relaxed'>
                Existe uma forma de fazer seu perfil trabalhar para você enquanto você dorme. Não é sobre viralizar. Não é sobre postar 5 vezes por dia. <span className='text-button-primary font-semibold'>É sobre arquitetar cada peça de conteúdo como um capítulo de uma história maior.</span>
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className='group relative'>
            <div className='absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500' />
            <div className='relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300'>
              <div className='text-4xl mb-4'>✅</div>
              <p className='text-text-primary text-lg leading-relaxed'>
                Quando sua narrativa está certa, o cliente não precisa ser convencido. <span className='text-button-primary font-semibold'>Ele já chegou convencido.</span> Porque cada post que ele viu antes preparou o terreno. Acumulou confiança. Construiu desejo. Eliminou objeções.
              </p>
            </div>
          </div>
        </div>

        {/* Featured card */}
        <div className='group relative mt-8'>
          <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500 animate-gradient-x' />
          <div className='relative bg-gradient-to-br from-button-primary/20 via-accent-gold/20 to-button-primary/20 backdrop-blur-xl border-2 border-button-primary/50 rounded-2xl p-8 sm:p-10'>
            <div className='flex items-start gap-4'>
              <span className='text-5xl flex-shrink-0'>🚀</span>
              <div>
                <p className='text-text-primary font-semibold text-xl leading-relaxed mb-2'>
                  Imagine acordar com mensagens de pessoas pedindo orçamento. Prontas para comprar. Sem você ter feito prospecção ativa.
                </p>
                <p className='text-text-secondary text-lg leading-relaxed'>
                  Seu perfil virou um ativo que atrai oportunidades de 6 figuras todos os meses. Você para de competir por preço e passa a escolher com quem trabalhar. <span className='text-button-primary font-bold'>Essa é a realidade de quem domina a narrativa estratégica.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
