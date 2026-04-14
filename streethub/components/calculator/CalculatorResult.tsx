// src/components/calculator/CalculatorResult.tsx
// Resumo do cálculo — breakdown de custos + total + dica

import { AlertCircle, Info } from 'lucide-react';
import type { CalculatorResult, CalculatorInput } from '@/lib/calculator';

interface CalculatorResultProps {
  result: CalculatorResult;
  input: CalculatorInput;
}

export function CalculatorResultPanel({ result, input }: CalculatorResultProps) {
  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 lg:sticky lg:top-8">
      <h2 className="text-xl font-bold text-white mb-6">Resumo do Cálculo</h2>

      {/* Breakdown */}
      <div className="space-y-1 mb-6">

        <div className="flex items-center justify-between py-3 border-b border-neutral-800">
          <span className="text-neutral-400">Produto (¥{input.priceYuan || 0})</span>
          <span className="text-white font-semibold">R$ {result.productPriceBRL.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-neutral-800">
          <span className="text-neutral-400">Frete ({input.weightKg}kg)</span>
          <span className="text-white font-semibold">R$ {result.shippingCost.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-neutral-800">
          <span className="text-neutral-400">Taxa Agente (5%)</span>
          <span className="text-white font-semibold">R$ {result.agentFee.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-neutral-800">
          <span className="text-neutral-400">Subtotal</span>
          <span className="text-white font-semibold">R$ {result.subtotal.toFixed(2)}</span>
        </div>

        {input.taxed && (
          <div className="flex items-center justify-between py-3 border-b border-neutral-800">
            <span className="text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Imposto (60%)
            </span>
            <span className="text-red-400 font-semibold">R$ {result.tax.toFixed(2)}</span>
          </div>
        )}

      </div>

      {/* Total */}
      <div className="pt-6 border-t-2 border-neutral-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-neutral-400 text-lg">Total Final</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            R$ {result.total.toFixed(2)}
          </span>
        </div>
        {/* ⚠️ exchangeRateUsed virá da API futuramente */}
        <p className="text-xs text-neutral-500 text-right">
          ≈ ¥{input.priceYuan || 0} × {result.exchangeRateUsed.toFixed(2)} + taxas
        </p>
      </div>

      {/* Dica */}
      <div className="mt-6 pt-6 border-t border-neutral-800">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-300 mb-1">Dica de economia</p>
              <p className="text-blue-400/80">
                Produtos abaixo de US$ 50 têm menor chance de serem taxados!
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}