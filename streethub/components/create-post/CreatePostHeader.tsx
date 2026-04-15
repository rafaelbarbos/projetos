import { X } from 'lucide-react';

interface CreatePostHeaderProps {
  onClose: () => void;
}

export function CreatePostHeader({ onClose }: CreatePostHeaderProps) {
  return (
    <div className='sticky top-0 bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between z-10'>
      <h2 className='text-xl font-bold text-white'>Criar Novo Post</h2>
      <button
        type='button'
        onClick={onClose}
        className='p-2 hover:bg-neutral-800 rounded-lg transition-colors'
        aria-label='Fechar modal de criar post'
      >
        <X className='w-5 h-5 text-neutral-400' />
      </button>
    </div>
  );
}
