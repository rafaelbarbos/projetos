'use client';

import Link from 'next/link';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';
import type { Post } from '@/types/feed';

interface SupplierReviewsProps {
  posts: Post[];
}

export function SupplierReviews({ posts }: SupplierReviewsProps) {
  // Extrair todos os comentários dos posts que usam esse agente
  const allComments = posts
    .filter((p) => p.comments && p.comments.length > 0)
    .flatMap((p) =>
      p.comments.map((c) => ({
        ...c,
        postId: p.id,
        postTitle: p.title,
      }))
    )
    .sort((a, b) => Number(b.likes) - Number(a.likes));

  if (allComments.length === 0) {
    return (
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-12 text-center">
        <MessageSquare className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Nenhuma avaliação ainda
        </h3>
        <p className="text-neutral-400">
          Os comentários sobre os produtos aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allComments.map((comment) => (
        <div
          key={comment.id}
          className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6"
        >
          {/* Cabeçalho do comentário */}
          <div className="flex items-start gap-4 mb-4">
            <Link href={`/${comment.user.username}`}>
              <Avatar
                src={comment.user.avatar}
                name={comment.user.displayName}
                size="md"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/${comment.user.username}`}
                className="hover:opacity-80"
              >
                <p className="font-semibold text-white">
                  {comment.user.displayName}
                </p>
                <p className="text-xs text-neutral-500">
                  @{comment.user.username}
                </p>
              </Link>
            </div>

            <div className="text-right">
              <p className="text-xs text-neutral-500">{comment.timestamp}</p>
              <p className="text-xs text-neutral-500">
                {comment.likes > 0 && `${comment.likes} curtidas`}
              </p>
            </div>
          </div>

          {/* Texto do comentário */}
          <p className="text-neutral-300 mb-4">{comment.text}</p>

          {/* Link para o post */}
          <Link href={`/post/${comment.postId}`}>
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 hover:bg-neutral-800 transition-colors">
              <p className="text-xs text-neutral-500 mb-1">Comentado em:</p>
              <p className="text-sm text-white font-medium truncate">
                {comment.postTitle}
              </p>
            </div>
          </Link>

          {/* Botão curtir */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-800">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">Útil</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
