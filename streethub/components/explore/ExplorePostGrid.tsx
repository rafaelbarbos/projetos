import Link from 'next/link';
import type { Post } from '@/types/feed';

interface ExplorePostGridProps {
  posts: Post[];
}

export function ExplorePostGrid({ posts }: ExplorePostGridProps) {
  if (posts.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-white font-semibold'>Nenhum item encontrado</p>
        <p className='text-neutral-500 text-sm mt-1'>Tente outros termos de busca ou filtros.</p>
      </div>
    );
  }

  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {posts.map((post) => {
        const greenLights = post.greenLights ?? 0;
        const redLights = post.redLights ?? 0;
        const totalVotes = greenLights + redLights;
        const quality = totalVotes > 0 ? Math.round((greenLights / totalVotes) * 100) : 0;
        const image = post.images?.[0] ?? post.image;

        return (
          <article key={post.id} className='bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden'>
            <Link href={`/post/${post.id}`}>
              <div className='aspect-4/3 bg-neutral-900'>
                {image && <img src={image} alt={post.title} className='w-full h-full object-cover' />}
              </div>
            </Link>

            <div className='p-4'>
              <div className='flex items-center justify-between gap-2 mb-2'>
                <span className='text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-300'>{post.category}</span>
                <span className='text-xs text-neutral-500'>{post.timestamp}</span>
              </div>

              <Link href={`/post/${post.id}`} className='hover:opacity-80'>
                <h3 className='font-semibold text-white line-clamp-2 mb-2'>{post.title}</h3>
              </Link>

              {post.description && <p className='text-sm text-neutral-400 line-clamp-2 mb-3'>{post.description}</p>}

              <div className='grid grid-cols-2 gap-2 mb-3'>
                <div className='bg-neutral-900 border border-neutral-800 rounded-lg p-2'>
                  <p className='text-xs text-neutral-500'>Preco</p>
                  <p className='text-yellow-400 font-semibold'>¥{post.priceYuan}</p>
                </div>
                <div className='bg-neutral-900 border border-neutral-800 rounded-lg p-2'>
                  <p className='text-xs text-neutral-500'>Estimado BR</p>
                  <p className='text-green-400 font-semibold'>R$ {post.priceReal.toFixed(2)}</p>
                </div>
              </div>

              <div className='flex items-center justify-between text-xs mb-3'>
                <p className='text-neutral-400'>GL/RL</p>
                <p className='text-white font-medium'>{greenLights}/{redLights}</p>
              </div>
              <div className='w-full h-2 bg-neutral-800 rounded-full overflow-hidden mb-3'>
                <div className='h-full bg-linear-to-r from-green-500 to-green-400' style={{ width: `${quality}%` }} />
              </div>

              <div className='flex items-center justify-between text-xs mb-4'>
                <span className='text-neutral-500'>{post.shippingAgent?.name ?? post.supplier?.name ?? 'Agente'}</span>
                <span className='text-purple-400 font-medium'>{quality}% qualidade</span>
              </div>

              <div className='flex items-center gap-2'>
                <Link
                  href={`/post/${post.id}`}
                  className='flex-1 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm text-center font-medium'
                >
                  Ver detalhes
                </Link>
                <Link
                  href={`/calculator?yuan=${post.priceYuan}`}
                  className='inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium'
                >
                  Calc
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
