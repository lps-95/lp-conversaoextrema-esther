import { MSection } from '../Motion'

export default function Historia({ onTrack }: { onTrack?: (eventName: string, props?: Record<string, unknown>) => void }) {
  const track = onTrack || (() => { })
  return (
    <section className='relative py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.06),transparent_70%)]' />
      <div className='absolute top-1/2 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-[120px] -translate-y-1/2' />

      <div className='max-w-4xl mx-auto px-4 relative z-10'>
        <MSection>
          <div className='text-center mb-12'>
            <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-400'>
              🎯 Por Que Eu
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              Por Que Esther Maia e Não{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Uma Outra Social Media?
              </span>
            </h2>
          </div>
        </MSection>

        {/* Story card */}
        <div className='group relative mb-12'>
          <div className='absolute -inset-1 bg-gradient-to-br from-button-primary/20 via-accent-gold/20 to-button-primary/20 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500' />
          <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12'>

            <div className='space-y-6 text-text-secondary leading-relaxed'>
              <p className='text-xl text-text-primary font-semibold'>Eu não sou mais uma social media que agenda posts bonitos.</p>
              <p>
                Sou estrategista digital especializada em Arquitetura de Conversão para negócios de alto ticket. Existem milhares de agências que entregam conteúdo visualmente bonito. Mas 95% delas desconhecem completamente como estruturar um perfil como máquina de vendas.
              </p>

              <div className='relative my-8 p-6 sm:p-8 bg-gradient-to-br from-button-primary/20 to-accent-gold/20 border-l-4 border-button-primary rounded-r-2xl'>
                <div className='absolute -left-3 top-6 w-6 h-6 bg-button-primary rounded-full animate-pulse-glow' />
                <p className='italic text-text-primary font-semibold text-lg leading-relaxed'>
                  <strong>Minha História:</strong> Passei 4 anos vendo empresárias competentes perderem contratos para concorrentes menos qualificados apenas porque o Instagram delas parecia amador. Tentei todas as fórmulas que o mercado ensina — postar mais, viralizar, seguir trends — e vi que nada funcionava porque o problema não era criatividade, era ausência de funil estratégico.
                </p>
              </div>

              <p className='text-xl text-button-primary font-semibold'>Foi aí que entendi o padrão invisível.</p>
              <p>
                Criei o Método Ressonância Direcional depois de estudar 200+ perfis de autoridades e identificar exatamente o que separa quem vende de quem posta. Não é sorte. Não é viralização. É arquitetura estratégica que transforma cada post em um degrau de uma escada que leva do seguidor até a compra.
              </p>

              <div className='grid sm:grid-cols-2 gap-4 my-8'>
                <div className='p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl'>
                  <p className='text-xs uppercase tracking-widest text-accent-gold font-bold mb-2'>Diferença 1</p>
                  <p className='text-sm text-text-primary font-semibold'>Não sou social media genérica</p>
                  <p className='text-xs text-text-tertiary mt-2'>Trabalho exclusivamente com 10-12 clientes por vez, não 50+. Cada estratégia é construída do zero baseada no seu negócio específico, não em template genérico.</p>
                </div>
                <div className='p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl'>
                  <p className='text-xs uppercase tracking-widest text-accent-gold font-bold mb-2'>Diferença 2</p>
                  <p className='text-sm text-text-primary font-semibold'>Foco em vendas, não vaidade</p>
                  <p className='text-xs text-text-tertiary mt-2'>Você acompanha métricas que importam (consultas geradas, vendas fechadas), não métricas de vaidade (curtidas, seguidores). Seu ROI é mensurável em dias.</p>
                </div>
              </div>

              <p className='text-lg text-button-primary font-semibold'>Meu compromisso com você:</p>
              <ul className='space-y-3 my-6'>
                <li className='flex gap-3'>
                  <span className='text-accent-gold text-xl flex-shrink-0'>✓</span>
                  <span className='text-text-secondary'>Você não será só mais um número na carteira de clientes. Você terá minha atenção estratégica dedicada.</span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-accent-gold text-xl flex-shrink-0'>✓</span>
                  <span className='text-text-secondary'>Resposta em até 1 hora (não dias) para dúvidas e ajustes.</span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-accent-gold text-xl flex-shrink-0'>✓</span>
                  <span className='text-text-secondary'>Garantia dupla: Se em 90 dias seu perfil não apresentar aumento mensurável em consultas qualificadas, continuamos trabalhando sem custo por mais 30 dias.</span>
                </li>
              </ul>

              <p className='text-lg text-text-primary font-semibold'>
                Resultado: Clientes que chegam aquecidas, perfis que vendem 24h, e você finalmente sendo reconhecida como A autoridade do seu nicho.
              </p>
            </div>

            <div className='mt-10 text-center'>
              <a href='#form' onClick={() => track('cta_click', { id: 'story_cta' })} className='group/btn relative inline-block'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-button-primary to-accent-gold rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300' />
                <div className='relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl hover:scale-105 transition-transform duration-200'>
                  Quero Trabalhar Com Você →
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
