'use client';

import { useEffect, useState } from 'react';
import { PostCard } from '@/components/feed/PostCard';
import { getFeedPosts } from '@/lib/feedApi';
import { ApiError } from '@/lib/apiClient';
import type { Post } from '@/types/feed';

const PAGE_SIZE = 20;

export function FeedList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        getFeedPosts({ page: 1, pageSize: PAGE_SIZE })
            .then((data) => {
                if (!active) return;
                setPosts(data);
                setPage(1);
                setHasMore(data.length === PAGE_SIZE);
            })
            .catch((err) => {
                if (!active) return;
                setError(err instanceof ApiError ? err.message : 'Não foi possível carregar o feed.');
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const loadMore = () => {
        const nextPage = page + 1;
        setLoadingMore(true);
        setError(null);

        getFeedPosts({ page: nextPage, pageSize: PAGE_SIZE })
            .then((data) => {
                setPosts((prev) => [...prev, ...data]);
                setPage(nextPage);
                setHasMore(data.length === PAGE_SIZE);
            })
            .catch((err) => {
                setError(err instanceof ApiError ? err.message : 'Não foi possível carregar mais posts.');
            })
            .finally(() => setLoadingMore(false));
    };

    if (loading) {
        return <p className="text-center text-neutral-500 py-12">Carregando feed...</p>;
    }

    if (error && posts.length === 0) {
        return <p className="text-center text-red-400 py-12">{error}</p>;
    }

    if (posts.length === 0) {
        return <p className="text-center text-neutral-500 py-12">Ainda não há posts no feed.</p>;
    }

    return(
        <>
            <div className='space-y-6'>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {error && <p className="text-center text-red-400 mt-4 text-sm">{error}</p>}

            {hasMore && (
                <div className='mt-8 text-center'>
                    <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className='px-6 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-white font-medium transition-all disabled:opacity-60'
                    >
                        {loadingMore ? 'Carregando...' : 'Carregar mais posts'}
                    </button>
                </div>
            )}
        </>
    );
}
