import { Compass, Store, Users, Flame, ShieldCheck, Clock3, DollarSign } from 'lucide-react';
import type { ExploreTabItem, QuickFilterOption, SortOption } from './types';

export const EXPLORE_TAB_ITEMS: ExploreTabItem[] = [
  { id: 'posts', label: 'Itens', icon: <Compass className='w-4 h-4' /> },
  { id: 'suppliers', label: 'Agentes', icon: <Store className='w-4 h-4' /> },
  { id: 'users', label: 'Usuarios', icon: <Users className='w-4 h-4' /> },
];

export const EXPLORE_QUICK_FILTERS: QuickFilterOption[] = [
  { id: 'trend', label: 'Em alta', icon: <Flame className='w-4 h-4' /> },
  { id: 'quality', label: 'Melhor qualidade', icon: <ShieldCheck className='w-4 h-4' /> },
  { id: 'delivery', label: 'Entrega rapida', icon: <Clock3 className='w-4 h-4' /> },
  { id: 'price', label: 'Melhor preco', icon: <DollarSign className='w-4 h-4' /> },
];

export const EXPLORE_SORT_OPTIONS: SortOption[] = [
  { id: 'quality', label: 'Qualidade' },
  { id: 'recent', label: 'Mais recentes' },
  { id: 'price', label: 'Menor preco' },
  { id: 'delivery', label: 'Entrega' },
];
