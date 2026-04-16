'use client';

// src/components/post/PostActions.tsx
// 'use client' necessário por useState (liked, saved)

import Link from 'next/link';
import { ThumbsUp, ThumbsDown, MessageCircle, Bookmark, Calculator } from 'lucide-react';
import type { Post } from '@/types/feed';
import { usePostEngagement } from './hooks';

interface PostActionsProps {
  post: Post;
}

export function PostActions({ post }: PostActionsProps) {
  const { saved, userVote, greenLights, redLights, handleVote, handleSave } = usePostEngagement(post);

  return (
    <div className="space-y-4 py-4 border-y border-neutral-800">

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleVote('green')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            userVote === 'green'
              ? 'bg-green-500/20 text-green-400 border border-green-500/40'
              : 'bg-neutral-800 text-neutral-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${userVote === 'green' ? 'fill-current' : ''}`} />
          <span className="font-medium text-sm">GL {greenLights}</span>
        </button>

        <button
          type="button"
          onClick={() => handleVote('red')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            userVote === 'red'
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'bg-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent'
          }`}
        >
          <ThumbsDown className={`w-5 h-5 ${userVote === 'red' ? 'fill-current' : ''}`} />
          <span className="font-medium text-sm">RL {redLights}</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors">
          <MessageCircle className="w-6 h-6" />
          <span className="font-medium">{post.comments.length}</span>
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center gap-2 transition-colors ${
            saved ? 'text-purple-400' : 'text-neutral-400 hover:text-purple-400'
          }`}
        >
          <Bookmark className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
        </button>

        <Link
          href={`/calculator?yuan=${post.priceYuan}`}
          className="ml-auto px-5 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium flex items-center gap-2 transition-all"
        >
          <Calculator className="w-5 h-5" />
          Calcular
        </Link>
      </div>
    </div>
  );
}