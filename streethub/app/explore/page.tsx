'use client';

import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Rightsidebar } from '@/components/layout/RightSidebar';
import { BottomNav } from '@/components/shared/BottomNav';
import { currentUser, mockPosts, mockShippingAgents, mockUsers, trendingCategories } from '@/data/mockData';
import {
  ExploreHeader,
  ExploreToolbar,
  ExplorePostGrid,
  ExploreSuppliersGrid,
  ExploreUsersGrid,
  ExploreTrendingSection,
  getDeliveryDays,
  getPostScore,
  normalizeText,
} from '@/components/explore';
import type { ExploreTab, SortMode, QuickFilterId, SupplierOverview } from '@/components/explore';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<ExploreTab>('posts');
  const [search, setSearch] = useState('');
  const [activeQuick, setActiveQuick] = useState<QuickFilterId>('trend');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [sortMode, setSortMode] = useState<SortMode>('quality');

  const categories = useMemo(() => ['Todas', ...new Set(mockPosts.map((post) => post.category))], []);

  const filteredPosts = useMemo(() => {
    const query = normalizeText(search);

    const filtered = mockPosts.filter((post) => {
      const haystack = normalizeText([
        post.title,
        post.description ?? '',
        post.user.displayName,
        post.user.username,
        post.category,
        post.shippingAgent?.name ?? post.supplier?.name ?? '',
      ].join(' '));

      const matchQuery = !query || haystack.includes(query);
      const matchCategory = activeCategory === 'Todas' || post.category === activeCategory;

      return matchQuery && matchCategory;
    });

    const ranked = [...filtered];

    ranked.sort((a, b) => {
      if (sortMode === 'price') {
        return a.priceReal - b.priceReal;
      }

      if (sortMode === 'delivery') {
        return getDeliveryDays(a.warehouseTime) - getDeliveryDays(b.warehouseTime);
      }

      if (sortMode === 'recent') {
        return Number(b.id) - Number(a.id);
      }

      return getPostScore(b) - getPostScore(a);
    });

    if (activeQuick === 'price') {
      ranked.sort((a, b) => a.priceReal - b.priceReal);
    }

    if (activeQuick === 'delivery') {
      ranked.sort((a, b) => getDeliveryDays(a.warehouseTime) - getDeliveryDays(b.warehouseTime));
    }

    if (activeQuick === 'quality') {
      ranked.sort((a, b) => getPostScore(b) - getPostScore(a));
    }

    return ranked;
  }, [activeCategory, activeQuick, search, sortMode]);

  const supplierOverview = useMemo<SupplierOverview[]>(() => {
    const query = normalizeText(search);

    return mockShippingAgents
      .map((agent) => {
        const relatedPosts = mockPosts.filter((post) => post.shippingAgent?.id === agent.id).slice(0, 3);

        return {
          ...agent,
          relatedPosts,
          score: (agent.rating ?? 0) * 0.6 + Math.min((agent.totalOrders ?? 0) / 40000, 1) * 0.4,
        };
      })
      .filter((agent) => {
        if (!query) {
          return true;
        }

        return normalizeText(`${agent.name} ${agent.averageDelivery}`).includes(query);
      })
      .sort((a, b) => b.score - a.score);
  }, [search]);

  const usersOverview = useMemo(() => {
    const query = normalizeText(search);

    return mockUsers
      .filter((user) => user.id !== currentUser.id)
      .filter((user) => {
        if (!query) {
          return true;
        }

        return normalizeText(`${user.displayName} ${user.username} ${user.bio ?? ''}`).includes(query);
      })
      .sort((a, b) => b.reputation - a.reputation);
  }, [search]);

  return (
    <div className='min-h-screen bg-neutral-950'>
      <Sidebar />
      <Rightsidebar />
      <BottomNav />

      <main className='min-h-screen ml-0 md:ml-64 mr-0 lg:mr-80 pb-16 md:pb-0'>
        <div className='max-w-6xl mx-auto p-4 md:p-8 space-y-6'>
          <ExploreHeader
            search={search}
            onSearchChange={setSearch}
            activeQuick={activeQuick}
            onQuickChange={setActiveQuick}
          />

          <section className='bg-neutral-900 border border-neutral-800 rounded-2xl p-4 md:p-6'>
            <ExploreToolbar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sortMode={sortMode}
              onSortModeChange={setSortMode}
            />

            {activeTab === 'posts' && (
              <ExplorePostGrid posts={filteredPosts} />
            )}

            {activeTab === 'suppliers' && (
              <ExploreSuppliersGrid suppliers={supplierOverview} />
            )}

            {activeTab === 'users' && (
              <ExploreUsersGrid users={usersOverview} />
            )}
          </section>

          <ExploreTrendingSection categories={trendingCategories} />
        </div>
      </main>
    </div>
  );
}
