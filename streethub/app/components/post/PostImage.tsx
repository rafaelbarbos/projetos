// Coluna esquerda - imagem do post
interface PostImageProps {
    src: string;
    alt: string;
}

export function PostImage({ src, alt }: PostImageProps) {
    return (
        <div className="lg:sticky lg:top-8 h-fit">
            <div className="aspect-square bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800">
                {
                    src && (
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                    )
                }
            </div>
        </div>
    );
}