'use client';

// src/app/calculator/page.tsx
//
// MUDANÇAS vs Figma:
// - useSearchParams() do React Router → useSearchParams() do next/navigation
// - Lógica de cálculo movida para src/lib/calculator.ts
// - Formulário separado em CalculatorForm
// - Resultado separado em CalculatorResultPanel
// - Responsividade adicionada (ml-0 md:ml-64 etc.)
//
// FUTURA INTEGRAÇÃO COM API DE CÂMBIO:
// 1. Criar src/hooks/useExchangeRate.ts
// 2. const { rate, updatedAt } = useExchangeRate()
// 3. Passar rate para CalculatorForm via prop exchangeRate
// 4. CalculatorForm repassa para calculateTotal() via input.exchangeRate

import { useState, Suspense } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import { Sidebar }               from '@/components/layout/Sidebar';
import { Rightsidebar }          from '@/components/layout/RightSidebar';
import { BottomNav }             from '@/components/shared/BottomNav';
import { CalculatorForm }        from '@/components/calculator/CalculatorForm';
import { CalculatorResultPanel } from '@/components/calculator/CalculatorResult';
import { calculateTotal, RATES, type CalculatorResult, type CalculatorInput } from '@/lib/calculator';

// Estado inicial com valores zerados
const DEFAULT_INPUT: CalculatorInput = {
  priceYuan:      0,
  weightKg:       0,
  shippingMethod: 'standard',
  taxed:          false,
};

export default function CalculatorPage() {
  const [result, setResult] = useState<CalculatorResult>(calculateTotal(DEFAULT_INPUT));
  const [input,  setInput]  = useState<CalculatorInput>(DEFAULT_INPUT);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Sidebar />
      <Rightsidebar />
      <BottomNav />

      <main className="ml-0 md:ml-64 mr-0 lg:mr-80 min-h-screen pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <CalcIcon className="w-8 h-8" />
              Calculadora de Importação
            </h1>
            <p className="text-neutral-400">
              Calcule o valor final da sua importação com precisão
            </p>
          </div>

          {/* Grid — formulário + resultado */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* useSearchParams precisa de Suspense no Next.js */}
            <Suspense fallback={<div className="animate-pulse bg-neutral-900 rounded-2xl h-96" />}>
              <CalculatorForm onCalcChange={(r, i) => { setResult(r); setInput(i); }} />
            </Suspense>

            <CalculatorResultPanel result={result} input={input} />

          </div>
        </div>
      </main>
    </div>
  );
}