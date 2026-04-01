'use client';

// src/components/post/PostComments.tsx
// 'use client' necessário por useState (texto do comentário)
//
// MUDANÇAS vs Figma:
// - <form onSubmit> → <div> + onClick (Next.js não usa form HTML)
// - <img src fixo> → <Avatar> com currentUser
// - Link to= → Link href=
// - /user/${id} → /${username}

import { useState } from 'react';
import Link from 'next/link';
import { Send, Heart, CheckCircle } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';
import { currentUser } from '@/data/mockData';
import type { Post } from '@/types/feed';

// ⚠️ currentUser → substituir pelo contexto de autenticação

interface PostCommentsProps {
  post: Post;
}

export function PostComments({ post }: PostCommentsProps) {
  const [commentText, setCommentText] = useState('');

  const handleComment = () => {
    if (!commentText.trim()) return;
    setCommentText('');
    // ⚠️ Mock — substituir por: await fetch(`/api/posts/${post.id}/comments`, { method: 'POST', body: ... })
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">
        Comentários ({post.comments.length})
      </h2>

      {/* Formulário de comentário */}
      <div className="flex gap-3 mb-6">
        <Avatar
          src={currentUser.avatar}
          name={currentUser.displayName}
          size="md"
        />
        <div className="flex-1 relative">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            placeholder="Adicione um comentário..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={handleComment}
            disabled={!commentText.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Lista de comentários */}
      <div className="space-y-4">
        {post.comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">

            {/* Avatar do autor do comentário — link usa username */}
            <Link href={`/${comment.user.username}`}>
              <Avatar
                src={comment.user.avatar}
                name={comment.user.displayName}
                size="md"
              />
            </Link>

            <div className="flex-1 bg-neutral-900 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={`/${comment.user.username}`}
                  className="flex items-center gap-1 hover:opacity-80"
                >
                  <span className="font-semibold text-white text-sm">
                    {comment.user.displayName}
                  </span>
                  {comment.user.verified && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                </Link>
                <span className="text-xs text-neutral-500">{comment.timestamp}</span>
              </div>

              <p className="text-neutral-300">{comment.text}</p>

              <div className="flex items-center gap-4 mt-3 text-sm">
                <button className="text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="text-neutral-400 hover:text-blue-400 transition-colors">
                  Responder
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}