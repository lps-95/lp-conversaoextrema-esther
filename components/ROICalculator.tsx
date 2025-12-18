'use client'

import { useState } from 'react'

interface ROICalculatorProps {
  onTrack?: (event: string, props: any) => void
}

export default function ROICalculator({ onTrack }: ROICalculatorProps) {
  const [investmentAmount, setInvestmentAmount] = useState(3000)

  // Conservative calculations based on the landing page data
  const monthlyFollowers = Math.round(investmentAmount * 0.5) // 50% return in followers
  const monthlyEngagement = Math.round(investmentAmount * 1.6) // 160% engagement boost
  const potentialRevenue = Math.round(investmentAmount * 3.5) // 3.5x ROI (based on 3-5x claim)
  const roi = Math.round(((potentialRevenue - investmentAmount) / investmentAmount) * 100)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setInvestmentAmount(value)
    onTrack?.('roi_calculator_used', { investment: value, roi })
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-x" />

        {/* Calculator card */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold bg-gradient-to-r from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-full text-button-primary">
              💰 Calculadora de ROI
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Quanto Você Pode <span className="bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">Ganhar?</span>
            </h3>
            <p className="text-text-secondary text-sm">
              Arraste para ver seu potencial de retorno
            </p>
          </div>

          {/* Investment slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-text-secondary">
                Seu Investimento:
              </label>
              <div className="text-2xl font-bold bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">
                R$ {investmentAmount.toLocaleString('pt-BR')}
              </div>
            </div>

            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={investmentAmount}
              onChange={handleSliderChange}
              className="w-full h-3 bg-gradient-to-r from-button-primary/20 to-accent-gold/20 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #E8DCC8 0%, #E8DCC8 ${((investmentAmount - 1000) / 9000) * 100}%, rgba(232, 220, 200, 0.2) ${((investmentAmount - 1000) / 9000) * 100}%, rgba(232, 220, 200, 0.2) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-text-tertiary mt-2">
              <span>R$ 1.000</span>
              <span>R$ 10.000</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Result card 1 */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                +{monthlyFollowers.toLocaleString()}
              </div>
              <div className="text-xs text-text-tertiary">
                Novos Seguidores/Mês
              </div>
            </div>

            {/* Result card 2 */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                +{monthlyEngagement.toLocaleString()}
              </div>
              <div className="text-xs text-text-tertiary">
                Engajamento/Mês
              </div>
            </div>

            {/* Result card 3 */}
            <div className="bg-gradient-to-br from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent mb-1">
                {roi}%
              </div>
              <div className="text-xs text-text-tertiary">
                ROI Estimado
              </div>
            </div>
          </div>

          {/* Revenue projection */}
          <div className="bg-gradient-to-r from-button-primary/10 via-accent-gold/10 to-button-primary/10 border border-button-primary/30 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-text-tertiary mb-1">Retorno Potencial em 90 dias:</p>
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">
                  R$ {potentialRevenue.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-tertiary mb-1">Lucro Líquido:</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-400">
                  +R$ {(potentialRevenue - investmentAmount).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-text-tertiary text-center mt-4 opacity-70">
            * Cálculos baseados em médias de clientes. Resultados podem variar.
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8DCC8, #BD9363);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(232, 220, 200, 0.5);
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(232, 220, 200, 0.8);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8DCC8, #BD9363);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(232, 220, 200, 0.5);
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(232, 220, 200, 0.8);
        }
      `}</style>
    </div>
  )
}
