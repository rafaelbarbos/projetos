'use client';

interface PostCardPricingProps {
  priceYuan: number;
  priceReal: number;
}

export function PostCardPricing({ priceYuan, priceReal }: PostCardPricingProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Preço original</p>
        <p className="text-lg font-bold text-yellow-400">¥{priceYuan}</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Estimado BR</p>
        <p className="text-lg font-bold text-green-400">R$ {priceReal.toFixed(2)}</p>
      </div>
    </div>
  );
}
