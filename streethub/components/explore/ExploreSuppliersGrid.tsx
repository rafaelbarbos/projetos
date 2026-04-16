import Link from 'next/link';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import type { SupplierOverview } from './types';

interface ExploreSuppliersGridProps {
  suppliers: SupplierOverview[];
}

export function ExploreSuppliersGrid({ suppliers }: ExploreSuppliersGridProps) {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {suppliers.map((agent) => (
        <article key={agent.id} className='bg-neutral-950 border border-neutral-800 rounded-2xl p-4'>
          <div className='flex items-center gap-3 mb-4'>
            <span className='text-2xl'>{agent.avatar}</span>
            <div className='min-w-0 flex-1'>
              <h3 className='text-white font-semibold truncate'>{agent.name}</h3>
              <p className='text-xs text-neutral-500'>{agent.averageDelivery}</p>
            </div>
            {agent.verified && <CheckCircle className='w-4 h-4 text-green-500 shrink-0' />}
          </div>

          <div className='grid grid-cols-2 gap-2 mb-4'>
            <div className='bg-neutral-900 border border-neutral-800 rounded-lg p-2'>
              <p className='text-xs text-neutral-500'>Rating</p>
              <p className='text-yellow-400 font-semibold'>★ {agent.rating ?? '-'}</p>
            </div>
            <div className='bg-neutral-900 border border-neutral-800 rounded-lg p-2'>
              <p className='text-xs text-neutral-500'>Pedidos</p>
              <p className='text-white font-semibold'>{(agent.totalOrders ?? 0).toLocaleString()}</p>
            </div>
          </div>

          <p className='text-xs text-neutral-500 mb-2'>Posts relacionados</p>
          <div className='space-y-2 mb-4'>
            {agent.relatedPosts.length > 0 ? (
              agent.relatedPosts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`} className='block text-sm text-neutral-300 hover:text-white truncate'>
                  • {post.title}
                </Link>
              ))
            ) : (
              <p className='text-sm text-neutral-500'>Sem posts relacionados.</p>
            )}
          </div>

          <Link
            href={`/suppliers/${agent.id}`}
            className='w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium'
          >
            Ver agente
            <ArrowUpRight className='w-4 h-4' />
          </Link>
        </article>
      ))}
    </div>
  );
}
