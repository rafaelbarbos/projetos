import { Compass, Search, Sparkles } from 'lucide-react';
import { EXPLORE_QUICK_FILTERS } from './config';
import type { QuickFilterId } from './types';

interface ExploreHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeQuick: QuickFilterId;
  onQuickChange: (id: QuickFilterId) => void;
}

export function ExploreHeader({ search, onSearchChange, activeQuick, onQuickChange }: ExploreHeaderProps) {
  return (
    <section className='bg-neutral-900 border border-neutral-800 rounded-2xl p-6'>
      <div className='flex items-start justify-between gap-4 mb-5'>
        <div>
          <h1 className='text-3xl font-bold text-white flex items-center gap-2'>
            <Compass className='w-7 h-7 text-purple-400' />
            Explore
          </h1>
          <p className='text-neutral-400 mt-1'>
            Descubra produtos, agentes e perfis com melhor custo-beneficio e confianca.
          </p>
        </div>
        <div className='hidden md:flex items-center gap-2 text-xs text-neutral-500 bg-neutral-950 border border-neutral-800 rounded-full px-3 py-1.5'>
          <Sparkles className='w-3.5 h-3.5 text-purple-400' />
          Curadoria por score de qualidade
        </div>
      </div>

      <div className='relative mb-4'>
        <Search className='w-5 h-5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2' />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Busque por produto, categoria, agente ou usuario...'
          className='w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500'
        />
      </div>

      <div className='flex flex-wrap gap-2'>
        {EXPLORE_QUICK_FILTERS.map((item) => (
          <button
            key={item.id}
            type='button'
            onClick={() => onQuickChange(item.id)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
              activeQuick === item.id
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
