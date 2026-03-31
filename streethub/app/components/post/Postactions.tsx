'use client';

// src/components/post/PostActions.tsx
// 'use client' necessário por useState (liked, saved)

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Bookmark, Calculator } from 'lucide-react';
import type { Post } from '@/types/feed';

interface PostActionsProps {
  post: Post;
}

export function PostActions({ post }: PostActionsProps) {
  const [liked, setLiked]           = useState(post.liked);
  const [saved, setSaved]           = useState(post.saved);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    // ⚠️ Mock — substituir por: await fetch(`/api/posts/${post.id}/like`, { method: 'POST' })
  };

  const handleSave = () => {
    setSaved(!saved);
    // ⚠️ Mock — substituir por: await fetch(`/api/posts/${post.id}/save`, { method: 'POST' })
  };

  return (
    <div className="flex items-center gap-4 py-4 border-y border-neutral-800">

      <button
        onClick={handleLike}
        className={`flex items-center gap-2 transition-colors ${
          liked ? 'text-red-500' : 'text-neutral-400 hover:text-red-500'
        }`}
      >
        <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
        <span className="font-medium">{likesCount}</span>
      </button>

      <button className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors">
        <MessageCircle className="w-6 h-6" />
        <span className="font-medium">{post.comments.length}</span>
      </button>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 ml-auto transition-colors ${
          saved ? 'text-purple-400' : 'text-neutral-400 hover:text-purple-400'
        }`}
      >
        <Bookmark className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
      </button>

      <Link
        href={`/calculator?yuan=${post.priceYuan}`}
        className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium flex items-center gap-2 transition-all"
      >
        <Calculator className="w-5 h-5" />
        Calcular
      </Link>

    </div>
  );
}