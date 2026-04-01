import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Avatar } from '../shared/Avatar';
import type { Post } from '@/types/feed';

interface PostInfoProps {
    post: Post;
}

export function PostInfo({ post }: PostInfoProps) {
    return (
        <div className='space-y-4'>

            {/* Autor - link usa username, náo o id */}
            <div className='flex items-center gap-3'>
                <Link href={`/${post.user.username}`}>
                        <Avatar
                            src={post.user.avatar} 
                            name={post.user.displayName}
                            size="lg"
                        />
                </Link>
                <div className='flex-1'>
                    <Link
                        href={`/${post.user.username}`}
                        className='flex items-center gap-1 hover:opacity-80'>
                            <span className='font-semibold text-white text-lg'>
                                {post.user.displayName}
                            </span>
                            {post.user.isVerified && <CheckCircle className='w-5 h-5 text-blue-500' /> }
                    </Link>
                    <p className='text-sm text-neutral-500'>
                        {post.timestamp}
                    </p>
                </div>
                <button className='px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium text-sm transition-colors'>
                    Seguir
                </button>
            </div>

            {/* Título e categoria */}

            <div className='flex items-start justify-between gap-4'>
                <h1 className='text-2xl font-bold text-white'>
                    {post.title}
                </h1>
                <span className='px-3 py-1 bg-neutral-800 rounded-full text-neutral-400 text-sm whitespace-nowrap flex-shrink-0'>
        
                </span>
            </div>        
        </div>
    );
}