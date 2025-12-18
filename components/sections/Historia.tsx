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
              📚 Minha História
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
              Como Descobri Que O Problema{' '}
              <span className='bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>
                Nunca Foi O Algoritmo
              </span>
            </h2>
          </div>
        </MSection>

        {/* Story card */}
        <div className='group relative'>
          <div className='absolute -inset-1 bg-gradient-to-br from-button-primary/20 via-accent-gold/20 to-button-primary/20 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500' />
          <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12'>

            <div className='space-y-6 text-text-secondary leading-relaxed'>
              <p className='text-xl text-text-primary font-semibold'>Eu via a mesma cena se repetir toda semana.</p>
              <p>
                Empreendedoras competentes, com anos de experiência e resultados reais para os clientes, completamente travadas no digital. Perfis abandonados. Posts sem alma. Zero vendas orgânicas.
              </p>
              <p>
                Elas faziam tudo que os gurus mandavam. Postavam todo dia. Usavam as hashtags certas. Criavam reels seguindo trends. Gastavam em tráfego pago sem estratégia.
              </p>
              <p>E continuavam invisíveis.</p>
              <p>
                O pior era ver a frustração delas ao perceber que concorrentes menos preparados faturavam alto apenas por terem presença digital profissional. A injustiça doía. O talento estava ali, mas ninguém via.
              </p>
              <p>
                Eu mesma caí nessa armadilha no começo. Acreditei que precisava viralizar, que o algoritmo era o vilão, que faltava criatividade. Gastei meses criando conteúdo bonito que morria com 15 curtidas.
              </p>

              <div className='relative my-8 p-6 sm:p-8 bg-gradient-to-br from-button-primary/20 to-accent-gold/20 border-l-4 border-button-primary rounded-r-2xl'>
                <div className='absolute -left-3 top-6 w-6 h-6 bg-button-primary rounded-full animate-pulse-glow' />
                <p className='italic text-text-primary font-semibold text-lg leading-relaxed'>
                  Até o dia que uma cliente me ligou desesperada. Ela tinha perdido um contrato de R$ 35 mil para uma concorrente que cobrava metade do preço. O motivo? O Instagram da concorrente parecia mais profissional.
                </p>
              </div>

              <p className='text-xl text-button-primary font-semibold'>Foi aí que entendi.</p>
              <p>O problema nunca foi o algoritmo. Nunca foi falta de conteúdo. Nunca foi timing de postagem.</p>

              <div className='relative my-8 p-6 sm:p-8 bg-gradient-to-br from-button-primary/30 to-accent-gold/30 border-2 border-button-primary/50 rounded-2xl'>
                <p className='text-text-primary font-bold text-lg leading-relaxed'>
                  O problema era a ausência de narrativa estratégica. Cada post funcionava sozinho, sem conexão com o anterior nem com o próximo. O perfil era um amontoado de peças soltas que confundiam em vez de guiar para a compra.
                </p>
              </div>
              <p>
                Comecei a testar uma abordagem diferente. Em vez de focar em volume, foquei em arquitetura. Tratei cada perfil como uma história onde cada capítulo acumulava desejo até a venda acontecer naturalmente.
              </p>
              <p>
                Os resultados apareceram em semanas. Seguidores fantasmas viraram clientes pagantes. Perfis mortos ressuscitaram com vendas diárias. Empreendedoras recuperaram contratos que estavam perdendo.
              </p>
              <p className='text-lg text-button-primary font-semibold'>Nascia ali o Protocolo de Reativação Narrativa.</p>
              <p>
                O método que transforma perfis invisíveis em máquinas de autoridade sem depender de sorte, viralização ou exposição exagerada.
              </p>
              <p className='text-lg text-text-primary font-semibold'>
                Hoje, cada cliente que atendo prova a mesma verdade: quando a narrativa está certa, a venda acontece sozinha.
              </p>
            </div>

            <div className='mt-10 text-center'>
              <a href='#form' onClick={() => track('cta_click', { id: 'story_cta' })} className='group/btn relative inline-block'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-button-primary to-accent-gold rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300' />
                <div className='relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl hover:scale-105 transition-transform duration-200'>
                  Quero Transformar Meu Perfil Também →
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
