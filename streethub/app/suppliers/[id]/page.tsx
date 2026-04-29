'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { Rightsidebar } from '@/components/layout/RightSidebar';
import { BottomNav } from '@/components/shared/BottomNav';
import { SupplierHeader } from '@/components/supplier/SupplierHeader';
import { SupplierStats } from '@/components/supplier/SupplierStats';
import { SupplierTabs } from '@/components/supplier/SupplierTabs';
import { SupplierContent } from '@/components/supplier/SupplierContent';
import { mockShippingAgents, mockPosts } from '@/data/mockData';
import { useState } from 'react';
import type { ActiveSupplierTab } from '@/components/supplier/SupplierTabs';

export default function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<ActiveSupplierTab>('products');

  // Buscar agente pelos dados mock
  const agent = mockShippingAgents.find((a) => a.id === id);

  if (!agent) {
    notFound();
  }

  // Filtrar posts que usam esse agente
  const agentPosts = mockPosts.filter((p) => p.shippingAgent?.id === agent.id);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Sidebar />
      <Rightsidebar />
      <BottomNav />

      <main className="ml-0 md:ml-64 mr-0 lg:mr-80 min-h-screen pb-16 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {/* Botão voltar */}
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Explorar
          </Link>

          {/* Header do agente */}
          <SupplierHeader agent={agent} />

          {/* Stats */}
          <SupplierStats agent={agent} postsCount={agentPosts.length} />

          {/* Tabs */}
          <SupplierTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Conteúdo da aba ativa */}
          <SupplierContent
            activeTab={activeTab}
            agent={agent}
            posts={agentPosts}
          />
        </div>
      </main>
    </div>
  );
}
