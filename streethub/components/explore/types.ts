import type { ReactNode } from 'react';
import type { Post, ShippingAgent } from '@/types/feed';

export type ExploreTab = 'posts' | 'suppliers' | 'users';
export type SortMode = 'quality' | 'recent' | 'price' | 'delivery';
export type QuickFilterId = 'trend' | 'quality' | 'delivery' | 'price';

export interface ExploreTabItem {
  id: ExploreTab;
  label: string;
  icon: ReactNode;
}

export interface QuickFilterOption {
  id: QuickFilterId;
  label: string;
  icon: ReactNode;
}

export interface SortOption {
  id: SortMode;
  label: string;
}

export interface SupplierOverview extends ShippingAgent {
  relatedPosts: Post[];
  score: number;
}
