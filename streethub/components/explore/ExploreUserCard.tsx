import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';
import { mockPosts } from '@/data/mockData';
import type { User } from '@/types/feed';
import { useMockFollowing } from '@/hooks/useMockFollowing';

interface ExploreUserCardProps {
  user: User;
}

export function ExploreUserCard({ user }: ExploreUserCardProps) {
  const { isFollowing, toggleFollowing } = useMockFollowing(user.id);
  const postsCount = mockPosts.filter((post) => post.user.id === user.id).length;

  return (
    <div className='bg-neutral-900 border border-neutral-800 rounded-2xl p-4'>
      <div className='flex items-center gap-3 mb-4'>
        <Avatar src={user.avatar} name={user.displayName} size='md' />
        <div className='flex-1 min-w-0'>
          <Link href={`/${user.username}`} className='flex items-center gap-1 hover:opacity-80'>
            <p className='text-white font-semibold truncate'>{user.displayName}</p>
            {user.verified && <CheckCircle className='w-4 h-4 text-blue-500 shrink-0' />}
          </Link>
          <p className='text-sm text-neutral-500 truncate'>@{user.username}</p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2 mb-4'>
        <div className='bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-center'>
          <p className='text-white font-semibold text-sm'>{postsCount}</p>
          <p className='text-neutral-500 text-xs'>Posts</p>
        </div>
        <div className='bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-center'>
          <p className='text-white font-semibold text-sm'>{user.followers}</p>
          <p className='text-neutral-500 text-xs'>Followers</p>
        </div>
        <div className='bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-center'>
          <p className='text-purple-400 font-semibold text-sm'>{user.reputation}%</p>
          <p className='text-neutral-500 text-xs'>Rep.</p>
        </div>
      </div>

      <button
        type='button'
        onClick={toggleFollowing}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
          isFollowing
            ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
            : 'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
        }`}
      >
        {isFollowing ? 'Seguindo' : 'Seguir'}
      </button>
    </div>
  );
}
