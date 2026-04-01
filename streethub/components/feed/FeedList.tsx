import { mockPosts } from '@/data/mockData';
import { mock } from 'node:test';
import { PostCard } from '@/components/feed/PostCard';
// ⚠️  mockPosts → substituir por dados reais: await fetch('/api/feed/posts')

export function FeedList() {
    return(
        <>
            <div className='space-y-6'>
                {mockPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            <div className='mt-8 text-center'>
                <button className='px-6 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-white font-medium transition-all'>
                    Carregar mais posts
                </button>
            </div>
        </>
    );
}