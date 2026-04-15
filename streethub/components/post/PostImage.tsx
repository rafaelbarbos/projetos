'use client';

import { useState } from 'react';

// Coluna esquerda - imagens do post
interface PostImageProps {
        images: string[];
    alt: string;
}

export function PostImage({ images, alt }: PostImageProps) {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const safeImages = images.slice(0, 5);

        if (safeImages.length === 0) {
            return null;
        }

    return (
        <div className="lg:sticky lg:top-8 h-fit">
                        <div className="aspect-square bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 relative group">
                            <img
                                src={safeImages[currentImageIndex]}
                                alt={alt}
                                className="w-full h-full object-cover"
                            />

                            {safeImages.length > 1 && (
                                <>
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                                        {currentImageIndex + 1}/{safeImages.length}
                                    </div>

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