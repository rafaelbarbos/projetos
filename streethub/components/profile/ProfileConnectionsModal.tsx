'use client';

import Link from 'next/link';
import { X, CheckCircle } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';
import type { User } from '@/types/feed';

interface ProfileConnectionsModalProps {
  isOpen: boolean;
  title: string;
  users: User[];
  onClose: () => void;
}

export function ProfileConnectionsModal({ isOpen, title, users, onClose }: ProfileConnectionsModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='w-full max-w-md max-h-[80vh] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900'>
        <div className='flex items-center justify-between px-4 py-3 border-b border-neutral-800'>
          <h2 className='text-white font-semibold'>{title}</h2>
          <button
            type='button'
            onClick={onClose}
            className='p-2 rounded-lg hover:bg-neutral-800 transition-colors'
            aria-label='Fechar conexões'
          >
            <X className='w-4 h-4 text-neutral-400' />
          </button>
        </div>

        <div className='max-h-[65vh] overflow-y-auto p-3 space-y-2'>
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/${user.username}`}
              onClick={onClose}
              className='flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3 hover:bg-neutral-800 transition-colors'
            >
              <Avatar src={user.avatar} name={user.displayName} size='md' />
              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-1'>
                  <p className='truncate text-sm font-semibold text-white'>{user.displayName}</p>
                  {user.verified && <CheckCircle className='w-4 h-4 text-blue-500 shrink-0' />}
                </div>
                <p className='truncate text-xs text-neutral-500'>@{user.username}</p>
              </div>
            </Link>
          ))}

          {users.length === 0 && (
            <div className='py-10 text-center'>
              <p className='text-neutral-500 text-sm'>Nenhum usuário para mostrar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
