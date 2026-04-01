'use client';

import { CheckCircle, MapPin, Calendar, Settings } from 'lucide-react';
import { Avatar } from '../shared/Avatar';
import type { User } from '@/types/feed';
import { currentUser } from '@/data/mockData';

interface ProfileHeaderProps {
  user: User;
  postsCount: number;
}

export function ProfileHeader({ user, postsCount }: ProfileHeaderProps) {
    return (
        <div className='bg-neutral-900 rounded-2xl border border-neutral-800 mb-8'>

            {/* COVER */}
            <div className='h-48 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 relative rounded-t-2xl'>
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
                <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6 gap-4 relative z-10'>
                    <div className='border-4 border-neutral-900 rounded-full w-fit'>
                        <Avatar
                            src={currentUser.avatar}
                            name={currentUser.displayName}
                            size='lg'
                            />
                    </div>

                    <div className='flex gap-3'>
                        <button className='px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white font-medium transition-colors text-sm'>
                            Mensagem
                        </button>
                        <button className='px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium transition-all text-sm'>
                            Seguir
                        </button>
                        <button className='p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white transition-colors'>
                            <Settings className='w-5 h-5'/>
                        </button>
                    </div>
                </div>

                {/* Informações do perfil */}
                <div className='mb-6'>
                    <div className='flex items-center gap-2 mb-2'>
                        <h1 className='text-2xl md:text-3xl font-bold text-white'>
                            {currentUser.displayName}
                        </h1>
                        {currentUser.verified && <CheckCircle className='w-6 h-6 text-blue-500 flex-shrink-0'/>}
                    </div>

                    {/* Username - é a URL do perfil */}
                    <p className='text-neutral-400 mb-4'>
                        @{currentUser.username}
                    </p>

                    {currentUser.bio && (
                        <p className='text-white mb-4 max-w-2xl'>
                            {currentUser.bio}
                        </p>
                    )}

                    {/* ⚠️  "Brasil" e "Jan 2025" são mock
                    Substituir por: user.location e user.createdAt */}
                    <div className='flex flex-wrap items-center gap-4 md:gap-6 text-sm text-neutral-400'>
                        <div className='flex items-center gap-2'>
                            <MapPin className='w-4 h-4'/>
                            <span>Brasil</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4'/>
                            <span>Entrou em Jan 2025</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
                    <div className='text-center p-3 md:p-4 bg-neutral-950 rounded-xl border border-neutral-800'>
                        <p className='text-xl md:text-2xl font-bold text-white mb-1'>
                            {postsCount}
                        </p>
                        <p className='text-xs md:text-sm text-neutral-400'>
                            Posts
                        </p>
                    </div>
                    <div className='text-center p-3 md:p-4 bg-neutral-950 rounded-xl border border-neutral-800'>
                        <p className='text-xl md:text-2xl font-bold text-white mb-1'>
                            {currentUser.followers.toLocaleString()}
                        </p>
                        <p className='text-xs md:text-sm text-neutral-400'>
                            Seguidores
                        </p>
                    </div>
                    <div className='text-center p-3 md:p-4 bg-neutral-950 rounded-xl border border-neutral-800'>
                        <p className='text-xl md:text-2xl font-bold text-white mb-1'>
                            {currentUser.following.toLocaleString()}
                        </p>
                        <p className='text-xs md:text-sm text-neutral-400'>
                            Seguindo
                        </p>
                    </div>
                    <div className='text-center p-3 md:p-4 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl border border-purple-500/20'>
                        <p className='text-xl md:text-2xl font-bold text-purple-400 mb-1'>
                            {currentUser.reputation}%
                        </p>
                        <p className='text-xs md:text-sm text-neutral-400'>
                            Reputação
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}