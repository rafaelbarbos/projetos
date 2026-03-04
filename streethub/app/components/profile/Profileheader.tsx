'use client';

import { CheckCircle, MapPin, Calendar, Settings } from 'lucide-react';
import { Avatar } from '../shared/Avatar';
import type { User } from '@/type/feed';

interface ProfileHeaderProps {
  user: User;
  postsCount: number;
}

export function ProfileHeader({ user, postsCount }: ProfileHeaderProps) {
    return (
        <div className='bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden mb-8'>

            {/* COVER */}
            <div className='h-48 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 relative'>
            <div
                className='absolute inset-0'
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1721111260570-456f3306f8d4?w=1200')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3,
                }}
                />
            </div>

            <div className='px-4 md:px-8 pb-8'>
                {/* Avatar + açoes */}
                <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6 gap-4'>
                    <div className='border-4 border-neutral-900 rounded-full w-fit'>
                        <Avatar
                            src={user.avatar}
                            name={user.displayName}
                            size='lg'
                            />
                    </div>

                    <div className='flex gap-3'>

                    </div>

                </div>

            </div>
        </div>
    );
}