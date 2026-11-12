import { request } from './apiClient';

export type ExchangeRate = {
  rate: number;
  updatedAt: string;
  source: 'awesomeapi' | 'fallback';
};

export async function getExchangeRate(): Promise<ExchangeRate> {
  return request<ExchangeRate>('/api/calculator/exchange-rate');
}
