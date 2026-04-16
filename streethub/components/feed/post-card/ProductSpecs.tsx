'use client';

import { Weight, Clock } from 'lucide-react';

interface ProductSpecsProps {
  weight?: string | number;
  warehouseTime?: string;
}

export function ProductSpecs({ weight, warehouseTime }: ProductSpecsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-800">
      <div className="flex items-center gap-2 text-xs">
        <Weight className="w-3.5 h-3.5 text-neutral-500" />
        <span className="text-neutral-400">Peso:</span>
        <span className="text-white font-medium">
          {weight ? `${weight}kg` : 'N/I'}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <Clock className="w-3.5 h-3.5 text-neutral-500" />
        <span className="text-neutral-400">Warehouse:</span>
        <span className="text-white font-medium">{warehouseTime ?? 'N/I'}</span>
      </div>
    </div>
  );
}
