'use client';

import Link from 'next/link';
import { MessageCircle, Bookmark, Calculator } from 'lucide-react';

interface PostActionsProps {
  postId: string;
  priceYuan: number;
  commentsCount: number;
  saved: boolean;
  onSave: () => void;
}

export function PostActions({
  postId,
  priceYuan,
  commentsCount,
  saved,
  onSave,
}: PostActionsProps) {
  return (
    <div className="flex items-center gap-4 mb-4 pt-3 border-t border-neutral-800">
      <Link
        href={`/post/${postId}`}
        className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-medium">{commentsCount}</span>
      </Link>

      <button
        onClick={onSave}
        className={`flex items-center gap-2 ml-auto transition-colors ${
          saved ? 'text-purple-400' : 'text-neutral-400 hover:text-purple-400'
        }`}
      >
        <Bookmark className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
      </button>

      <Link
        href={`/calculator?yuan=${priceYuan}`}
        className="px-3 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium text-sm flex items-center gap-2 transition-all"
      >
        <Calculator className="w-4 h-4" />
        Calcular
      </Link>
    </div>
  );
}
