import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'

type Props = {
  onTrack: (event: string, props?: any) => void
}

export default function FAQ({ onTrack }: Props) {
  return (
    <section id='faq' className='relative py-16 sm:py-20 bg-gradient-to-b from-black via-[#0d0c12] to-black border-y border-accent-brown/30 overflow-hidden'>
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_20%_30%,rgba(255,214,102,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_28%)]' />
      <div className='max-w-5xl mx-auto px-4'>
        <MSection>
          <div className='text-center mb-12'>
            <div className='inline-block mb-4'>
              <div className='px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-bold backdrop-blur-xl'>
                ❓ Perguntas Frequentes
              </div>
            </div>
            <h2 className='font-display text-4xl sm:text-5xl font-bold mb-4'>
              <span className='bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x'>
                Tire Suas Dúvidas
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
              Primeiras 3 respostas já abertas para eliminar as objeções mais urgentes.
            </p>
          </div>
        </MSection>

        <MStagger className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-10'>
          <div className='lg:col-span-2 space-y-4'>
            {[
              { n: '01', q: 'Quanto tempo leva para ver os primeiros resultados de venda?', a: 'Os primeiros sinais aparecem em 30 dias com mais mensagens qualificadas no direct. Vendas orgânicas começam entre 60 e 90 dias de implementação estratégica.' },
              { n: '02', q: 'Eu preciso aparecer em vídeos ou fazer dancinhas para vender?', a: 'Não. Autoridade digital vem de posicionamento claro e narrativa estratégica, não de exposição forçada. Você vende através de conteúdo profissional, não de trends virais.' },
              { n: '03', q: 'Funciona para qualquer nicho ou só para alguns mercados específicos?', a: 'Funciona para qualquer profissional com expertise validada que vende conhecimento ou serviços. Coaches, consultoras, terapeutas, arquitetas, nutricionistas e infoprodutoras já comprovaram resultados.' },
            ].map(({ n, q, a }) => (
              <MItem key={n}>
                <details open className='group/details relative'>
                  <div className='absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 rounded-2xl blur opacity-0 group-hover/details:opacity-100 transition duration-300' />
                  <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 cursor-pointer hover:scale-[1.02] transition-all duration-300'>
                    <summary className='font-bold text-text-primary text-base sm:text-lg flex justify-between items-start gap-4 list-none'>
                      <span className='flex items-start gap-4 text-left flex-1'>
                        <span className='flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-purple-400 font-display text-sm border border-purple-500/30 backdrop-blur-xl'>{n}</span>
                        <span className='pt-1.5'>{q}</span>
                      </span>
                      <span className='flex-shrink-0 text-purple-400 mt-2 transition-transform duration-300 group-open/details:rotate-180'>▼</span>
                    </summary>
                    <p className='text-text-secondary text-sm sm:text-base mt-5 ml-14 leading-relaxed border-t border-white/10 pt-5'>{a}</p>
                  </div>
                </details>
              </MItem>
            ))}
          </div>

          <MItem className='lg:self-start lg:sticky lg:top-8'>
            <div className='group/sidebar relative'>
              <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-30 group-hover/sidebar:opacity-50 transition duration-500' />
              <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7'>
                <div className='text-3xl mb-3'>💬</div>
                <h3 className='font-display text-lg sm:text-xl font-bold text-text-primary mb-4'>Prova Social Rápida</h3>
                <p className='text-text-secondary text-sm leading-relaxed mb-5'>
                  Prints de conversas reais no direct mostrando clientes perguntando sobre serviços após consumir o conteúdo estratégico.
                </p>
                <div className='grid grid-cols-2 gap-3'>
                  {['💰', '📈', '✨', '🎯'].map((emoji, idx) => (
                    <div key={idx} className='h-28 bg-gradient-to-br from-button-primary/10 to-accent-gold/10 border border-button-primary/30 rounded-xl flex items-center justify-center text-4xl hover:scale-105 transition-transform duration-200'>{emoji}</div>
                  ))}
                </div>
              </div>
            </div>
          </MItem>
        </MStagger>

        <MSection>
          <div className='text-center mt-12'>
            <div className='group relative inline-block'>
              <div className='absolute -inset-2 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-gradient-x' />
              <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl'>
                <p className='text-text-secondary text-lg mb-6 leading-relaxed'>
                  Ainda tem dúvidas? Agende uma conversa estratégica gratuita de 20 minutos para entender se o <strong className='text-button-primary'>Método Narrativa Vendedora</strong> é para você.
                </p>
                <a href='#form' onClick={() => onTrack('cta_click', { id: 'faq_final' })} className='group/cta relative inline-block'>
                  <div className='absolute -inset-1 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-xl blur opacity-50 group-hover/cta:opacity-100 transition duration-300' />
                  <div className='relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-200 shadow-xl'>
                    Agendar Conversa Gratuita
                  </div>
                </a>
              </div>
            </div>
          </div>
        </MSection>
      </div>
    </section>
  )
}
