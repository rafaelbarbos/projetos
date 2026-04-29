'use client';

import type { ShippingAgent, Post } from '@/types/feed';
import type { ActiveSupplierTab } from './SupplierTabs';
import { SupplierProductsGrid } from './SupplierProductsGrid';
import { SupplierReviews } from './SupplierReviews';
import { SupplierInfo } from './SupplierInfo';

interface SupplierContentProps {
  activeTab: ActiveSupplierTab;
  agent: ShippingAgent;
  posts: Post[];
}

export function SupplierContent({
  activeTab,
  agent,
  posts,
}: SupplierContentProps) {
  return (
    <div>
      {activeTab === 'products' && <SupplierProductsGrid posts={posts} />}
      {activeTab === 'reviews' && <SupplierReviews posts={posts} />}
      {activeTab === 'info' && <SupplierInfo agent={agent} />}
    </div>
  );
}
