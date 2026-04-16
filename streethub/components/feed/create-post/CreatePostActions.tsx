import { CreatePostActionsProps } from '@/types/create-post';

export function CreatePostActions({ hasImages, onClose }: CreatePostActionsProps) {
  return (
    <div className='flex gap-3 pt-4 border-t border-neutral-800'>
      <button
        type='button'
        onClick={onClose}
        className='flex-1 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium text-white transition-colors'
      >
        Cancelar
      </button>
      <button
        type='submit'
        disabled={!hasImages}
        className='flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-neutral-800 disabled:to-neutral-800 disabled:text-neutral-600 rounded-lg font-medium text-white transition-all'
      >
        Publicar
      </button>
    </div>
  );
}
