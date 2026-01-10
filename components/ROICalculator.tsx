'use client'

import { useState } from 'react'

interface ROICalculatorProps {
  onTrack?: (event: string, props: any) => void
}

export default function ROICalculator({ onTrack }: ROICalculatorProps) {
  const [investmentAmount, setInvestmentAmount] = useState(3000)
  const [clientType, setClientType] = useState<'baixo' | 'medio' | 'alto'>('medio')

  // Valor médio de ticket por tipo de negócio (valores conservadores do mercado)
  const ticketValues = {
    baixo: 500,   // Produtos digitais, consultorias básicas
    medio: 2000,  // Serviços profissionais, mentorias
    alto: 8000    // Serviços premium, transformações completas
  }

  // Taxa de conversão realista (baseada em dados do mercado digital)
  // Instagram com gestão profissional: 2-5% de conversão de seguidores para leads
  // Leads para clientes: 10-30% dependendo do funil
  const conversionRate = 0.025 // 2.5% conversão conservadora

  // Crescimento de seguidores qualificados por mês
  // Base: Gestão profissional gera 300-800 seguidores qualificados/mês
  // Aqui calculamos proporcionalmente ao investimento
  const baseFollowers = 500 // seguidores base para investimento médio (R$3000)
  const growthMultiplier = investmentAmount / 3000
  const monthlyFollowers = Math.round(baseFollowers * growthMultiplier)

  // Engajamento qualificado (comentários, salvamentos, compartilhamentos)
  // Perfil bem gerido: 150-300 interações qualificadas/mês
  const baseEngagement = 200
  const monthlyEngagement = Math.round(baseEngagement * growthMultiplier * 1.2)

  // Cálculo de leads potenciais
  const monthlyLeads = Math.round(monthlyFollowers * conversionRate)

  // Conversão de leads para clientes (15% é taxa conservadora)
  const leadToClientRate = 0.15
  const monthlyClients = Math.max(1, Math.round(monthlyLeads * leadToClientRate))

  // Receita baseada no ticket médio do tipo de cliente
  const monthlyRevenue = monthlyClients * ticketValues[clientType]
  const quarterlyRevenue = monthlyRevenue * 3 // 90 dias

  // ROI em 90 dias
  const roi = Math.round(((quarterlyRevenue - investmentAmount) / investmentAmount) * 100)

  // Valor vitalício do cliente (LTV)
  // Cliente médio compra 2.5x ao longo de 12 meses
  const ltv = monthlyClients * ticketValues[clientType] * 2.5

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setInvestmentAmount(value)
    onTrack?.('roi_calculator_used', { investment: value, roi, clientType })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-button-primary via-accent-gold to-button-primary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-x" />

        {/* Calculator card */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold bg-gradient-to-r from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-full text-button-primary">
              💰 Calculadora de ROI Realista
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Calcule Seu <span className="bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">Retorno Real</span>
            </h3>
            <p className="text-text-secondary text-sm">
              Baseado em dados reais do mercado digital
            </p>
          </div>

          {/* Tipo de Cliente */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-secondary mb-3">
              Qual seu ticket médio por venda?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setClientType('baixo')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${clientType === 'baixo'
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/50 shadow-lg shadow-green-500/20'
                  : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
              >
                <div className="text-2xl mb-1">💚</div>
                <div className="font-bold text-sm">R$ 300-800</div>
                <div className="text-xs text-text-tertiary mt-1">Produtos digitais</div>
              </button>
              <button
                onClick={() => setClientType('medio')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${clientType === 'medio'
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
              >
                <div className="text-2xl mb-1">💙</div>
                <div className="font-bold text-sm">R$ 1.500-3.000</div>
                <div className="text-xs text-text-tertiary mt-1">Serviços profissionais</div>
              </button>
              <button
                onClick={() => setClientType('alto')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${clientType === 'alto'
                  ? 'bg-gradient-to-br from-button-primary/20 to-accent-gold/20 border-button-primary/50 shadow-lg shadow-button-primary/20'
                  : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
              >
                <div className="text-2xl mb-1">💛</div>
                <div className="font-bold text-sm">R$ 5.000+</div>
                <div className="text-xs text-text-tertiary mt-1">Serviços premium</div>
              </button>
            </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {/* Seguidores */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">
                +{monthlyFollowers.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-xs text-text-tertiary">
                Seguidores/mês
              </div>
            </div>

            {/* Engajamento */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
                +{monthlyEngagement.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-xs text-text-tertiary">
                Interações/mês
              </div>
            </div>

            {/* Leads */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">
                ~{monthlyLeads}
              </div>
              <div className="text-[10px] sm:text-xs text-text-tertiary">
                Leads/mês
              </div>
            </div>

            {/* Clientes */}
            <div className="bg-gradient-to-br from-button-primary/20 to-accent-gold/20 border border-button-primary/30 rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent mb-1">
                {monthlyClients}
              </div>
              <div className="text-[10px] sm:text-xs text-text-tertiary">
                Clientes/mês
              </div>
            </div>
          </div>

          {/* Revenue projections */}
          <div className="space-y-3 mb-6">
            {/* Receita 90 dias */}
            <div className="bg-gradient-to-r from-button-primary/10 via-accent-gold/10 to-button-primary/10 border border-button-primary/30 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs text-text-tertiary mb-1">💰 Receita em 90 dias:</p>
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-button-primary to-accent-gold bg-clip-text text-transparent">
                    R$ {quarterlyRevenue.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-tertiary mb-1">📈 ROI:</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">
                    {roi > 0 ? '+' : ''}{roi}%
                  </p>
                </div>
              </div>
            </div>

            {/* Lucro líquido */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs text-text-tertiary mb-1">💵 Lucro Líquido (90 dias):</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">
                    +R$ {(quarterlyRevenue - investmentAmount).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-tertiary mb-1">🎯 LTV (12 meses):</p>
                  <p className="text-lg sm:text-xl font-bold text-text-primary">
                    R$ {ltv.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metodologia */}
          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <details className="group/details">
              <summary className="cursor-pointer text-sm font-semibold text-text-secondary flex items-center justify-between">
                <span>📊 Como calculamos isso?</span>
                <svg className="w-4 h-4 transition-transform group-open/details:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-3 space-y-2 text-xs text-text-tertiary">
                <p><strong className="text-button-primary">• Seguidores:</strong> Gestão profissional gera 300-800 seguidores qualificados/mês (variação por investimento)</p>
                <p><strong className="text-button-primary">• Conversão para Leads:</strong> 2.5% dos seguidores (taxa conservadora do mercado)</p>
                <p><strong className="text-button-primary">• Leads para Clientes:</strong> 15% de conversão (com funil profissional)</p>
                <p><strong className="text-button-primary">• LTV:</strong> Cliente médio compra 2.5x ao longo de 12 meses</p>
                <p className="text-accent-gold pt-2">✨ Valores baseados em médias reais de negócios geridos profissionalmente</p>
              </div>
            </details>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-text-tertiary text-center opacity-70">
            * Projeções baseadas em médias reais do mercado. Resultados individuais podem variar conforme nicho, produto e execução.
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
