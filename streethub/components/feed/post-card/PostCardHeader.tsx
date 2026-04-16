'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import type { Post } from '@/types/feed';
import { Avatar } from '../../shared/Avatar';

interface PostCardHeaderProps {
  post: Post;
}

export function PostCardHeader({ post }: PostCardHeaderProps) {
  return (
    <div className="p-4 flex items-center gap-3">
      <Link href={`/${post.user.username}`}>
        <Avatar
          src={post.user.avatar}
          name={post.user.displayName}
          size="md"
        />
      </Link>
      <div className="flex-1">
        <Link
          href={`/${post.user.username}`}
          className="flex items-center gap-1 hover:opacity-80"
        >
          <span className="font-semibold text-white">{post.user.displayName}</span>
          {post.user.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
        </Link>
        <p className="text-xs text-neutral-500">{post.timestamp}</p>
      </div>
      <div className="text-xs px-3 py-1 bg-neutral-800 rounded-full text-neutral-400">
        {post.category}
      </div>
    </div>
  );
}
