'use client';

// src/components/calculator/CalculatorForm.tsx
// Inputs do usuário — preço, peso, método de envio, toggle de taxa
//
// MUDANÇAS vs Figma:
// - useSearchParams() do React Router → useSearchParams() do next/navigation
// - Lógica de cálculo movida para src/lib/calculator.ts
// - Estado centralizado aqui e resultado passado via prop onCalcChange

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package, Plane, AlertCircle } from 'lucide-react';
import { calculateTotal, RATES, type CalculatorInput, type CalculatorResult } from '@/lib/calculator';

interface CalculatorFormProps {
  onCalcChange: (result: CalculatorResult, input: CalculatorInput) => void;
}

export function CalculatorForm({ onCalcChange }: CalculatorFormProps) {
  const searchParams   = useSearchParams();
  const initialYuan    = searchParams.get('yuan') || '';

  const [priceYuan,      setPriceYuan]      = useState(initialYuan);
  const [weight,         setWeight]         = useState('0.5');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [taxed,          setTaxed]          = useState(false);

  // Recalcula sempre que qualquer input mudar
  useEffect(() => {
    const input: CalculatorInput = {
      priceYuan:      parseFloat(priceYuan) || 0,
      weightKg:       parseFloat(weight)    || 0,
      shippingMethod,
      taxed,
      // exchangeRate: rate, ← descomentar quando hook da API estiver pronto
    };
    onCalcChange(calculateTotal(input), input);
  }, [priceYuan, weight, shippingMethod, taxed]);

  return (
    <div className="space-y-6">

      {/* Preço em Yuan */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <label className="block text-sm font-medium text-neutral-300 mb-3">
          Preço do Produto (¥)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 font-bold text-xl">¥</span>
          <input
            type="number"
            value={priceYuan}
            onChange={(e) => setPriceYuan(e.target.value)}
            placeholder="158"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-4 text-white text-2xl font-bold placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        {/* ⚠️ Cotação estática — substituir por valor da API quando disponível */}
        <p className="text-xs text-neutral-500 mt-2">
          Cotação atual: 1 ¥ = R$ {RATES.YUAN_TO_BRL.toFixed(2)}
        </p>
      </div>

      {/* Peso */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <label className="block text-sm font-medium text-neutral-300 mb-3">
          Peso Estimado (kg)
        </label>
        <div className="relative">
          <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-500" />
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="0.5"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-14 pr-4 py-4 text-white text-xl font-semibold placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <p className="text-xs text-neutral-500 mt-2">Peso aproximado para cálculo de frete</p>
      </div>

      {/* Método de envio */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-3">
          <Plane className="w-5 h-5" />
          Método de Envio
        </label>
        <div className="space-y-3">
          <button
            onClick={() => setShippingMethod('standard')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              shippingMethod === 'standard'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-semibold text-white">Standard (Navio)</p>
                <p className="text-sm text-neutral-400">30-45 dias • R$ {RATES.SHIPPING_STANDARD}/kg</p>
              </div>
              <span className="text-green-400 font-bold text-sm">Econômico</span>
            </div>
          </button>

          <button
            onClick={() => setShippingMethod('express')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              shippingMethod === 'express'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-semibold text-white">Express (Avião)</p>
                <p className="text-sm text-neutral-400">7-15 dias • R$ {RATES.SHIPPING_EXPRESS}/kg</p>
              </div>
              <span className="text-blue-400 font-bold text-sm">Rápido</span>
            </div>
          </button>
        </div>
      </div>

      {/* Toggle taxa */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="flex items-center gap-2 font-medium text-white mb-1">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              Produto será taxado?
            </label>
            <p className="text-sm text-neutral-400">
              +{RATES.TAX_RATE * 100}% sobre o valor total (produto + frete)
            </p>
          </div>
          <button
            onClick={() => setTaxed(!taxed)}
            className={`w-14 h-8 rounded-full transition-all flex-shrink-0 ${
              taxed ? 'bg-red-500' : 'bg-neutral-700'
            }`}
          >
            <div className={`w-6 h-6 bg-white rounded-full transition-all mt-1 ${
              taxed ? 'ml-7' : 'ml-1'
            }`} />
          </button>
        </div>
      </div>

    </div>
  );
}