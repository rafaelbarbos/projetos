import { Image as ImageIcon, Plus, X } from 'lucide-react';
import { CreatePostImageSectionProps } from '@/types/create-post';

export function CreatePostImageSection({
  imageUrls,
  currentImageUrl,
  setCurrentImageUrl,
  onAddImage,
  onRemoveImage,
  maxImages,
}: CreatePostImageSectionProps) {
  const canAddMoreImages = imageUrls.length < maxImages;

  return (
    <div>
      <label className='block text-sm font-medium text-neutral-300 mb-3'>
        Imagens do Produto <span className='text-neutral-500'>(Até {maxImages} fotos)</span>
      </label>

      <div className='grid grid-cols-5 gap-3 mb-3'>
        {imageUrls.map((url, index) => (
          <div key={index} className='relative aspect-square group'>
            <img
              src={url}
              alt={`Upload ${index + 1}`}
              className='w-full h-full object-cover rounded-lg border border-neutral-800'
            />
            <button
              type='button'
              onClick={() => onRemoveImage(index)}
              className='absolute -top-2 -right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
              aria-label={`Remover imagem ${index + 1}`}
            >
              <X className='w-3 h-3 text-white' />
            </button>
          </div>
        ))}

        {canAddMoreImages && (
          <div className='aspect-square border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center bg-neutral-950/50'>
            <ImageIcon className='w-6 h-6 text-neutral-600' />
          </div>
        )}
      </div>

      {canAddMoreImages && (
        <div className='flex gap-2'>
          <input
            type='url'
            value={currentImageUrl}
            onChange={(e) => setCurrentImageUrl(e.target.value)}
            placeholder='Cole a URL da imagem'
            className='flex-1 px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500'
          />
          <button
            type='button'
            onClick={onAddImage}
            disabled={!currentImageUrl}
            className='px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-800 disabled:text-neutral-600 rounded-lg font-medium transition-colors flex items-center gap-2'
          >
            <Plus className='w-4 h-4' />
            Adicionar
          </button>
        </div>
      )}

      {imageUrls.length === 0 && (
        <p className='text-xs text-neutral-500 mt-2'>
          Adicione ao menos 1 imagem do produto (máximo {maxImages})
        </p>
      )}
    </div>
  );
}
