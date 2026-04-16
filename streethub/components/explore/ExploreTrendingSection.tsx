import type { TrendingCategory } from '@/types/feed';

interface ExploreTrendingSectionProps {
  categories: TrendingCategory[];
}

export function ExploreTrendingSection({ categories }: ExploreTrendingSectionProps) {
  return (
    <section className='bg-neutral-900 border border-neutral-800 rounded-2xl p-4 md:p-6'>
      <h2 className='text-white font-semibold mb-4'>Categorias em tendencia</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-3'>
        {categories.map((category) => (
          <div key={category.name} className='bg-neutral-950 border border-neutral-800 rounded-xl p-3'>
            <p className='text-white font-medium'>#{category.name}</p>
            <p className='text-xs text-neutral-500 mt-1'>{category.count} posts</p>
            <p className='text-xs text-green-400 mt-2'>{category.growth}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
