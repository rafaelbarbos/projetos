'use client';

import Link from 'next/link';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface SupplierInfoProps {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  rating?: number;
  totalOrders?: number;
  productLink?: string;
}

export function SupplierInfo({
  id,
  name,
  avatar,
  verified,
  rating,
  totalOrders,
  productLink,
}: SupplierInfoProps) {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-neutral-800 mb-3">
      <Link
        href={`/suppliers/${id}`}
        className="flex items-center gap-2 hover:opacity-80"
      >
        <span className="text-lg">{avatar}</span>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-white">{name}</span>
            {verified && <CheckCircle className="w-3 h-3 text-green-500" />}
          </div>
          <div className="flex items-center gap-2 text-xs">
            {rating && <span className="text-yellow-500">★ {rating}</span>}
            {rating && totalOrders && <span className="text-neutral-600">•</span>}
            {totalOrders && (
              <span className="text-neutral-500">{totalOrders.toLocaleString()} pedidos</span>
            )}
          </div>
        </div>
      </Link>

      {productLink && (
        <a
          href={productLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/60 rounded-xl text-sm font-medium text-purple-100 shadow-[0_0_0_1px_rgba(168,85,247,0.2)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
          aria-label="Abrir link do produto"
        >
          <ExternalLink className="w-4.5 h-4.5" />
          Ver produto
        </a>
      )}
    </div>
  );
}
