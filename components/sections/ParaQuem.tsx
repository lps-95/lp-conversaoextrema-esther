import { MSection } from '../Motion'

export default function ParaQuem() {
  const profiles = [
    {
      emoji: '💼',
      title: 'Coaches e Consultores Executivos',
      description: 'Você atende C-Level e tem expertise comprovada, mas perde contratos para concorrentes com presença digital mais profissional que transmite autoridade instantânea.',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      emoji: '🎯',
      title: 'Infoprodutoras e Criadoras de Cursos',
      description: 'Você tem conhecimento valioso e produto validado, mas seu perfil não gera desejo suficiente para transformar seguidores em alunos pagantes de forma consistente.',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      emoji: '👑',
      title: 'Profissionais Liberais de Alto Ticket',
      description: 'Você cobra valores premium pelos seus serviços especializados, mas seu Instagram amador não reflete a sofisticação do trabalho que entrega aos clientes.',
      gradient: 'from-button-primary/20 to-accent-gold/20'
    }
  ]

  return (
    <section id='para-quem' className='relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.08),transparent_70%)]' />
      <div className='absolute top-1/2 left-0 w-96 h-96 bg-button-primary/10 rounded-full blur-[120px] -translate-y-1/2' />

      <div className='max-w-6xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-16'>
            <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-full text-button-primary'>
              🎯 Perfil Ideal
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              Para Quem é Essa{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Gestão
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
              Transformação comprovada para empresárias que não aceitam mais perder oportunidades
            </p>
          </div>
        </MSection>

        <div className='grid md:grid-cols-3 gap-6 lg:gap-8'>
          {profiles.map((item, idx) => (
            <div key={idx} className='group relative'>
              {/* Animated border */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`} />

              {/* Card content */}
              <div className='relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300'>
                {/* Icon with glow */}
                <div className='relative inline-block mb-6'>
                  <div className='absolute inset-0 bg-button-primary/30 blur-xl rounded-full animate-pulse-glow' />
                  <div className='relative text-5xl'>{item.emoji}</div>
                </div>

                <h3 className='font-display text-xl sm:text-2xl font-bold text-text-primary mb-4 group-hover:text-button-primary transition-colors'>
                  {item.title}
                </h3>

                <p className='text-text-secondary leading-relaxed'>
                  {item.description}
                </p>

                {/* Decorative element */}
                <div className='absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-button-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
