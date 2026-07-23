import dynamic from 'next/dynamic'
import useSmoothScroll from '../hooks/useSmoothScroll'
import { useLeadForm } from '../hooks/useLeadForm'
import { track } from '../lib/analytics'
import AnimatedBlobs from './AnimatedBlobs'
import CustomCursor from './CustomCursor'
import ExitIntentPopup from './ExitIntentPopup'
import FloatingCTA from './FloatingCTA'
import Hero from './hero/Hero'
import LeadForm from './form/LeadForm'
import ScrollProgress from './ScrollProgress'
import WhatsAppWidget from './WhatsAppWidget'

// Lazy load das seções abaixo da dobra: elas só entram no bundle quando o
// usuário rola até perto delas, o que reduz o JS baixado no primeiro
// carregamento — crítico pra mobile.
const ComoFunciona = dynamic(() => import('./sections/ComoFunciona'), { loading: () => null })
const FAQ = dynamic(() => import('./sections/FAQ'), { loading: () => null })
const Footer = dynamic(() => import('./sections/Footer'), { loading: () => null })
const Historia = dynamic(() => import('./sections/Historia'), { loading: () => null })
const NumbersProof = dynamic(() => import('./sections/NumbersProof'), { loading: () => null })
const Pricing = dynamic(() => import('./sections/Pricing'), { loading: () => null })
const Problem = dynamic(() => import('./sections/Problem'), { loading: () => null })

/**
 * Componente raiz da landing page.
 *
 * O papel deste arquivo é só COMPOR as peças — ele não guarda lógica de
 * formulário (isso está em `hooks/useLeadForm.ts`) nem textos (estão em
 * `content/*.ts`). Pra montar uma nova landing page a partir deste modelo,
 * o fluxo normal é: duplicar os arquivos de `content/`, ajustar as seções
 * necessárias e reaproveitar esta composição quase sem mudanças.
 */
export default function LandingPage() {
  useSmoothScroll()

  // Todo o estado e a lógica do formulário vivem neste hook. Ele é criado
  // aqui (não dentro do LeadForm) porque a seção de Pricing também precisa
  // acionar `selectPlanAndScrollToForm` quando o usuário escolhe um plano.
  const form = useLeadForm()

  return (
    <div className="bg-gradient-to-br from-black via-[#0d0c12] to-black text-white font-sans">
      <CustomCursor />
      <AnimatedBlobs />
      <ScrollProgress />
      <FloatingCTA />
      <ExitIntentPopup />
      <WhatsAppWidget
        phone={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5548991964517'}
        message="Olá! Vim da landing page e gostaria de saber mais sobre a mentoria Esther Social Media."
      />

      <Hero />

      {/* Prova numérica de resultados */}
      <NumbersProof />

      {/* Identificação da dor do visitante */}
      <Problem />

      {/* Autoridade e credibilidade (por que confiar) */}
      <Historia onTrack={track} />

      {/* Metodologia */}
      <ComoFunciona />

      {/* Planos — ao escolher um plano, pré-seleciona e rola até o formulário */}
      <Pricing onChoosePlan={form.selectPlanAndScrollToForm} />

      <FAQ onTrack={track} />

      <LeadForm form={form} />

      <Footer onTrack={track} />
    </div>
  )
}
