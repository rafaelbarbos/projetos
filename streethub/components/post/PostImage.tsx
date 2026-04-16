'use client';

import type { Post } from '@/types/feed';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePostMedia } from './hooks';

// Coluna esquerda - imagens do post
interface PostImageProps {
  post: Post;
}

export function PostImage({ post }: PostImageProps) {
    const { images, currentImageIndex, setCurrentImageIndex } = usePostMedia(post);
    const safeImages = images;

    const goToPrevious = () => {
        const previousIndex = currentImageIndex === 0 ? safeImages.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(previousIndex);
    };

    const goToNext = () => {
        const nextIndex = currentImageIndex === safeImages.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(nextIndex);
    };

        if (safeImages.length === 0) {
            return null;
        }

    return (
        <div className="lg:sticky lg:top-8 h-fit">
                        <div className="aspect-square bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 relative group">
                            <img
                                src={safeImages[currentImageIndex]}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />

                            {safeImages.length > 1 && (
                                <>
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                                        {currentImageIndex + 1}/{safeImages.length}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={goToPrevious}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/65 text-white hover:bg-black/80 transition-colors"
                                        aria-label="Imagem anterior"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/65 text-white hover:bg-black/80 transition-colors"
                                        aria-label="Próxima imagem"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>

                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {safeImages.map((_, index) => (
                                            <button
                                                key={`post-image-dot-${index}`}
                                                type="button"
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`h-2 rounded-full transition-all ${
                                                    index === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                                                }`}
                                                aria-label={`Ir para imagem ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
            </div>
        </div>
    );
}