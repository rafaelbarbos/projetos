'use client';

import Link from 'next/link';
import { Grid3x3 } from 'lucide-react';
import type { Post } from '@/types/feed';

interface SupplierProductsGridProps {
  posts: Post[];
}

export function SupplierProductsGrid({ posts }: SupplierProductsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-12 text-center">
        <Grid3x3 className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Nenhum produto listado
        </h3>
        <p className="text-neutral-400">
          Este agente ainda não tem produtos com este filtro.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {posts.map((post) => {
        const greenLights = post.greenLights ?? 0;
        const redLights = post.redLights ?? 0;
        const totalVotes = greenLights + redLights;
        const quality = totalVotes > 0 ? Math.round((greenLights / totalVotes) * 100) : 0;
        const image = post.images?.[0] ?? post.image;

        return (
          <article
            key={post.id}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all"
          >
            <Link href={`/post/${post.id}`}>
              <div className="aspect-4/3 bg-neutral-900 overflow-hidden">
                {image && (
                  <img
                    src={image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                )}
              </div>
            </Link>

            <div className="p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-300">
                  {post.category}
                </span>
                <span className="text-xs text-neutral-500">{post.timestamp}</span>
              </div>

              <Link href={`/post/${post.id}`} className="hover:opacity-80">
                <h3 className="font-semibold text-white line-clamp-2 mb-2">
                  {post.title}
                </h3>
              </Link>

              {post.description && (
                <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
                  {post.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2">
                  <p className="text-xs text-neutral-500">Preço</p>
                  <p className="text-yellow-400 font-semibold">¥{post.priceYuan}</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2">
                  <p className="text-xs text-neutral-500">BR</p>
                  <p className="text-green-400 font-semibold">
                    R$ {post.priceReal.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mb-3">
                <p className="text-neutral-400">GL/RL</p>
                <p className="text-white font-medium">
                  {greenLights}/{redLights}
                </p>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400"
                  style={{ width: `${quality}%` }}
                />
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/post/${post.id}`}
                  className="flex-1 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm text-center font-medium transition-colors"
                >
                  Ver detalhes
                </Link>
                <Link
                  href={`/calculator?yuan=${post.priceYuan}`}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium transition-all"
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
