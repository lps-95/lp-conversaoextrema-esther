import type { Language } from '../contexts/LanguageContext'

interface CaseContent {
  badge: string
  title: string
  quote: string
  name: string
  role: string
  revenue: string
  growth: string
}

/**
 * NOTA: o nome, as iniciais e o valor de faturamento (R$ 180k/mês) são de
 * um caso real — mantidos iguais nos três idiomas de propósito (traduzir
 * a moeda inventaria uma conversão que não existe). Só o texto ao redor
 * (badge, título, cargo, frase) foi adaptado.
 */
export const caseContent: Record<Language, CaseContent> = {
  pt: {
    badge: '💎 Caso de Sucesso',
    title: 'Transformação Real',
    quote:
      '"Em 60 dias, meu faturamento mensal triplicou. Não foi por acaso. A narrativa estratégica fez meus seguidores entenderem o real valor do que eu ofereço."',
    name: 'Camila Santos',
    role: 'Coach Executiva',
    revenue: 'R$ 180k/mês',
    growth: '+300% em 60 dias',
  },
  en: {
    badge: '💎 Success Story',
    title: 'A Real Transformation',
    quote:
      '"In 60 days, my monthly revenue tripled. It wasn\'t by chance. The strategic narrative made my followers understand the real value of what I offer."',
    name: 'Camila Santos',
    role: 'Executive Coach',
    revenue: 'R$ 180k/mo',
    growth: '+300% in 60 days',
  },
  es: {
    badge: '💎 Caso de Éxito',
    title: 'Una Transformación Real',
    quote:
      '"En 60 días, mi facturación mensual se triplicó. No fue casualidad. La narrativa estratégica hizo que mis seguidores entendieran el valor real de lo que ofrezco."',
    name: 'Camila Santos',
    role: 'Coach Ejecutiva',
    revenue: 'R$ 180k/mes',
    growth: '+300% en 60 días',
  },
}
