'use client';

import { Package, MessageSquare, Info } from 'lucide-react';

export type ActiveSupplierTab = 'products' | 'reviews' | 'info';

interface SupplierTabsProps {
  activeTab: ActiveSupplierTab;
  onTabChange: (tab: ActiveSupplierTab) => void;
}

interface TabItem {
  id: ActiveSupplierTab;
  label: string;
  icon: React.ReactNode;
}

export function SupplierTabs({
  activeTab,
  onTabChange,
}: SupplierTabsProps) {
  const tabs: TabItem[] = [
    {
      id: 'products',
      label: 'Produtos',
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: 'reviews',
      label: 'Avaliações',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      id: 'info',
      label: 'Informações',
      icon: <Info className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-8">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:bg-neutral-950 hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
