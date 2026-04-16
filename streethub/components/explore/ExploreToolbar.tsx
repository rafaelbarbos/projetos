import { EXPLORE_SORT_OPTIONS, EXPLORE_TAB_ITEMS } from './config';
import type { ExploreTab, SortMode } from './types';

interface ExploreToolbarProps {
  activeTab: ExploreTab;
  onTabChange: (tab: ExploreTab) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortMode: SortMode;
  onSortModeChange: (mode: SortMode) => void;
}

export function ExploreToolbar({
  activeTab,
  onTabChange,
  categories,
  activeCategory,
  onCategoryChange,
  sortMode,
  onSortModeChange,
}: ExploreToolbarProps) {
  return (
    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5'>
      <div className='flex flex-wrap gap-2'>
        {EXPLORE_TAB_ITEMS.map((tab) => (
          <button
            key={tab.id}
            type='button'
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-neutral-800 text-white'
                : 'bg-neutral-950 text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'posts' && (
        <div className='flex flex-wrap gap-2'>
          <select
            value={activeCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className='bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500'
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortMode}
            onChange={(e) => onSortModeChange(e.target.value as SortMode)}
            className='bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500'
          >
            {EXPLORE_SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
