import { useMemo, useState } from 'react';
import type { Post } from '@/types/feed';

interface UsePostMediaReturn {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

export function usePostMedia(post: Post): UsePostMediaReturn {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = useMemo(() => {
    if (post.images && post.images.length > 0) {
      return post.images.slice(0, 5);
    }

    if (post.image) {
      return [post.image];
    }

    return [];
  }, [post.images, post.image]);

  return {
    images,
    currentImageIndex,
    setCurrentImageIndex,
  };
}