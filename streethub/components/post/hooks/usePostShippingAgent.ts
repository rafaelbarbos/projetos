import { useMemo } from 'react';
import type { Post } from '@/types/feed';

export interface NormalizedShippingAgent {
  id: string;
  name: string;
  avatar: string;
  averageDelivery: string;
  verified: boolean;
  rating?: number;
  totalOrders?: number;
}

export function usePostShippingAgent(post: Post): NormalizedShippingAgent {
  return useMemo(
    () => ({
      id: post.shippingAgent?.id ?? post.supplier?.id ?? 'unknown',
      name: post.shippingAgent?.name ?? post.supplier?.name ?? 'Agente nao informado',
      avatar: post.shippingAgent?.avatar ?? post.supplier?.avatar ?? '📦',
      averageDelivery: post.shippingAgent?.averageDelivery ?? post.supplier?.responseTime ?? '-',
      verified: post.shippingAgent?.verified ?? post.supplier?.verified ?? false,
      rating: post.shippingAgent?.rating ?? post.supplier?.rating,
      totalOrders: post.shippingAgent?.totalOrders ?? post.supplier?.totalOrders,
    }),
    [post.shippingAgent, post.supplier]
  );
}