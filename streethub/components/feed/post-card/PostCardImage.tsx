'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PostCardImageProps {
  postId: string;
  title: string;
  images: string[];
  currentImageIndex: number;
  onImageChange: (index: number) => void;
}

export function PostCardImage({
  postId,
  title,
  images,
  currentImageIndex,
  onImageChange,
}: PostCardImageProps) {
  const currentImage = images[currentImageIndex];

  const goToPrevious = () => {
    const previousIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    onImageChange(previousIndex);
  };

  const goToNext = () => {
    const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    onImageChange(nextIndex);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="aspect-square bg-neutral-950 relative group cursor-pointer overflow-hidden">
      <Link
        href={`/post/${postId}`}
        className="absolute inset-0 z-10"
        aria-label={`Abrir post ${title}`}
      />

        <img
          key={`${postId}-${currentImageIndex}-${currentImage}`}
          src={currentImage}
          alt={title}
          className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {images.length > 1 && (
          <>
            <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white font-medium">
              {currentImageIndex + 1}/{images.length}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/65 text-white hover:bg-black/80 transition-colors"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/65 text-white hover:bg-black/80 transition-colors"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={`${postId}-dot-${index}`}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onImageChange(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-6 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
    </div>
  );
}
