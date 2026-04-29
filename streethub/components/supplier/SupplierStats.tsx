'use client';

import { Star, Package, Clock, TrendingUp } from 'lucide-react';
import type { ShippingAgent } from '@/types/feed';

interface SupplierStatsProps {
  agent: ShippingAgent;
  postsCount: number;
}

export function SupplierStats({ agent, postsCount }: SupplierStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* Posts */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xl">📦</span>
          <Package className="w-4 h-4 text-neutral-500" />
        </div>
        <p className="text-3xl font-bold text-white mb-1">{postsCount}</p>
        <p className="text-sm text-neutral-400">Produtos listados</p>
      </div>

      {/* Rating */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xl">⭐</span>
          <Star className="w-4 h-4 text-yellow-500" />
        </div>
        <p className="text-3xl font-bold text-yellow-400 mb-1">
          {agent.rating || 4.9}
        </p>
        <p className="text-sm text-neutral-400">Avaliação média</p>
      </div>

      {/* Total Orders */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xl">🛍️</span>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-green-400 mb-1">
          {((agent.totalOrders || 0) / 1000).toFixed(0)}k
        </p>
        <p className="text-sm text-neutral-400">Pedidos totais</p>
      </div>

      {/* Average Delivery */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xl">✈️</span>
          <Clock className="w-4 h-4 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-blue-400 mb-1">
          {agent.averageDelivery}
        </p>
        <p className="text-sm text-neutral-400">Tempo de entrega</p>
      </div>
    </div>
  );
}
