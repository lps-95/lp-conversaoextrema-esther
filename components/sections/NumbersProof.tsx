import React, { useMemo } from 'react'
import { MItem, MSection, MStagger } from '../Motion'
import ParallaxLayer from '../ParallaxLayer'
import ScrollReveal from '../ScrollReveal'

type Testimonial = {
  title: string
  quote: string
  author: string
  role: string
  result: string
  before: string
  after: string
  stars: number
  gradient: string
  verification?: string
  objectiveNeutralized?: string
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Avaliação ${value} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < value ? 'text-accent-gold text-sm' : 'text-white/20 text-sm'}
          aria-hidden
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-xs text-text-tertiary">({value}.0)</span>
    </div>
  )
}

function clampStyle(lines: number): React.CSSProperties {
  return {
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }
}

function TestimonialCard({ item, idx }: { item: Testimonial; idx: number }) {
  return (
    <MItem key={`${item.title}-${item.author}`} className="h-full flex">
      <ScrollReveal direction="up" delay={idx * 90}>
        <div className="group relative h-full flex-1">
          <div
            className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}
            aria-hidden
          />

          <div
            className="
          relative h-full
          lg:h-[560px]
          bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl
          border border-white/20 rounded-2xl
          p-6 sm:p-8
          flex flex-col
          hover:scale-[1.02] transition-all duration-300 will-change-transform
        "
          >
            {/* topo */}
            <div className="mb-4 pb-4 border-b border-white/20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-button-primary/20 border border-button-primary/30 rounded-full">
                <p className="text-xs font-bold text-button-primary uppercase tracking-widest">
                  {item.title}
                </p>
              </div>

              {!!item.objectiveNeutralized && (
                <p className="mt-2 text-xs text-text-tertiary">✅ {item.objectiveNeutralized}</p>
              )}
            </div>

            {/* stars */}
            <div className="flex items-center gap-1 mb-3" aria-label={`Avaliação ${item.stars} de 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < item.stars ? 'text-accent-gold text-sm' : 'text-white/20 text-sm'}
                  aria-hidden
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-xs text-text-tertiary">({item.stars}.0)</span>
            </div>

            {/* quote (clamp sem plugin) */}
            <div className="mb-4">
              <div className="text-button-primary text-3xl font-display mb-2 opacity-50 leading-none" aria-hidden>
                ❝
              </div>

              <p
                className="
              text-base text-text-primary font-medium leading-relaxed
              overflow-hidden
              [display:-webkit-box]
              [-webkit-box-orient:vertical]
              [-webkit-line-clamp:5]
            "
              >
                {item.quote}
              </p>
            </div>

            {/* meio */}
            <div className="mb-4 pb-4 border-b border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                  <div className="text-[10px] text-red-400 font-bold mb-1 uppercase tracking-wide">Antes</div>
                  <div className="text-xs text-text-secondary font-medium leading-tight">
                    {item.before}
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2.5">
                  <div className="text-[10px] text-green-400 font-bold mb-1 uppercase tracking-wide">Depois</div>
                  <div className="text-xs text-text-primary font-semibold leading-tight">
                    {item.after}
                  </div>
                </div>
              </div>
            </div>

            {/* result */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400 text-lg" aria-hidden>💰</span>
                <span className="text-green-400 text-sm font-bold">{item.result}</span>
              </div>
            </div>

            {/* empurra autor sempre pro fundo */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-button-primary to-accent-gold rounded-full flex items-center justify-center text-primary-dark font-bold shadow-lg">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-text-primary font-bold text-sm">{item.author}</p>
                  <p className="text-text-tertiary text-xs">{item.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full">
                <span className="text-[9px] text-blue-400 font-semibold uppercase tracking-wide">
                  {item.verification ?? 'Verificado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </MItem>

  )
}

export default function NumbersProof() {
  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        title: 'Medo de Aparecer em Vídeo',
        quote:
          'Eu travava toda vez que ligava a câmera. A Esther estruturou roteiros onde eu só precisava responder perguntas simples. Em duas semanas eu já gravava sem ansiedade e os vídeos começaram a trazer pacientes reais.',
        author: 'Carla Nogueira',
        role: 'Fisioterapeuta',
        result: '3 → 11 consultas/mês',
        before: 'Zero constância e sem vídeos',
        after: 'Roteiros guiados + constância',
        stars: 5,
        gradient: 'from-rose-500/20 to-red-500/20',
        verification: 'Resultado verificado',
        objectiveNeutralized: 'Medo de câmera eliminado',
      },
      {
        title: 'Perfil Bonito Mas Sem Venda',
        quote:
          'Meu Instagram parecia organizado, mas não gerava nenhum cliente. A Esther refez minha bio, destaques e funil. Em 30 dias fechei meus primeiros 4 atendimentos pelo direct.',
        author: 'Renata Lima',
        role: 'Nutricionista',
        result: '0 → 4 clientes em 30 dias',
        before: 'Perfil estético sem estratégia',
        after: 'Funil estruturado',
        stars: 5,
        gradient: 'from-orange-500/20 to-amber-500/20',
        verification: 'Resultado verificado',
        objectiveNeutralized: 'Estética sem conversão',
      },
      {
        title: 'Medo de Investir em Tráfego',
        quote:
          'Sempre achei que anúncio era jogar dinheiro fora. A Esther explicou tudo de forma simples e começamos com orçamento baixo. O primeiro mês já pagou o investimento.',
        author: 'Patrícia Rocha',
        role: 'Dermatologista',
        result: 'ROI positivo no 1º mês',
        before: 'Zero anúncios',
        after: 'Tráfego validado',
        stars: 5,
        gradient: 'from-emerald-500/20 to-teal-500/20',
        verification: 'Resultado verificado',
        objectiveNeutralized: 'Risco percebido reduzido',
      },
      {
        title: 'Agenda Instável',
        quote:
          'Tinha semanas cheias e outras vazias. Com a estratégia da Esther hoje tenho previsibilidade e fila de espera.',
        author: 'Juliana Pires',
        role: 'Psicóloga',
        result: 'Agenda cheia em 60 dias',
        before: 'Oscilação semanal',
        after: 'Fluxo constante',
        stars: 5,
        gradient: 'from-indigo-500/20 to-violet-500/20',
        verification: 'Resultado verificado',
        objectiveNeutralized: 'Previsibilidade de faturamento',
      },
      {
        title: 'Não Sabia O Que Postar',
        quote: 'Eu perdia horas pensando em conteúdo. Hoje recebo calendário pronto e só aprovo.',
        author: 'Mariana Torres',
        role: 'Biomédica',
        result: '3 meses de conteúdo organizado',
        before: 'Bloqueio criativo',
        after: 'Planejamento mensal',
        stars: 5,
        gradient: 'from-sky-500/20 to-blue-500/20',
        verification: 'Resultado verificado',
        objectiveNeutralized: 'Clareza total de conteúdo',
      },
      {
        title: 'Queria Vender Sem Ser Forçada',
        quote:
          'Não queria virar aquele perfil empurrando oferta. A Esther criou um posicionamento que vende educando. Hoje fecho atendimentos sem parecer vendedora.',
        author: 'Ana Beatriz Souza',
        role: 'Esteticista Avançada',
        result: 'Fechamentos semanais',
        before: 'Medo de vender',
        after: 'Venda natural',
        stars: 5,
        gradient: 'from-fuchsia-500/20 to-pink-500/20',
        verification: 'Resultado verificado',
        objectiveNeutralized: 'Venda sem pressão',
      },
    ],
    []
  )

  return (
    <section
      id="prova-numeros"
      className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-black via-[#0d0c12] to-black"
      aria-label="Provas e depoimentos"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,220,200,0.1),transparent_70%)] animate-pulse-subtle" />
      <ParallaxLayer speed={0.05} className="absolute inset-0 pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <MSection>
          <div className="text-center mb-14 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400">
              <span aria-hidden>⭐</span> Resultados Reais
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Enquanto Você Pensa, Outras{' '}
              <span className="bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">
                Já Estão Ganhando
              </span>
            </h2>

            <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
              Transformações comprovadas em até <span className="text-text-primary font-semibold">90 dias</span> — com processo leve e direção clara.
            </p>
          </div>
        </MSection>

        <MSection>
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Objeções Mais Comuns E Como{' '}
              <span className="bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">
                Foram Destruídas
              </span>
            </h3>
            <p className="text-text-secondary text-base sm:text-lg">
              Histórias reais de clientes que tinham as mesmas dúvidas que você tem agora
            </p>
          </div>
        </MSection>

        <MStagger className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch">
          {testimonials.map((item, idx) => (
            <React.Fragment key={`${item.title}-${item.author}`}>
              <TestimonialCard item={item} idx={idx} />
            </React.Fragment>
          ))}
        </MStagger>

        <MSection>
          <div className="text-center mt-10 sm:mt-12">
            <p className="text-text-tertiary text-sm">
              *Resultados variam conforme nicho, oferta e execução — aqui você já começa com estratégia e direção.
            </p>
          </div>
        </MSection>
      </div>
    </section>
  )
}
