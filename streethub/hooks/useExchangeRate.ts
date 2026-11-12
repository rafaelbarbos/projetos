'use client';

import { useEffect, useState } from 'react';
import { getExchangeRate } from '@/lib/calculatorApi';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { RATES } from '@/lib/calculator';

interface UseExchangeRateReturn {
  rate: number;
  updatedAtLabel: string | null;
  isLive: boolean;
  loading: boolean;
}

export function useExchangeRate(): UseExchangeRateReturn {
  const [rate, setRate] = useState(RATES.YUAN_TO_BRL);
  const [updatedAtLabel, setUpdatedAtLabel] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getExchangeRate()
      .then((data) => {
        if (!active) return;
        setRate(data.rate);
        setUpdatedAtLabel(formatRelativeTime(data.updatedAt));
        setIsLive(data.source === 'awesomeapi');
      })
      .catch(() => {
        // Mantém o fallback fixo (RATES.YUAN_TO_BRL) já no estado inicial.
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { rate, updatedAtLabel, isLive, loading };
}
