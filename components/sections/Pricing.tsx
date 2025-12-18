import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'

type Props = {
  onChoosePlan: (id: 'pricing_essential' | 'pricing_professional' | 'pricing_premium') => void
}

export default function Pricing({ onChoosePlan }: Props) {
  return (
    <section id='planos' className='relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-accent-brown/5 to-black border-y border-accent-brown/30'>
      <ParallaxLayer speed={0.05} className='absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,102,0.10),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_30%)]' />
      <ParallaxLayer speed={0.02} className='absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-button-primary/10 to-transparent' />
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <MSection>
            <div className='inline-block mb-4'>
              <div className='px-4 py-2 bg-gradient-to-r from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-full text-button-primary text-sm font-bold backdrop-blur-xl'>
                💎 Planos e Investimento
              </div>
            </div>
            <h2 className='font-display text-4xl sm:text-5xl font-bold mb-6'>
              <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent animate-gradient-x'>
                Escolha Seu Plano
              </span>
            </h2>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto mb-4'>
              Transforme seu perfil invisível em máquina de vendas diárias
            </p>
            <div className='inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full'>
              <p className='text-red-400 text-sm font-medium'>
                <span className='font-bold'>⚡ ATENÇÃO:</span> Apenas 8 vagas/mês • Lista de espera: 45 dias
              </p>
            </div>
          </MSection>
        </div>

        <MStagger className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          <MItem className='group relative h-full'>
            <div className='absolute -inset-0.5 bg-gradient-to-br from-white/20 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500' />
            <div className='relative h-full bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col hover:scale-105 transition-all duration-300'>
              <div className='mb-6'>
                <span className='inline-block px-3 py-1 mb-3 text-xs font-bold bg-white/10 border border-white/20 rounded-full text-text-secondary'>ESSENCIAL</span>
                <h3 className='font-display text-2xl font-bold text-text-primary mb-2'>Reativação Digital</h3>
                <div className='flex items-baseline gap-2 mb-2'>
                  <span className='text-4xl font-bold bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>R$ 1.700</span>
                  <span className='text-text-tertiary text-sm'>/mês</span>
                </div>
                <p className='text-text-secondary text-sm'>Mínimo 3 meses</p>
              </div>
              <ul className='space-y-3 mb-8 text-text-secondary text-sm flex-grow'>
                {['Diagnóstico completo da atrofia digital', 'Arquitetura de identidade magnética', 'Planejamento estratégico 30 dias', 'Gestão executiva hands-off', 'Relatório mensal em PDF', 'Suporte prioritário WhatsApp'].map((t) => (
                  <li key={t} className='flex items-start'><span className='text-button-primary mr-2 flex-shrink-0 text-lg'>✓</span><span>{t}</span></li>
                ))}
              </ul>
              <button onClick={() => onChoosePlan('pricing_essential')} className='group/btn relative w-full mt-auto'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-button-primary to-accent-gold rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300' />
                <div className='relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-sm py-4 rounded-xl hover:scale-105 transition-transform duration-200'>
                  QUERO COMEÇAR AGORA
                </div>
              </button>
            </div>
          </MItem>

          <MItem className='group relative h-full md:scale-105'>
            <div className='absolute -inset-1 bg-gradient-to-br from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-gradient-x' />
            <div className='relative h-full bg-gradient-to-br from-button-primary/15 via-white/10 to-accent-gold/15 backdrop-blur-xl border-2 border-button-primary rounded-2xl p-8 flex flex-col'>
              <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-accent-gold via-button-primary to-accent-gold rounded-full text-primary-dark text-xs font-bold shadow-xl animate-pulse-glow'>
                ⭐ MAIS ESCOLHIDO
              </div>
              <div className='mb-6 mt-2'>
                <span className='inline-block px-3 py-1 mb-3 text-xs font-bold bg-accent-gold/20 border border-accent-gold/40 rounded-full text-accent-gold'>PROFISSIONAL</span>
                <h3 className='font-display text-2xl font-bold text-text-primary mb-2'>Autoridade Magnética</h3>
                <div className='flex items-baseline gap-2 mb-2'>
                  <span className='text-4xl font-bold bg-gradient-to-r from-accent-gold via-button-primary to-accent-gold bg-clip-text text-transparent'>R$ 2.400</span>
                  <span className='text-text-tertiary text-sm'>/mês</span>
                </div>
                <p className='text-text-secondary text-sm'><span className='line-through opacity-60'>R$ 7.200</span> ou 3x R$ 2.400</p>
              </div>
              <ul className='space-y-3 mb-8 text-text-secondary text-sm flex-grow'>
                {[
                  'Tudo do Pacote Essencial',
                  'Sistema de narrativas vendedoras (90 dias)',
                  'Calendário editorial Implementação Imediata',
                  'Banco de ganchos e roteiros',
                  'Workshop "Desbloqueio Algorítmico"',
                  'Reunião estratégica mensal',
                  '2 campanhas de lançamento',
                ].map((t) => (
                  <li key={t} className='flex items-start'><span className='text-accent-gold mr-2 flex-shrink-0 text-lg'>★</span><span>{t}</span></li>
                ))}
              </ul>
              <button onClick={() => onChoosePlan('pricing_professional')} className='group/btn relative w-full mt-auto'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-accent-gold via-button-primary to-accent-gold rounded-xl blur-lg opacity-80 group-hover/btn:opacity-100 transition duration-300 animate-gradient-x' />
                <div className='relative bg-gradient-to-r from-accent-gold to-button-primary text-primary-dark font-bold text-sm py-4 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-200'>
                  QUERO AUTORIDADE MAGNÉTICA
                </div>
              </button>
            </div>
          </MItem>

          <MItem className='group relative h-full'>
            <div className='absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 via-white/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500' />
            <div className='relative h-full bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col hover:scale-105 transition-all duration-300'>
              <div className='mb-6'>
                <span className='inline-block px-3 py-1 mb-3 text-xs font-bold bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400'>PREMIUM VIP</span>
                <h3 className='font-display text-2xl font-bold text-text-primary mb-2'>Transformação Completa VIP</h3>
                <div className='flex items-baseline gap-2 mb-2'>
                  <span className='text-4xl font-bold bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent'>R$ 3.800</span>
                  <span className='text-text-tertiary text-sm'>/mês</span>
                </div>
                <p className='text-text-secondary text-sm'>Trimestre R$ 11.400 ou 3x R$ 3.800</p>
              </div>
              <ul className='space-y-3 mb-8 text-text-secondary text-sm flex-grow'>
                {[
                  'Tudo do Pacote Profissional',
                  'Diagnóstico presencial (2 horas)',
                  'Sessão estratégica de posicionamento',
                  'Criação de ofertas premium',
                  'Suporte WhatsApp 2 horas resposta',
                  'Análise competitiva do seu nicho',
                  'Consultoria mensal individual (1 hora)',
                  'Acesso vitalício ao banco de recursos',
                ].map((t) => (
                  <li key={t} className='flex items-start'><span className='text-button-primary mr-2 flex-shrink-0 text-lg'>✓</span><span>{t}</span></li>
                ))}
              </ul>
              <button onClick={() => onChoosePlan('pricing_premium')} className='group/btn relative w-full mt-auto'>
                <div className='absolute -inset-0.5 bg-gradient-to-r from-button-primary to-accent-gold rounded-xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300' />
                <div className='relative bg-gradient-to-r from-button-primary to-accent-gold text-primary-dark font-bold text-sm py-4 rounded-xl hover:scale-105 transition-transform duration-200'>
                  QUERO TRANSFORMAÇÃO VIP
                </div>
              </button>
            </div>
          </MItem>
        </MStagger>

        <MSection>
          <div className='group relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-button-primary/30 via-accent-gold/30 to-button-primary/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500' />
            <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10'>
              <div className='text-center mb-8'>
                <div className='text-3xl mb-3'>📊</div>
                <h3 className='font-display text-2xl sm:text-3xl font-bold mb-2'>
                  <span className='bg-gradient-to-r from-button-primary via-accent-gold to-button-primary bg-clip-text text-transparent'>
                    Comparação Detalhada
                  </span>
                </h3>
                <p className='text-text-secondary'>Veja todos os recursos incluídos em cada plano</p>
              </div>
              <div className='overflow-x-auto -mx-4 sm:mx-0'>
                <table className='w-full text-xs sm:text-sm md:text-base min-w-[600px] lg:min-w-0'>
                  <thead>
                    <tr className='border-b border-button-primary/30'>
                      <th className='text-left py-3 sm:py-4 px-2 sm:px-4 md:px-6 font-bold text-text-primary'>Recurso</th>
                      <th className='text-center py-3 sm:py-4 px-2 sm:px-4 md:px-6 font-bold text-text-primary whitespace-nowrap'>Essencial</th>
                      <th className='text-center py-3 sm:py-4 px-2 sm:px-4 md:px-6 font-bold text-accent-gold whitespace-nowrap'>Profissional</th>
                      <th className='text-center py-3 sm:py-4 px-2 sm:px-4 md:px-6 font-bold text-text-primary whitespace-nowrap'>Premium</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-button-primary/20'>
                    {[
                      ['Diagnóstico completo', '✓', '✓', '✓'],
                      ['Arquitetura de identidade', '✓', '✓', '✓'],
                      ['Planejamento estratégico', '✓', '✓', '✓'],
                      ['Gestão executiva', '✓', '✓', '✓'],
                      ['Relatório mensal', '✓', '✓', '✓'],
                      ['Suporte WhatsApp', '✓', '✓', 'Prioritário'],
                      ['Sistema de narrativas', '—', '✓', '✓'],
                      ['Calendário editorial', '—', '✓', '✓'],
                      ['Banco de roteiros', '—', '✓', '✓'],
                      ['Workshop algorítmico', '—', '✓', '✓'],
                      ['Reunião estratégica', '—', '✓', '✓'],
                      ['Campanhas de lançamento', '—', '2x', '2x'],
                      ['Diagnóstico presencial', '—', '—', '✓'],
                      ['Sessão de posicionamento', '—', '—', '✓'],
                      ['Criação de ofertas', '—', '—', '✓'],
                      ['Análise competitiva', '—', '—', '✓'],
                      ['Consultoria individual', '—', '—', '1h/mês'],
                      ['Banco de recursos vitalício', '—', '—', '✓'],
                    ].map(([label, a, b, c]) => (
                      <tr key={label}>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-text-secondary text-left'>{label}</td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-center text-button-primary whitespace-nowrap'>{a}</td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-center text-accent-gold whitespace-nowrap'>{b}</td>
                        <td className='py-2 sm:py-3 px-2 sm:px-4 md:px-6 text-center text-button-primary whitespace-nowrap'>{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </MSection>
      </div>
    </section>
  )
}
