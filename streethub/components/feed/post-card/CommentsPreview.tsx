'use client';

import Link from 'next/link';
import type { Post } from '@/types/feed';

interface CommentsPreviewProps {
  comments: Post['comments'];
}

export function CommentsPreview({ comments }: CommentsPreviewProps) {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {comments.slice(0, 2).map((comment) => (
        <div key={comment.id} className="text-sm">
          <Link
            href={`/${comment.user.username}`}
            className="font-semibold text-white hover:opacity-80"
          >
            {comment.user.username}
          </Link>
          <span className="text-neutral-400 ml-2">{comment.text}</span>
        </div>
      ))}
    </div>
  );
}
